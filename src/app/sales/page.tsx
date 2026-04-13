"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OsButton } from "@/components/ui/OsButton";
import { 
  Server, 
  Droplets, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  Database,
  Building2
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative selection:bg-[#D4AF37] selection:text-[#010810]">
      
      {/* Background Ambience - Gold Wealth Glow */}
      <div className="absolute top-20 right-0 w-[800px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO: POSITIONING AS ENTERPRISE DEPLOYMENT ================= */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6 backdrop-blur-md">
              <Server size={14} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Hardware Architecture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Clinical Scale.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Deployment of medical-grade dialysis infrastructure. We provide the intelligence, the hardware, and the compliance framework required to launch 10–50 bed facilities.
            </p>
          </motion.div>
        </div>

        {/* ================= HARDWARE PILLARS: GOLD & BLUE ================= */}
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          
          {/* Pillar 1: HD Machines - Gold Focus */}
          <GlassCard accent="gold" interactive={false} className="p-10 md:p-14 flex flex-col h-full border-[#D4AF37]/20">
            <div className="flex items-center justify-between mb-10">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <Activity className="text-[#D4AF37]" size={32} />
              </div>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Flagship Tier</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-6">Diacare HD Systems</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-1">
              Next-generation hemodialysis units engineered for high-frequency clinical environments. Featuring volumetric UF control, heat disinfection, and high-fidelity therapy tracking.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <FeatureItem label="Advanced Volume Profiling" active />
              <FeatureItem label="Real-time Kt/V Monitoring" active />
              <FeatureItem label="Built-in Battery Reserve" active />
              <FeatureItem label="Cloud Integration Ready" active />
            </div>
            <OsButton label="Request Technical Datasheet" variant="primary" href="/start" />
          </GlassCard>

          {/* Pillar 2: RO Plants - Blue/White Focus */}
          <GlassCard accent="blue" interactive={false} className="p-10 md:p-14 flex flex-col h-full border-blue-500/20">
            <div className="flex items-center justify-between mb-10">
              <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <Droplets className="text-[#3B82F6]" size={32} />
              </div>
              <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Critical Utility</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-6">Medical RO Systems</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-1">
              AAMI-standard water treatment infrastructure. Double-pass reverse osmosis designed to handle Gujarat's specific water chemistry with 99.9% purification efficacy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              <FeatureItem label="Double-Pass Technology" blue />
              <FeatureItem label="Automated Sanitization" blue />
              <FeatureItem label="Up to 3000 LPH Flow" blue />
              <FeatureItem label="Online TDS Monitoring" blue />
            </div>
            <OsButton label="Calculate Water Requirement" variant="glass" href="/tools" />
          </GlassCard>

        </div>

        {/* ================= THE TURNKEY OPERATING SYSTEM ================= */}
        <section className="mb-32">
          <div className="bg-[#0a1118] border border-white/5 rounded-[4rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">Turnkey Execution.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-12">
                  We don't just ship boxes. Innovate IndAI manages the entire physical deployment, ensuring your facility is NABH-compliant from Day 1.
                </p>
                <div className="space-y-10">
                  <FeatureRow icon={<ShieldCheck />} title="NABH Compliance Zoning" desc="Floor plan architecture optimized for sterile clinical workflows and regulatory approval." />
                  <FeatureRow icon={<Cpu />} title="Automated Reuse Integration" desc="Deployment of advanced dialyzer reprocessing units to slash your per-session variable costs." />
                  <FeatureRow icon={<Database />} title="Inventory Supply Chain" desc="Integrated logistics for high-flux dialyzers, clinical fluids, and tubing kits." />
                </div>
              </div>
              
              <div className="relative h-full min-h-[450px] bg-[#010810] rounded-[3rem] border border-white/10 p-12 flex flex-col justify-center text-center">
                 <div className="w-20 h-20 mx-auto rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                   <Building2 className="text-gray-400" size={36} />
                 </div>
                 <h3 className="text-3xl font-bold mb-4 tracking-tight">Direct OEM Advantage</h3>
                 <p className="text-gray-500 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
                   Authorized Diacare partnership means direct factory pricing, priority supply priority, and authentic clinical warranty.
                 </p>
                 <div className="max-w-[280px] mx-auto w-full">
                    <OsButton label="Run CAPEX Simulation" variant="primary" href="/tools" />
                 </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

/* ================= SUB-COMPONENTS ================= */

function FeatureItem({ label, active, blue }: { label: string, active?: boolean, blue?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <CheckCircle2 size={16} className={active ? "text-[#D4AF37]" : blue ? "text-[#3B82F6]" : "text-gray-600"} />
      <span className={active || blue ? "text-white font-medium" : "text-gray-400"}>{label}</span>
    </div>
  );
}

// Inside src/app/sales/page.tsx (at the bottom)
function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white">
        {/* FIXED: Added 'as any' to allow the size prop */}
        {React.isValidElement(icon) && React.cloneElement(icon as any, { size: 18 })}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}