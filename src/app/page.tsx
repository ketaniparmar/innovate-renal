"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle,
  Building2,
  PackageCheck,
  Calculator,
  MessageCircle
} from "lucide-react";
// Ensure this utility exists to capture user signals for the ROI calculator
import { saveUserIntent } from "@/utils/intentTracker"; 

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Intent Trigger: Sticky CTA appears earlier (20% scroll) to capture high-intent users
  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-hidden relative">
      
      {/* --- STICKY CONVERSION STRIP --- */}
      <motion.div 
        initial={{ y: -100 }} animate={{ y: showStickyCTA ? 0 : -100 }}
        className="fixed top-20 left-0 w-full z-40 bg-[#0D1525]/95 backdrop-blur-md border-b border-white/10 py-3 px-6 hidden md:flex justify-between items-center shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-[#00A8A8]" />
          <p className="text-xs font-black uppercase tracking-widest text-white">
            Planning a ₹5–25Cr setup? Stop guessing.
          </p>
        </div>
        <Link href="/calculator">
          <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_0_15px_rgba(198,168,90,0.3)]">
            Calculate Setup Cost
          </button>
        </Link>
      </motion.div>

      {/* --- HERO: BLUNT & INVESTOR-CENTRIC --- */}
      <section className="relative pt-32 pb-16 px-6">
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#C6A85A]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#00A8A8]/10 blur-[120px] rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-6">
            Official DiaCare Partner · South Gujarat
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Build a Dialysis Center That <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Actually Generates Profit.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10 font-medium mx-auto md:mx-0">
            Most consultants hand you a machine and walk away. We engineer the entire system—from exact financial underwriting to guaranteed consumable supply lines.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link href="/calculator" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("interest", "Setup Cost Calculator")}
                className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,168,90,0.2)]"
              >
                Calculate My Setup Cost <ArrowRight size={16}/>
              </button>
            </Link>
            <a href="https://wa.me/919879576332" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <MessageCircle size={16} className="text-[#00A8A8]"/> Chat with a Director
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* --- COMPACT AUTHORITY BAR --- */}
      <section className="border-y border-white/5 bg-[#0D1525]/50 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <span className="flex items-center gap-2"><span className="text-[#00A8A8]">✓</span> 16-Week Execution</span>
          <span className="flex items-center gap-2"><span className="text-[#00A8A8]">✓</span> NABH-Ready Civil Works</span>
          <span className="flex items-center gap-2"><span className="text-[#00A8A8]">✓</span> Locked Consumable Pricing</span>
        </div>
      </section>

      {/* --- THE SHIFT: PROBLEM VS SOLUTION (SIDE-BY-SIDE TO REDUCE SCROLL) --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* THE RISK: Loss Framing */}
          <div className="p-10 rounded-[2.5rem] bg-red-950/10 border border-red-900/20">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-500" size={24}/>
              <h3 className="text-xl font-black text-white">Why 60% of Centers Bleed Capital</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Dialysis is a recurring supply-driven model. If you don't control costs early, your margins vanish.
            </p>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li className="flex items-start gap-3"><span className="text-red-500 mt-0.5">✕</span> Civil contractor delays drain pre-launch cash.</li>
              <li className="flex items-start gap-3"><span className="text-red-500 mt-0.5">✕</span> Wrong equipment mixes cause high maintenance.</li>
              <li className="flex items-start gap-3"><span className="text-red-500 mt-0.5">✕</span> Open-market consumables destroy per-session profit.</li>
            </ul>
          </div>

          {/* THE SOLUTION: The Innovate India Moat */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/20 shadow-[0_20px_50px_rgba(0,168,168,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-[#00A8A8]" size={24}/>
              <h3 className="text-xl font-black text-white">The Sovereign Execution System</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              You own the asset. We handle the headaches. One contract to underwrite, build, and supply your facility.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MiniSystem icon={<Calculator/>} title="DPR Modeling" desc="Know your exact break-even." />
              <MiniSystem icon={<Building2/>} title="Turnkey Build" desc="AAMI & NABH compliant infra." />
              <MiniSystem icon={<ShieldCheck/>} title="DiaCare Setup" desc="AI-Series machine deployment." />
              <MiniSystem icon={<PackageCheck/>} title="Supply Line" desc="Guaranteed consumable pricing." />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

// --- TIGHT SUB-COMPONENT ---
function MiniSystem({ icon, title, desc }: any) {
  return (
    <div className="p-4 bg-[#0A0F1C] rounded-xl border border-white/5 hover:border-[#C6A85A]/30 transition-colors group cursor-pointer">
      <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-[#C6A85A] transition-colors">
        {icon}
        <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{title}</h4>
      </div>
      <p className="text-xs text-gray-500 font-medium">{desc}</p>
    </div>
  );
}