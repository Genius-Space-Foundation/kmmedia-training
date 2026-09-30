/**
 * Optional bridge to the KM Media LMS backend (FastAPI).
 *
 * Fire-and-forget: when NEXT_PUBLIC_LMS_API_URL is configured, the landing
 * page mirrors each submitted application into the LMS database so admins can
 * manage the admissions lifecycle there. The existing email submission flow
 * remains the source of truth for the public site; LMS failures never block
 * or break the applicant.
 */

const LMS_ENDPOINT = "/api/lms-applications";

export async function mirrorToLms(payload: Record<string, unknown>): Promise<void> {
  try {
    const res = await fetch(LMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn("LMS mirror failed with status", res.status);
    }
  } catch (err) {
    console.warn("LMS mirror unreachable:", err);
  }
}
