"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 p-8 md:p-10 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-2xl shadow-brand-primary/5">
      <h3 className="text-2xl font-bold text-brand-text-primary dark:text-white mb-6">Send us a Message</h3>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-xl border border-green-200 dark:border-green-800">
          Your message has been sent successfully. We will get back to you soon!
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800">
          There was an error sending your message. Please try again later.
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-bold text-brand-text-primary dark:text-neutral-300">First Name</label>
            <input id="firstName" name="firstName" required type="text" className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm" placeholder="John" />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-bold text-brand-text-primary dark:text-neutral-300">Last Name</label>
            <input id="lastName" name="lastName" required type="text" className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm" placeholder="Doe" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-brand-text-primary dark:text-neutral-300">Email Address</label>
          <input id="email" name="email" required type="email" className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm" placeholder="john@example.com" />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-bold text-brand-text-primary dark:text-neutral-300">Message</label>
          <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm resize-none" placeholder="How can we help you?"></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
        </button>
      </form>
    </div>
  );
}
