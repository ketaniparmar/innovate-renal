"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, User, Building2, Phone, ArrowRight, 
  CheckCircle2, Activity, Cpu, Loader2, Download, 
  MessageSquare, ShieldCheck, Terminal
} from "lucide-react";

// ✅ UPGRADED: Synchronized with Workspace V8 Engine Outputs
interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  contextData?: {
    machines: number | string;
    breakeven: number | string;
    profit: number | string;
    irr: number | string; // Added IRR tracking
  };
}

export function LeadCaptureModal({ isOpen, onClose, source = "Sovereign OS Engine", contextData }: LeadCaptureModalProps) {
  const [step, setStep] = useState<"analyzing" | "capture" | "processing" | "success">("analyzing");
  const [formData, setFormData] = useState({ name: "", hospital: "", phone: "" });
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [logIndex, setLogIndex] = useState(0);

  // Bloomberg-style terminal logs for perceived value
  const logs = [
    "> INITIATING SOVEREIGN OS V8.0 CORE...",
    "> SYNCING GUJARAT HEALTHCARE REGULATORY DATA...",
    "> CALCULATING REVENUE LEAKAGE VECTORS...",
    "> CALIBRATING BREAK-EVEN HORIZON...",
    "> AUDIT READY: DPR GENERATED SUCCESSFULLY."
  ];

  useEffect(() => {
    if (isOpen) {
      setStep("analyzing");
      setLogIndex(0);
      const logTimer = setInterval(() => {
        setLogIndex(prev => (prev < logs.length - 1 ? prev + 1 : prev));
      }, 400);
      const stepTimer = setTimeout(() => setStep("capture"), 2400);
      return () => { clearInterval(logTimer); clearTimeout(stepTimer); };
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");

    const { machines = "0", breakeven = "0", profit = "0", irr = "0" } = contextData || {};
    const formattedProfit = typeof profit === 'number' ? (profit / 100000).toFixed(2) : profit;

    // Professional Business Narrative for WhatsApp
    const rawMessage = `*🚨 SOVEREIGN OS: NEW PROJECT AUDIT*\n\n*INSTITUTION:* ${formData.hospital}\n*DIRECTOR:* ${formData.name}\n*CONTACT:* ${formData.phone}\n\n*DPR SNAPSHOT:*\n→ SCALE: ${machines} Machines\n→ PROJECTED IRR: ${irr}%\n→ BREAK-EVEN: ${breakeven} Months\n→ MONTHLY EBITDA: ₹${formattedProfit} Lakhs\n\n_Audit generated via Innovate IndAI Sovereign OS._`;
    
    const encodedMessage = encodeURIComponent(rawMessage);
    const finalUrl = `https://wa.me/919879576332?text=${encodedMessage}`;
    setWhatsappUrl(finalUrl);

    setTimeout(() => {
      setStep("success");
      window.open(finalUrl, '_blank');
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0A0F1C]/95 backdrop-blur-xl" // Deep Navy Brand Base
            onClick={() => (step === "capture" || step === "success") && onClose()}
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-lg bg-[#0A1118] border border-white/5 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Brand Accent Bar (Gold) */}
            <motion.div 
              className="h-1 w-full bg-[#C6A85A]" 
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }}
            />

            <div className="p-10 min-h-[520px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: ANALYSIS TERMINAL */}
                {step === "analyzing" && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono">
                    <div className="flex items-center gap-3 mb-8 text-[#00A8A8]"> {/* Teal Accent */}
                      <Terminal size={20} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Sovereign OS Diagnostic</span>
                    </div>
                    <div className="space-y-3">
                      {logs.slice(0, logIndex + 1).map((log, i) => (
                        <p key={i} className={`text-sm ${i === logIndex ? "text-white" : "text-gray-600"}`}>
                          {log}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: INSTITUTIONAL CAPTURE */}
                {step === "capture" && (
                  <motion.div key="capture" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#C6A85A]/10 border border-[#C6A85A]/20 flex items-center justify-center text-[#C6A85A]">
                        <ShieldCheck size={28} />
                      </div>
                      <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                        <X size={16} />
                      </button>
                    </div>

                    <h3 className="text-4xl font-black tracking-tighter text-white mb-3">Model Secured.</h3>
                    <p className="text-gray-400 text-sm mb-10 leading-relaxed max-w-sm">
                      Our intelligence engine has finalized your project architecture. Enter your credentials to unlock the audit-ready DPR.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <FormInput type="text" icon={<User size={16}/>} placeholder="Full Name / Director" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                      <FormInput type="text" icon={<Building2 size={16}/>} placeholder="Hospital Name" value={formData.hospital} onChange={(v) => setFormData({...formData, hospital: v})} />
                      <FormInput type="tel" icon={<Phone size={16}/>} placeholder="WhatsApp for Instant Delivery" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} />

                      <button className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] mt-4 transition-all shadow-[0_15px_40px_rgba(198,168,90,0.15)] flex items-center justify-center gap-2">
                        Unlock Audit Data <ArrowRight size={14} />
                      </button>
                    </form>
                    <p className="text-center text-[9px] text-gray-600 uppercase tracking-widest mt-6">ISO 9001:2026 Compliant | 256-bit Encrypted</p>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS & CLOSING */}
                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(0,168,168,0.2)]">
                      <CheckCircle2 size={40} className="text-[#00A8A8]" />
                    </div>
                    <h3 className="text-4xl font-black text-white mb-3 tracking-tighter">Ready for Review.</h3>
                    <p className="text-gray-400 text-sm mb-12 max-w-xs mx-auto leading-relaxed">
                      Your model with a **{contextData?.irr}% IRR** has been registered. Our specialists are reviewing the clinical infrastructure.
                    </p>
                    
                    <div className="space-y-4 w-full">
                      <button 
                        onClick={() => window.open(whatsappUrl, '_blank')}
                        className="w-full bg-[#25D366] hover:bg-[#22C35E] text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
                      >
                        <MessageSquare size={16} /> Open Report on WhatsApp
                      </button>
                      <button onClick={onClose} className="w-full py-5 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                        Close Dashboard
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

// Sub-component for strict typing
interface FormInputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
}

function FormInput({ icon, placeholder, value, onChange, type }: FormInputProps) {
  return (
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00A8A8] transition-colors">{icon}</div>
      <input 
        required type={type} placeholder={placeholder} value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full bg-[#010810] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-sm text-white focus:outline-none focus:border-[#00A8A8]/50 focus:ring-1 focus:ring-[#00A8A8]/20 transition-all placeholder:text-gray-700" 
      />
    </div>
  );
}