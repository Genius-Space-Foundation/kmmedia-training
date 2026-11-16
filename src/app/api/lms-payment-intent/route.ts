import { NextResponse } from "next/server";

/**
 * Server-side proxy to the backend's payment-intent endpoint.
 *
 * The BACKEND owns the Paystack integration: it resolves the amount from the
 * programme record and initializes the transaction with its own secret key,
 * returning a hosted checkout URL. Keeping LMS_API_URL server-side means the
 * browser never sees the backend base URL or any key.
 */
export async function POST(req: Request) {
  const base = process.env.LMS_API_URL;
  if (!base) {
    console.error("LMS payment-intent: LMS_API_URL is not configured");
    return NextResponse.json(
      { error: "Payments are temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const body = await req.json();
    const upstream = await fetch(`${base}/api/v1/applications/payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        program_slug: body.program_slug,
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        callback_url: body.callback_url,
        date_of_birth: body.date_of_birth ?? body.dob ?? null,
        gender: body.gender ?? null,
        nationality: body.nationality ?? null,
        hometown: body.hometown ?? null,
        religion: body.religion ?? null,
        marital_status: body.marital_status ?? body.maritalStatus ?? null,
        occupation: body.occupation ?? null,
        residential_address: body.residential_address ?? body.address ?? null,
        education_level: body.education_level ?? body.educationLevel ?? null,
        previous_school: body.previous_school ?? body.previousSchool ?? null,
        completion_year: body.completion_year ?? body.completionYear ?? null,
        guardian_name: body.guardian_name ?? body.guardianName ?? null,
        guardian_phone: body.guardian_phone ?? body.guardianPhone ?? null,
        guardian_occupation: body.guardian_occupation ?? body.guardianOccupation ?? null,
        guardian_relationship: body.guardian_relationship ?? body.guardianRelationship ?? null,
        preferred_mode: body.preferred_mode ?? body.preferredMode ?? null,
        hostel_required: body.hostel_required ?? body.hostelFacility ?? null,
        learning_objectives: body.learning_objectives ?? body.learningObjectives ?? null,
        form_category: body.form_category ?? body.category ?? null,
        submission_channel: body.submission_channel ?? "WEB",
        extra_data: body.extra_data ?? {},
      }),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      console.warn("LMS payment-intent rejected:", upstream.status, text.slice(0, 300));
      let message = "Could not start the payment. Please try again.";
      try {
        const parsed = JSON.parse(text);
        if (typeof parsed?.error?.message === "string") message = parsed.error.message;
      } catch {
        /* keep generic message */
      }
      return NextResponse.json({ error: message }, { status: upstream.status });
    }

    return NextResponse.json(JSON.parse(text));
  } catch (err) {
    console.warn("LMS payment-intent error:", err);
    return NextResponse.json(
      { error: "The payment service is unreachable. Please try again shortly." },
      { status: 502 },
    );
  }
}
