"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Lightbulb, Users, MonitorPlay, ArrowRight } from "lucide-react";
import Link from "next/link";

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function AboutPage() {
  const values = [
    {
      icon: <Users className="w-8 h-8 text-brand-primary" />,
      title: "Expert Instructors",
      description: "Learn directly from seasoned industry professionals with years of real-world experience."
    },
    {
      icon: <MonitorPlay className="w-8 h-8 text-brand-primary" />,
      title: "Hands-On Practice",
      description: "We strongly emphasize 100% practical training over theoretical lectures."
    },
    {
      icon: <Target className="w-8 h-8 text-brand-primary" />,
      title: "Modern Equipment",
      description: "Train with the latest industry-standard cameras, lighting, and software."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-brand-primary" />,
      title: "Career Support",
      description: "We provide mentorship, internship placements, and career readiness guidance."
    }
  ];

  const trainers = [
    {
      name: "Kwame Mensah",
      role: "Lead Broadcast Instructor",
      image: "/images/3.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Sarah Osei",
      role: "Senior Graphic Design Tutor",
      image: "/images/4.jpg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "David Tetteh",
      role: "Sound Engineering Expert",
      image: "/images/5.jpg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Ama Asante",
      role: "Digital Marketing Specialist",
      image: "/images/3.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Emmanuel Yeboah",
      role: "UI/UX Design Lead",
      image: "/images/3.jpeg",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Joyce Addo",
      role: "Videography Instructor",
      image: "/images/4.jpg",
      linkedin: "https://linkedin.com"
    }
  ];

  return (
    <main className="min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-300">
      <Navbar />
      
      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-neutral-950">
        {/* Background Image with sophisticated blend */}
        <div className="absolute inset-0">
          <Image 
            src="/images/3.jpeg" 
            alt="KM Media Institute Campus"
            fill
            sizes="100vw"
            className="object-cover opacity-20 mix-blend-luminosity grayscale"
            priority
          />
        </div>
        
        {/* Complex Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-brand-primary/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-10 z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">
                  Our Story
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                Shaping the Future of <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Creative Excellence</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                KM Media Training Institute is dedicated to empowering the next generation of creative professionals. We bridge the gap between passion and profession.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white dark:bg-neutral-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">The Mission</h3>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-primary dark:text-white leading-tight mb-6">
                  Empowering professionals through practical training
                </h2>
                <p className="text-lg text-brand-text-secondary dark:text-neutral-400 leading-relaxed">
                  Our mission is to equip aspiring media and tech enthusiasts with 100% practical, industry-standard training. We believe in learning by doing, ensuring our graduates are job-ready from day one.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-bold tracking-widest text-brand-secondary uppercase mb-4">The Vision</h3>
                <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-primary dark:text-white leading-tight mb-6">
                  West Africa's leading hub for creative innovation
                </h2>
                <p className="text-lg text-brand-text-secondary dark:text-neutral-400 leading-relaxed">
                  We envision a future where KM Media Training Institute stands at the forefront of creative and technical media innovation, nurturing talent that redefines the digital landscape across the continent.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/3.jpeg"
                alt="Students collaborating"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">Why Choose Us</h3>
            <h2 className="text-4xl md:text-5xl font-black text-brand-text-primary dark:text-white tracking-tight">
              Our Core Strengths
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-text-primary dark:text-white mb-4">{val.title}</h4>
                <p className="text-brand-text-secondary dark:text-neutral-400 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Trainers Section */}
      {false && (
      <section className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h3 className="text-sm font-bold tracking-widest text-brand-primary uppercase mb-4">Our Experts</h3>
              <h2 className="text-4xl md:text-5xl font-black text-brand-text-primary dark:text-white tracking-tight">
                Meet the Trainers
              </h2>
            </div>
            <p className="text-brand-text-secondary dark:text-neutral-400 text-lg max-w-md">
              Learn from industry veterans who bring real-world experience directly into the classroom.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:-mx-10 md:px-10">
            {trainers.map((trainer, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-center flex-shrink-0"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 bg-neutral-100 dark:bg-neutral-800">
                  <Image 
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* LinkedIn Overlay */}
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Link href={trainer.linkedin} target="_blank" className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center hover:bg-brand-secondary transition-colors shadow-lg">
                      <LinkedinIcon size={20} />
                    </Link>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-brand-text-primary dark:text-white group-hover:text-brand-primary transition-colors">{trainer.name}</h4>
                <p className="text-brand-secondary dark:text-brand-secondary font-medium">{trainer.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Accreditations Banner */}
      <section className="py-20 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12">Accredited and Trusted By</h2>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 mb-4 shadow-xl">
                <Image src="/images/nasia.png" alt="NaSIA" width={80} height={80} className="object-contain" />
              </div>
              <span className="font-bold tracking-wide uppercase text-sm">NaSIA</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 mb-4 shadow-xl">
                <Image src="/images/freedom.jpeg" alt="Freedom FM" width={80} height={80} className="object-contain rounded-full" />
              </div>
              <span className="font-bold tracking-wide uppercase text-sm">Freedom FM</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-3 mb-4 shadow-xl">
                <Image src="/images/registrar.png" alt="Registrar of Companies" width={80} height={80} className="object-contain" />
              </div>
              <span className="font-bold tracking-wide uppercase text-sm">Registrar of Companies</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-950 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to start your journey?</h2>
          <p className="text-xl text-neutral-400 mb-10">
            Join hundreds of successful graduates who have launched their careers with us.
          </p>
          <Link 
            href="/programmes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:scale-105 active:scale-95 text-lg"
          >
            Explore Our Programmes
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
