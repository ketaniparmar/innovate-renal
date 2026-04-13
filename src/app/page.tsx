"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, ShieldCheck, 
  Database, Network, TrendingUp, Building2, 
  AlertTriangle, CheckCircle2, Cpu, MessageSquare,
  BarChart3, Settings
} from "lucide-react";
import Link from "next/link";

// Core UI Components
import { GlassCard } from "@/components/ui/GlassCard";
import { OsButton } from "@/components/ui/OsButton";
import DialysisCostCalculator from "@/components/ui/DialysisCostCalculator";

export default function SaasHomepage() {
  return (
    <main className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] overflow-hidden font-sans">
      
      {/* ================= 1. HERO (AI OS POSITIONING) ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
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
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95]"
          >
            AI Operating System for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">
              Dialysis Infrastructure
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mt-10 mb-12 leading-relaxed"
          >
            Plan, simulate, and deploy dialysis centers with AI-powered DPR, 
            cost modeling, and zero-downtime service systems.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-lg"
          >
            {/* CTA FIX: High Intent Actions */}
            <OsButton label="Run Financial Model" variant="primary" href="#simulator" />
            <OsButton label="Generate DPR" variant="glass" href="/tools" />
          </motion.div>
        </div>
      </section>

      {/* ================= 2. PROBLEM AGITATION (HIGH IMPACT) ================= */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">
              Most Dialysis Projects Fail <br/> <span className="text-red-500">Before They Start.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
              Poor planning leads to capital loss, technical downtime, and overestimated ROI. 
              We solve the infrastructure gap before you break ground.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Overestimated ROI", icon: <TrendingUp className="text-red-400" /> },
                { title: "Wrong Machine Planning", icon: <Settings className="text-red-400" /> },
                { title: "High AMC Downtime", icon: <Activity className="text-red-400" /> },
                { title: "Poor Reuse Strategy", icon: <RefreshCcwIcon className="text-red-400" /> },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl flex flex-col items-center group hover:border-red-500/30 transition-all">
                  <div className="mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </div>
                  <p className="font-bold text-sm uppercase tracking-widest">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. LIVE ROI / DPR ENGINE (THE HOOK) ================= */}
      <section id="simulator" className="py-32 bg-gradient-to-b from-transparent to-[#D4AF37]/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Simulate Your Center in Seconds.
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              Real costs. Real ROI. Real investment-grade decisions.
            </p>
          </div>

          <DialysisCostCalculator />
          
          <div className="mt-12 text-center">
             <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">↑ Scroll to adjust parameters</p>
          </div>
        </div>
      </section>

      {/* ================= 4. SYSTEM ARCHITECTURE (IMPILO STYLE) ================= */}
      <section className="py-32 border-y border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6">Integration Layer</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">
            One Unified Operating System.
          </h3>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12 relative px-10">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 hidden md:block -translate-y-1/2" />
            <ArchNode label="Machines" icon={<Activity />} status="Infrastructure" />
            <ArchNode label="AI Engine" icon={<Zap />} status="Intelligence" active />
            <ArchNode label="DPR" icon={<Database />} status="Capitalization" />
            <ArchNode label="AMC" icon={<ShieldCheck />} status="Execution" />
            <ArchNode label="Profit" icon={<TrendingUp />} status="EBITDA" active />
          </div>
        </div>
      </section>

      {/* ================= 5. CASE STUDIES (PROOF) ================= */}
      <section className="py-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center mb-20">
            Proven Outcomes.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard accent="gold" className="p-10 border-[#D4AF37]/20">
               <h3 className="text-2xl font-black mb-2">Dahej Public Hospital</h3>
               <p className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest mb-8">50 Beds • ROI achieved in 8 Months</p>
               <p className="text-gray-400 text-sm leading-relaxed">
                 Deployed a full turnkey dialysis ecosystem including double-pass RO and automated reuse systems. Currently the highest volume center in the region.
               </p>
            </GlassCard>

            <GlassCard accent="blue" className="p-10 border-[#3B82F6]/20">
               <h3 className="text-2xl font-black mb-2">Nova Lifeline Hospital</h3>
               <p className="text-[#3B82F6] font-bold text-sm uppercase tracking-widest mb-8">Clinical Enterprise Setup</p>
               <p className="text-gray-400 text-sm leading-relaxed">
                 Integrated OS deployment for machine tracking and predictive AMC, resulting in 99.9% clinical uptime over the last 12 months.
               </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================= 6. CAPABILITIES (3 PILLARS) ================= */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
         <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-3 gap-12">
            <CapabilityBlock 
              title="AI Financial Modeling" 
              desc="Instant DPR generation and long-term OPEX forecasting for investors." 
              icon={<BarChart3 className="text-[#D4AF37]" />}
            />
            <CapabilityBlock 
              title="End-to-End Deployment" 
              desc="Turnkey setup of clinical infrastructure, RO systems, and NABH-compliant layouts." 
              icon={<Building2 className="text-[#3B82F6]" />}
            />
            <CapabilityBlock 
              title="Predictive Operations" 
              desc="Zero-downtime service systems with regional warehouse support in Surat." 
              icon={<Zap className="text-white" />}
            />
         </div>
      </section>

      {/* ================= 7. AI ASSISTANT (ALDEN LAYER) ================= */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard accent="white" className="p-12 text-center border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8">
              Ask Your AI Advisor.
            </h2>
            <div className="bg-[#010810] border border-white/10 rounded-2xl p-8 text-left max-w-2xl mx-auto shadow-2xl">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Sample Intelligence Queries</p>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex items-center gap-3 text-gray-300">
                  <ArrowRight size={14} className="text-[#D4AF37]" /> How many machines for a 100-bed facility?
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <ArrowRight size={14} className="text-[#D4AF37]" /> What is the EBITDA difference for Single-Use?
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <ArrowRight size={14} className="text-[#D4AF37]" /> Target break-even for Gujarat region?
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ================= 8. FINAL CTA (CONVERSION) ================= */}
      <section className="py-40 text-center px-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 max-w-4xl mx-auto leading-[0.95]">
            Build with Data, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 text-stroke">Not Guesswork.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <OsButton label="Generate My DPR" variant="primary" href="/tools" />
            <OsButton label="Book Consultation" variant="glass" href="/start" />
          </div>
        </motion.div>
      </section>

    </main>
  );
}

/* ================= HELPER COMPONENTS ================= */

function ArchNode({ label, icon, status, active }: any) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${active ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)]" : "bg-[#010810] text-gray-400 border-white/10 backdrop-blur-md"}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <p className="text-xs font-black uppercase tracking-widest text-white mb-1">{label}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">{status}</p>
    </div>
  );
}

function CapabilityBlock({ icon, title, desc }: any) {
  return (
    <div className="group">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/30 transition-all">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3 tracking-tight text-white">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function RefreshCcwIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
  );
}