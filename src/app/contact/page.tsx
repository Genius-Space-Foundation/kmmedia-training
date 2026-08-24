import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with KM Media Training Institute",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-text-primary dark:text-white">Get in Touch</h1>
            <p className="text-brand-text-secondary dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              Have questions about our programmes, admissions, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-neutral-50 dark:bg-neutral-800/50 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800">
                <h3 className="text-2xl font-bold text-brand-text-primary dark:text-white mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text-primary dark:text-white mb-1">Phone</h4>
                      <p className="text-brand-text-secondary dark:text-neutral-400">+233 55 558 7754</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text-primary dark:text-white mb-1">Email</h4>
                      <p className="text-brand-text-secondary dark:text-neutral-400">kmradioonline2@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-text-primary dark:text-white mb-1">Location</h4>
                      <p className="text-brand-text-secondary dark:text-neutral-400">Akatsi, Volta Region, Ghana</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-neutral-100 dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group flex items-center justify-center">
                 <div className="absolute inset-0 bg-brand-primary/5 flex flex-col items-center justify-center text-center p-6 gap-2">
                    <MapPin className="w-8 h-8 text-brand-primary opacity-50" />
                    <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">Map Integration Available</span>
                 </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
