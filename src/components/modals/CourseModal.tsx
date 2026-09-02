"use client";

import { Programme } from "@/data/courses";
import { X, CheckCircle, Briefcase, GraduationCap, ArrowRight, Clock, Award, ShieldCheck, Zap, BookOpen, ChevronRight, FileText } from "lucide-react";
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

  const isSemesterBased = programme.duration.toLowerCase().includes("year");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 max-h-[92vh] md:inset-x-4 lg:inset-x-auto lg:top-[5%] lg:bottom-[5%] lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-6xl bg-white dark:bg-neutral-900 rounded-t-[2.5rem] lg:rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
          >
            {/* Fixed Close Button - Always visible */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/40 backdrop-blur-xl text-white hover:bg-black/60 transition-all z-[80] border border-white/20 shadow-2xl hover:rotate-90 duration-300"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 relative">
               {/* Hero Section */}
               <div className="relative h-72 lg:h-[400px] shrink-0 overflow-hidden bg-neutral-950">
                  <Image 
                    src={programme.image} 
                    alt={programme.title}
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/40 to-transparent" />
                  
                  <div className="absolute bottom-10 left-8 right-8 lg:left-12 lg:right-12 z-10">
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-3 mb-4"
                     >
                        <span className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg border border-white/20 backdrop-blur-md">
                           {programme.category}
                        </span>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full">
                           <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                           <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em]">Admissions Open</span>
                        </div>
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                     >
                       <h2 className="text-4xl lg:text-6xl font-black text-white drop-shadow-2xl leading-[1.1] max-w-4xl tracking-tight">
                          {programme.title}
                       </h2>
                     </motion.div>
                  </div>
               </div>

               {/* Content Layout */}
               <div className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                     
                     {/* Left Column: Main Content (8 cols) */}
                     <div className="lg:col-span-8 space-y-12">
                        {/* Programme Overview */}
                        <section>
                           <h3 className="text-2xl font-black text-brand-text-primary dark:text-white mb-6 flex items-center gap-3">
                              <div className="w-12 h-1 bg-brand-primary rounded-full" />
                              Programme Overview
                           </h3>
                           <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed font-medium">
                             {programme.longDescription}
                           </p>
                        </section>

                        {/* Curriculum & Modules */}
                        {programme.modules && programme.modules.length > 0 && (
                        <section>
                            <h3 className="text-2xl font-black text-brand-text-primary dark:text-white mb-8 flex items-center gap-3">
                               <div className="w-12 h-1 bg-brand-primary rounded-full" />
                               Curriculum & Modules
                            </h3>
                            <div className="space-y-4">
                               {programme.modules.map((mod, i) => (
                                 <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    key={i} 
                                    className="group relative p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 hover:border-brand-primary/30 transition-all duration-300 overflow-hidden"
                                 >
                                   <div className="absolute inset-y-0 left-0 w-1 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-brand-primary transition-colors" />
                                   <div className="flex items-center gap-5">
                                      <div className="w-12 h-12 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-brand-primary font-black text-lg border border-neutral-100 dark:border-neutral-700 shadow-inner group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shrink-0">
                                         {(i + 1).toString().padStart(2, '0')}
                                      </div>
                                      <div className="flex-1">
                                         <p className="font-bold text-lg text-brand-text-primary dark:text-white group-hover:text-brand-primary transition-colors">
                                            {mod}
                                         </p>
                                      </div>
                                      <ChevronRight className="w-5 h-5 text-neutral-300 dark:text-neutral-600 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                                   </div>
                                 </motion.div>
                               ))}
                            </div>
                        </section>
                        )}
                     </div>

                     {/* Right Column: Sticky Sidebar (4 cols) */}
                     <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-8 space-y-8">
                           
                           {/* Application & Pricing Card */}
                           <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl" />
                              <div className="relative z-10">
                                 <div className="mb-8">
                                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2">Total Application Fee</p>
                                    <div className="flex items-baseline gap-2 mb-2">
                                       <span className="text-4xl font-black text-brand-text-primary dark:text-white">GHS 100</span>
                                       <span className="text-lg font-bold text-neutral-400">.00</span>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 rounded-lg">
                                       <FileText className="w-3.5 h-3.5 text-brand-primary" />
                                       <p className="text-xs text-brand-primary font-bold">
                                          ({programme.price} {isSemesterBased ? "per semester" : "- Installments available"})
                                       </p>
                                    </div>
                                 </div>
                                 
                                 <button
                                   onClick={() => onApply(programme)}
                                   className="w-full py-5 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-brand-primary/30 transition-all hover:-translate-y-1 active:translate-y-0 relative overflow-hidden group"
                                 >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative z-10">Start Application</span>
                                    <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                 </button>
                                 <p className="text-center text-xs text-neutral-500 font-medium mt-4">Takes less than 3 minutes to complete</p>
                              </div>
                           </div>

                           {/* Quick Stats Grid */}
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-2">
                                 <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-brand-primary" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">Duration</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">{programme.duration}</p>
                              </div>
                              <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-2">
                                 <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                                    <Award className="w-4 h-4 text-brand-secondary" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">Award</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">{programme.certificate}</p>
                              </div>
                              <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-2">
                                 <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-purple-500" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">Format</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">100% Practical</p>
                              </div>
                              <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-2">
                                 <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">Accredited</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">Verified</p>
                              </div>
                           </div>

                           {/* Requirements */}
                           <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                              <h3 className="text-lg font-black text-brand-text-primary dark:text-white mb-5 flex items-center gap-2">
                                 <GraduationCap className="w-5 h-5 text-brand-primary" />
                                 Requirements
                              </h3>
                              <div className="space-y-4">
                                 {programme.requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                       <CheckCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                                       <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">{req}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Career Path */}
                           <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 md:p-8 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                              <h3 className="text-lg font-black text-brand-text-primary dark:text-white mb-5 flex items-center gap-2">
                                 <Briefcase className="w-5 h-5 text-brand-primary" />
                                 Career Outcomes
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                 {programme.opportunities.map((opp, i) => (
                                    <span key={i} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-brand-primary/50 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors cursor-default">
                                       {opp}
                                    </span>
                                 ))}
                              </div>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Mobile Only Footer (Fixed at Bottom for small screens only, hidden on large) */}
            <div className="lg:hidden shrink-0 bg-white dark:bg-neutral-900 p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
               <div className="flex flex-col">
                  <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-0.5">Application Fee</p>
                  <div className="flex items-baseline gap-1">
                     <span className="text-lg font-black text-brand-text-primary dark:text-white">GHS 100</span>
                  </div>
               </div>
               
               <button
                 onClick={() => onApply(programme)}
                 className="flex-1 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98]"
               >
                  Apply Now
                  <ArrowRight size={16} />
               </button>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
