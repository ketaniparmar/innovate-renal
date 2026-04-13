"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import DialysisCostCalculator from "../components/ui/DialysisCostCalculator";
import { ShieldCheck, Cpu, Stethoscope, ArrowRight, Zap, CheckCircle2, TrendingUp, Building2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] pt-20">

      {/* ================= NEW SAAS HERO ================= */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden text-center max-w-[1000px] mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3B82F6]/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-8">
             <Zap size={14} className="text-[#D4AF37]" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Dialysis Infrastructure OS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            The Operating System for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Profitable Renal Care.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Plan, finance, and launch NABH-compliant dialysis centers with AI-driven ROI modeling, OEM procurement, and zero-downtime execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#planner">
              <button className="bg-[#D4AF37] text-[#010810] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2 hover:bg-yellow-500">
                Plan Your Center in 60s <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Book Strategy Call
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SAAS TRUST STRIP ================= */}
      <section className="border-y border-white/5 bg-white/[0.01] py-6">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <span className="text-white">AI-Powered Planning Platform</span>
          <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]"/> DPR Generation</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]"/> ROI Simulation</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]"/> CAPEX Optimization</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#3B82F6]"/> AMC Intelligence</span>
        </div>
      </section>

      {/* ================= AI PLANNER (IMMEDIATE ACTION) ================= */}
      <section id="planner" className="py-24 px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Run Your Financial Model.</h2>
          <p className="text-gray-400">Adjust clinical parameters below to instantly calculate your break-even timeline.</p>
        </div>
        <DialysisCostCalculator />
      </section>

      {/* ================= CASE STUDIES ================= */}
      <section className="py-24 px-6 bg-[#0a1118] border-t border-white/5">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Real Projects. Real ROI.</h2>
            <p className="text-gray-400">Verified execution timelines and profitability metrics from our clinical partners.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <GlassCard accentColor="gold" hover={false} className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                  <Building2 className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Dahej Public Hospital</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">50-Bed Setup • Gujarat</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#010810] p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">ROI Improvement</p>
                  <p className="text-2xl font-black text-green-400 flex items-center gap-1"><TrendingUp size={20}/> +30%</p>
                </div>
                <div className="bg-[#010810] p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Execution Time</p>
                  <p className="text-2xl font-black text-white">45 Days</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Deployed comprehensive reuse automation and high-capacity RO, drastically lowering per-session OPEX and accelerating their capital break-even phase.
              </p>
            </GlassCard>

            {/* Case Study 2 */}
            <GlassCard accentColor="blue" hover={false} className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                  <Building2 className="text-[#3B82F6]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Nova Lifeline Super Speciality</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">18-Bed Setup • Bardoli</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#010810] p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Capital Break-even</p>
                  <p className="text-2xl font-black text-[#3B82F6]">13 Months</p>
                </div>
                <div className="bg-[#010810] p-4 rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Uptime</p>
                  <p className="text-2xl font-black text-white">99.9%</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Full turnkey consultancy, navigating NABH compliance zoning, equipment procurement, and ongoing preventive AMC to secure a 13-month payback period.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ================= THE 3 PILLARS ================= */}
      <section className="py-32 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">The Complete OS Stack.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We eliminate the friction of dealing with multiple vendors by providing the intelligence, hardware, and maintenance in one unified system.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Cpu size={32} className="text-white" />}
            title="1. Intelligence"
            desc="AI-driven DPR generation, profitability modeling, and utilization tracking before you deploy capital."
            accent="white"
          />
          <FeatureCard
            icon={<Stethoscope size={32} className="text-[#D4AF37]" />}
            title="2. Infrastructure"
            desc="Authorized Diacare hemodialysis machines, medical-grade RO plants, and NABH civil compliance."
            accent="gold"
          />
          <FeatureCard
            icon={<ShieldCheck size={32} className="text-[#3B82F6]" />}
            title="3. Execution"
            desc="Predictive AMC, rapid emergency dispatch, and lifecycle management for zero clinical downtime."
            accent="blue"
          />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="pb-32 px-6">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-b from-[#D4AF37]/5 to-transparent border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-full bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">
              Ready to scale your <br/> renal operations?
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/tools">
                <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2">
                  Generate Custom DPR <ArrowRight size={16} />
                </button>
              </Link>

              <Link href="/contact">
                <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-md">
                  Book Strategy Call
                </button>
              </Link>
            </div>
            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Authorized Partner — Gujarat Region</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, accent }: { icon: React.ReactNode, title: string, desc: string, accent: "gold" | "blue" | "white" }) {
  return (
    <GlassCard accentColor={accent} className="flex flex-col h-full items-start text-left">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${accent === 'gold' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20' : accent === 'blue' ? 'bg-[#3B82F6]/10 border-[#3B82F6]/20' : 'bg-white/10 border-white/20'}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </GlassCard>
  );
}