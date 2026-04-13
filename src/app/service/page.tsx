"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Wrench, 
  ShieldAlert, 
  Clock, 
  Activity, 
  CheckCircle2, 
  PhoneCall, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  MapPin
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative selection:bg-[#3B82F6] selection:text-white">
      
      {/* Background Ambience - Clinical Blue Glow */}
      <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO: POSITIONING AS REVENUE PROTECTION ================= */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 mb-6 backdrop-blur-md">
              <Activity size={14} className="text-[#3B82F6]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#3B82F6]">Zero-Downtime Operations</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
              Protect Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Clinical Revenue.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              In dialysis, downtime is the enemy of ROI. Our service infrastructure is engineered to ensure your machines never stop generating value.
            </p>
          </motion.div>
        </div>

        {/* ================= SERVICE TIERS: MODULAR SaaS CARDS ================= */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          
          {/* Tier 1: Emergency - High Urgency */}
          <GlassCard accent="white" interactive={false} className="p-8 flex flex-col h-full border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-8">
              <ShieldAlert className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Rapid Response</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
              On-demand engineering for non-AMC facilities. Immediate dispatch within the Gujarat region to resolve critical infrastructure failure.
            </p>
            <div className="space-y-4 mb-10">
              <FeatureItem label="2-Hour Response Window" />
              <FeatureItem label="Certified OEM Components" />
            </div>
            <a href="https://wa.me/919879576332?text=URGENT:%20Machine%20Down" target="_blank" rel="noreferrer">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Dispatch Engineer Now
              </button>
            </a>
          </GlassCard>

          {/* Tier 2: Comprehensive - The Premium OS Choice */}
          <div className="lg:-mt-6 lg:mb-6">
            <GlassCard accent="gold" interactive={false} className="p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] border-[#D4AF37]/30">
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#010810] text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-bl-2xl">
                Enterprise
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20 mb-8">
                <ShieldCheck className="text-[#D4AF37]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Comprehensive AMC</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
                Predictable OPEX. We cover the entire machine lifecycle including all expensive spare parts and infinite breakdown support.
              </p>
              <div className="space-y-4 mb-10">
                <FeatureItem label="Zero Spare-Part Costs" active />
                <FeatureItem label="Quarterly Precision Calibration" active />
                <FeatureItem label="Unlimited Emergency Visits" active />
              </div>
              <Link href="/start">
                <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  Lock In My ROI Model
                </button>
              </Link>
            </GlassCard>
          </div>

          {/* Tier 3: Standard Service */}
          <GlassCard accent="blue" interactive={false} className="p-8 flex flex-col h-full border-blue-500/20">
            <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20 mb-8">
              <Wrench className="text-[#3B82F6]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Labor Only AMC</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
              For established clinical centers seeking expert maintenance and rapid breakdown response while managing their own parts inventory.
            </p>
            <div className="space-y-4 mb-10">
              <FeatureItem label="Free Breakdown Visits" blue />
              <FeatureItem label="Clinical Uptime Monitoring" blue />
            </div>
            <Link href="/start">
              <button className="w-full bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Request Service Contract
              </button>
            </Link>
          </GlassCard>
        </div>

        {/* ================= THE GUJARAT PROXIMITY ADVANTAGE ================= */}
        <section className="mb-32">
          <div className="bg-[#0a1118] border border-white/5 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#3B82F6]/5 to-transparent pointer-events-none" />
            
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 border border-white/10">
                  <MapPin className="text-[#3B82F6]" size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">
                  Proximity is our <br/> Competitive Edge.
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  National vendors fly engineers from Mumbai or Delhi. We are already here. Based in **Surat**, we maintain a local stockpile of genuine Diacare parts and a response team that reaches your facility in hours, not days.
                </p>
              </div>

              <div className="space-y-10 relative z-10">
                <FeatureRow icon={<Zap />} title="Predictive Maintenance" desc="We use historical failure data to replace wear-and-tear parts before they fail mid-session." />
                <FeatureRow icon={<ShieldCheck />} title="Authorized OEM Integrity" desc="Zero compromise. We only utilize clinical-grade parts backed by manufacturer warranty." />
                <FeatureRow icon={<Clock />} title="24/7 Clinical Hotline" desc="Immediate technical triage over phone or video to minimize physical downtime." />
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA: CONVERSION ================= */}
        <section className="text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">
              Scale without <br/> Technical Risk.
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Join the network of hospitals that have offloaded their infrastructure management to Innovate IndAI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="tel:+919879576332">
                <button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2">
                  <PhoneCall size={16} /> Emergency Support Line
                </button>
              </a>
              <Link href="/start">
                <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-md">
                  Browse AMC Plans
                </button>
              </Link>
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

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white group-hover:border-[#3B82F6]/50 transition-colors">
        {/* FIXED: TypeScript safe icon cloning */}
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24, className: "group-hover:text-[#3B82F6] transition-colors" })}
      </div>
      <div>
        <h4 className="font-bold text-white text-xl mb-2 tracking-tight">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
}