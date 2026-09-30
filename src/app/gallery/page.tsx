import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore life at KM Media Training Institute — campus moments, studio sessions, events, student work and graduation highlights.",
  alternates: {
    canonical: "https://kmmediatraininginstitute.com/gallery",
  },
  openGraph: {
    title: "Gallery | Kmmedia Training Institute",
    description:
      "Explore life at KM Media Training Institute — campus moments, studio sessions, events, student work and graduation highlights.",
    url: "https://kmmediatraininginstitute.com/gallery",
    images: ["/images/gallery/WhatsApp Image 2026-09-30 at 1.54.25 AM.jpeg"],
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-16 lg:pt-44 lg:pb-24 overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/gallery/WhatsApp Image 2026-09-30 at 1.54.25 AM.jpeg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-brand-primary/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">
                Our World
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
              Moments That <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                Shape Careers
              </span>
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Take a look inside KM Media Training Institute — from studio sessions and live productions to
              campus life, events and graduation celebrations.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <GalleryGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-neutral-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Want to be in the next photo?
          </h2>
          <p className="text-xl text-neutral-400 mb-10">
            Join hundreds of students creating media that matters. Admissions are open — your seat is waiting.
          </p>
          <Link
            href="/programmes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:scale-105 active:scale-95 text-lg"
          >
            Explore Our Programmes
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
