"use client";

import { motion } from "framer-motion";
import { CheckCircle, Info, BookOpen, UserCheck, GraduationCap } from "lucide-react";

export function Requirements() {
  const requirements = [
    {
      icon: <BookOpen className="w-6 h-6 text-brand-primary" />,
      title: "Language Proficiency",
      description: "Ability to read, understand, write and express yourself in simple English."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-brand-primary" />,
      title: "Academic Qualification",
      description: "SSSCE/WASSCE holders with at least 3 passes in relevant subjects."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-brand-primary" />,
      title: "Mature Students",
      description: "Aged 25 years and above with relevant experience or potential."
    }
  ];

  return (
    <section className="py-20 bg-neutral-900 border-y border-neutral-800 relative overflow-hidden">
      {/* Decorative background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4 block">Get Started</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                Qualification & <br /> <span className="text-brand-primary">Entry Requirements</span>
              </h2>
              <p className="text-neutral-400 text-lg mb-8 leading-relaxed max-w-xl">
                We believe in providing opportunities for everyone passionate about media and design. Join us today if you meet any of the following criteria.
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-brand-primary/10 rounded-2xl border border-brand-primary/20 max-w-md">
                 <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-white" />
                 </div>
                 <p className="text-sm text-brand-primary font-bold">
                    Now accepting applications for the upcoming semester!
                 </p>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              {requirements.map((req, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-6 p-6 md:p-8 bg-neutral-800/50 hover:bg-neutral-800 rounded-3xl border border-neutral-700/50 transition-all hover:translate-x-2 group"
                >
                  <div className="w-14 h-14 bg-neutral-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {req.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">{req.title}</h4>
                    <p className="text-neutral-400 leading-relaxed">{req.description}</p>
                  </div>
                  <div className="ml-auto hidden sm:block">
                     <CheckCircle className="w-6 h-6 text-success opacity-20 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
