import { NextResponse } from "next/server";

/**
 * Server-side proxy to the LMS backend.
 *
 * Keeps NEXT_PUBLIC_LMS_API_URL, the LMS submission channel and any internal
 * payment-reference mapping off the browser. Never fails the caller: the
 * public site's own email flow must keep working even if the LMS is down.
 */
export async function POST(req: Request) {
  const base = process.env.LMS_API_URL;
  if (!base) {
    // LMS not configured — accept and no-op so the site flow is unaffected.
    return NextResponse.json({ mirrored: false, reason: "LMS not configured" });
  }

  try {
    const body = await req.json();
    const reference = body?.reference ?? body?.payment_reference;

    const upstream = await fetch(`${base}/api/v1/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program_slug: body.program_slug ?? slugify(body.course ?? ""),
        payment_reference: reference,
        full_name: body.name,
        email: body.email,
        phone: body.phone,
        date_of_birth: body.dob ?? null,
        gender: body.gender ?? null,
        nationality: body.nationality ?? null,
        hometown: body.hometown ?? null,
        religion: body.religion ?? null,
        marital_status: body.maritalStatus ?? null,
        occupation: body.occupation ?? null,
        residential_address: body.address ?? null,
        education_level: body.educationLevel ?? null,
        previous_school: body.previousSchool ?? null,
        completion_year: body.completionYear ?? null,
        guardian_name: body.guardianName ?? null,
        guardian_phone: body.guardianPhone ?? null,
        guardian_occupation: body.guardianOccupation ?? null,
        guardian_relationship: body.guardianRelationship ?? null,
        preferred_mode: body.preferredMode ?? null,
        hostel_required: body.hostelFacility ?? null,
        learning_objectives: body.learningObjectives ?? null,
        form_category: body.category ?? null,
        submission_channel: "WEB",
        extra_data: { reference },
      }),
    });

    if (upstream.ok) {
      return NextResponse.json({ mirrored: true });
    }
    const text = await upstream.text();
    console.warn("LMS mirror rejected:", upstream.status, text.slice(0, 300));
    return NextResponse.json({ mirrored: false, status: upstream.status });
  } catch (err) {
    console.warn("LMS mirror error:", err);
    return NextResponse.json({ mirrored: false });
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
