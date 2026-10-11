import { NextResponse } from "next/server";

/**
 * Server-side proxy for the public programme catalogue (GET only).
 * Keeps LMS_API_URL off the browser and lets the site fall back to its
 * bundled data when the backend is unreachable — the hook that consumes
 * this treats a non-OK or empty answer as "keep the static list".
 */
export async function GET() {
  const base = process.env.LMS_API_URL;
  if (!base) {
    return NextResponse.json({ programmes: [] });
  }
  try {
    const res = await fetch(`${base}/api/v1/programs`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ programmes: [] });
    }
    const data = await res.json();
    return NextResponse.json({ programmes: Array.isArray(data) ? data : [] });
  } catch {
    // Backend down: the website must still render its catalogue.
    return NextResponse.json({ programmes: [] });
  }
}
