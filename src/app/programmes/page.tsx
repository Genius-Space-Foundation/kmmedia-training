"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseModal } from "@/components/modals/CourseModal";
import dynamic from "next/dynamic";
import { Programme, programmes } from "@/data/courses";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Filter, LayoutGrid, List, Clock, Award, CheckCircle, ArrowRight, BookOpen, Briefcase } from "lucide-react";
import Image from "next/image";

const ApplicationFlow = dynamic(
  () => import("@/components/sections/ApplicationFlow").then(mod => mod.ApplicationFlow),
  { ssr: false }
);

type ViewMode = "grid" | "list";

export default function ProgrammesPage() {
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Filter options derived from data
  const categories = ["All", ...Array.from(new Set(programmes.map(p => p.category)))];
  const certificates = ["All", ...Array.from(new Set(programmes.map(p => p.certificate)))];

  // Filtering Logic
  const filteredProgrammes = useMemo(() => {
    return programmes.filter(programme => {
      const matchesSearch = programme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            programme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || programme.category === selectedCategory;
      const matchesCertificate = selectedCertificate === "All" || programme.certificate === selectedCertificate;
      return matchesSearch && matchesCategory && matchesCertificate;
    });
  }, [searchQuery, selectedCategory, selectedCertificate]);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <Navbar />
      
      {/* Premium Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-neutral-950">
        {/* Background Image with sophisticated blend */}
        <div className="absolute inset-0">
          <Image 
            src="/images/3.jpeg" 
            alt="Academic Catalog Background"
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
                  Academic Catalog
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                Shape Your Future in <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Media & Technology</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                Discover industry-aligned diplomas and professional certificates. Master practical skills through hands-on training guided by elite professionals.
              </p>
            </motion.div>

            {/* Trust Indicators / Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 md:gap-12 pt-8 border-t border-white/10"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">100%</span>
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider mt-1">Practical Training</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">15+</span>
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider mt-1">Expert Led Courses</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">Top</span>
                <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider mt-1">Industry Facilities</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-700">
                <Filter size={20} className="text-brand-primary" />
                <h3 className="font-bold text-lg text-brand-text-primary dark:text-white">Filter Programmes</h3>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-wider">Search</label>
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm w-full font-medium"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-wider">Category</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        selectedCategory === category 
                          ? "bg-brand-primary border-brand-primary text-white shadow-md shadow-brand-primary/20" 
                          : "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 group-hover:border-brand-primary"
                      }`}>
                        {selectedCategory === category && <CheckCircle size={12} strokeWidth={3} />}
                      </div>
                      <input 
                        type="radio" 
                        name="category" 
                        value={category}
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="hidden"
                      />
                      <span className={`text-sm font-medium transition-colors ${
                        selectedCategory === category ? "text-brand-text-primary dark:text-white font-bold" : "text-neutral-600 dark:text-neutral-400 group-hover:text-brand-text-primary dark:group-hover:text-white"
                      }`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certificate Filter */}
              <div className="mb-4">
                <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 block mb-3 uppercase tracking-wider">Certificate Type</label>
                <div className="space-y-2">
                  {certificates.map((cert) => (
                    <label key={cert} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        selectedCertificate === cert 
                          ? "bg-brand-secondary border-brand-secondary text-white shadow-md shadow-brand-secondary/20" 
                          : "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600 group-hover:border-brand-secondary"
                      }`}>
                        {selectedCertificate === cert && <CheckCircle size={12} strokeWidth={3} />}
                      </div>
                      <input 
                        type="radio" 
                        name="certificate" 
                        value={cert}
                        checked={selectedCertificate === cert}
                        onChange={() => setSelectedCertificate(cert)}
                        className="hidden"
                      />
                      <span className={`text-sm font-medium transition-colors ${
                        selectedCertificate === cert ? "text-brand-text-primary dark:text-white font-bold" : "text-neutral-600 dark:text-neutral-400 group-hover:text-brand-text-primary dark:group-hover:text-white"
                      }`}>
                        {cert}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-brand-text-primary dark:text-white">
                {filteredProgrammes.length} {filteredProgrammes.length === 1 ? 'Programme' : 'Programmes'} Found
              </h2>
              
              {/* View Toggle */}
              <div className="flex bg-white dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
                    viewMode === "grid" 
                      ? "bg-neutral-100 dark:bg-neutral-700 text-brand-text-primary dark:text-white shadow-sm" 
                      : "text-neutral-400 hover:text-brand-text-primary dark:hover:text-white"
                  }`}
                  aria-label="Grid View"
                >
                  <LayoutGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
                    viewMode === "list" 
                      ? "bg-neutral-100 dark:bg-neutral-700 text-brand-text-primary dark:text-white shadow-sm" 
                      : "text-neutral-400 hover:text-brand-text-primary dark:hover:text-white"
                  }`}
                  aria-label="List View"
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Empty State */}
            {filteredProgrammes.length === 0 && (
              <div className="bg-white dark:bg-neutral-800 rounded-3xl p-16 text-center border border-neutral-200 dark:border-neutral-700">
                <div className="inline-flex p-6 bg-neutral-100 dark:bg-neutral-700 rounded-full mb-6 text-neutral-400">
                  <Search size={48} />
                </div>
                <h3 className="text-2xl font-bold text-brand-text-primary dark:text-white mb-2">No matching programmes</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setSelectedCertificate("All"); }}
                  className="mt-6 px-6 py-3 bg-brand-primary/10 text-brand-primary font-bold rounded-xl hover:bg-brand-primary hover:text-white transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Results Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProgrammes.map((programme) => (
                  <motion.div
                    layout
                    key={programme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-700 group hover:shadow-2xl hover:shadow-brand-primary/5 transition-all flex flex-col h-full"
                  >
                    <div className="relative h-56 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <Image 
                        src={programme.image} 
                        alt={programme.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-white/95 dark:bg-black/90 backdrop-blur-md text-brand-primary text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                          {programme.category}
                        </span>
                        <span className="px-3 py-1 bg-brand-secondary text-white text-xs font-black uppercase tracking-wider rounded-full shadow-sm shadow-brand-secondary/30 self-start">
                          {programme.certificate}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-brand-text-primary dark:text-white mb-3 group-hover:text-brand-primary transition-colors leading-tight">
                        {programme.title}
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 flex-1">
                        {programme.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm font-semibold text-neutral-600 dark:text-neutral-300 mb-6 bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-brand-secondary" />
                          <span>{programme.duration}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedProgramme(programme);
                          setIsModalOpen(true);
                        }}
                        className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white dark:hover:text-white transition-all shadow-md active:scale-95 group/btn"
                      >
                        View Details & Apply
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Results List View */}
            {viewMode === "list" && (
              <div className="flex flex-col gap-6">
                {filteredProgrammes.map((programme) => (
                  <motion.div
                    layout
                    key={programme.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-700 flex flex-col lg:flex-row group hover:shadow-xl hover:border-brand-primary/30 transition-all"
                  >
                    <div className="relative h-64 lg:h-auto lg:w-72 shrink-0 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                      <Image 
                        src={programme.image} 
                        alt={programme.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="px-3 py-1 bg-white/95 dark:bg-black/90 backdrop-blur-md text-brand-primary text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                          {programme.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-brand-text-primary dark:text-white group-hover:text-brand-primary transition-colors mb-2">
                            {programme.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                            <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-lg">
                              <Award size={14} className="text-brand-secondary" />
                              {programme.certificate}
                            </span>
                            <span className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-lg">
                              <Clock size={14} className="text-brand-primary" />
                              {programme.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                        {programme.longDescription}
                      </p>

                      {programme.opportunities && programme.opportunities.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Briefcase size={14} />
                            Career Outcomes
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {programme.opportunities.slice(0, 3).map((opp, idx) => (
                              <span key={idx} className="text-xs font-semibold px-3 py-1.5 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-lg">
                                {opp}
                              </span>
                            ))}
                            {programme.opportunities.length > 3 && (
                              <span className="text-xs font-semibold px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 rounded-lg">
                                +{programme.opportunities.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="mt-auto flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-700/50">
                        <button
                          onClick={() => {
                            setSelectedProgramme(programme);
                            setIsModalOpen(true);
                          }}
                          className="px-6 py-3 bg-neutral-100 dark:bg-neutral-700 text-brand-text-primary dark:text-white rounded-xl font-bold text-sm hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                        >
                          View Curriculum
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProgramme(programme);
                            setIsApplicationOpen(true);
                          }}
                          className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold text-sm hover:bg-brand-secondary transition-colors shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                        >
                          Apply Now
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />

      <AnimatePresence>
        {isModalOpen && selectedProgramme && (
          <CourseModal
            programme={selectedProgramme}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onApply={() => {
              setIsModalOpen(false);
              setIsApplicationOpen(true);
            }}
          />
        )}

        {isApplicationOpen && (
          <ApplicationFlow
            selectedProgramme={selectedProgramme}
            isOpen={isApplicationOpen}
            onClose={() => setIsApplicationOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
