"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar({ onApplyClick }: { onApplyClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programmes", href: "#programmes" },
    { name: "About Us", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg border-b border-neutral-200 dark:border-neutral-800"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg group-hover:scale-105 transition-transform">
            <Image src="/images/logo.jpeg" alt="KM Media Logo" fill sizes="40px" className="object-cover" />
          </div>
          <span className={`text-xl font-bold transition-colors ${
            isScrolled ? "text-brand-text-primary dark:text-white" : "text-white drop-shadow-md"
          }`}>
            KM Media <br /> Training Institute  
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                    isScrolled ? "text-brand-text-secondary dark:text-neutral-300" : "text-white/90 drop-shadow-sm hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <ThemeToggle isScrolled={isScrolled} />
          <button
            onClick={onApplyClick}
            className="px-6 py-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-full text-sm font-bold transition-all hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle isScrolled={isScrolled} />
          <button
            className={`p-2 transition-colors ${isScrolled ? "text-brand-text-primary dark:text-white" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-brand-text-primary dark:text-white font-medium transition-colors"
                >
                  {link.name}
                  <ArrowRight size={16} className="text-neutral-400" />
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onApplyClick?.();
                }}
                className="w-full text-center py-4 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
