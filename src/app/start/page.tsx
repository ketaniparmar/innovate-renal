"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Activity, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2, User, Phone, Landmark } from "lucide-react";

// --- STRICT TYPES ---
interface SelectButtonProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}

const STEPS = [
  { id: "intent", title: "Project Goal" },
  { id: "capacity", title: "Scale" },
  { id: "timeline", title: "Timeline" },
  { id: "contact", title: "Details" }
];

export default function StartProjectPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    intent: "",
    machines: "",
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
    
    // Format WhatsApp Message (CFO/Consultant Tone)
    const text = `*New Institutional Project Inquiry*%0A%0A*Doctor/Director:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Primary Goal:* ${formData.intent}%0A*Project Scale:* ${formData.machines}%0A*Target Timeline:* ${formData.timeline}%0A*Phone:* ${formData.phone}%0A%0ARequesting initial financial assessment and DPR.`;
    
    setTimeout(() => {
      // Ensure this is your correct WhatsApp number
      window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-slate-200 overflow-hidden relative flex flex-col items-center justify-center selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* Institutional Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#C6A85A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[700px] w-full mx-auto px-6 relative z-10">
        
        {/* Progress Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A85A]/20 bg-[#C6A85A]/5 mb-6">
             <Landmark size={14} className="text-[#C6A85A]" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6A85A]">Project Feasibility Request</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">Let's Structure Your Center.</h1>
          <p className="text-gray-400 font-medium">Doctor, provide your basic parameters so we can prepare your financial setup.</p>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-10">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentStep ? "bg-[#C6A85A]" : "bg-white/5"}`} />
              <p className={`text-[9px] font-black uppercase tracking-widest mt-2 transition-colors ${i <= currentStep ? "text-[#C6A85A]" : "text-gray-600"}`}>
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative min-h-[400px] flex flex-col shadow-2xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: INTENT */}
            {currentStep === 0 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-xl font-black text-white mb-6">What is the primary goal of this investment?</h2>
                <div className="space-y-4">
                  <SelectButton 
                    icon={<Building2 />} title="New Turnkey Setup" desc="Building a new dialysis center from scratch."
                    active={formData.intent === "New Setup"} onClick={() => updateForm("intent", "New Setup")}
                  />
                  <SelectButton 
                    icon={<Activity />} title="Capacity Expansion" desc="Replacing old machines or expanding current scale."
                    active={formData.intent === "Capacity Expansion"} onClick={() => updateForm("intent", "Capacity Expansion")}
                  />
                  <SelectButton 
                    icon={<ShieldCheck />} title="AMC & Operations" desc="Seeking risk protection and better maintenance for existing setups."
                    active={formData.intent === "AMC Operations"} onClick={() => updateForm("intent", "AMC Operations")}
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: CAPACITY */}
            {currentStep === 1 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                <h2 className="text-xl font-black text-white mb-6">What is your planned capacity?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Changed "Beds" to "Machines" for clinical accuracy */}
                  {["3 - 5 Machines", "6 - 10 Machines", "11 - 20 Machines", "20+ Machines (Corporate)"].map((opt) => (
                    <button
                      key={opt} onClick={() => updateForm("machines", opt)}
                      className={`p-6 rounded-2xl border text-sm font-black transition-all flex items-center justify-center text-center ${
                        formData.machines === opt ? "bg-[#C6A85A]/10 border-[#C6A85A] text-[#C6A85A]" : "bg-[#0A0F1C] border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
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
                <h2 className="text-xl font-black text-white mb-6">When do you plan to deploy capital for this project?</h2>
                <div className="space-y-4">
                  {["Immediately (Within 30 Days)", "1 - 3 Months", "3 - 6 Months", "Just exploring financial viability"].map((opt) => (
                    <button
                      key={opt} onClick={() => updateForm("timeline", opt)}
                      className={`w-full p-5 rounded-2xl border text-sm font-black transition-all text-left ${
                        formData.timeline === opt ? "bg-[#C6A85A]/10 border-[#C6A85A] text-[#C6A85A]" : "bg-[#0A0F1C] border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
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
                <h2 className="text-xl font-black text-white mb-6">Where should we send your preliminary financial projection?</h2>
                <div className="space-y-4 flex-1">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required type="text" placeholder="Doctor / Director Name" value={formData.name} onChange={(e) => updateForm("name", e.target.value)} className="w-full bg-[#0A0F1C] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm font-medium text-white focus:outline-none focus:border-[#C6A85A]/50 transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required type="text" placeholder="Hospital / Organization Name" value={formData.hospital} onChange={(e) => updateForm("hospital", e.target.value)} className="w-full bg-[#0A0F1C] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm font-medium text-white focus:outline-none focus:border-[#C6A85A]/50 transition-all placeholder:text-gray-600" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required type="tel" placeholder="WhatsApp Phone Number" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} className="w-full bg-[#0A0F1C] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-sm font-medium text-white focus:outline-none focus:border-[#C6A85A]/50 transition-all placeholder:text-gray-600" />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full mt-8 bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(198,168,90,0.15)] disabled:opacity-70">
                  {isSubmitting ? "Routing to Advisory Team..." : "Submit & Connect on WhatsApp"} <ArrowRight size={16} />
                </button>
              </motion.form>
            )}

          </AnimatePresence>

          {/* Navigation Controls */}
          {currentStep < 3 && (
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
              <button onClick={handleBack} disabled={currentStep === 0} className="text-gray-500 hover:text-white transition-colors disabled:opacity-0 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleNext} className="text-[#C6A85A] hover:text-[#D4B970] transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                Skip Step <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function SelectButton({ icon, title, desc, active, onClick }: SelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl border flex items-center gap-5 transition-all text-left ${
        active ? "bg-[#C6A85A]/10 border-[#C6A85A]" : "bg-[#0A0F1C] border-white/5 hover:border-white/20"
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${active ? "bg-[#C6A85A] border-[#C6A85A] text-[#0A0F1C]" : "bg-[#0D1525] border-white/5 text-[#00A8A8]"}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-black text-lg tracking-tight mb-1 ${active ? "text-[#C6A85A]" : "text-white"}`}>{title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
      </div>
      {active && <CheckCircle2 className="ml-auto text-[#C6A85A]" size={20} />}
    </button>
  );
}