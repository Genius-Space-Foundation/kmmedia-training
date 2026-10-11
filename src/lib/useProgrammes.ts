"use client";

import { useEffect, useState } from "react";
import { Programme, programmes as staticProgrammes } from "@/data/courses";

/**
 * Live programme catalogue.
 *
 * Renders the bundled static list instantly, then swaps in the LMS backend's
 * catalogue (the admin dashboard is the source of truth) once it loads. If the
 * backend is unreachable or returns nothing, the static list stays — the
 * website never goes blank because of a catalogue outage.
 */

interface ApiProgram {
  slug: string;
  code: string;
  title: string;
  description: string;
  long_description: string;
  category: string;
  duration_weeks: number | null;
  certificate: string | null;
  tuition_minor: number | null;
  application_fee_minor: number;
  requirements: string; // JSON-encoded string[]
  opportunities: string;
  modules: string;
}

function parseList(raw: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function formatCedis(minor: number | null): string {
  if (minor == null) return "";
  return `GH¢${(minor / 100).toLocaleString("en-GH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function mapProgram(p: ApiProgram): Programme {
  // Reuse the photo already chosen for this programme in the bundled data
  // (matched by slug/id or title); fall back to the site's generic image.
  const legacy = staticProgrammes.find((s) => s.id === p.slug || s.title === p.title);
  return {
    id: p.slug,
    title: p.title,
    description: p.description,
    longDescription: p.long_description,
    duration: p.duration_weeks ? `${p.duration_weeks} Weeks` : "",
    category: p.category,
    certificate: p.certificate ?? "Certificate of Completion",
    requirements: parseList(p.requirements),
    opportunities: parseList(p.opportunities),
    modules: parseList(p.modules),
    image: legacy?.image ?? "/images/3.jpeg",
    price: formatCedis(p.tuition_minor),
    applicationFee: formatCedis(p.application_fee_minor),
  };
}

export function useLiveProgrammes(): Programme[] {
  const [list, setList] = useState<Programme[]>(staticProgrammes);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/lms-programs")
      .then((res) => (res.ok ? res.json() : null))
      .then((body: { programmes?: ApiProgram[] } | null) => {
        if (cancelled || !body || !Array.isArray(body.programmes)) return;
        if (body.programmes.length === 0) return; // keep static fallback
        setList(body.programmes.map(mapProgram));
      })
      .catch(() => {
        /* offline backend — the static catalogue remains on screen */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return list;
}
