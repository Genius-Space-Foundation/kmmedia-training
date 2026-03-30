"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GraduationCap, ArrowRight, CheckCircle } from "lucide-react";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const typedSlides = [
    "Master the Art of|Modern Media.",
    "Lead the World of|Creative Design.",
    "Shape the Future of|Modern Fashion.",
    "Master Your Path in|Digital Skills."
  ];

  useEffect(() => {
    const currentSlide = typedSlides[index];
    
    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentSlide.substring(0, displayText.length + 1));
        setTypingSpeed(100);

        if (displayText === currentSlide) {
          setTypingSpeed(2000); // Wait before deleting
          setIsDeleting(true);
        }
      } else {
        setDisplayText(currentSlide.substring(0, displayText.length - 1));
        setTypingSpeed(50);

        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev: number) => (prev + 1) % typedSlides.length);
          setTypingSpeed(500); // Wait before typing next
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, typingSpeed, typedSlides]);

  const scrollToCourses = () => {
    const element = document.getElementById("courses");
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [mainPart, accentPart] = displayText.split("|");

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

        <div className="h-[120px] md:h-[180px] lg:h-[220px] flex items-center justify-center w-full mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] max-w-4xl drop-shadow-lg text-center">
            {mainPart}
            {mainPart && accentPart !== undefined && <br className="hidden md:block" />}
            <span className="text-brand-primary brightness-125 min-h-[1em] inline-block">
              {accentPart}
              <span className="animate-pulse ml-1 inline-block w-[3px] h-[0.8em] bg-brand-primary align-middle" />
            </span>
          </h1>
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
          <button
            onClick={scrollToCourses}
            className="w-full sm:w-auto px-10 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transform transition-all hover:scale-105 shadow-xl hover:shadow-sm"
          >
            Browse Courses
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

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
