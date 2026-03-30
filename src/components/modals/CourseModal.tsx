"use client";

import { Course } from "@/data/courses";
import { X, CheckCircle, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (course: Course) => void;
}

export function CourseModal({ course, isOpen, onClose, onApply }: CourseModalProps) {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, y: "100%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: "100%", scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-x-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] lg:w-[800px] max-h-[90vh] bg-white dark:bg-neutral-800 rounded-t-3xl md:rounded-3xl shadow-2xl z-[70] overflow-hidden overflow-y-auto"
          >
            <div className="relative p-6 md:p-10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 mt-4">
                 <div className="flex flex-col gap-2">
                    <span className="text-brand-primary font-bold text-xs uppercase tracking-widest">{course.category}</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-brand-text-primary dark:text-white">{course.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-neutral-500 font-medium">
                       <span>{course.duration} Program</span>
                       <span className="w-1 h-1 rounded-full bg-neutral-300" />
                       <span className="text-success">Now Enrolling</span>
                    </div>
                  </div>

                 <p className="text-brand-text-secondary dark:text-neutral-400 text-lg leading-relaxed">
                   {course.longDescription}
                 </p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-4">
                    <div className="space-y-4">
                       <h4 className="flex items-center gap-2 font-bold text-brand-text-primary dark:text-white">
                          <GraduationCap className="w-5 h-5 text-brand-primary" />
                          Requirements
                       </h4>
                       <ul className="space-y-2">
                          {course.requirements.map((req, i) => (
                             <li key={i} className="flex items-start gap-2 text-sm text-brand-text-secondary dark:text-neutral-400">
                                <CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                <span>{req}</span>
                             </li>
                          ))}
                       </ul>
                    </div>

                    <div className="space-y-4">
                       <h4 className="flex items-center gap-2 font-bold text-brand-text-primary dark:text-white">
                          <Briefcase className="w-5 h-5 text-brand-primary" />
                          Career Opportunities
                       </h4>
                       <ul className="grid grid-cols-1 gap-2">
                          {course.opportunities.map((opp, i) => (
                             <li key={i} className="flex items-center gap-2 text-sm text-brand-text-secondary dark:text-neutral-400 p-2 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                                <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                                <span>{opp}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>

                 <div className="sticky bottom-0 bg-white dark:bg-neutral-800 py-4 border-t dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="text-center sm:text-left">
                       <p className="text-xs text-brand-text-secondary dark:text-neutral-500 font-medium">Application Fee</p>
                       <p className="text-xl font-bold text-brand-text-primary dark:text-white">GHS 100.00</p>
                    </div>
                    <button
                      onClick={() => onApply(course)}
                      className="w-full sm:w-auto px-10 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                       Start Application
                       <ArrowRight size={20} />
                    </button>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
