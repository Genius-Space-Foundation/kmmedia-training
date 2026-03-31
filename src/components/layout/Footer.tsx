"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  EnvelopeSimple, 
  Phone, 
  MapPin, 
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
  ArrowRight
} from "@phosphor-icons/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    institute: [
      { name: "About Us", href: "#about" },
      { name: "Our Programmes", href: "#programmes" },
      { name: "Admissions", href: "#apply" },
      { name: "News & Events", href: "#" },
    ],
    support: [
      { name: "Contact Support", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "FAQ", href: "#" },
    ],
  };

  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white group-hover:scale-105 transition-transform">
                <Image src="/images/logo.jpeg" alt="KM Media Logo" fill sizes="48px" className="object-cover" />
              </div>
              <span className="text-2xl font-bold">KM Media</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Ghana's leading media training institute, dedicated to shaping the next generation of storytellers and media professionals.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/share/18ZjHvfLLU/" className="p-2 rounded-full bg-neutral-800 hover:bg-brand-primary transition-colors" aria-label="Facebook">
                <FacebookLogo size={24} />
              </a>
              {/* <a href="#" className="p-2 rounded-full bg-neutral-800 hover:bg-brand-primary transition-colors" aria-label="Twitter">
                <TwitterLogo size={18} />
              </a> */}
              <a href="https://www.instagram.com/kmmedia_gh/" className="p-2 rounded-full bg-neutral-800 hover:bg-brand-primary transition-colors" aria-label="Instagram">
                <InstagramLogo size={24} />
              </a>
              <a href="#" className="p-2 rounded-full bg-neutral-800 hover:bg-brand-primary transition-colors" aria-label="LinkedIn">
                <LinkedinLogo size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">The Institute</h4>
            <ul className="space-y-4">
              {footerLinks.institute.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-brand-primary text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support & Help</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-neutral-400 hover:text-brand-primary text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-neutral-800">
                  <EnvelopeSimple size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Email</p>
                  <a href="mailto:kmradioonline2@gmail.com" className="text-sm font-medium hover:text-brand-primary">kmradioonline2@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-neutral-800">
                  <Phone size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">KM MAIN OFFICE LINE</p>
                  <a href="tel:+233555587754" className="text-sm font-medium hover:text-brand-primary">+233555587754</a>
                  <a href="tel:0362291034" className="text-sm font-medium hover:text-brand-primary"> / 0362291034</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-neutral-800">
                  <MapPin size={18} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase font-bold tracking-wider mb-1">Location</p>
                  <p className="text-sm font-medium">Akatsi, Volta Region</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-sm">
            © {currentYear} KM Media Training Institute. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-8">
            <span className="text-xs text-neutral-600 font-medium">Genius Space Foundation</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
