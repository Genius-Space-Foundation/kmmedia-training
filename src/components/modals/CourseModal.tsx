"use client";

import { Programme } from "@/data/courses";
import { X, CheckCircle, Briefcase, GraduationCap, ArrowRight, Clock, Award, ShieldCheck, MapPin, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProgrammeModalProps {
  programme: Programme | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (programme: Programme) => void;
}

export function CourseModal({ programme, isOpen, onClose, onApply }: ProgrammeModalProps) {
  if (!programme) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 max-h-[92vh] md:inset-x-6 md:top-[10%] md:bottom-[10%] md:left-1/2 md:-translate-x-1/2 md:max-w-4xl bg-white dark:bg-neutral-900 rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
          >
            {/* Header / Hero Section */}
            {/* Fixed Close Button - Always visible */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/20 md:bg-black/10 backdrop-blur-md text-white md:text-neutral-500 md:hover:text-neutral-800 md:dark:text-neutral-400 md:dark:hover:text-white hover:bg-black/40 md:hover:bg-neutral-100 md:dark:hover:bg-neutral-800 transition-all z-[80] border border-white/10 md:border-neutral-200 md:dark:border-neutral-800 shadow-lg"
            >
              <X size={24} />
            </button>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
               {/* Hero Section - Header */}
               <div className="relative h-64 md:h-80 shrink-0">
                  <Image 
                    src={programme.image} 
                    alt={programme.title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                     <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                           {programme.category}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-success/20 backdrop-blur-md border border-success/30 rounded-full">
                           <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                           <span className="text-success text-[10px] font-bold uppercase tracking-wider">Now Enrolling</span>
                        </div>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-md">
                        {programme.title}
                     </h2>
                  </div>
               </div>

               {/* Scrollable Content Container */}
               <div className="p-8 md:p-12">
                  {/* Quick Stats Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                     <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-center flex flex-col items-center gap-2">
                        <Clock className="w-5 h-5 text-brand-primary" />
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Duration</p>
                           <p className="text-sm font-bold dark:text-white">{programme.duration}</p>
                        </div>
                     </div>
                     <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-center flex flex-col items-center gap-2">
                        <Award className="w-5 h-5 text-brand-primary" />
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Certification</p>
                           <p className="text-sm font-bold dark:text-white">{programme.certificate}</p>
                        </div>
                     </div>
                     <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-center flex flex-col items-center gap-2">
                        <Zap className="w-5 h-5 text-brand-primary" />
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Format</p>
                           <p className="text-sm font-bold dark:text-white">100% Practical</p>
                        </div>
                     </div>
                     <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-100 dark:border-neutral-800 text-center flex flex-col items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-brand-primary" />
                        <div className="space-y-0.5">
                           <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Accredited</p>
                           <p className="text-sm font-bold dark:text-white">Yes</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-12">
                     <section>
                        <h3 className="text-xl font-bold text-brand-text-primary dark:text-white mb-4 flex items-center gap-2">
                           <div className="w-1 h-6 bg-brand-primary rounded-full" />
                           Programme Overview
                        </h3>
                        <p className="text-brand-text-secondary dark:text-neutral-400 text-lg leading-relaxed font-medium">
                          {programme.longDescription}
                        </p>
                     </section>

                     {programme.modules && programme.modules.length > 0 && (
                     <section>
                         <h3 className="text-xl font-bold text-brand-text-primary dark:text-white mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-brand-primary rounded-full" />
                            Curriculum & Modules
                         </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {programme.modules.map((mod, i) => (
                              <div key={i} className="group p-5 bg-neutral-50 dark:bg-neutral-800/40 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:border-brand-primary/30 transition-all">
                                <div className="flex items-start gap-4">
                                   <span className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-800 text-brand-primary shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center justify-center text-xs font-black shrink-0">
                                      {(i + 1).toString().padStart(2, '0')}
                                   </span>
                                   <p className="font-bold text-brand-text-primary dark:text-neutral-200 leading-tight pt-1">
                                      {mod}
                                   </p>
                                </div>
                              </div>
                            ))}
                         </div>
                     </section>
                     )}

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                        <section className="space-y-6">
                           <h3 className="text-xl font-bold text-brand-text-primary dark:text-white flex items-center gap-2">
                              <GraduationCap className="w-6 h-6 text-brand-primary" />
                              Requirements
                           </h3>
                           <div className="space-y-3">
                              {programme.requirements.map((req, i) => (
                                 <div key={i} className="flex items-start gap-3 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/20">
                                    <CheckCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                                    <span className="text-sm font-medium text-brand-text-secondary dark:text-neutral-300 leading-relaxed">{req}</span>
                                 </div>
                              ))}
                           </div>
                        </section>

                        <section className="space-y-6">
                           <h3 className="text-xl font-bold text-brand-text-primary dark:text-white flex items-center gap-2">
                              <Briefcase className="w-6 h-6 text-brand-primary" />
                              Career Path
                           </h3>
                           <div className="flex flex-wrap gap-2">
                              {programme.opportunities.map((opp, i) => (
                                 <span key={i} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-bold text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                                    {opp}
                                 </span>
                              ))}
                           </div>
                        </section>
                     </div>

                     {/* Mobile Only Footer (Scrolls with context) */}
                     <div className="md:hidden pt-12">
                        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                           <div className="flex flex-col items-center gap-6">
                              <div className="text-center">
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Total Application Fee</p>
                                 <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-3xl font-black text-brand-text-primary dark:text-white">GHS 100.00</span>
                                 </div>
                                 <p className="text-xs text-neutral-400 font-medium mt-1">(GHS {programme.price} per semester)</p>
                              </div>
                              
                              <button
                                onClick={() => onApply(programme)}
                                className="w-full px-10 py-5 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98]"
                              >
                                 Start Application
                                 <ArrowRight size={20} />
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Desktop Only Footer (Fixed at Bottom) */}
            <div className="hidden md:flex shrink-0 bg-neutral-50 dark:bg-neutral-900 px-12 py-6 border-t border-neutral-100 dark:border-neutral-800 items-center justify-between gap-6 z-10">
               <div className="flex flex-col">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1">Total Application Fee</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-2xl font-black text-brand-text-primary dark:text-white">GHS 100.00</span>
                     <span className="text-xs text-neutral-400 font-medium">(GHS {programme.price} per semester)</span>
                  </div>
               </div>
               
               <button
                 onClick={() => onApply(programme)}
                 className="px-10 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
               >
                  Start Application
                  <ArrowRight size={20} />
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

