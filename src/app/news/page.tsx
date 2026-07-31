import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowRight, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "News & Events",
  description: "Latest news, updates, and upcoming events at KM Media Training Institute",
};

import Link from "next/link";
import { newsItems, upcomingEvents } from "@/data/news";



export default function NewsEventsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text-primary dark:text-white">News & Events</h1>
            <p className="text-brand-text-secondary dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Stay up-to-date with the latest happenings, student achievements, and upcoming events on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Latest News Section */}
            <div className="lg:col-span-2 space-y-10">
              <h2 className="text-2xl font-bold text-brand-text-primary dark:text-white flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <span className="w-2 h-8 bg-brand-primary rounded-full"></span>
                Latest News
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {newsItems.map(news => (
                  <div key={news.id} className="bg-white dark:bg-neutral-800/50 rounded-3xl border border-neutral-100 dark:border-neutral-800 overflow-hidden group hover:shadow-2xl hover:shadow-brand-primary/10 transition-all">
                    <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <Image 
                        src={news.image} 
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-brand-primary text-xs font-bold rounded-full shadow-sm">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-3">
                        <Calendar size={14} />
                        {news.date}
                      </div>
                      <h3 className="text-xl font-bold text-brand-text-primary dark:text-white mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm text-brand-text-secondary dark:text-neutral-400 line-clamp-3 mb-4">
                        {news.excerpt}
                      </p>
                      <Link href={`/news/${news.id}`} className="text-brand-primary font-bold text-sm flex items-center gap-1 group/btn inline-flex">
                        Read More
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events Sidebar */}
            <div className="space-y-10">
              <h2 className="text-2xl font-bold text-brand-text-primary dark:text-white flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <span className="w-2 h-8 bg-brand-secondary rounded-full"></span>
                Upcoming Events
              </h2>

              <div className="bg-white dark:bg-neutral-800/50 rounded-3xl border border-neutral-100 dark:border-neutral-800 p-2">
                <div className="space-y-2">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-5 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/80 transition-colors border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700 group">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex flex-col items-center justify-center shrink-0 text-brand-primary">
                            <span className="text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                            <span className="text-lg font-black leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
                          </div>
                          <h4 className="font-bold text-brand-text-primary dark:text-white leading-tight group-hover:text-brand-primary transition-colors">
                            {event.title}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col gap-1.5 pl-15 ml-15 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-neutral-400" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-neutral-400" />
                            {event.location}
                          </div>
                        </div>
                        <div className="mt-2 pl-[60px]">
                          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-2 bg-brand-primary text-white rounded-lg font-bold text-sm hover:bg-brand-secondary transition-colors shadow-md shadow-brand-primary/20">
                            Register
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 mt-2">
                  <button className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-brand-text-primary dark:text-white rounded-xl font-bold text-sm transition-colors">
                    View Full Calendar
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
