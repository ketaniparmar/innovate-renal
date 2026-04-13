"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Building2, Phone, ArrowRight, 
  CheckCircle2, Activity, Cpu, Loader2, Download, 
  Calendar, MessageSquare 
} from "lucide-react";
import { OsButton } from "./OsButton";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  contextData?: {
    machines: number;
    breakeven: string;
    profit: string;
  };
}

export function LeadCaptureModal({ isOpen, onClose, source = "ROI Simulator", contextData }: LeadCaptureModalProps) {
  // Funnel Steps: "analyzing" -> "capture" -> "processing" -> "success"
  const [step, setStep] = useState<"analyzing" | "capture" | "processing" | "success">("analyzing");
  const [formData, setFormData] = useState({ name: "", hospital: "", phone: "" });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("analyzing");
      const timer = setTimeout(() => setStep("capture"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Constructing high-intent message for WhatsApp
    const machines = contextData?.machines || "Custom";
    const bep = contextData?.breakeven || "N/A";
    const profit = contextData?.profit || "N/A";

    const whatsappMessage = `*🚨 New Enterprise Lead via ${source}*%0A%0A*Name:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Phone:* ${formData.phone}%0A%0A*Model Data:*%0A→ Target: ${machines} Units%0A→ Projected BEP: ${bep} Months%0A→ 5-Year Profit: ₹ ${profit} Cr%0A%0A_Awaiting strategic consultation._`;

    // Micro-interaction: Fake "Generating PDF" delay
    setTimeout(() => {
      setStep("success");
      // Pre-open WhatsApp in background
      window.open(`https://wa.me/919879576332?text=${whatsappMessage}`, '_blank');
    }, 2500);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 hide-on-print">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => (step === "capture" || step === "success") && onClose()}
            className="absolute inset-0 bg-[#010810]/90 backdrop-blur-xl"
          />

          {/* Modal Body */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0A1118] border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col"
          >
            {/* Success/Action bar */}
            <motion.div 
              className={`h-1.5 w-full ${step === 'success' ? 'bg-green-500' : 'bg-[#D4AF37]'}`}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
            />

            {(step === "capture" || step === "success") && (
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20 bg-white/5 p-2 rounded-full">
                <X size={16} />
              </button>
            )}

            <div className="p-10 relative min-h-[480px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: ANALYZING (Perceived Value) */}
                {step === "analyzing" && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-8">
                      <div className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full animate-ping" />
                      <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-full animate-spin-slow" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]">
                        <Cpu size={40} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Processing Model...</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Calculating clinical margins and infrastructure <br/> feasibility for {contextData?.machines} units.
                    </p>
                  </motion.div>
                )}

                {/* STEP 2: CAPTURE (The Gated Step) */}
                {step === "capture" && (
                  <motion.div key="capture" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-8">
                      <Activity className="text-[#D4AF37]" size={28} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter mb-3 text-white">Simulation Complete.</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                      Your requested DPR is ready for export. Where should we send the detailed financial breakdown?
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-[#D4AF37]" size={18} />
                        <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-700" />
                      </div>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-[#D4AF37]" size={18} />
                        <input required type="text" placeholder="Hospital / Facility Name" value={formData.hospital} onChange={(e) => setFormData({...formData, hospital: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-700" />
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-[#D4AF37]" size={18} />
                        <input required type="tel" placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-700" />
                      </div>

                      <div className="pt-6">
                        <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                          Unlock DPR & Send to WhatsApp
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: PROCESSING (The Fake Work) */}
                {step === "processing" && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                    <Loader2 className="animate-spin text-[#D4AF37] mb-8" size={56} />
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Finalizing Audit...</h3>
                    <p className="text-gray-500 text-sm">Locking in parameters for {formData.hospital}.</p>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS (The Outcome) */}
                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Model Secured.</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                      Your {contextData?.breakeven}-month break-even model has been registered and routed to our technical team.
                    </p>
                    
                    <div className="space-y-4 w-full">
                      <button 
                        onClick={() => window.open(`https://wa.me/919879576332`, '_blank')}
                        className="w-full bg-[#25D366] hover:bg-green-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3"
                      >
                        <MessageSquare size={16} /> Discuss Model on WhatsApp
                      </button>

                      <button onClick={handleDownload} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                        <Download size={16} /> Save / Print Model
                      </button>
                      
                      <button onClick={onClose} className="text-[10px] font-bold text-gray-600 hover:text-white uppercase tracking-widest pt-2 transition-colors">
                        Return to Simulation
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