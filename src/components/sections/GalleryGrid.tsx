"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { galleryItems, galleryCategories, GalleryItem } from "@/data/gallery";

export function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof galleryCategories)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () => (filter === "All" ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  // Reset lightbox when the filter changes
  useEffect(() => {
    setLightboxIndex(null);
  }, [filter]);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activeItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {galleryCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border ${
              filter === category
                ? "bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/25 scale-105"
                : "bg-white dark:bg-neutral-800/60 text-brand-text-secondary dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-brand-primary/50 hover:text-brand-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry-style Grid */}
      <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative block w-full mb-6 break-inside-avoid rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/50"
              aria-label={`View photo: ${item.title}`}
            >
              <div className={`relative w-full ${spanToAspect(item.span)}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.category}
                </span>
                <h3 className="text-white text-lg font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.title}
                </h3>
              </div>

              {/* Zoom indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300">
                <Camera size={18} className="text-white" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo: ${activeItem.title}`}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close gallery viewer"
            >
              <X size={22} />
            </button>

            {/* Prev / Next */}
            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image Card */}
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative w-full max-h-[72vh] rounded-3xl overflow-hidden shadow-2xl bg-neutral-950/80 flex items-center justify-center ${
                  activeItem.span === "tall"
                    ? "aspect-[3/4] max-w-lg mx-auto"
                    : "aspect-[4/3] md:aspect-video"
                }`}
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">
                    {activeItem.category}
                  </span>
                  <h3 className="text-white text-xl font-bold">{activeItem.title}</h3>
                  {activeItem.description && (
                    <p className="text-neutral-400 text-sm mt-1 max-w-2xl">{activeItem.description}</p>
                  )}
                </div>
                <span className="shrink-0 text-neutral-500 text-sm font-medium tabular-nums">
                  {(lightboxIndex ?? 0) + 1} / {filteredItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function spanToAspect(span?: GalleryItem["span"]): string {
  switch (span) {
    case "tall":
      return "aspect-[3/4]";
    case "wide":
      return "aspect-[4/3]";
    default:
      return "aspect-square";
  }
}
