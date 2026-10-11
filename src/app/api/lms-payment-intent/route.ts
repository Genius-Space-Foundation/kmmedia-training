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
