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
            className="fixed inset-x-0 bottom-0 max-h-[92vh] md:inset-x-4 lg:inset-x-auto lg:top-[4%] lg:bottom-[4%] lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-5xl bg-white dark:bg-neutral-900 rounded-t-[2rem] lg:rounded-[2rem] shadow-2xl z-[70] overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-800"
          >
            {/* Fixed Close Button - Always visible */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-black/50 backdrop-blur-xl text-white hover:bg-black/70 transition-all z-[80] border border-white/20 shadow-xl hover:rotate-90 duration-300"
            >
              <X size={18} />
            </button>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 relative">
               {/* Hero Section */}
               <div className="relative h-44 sm:h-52 lg:h-60 shrink-0 overflow-hidden bg-neutral-950">
                  <Image 
                    src={programme.image} 
                    alt={programme.title}
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/40 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 lg:left-10 lg:right-10 z-10">
                     <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="flex flex-wrap items-center gap-2.5 mb-2.5"
                     >
                        <span className="px-3 py-1 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-full shadow-md border border-white/20 backdrop-blur-md">
                           {programme.category}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-full">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                           <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.15em]">Admissions Open</span>
                        </div>
                     </motion.div>
                     <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                     >
                       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white drop-shadow-lg leading-tight max-w-3xl tracking-tight">
                          {programme.title}
                       </h2>
                     </motion.div>
                  </div>
               </div>

               {/* Content Layout */}
               <div className="p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                     
                     {/* Left Column: Main Content (7 cols) */}
                     <div className="lg:col-span-7 space-y-10">
                        {/* Programme Overview */}
                        <section>
                           <h3 className="text-xl font-black text-brand-text-primary dark:text-white mb-4 flex items-center gap-3">
                              <div className="w-8 h-1 bg-brand-primary rounded-full" />
                              Programme Overview
                           </h3>
                           <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed font-medium">
                             {programme.longDescription}
                           </p>
                        </section>

                        {/* Curriculum & Modules */}
                        {programme.modules && programme.modules.length > 0 && (
                        <section>
                            <h3 className="text-xl font-black text-brand-text-primary dark:text-white mb-6 flex items-center gap-3">
                               <div className="w-8 h-1 bg-brand-primary rounded-full" />
                               Curriculum & Modules
                            </h3>
                            <div className="space-y-3">
                               {programme.modules.map((mod, i) => (
                                 <motion.div 
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.06) }}
                                    key={i} 
                                    className="group relative p-4 sm:p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg hover:border-brand-primary/30 transition-all duration-300 overflow-hidden"
                                 >
                                   <div className="absolute inset-y-0 left-0 w-1 bg-neutral-200 dark:bg-neutral-800 group-hover:bg-brand-primary transition-colors" />
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center text-brand-primary font-black text-sm border border-neutral-100 dark:border-neutral-700 shadow-inner group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 shrink-0">
                                         {(i + 1).toString().padStart(2, '0')}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                         <p className="font-bold text-sm sm:text-base text-brand-text-primary dark:text-white group-hover:text-brand-primary transition-colors">
                                            {mod}
                                         </p>
                                      </div>
                                      <ChevronRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-brand-primary group-hover:translate-x-1 transition-all shrink-0" />
                                   </div>
                                 </motion.div>
                               ))}
                            </div>
                        </section>
                        )}
                     </div>

                     {/* Right Column: Sticky Sidebar (5 cols) */}
                     <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-6">
                           
                           {/* Pricing & Fees Breakdown Card */}
                           <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl p-5 sm:p-6 border border-neutral-200/90 dark:border-neutral-700/90 shadow-md relative overflow-hidden space-y-5">
                              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />
                              
                              <div className="relative z-10 space-y-4">
                                <div>
                                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.18em] block mb-0.5">
                                    Programme Investment
                                  </span>
                                  <h4 className="text-lg font-black text-brand-text-primary dark:text-white">
                                    Tuition & Application Fees
                                  </h4>
                                </div>

                                {/* Course Tuition Fee */}
                                <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700/80 shadow-sm space-y-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                      Course Fee
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-primary/10 text-brand-primary shrink-0 whitespace-nowrap">
                                      {programme.duration}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-baseline">
                                    <span className="text-2xl sm:text-3xl font-black text-brand-text-primary dark:text-white tracking-tight">
                                      {programme.price}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 pt-0.5 text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    <span className="text-[11px]">
                                      {isSemesterBased ? "Billed per semester" : "Flexible installment payment plan available"}
                                    </span>
                                  </div>
                                </div>

                                {/* Application Fee (Separated) */}
                                <div className="p-3.5 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 space-y-1.5">
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                      <FileText className="w-4 h-4 text-brand-primary shrink-0" />
                                      <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider truncate">
                                        Application Fee
                                      </span>
                                    </div>
                                    <span className="text-base sm:text-lg font-black text-brand-text-primary dark:text-white shrink-0">
                                      {programme.applicationFee}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                                    One-time non-refundable fee required to submit and process your admission form online.
                                  </p>
                                </div>

                                {/* Action Button */}
                                <div>
                                  <button
                                    onClick={() => onApply(programme)}
                                    className="w-full py-3.5 sm:py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-brand-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
                                  >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative z-10">Start Application</span>
                                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                  </button>
                                  <p className="text-center text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-2.5">
                                    Pay {programme.applicationFee} application fee online via MoMo / Card
                                  </p>
                                </div>
                              </div>
                           </div>

                           {/* Quick Stats Grid */}
                           <div className="grid grid-cols-2 gap-3 sm:gap-4">
                              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1.5">
                                 <div className="w-7 h-7 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                    <Clock className="w-3.5 h-3.5 text-brand-primary" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Duration</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">{programme.duration}</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1.5">
                                 <div className="w-7 h-7 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                                    <Award className="w-3.5 h-3.5 text-brand-secondary" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Award</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">{programme.certificate}</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1.5">
                                 <div className="w-7 h-7 rounded-full bg-purple-500/10 flex items-center justify-center">
                                    <Zap className="w-3.5 h-3.5 text-purple-500" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Format</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">100% Practical</p>
                              </div>
                              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1.5">
                                 <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                 </div>
                                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Accredited</p>
                                 <p className="text-sm font-bold text-brand-text-primary dark:text-white leading-tight">Verified</p>
                              </div>
                           </div>

                           {/* Requirements */}
                           <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                              <h3 className="text-base font-black text-brand-text-primary dark:text-white mb-4 flex items-center gap-2">
                                 <GraduationCap className="w-4 h-4 text-brand-primary" />
                                 Requirements
                              </h3>
                              <div className="space-y-3">
                                 {programme.requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                       <CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                       <span className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed">{req}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Career Path */}
                           <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 sm:p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                              <h3 className="text-base font-black text-brand-text-primary dark:text-white mb-4 flex items-center gap-2">
                                 <Briefcase className="w-4 h-4 text-brand-primary" />
                                 Career Outcomes
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                 {programme.opportunities.map((opp, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-brand-primary/50 hover:bg-brand-primary/5 hover:text-brand-primary transition-colors cursor-default">
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
            <div className="lg:hidden shrink-0 bg-white dark:bg-neutral-900 p-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-3 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
               <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                     <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Fee:</span>
                     <span className="text-sm font-black text-brand-text-primary dark:text-white leading-tight">
                        {programme.price}
                     </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">App:</span>
                     <span className="text-xs font-black text-brand-primary">
                        {programme.applicationFee}
                     </span>
                  </div>
               </div>
               
               <button
                 onClick={() => onApply(programme)}
                 className="px-6 py-3.5 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 transition-all active:scale-[0.98]"
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
