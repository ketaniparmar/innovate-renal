"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Building2, Activity, ShieldCheck, CheckCircle2, TrendingUp, AlertTriangle, Settings, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DualEntryAdvisoryHome() {
  // The Routing State: 'selection' | 'new' | 'running'
  const [activePath, setActivePath] = useState<"selection" | "new" | "running">("selection");

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] pt-24 pb-24 px-6 overflow-x-hidden">
      
      {/* Dynamic Back Button (Only visible if a path is selected) */}
      <AnimatePresence>
        {activePath !== "selection" && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto mb-8">
            <button 
              onClick={() => setActivePath("selection")}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> Switch Situation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* 🧭 SECTION 1: MANDATORY DECISION GATE */}
          {/* ========================================== */}
          {activePath === "selection" && (
            <motion.div key="selection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="pt-12">
              <div className="text-center mb-16">
                <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-4">Advisory System Initialization</p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
                  Start Your Dialysis Center Journey
                </h1>
                <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                  We first understand your situation so we can give you the exact financial and operational guidance you need. <strong className="text-white">What best describes you today?</strong>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* OPTION 1: NEW CENTER */}
                <div 
                  onClick={() => setActivePath("new")}
                  className="bg-[#0D1525] border border-white/5 hover:border-[#00A8A8]/50 p-10 rounded-[2.5rem] cursor-pointer group transition-all shadow-xl hover:shadow-[#00A8A8]/10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Building2 size={32} className="text-[#00A8A8]" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3 group-hover:text-[#00A8A8] transition-colors">I am planning to build a new dialysis center.</h2>
                  <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
                    Turnkey setup, investment planning, machine selection, and complete cost estimation.
                  </p>
                  <div className="space-y-3 mb-8">
                    {["Setup cost (CAPEX)", "Monthly running cost (OPEX)", "Equipment planning", "Payback timeline", "Risk evaluation"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium"><CheckCircle2 size={16} className="text-[#00A8A8]"/> {item}</div>
                    ))}
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#00A8A8] flex items-center gap-2">Enter Setup Advisory <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></div>
                </div>

                {/* OPTION 2: RUNNING CENTER */}
                <div 
                  onClick={() => setActivePath("running")}
                  className="bg-[#0D1525] border border-white/5 hover:border-[#C6A85A]/50 p-10 rounded-[2.5rem] cursor-pointer group transition-all shadow-xl hover:shadow-[#C6A85A]/10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Activity size={32} className="text-[#C6A85A]" />
                  </div>
                  <h2 className="text-2xl font-black text-white mb-3 group-hover:text-[#C6A85A] transition-colors">I already run a dialysis center.</h2>
                  <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
                    Cost optimization, consumable efficiency, AMC control, and insurance flow improvement.
                  </p>
                  <div className="space-y-3 mb-8">
                    {["Real monthly cost audit", "Consumable leakage analysis", "AMC / CMC planning", "Insurance delay optimization", "Profit improvement strategy"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium"><CheckCircle2 size={16} className="text-[#C6A85A]"/> {item}</div>
                    ))}
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#C6A85A] flex items-center gap-2">Enter Optimization Advisory <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" /></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* 🟢 PATH A: NEW CENTER EXPERIENCE */}
          {/* ========================================== */}
          {activePath === "new" && (
            <motion.div key="new" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-20 pt-8">
                <p className="text-[10px] font-black uppercase text-[#00A8A8] tracking-[0.2em] mb-4">Turnkey Setup Advisory</p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight max-w-4xl mx-auto">
                  Build a Safe and Profitable Dialysis Center with Full Cost Clarity.
                </h1>
                <p className="text-lg text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                  We help you plan your dialysis center with real-world cost, infrastructure, and earning clarity — before you invest a single rupee.
                </p>
                <Link href="/evaluation">
                  <button className="bg-[#00A8A8] text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-teal-600 transition-all inline-flex items-center gap-3 shadow-xl shadow-[#00A8A8]/20">
                    Plan My Dialysis Center <ArrowRight size={18} />
                  </button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mb-20">
                <div className="bg-[#0D1525] border border-white/5 p-10 rounded-[2.5rem]">
                  <h3 className="text-2xl font-black text-white mb-6 border-b border-white/5 pb-4">What You Will Understand</h3>
                  <ul className="space-y-5">
                    {["Total setup cost (machines, RO, infrastructure)", "Monthly operating cost", "Real earning potential", "Payback timeline", "Risk factors before construction"].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-gray-300 font-medium leading-relaxed">
                        <CheckCircle2 size={20} className="text-[#00A8A8] shrink-0 mt-0.5" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0D1525] border border-white/5 p-10 rounded-[2.5rem]">
                  <h3 className="text-2xl font-black text-white mb-6 border-b border-white/5 pb-4">Real Cost Structure</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-2 mb-1"><ShieldCheck size={16} className="text-[#C6A85A]" /> Consumables (Market Reality)</p>
                      <p className="text-xs text-gray-400 font-medium pl-6">₹350–₹450 per session (single-use model)</p>
                      <p className="text-xs text-[#00A8A8] font-bold pl-6 mt-1">~₹400 benchmark (PMJAY-aligned standard)</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-2 mb-1"><Settings size={16} className="text-[#C6A85A]" /> Maintenance Support</p>
                      <p className="text-xs text-gray-400 font-medium pl-6">AMC: ₹20,000–₹25,000 per machine/year</p>
                      <p className="text-xs text-gray-400 font-medium pl-6">CMC: ₹42,000–₹45,000 per machine/year</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white flex items-center gap-2 mb-1"><Activity size={16} className="text-[#C6A85A]" /> Insurance Protection</p>
                      <p className="text-xs text-gray-400 font-medium pl-6">~1% of machine cost annually</p>
                      <p className="text-xs text-gray-400 font-medium pl-6">₹7,000–₹8,000 per machine/year</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center bg-[#00A8A8]/5 border border-[#00A8A8]/20 p-10 rounded-[2.5rem]">
                <h2 className="text-2xl font-black text-white mb-4">The Result</h2>
                <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
                  You will know the exact investment required, a safe operating structure, and your expected return timeline.
                </p>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* 🔵 PATH B: RUNNING CENTER EXPERIENCE */}
          {/* ========================================== */}
          {activePath === "running" && (
            <motion.div key="running" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-20 pt-8">
                <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-4">Operations & Profit Advisory</p>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight max-w-4xl mx-auto">
                  Improve Profitability of Your Running Dialysis Center.
                </h1>
                <p className="text-lg text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed mb-10">
                  We help you identify where money is leaking and how to stabilize monthly profit using real Indian market benchmarks.
                </p>
                <Link href="/optimize/audit">
                  <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all inline-flex items-center gap-3 shadow-xl shadow-[#C6A85A]/20">
                    Optimize My Running Center <ArrowRight size={18} />
                  </button>
                </Link>
              </div>

              <h2 className="text-3xl font-black text-white mb-8 text-center">What We Analyze</h2>
              
              <div className="grid lg:grid-cols-3 gap-6 mb-16">
                <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
                  <Banknote size={28} className="text-[#00A8A8] mb-4" />
                  <h3 className="text-lg font-black text-white mb-3">1. Real Monthly Cost</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed mb-3">We break down your actual spending on Staff, Consumables, Electricity + RO, Maintenance, and Overhead.</p>
                </div>
                
                <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
                  <AlertTriangle size={28} className="text-[#A6192E] mb-4" />
                  <h3 className="text-lg font-black text-white mb-3">2. Consumable Cost Reality</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed mb-3">Single-use: ₹350–₹450/session (~₹400 standard). Reuse: ₹550–₹650/session (~₹600+ eq.). <strong className="text-white">We identify where margin is lost.</strong></p>
                </div>

                <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
                  <Settings size={28} className="text-[#C6A85A] mb-4" />
                  <h3 className="text-lg font-black text-white mb-3">3. Maintenance Control</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed mb-3">AMC (₹20K–₹25K/yr) vs CMC (₹42K–₹45K/yr). <strong className="text-white">We check if your maintenance model is financially optimized.</strong></p>
                </div>

                <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
                  <ShieldCheck size={28} className="text-[#00A8A8] mb-4" />
                  <h3 className="text-lg font-black text-white mb-3">4. Insurance Flow (EEI)</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed mb-3">~1% of capital cost (₹7K–₹8K/yr). <strong className="text-white">We help reduce claim delays and improve cash flow stability.</strong></p>
                </div>

                <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl lg:col-span-2">
                  <TrendingUp size={28} className="text-[#C6A85A] mb-4" />
                  <h3 className="text-lg font-black text-white mb-3">5. Supply Chain Optimization</h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    We improve consumable procurement efficiency, detect vendor pricing mismatches, and establish buffer stock planning to ensure zero operational disruption.
                  </p>
                </div>
              </div>

              <div className="text-center bg-[#C6A85A]/5 border border-[#C6A85A]/20 p-10 rounded-[2.5rem]">
                <h2 className="text-2xl font-black text-white mb-4">The Result Insight</h2>
                <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
                  You will understand exactly where money is leaking, how much profit you are losing monthly, and <strong className="text-white">how to stabilize income without increasing patients.</strong>
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}