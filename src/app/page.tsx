"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, ShieldCheck, 
  Database, Network, TrendingUp, Building2, MessageSquare
} from "lucide-react";

// Utilizing the Design System components we established
import { GlassCard } from "@/components/ui/GlassCard";
import { OsButton } from "@/components/ui/OsButton";

export default function SaasHomepage() {
  const [machinesInput, setMachinesInput] = useState(10);
  const estimatedEbitda = (machinesInput * 1.8).toFixed(1); // Simplified mock math for the homepage preview

  return (
    <main className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] overflow-hidden font-sans">
      
      {/* ================= 1. THE SPLIT HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center">
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.4)] relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[#010810] font-black text-3xl tracking-tighter">II</span>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-6 backdrop-blur-md">
               <Zap size={14} className="text-[#D4AF37]" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Dialysis Infrastructure OS</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.05]"
          >
            Architect <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-200">Profitability.</span><br />
            Execute <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-blue-300">Flawlessly.</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          >
            Plan, finance, and launch dialysis centers with AI-driven ROI modeling, 
            authorized OEM procurement, and zero-downtime operations.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-md mx-auto"
          >
            {/* FIXED HYDRATION: Passed href directly to OsButton */}
            <OsButton label="Run Financial Model" variant="primary" href="/tools" />
            <OsButton label="Start Turnkey Setup" variant="glass" showIcon={false} href="/start" />
          </motion.div>
        </div>
      </section>

      {/* ================= 2. PROBLEM & PLATFORM ARCHITECTURE ================= */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01] relative">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-16">The Operating System Flow</h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
            <ArchitectureNode icon={<Database />} title="1. AI DPR Engine" desc="Predictive CAPEX/OPEX" color="gold" />
            <ArrowRight size={24} className="hidden lg:block text-gray-600" />
            <ArchitectureNode icon={<Network />} title="2. Infrastructure" desc="NABH Turnkey Build" color="white" />
            <ArrowRight size={24} className="hidden lg:block text-gray-600" />
            <ArchitectureNode icon={<ShieldCheck />} title="3. Zero-Downtime AMC" desc="Predictive Maintenance" color="blue" />
            <ArrowRight size={24} className="hidden lg:block text-gray-600" />
            <ArchitectureNode icon={<TrendingUp />} title="4. EBITDA Scale" desc="Locked-in Profitability" color="gold" />
          </div>
        </div>
      </section>

      {/* ================= 3. LIVE CALCULATOR PREVIEW & AI ASSISTANT ================= */}
      <section className="py-32 px-6 max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: AI Chat Interface */}
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">Intelligence at the core.</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Stop guessing on civil layouts and consumable costs. Our AI instantly processes your bed capacity to output exact ROI timelines and infrastructure requirements.
            </p>
            
            <GlassCard accent="blue" interactive={false} className="p-6 font-mono text-sm">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Building2 size={14} />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-gray-300">
                    I want to set up an 18-bed center in Bardoli. What is my break-even?
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-[#3B82F6]" />
                  </div>
                  <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-2xl rounded-tr-sm p-4 text-white">
                    Based on standard shifts and reuse economics, an 18-bed configuration targets a capital break-even at exactly <strong>13 Months</strong>. I have generated the full DPR.
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: Live ROI Simulator */}
          <GlassCard accent="gold" className="p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-8 flex items-center gap-2">
              <Activity size={14} /> Live Feasibility Engine
            </h3>
            
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dialysis Machines</label>
                <span className="text-3xl font-black text-white tracking-tighter">{machinesInput} Units</span>
              </div>
              <input 
                type="range" min="5" max="50" step="1" value={machinesInput} 
                onChange={(e) => setMachinesInput(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />
            </div>

            <div className="bg-[#010810] rounded-2xl border border-white/5 p-6 mb-8">
              <p className="text-[10px] uppercase text-gray-500 mb-1 tracking-widest font-bold">Projected Net Monthly EBITDA</p>
              <p className="text-4xl font-black text-white tracking-tighter flex items-center">
                ₹ {estimatedEbitda} L
              </p>
            </div>

            {/* FIXED HYDRATION */}
            <OsButton label="Launch Full DPR Engine" variant="primary" href="/tools" />
          </GlassCard>
        </div>
      </section>

      {/* ================= 4. INVESTMENT-GRADE PROOF (Case Studies) ================= */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a1118]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Verified Execution.</h2>
            <p className="text-gray-400">Real-world data from operational high-volume centers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard accent="gold" className="p-8 hover:-translate-y-2 transition-transform duration-500">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Dahej Public Hospital</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">50-Bed High Volume Setup</p>
                </div>
                <div className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#D4AF37]/20">
                  Operational
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold mb-1">ROI Improvement</p>
                  <p className="text-3xl font-black text-white">+30%</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold mb-1">Execution Time</p>
                  <p className="text-3xl font-black text-white">45 Days</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard accent="blue" className="p-8 hover:-translate-y-2 transition-transform duration-500">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Nova Lifeline Super Speciality</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">18-Bed Setup • Bardoli</p>
                </div>
                <div className="bg-[#3B82F6]/10 text-[#3B82F6] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#3B82F6]/20">
                  Operational
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold mb-1">Capital Break-even</p>
                  <p className="text-3xl font-black text-white">13 Months</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 tracking-widest font-bold mb-1">Machine Uptime</p>
                  <p className="text-3xl font-black text-white">99.9%</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================= 5. FINAL CTA ================= */}
      <section className="py-32 px-6 text-center">
        <GlassCard accent="gold" interactive={false} className="max-w-[1000px] mx-auto py-20 px-8 relative overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent" />
          
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 relative z-10">
            Stop guessing your CAPEX.
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto relative z-10">
            Deploy the Innovate OS today to generate your pixel-perfect financial model and lock in your infrastructure timelines.
          </p>
          
          <div className="relative z-10 w-full max-w-xs">
            {/* FIXED HYDRATION */}
            <OsButton label="Generate Custom DPR" variant="primary" href="/tools" />
          </div>
        </GlassCard>
      </section>

    </main>
  );
}

/* --- Helper Component for Architecture Flow --- */
function ArchitectureNode({ icon, title, desc, color }: any) {
  const isGold = color === "gold";
  const isBlue = color === "blue";
  
  return (
    <div className={`flex flex-col items-center text-center p-6 rounded-2xl border bg-black/40 backdrop-blur-md w-full lg:w-48 transition-all hover:-translate-y-1 ${isGold ? "border-[#D4AF37]/20" : isBlue ? "border-[#3B82F6]/20" : "border-white/10"}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isGold ? "bg-[#D4AF37]/10 text-[#D4AF37]" : isBlue ? "bg-[#3B82F6]/10 text-[#3B82F6]" : "bg-white/5 text-white"}`}>
        {icon}
      </div>
      <h3 className="font-bold text-sm text-white mb-1">{title}</h3>
      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{desc}</p>
    </div>
  );
}