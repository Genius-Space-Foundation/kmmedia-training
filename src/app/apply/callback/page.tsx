"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mirrorToLms, takePendingApplication, clearPendingApplication } from "@/lib/lms";

type Phase = "processing" | "success" | "failed";

/**
 * Return route for the backend-initialized Paystack checkout.
 *
 * Paystack sends the applicant back here with ?reference=…&status=success.
 * We restore the parked form from sessionStorage and submit it to the LMS,
 * which verifies that reference server-side before accepting the application.
 * The backend is the source of truth: success is shown only when it accepts.
 */
export default function ApplyCallbackPage() {
  const [phase, setPhase] = useState<Phase>("processing");
  const [message, setMessage] = useState<string>("");
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      const reference = params.get("reference") ?? "";

      const pending = takePendingApplication();
      if (!pending || !reference) {
        if (!cancelled) {
          setPhase("failed");
          setMessage("We could not match this return to a pending application. Please try again.");
        }
        return;
      }

      // Applicant closed Paystack without completing payment.
      if (status && status !== "success") {
        if (!cancelled) {
          setPhase("failed");
          setMessage("Payment was not completed, so your application was not submitted. You can try again.");
        }
        return;
      }

      const result = await mirrorToLms({
        ...pending.form,
        course: pending.course,
        program_slug: pending.program_slug,
        reference,
      });

      if (cancelled) return;

      if (result.ok) {
        clearPendingApplication();
        setApplicationNumber(result.applicationNumber ?? null);
        setPhase("success");
        // Best-effort admin email; the LMS already holds the application.
        fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...pending.form, course: pending.course, reference }),
        }).catch((err) => console.warn("Application email notification failed:", err));
      } else {
        setPhase("failed");
        setMessage(result.reason ?? "Your application could not be submitted. Please contact support.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-md text-center space-y-6 py-16">
        {phase === "processing" && (
          <>
            <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <h1 className="text-2xl font-bold text-brand-text-primary dark:text-white">
              Confirming your payment…
            </h1>
            <p className="text-brand-text-secondary dark:text-neutral-400">
              Please wait while we verify your application with the admissions system. Do not close
              this page.
            </p>
          </>
        )}

        {phase === "success" && (
          <>
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-brand-text-primary dark:text-white">
              Application Received!
            </h1>
            {applicationNumber && (
              <p className="text-sm font-mono text-brand-primary dark:text-neutral-300">
                Application No: {applicationNumber}
              </p>
            )}
            <p className="text-brand-text-secondary dark:text-neutral-400">
              Your payment was verified and your application is now with our admissions team. They
              will contact you shortly.
            </p>
            <Link
              href="/programmes"
              className="inline-block px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold shadow-xl shadow-brand-primary/20 transition-all"
            >
              Back to Programmes
            </Link>
          </>
        )}

        {phase === "failed" && (
          <>
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-brand-text-primary dark:text-white">
              Application Not Submitted
            </h1>
            <p className="text-brand-text-secondary dark:text-neutral-400">{message}</p>
            <Link
              href="/programmes"
              className="inline-block px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold shadow-xl shadow-brand-primary/20 transition-all"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
