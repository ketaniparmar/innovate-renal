"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Cpu,
  HardHat,
  Activity,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Briefcase,
  FileText
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function SolutionsPage() {
  const processSteps = [
    {
      num: "01",
      title: "Planning & Layout",
      desc: "Architectural space optimization, electrical load mapping, and NABH-compliant dialysis zoning.",
      icon: Building2,
    },
    {
      num: "02",
      title: "Equipment Strategy",
      desc: "Precise selection of Diacare machines and RO systems based on clinical volume and projected ROI.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Execution & Installation",
      desc: "Our certified engineers deploy the full infrastructure ensuring strict OEM and medical compliance.",
      icon: HardHat,
    },
    {
      num: "04",
      title: "Go-Live & Training",
      desc: "Comprehensive staff training, water quality trial runs, and full operational handover.",
      icon: Activity,
    },
  ];

  return (
    <main className="min-h-screen bg-[#010810] text-white pt-32 pb-32 overflow-hidden">

      {/* 🔥 HERO: Strategic Infrastructure */}
      <header className="max-w-[1280px] mx-auto px-6 mb-24 text-center relative">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6 rounded-full backdrop-blur-md">
            <Briefcase size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Turnkey Setup & Consultancy
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            Build Profitable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">
              Dialysis Centers.
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-4 font-medium">
            End-to-end medical infrastructure — from blueprint to first patient.
          </p>

          <p className="text-gray-400 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            We partner with investors and hospital administrators to architect, equip, and launch world-class renal care facilities, reducing initial setup costs by up to 20% through optimized procurement.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
                Request Consultation <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </motion.div>
      </header>

      {/* ⚙️ SETUP EXECUTION FRAMEWORK */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
            Setup Execution Framework
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A proven, four-stage deployment methodology guaranteeing clinical readiness and regulatory compliance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <GlassCard key={i} accent="gold" className="flex flex-col h-full relative">
              <div className="absolute top-6 right-6 text-5xl font-black text-white/[0.03] pointer-events-none">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#D4AF37]">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed relative z-10">{step.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 💰 DPR SECTION (HIGH VALUE) */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <GlassCard accent="gold" className="p-0 border-0 bg-white/[0.01]">
          <div className="grid md:grid-cols-2 gap-12 items-center p-8 lg:p-16">
            <div>
              <div className="inline-flex items-center gap-2 text-[#D4AF37] mb-4">
                <FileText size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Financial Planning</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
                Detailed Project Reports (DPR)
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Bank-ready financial and operational blueprints designed explicitly for healthcare investors, hospital boards, and loan approvals.
              </p>

              {/* 💡 PRICING ANCHOR */}
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-4 rounded-xl mb-8 inline-block">
                <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                  Typical Scope: ₹35L – ₹2Cr Investment
                </p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "Comprehensive CAPEX & OPEX modeling",
                  "12-Month ROI & Breakeven analysis",
                  "Machine utilization & consumables forecasting",
                  "NABH & PPCB compliance-ready documentation",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <button className="bg-white hover:bg-gray-200 text-[#010810] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg">
                  Commission a DPR
                </button>
              </Link>
            </div>

            {/* 📊 VISUAL DASHBOARD MOCKUP */}
            <div className="border border-white/10 rounded-3xl p-8 bg-[#010810] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Projected Breakeven</p>
                <p className="text-sm font-bold text-[#D4AF37]">Month 14</p>
              </div>
              <LineChart size={60} className="text-white/20 mb-8 w-full" strokeWidth={1} />
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Est. CAPEX</p>
                    <p className="text-xl font-bold">₹42.5L</p>
                 </div>
                 <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Bed Capacity</p>
                    <p className="text-xl font-bold">10 Units</p>
                 </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 🤖 AI TOOL CTA */}
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent border border-white/10 p-12 lg:p-20 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
             <Calculator size={200} />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto bg-[#010810] border border-[#D4AF37]/30 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <Calculator size={32} />
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">
              Generate Your DPR Instantly
            </h2>

            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Stop guessing your capital expenditure. Use our AI-powered infrastructure tools to estimate your dialysis setup cost and generate a preliminary ROI model in seconds.
            </p>

            <Link href="/tools">
              <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center gap-2 mx-auto">
                Launch AI Planning Engine <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}