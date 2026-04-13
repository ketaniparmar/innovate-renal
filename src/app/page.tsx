"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, ShieldCheck, 
  Database, Network, TrendingUp, Building2, 
  AlertTriangle, CheckCircle2, Cpu
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OsButton } from "@/components/ui/OsButton";
import DialysisCostCalculator from "../components/ui/DialysisCostCalculator";

export default function SaasHomepage() {
  return (
    <main className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] overflow-hidden font-sans pt-20">
      
      {/* ================= STEP 1: OS POSITIONING HERO ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-8 backdrop-blur-md">
               <Cpu size={14} className="text-[#D4AF37]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">The Dialysis Infrastructure OS</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95] lg:max-w-5xl"
          >
            Plan. Build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Optimize. Scale.</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          >
            Stop guessing your clinical outcomes. Deploy the intelligence engine 
            used by Gujarat’s leading renal centers to lock in ROI.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-lg"
          >
            <OsButton label="Run ROI Simulator" variant="primary" href="/tools" />
            <OsButton label="Generate Custom DPR" variant="glass" href="/tools" />
          </motion.div>
        </div>
      </section>

      {/* ================= STEP 2: PROBLEM AGITATION (THE GAP) ================= */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 text-red-500">
              The Cost of Poor <br/> Planning: ₹2,00,00,000.
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Traditional equipment vendors sell you machines and leave. 
              They don’t account for the high-risk variables that kill profitability.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
               <ProblemBox title="Overestimated ROI" desc="Incorrect machine-to-session ratios lead to capital stagnation." />
               <ProblemBox title="AMC Downtime" desc="Every hour a machine is idle, your clinical revenue bleeds." />
               <ProblemBox title="Inefficient Reuse" desc="Poor reprocessing logic spikes your consumable OPEX by 40%." />
               <ProblemBox title="Compliance Failure" desc="Non-NABH layouts result in expensive retrospective civil fixes." />
            </div>
          </div>
          <div className="relative">
            <GlassCard accent="white" interactive={false} className="p-10 border-red-500/20">
               <div className="flex items-center gap-3 text-red-500 mb-6">
                 <AlertTriangle size={24} />
                 <span className="text-xs font-bold uppercase tracking-widest">Revenue Leakage Alert</span>
               </div>
               <p className="text-4xl font-black mb-2 text-white">₹ 50L — ₹ 2Cr</p>
               <p className="text-sm text-gray-500">Average capital loss in first 24 months due to unplanned infrastructure gaps.</p>
               <div className="mt-8 pt-8 border-t border-white/10">
                 <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">The Solution</p>
                 <p className="text-white font-medium">Innovate OS provides a verified, data-driven deployment framework that locks in break-even timelines.</p>
               </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================= STEP 3: THE SYSTEM (ARCHITECTURE) ================= */}
      <section className="py-32 px-6">
        <div className="max-w-[1280px] mx-auto text-center mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Platform Architecture</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">One Unified Infrastructure.</h3>
          <p className="text-gray-400 max-w-xl mx-auto">From intelligence to execution, we operate as the core layer of your renal business.</p>
        </div>

        <div className="max-w-[1000px] mx-auto relative px-10">
          {/* Connector Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block -translate-y-1/2" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <ArchNode icon={<Activity />} label="Machines" status="Infrastructure" />
            <ArchNode icon={<Zap />} label="AI Engine" status="Intelligence" active />
            <ArchNode icon={<Database />} label="DPR Report" status="Capitalization" />
            <ArchNode icon={<ShieldCheck />} label="AMC Support" status="Execution" />
            <ArchNode icon={<TrendingUp />} label="EBITDA" status="Profitability" active />
          </div>
        </div>
      </section>

      {/* ================= THE CALCULATOR (THE HOOK) ================= */}
      <section id="simulator" className="py-24 px-6 relative">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Run the ROI Simulator.</h2>
            <p className="text-gray-400">See the exact mathematics behind a 13-month break-even setup.</p>
          </div>
          <DialysisCostCalculator />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="pb-32 px-6">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-b from-[#D4AF37]/5 to-transparent border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
            Stop guessing. <br/> Start Scaling.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <OsButton label="Schedule Strategic Audit" variant="primary" href="/start" />
            <OsButton label="Run ROI Simulator" variant="glass" href="/tools" />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= SUB-COMPONENTS ================= */

function ProblemBox({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
       <h4 className="font-bold text-white text-sm mb-2">{title}</h4>
       <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ArchNode({ icon, label, status, active }: { icon: React.ReactNode, label: string, status: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 border transition-all duration-500 ${active ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_30px_rgba(212,175,55,0.4)] border-[#D4AF37]" : "bg-black/50 text-white border-white/10 backdrop-blur-md"}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">{label}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">{status}</p>
    </div>
  );
}