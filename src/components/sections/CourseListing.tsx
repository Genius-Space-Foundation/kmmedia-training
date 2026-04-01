"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Filter, BookOpen, Clock, Award, Star, ArrowRight } from "lucide-react";
import { programmes, Programme } from "@/data/courses";

interface ProgrammeListingProps {
  onSelectProgramme: (programme: Programme) => void;
}

export function CourseListing({ onSelectProgramme }: ProgrammeListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(programmes.map(p => p.category)))];

  const filteredProgrammes = programmes.filter(programme => {
    const matchesSearch = programme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || programme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="programmes" className="py-20 bg-neutral-50 dark:bg-neutral-800/50">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-text-primary dark:text-white">Our Programmes</h2>
            <p className="text-brand-text-secondary dark:text-neutral-400 max-w-lg">
              Explore our range of professional media programmes designed to give you hands-on experience and industry expertise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-6 md:mt-0">
            {/* Search */}
            <div className="relative group w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 sm:py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full sm:min-w-[260px] transition-all text-base sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105"
                  : "bg-white dark:bg-neutral-900 text-brand-text-secondary dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Programme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProgrammes.map((programme) => (
            <motion.div
              layout
              key={programme.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/5 transition-all group flex flex-col h-full"
            >
              <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-800">
                <Image 
                  src={programme.image} 
                  alt={programme.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-lg uppercase tracking-wider">
                    {programme.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">4.9</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-text-primary dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                  {programme.title}
                </h3>
                <p className="text-brand-text-secondary dark:text-neutral-400 text-sm line-clamp-3 mb-6 flex-1">
                  {programme.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <Clock className="w-4 h-4 text-brand-primary" />
                    </div>
                    <span className="text-xs font-semibold dark:text-neutral-300">{programme.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <Award className="w-4 h-4 text-brand-primary" />
                    </div>
                    <span className="text-xs font-semibold dark:text-neutral-300 line-clamp-1">{programme.certificate}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dashed border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => onSelectProgramme(programme)}
                    className="w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-primary dark:hover:bg-brand-primary hover:text-white dark:hover:text-white transition-all active:scale-95 group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProgrammes.length === 0 && (
          <div className="py-32 text-center">
             <div className="inline-flex p-6 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6 text-neutral-400">
                <BookOpen size={48} />
             </div>
             <h3 className="text-xl font-bold text-brand-text-primary dark:text-white">No programmes found</h3>
             <p className="text-brand-text-secondary dark:text-neutral-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
