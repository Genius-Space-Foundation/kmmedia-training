import { NextResponse } from "next/server";

/**
 * Server-side proxy to the LMS backend — the source of truth for applications.
 *
 * Keeps LMS_API_URL and any internal payment-reference mapping off the browser.
 * Passes the backend's verdict (accepted application number, or rejection
 * reason) through to the caller so the public site can tell the applicant
 * whether their application actually landed.
 */
export async function POST(req: Request) {
  const base = process.env.LMS_API_URL;
  if (!base) {
    // Misconfiguration must be loud: without this the site silently stops
    // feeding the admissions queue.
    console.error("LMS mirror: LMS_API_URL is not configured — application NOT submitted");
    return NextResponse.json({
      mirrored: false,
      message: "The admissions system is not configured. Please contact support.",
    });
  }

  try {
    const body = await req.json();
    const reference = body?.reference ?? body?.payment_reference;

    const upstream = await fetch(`${base}/api/v1/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program_slug: body.program_slug ?? (body.course ? slugify(body.course) : null),
        payment_reference: reference,
        full_name: body.name ?? body.full_name ?? null,
        email: body.email ?? null,
        phone: body.phone ?? null,
        date_of_birth: body.dob ?? body.date_of_birth ?? null,
        gender: body.gender ?? null,
        nationality: body.nationality ?? null,
        hometown: body.hometown ?? null,
        religion: body.religion ?? null,
        marital_status: body.maritalStatus ?? body.marital_status ?? null,
        occupation: body.occupation ?? null,
        residential_address: body.address ?? body.residential_address ?? null,
        education_level: body.educationLevel ?? body.education_level ?? null,
        previous_school: body.previousSchool ?? body.previous_school ?? null,
        completion_year: body.completionYear ?? body.completion_year ?? null,
        guardian_name: body.guardianName ?? body.guardian_name ?? null,
        guardian_phone: body.guardianPhone ?? body.guardian_phone ?? null,
        guardian_occupation: body.guardianOccupation ?? body.guardian_occupation ?? null,
        guardian_relationship: body.guardianRelationship ?? body.guardian_relationship ?? null,
        preferred_mode: body.preferredMode ?? body.preferred_mode ?? null,
        hostel_required: body.hostelFacility ?? body.hostel_required ?? null,
        learning_objectives: body.learningObjectives ?? body.learning_objectives ?? null,
        form_category: body.category ?? body.form_category ?? null,
        submission_channel: "WEB",
        extra_data: body.extra_data ?? { reference },
      }),
    });

    if (upstream.ok) {
      let application: Record<string, unknown> = {};
      try {
        application = await upstream.json();
      } catch {
        /* response shape is unexpected but the submission landed */
      }
      return NextResponse.json({
        mirrored: true,
        application_number: application?.application_number ?? null,
      });
    }
    const text = await upstream.text();
    console.warn("LMS mirror rejected:", upstream.status, text.slice(0, 300));
    let message = "The admissions system rejected this application. Please contact support.";
    try {
      const parsed = JSON.parse(text);
      // Backend error envelope: {"error": {"code", "message", "details"}}
      if (typeof parsed?.error?.message === "string") message = parsed.error.message;
    } catch {
      /* keep the generic message */
    }
    return NextResponse.json({ mirrored: false, status: upstream.status, message });
  } catch (err) {
    console.warn("LMS mirror error:", err);
    return NextResponse.json({
      mirrored: false,
      message: "The admissions system is currently unreachable. Please try again shortly.",
    });
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
