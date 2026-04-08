"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CourseListing } from "@/components/sections/CourseListing";
import { AboutUs } from "@/components/sections/AboutUs";
import { Requirements } from "@/components/sections/Requirements";
import { CourseModal } from "@/components/modals/CourseModal";
import dynamic from "next/dynamic";

const ApplicationFlow = dynamic(
  () => import("@/components/sections/ApplicationFlow").then(mod => mod.ApplicationFlow),
  { ssr: false }
);
import { Footer } from "@/components/layout/Footer";
import { Programme } from "@/data/courses";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, GraduationCap, ArrowRight } from "lucide-react";

export default function Home() {
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 400px (roughly the hero area)
      if (window.scrollY > 400) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectProgramme = (programme: Programme) => {
    setSelectedProgramme(programme);
    setIsModalOpen(true);
  };

  const handleApply = (programme: Programme) => {
    setSelectedProgramme(programme);
    setIsModalOpen(false);
    setIsApplicationOpen(true);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Navbar 
        onApplyClick={() => {
          setSelectedProgramme(null);
          setIsApplicationOpen(true);
        }} 
      />
      
      <Hero />

      <CourseListing onSelectProgramme={handleSelectProgramme} />

      <Requirements />

      <AboutUs />

      {/* CTA Section */}
      <section className="py-12 md:py-16 overflow-hidden bg-brand-primary relative">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border-[100px] border-white rounded-full" />
         </div>
         
         <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 text-center">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="space-y-6"
            >
               <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  Start Your Learning <br className="hidden md:block" /> Journey Today
               </h2>
               <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
                  Join hundreds of successful graduates who have transformed their careers with KM Media Training Institute.
               </p>
               <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                        const element = document.getElementById("programmes");
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="w-full sm:w-auto px-10 py-4 bg-white text-brand-primary rounded-full font-bold text-lg shadow-2xl hover:bg-neutral-50 transition-all hover:-translate-y-1"
                  >
                     Explore Programmes
                  </button>
                  <button
                    className="w-full sm:w-auto px-10 py-4 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                  >
                     Contact Admissions
                  </button>
               </div>
            </motion.div>
         </div>
      </section>

      <Footer />

      {/* Modals & Overlays */}
      <CourseModal 
        programme={selectedProgramme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />

      <ApplicationFlow
        selectedProgramme={selectedProgramme}
        isOpen={isApplicationOpen}
        onClose={() => setIsApplicationOpen(false)}
      />

      {/* Sticky Mobile CTA - Appears on scroll */}
      <AnimatePresence>
        {showMobileCta && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="md:hidden fixed bottom-6 left-6 right-6 z-40"
          >
             <button
                onClick={() => {
                    const element = document.getElementById("programmes");
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-2xl shadow-brand-primary/40 flex items-center justify-center gap-2 border border-white/10"
             >
                <GraduationCap size={20} />
                Browse Programmes
                <ArrowRight size={18} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
