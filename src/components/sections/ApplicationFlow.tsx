"use client";

import { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { Course, courses } from "@/data/courses";
import { X, CheckCircle, CreditCard, Send, User, Mail, Phone, ArrowRight, BookOpen, Calendar, MapPin, Flag, Users, Briefcase, Home, Heart, ShieldHalf, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplicationFlowProps {
  selectedCourse: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = "form" | "payment" | "success";

export function ApplicationFlow({ selectedCourse, isOpen, onClose }: ApplicationFlowProps) {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    pob: "",
    nationality: "",
    hometown: "",
    religion: "",
    gender: "",
    maritalStatus: "",
    occupation: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    guardianOccupation: "",
    guardianRelationship: "",
    educationLevel: "",
    previousSchool: "",
    completionYear: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeCourse, setActiveCourse] = useState<Course | null>(selectedCourse);

  useEffect(() => {
    if (isOpen) {
      setActiveCourse(selectedCourse);
    }
  }, [selectedCourse, isOpen]);

  const handleNext = () => {
    if (step === "form") setStep("payment");
    else if (step === "payment") setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep("form"), 500); // Reset after animation
  };

  // Paystack Configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: 10000, /* 100 GHS in pesewas */
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    currency: "GHS"
  };

  const initializePayment = usePaystackPayment(config);

  const submitToApi = async (reference: string) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          course: activeCourse?.title,
          reference: reference,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application. Please contact support.");
      }

      setStep("success");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSuccess = (response: any) => {
    submitToApi(response.reference);
  };

  const onPaymentClose = () => {
    console.log("Payment dialog closed by user.");
  };

  const renderForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-brand-text-primary dark:text-white mb-2">
          {activeCourse ? `Join ${activeCourse.title}` : "Begin Your Application"}
        </h3>
        <p className="text-brand-text-secondary dark:text-neutral-400">Fill in your details to begin the enrollment process.</p>
      </div>
      
      <div className="space-y-4">
        <div className="relative group">
          <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <select
            className="w-full pl-12 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium appearance-none text-sm"
            value={activeCourse ? activeCourse.id : ""}
            onChange={e => setActiveCourse(courses.find(c => c.id === e.target.value) || null)}
          >
            <option value="" disabled>Select a Course</option>
            {courses.map(course => (
               <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative group md:col-span-2">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="date"
              placeholder="Date of Birth"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.dob}
              onChange={e => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>

          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Place of Birth"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.pob}
              onChange={e => setFormData({ ...formData, pob: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Nationality"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.nationality}
              onChange={e => setFormData({ ...formData, nationality: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Hometown"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.hometown}
              onChange={e => setFormData({ ...formData, hometown: e.target.value })}
            />
          </div>

          <div className="relative group">
            <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Religion"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.religion}
              onChange={e => setFormData({ ...formData, religion: e.target.value })}
            />
          </div>

          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <select
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium appearance-none text-sm text-neutral-500 dark:text-neutral-400"
              value={formData.gender}
              onChange={e => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="relative group">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <select
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium appearance-none text-sm text-neutral-500 dark:text-neutral-400"
              value={formData.maritalStatus}
              onChange={e => setFormData({ ...formData, maritalStatus: e.target.value })}
            >
              <option value="" disabled>Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>

          <div className="relative group md:col-span-2">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Occupation"
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
              value={formData.occupation}
              onChange={e => setFormData({ ...formData, occupation: e.target.value })}
            />
          </div>

          <div className="relative group md:col-span-2">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-neutral-400" />
            <textarea
              placeholder="Residential Address"
              rows={3}
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm resize-none"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          {/* Education Background Section */}
          <div className="md:col-span-2 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-sm font-bold text-brand-text-primary dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-primary" />
              Education Background
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group md:col-span-2">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Level of Education (e.g. WASSCE, Diploma)"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.educationLevel}
                  onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                />
              </div>
              <div className="relative group">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Name of Previous school attended"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.previousSchool}
                  onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                />
              </div>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Year of completion"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.completionYear}
                  onChange={e => setFormData({ ...formData, completionYear: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Parent/Guardian Section */}
          <div className="md:col-span-2 pt-6 border-t border-neutral-100 dark:border-neutral-800">
            <h4 className="text-sm font-bold text-brand-text-primary dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <ShieldHalf className="w-4 h-4 text-brand-primary" />
              Parent / Guardian Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Guardian's Full Name"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.guardianName}
                  onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                />
              </div>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="tel"
                  placeholder="Guardian's Phone Number"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.guardianPhone}
                  onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                />
              </div>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Guardian's Occupation"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.guardianOccupation}
                  onChange={e => setFormData({ ...formData, guardianOccupation: e.target.value })}
                />
              </div>
              <div className="relative group">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Relationship (e.g. Father)"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium text-sm"
                  value={formData.guardianRelationship}
                  onChange={e => setFormData({ ...formData, guardianRelationship: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={
          !formData.name || 
          !formData.email || 
          !formData.phone || 
          !formData.dob || 
          !formData.pob || 
          !formData.nationality || 
          !formData.hometown || 
          !formData.religion || 
          !formData.gender || 
          !formData.maritalStatus || 
          !formData.occupation || 
          !formData.address || 
          !formData.guardianName || 
          !formData.guardianPhone || 
          !formData.guardianOccupation || 
          !formData.guardianRelationship || 
          !formData.educationLevel || 
          !formData.previousSchool || 
          !formData.completionYear || 
          !activeCourse
        }
        className="w-full py-4 bg-brand-primary hover:bg-brand-secondary disabled:bg-neutral-300 dark:disabled:bg-neutral-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all mt-6 flex items-center justify-center gap-2 group"
      >
        Continue to Payment
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-brand-primary" />
        </div>
        <h3 className="text-2xl font-bold text-brand-text-primary dark:text-white mb-2">Application Fee</h3>
        <p className="text-brand-text-secondary dark:text-neutral-400">A non-refundable fee of GHS 100.00 is required to process your application.</p>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-700 mb-8 max-w-sm mx-auto">
         <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-neutral-500 font-medium">Course fee Per first semester</span>
            <span className="font-bold dark:text-white">{activeCourse?.price}</span>
         </div>
         <div className="flex justify-between items-center border-t border-neutral-200 dark:border-neutral-700 pt-3">
            <span className="text-base font-bold text-brand-text-primary dark:text-white">To Pay Now</span>
            <span className="text-xl font-bold text-brand-primary">GHS 100.00</span>
         </div>
      </div>

      <button
        onClick={() => {
          initializePayment({ onSuccess, onClose: onPaymentClose });
        }}
        className="w-full py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all flex items-center justify-center gap-2"
      >
        Pay with Paystack
        <Send className="w-5 h-5" />
      </button>
      <p className="text-xs text-neutral-400 italic">This will securely open the Paystack checkout overlay.</p>
      
      {isSubmitting && (
        <div className="mt-4 p-4 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center gap-3 animate-pulse">
          <div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-semibold">Processing your application...</span>
        </div>
      )}

      {submitError && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-xl text-sm font-medium">
          {submitError}
        </div>
      )}
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-10 h-10 text-success" />
      </motion.div>
      <h3 className="text-3xl font-extrabold text-brand-text-primary dark:text-white mb-4">Application Received!</h3>
      <p className="text-brand-text-secondary dark:text-neutral-400 mb-8 max-w-sm mx-auto text-lg leading-relaxed">
        Thank you for choosing KM Media. We have sent a confirmation email to <strong>{formData.email}</strong>. Our admissions team will contact you shortly.
      </p>
      <button
        onClick={handleClose}
        className="px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all"
      >
        Back to Courses
      </button>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-8 md:p-10 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-700"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Stepper Progress */}
            {step !== "success" && (
                <div className="flex items-center justify-center gap-4 mb-12">
                   <div className={`w-3 h-3 rounded-full transition-colors ${step === "form" ? "bg-brand-primary scale-125" : "bg-success"}`} />
                   <div className="w-8 h-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                   <div className={`w-3 h-3 rounded-full transition-colors ${step === "payment" ? "bg-brand-primary scale-125 shadow-[0_0_10px_rgba(9,148,196,0.5)]" : "bg-neutral-200 dark:bg-neutral-800"}`} />
                </div>
            )}

            {step === "form" && renderForm()}
            {step === "payment" && renderPayment()}
            {step === "success" && renderSuccess()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
