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
  ChevronRight,
  PackageCheck,
  IndianRupee
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
    // STRICT OVERFLOW CONTROL
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-x-hidden w-full relative font-sans">
      
      {/* 🌌 Background Depth (Golden Glow) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/10 blur-[160px] top-[-10%] right-[-10%] rounded-full" />
        <div className="absolute w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[150px] bottom-[-10%] left-[-10%] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- STAGE 1: CONTEXT ENTRY --- */}
        <section className="mb-12 text-center">
          <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
            Most centers focus on the machine cost. But your daily medical supplies drive 70% of your lifetime expenses.
          </p>
        </section>

        {/* --- STAGE 2: HERO (PLAIN ENGLISH) --- */}
        <section className="mb-24 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8 shadow-[0_0_20px_rgba(198,168,90,0.15)]">
            <PackageCheck size={14}/> Smart Supply Management
          </motion.div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8">
            Stop Overpaying for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Dialysis Supplies.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed">
            The machines are just the start. If you buy dialyzers and fluids at retail prices, your profits disappear. We give you <strong className="text-white">locked-in, wholesale prices</strong> so your center stays highly profitable every single month.
          </p>
        </section>

        {/* --- STAGE 3: REVENUE ECONOMICS --- */}
        <section className="mb-32 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">Protect Your <br/> Monthly Profit.</h3>
            <p className="text-gray-400 font-medium leading-relaxed text-lg">
              Making money in dialysis is about volume and controlling your daily costs. Buying supplies from multiple small vendors creates hidden price hikes that slowly destroy your margins. We lock your prices down.
            </p>
            <div className="flex items-start gap-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5 mt-8">
              <Briefcase className="text-[#C6A85A] shrink-0 mt-1" size={24} />
              <p className="text-sm font-bold text-gray-300 italic leading-relaxed">"If you don't control the cost of your daily medical supplies, your dialysis business will struggle to survive."</p>
            </div>
          </div>
          
          <div className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#1A160C] border border-[#C6A85A]/20 shadow-[0_20px_60px_rgba(198,168,90,0.1)] backdrop-blur-2xl">
            <ul className="space-y-8">
              <ModelRow label="Average Monthly Revenue" value="₹32 – 60 Lakhs" />
              <ModelRow label="Supply Cost Per Session" value="₹800 – 1,500 / Session" />
              <div className="h-px bg-white/10 my-6" />
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[#C6A85A] bg-[#C6A85A]/10 p-5 rounded-2xl border border-[#C6A85A]/20">
                <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2"><IndianRupee size={16}/> Profit Margin Increase</span>
                <span className="text-2xl md:text-3xl tracking-tighter font-black">+18% Advantage</span>
              </div>
            </ul>
          </div>
        </section>

        {/* --- STAGE 4: INTENT-BASED LEAD CAPTURE --- */}
        <section className="mb-32">
          <div className="p-10 md:p-16 rounded-[3.5rem] bg-[#0D1525]/80 backdrop-blur-3xl border border-[#C6A85A]/30 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A85A]/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C6A85A]/5 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">Get Your Custom Supply & Profit Plan</h3>
              <p className="text-gray-400 font-medium mb-10 max-w-xl mx-auto text-base leading-relaxed">
                Enter your project details to see exactly how much you can save on medical supplies every month.
              </p>
              
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
                <SelectBox 
                  value={form.machines} 
                  onChange={(v: string) => setForm({...form, machines: v})}
                  options={["5–10 Machines", "10–20 Machines", "20–40 Machines"]} 
                />
                <input 
                  placeholder="City / Location" 
                  value={form.location}
                  onChange={(e) => setForm({...form, location: e.target.value})}
                  className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl p-5 text-sm font-bold text-white focus:border-[#C6A85A] outline-none transition-colors shadow-inner" 
                />
                <SelectBox 
                  value={form.intent} 
                  onChange={(v: string) => setForm({...form, intent: v})}
                  options={["New Dialysis Center", "Hospital Expansion", "Investment Project"]} 
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
                className="bg-[#C6A85A] text-[#0A0F1C] px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_15px_40px_rgba(198,168,90,0.25)] hover:bg-[#D4B970] hover:scale-105 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Generating Plan..." : "Calculate My Savings"}
              </button>

              {error && (
                <div className="mt-6 inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-5 py-3 rounded-xl border border-red-500/20">
                  <AlertTriangle size={16}/>
                  <p className="text-[10px] uppercase font-black tracking-widest">{error}</p>
                </div>
              )}

              <div className="mt-12 border-t border-white/5 pt-8">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                  Used by hospital owners and nephrologists across South Gujarat.
                </p>
                <p className="text-[10px] text-[#C6A85A] mt-2 uppercase tracking-widest font-black">
                  Limited capacity: We only accept 2–3 supply contracts per region per quarter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- STAGE 5: URGENCY & LOGIC --- */}
        <section className="mb-32 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">The Dangers of Buying on the Open Market</h3>
          <p className="text-gray-400 font-medium max-w-xl mx-auto mb-12 text-lg">
            A 20-machine center can lose <strong className="text-white tracking-tight">₹5–10 lakhs every month</strong> just by overpaying for dialyzers and fluids.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <FailureCard 
              title="Changing Prices" 
              desc="Buying from the open market means prices change every week, making it impossible to predict your monthly profits." 
              icon={<TrendingUp size={24} className="text-red-500" />} 
            />
            <FailureCard 
              title="Running Out of Stock" 
              desc="Relying on multiple small vendors means you might run out of critical fluids, forcing you to turn patients away." 
              icon={<AlertTriangle size={24} className="text-red-500" />} 
            />
            <FailureCard 
              title="Poor Quality Control" 
              desc="Using different brands of supplies every month puts patient safety at risk and hurts your NABH hospital compliance." 
              icon={<ShieldCheck size={24} className="text-red-500" />} 
            />
          </div>
        </section>

        {/* --- STAGE 6: SYSTEM CONTINUITY --- */}
        <section className="mb-32 p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[#C6A85A]/5 blur-[120px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-6">Everything Under One Roof.</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
              We don't just sell you machines. We deliver the equipment, install the software, and deliver your daily medical supplies so your center runs without interruptions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/turnkey">
                <button className="w-full sm:w-auto bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  View Turnkey Setup <ArrowRight size={16}/>
                </button>
              </Link>
              <Link href="/execution-partner/diacare">
                <button className="text-[11px] text-[#C6A85A] font-black uppercase tracking-widest hover:text-[#D4B970] transition-colors underline underline-offset-4">
                  See Our Equipment Models →
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- STAGE 7: FINAL CALL & WHATSAPP LAYER --- */}
        <div className="text-center pb-12">
          <Link href="/calculator">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_15px_40px_rgba(198,168,90,0.25)] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center gap-3 mx-auto">
              Calculate Full Setup & Supply Cost <ArrowRight size={16}/>
            </button>
          </Link>
          <a 
            href="https://wa.me/919879576332?text=I%20want%20to%20discuss%20dialysis%20supply%20contracts"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 text-[11px] font-black uppercase tracking-widest text-[#C6A85A] hover:text-[#D4B970] transition-colors"
          >
            <MessageCircle size={16}/> Discuss Supply Pricing on WhatsApp
          </a>
        </div>
      </div>

      {/* --- STICKY CONVERSION --- */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50">
        <Link href="/calculator">
          <motion.button whileHover={{ scale: 1.05 }} className="bg-[#C6A85A] text-[#0A0F1C] p-4 md:p-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-[#F1E5AC]/50">
            Calculate Profit <ChevronRight size={16}/>
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
        className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl p-5 text-sm font-bold text-gray-300 outline-none focus:border-[#C6A85A] appearance-none cursor-pointer transition-colors shadow-inner"
      >
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#C6A85A] pointer-events-none" size={18} />
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
    <div className="p-8 md:p-10 rounded-[2.5rem] bg-red-950/10 border border-red-900/20 hover:border-red-500/30 transition-all group shadow-lg">
      <div className="mb-6 w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform border border-red-500/20">
        {icon}
      </div>
      <h4 className="text-xl font-black text-white mb-4 tracking-tight">{title}</h4>
      <p className="text-sm font-medium text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}