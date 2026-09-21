"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, ArrowRight, CheckCircle } from "lucide-react";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroPhrases = [
    {
      lead: "Be on Radio",
      highlight: "In 24 Weeks"
    },
    {
      lead: "Become a Web or Mobile App Developer",
      highlight: "In 24 Weeks."
    },
    {
      lead: "Your Child Can Build Robots At Age 10",
      highlight: "In 12 Weeks"
    }
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroPhrases.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [index, isPaused, heroPhrases.length]);

  const partners = [
    {
      name: "NaSIA",
      logo: "/images/nasia.png",
      label: "Accredited by"
    },
    {
      name: "Freedom FM",
      logo: "/images/freedom.jpeg",
      label: "In Partnership with"
    },
    {
      name: "Registrar of Companies",
      logo: "/images/registrar.png",
      label: "Registered by"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 md:pt-48 md:pb-32 min-h-[90vh] flex flex-col items-center justify-center">
      {/* Background Image & Overlay */}
      <Image 
        src="/images/3.jpeg" 
        alt="Media Students at KM Media Training Institute" 
        fill 
        sizes="100vw"
        className="object-cover object-center absolute inset-0 z-0" 
        priority 
      />
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 text-center relative z-20 w-full flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm mb-8 shadow-2xl"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Accredited Media Training Institute</span>
        </motion.div>

        {/* Dynamic Swapping Hero Title */}
        <div 
          className="min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[210px] flex items-center justify-center w-full mb-4 px-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -22, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.12] max-w-4xl drop-shadow-lg text-center tracking-tight"
            >
              <span>{heroPhrases[index].lead} </span>
              <span className="text-brand-secondary brightness-125 inline-block">
                {heroPhrases[index].highlight}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Indicator dots to see and pick phrases */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          {heroPhrases.map((phrase, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to phrase: ${phrase.lead} ${phrase.highlight}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i 
                  ? "w-8 bg-brand-secondary" 
                  : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <motion.p
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-12 leading-relaxed drop-shadow-md"
        >
          Empowering the next generation of media professionals with hands-on training, industry insights, and career-ready skills.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link
            href="/programmes"
            className="w-full sm:w-auto px-10 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transform transition-all hover:scale-105 shadow-xl hover:shadow-sm"
          >
            Browse Programmes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Partners & Accreditation Marquee */}
        <div className="mt-16 w-full max-w-5xl relative overflow-hidden group">
           {/* Left and Right edge fades for premium look */}
           <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />

           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center"
           >
              <motion.div 
                 animate={{ 
                    x: ["0%", "-33.33%"], 
                 }}
                 transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                 }}
                 className="flex items-center gap-12 whitespace-nowrap py-4"
              >
                 {/* Double rendering the partners for a seamless loop */}
                 {[...partners, ...partners, ...partners].map((partner, idx) => (
                    <div key={idx} className="flex items-center gap-3 shrink-0">
                       <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-full overflow-hidden border border-white/20 shadow-lg p-1.5 transition-transform hover:scale-110">
                          <Image 
                             src={partner.logo} 
                             alt={`${partner.name} logo`} 
                             fill 
                             sizes="48px"
                             className="object-contain"
                          />
                       </div>
                       <div className="text-left">
                          <p className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-0.5">{partner.label}</p>
                          <p className="text-sm font-extrabold text-white leading-tight">{partner.name}</p>
                       </div>
                    </div>
                 ))}
              </motion.div>
           </motion.div>
        </div>




        {/* Stats / Trust */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.5 }}
           className="mt-16 flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-90"
        >
           <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success brightness-125" />
              <span className="text-sm font-medium text-white shadow-sm">100% Practical</span>
           </div>
           <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success brightness-125" />
              <span className="text-sm font-medium text-white shadow-sm">Industry Experts</span>
           </div>
           <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success brightness-125" />
              <span className="text-sm font-medium text-white shadow-sm">Career Support</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
