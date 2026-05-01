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
  Server,
  TrendingUp
} from "lucide-react";
import { saveUserIntent } from "@/utils/intentTracker"; 

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

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
            Clinical Protocol Enforced. Operations Controlled. Revenue Captured.
          </p>
        </div>
        <Link href="/calculator">
          <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_0_15px_rgba(198,168,90,0.3)]">
            Simulate Center Yield
          </button>
        </Link>
      </motion.div>

      {/* --- HERO: THE DECISION ENGINE --- */}
      <section className="relative pt-32 pb-16 px-6">
        <motion.div style={{ y }} className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-[#C6A85A]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#00A8A8]/10 blur-[120px] rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-6">
            The Sovereign Execution Layer · South Gujarat
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            From Empty Machines to <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">90% Utilization.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-10 font-medium mx-auto md:mx-0">
            We guarantee predictable dialysis unit performance. Not just equipment—a complete <span className="text-white font-bold">Clinical Operating System</span> that forces protocol compliance, stops PM-JAY claim rejections, and captures lost revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link href="/calculator" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("interest", "Yield Simulator")}
                className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,168,90,0.2)]"
              >
                Simulate Your Center in 60s <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/clinical-os/technician-portal" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <Server size={16} className="text-[#00A8A8]"/> View Live Shift Floor
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- COMPACT AUTHORITY BAR --- */}
      <section className="border-y border-white/5 bg-[#0D1525]/50 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <span className="flex items-center gap-2"><span className="text-[#00A8A8]">✓</span> Zero Infection Breach</span>
          <span className="flex items-center gap-2"><span className="text-[#00A8A8]">✓</span> Algorithmic Shift Control</span>
          <span className="flex items-center gap-2"><span className="text-[#00A8A8]">✓</span> PM-JAY Billing Automation</span>
        </div>
      </section>

      {/* --- THE SHIFT: PROBLEM VS SOLUTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* THE RISK */}
          <div className="p-10 rounded-[2.5rem] bg-red-950/10 border border-red-900/20">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-500" size={24}/>
              <h3 className="text-xl font-black text-white">The Hidden Costs of Manual Operations</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
              Dialysis margins are tight. If you rely on human scheduling and manual vitals entry, your center is bleeding capital every single shift.
            </p>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li className="flex items-start gap-3"><span className="text-red-500 mt-0.5">✕</span> 1 idle machine per shift = ₹1.8–2.5L/month loss.</li>
              <li className="flex items-start gap-3"><span className="text-red-500 mt-0.5">✕</span> Missing manual vitals trigger 12%+ PM-JAY claim rejections.</li>
              <li className="flex items-start gap-3"><span className="text-red-500 mt-0.5">✕</span> Overloaded technicians compromise clinical care and audits.</li>
            </ul>
          </div>

          {/* THE SOLUTION */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/20 shadow-[0_20px_50px_rgba(0,168,168,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-[#00A8A8]" size={24}/>
              <h3 className="text-xl font-black text-white">The Sovereign OS Architecture</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
              You own the asset. We provide the control layer. We underwrite, build, supply, and digitally orchestrate your facility for maximum yield.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/calculator"><MiniSystem icon={<Calculator/>} title="DPR & Yield Models" desc="Interactive break-even analysis." /></Link>
              <Link href="/turnkey"><MiniSystem icon={<Building2/>} title="Turnkey Build" desc="AAMI & NABH compliant infra." /></Link>
              <Link href="/supply"><MiniSystem icon={<PackageCheck/>} title="Supply Engine" desc="Guaranteed consumable pricing." /></Link>
              <Link href="/clinical-os/technician-portal"><MiniSystem icon={<Server/>} title="Clinical OS" desc="Real-time shift & billing control." /></Link>
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
    <div className="p-4 bg-[#0A0F1C] rounded-xl border border-white/5 hover:border-[#C6A85A]/30 transition-colors group cursor-pointer h-full">
      <div className="flex items-center gap-3 mb-2 text-gray-400 group-hover:text-[#C6A85A] transition-colors">
        {React.cloneElement(icon, { size: 16 })}
        <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{title}</h4>
      </div>
      <p className="text-xs text-gray-500 font-medium">{desc}</p>
    </div>
  );
}