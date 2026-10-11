/**
 * Bridge to the KM Media LMS backend (FastAPI).
 *
 * The LMS is the source of truth for applications and payment verification:
 * the public site submits there FIRST and only shows success when the backend
 * accepts the application (which requires the Paystack reference to verify
 * server-side). The admin email notification is a separate best-effort step.
 */

const LMS_ENDPOINT = "/api/lms-applications";

/**
 * The application form is parked in sessionStorage while the applicant is
 * redirected to the backend-initialized Paystack checkout, so the callback
 * page can finish the submission with the paid reference.
 */
const PENDING_KEY = "km_pending_application";

export interface PendingApplication {
  form: Record<string, unknown>;
  program_slug?: string;
  course?: string;
  reference: string;
}

export function savePendingApplication(pending: PendingApplication): void {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  } catch (err) {
    console.warn("Could not persist the pending application:", err);
  }
}

export function takePendingApplication(): PendingApplication | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as PendingApplication) : null;
  } catch {
    return null;
  }
}

export function clearPendingApplication(): void {
  try {
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    /* nothing sensible to do */
  }
}

export interface LmsMirrorResult {
  ok: boolean;
  applicationNumber?: string;
  reason?: string;
}

export async function mirrorToLms(
  payload: Record<string, unknown>,
): Promise<LmsMirrorResult> {
  try {
    const res = await fetch(LMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({} as Record<string, unknown>));
    if (!res.ok || !body.mirrored) {
      console.warn("LMS mirror failed:", res.status, body);
      return {
        ok: false,
        reason:
          (typeof body.message === "string" && body.message) ||
          (typeof body.reason === "string" && body.reason) ||
          "Your application could not be submitted. Please contact support.",
      };
    }
    return {
      ok: true,
      applicationNumber:
        typeof body.application_number === "string"
          ? body.application_number
          : undefined,
    };
  } catch (err) {
    console.warn("LMS mirror unreachable:", err);
    return {
      ok: false,
      reason:
        "The admissions system is currently unreachable. Please try again shortly.",
    };
  }
}
