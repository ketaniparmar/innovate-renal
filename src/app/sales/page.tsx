"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Server, Droplets, Activity, ShieldCheck, Cpu, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-20 right-0 w-[800px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO ================= */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-6">
              <Server size={14} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Hardware Deployment</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
              Deploy clinical-grade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">infrastructure at scale.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              As the authorized partner for Diacare in Gujarat, we supply, install, and commission complete dialysis ecosystems engineered for zero clinical downtime.
            </p>
          </motion.div>
        </div>

        {/* ================= CORE HARDWARE PILLARS ================= */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          
          {/* Pillar 1: HD Machines */}
          <GlassCard accent="gold" interactive={false} className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                <Activity className="text-[#D4AF37]" size={32} />
              </div>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">Flagship</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">Diacare HD Systems</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              State-of-the-art hemodialysis machines built for high-volume centers. Featuring intuitive touch interfaces, ultra-precise ultrafiltration, and built-in battery backups.
            </p>
            <ul className="space-y-4 mb-8">
              {["Advanced Volume Control Profile", "Real-time Kt/V Monitoring", "Integrated Blood Pressure Module", "15-inch Medical Grade Touchscreen"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" /> {feature}
                </li>
              ))}
            </ul>
            <Link href="/start">
              <button className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Request Pricing & Specs
              </button>
            </Link>
          </GlassCard>

          {/* Pillar 2: RO Plants */}
          <GlassCard accent="blue" interactive={false} className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20">
                <Droplets className="text-[#3B82F6]" size={32} />
              </div>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400">Critical</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">Medical RO Plants</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Double-pass Reverse Osmosis systems designed strictly to AAMI standards. Providing ultra-pure water essential for safe, high-efficacy dialysis treatments.
            </p>
            <ul className="space-y-4 mb-8">
              {["500 LPH to 2000+ LPH Capacities", "Automated Heat Disinfection", "Dual-stage Pre-filtration", "Real-time TDS & Conductivity Alerts"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                  <CheckCircle2 size={16} className="text-[#3B82F6] shrink-0" /> {feature}
                </li>
              ))}
            </ul>
            <Link href="/start">
              <button className="w-full bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Calculate Capacity Required
              </button>
            </Link>
          </GlassCard>

        </div>

        {/* ================= TURNKEY SECTION ================= */}
        <section className="mb-24">
          <div className="bg-[#0a1118] border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">Turnkey Execution.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  We manage the entire infrastructure stack. From initial plumbing and electrical layout design to NABH-compliant civil works and final equipment commissioning.
                </p>
                <div className="space-y-6">
                  <FeatureRow icon={<ShieldCheck />} title="NABH Compliance Planning" desc="Floor plan optimization to meet stringent regulatory zoning requirements." />
                  <FeatureRow icon={<Cpu />} title="Automated Reuse Systems" desc="Deployment of dialyzer reprocessing units to slash per-session OPEX." />
                  <FeatureRow icon={<Zap />} title="Clinical Consumables" desc="Supply chain integration for high-flux dialyzers, tubing, and solutions." />
                </div>
              </div>
              
              <div className="relative h-full min-h-[400px] bg-[#010810] rounded-3xl border border-white/10 p-8 flex flex-col justify-center text-center">
                 <div className="w-20 h-20 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-6">
                   <Server className="text-gray-400" size={32} />
                 </div>
                 <h3 className="text-xl font-bold mb-2">Direct Distributor Advantage</h3>
                 <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">By cutting out the middleman, we provide hospital directors with direct OEM pricing and priority fulfillment.</p>
                 <Link href="/tools">
                   <button className="bg-white text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                     Run CAPEX Model
                   </button>
                 </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

// Sub-component
function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white">
        {React.cloneElement(icon as React.ReactElement, { size: 18 })}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}