"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Building2,
  PackageCheck,
  Server,
  Activity,
  DollarSign,
  Users,
  CheckCircle2,
  BarChart3,
  Stethoscope
} from "lucide-react";

type Persona = "Nephrologist" | "Dialysis Technician" | "Hospital Owner / Investor";

export default function Homepage() {
  const [persona, setPersona] = useState<Persona>("Nephrologist");
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > window.innerHeight * 0.25);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const personaContent = {
    "Nephrologist": {
      title: "Clinical Control",
      desc: "Protocol enforcement (no skipped vitals). Infection zoning locked. Complication alerts in real-time.",
      cta: "View Clinical Workflow",
      href: "/clinical-os",
      icon: <Stethoscope className="w-8 h-8" />
    },
    "Dialysis Technician": {
      title: "Daily Execution Made Simple",
      desc: "Step-by-step flowsheet. Machine state clarity. No manual errors or end-of-shift paperwork.",
      cta: "Open Live Dashboard",
      href: "/clinical-os/demo",
      icon: <Users className="w-8 h-8" />
    },
    "Hospital Owner / Investor": {
      title: "Predictable Revenue Engine",
      desc: "Utilization optimization. Claim protection. Complete ROI visibility and cost control.",
      cta: "Calculate Profit",
      href: "/calculator",
      icon: <DollarSign className="w-8 h-8" />
    }
  };

  const ui = personaContent[persona];

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-x-hidden w-full relative font-sans">

      {/* ===== 0. STICKY STRIP ===== */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showStickyCTA ? 0 : -100 }}
        className="fixed top-24 left-0 w-full z-40 bg-[#0D1525]/80 backdrop-blur-2xl border-b border-white/10 py-3 px-6 hidden md:flex justify-between items-center shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-[#C6A85A]" />
          <p className="text-xs font-black uppercase tracking-widest text-white">
            NABH Ready • Zero Infection Risk • Maximum Profit
          </p>
        </div>
        <Link href="/calculator">
          <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(198,168,90,0.4)] hover:bg-[#D4B970] transition-all">
            Calculate Profit
          </button>
        </Link>
      </motion.div>

      {/* ===== 1. HERO: EXECUTIVE DECISION BLOCK ===== */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6">
        <div className="absolute inset-0 opacity-50 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-[#C6A85A]/15 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#00A8A8]/10 blur-[180px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Message */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8">
              Dialysis Execution Infrastructure
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
              Control Every Dialysis Machine. <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Convert Every Session Into Revenue.</span>
            </h1>
            <p className="text-lg text-gray-400 font-medium mb-10 leading-relaxed max-w-xl">
              A clinical execution system that enforces protocol, eliminates operational leakage, and increases per-machine revenue by 20–30%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/calculator" className="w-full sm:w-auto">
                <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] transition-all flex items-center justify-center gap-2 hover:scale-105">
                  Calculate Your Profit <ArrowRight size={16}/>
                </button>
              </Link>
              <Link href="/clinical-os/demo" className="w-full sm:w-auto">
                <button className="w-full bg-white/[0.05] border border-white/10 text-white px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  View Live System
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Live System Panel (The Proof) */}
          <div className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8]">Live Operations</p>
                <h3 className="text-xl font-black text-white">Floor Status</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Utilization</p>
                <p className="text-xl font-black text-[#00A8A8]">87%</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-white">Machine 01</span>
                <span className="text-xs font-black uppercase tracking-widest text-[#00A8A8] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00A8A8] animate-pulse"></span> Running</span>
              </div>
              <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-white">Machine 02</span>
                <span className="text-xs font-black uppercase tracking-widest text-[#C6A85A] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#C6A85A]"></span> Cleaning</span>
              </div>
              <div className="flex justify-between items-center bg-red-950/30 p-4 rounded-xl border border-red-900/50">
                <span className="text-sm font-bold text-white">Machine 03</span>
                <span className="text-xs font-black uppercase tracking-widest text-red-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Alert (Low BP)</span>
              </div>
              <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <span className="text-sm font-bold text-white">Machine 04</span>
                <span className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"></span> Ready</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sessions Today</p>
                <p className="text-lg font-black text-white">42</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Claim Risk</p>
                <p className="text-lg font-black text-[#00A8A8]">LOW</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== 2. TRUST STRIP (Fast Credibility) ===== */}
      <section className="border-y border-white/5 bg-[#0A0F1C] py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400">
          <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> NABH-Ready Protocols</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> PM-JAY Compliant</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> Infection Zoning Enforced</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> 90%+ Utilization Systems</span>
        </div>
      </section>

      {/* ===== 3. PROBLEM SECTION (Pain Amplification) ===== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-16 text-center">Where Dialysis Centers Lose Money Daily</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 md:p-14 rounded-[3rem] bg-red-950/10 border border-red-900/20 shadow-2xl">
              <ul className="space-y-8 text-base md:text-lg font-bold text-gray-300">
                <li className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-black shrink-0">✕</span> Idle machines during active shifts</li>
                <li className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-black shrink-0">✕</span> Missing vitals leading to rejected claims</li>
                <li className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-black shrink-0">✕</span> Technician overload causing errors</li>
                <li className="flex items-center gap-4"><span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-black shrink-0">✕</span> Infection protocol gaps creating risk</li>
              </ul>
            </div>

            <div className="p-10 md:p-14 rounded-[3rem] bg-white/[0.02] border border-white/10 shadow-2xl flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">The Financial Bleed</p>
                  <h3 className="text-2xl md:text-4xl font-black text-white">1 empty machine = <span className="text-[#C6A85A]">₹2L/month loss</span></h3>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Billing Failure</p>
                  <h3 className="text-2xl md:text-4xl font-black text-white">10–15% of all PM-JAY claims rejected</h3>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Asset Inefficiency</p>
                  <h3 className="text-2xl md:text-4xl font-black text-white">Average utilization drops below 65%</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. SOLUTION = SYSTEM ARCHITECTURE ===== */}
      <section className="py-24 px-6 bg-[#0D1525] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-16">
            This Is Not a Product. <br/>This Is a Control System.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-[#0A0F1C] border border-white/5 hover:border-[#C6A85A]/30 transition-all">
              <Building2 className="text-[#C6A85A] w-12 h-12 mx-auto mb-6"/>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Layer 1</p>
              <h3 className="text-xl font-black text-white mb-4">Infrastructure</h3>
              <p className="text-sm font-medium text-gray-400">Turnkey dialysis setup and strict NABH compliant design & execution.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-[#0A0F1C] border border-white/5 hover:border-[#C6A85A]/30 transition-all">
              <PackageCheck className="text-[#C6A85A] w-12 h-12 mx-auto mb-6"/>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Layer 2</p>
              <h3 className="text-xl font-black text-white mb-4">Supply Chain</h3>
              <p className="text-sm font-medium text-gray-400">Controlled medical consumables providing absolute cost stability.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#1A160C] to-[#0A0F1C] border border-[#C6A85A]/30 shadow-[0_0_30px_rgba(198,168,90,0.1)] transition-all transform hover:-translate-y-2">
              <Server className="text-[#C6A85A] w-12 h-12 mx-auto mb-6"/>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A] mb-2">Layer 3 (Core)</p>
              <h3 className="text-xl font-black text-white mb-4">Clinical OS</h3>
              <p className="text-sm font-medium text-gray-400">FSM-based execution, real-time alerts, and seamless billing integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. PERSONA SWITCH BLOCK (CORE UX) ===== */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-16 text-center">See Your World Through the System</h2>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {(Object.keys(personaContent) as Persona[]).map((p) => {
              const isActive = persona === p;
              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`relative p-8 md:p-10 rounded-[2.5rem] border text-left transition-all duration-500 overflow-hidden group
                  ${
                    isActive
                      ? "border-[#C6A85A]/50 bg-[#C6A85A]/10 shadow-[0_20px_80px_rgba(198,168,90,0.25)] scale-[1.02] backdrop-blur-3xl"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 backdrop-blur-xl"
                  }`}
                >
                  {isActive && <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C6A85A]/30 blur-[60px] rounded-full pointer-events-none" />}
                  <div className={`mb-6 transition-colors duration-500 ${isActive ? "text-[#C6A85A]" : "text-gray-500"}`}>
                    {personaContent[p].icon}
                  </div>
                  <h3 className={`text-xl md:text-2xl font-black tracking-tight mb-2 ${isActive ? "text-white" : "text-gray-400"}`}>
                    {p}
                  </h3>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={persona}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#121626] to-[#0A0F1C] border border-[#00A8A8]/20 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10"
            >
              <div className="max-w-xl">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">{ui.title}</h3>
                <p className="text-lg font-medium text-gray-400 leading-relaxed mb-8">{ui.desc}</p>
              </div>
              <Link href={ui.href} className="shrink-0 w-full md:w-auto">
                <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(198,168,90,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3">
                  {ui.cta} <ArrowRight size={16}/>
                </button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== 6. LIVE SYSTEM DEEP DIVE ===== */}
      <section className="py-24 px-6 bg-[#0D1525] border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-16 text-center">What Actually Runs Your Center</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Machine Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0F1C] border border-[#00A8A8]/30 p-6 rounded-3xl shadow-[0_0_20px_rgba(0,168,168,0.15)]">
                <p className="text-xl font-black text-white mb-2">M-01</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00A8A8] animate-pulse"/> Running</span>
              </div>
              <div className="bg-[#0A0F1C] border border-[#C6A85A]/30 p-6 rounded-3xl">
                <p className="text-xl font-black text-white mb-2">M-02</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#C6A85A]"/> Cleaning</span>
              </div>
              <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-3xl shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                <p className="text-xl font-black text-white mb-2">M-03</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> Alert (BP)</span>
              </div>
              <div className="bg-[#0A0F1C] border border-white/10 p-6 rounded-3xl">
                <p className="text-xl font-black text-white mb-2">M-04</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"/> Idle</span>
              </div>
            </div>

            {/* Right: Flowsheet */}
            <div className="bg-[#0A0F1C] border border-white/5 rounded-[3rem] p-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A] mb-6">Patient Workflow Logic</p>
              <div className="space-y-5 text-sm font-bold text-gray-300">
                <div className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5"><CheckCircle2 className="text-[#00A8A8]" size={20}/> Pre BP Logged</div>
                <div className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5"><CheckCircle2 className="text-[#00A8A8]" size={20}/> Treatment Started</div>
                <div className="flex items-center gap-4 bg-[#00A8A8]/10 p-4 rounded-xl border border-[#00A8A8]/30 text-white"><Activity className="text-[#00A8A8] animate-pulse" size={20}/> Vitals Monitoring (Live)</div>
                <div className="flex items-center gap-4 opacity-40 p-4"><div className="w-5 h-5 rounded-full border-2 border-gray-500" /> UF Logging Pending</div>
                <div className="flex items-center gap-4 opacity-40 p-4"><div className="w-5 h-5 rounded-full border-2 border-gray-500" /> PM-JAY Claim Generation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. FINANCIAL PROOF (Mandatory) ===== */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">The Economics of Control</h2>
            <p className="text-lg font-medium text-gray-400">Why investors mandate our operating system.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-3 bg-[#0D1525] p-6 border-b border-white/10">
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">Metric</div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500">Typical Center</div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#C6A85A]">With Our System</div>
            </div>
            
            <div className="grid grid-cols-3 p-6 border-b border-white/5 items-center">
              <div className="text-sm md:text-base font-bold text-white">Utilization</div>
              <div className="text-lg md:text-2xl font-black text-gray-400">60–65%</div>
              <div className="text-lg md:text-2xl font-black text-[#00A8A8]">85–92%</div>
            </div>
            
            <div className="grid grid-cols-3 p-6 border-b border-white/5 items-center">
              <div className="text-sm md:text-base font-bold text-white">Claim Rejection</div>
              <div className="text-lg md:text-2xl font-black text-red-400">10–15%</div>
              <div className="text-lg md:text-2xl font-black text-[#00A8A8]">&lt;2%</div>
            </div>
            
            <div className="grid grid-cols-3 p-6 bg-[#C6A85A]/5 items-center">
              <div className="text-sm md:text-base font-bold text-white">Revenue / Machine</div>
              <div className="text-lg md:text-2xl font-black text-gray-400">₹1.2L</div>
              <div className="text-2xl md:text-4xl font-black text-[#C6A85A]">₹1.8L</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. CLINICAL AUTHORITY & 9. CASE STUDY ===== */}
      <section className="py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          
          <div>
            <h3 className="text-3xl font-black text-white mb-8 tracking-tighter">Built for Real Clinical Environments</h3>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-base font-bold text-gray-300">
                <CheckCircle2 className="text-[#00A8A8]" size={24}/> Designed with practicing nephrologists.
              </li>
              <li className="flex items-center gap-4 text-base font-bold text-gray-300">
                <CheckCircle2 className="text-[#00A8A8]" size={24}/> Based strictly on NABH protocols.
              </li>
              <li className="flex items-center gap-4 text-base font-bold text-gray-300">
                <CheckCircle2 className="text-[#00A8A8]" size={24}/> Mathematically enforces infection safety.
              </li>
              <li className="flex items-center gap-4 text-base font-bold text-gray-300">
                <CheckCircle2 className="text-[#00A8A8]" size={24}/> Generates audit-ready logs automatically.
              </li>
            </ul>
          </div>

          <div className="p-10 md:p-12 rounded-[3rem] bg-[#0D1525] border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A85A]/20 blur-[60px] rounded-full pointer-events-none" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-4">Case Study Simulation</p>
             <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-8">From 62% to 89% Utilization</h3>
             <div className="space-y-4 text-sm font-medium text-gray-400 mb-8">
               <p><strong className="text-white">Profile:</strong> 12 Machine Setup</p>
               <p><strong className="text-white">Before:</strong> High idle slots + 12% rejected claims</p>
               <p><strong className="text-white">After:</strong> Full scheduling + zero billing leakage</p>
             </div>
             <div className="pt-6 border-t border-white/10">
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Result</p>
               <p className="text-3xl font-black text-[#C6A85A]">+₹7L/month increase in yield</p>
             </div>
          </div>

        </div>
      </section>

      {/* ===== 10. FINAL CTA ===== */}
      <section className="py-32 px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12 leading-[1.1]">
            If You’re Running Dialysis Without This, <span className="text-[#C6A85A]">You’re Losing Money.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/turnkey" className="w-full sm:w-auto">
              <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(198,168,90,0.25)] hover:bg-[#D4B970] transition-all flex items-center justify-center gap-2 hover:scale-105">
                Start Your Center <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/calculator" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Optimize Existing Center
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}