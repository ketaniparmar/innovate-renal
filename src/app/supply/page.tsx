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
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-24 pb-24 px-6 overflow-hidden">
      
      {/* 🌌 Background Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/5 blur-[150px] top-[-200px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[150px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- STAGE 1: CONTEXT ENTRY --- */}
        <section className="mt-12 mb-16 text-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
            Most dialysis centers focus strictly on setup cost. Very few optimize the clinical supply engine that drives 70% of lifetime revenue.
          </p>
        </section>

        {/* --- STAGE 2: HERO (SHOCK & POSITIONING) --- */}
        <section className="mb-24 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8">
            Strategic Asset Management
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
            70% of Dialysis Revenue <br />
            <span className="text-white/60">Runs Through This Layer.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Infrastructure is the foundation, but **consumables are the engine**. We provide the integrated supply rails to protect your session margins and ensure clinical continuity at scale.
          </p>
        </section>

        {/* --- STAGE 3: REVENUE ECONOMICS --- */}
        <section className="mb-32 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-4xl font-black text-white leading-tight">Scale Beyond <br/> Single Session Math.</h3>
            <p className="text-gray-400 leading-relaxed">
              Profitability in dialysis is a game of volume and clinical uptime. Fragmented procurement creates "silent leakage" that can destroy center IRR. Our model stabilizes your recurring economics.
            </p>
            <div className="flex items-center gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5">
              <Briefcase className="text-[#00A8A8]" size={24} />
              <p className="text-xs font-medium text-gray-300 italic">"If you don't control your consumables, your dialysis business is financially unstable."</p>
            </div>
          </div>
          <div className="p-10 rounded-[3rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-xl">
            <ul className="space-y-6">
              <ModelRow label="Avg. Monthly Revenue" value="₹32 – 60 Lakhs" />
              <ModelRow label="Consumable OPEX Load" value="₹800 – 1,500 / Session" />
              <div className="h-px bg-white/10" />
              <div className="flex justify-between items-center text-[#00A8A8]">
                <span className="text-xs font-black uppercase tracking-widest">Supply Margin Gain</span>
                <span className="text-2xl font-black">+18% Advantage</span>
              </div>
            </ul>
          </div>
        </section>

        {/* --- STAGE 4: INTENT-BASED LEAD CAPTURE --- */}
        <section className="mb-32">
          <div className="p-12 rounded-[3.5rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A85A]/5 blur-[80px] pointer-events-none" />
            
            <h3 className="text-3xl font-black text-white mb-4">Get Your Dialysis Supply & Profit Plan</h3>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm">
              Enter your project details and receive a customized consumables strategy with ROI projection.
            </p>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
              <SelectBox 
                value={form.machines} 
                onChange={(v: string) => setForm({...form, machines: v})}
                options={["5–10 Machines", "10–20 Machines", "20–40 Machines"]} 
              />
              <input 
                placeholder="City / Location" 
                value={form.location}
                onChange={(e) => setForm({...form, location: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-[#C6A85A] outline-none" 
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
              className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl hover:scale-105 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Generating Plan..." : "Generate My Strategic Plan"}
            </button>

            {error && <p className="text-red-400 text-[10px] mt-4 uppercase font-bold tracking-widest">{error}</p>}

            <p className="text-[10px] text-gray-600 mt-8 uppercase tracking-widest font-black">
              Used by hospital owners, nephrologists, and healthcare investors across India.
            </p>
            <p className="text-[10px] text-[#C6A85A] mt-2 uppercase tracking-widest font-black">
              Limited capacity: We onboard only 2–3 projects per region per quarter.
            </p>
          </div>
        </section>

        {/* --- STAGE 5: URGENCY & LOGIC --- */}
        <section className="mb-32 text-center">
          <h3 className="text-3xl font-black text-white mb-4">Every Month Without Optimization = Revenue Loss.</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-12">
            A 20-machine center can lose <span className="text-white font-bold tracking-tight">₹5–10 lakhs/month</span> due to inefficient consumables sourcing and fragmented logistics.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FailureCard 
              title="Price Volatility" 
              desc="Unstructured sourcing leads to inconsistent cost per session, making forecasting impossible." 
              icon={<TrendingUp size={20} className="text-[#A6192E]" />} 
            />
            <FailureCard 
              title="Supply Disruption" 
              desc="Vendor dependency creates operational risk for critical patient care." 
              icon={<AlertTriangle size={20} className="text-[#A6192E]" />} 
            />
            <FailureCard 
              title="Zero Standardization" 
              desc="Quality variation impacts patient safety and NABH accreditation readiness." 
              icon={<ShieldCheck size={20} className="text-[#A6192E]" />} 
            />
          </div>
        </section>

        {/* --- STAGE 6: SYSTEM CONTINUITY --- */}
        <section className="mb-32 p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#00A8A8]/5 blur-[120px] pointer-events-none" />
          <h2 className="text-4xl font-black text-white mb-6">Unified Execution Stack.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            This supply engine is physically integrated with our infrastructure design and execution rails, ensuring operational control from day one.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link href="/turnkey">
              <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                View Turnkey Infrastructure System <ArrowRight size={14}/>
              </button>
            </Link>
            <Link href="/execution-partner/diacare">
              <button className="text-[10px] text-gray-500 font-black uppercase tracking-widest hover:text-white transition-colors underline underline-offset-4">
                See how we execute with real infrastructure →
              </button>
            </Link>
          </div>
        </section>

        {/* --- STAGE 7: FINAL CALL & WHATSAPP LAYER --- */}
        <div className="text-center">
          <Link href="/calculator">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg flex items-center gap-3 mx-auto">
              Get Full Feasibility + Supply Plan <ArrowRight size={16}/>
            </button>
          </Link>
          <a 
            href="https://wa.me/919879576332?text=I%20want%20to%20discuss%20a%20dialysis%20project%20feasibility"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-[10px] font-black uppercase tracking-widest text-[#00A8A8] hover:text-[#C6A85A] transition-colors"
          >
            <MessageCircle size={14}/> Discuss instantly on WhatsApp →
          </a>
        </div>
      </div>

      {/* --- STICKY CONVERSION --- */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link href="/calculator">
          <motion.button whileHover={{ scale: 1.1 }} className="bg-[#C6A85A] text-[#0A0F1C] p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2">
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
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-400 outline-none focus:border-[#C6A85A] appearance-none cursor-pointer"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt} className="bg-[#0A0F1C]">{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={16} />
    </div>
  );
}

function ModelRow({ label, value }: { label: string, value: string }) {
  return (
    <li className="flex justify-between items-center py-4 border-b border-white/5 last:border-0">
      <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-black text-white">{value}</span>
    </li>
  );
}

function FailureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-[#A6192E]/40 transition-all group">
      <div className="mb-6 w-12 h-12 bg-[#A6192E]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-lg font-bold text-white mb-3 tracking-tight">{title}</h4>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}