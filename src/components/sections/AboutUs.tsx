"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Lightbulb, Users, MonitorPlay, CheckCircle } from "lucide-react";

export function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const values = [
    {
      icon: <Users className="w-6 h-6 text-brand-primary" />,
      title: "Expert Instructors",
      description: "Learn directly from seasoned industry professionals with years of real-world experience."
    },
    {
      icon: <MonitorPlay className="w-6 h-6 text-brand-primary" />,
      title: "Hands-On Practice",
      description: "We strongly emphasize 100% practical training over theoretical lectures."
    },
    {
      icon: <Target className="w-6 h-6 text-brand-primary" />,
      title: "Modern Equipment",
      description: "Train with the latest industry-standard cameras, lighting, and software."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-brand-primary" />,
      title: "Career Support",
      description: "We provide mentorship, internship placements, and career readiness guidance."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <Image 
                src="/images/3.jpeg" 
                alt="Students learning at KM Media" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Accreditation & Partners Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 relative z-20">
               {/* Badge 1: NaSIA */}
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center gap-4"
               >
                  <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-700">
                     <Image 
                        src="/images/nasia.jpeg" 
                        alt="NaSIA Logo" 
                        fill 
                        className="object-contain p-1.5"
                     />
                  </div>
                  <div>
                     <p className="text-[10px] uppercase tracking-wider font-bold text-brand-text-secondary dark:text-neutral-400 mb-0.5">Accredited by</p>
                     <p className="text-base font-extrabold text-brand-text-primary dark:text-white leading-tight">NaSIA</p>
                  </div>
               </motion.div>

               {/* Badge 2: Freedom FM */}
               <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-neutral-800 p-4 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center gap-4"
               >
                  <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-full overflow-hidden border border-neutral-100 dark:border-neutral-700">
                     <Image 
                        src="/images/freedom.jpeg" 
                        alt="Freedom FM Logo" 
                        fill 
                        className="object-contain p-1.5"
                     />
                  </div>
                  <div>
                     <p className="text-[10px] uppercase tracking-wider font-bold text-brand-text-secondary dark:text-neutral-400 mb-0.5">In Partnership with</p>
                     <p className="text-base font-extrabold text-brand-text-primary dark:text-white leading-tight">Freedom FM</p>
                  </div>
               </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="text-brand-primary font-bold uppercase tracking-wider text-sm mb-2 block">About Us</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-text-primary dark:text-white leading-tight mb-6">
                Shaping the future of <span className="text-brand-primary">Media & IT</span>
              </h2>
              <p className="text-lg text-brand-text-secondary dark:text-neutral-400 leading-relaxed mb-6">
                KM Media Training Institute is dedicated to empowering the next generation of creative professionals. We bridge the gap between passion and profession by providing industry-standard training across broadcasting, Fashion, and digital skills .
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
               {values.map((val, idx) => (
                  <div key={idx} className="bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 hover:shadow-lg transition-all">
                     <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-4">
                        {val.icon}
                     </div>
                     <h4 className="font-bold text-brand-text-primary dark:text-white mb-2">{val.title}</h4>
                     <p className="text-sm text-brand-text-secondary dark:text-neutral-400 leading-relaxed">{val.description}</p>
                  </div>
               ))}
            </motion.div>

            <motion.div variants={itemVariants} className="bg-brand-primary text-white p-8 rounded-2xl relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-3">Our Mission & Vision</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                     <strong>Mission:</strong> To empower media professionals through 100% practical, industry-standard training.
                  </p>
                  <p className="text-white/90 text-sm leading-relaxed">
                     <strong>Vision:</strong> To be West Africa's leading hub for creative excellence and technical media innovation.
                  </p>
               </div>
               {/* Decorative background element interior to the box */}
               <Target className="absolute -bottom-10 -right-10 w-48 h-48 text-white opacity-10 pointer-events-none stroke-[1]" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
