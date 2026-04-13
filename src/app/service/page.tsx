"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Wrench, ShieldAlert, Clock, Activity, CheckCircle2, PhoneCall, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO ================= */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] mb-6">
              <Activity size={14} className="text-[#3B82F6]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#3B82F6]">Revenue Protection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
              Ensure Zero <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Clinical Downtime.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Our service operations are designed with one goal: to keep your dialysis machines running flawlessly. We offer predictive AMC, rapid emergency dispatch, and genuine OEM parts across Gujarat.
            </p>
          </motion.div>
        </div>

        {/* ================= SERVICE MODELS ================= */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          
          {/* Tier 1: Emergency */}
          <GlassCard accentColor="white" hover={false} className="p-8 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6">
              <ShieldAlert className="text-red-400" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Emergency Repair</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
              For hospitals not currently under our AMC. Rapid dispatch of certified engineers to diagnose and resolve critical machine failures.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gray-500" /> On-demand engineer dispatch</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gray-500" /> Transparent spare part pricing</li>
            </ul>
            <a href="https://wa.me/919879576332?text=Emergency%20Repair%20Required:%20" target="_blank" rel="noreferrer">
              <button className="w-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 text-white hover:text-red-400 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Request Urgent Fix
              </button>
            </a>
          </GlassCard>

          {/* Tier 2: Comprehensive AMC */}
          <div className="lg:-mt-6 lg:mb-6">
            <GlassCard accentColor="gold" hover={false} className="p-8 flex flex-col h-full relative overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] border-[#D4AF37]/30">
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                Most Popular
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20 mb-6">
                <ShieldCheck className="text-[#D4AF37]" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Comprehensive AMC</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
                Total peace of mind. We take full ownership of your equipment lifecycle, covering all preventive maintenance, unlimited breakdowns, and all costly spare parts.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]" /> All costly spare parts included</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]" /> Unlimited emergency visits</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#D4AF37]" /> Quarterly preventive calibrations</li>
              </ul>
              <Link href="/start">
                <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Lock In OPEX Profile
                </button>
              </Link>
            </GlassCard>
          </div>

          {/* Tier 3: Non-Comprehensive */}
          <GlassCard accentColor="blue" hover={false} className="p-8 flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20 mb-6">
              <Wrench className="text-[#3B82F6]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Labor AMC</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
              A balanced approach. We provide scheduled preventive maintenance and free unlimited breakdown visits. Spare parts are billed separately as needed.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#3B82F6]" /> Unlimited breakdown visits</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#3B82F6]" /> Scheduled preventive care</li>
            </ul>
            <Link href="/start">
              <button className="w-full bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                Request Contract
              </button>
            </Link>
          </GlassCard>

        </div>

        {/* ================= THE GUJARAT ADVANTAGE ================= */}
        <section className="mb-24">
          <div className="bg-[#0a1118] border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div className="relative h-full min-h-[350px] bg-[#010810] rounded-3xl border border-white/10 p-10 flex flex-col justify-center">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                   <Clock className="text-gray-400" size={28} />
                 </div>
                 <h3 className="text-3xl font-extrabold tracking-tighter mb-4">The Surat HQ Advantage</h3>
                 <p className="text-gray-400 leading-relaxed">
                   Unlike national brands that have to fly engineers or ship parts from Delhi or Mumbai, our operations are deeply rooted in Gujarat. This means a fully stocked spare parts warehouse and regional engineers ready to deploy instantly.
                 </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold tracking-tighter mb-8">Why top hospitals trust our service operations.</h2>
                <div className="space-y-6">
                  <FeatureRow icon={<Zap />} title="Predictive over Reactive" desc="We replace wear-and-tear components during scheduled AMC visits before they cause a critical failure mid-dialysis." />
                  <FeatureRow icon={<ShieldCheck />} title="100% Genuine OEM Parts" desc="As an authorized Diacare partner, we never compromise your machine's integrity with generic, third-party parts." />
                  <FeatureRow icon={<Activity />} title="RO Plant Sanitization" desc="Our service extends beyond the HD machines to include chemical sanitization and membrane replacement for your RO infrastructure." />
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="text-center bg-gradient-to-t from-[#3B82F6]/10 to-transparent border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-full bg-[#3B82F6]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">Machine down? Call us right now.</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Our rapid-response technical team is on standby to get your clinical operations back online.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+919879576332">
                <button className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-600 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2">
                  <PhoneCall size={16} /> Call Emergency Support
                </button>
              </a>
              <a href="https://wa.me/919879576332" target="_blank" rel="noreferrer">
                <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-md flex items-center justify-center gap-2">
                  Chat on WhatsApp
                </button>
              </a>
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
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-white">
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}