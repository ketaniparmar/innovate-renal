"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Building2, Phone, ArrowRight, 
  CheckCircle2, Activity, Cpu, Loader2, Download, Calendar
} from "lucide-react";
import { OsButton } from "./OsButton";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  contextData?: any; // To pass in machine count, ROI, etc.
}

export function LeadCaptureModal({ isOpen, onClose, source = "Platform", contextData }: LeadCaptureModalProps) {
  // Funnel Steps: "analyzing" -> "capture" -> "processing" -> "success"
  const [step, setStep] = useState<"analyzing" | "capture" | "processing" | "success">("analyzing");
  const [formData, setFormData] = useState({ name: "", hospital: "", phone: "" });

  // Micro-interaction: Fake "Analyzing" delay to build perceived value
  useEffect(() => {
    if (isOpen && step === "analyzing") {
      const timer = setTimeout(() => setStep("capture"), 2000);
      return () => clearTimeout(timer);
    }
    if (!isOpen) {
      setTimeout(() => setStep("analyzing"), 500); // Reset on close
    }
  }, [isOpen, step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Format intelligent CRM payload
    const machines = contextData?.machines || "Custom";
    const text = `*🚨 New Enterprise Lead via ${source}*%0A%0A*Name:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Phone:* ${formData.phone}%0A*Target Capacity:* ${machines} Machines%0A%0A_Awaiting consultation scheduling..._`;

    // Micro-interaction: Fake "Generating PDF" delay
    setTimeout(() => {
      setStep("success");
      window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
    }, 2500);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 hide-on-print">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => (step === "capture" || step === "success") && onClose()}
            className="absolute inset-0 bg-[#010810]/80"
          />

          {/* Modal Body */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A1118] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
          >
            {/* Dynamic Accent Bar */}
            <motion.div 
              className="h-1.5 w-full bg-[#D4AF37]"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
            />

            {(step === "capture" || step === "success") && (
              <button onClick={onClose} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors z-20 bg-white/5 p-1.5 rounded-full">
                <X size={18} />
              </button>
            )}

            <div className="p-8 relative min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: MICRO-INTERACTION (Analyzing) */}
                {step === "analyzing" && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full animate-ping" />
                      <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-full animate-spin-slow" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]">
                        <Cpu size={32} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Compiling Financial Data...</h3>
                    <p className="text-sm text-gray-400">Running infrastructure feasibility checks.</p>
                  </motion.div>
                )}

                {/* STEP 2: CAPTURE (The Gate) */}
                {step === "capture" && (
                  <motion.div key="capture" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6">
                      <Activity className="text-[#D4AF37]" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">Model Ready for Export</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                      Your requested DPR is ready. Where should we send the detailed financial breakdown?
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#D4AF37]" size={18} />
                        <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-600" />
                      </div>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#D4AF37]" size={18} />
                        <input required type="text" placeholder="Hospital / Organization" value={formData.hospital} onChange={(e) => setFormData({...formData, hospital: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-600" />
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-[#D4AF37]" size={18} />
                        <input required type="tel" placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-600" />
                      </div>

                      <div className="pt-4">
                        <OsButton label="Unlock DPR & Send to WhatsApp" variant="primary" />
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: MICRO-INTERACTION (Processing) */}
                {step === "processing" && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                    <Loader2 className="animate-spin text-[#D4AF37] mb-6" size={48} />
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Generating Official DPR...</h3>
                    <p className="text-sm text-gray-400">Locking in parameters for {formData.hospital || "your facility"}.</p>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS & ROUTING */}
                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                        <CheckCircle2 size={32} className="text-green-500" />
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">DPR Secured.</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                      Your financial model has been registered and sent to our executive team via WhatsApp.
                    </p>
                    
                    <div className="space-y-3 w-full">
                      <button onClick={() => window.open('/start', '_self')} className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2">
                        <Calendar size={16} /> Book Strategy Call
                      </button>

                      <button onClick={handleDownload} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                        <Download size={16} /> Print / Save Report
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}