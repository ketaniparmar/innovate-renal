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
  Database,
  Building2
} from "lucide-react";
import { motion } from "framer-motion";

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-white overflow-hidden relative selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* Background Ambience - Institutional Gold Glow */}
      <div className="absolute top-20 right-0 w-[800px] h-[600px] bg-[#C6A85A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO: ENTERPRISE POSITIONING ================= */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A85A]/30 bg-[#C6A85A]/10 mb-6 backdrop-blur-md">
              <Server size={14} className="text-[#C6A85A]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6A85A]">Hardware Architecture</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Clinical Scale.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              Deployment of medical-grade dialysis infrastructure. We provide the intelligence, the hardware, and the compliance framework required to launch 10–50 bed facilities.
            </p>
          </motion.div>
        </div>

        {/* ================= HARDWARE PILLARS ================= */}
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          
          {/* Pillar 1: HD Machines - Gold Focus */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <GlassCard accent="gold" interactive={false} className="p-10 md:p-14 flex flex-col h-full bg-[#0D1525] border-[#C6A85A]/20">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center border border-[#C6A85A]/20 shadow-[0_0_30px_rgba(198,168,90,0.15)]">
                  <Activity className="text-[#C6A85A]" size={32} />
                </div>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Flagship Tier</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-6">Diacare HD Systems</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-1">
                Next-generation hemodialysis units engineered for high-frequency clinical environments. Featuring volumetric UF control, heat disinfection, and high-fidelity therapy tracking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                <FeatureItem label="Advanced Volume Profiling" accent="gold" />
                <FeatureItem label="Real-time Kt/V Monitoring" accent="gold" />
                <FeatureItem label="Built-in Battery Reserve" accent="gold" />
                <FeatureItem label="Cloud Integration Ready" accent="gold" />
              </div>
              <OsButton label="Request Technical Datasheet" variant="primary" href="/tools" />
            </GlassCard>
          </motion.div>

          {/* Pillar 2: RO Plants - Teal Focus */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <GlassCard accent="blue" interactive={false} className="p-10 md:p-14 flex flex-col h-full bg-[#0D1525] border-[#00A8A8]/20">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center border border-[#00A8A8]/20 shadow-[0_0_30px_rgba(0,168,168,0.15)]">
                  <Droplets className="text-[#00A8A8]" size={32} />
                </div>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Critical Utility</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight mb-6">Medical RO Systems</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10 flex-1">
                AAMI-standard water treatment infrastructure. Double-pass reverse osmosis designed to handle complex regional water chemistry with 99.9% purification efficacy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                <FeatureItem label="Double-Pass Technology" accent="teal" />
                <FeatureItem label="Automated Sanitization" accent="teal" />
                <FeatureItem label="Up to 3000 LPH Flow" accent="teal" />
                <FeatureItem label="Online TDS Monitoring" accent="teal" />
              </div>
              <OsButton label="Calculate Water Requirement" variant="glass" href="/tools" />
            </GlassCard>
          </motion.div>

        </div>

        {/* ================= TURNKEY EXECUTION SECTION ================= */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            className="bg-[#0D1525] border border-white/5 rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-[#C6A85A]/5 to-transparent pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">Turnkey Execution.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium">
                  We don't just ship boxes. Innovate India manages the entire physical deployment, ensuring your facility is NABH-compliant from Day 1.
                </p>
                <div className="space-y-10">
                  <FeatureRow icon={<ShieldCheck />} title="NABH Compliance Zoning" desc="Floor plan architecture optimized for sterile clinical workflows and regulatory approval." />
                  <FeatureRow icon={<Cpu />} title="Automated Reuse Integration" desc="Deployment of advanced dialyzer reprocessing units to slash your per-session variable costs." />
                  <FeatureRow icon={<Database />} title="Inventory Supply Chain" desc="Integrated logistics for high-flux dialyzers, clinical fluids, and tubing kits." />
                </div>
              </div>
              
              <div className="relative h-full min-h-[450px] bg-[#0A0F1C] rounded-[3rem] border border-[#C6A85A]/10 p-12 flex flex-col justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 <div className="w-20 h-20 mx-auto rounded-3xl bg-[#C6A85A]/5 flex items-center justify-center mb-8 border border-[#C6A85A]/20">
                   <Building2 className="text-[#C6A85A]" size={36} />
                 </div>
                 <h3 className="text-3xl font-black mb-4 tracking-tight">Direct OEM Advantage</h3>
                 <p className="text-gray-400 text-lg mb-10 max-w-sm mx-auto leading-relaxed">
                   Authorized Diacare partnership means direct factory pricing, supply priority, and authentic clinical warranty.
                 </p>
                 <div className="max-w-[280px] mx-auto w-full">
                    <OsButton label="Run CAPEX Simulation" variant="primary" href="/tools" />
                 </div>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  );
}

/* ================= STRICT SUB-COMPONENTS ================= */

interface FeatureItemProps {
  label: string;
  accent: "gold" | "teal";
}

function FeatureItem({ label, accent }: FeatureItemProps) {
  const isGold = accent === "gold";
  return (
    <div className="flex items-center gap-3 text-sm">
      <CheckCircle2 
        size={18} 
        className={isGold ? "text-[#C6A85A]" : "text-[#00A8A8]"} 
      />
      <span className="text-white font-bold tracking-wide">{label}</span>
    </div>
  );
}

interface FeatureRowProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function FeatureRow({ icon, title, desc }: FeatureRowProps) {
  return (
    <div className="flex gap-5 items-start group">
      <div className="w-12 h-12 rounded-xl bg-[#0A0F1C] flex items-center justify-center shrink-0 border border-white/5 text-gray-500 group-hover:text-[#00A8A8] group-hover:border-[#00A8A8]/30 transition-all shadow-lg">
        {/* ✅ CRITICAL FIX: Cast as ReactElement<any> to prevent Vercel type crash */}
       {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      </div>
      <div>
        <h4 className="font-black text-white text-xl mb-2 tracking-tight">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}