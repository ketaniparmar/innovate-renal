"use client";

import React from "react";
import { Server, Droplets, Activity, ShieldCheck, Cpu, CheckCircle2, Database, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InfrastructureAdvisoryPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-white overflow-hidden relative selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* Background Ambience */}
      <div className="absolute top-20 right-0 w-[800px] h-[600px] bg-[#00A8A8]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO: ADVISORY POSITIONING ================= */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8A8]/30 bg-[#00A8A8]/10 mb-6 backdrop-blur-md">
              <Server size={14} className="text-[#00A8A8]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00A8A8]">Clinical Standards</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
              Required Infrastructure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">for Clinical Scale.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
              We do not just supply equipment. We define the exact medical-grade hardware required to achieve NABH compliance, maximize machine uptime, and ensure zero operational disruption.
            </p>
          </motion.div>
        </div>

        {/* ================= HARDWARE PILLARS ================= */}
        <div className="grid lg:grid-cols-2 gap-8 mb-32">
          
          {/* Pillar 1: HD Machines - Advisory Focus */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="p-10 md:p-14 flex flex-col h-full bg-[#0D1525] border border-white/5 hover:border-[#C6A85A]/20 transition-colors rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center border border-[#C6A85A]/20">
                  <Activity className="text-[#C6A85A]" size={32} />
                </div>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Core Revenue Asset</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight mb-6">Clinical Hemodialysis Units</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1">
                To guarantee uninterrupted revenue, facilities must deploy high-frequency HD units capable of withstanding strict operational cycles. We mandate specific OEM configurations (like Diacare) to ensure integrated safety protocols.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <FeatureItem label="Advanced Volume Profiling" accent="gold" />
                <FeatureItem label="Real-time Kt/V Monitoring" accent="gold" />
                <FeatureItem label="Built-in Battery Reserve" accent="gold" />
                <FeatureItem label="Heat Disinfection Protocol" accent="gold" />
              </div>
            </div>
          </motion.div>

          {/* Pillar 2: RO Plants - Advisory Focus */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="p-10 md:p-14 flex flex-col h-full bg-[#0D1525] border border-white/5 hover:border-[#00A8A8]/20 transition-colors rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center border border-[#00A8A8]/20">
                  <Droplets className="text-[#00A8A8]" size={32} />
                </div>
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Life-Critical Layer</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight mb-6">Medical RO Water Architecture</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-1">
                Dialysis fails the moment water quality drops. We mandate AAMI-standard, double-pass reverse osmosis infrastructure designed to handle complex regional TDS variations with 99.9% purification efficacy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <FeatureItem label="Double-Pass Technology" accent="teal" />
                <FeatureItem label="Automated Sanitization" accent="teal" />
                <FeatureItem label="Up to 3000 LPH Flow" accent="teal" />
                <FeatureItem label="Online TDS Monitoring" accent="teal" />
              </div>
            </div>
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
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">Turnkey Execution Plan.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-12 font-medium">
                  We manage the entire physical deployment to eliminate contractor errors, ensuring your facility passes NABH compliance audits on the first attempt.
                </p>
                <div className="space-y-8">
                  <FeatureRow icon={<ShieldCheck />} title="NABH Compliance Zoning" desc="Floor plan architecture optimized for sterile clinical workflows and regulatory approval." />
                  <FeatureRow icon={<Cpu />} title="Reprocessing Integration" desc="Deployment of automated dialyzer reprocessing units to optimize per-session variable costs safely." />
                  <FeatureRow icon={<Database />} title="Supply Chain Anchoring" desc="Integrated procurement mapping for high-flux dialyzers, clinical fluids, and tubing kits." />
                </div>
              </div>
              
              <div className="relative h-full min-h-[400px] bg-[#0A0F1C] rounded-[3rem] border border-[#C6A85A]/10 p-12 flex flex-col justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                 <div className="w-20 h-20 mx-auto rounded-3xl bg-[#C6A85A]/5 flex items-center justify-center mb-8 border border-[#C6A85A]/20">
                   <Building2 className="text-[#C6A85A]" size={36} />
                 </div>
                 <h3 className="text-2xl font-black mb-4 tracking-tight">Direct OEM Procurement</h3>
                 <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                   By structuring your infrastructure through our authorized channels, you receive direct factory pricing, deployment priority, and absolute warranty protection.
                 </p>
                 <Link href="/new-center">
                   <button className="w-full bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all flex justify-center items-center gap-2">
                     Evaluate Your CAPEX Needs <ArrowRight size={16} />
                   </button>
                 </Link>
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
    <div className="flex items-center gap-3 text-xs">
      <CheckCircle2 
        size={16} 
        className={isGold ? "text-[#C6A85A]" : "text-[#00A8A8]"} 
      />
      <span className="text-gray-300 font-bold tracking-wide">{label}</span>
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
       {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      </div>
      <div>
        <h4 className="font-black text-white text-lg mb-1 tracking-tight">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}