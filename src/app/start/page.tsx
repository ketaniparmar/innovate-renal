"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Activity, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, User, Phone, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// Define the steps
const STEPS = [
  { id: "intent", title: "Project Goal" },
  { id: "capacity", title: "Capacity" },
  { id: "timeline", title: "Timeline" },
  { id: "contact", title: "Details" }
];

export default function StartProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    intent: "",
    beds: "",
    timeline: "",
    name: "",
    hospital: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const updateForm = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    if (currentStep < STEPS.length - 1 && key !== "name" && key !== "hospital" && key !== "phone") {
      setTimeout(handleNext, 300); // Auto-advance for selection buttons
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format WhatsApp Message
    const text = `*New High-Ticket Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Goal:* ${formData.intent}%0A*Capacity:* ${formData.beds}%0A*Timeline:* ${formData.timeline}%0A*Phone:* ${formData.phone}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative flex flex-col items-center justify-center">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[700px] w-full mx-auto px-6 relative z-10">
        
        {/* Progress Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-6">
             <Zap size={14} className="text-[#D4AF37]" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Onboarding Protocol</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Build Your Center.</h1>
          <p className="text-gray-400">Complete this brief assessment to receive a customized turnkey proposal.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-10">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? "bg-[#D4AF37]" : "bg-white/10"}`} />
              <p className={`text-[9px] font-bold uppercase tracking-widest mt-2 transition-colors ${i <= currentStep ? "text-[#D4AF37]" : "text-gray-600"}`}>
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <GlassCard accentColor="gold" hover={false} className="p-8 md:p-12 relative min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: INTENT */}
            {currentStep === 0 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-xl font-bold mb-6">What is the primary goal of this project?</h2>
                <div className="space-y-4">
                  <SelectButton 
                    icon={<Building2 />} title="New Turnkey Setup" desc="Building a new dialysis center from scratch."
                    active={formData.intent === "New Setup"} onClick={() => updateForm("intent", "New Setup")}
                  />
                  <SelectButton 
                    icon={<Activity />} title="Equipment Upgrade" desc="Replacing old machines or expanding capacity."
                    active={formData.intent === "Equipment Upgrade"} onClick={() => updateForm("intent", "Equipment Upgrade")}
                  />
                  <SelectButton 
                    icon={<ShieldCheck />} title="AMC & Operations" desc="Seeking better maintenance for existing setups."
                    active={formData.intent === "AMC Operations"} onClick={() => updateForm("intent", "AMC Operations")}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: CAPACITY */}
            {currentStep === 1 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-xl font-bold mb-6">What is your planned bed capacity?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["3 - 5 Beds", "6 - 10 Beds", "11 - 20 Beds", "20+ Beds (Corporate)"].map((opt) => (
                    <button
                      key={opt} onClick={() => updateForm("beds", opt)}
                      className={`p-6 rounded-2xl border text-sm font-bold transition-all flex items-center justify-center text-center ${
                        formData.beds === opt ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]" : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: TIMELINE */}
            {currentStep === 2 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-xl font-bold mb-6">When do you plan to execute this project?</h2>
                <div className="space-y-4">
                  {["Immediately (Within 30 Days)", "1 - 3 Months", "3 - 6 Months", "Just Exploring Costs"].map((opt) => (
                    <button
                      key={opt} onClick={() => updateForm("timeline", opt)}
                      className={`w-full p-5 rounded-2xl border text-sm font-bold transition-all text-left ${
                        formData.timeline === opt ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]" : "bg-black/40 border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: CONTACT DETAILS */}
            {currentStep === 3 && (
              <motion.form key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <h2 className="text-xl font-bold mb-6">Where should we send your proposal?</h2>
                <div className="space-y-4 flex-1">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required type="text" placeholder="Your Full Name" value={formData.name} onChange={(e) => updateForm("name", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required type="text" placeholder="Hospital / Organization Name" value={formData.hospital} onChange={(e) => updateForm("hospital", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required type="tel" placeholder="WhatsApp Phone Number" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-600" />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full mt-8 bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-70">
                  {isSubmitting ? "Routing to WhatsApp..." : "Submit & Connect on WhatsApp"} <ArrowRight size={16} />
                </button>
              </motion.form>
            )}

          </AnimatePresence>

          {/* Navigation Controls */}
          {currentStep < 3 && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/10">
              <button onClick={handleBack} disabled={currentStep === 0} className="text-gray-500 hover:text-white transition-colors disabled:opacity-30 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleNext} className="text-[#D4AF37] hover:text-yellow-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                Skip <ArrowRight size={16} />
              </button>
            </div>
          )}
        </GlassCard>

      </div>
    </main>
  );
}

// Sub-component for Step 1
function SelectButton({ icon, title, desc, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border flex items-center gap-5 transition-all text-left ${
        active ? "bg-[#D4AF37]/20 border-[#D4AF37]" : "bg-black/40 border-white/10 hover:border-white/30"
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-[#D4AF37] text-[#010810]" : "bg-white/5 text-gray-400"}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-bold text-lg mb-1 ${active ? "text-[#D4AF37]" : "text-white"}`}>{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
      </div>
      {active && <CheckCircle2 className="ml-auto text-[#D4AF37]" size={20} />}
    </button>
  );
}