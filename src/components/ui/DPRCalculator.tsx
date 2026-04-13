"use client";

import React, { useState } from "react";
import { IndianRupee, Download, Activity, Target, ShieldCheck, X, User, Building2, Phone, Loader2, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface InputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
}

interface CardProps {
  title: string;
  value: string | number;
  highlight?: "gold" | "blue" | boolean;
  isCurrency?: boolean;
}

export default function DPRCalculator() {
  const [machines, setMachines] = useState(10);
  const [sessionsPerDay, setSessionsPerDay] = useState(20);
  const [pricePerSession, setPricePerSession] = useState(1800);
  const [mode, setMode] = useState<"reuse" | "single">("reuse");

  // Lead Capture State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [leadData, setLeadData] = useState({ name: "", hospital: "", phone: "" });

  /* ---------- COST LOGIC ---------- */
  const reuseCycles = 6;
  const dialyzerBase = 1200;
  const dialyzerCost = mode === "reuse" ? dialyzerBase / reuseCycles : dialyzerBase;

  const tubing = 250;
  const staff = 400;
  const electricity = 150;
  const misc = 200;

  const costPerSession = dialyzerCost + tubing + staff + electricity + misc;

  /* ---------- VOLUME ---------- */
  const monthlySessions = sessionsPerDay * 30;

  /* ---------- FINANCIALS ---------- */
  const monthlyRevenue = monthlySessions * pricePerSession;
  const monthlyCost = monthlySessions * costPerSession;

  const profit = monthlyRevenue - monthlyCost;
  const margin = monthlyRevenue > 0 ? (profit / monthlyRevenue) * 100 : 0;

  /* ---------- CAPEX ---------- */
  const machineCost = machines * 650000;
  const infraCost = 500000;
  const roCost = machines > 10 ? 450000 : 250000;

  const totalCapex = machineCost + infraCost + roCost;
  const breakevenMonths = profit > 0 ? totalCapex / profit : 0;

  /* ---------- FUNNEL HANDLERS ---------- */
  const updateLeadData = (key: string, value: string) => {
    setLeadData(prev => ({ ...prev, [key]: value }));
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Format the intelligent WhatsApp payload
    const text = `*New DPR Model Generated*%0A%0A*Lead Details:*%0A👤 Name: ${leadData.name}%0A🏥 Hospital: ${leadData.hospital}%0A📞 Phone: ${leadData.phone}%0A%0A*Financial Model:*%0A🛏️ Capacity: ${machines} Machines%0A🔄 Model: ${mode === 'reuse' ? 'Reuse' : 'Single-Use'}%0A💰 Est. CAPEX: ₹${(totalCapex/100000).toFixed(2)} Lakhs%0A📈 Est. Break-even: ${breakevenMonths.toFixed(1)} Months%0A%0A_Generated via Innovate IndAI Platform_`;
    
    setTimeout(() => {
      setFormStatus("success");
      // Fire WhatsApp Automation
      window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
    }, 2000);
  };

  const handleDownloadPDF = () => {
    // Native print trigger styled for PDF export via CSS media queries
    window.print();
  };

  const themeColor = mode === "reuse" ? "#D4AF37" : "#3B82F6";
  const themeGlow = mode === "reuse" ? "focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/20" : "focus:border-blue-500/50 focus:ring-blue-500/20";

  return (
    <>
      <GlassCard accentColor={mode === "reuse" ? "gold" : "blue"} hover={false} className="max-w-6xl mx-auto p-8 lg:p-10 relative z-10 print-friendly">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
          <div className={`p-3 rounded-xl ${mode === "reuse" ? "bg-[#D4AF37]/10" : "bg-blue-500/10"}`}>
            <Target className={mode === "reuse" ? "text-[#D4AF37]" : "text-blue-500"} size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">AI DPR Engine</h2>
            <p className="text-sm text-gray-400">Dynamic feasibility and ROI projection model.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT: INPUT PANEL */}
          <div className="space-y-6 hide-on-print">
            <div className="flex bg-[#010810] p-1.5 rounded-xl border border-white/10 shrink-0 mb-6">
              <button
                onClick={() => setMode("reuse")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  mode === "reuse"
                    ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Reuse
              </button>
              <button
                onClick={() => setMode("single")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  mode === "single"
                    ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Single Use
              </button>
            </div>

            <div className="space-y-5 bg-[#010810] p-6 rounded-2xl border border-white/5">
              <Input label="Dialysis Machines" value={machines} setValue={setMachines} />
              <Input label="Est. Sessions / Day" value={sessionsPerDay} setValue={setSessionsPerDay} />
              <Input label="Price / Session" value={pricePerSession} setValue={setPricePerSession} prefix="₹" />
            </div>
          </div>

          {/* RIGHT: KPI PANEL */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6 print-w-full">
            <StatCard title="Monthly Revenue" value={monthlyRevenue} isCurrency />
            <StatCard title="Monthly OPEX" value={monthlyCost} isCurrency />
            
            <StatCard 
              title="EBITDA (Monthly Profit)" 
              value={profit} 
              isCurrency 
              highlight={mode === "reuse" ? "gold" : "blue"} 
            />
            <StatCard title="Profit Margin" value={`${margin.toFixed(1)}%`} />

            <StatCard title="Total Required CAPEX" value={totalCapex} isCurrency />
            <StatCard 
              title="Capital Break-even" 
              value={breakevenMonths > 0 ? `${breakevenMonths.toFixed(1)} Months` : "Never"} 
              highlight={mode === "reuse" ? "gold" : "blue"} 
            />
          </div>

        </div>

        {/* DOWNLOAD CTA -> TRIGGERS MODAL */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-10 w-full bg-white hover:bg-gray-200 text-[#010810] py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] hide-on-print"
        >
          <Download size={18} /> Generate Official DPR Report
        </button>
      </GlassCard>

      {/* ================= POST-DPR LEAD CAPTURE FUNNEL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 hide-on-print">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => formStatus !== "submitting" && setIsModalOpen(false)}
              className="absolute inset-0 bg-[#010810]/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#0a1118] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1.5" style={{ backgroundColor: themeColor }} />

              {formStatus !== "submitting" && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors bg-white/5 p-1.5 rounded-full"
                >
                  <X size={20} />
                </button>
              )}

              <div className="p-8">
                
                {/* STATE 1: LEAD CAPTURE */}
                {formStatus === "idle" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Target className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2 text-white">Save Your Model</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                      Enter your details to securely log your {machines}-bed model and receive a detailed breakdown.
                    </p>

                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input required type="text" placeholder="Full Name" value={leadData.name} onChange={(e) => updateLeadData("name", e.target.value)} className={`w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 ${themeGlow}`} />
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input required type="text" placeholder="Hospital / Project Name" value={leadData.hospital} onChange={(e) => updateLeadData("hospital", e.target.value)} className={`w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 ${themeGlow}`} />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input required type="tel" placeholder="WhatsApp Phone Number" value={leadData.phone} onChange={(e) => updateLeadData("phone", e.target.value)} className={`w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 ${themeGlow}`} />
                      </div>

                      <button 
                        type="submit"
                        className="w-full mt-4 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: themeColor, color: mode === "reuse" ? "#010810" : "#ffffff", boxShadow: `0 0 20px ${themeColor}40` }}
                      >
                        Compile & Continue <ArrowRight size={16} />
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* STATE 2: PROCESSING */}
                {formStatus === "submitting" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                    <Loader2 className="animate-spin mb-6" size={48} style={{ color: themeColor }} />
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Architecting Financial Model...</h3>
                    <p className="text-sm text-gray-400">Locking in parameters for {leadData.hospital}.</p>
                  </motion.div>
                )}

                {/* STATE 3: POST-DPR SUCCESS FUNNEL */}
                {formStatus === "success" && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">DPR Secured.</h3>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed px-2">
                      Your financial model has been registered and sent to our consulting team via WhatsApp.
                    </p>
                    
                    <div className="space-y-3 w-full">
                      {/* Booking CTA */}
                      <button 
                        onClick={() => window.open('/start', '_self')}
                        className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                        style={{ backgroundColor: themeColor, color: mode === "reuse" ? "#010810" : "#ffffff" }}
                      >
                        <Calendar size={16} /> Book Strategy Call
                      </button>

                      {/* PDF Export Trigger */}
                      <button 
                        onClick={handleDownloadPDF}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={16} /> Print / Save PDF
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CSS for PDF Generation */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .print-friendly, .print-friendly * { visibility: visible; }
          .print-friendly { position: absolute; left: 0; top: 0; width: 100%; border: none !important; box-shadow: none !important; background: white !important; color: black !important; }
          .print-friendly p, .print-friendly h2, .print-friendly h3, .print-friendly span { color: black !important; }
          .hide-on-print { display: none !important; }
          .print-w-full { display: block !important; width: 100% !important; margin-top: 20px; }
          .print-friendly div { border-color: #ddd !important; }
        }
      `}} />
    </>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function Input({ label, value, setValue, prefix }: InputProps) {
  return (
    <div>
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`w-full bg-black/40 border border-white/10 rounded-xl py-3 text-sm font-bold text-white focus:outline-none focus:border-white/30 transition-colors ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, highlight, isCurrency }: CardProps) {
  const isGold = highlight === "gold";
  const isBlue = highlight === "blue";

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isGold ? "bg-[#D4AF37]/10 border-[#D4AF37]/30" : 
      isBlue ? "bg-blue-500/10 border-blue-500/30" : 
      "bg-white/[0.02] border-white/5"
    }`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${
        isGold ? "text-[#D4AF37]" : isBlue ? "text-blue-400" : "text-gray-500"
      }`}>
        {title}
      </p>
      <p className="text-3xl font-black tracking-tighter flex items-center text-white print-text-black">
        {isCurrency && typeof value === "number" && <IndianRupee size={24} className="opacity-50 mr-1" />}
        {typeof value === "number" && isCurrency
          ? (value / 100000).toFixed(2) + "L"
          : value}
      </p>
    </div>
  );
}