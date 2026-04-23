"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Building2, Phone, ArrowRight, 
  CheckCircle2, Activity, Cpu, Loader2, Download, 
  MessageSquare 
} from "lucide-react";

// Flexible Interface to prevent TypeScript build errors
interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  contextData?: {
    machines: number | string;
    breakeven: number | string;
    profit: number | string;
  };
}

export function LeadCaptureModal({ isOpen, onClose, source = "ROI Simulator", contextData }: LeadCaptureModalProps) {
  const [step, setStep] = useState<"analyzing" | "capture" | "processing" | "success">("analyzing");
  const [formData, setFormData] = useState({ name: "", hospital: "", phone: "" });

  // Reset logic when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("analyzing");
      const timer = setTimeout(() => setStep("capture"), 1800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    // Formatting context safely for WhatsApp
    const machines = contextData?.machines || "Custom";
    const bep = contextData?.breakeven || "N/A";
    const profit = contextData?.profit || "N/A";

    const whatsappMessage = `*🚨 New Project Lead via ${source}*%0A%0A*Name:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Phone:* ${formData.phone}%0A%0A*Simulation Data:*%0A→ Capacity: ${machines} Units%0A→ BEP: ${bep} Months%0A→ 5-Year Profit: ₹ ${profit} Cr%0A%0A_Awaiting technical audit._`;

    setTimeout(() => {
      setStep("success");
      // Open WhatsApp after simulation delay
      window.open(`https://wa.me/919879576332?text=${whatsappMessage}`, '_blank');
    }, 2000);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 hide-on-print">
          
          {/* Backdrop Blur Layer */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => (step === "capture" || step === "success") && onClose()}
            className="absolute inset-0 bg-[#010810]/90 backdrop-blur-xl"
          />

          {/* Modal Architecture */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A1118] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Dynamic Status Bar */}
            <motion.div 
              className={`h-1.5 w-full ${step === 'success' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-[#D4AF37]'}`}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
            />

            {(step === "capture" || step === "success") && (
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20 bg-white/5 p-2 rounded-full">
                <X size={16} />
              </button>
            )}

            <div className="p-10 relative min-h-[460px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: ANALYZING (Build Perceived Value) */}
                {step === "analyzing" && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-8">
                      <div className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full animate-ping" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#D4AF37]">
                        <Cpu size={36} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Simulating ROI...</h3>
                    <p className="text-gray-500 text-sm">Processing clinical infrastructure feasibility for {contextData?.machines} units.</p>
                  </motion.div>
                )}

                {/* STEP 2: CAPTURE (The High-Value Gate) */}
                {step === "capture" && (
                  <motion.div key="capture" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-8">
                      <Activity className="text-[#D4AF37]" size={24} />
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter mb-2 text-white">Model Verified.</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                      Your requested DPR is ready for export. Where should we send the detailed breakdown?
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <FormInput icon={<User size={16}/>} placeholder="Full Name" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                      <FormInput icon={<Building2 size={16}/>} placeholder="Hospital / Organization" value={formData.hospital} onChange={(v) => setFormData({...formData, hospital: v})} />
                      <FormInput icon={<Phone size={16}/>} placeholder="WhatsApp Number" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} />

                      <div className="pt-6">
                        <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                          Unlock DPR & Send to WhatsApp
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 3: PROCESSING (The Final Audit) */}
                {step === "processing" && (
                  <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center">
                    <Loader2 className="animate-spin text-[#D4AF37] mb-8" size={56} />
                    <h3 className="text-2xl font-black text-white mb-2">Finalizing Financial Audit...</h3>
                    <p className="text-gray-500 text-sm italic">Encrypting report for {formData.hospital}...</p>
                  </motion.div>
                )}

                {/* STEP 4: SUCCESS (The Strategic Close) */}
                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">Report Secured.</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                      Your <strong>{contextData?.breakeven}-month</strong> model has been registered. Our infrastructure team is awaiting your data review.
                    </p>
                    
                    <div className="space-y-4 w-full">
                      <button 
                        onClick={() => window.open(`https://wa.me/919879576332`, '_blank')}
                        className="w-full bg-[#25D366] hover:bg-green-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3"
                      >
                        <MessageSquare size={16} /> Discuss Audit on WhatsApp
                      </button>

                      <button onClick={handleDownload} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                        <Download size={16} /> Save Local Copy
                      </button>
                      
                      <button onClick={onClose} className="text-[10px] font-bold text-gray-600 hover:text-white uppercase tracking-widest pt-4 transition-colors">
                        Return to Dashboard
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

/* HELPER COMPONENT: Styled Input */
function FormInput({ icon, placeholder, value, onChange }: any) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#D4AF37] transition-colors">{icon}</div>
      <input required type="text" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#010810] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all placeholder:text-gray-700" />
    </div>
  );
}