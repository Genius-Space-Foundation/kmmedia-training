"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    // Use Web Share API if available (especially on mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        return;
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-brand-text-primary dark:text-white rounded-full text-sm font-bold transition-all shadow-sm"
      title="Share this article"
    >
      {copied ? (
        <>
          <Check size={16} className="text-emerald-500" />
          <span className="text-emerald-500">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={16} className="text-brand-primary" />
          Share
        </>
      )}
    </button>
  );
}
