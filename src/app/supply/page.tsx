"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Briefcase,
  ChevronDown,
  MessageCircle,
  ChevronRight
} from "lucide-react";

export default function SupplyEnginePage() {
  const router = useRouter();
  
  // --- 1. LEAD CAPTURE & VALIDATION STATE ---
  const [form, setForm] = useState({
    machines: "5–10 Machines",
    location: "",
    intent: "New Dialysis Center",
    budget: "₹5–10 Cr Budget"
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!form.location.trim()) {
      setError("Please specify your project location.");
      return;
    }

    setIsSubmitting(true);

    try {
      // PERSISTENCE: Store for the Calculator Handshake
      localStorage.setItem("innovate_dialysis_intent", JSON.stringify(form));

      // BACKEND: Lead Capture API
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      router.push("/calculator");
    } catch (err) {
      console.error("Lead capture failed, proceeding to calculator.");
      setIsSubmitting(false); // Reset in case routing fails
      router.push("/calculator");
    }
  };

  return (
    // STRICT OVERFLOW CONTROL: Prevents mobile horizontal scrolling
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-x-hidden w-full relative font-sans">
      
      {/* 🌌 Background Depth (Locked inside overflow container) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/10 blur-[150px] top-[-200px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#00A8A8]/10 blur-[150px] bottom-[-100px] left-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- STAGE 1: CONTEXT ENTRY --- */}
        <section className="mb-12 text-center">
          <p className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
            Most dialysis centers focus strictly on setup cost. Very few optimize the clinical supply engine that drives 70% of lifetime revenue.
          </p>
        </section>

        {/* --- STAGE 2: HERO (SHOCK & POSITIONING) --- */}
        <section className="mb-24 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8">
            Strategic Asset Management
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            70% of Dialysis Revenue <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Runs Through This Layer.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            Infrastructure is the foundation, but <strong className="text-white">consumables are the engine</strong>. We provide the integrated supply rails to protect your session margins and ensure clinical continuity at scale.
          </p>
        </section>

        {/* --- STAGE 3: REVENUE ECONOMICS --- */}
        <section className="mb-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">Scale Beyond <br/> Single Session Math.</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Profitability in dialysis is a game of volume and clinical uptime. Fragmented procurement creates "silent leakage" that can destroy center IRR. Our model stabilizes your recurring economics.
            </p>
            <div className="flex items-start gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
              <Briefcase className="text-[#00A8A8] shrink-0 mt-1" size={24} />
              <p className="text-sm font-bold text-gray-300 italic leading-relaxed">"If you don't control your consumables, your dialysis business is financially unstable."</p>
            </div>
          </div>
          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-white/10 shadow-[0_20px_50px_rgba(0,168,168,0.05)] backdrop-blur-xl">
            <ul className="space-y-6">
              <ModelRow label="Avg. Monthly Revenue" value="₹32 – 60 Lakhs" />
              <ModelRow label="Consumable OPEX Load" value="₹800 – 1,500 / Session" />
              <div className="h-px bg-white/10 my-6" />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[#00A8A8]">
                <span className="text-[11px] font-black uppercase tracking-widest">Supply Margin Gain</span>
                <span className="text-2xl md:text-3xl tracking-tighter font-black">+18% Advantage</span>
              </div>
            </ul>
          </div>
        </section>

        {/* --- STAGE 4: INTENT-BASED LEAD CAPTURE --- */}
        <section className="mb-32">
          <div className="p-10 md:p-14 rounded-[3.5rem] bg-[#0D1525] border border-[#C6A85A]/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A85A]/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A8A8]/10 blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Get Your Dialysis Supply & Profit Plan</h3>
              <p className="text-gray-400 font-medium mb-10 max-w-xl mx-auto text-sm leading-relaxed">
                Enter your project details and receive a customized consumables strategy with ROI projection.
              </p>
              
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
                <SelectBox 
                  value={form.machines} 
                  onChange={(v: string) => setForm({...form, machines: v})}
                  options={["5–10 Machines", "10–20 Machines", "20–40 Machines"]} 
                />
                <input 
                  placeholder="City / Location" 
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-sm font-bold text-white focus:border-[#C6A85A] outline-none transition-colors" 
                />
                <SelectBox 
                  value={form.intent} 
                  onChange={(v: string) => setForm({...form, intent: v})}
                  options={["New Dialysis Center", "Hospital Expansion", "Investor Project"]} 
                />
                <SelectBox 
                  value={form.budget} 
                  onChange={(v: string) => setForm({...form, budget: v})}
                  options={["₹5–10 Cr Budget", "₹10–20 Cr Budget", "₹20 Cr+ Budget"]} 
                />
              </form>
              
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Generating Plan..." : "Generate My Strategic Plan"}
              </button>

              {error && (
                <div className="mt-6 inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded border border-red-500/20">
                  <AlertTriangle size={14}/>
                  <p className="text-[10px] uppercase font-black tracking-widest">{error}</p>
                </div>
              )}

              <div className="mt-10 border-t border-white/5 pt-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                  Used by hospital owners, nephrologists, and healthcare investors across India.
                </p>
                <p className="text-[10px] text-[#C6A85A] mt-2 uppercase tracking-widest font-black">
                  Limited capacity: We onboard only 2–3 projects per region per quarter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- STAGE 5: URGENCY & LOGIC --- */}
        <section className="mb-32 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Every Month Without Optimization = Revenue Loss.</h3>
          <p className="text-gray-400 font-medium max-w-xl mx-auto mb-12">
            A 20-machine center can lose <strong className="text-white tracking-tight">₹5–10 lakhs/month</strong> due to inefficient consumables sourcing and fragmented logistics.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <FailureCard 
              title="Price Volatility" 
              desc="Unstructured sourcing leads to inconsistent cost per session, making forecasting impossible." 
              icon={<TrendingUp size={24} className="text-red-500" />} 
            />
            <FailureCard 
              title="Supply Disruption" 
              desc="Vendor dependency creates operational risk for critical patient care." 
              icon={<AlertTriangle size={24} className="text-red-500" />} 
            />
            <FailureCard 
              title="Zero Standardization" 
              desc="Quality variation impacts patient safety and NABH accreditation readiness." 
              icon={<ShieldCheck size={24} className="text-red-500" />} 
            />
          </div>
        </section>

        {/* --- STAGE 6: SYSTEM CONTINUITY --- */}
        <section className="mb-32 p-12 md:p-16 rounded-[4rem] bg-[#0D1525] border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[#00A8A8]/5 blur-[120px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6">Unified Execution Stack.</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              This supply engine is physically integrated with our infrastructure design and execution rails, ensuring operational control from day one.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/turnkey">
                <button className="w-full sm:w-auto bg-white/5 border border-white/10 px-8 py-4 rounded-xl text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  View Infrastructure System <ArrowRight size={14}/>
                </button>
              </Link>
              <Link href="/execution-partner/diacare">
                <button className="text-[10px] text-[#00A8A8] font-black uppercase tracking-widest hover:text-[#00A8A8]/80 transition-colors underline underline-offset-4">
                  See how we execute infra →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- STAGE 7: FINAL CALL & WHATSAPP LAYER --- */}
        <div className="text-center pb-12">
          <Link href="/calculator">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center gap-3 mx-auto">
              Get Full Feasibility Plan <ArrowRight size={16}/>
            </button>
          </Link>
          <a 
            href="https://wa.me/919879576332?text=I%20want%20to%20discuss%20a%20dialysis%20project%20feasibility"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-[11px] font-black uppercase tracking-widest text-[#00A8A8] hover:text-[#00A8A8]/80 transition-colors"
          >
            <MessageCircle size={14}/> Discuss instantly on WhatsApp
          </a>
        </div>
      </div>

      {/* --- STICKY CONVERSION --- */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
        <Link href="/calculator">
          <motion.button whileHover={{ scale: 1.05 }} className="bg-[#C6A85A] text-[#0A0F1C] p-4 md:p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-[#F1E5AC]/50">
            Get Feasibility <ChevronRight size={14}/>
          </motion.button>
        </Link>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function SelectBox({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-sm font-bold text-gray-300 outline-none focus:border-[#C6A85A] appearance-none cursor-pointer transition-colors"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00A8A8] pointer-events-none" size={16} />
    </div>
  );
}

function ModelRow({ label, value }: { label: string, value: string }) {
  return (
    <li className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 py-4 border-b border-white/5 last:border-0">
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="text-xl md:text-2xl tracking-tight font-black text-white">{value}</span>
    </li>
  );
}

function FailureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-red-950/10 border border-red-900/20 hover:border-red-500/30 transition-all group shadow-lg">
      <div className="mb-6 w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-red-500/20">
        {icon}
      </div>
      <h4 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h4>
      <p className="text-sm font-medium text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}