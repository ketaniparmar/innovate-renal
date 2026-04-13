"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Building2, TrendingUp, Clock, ShieldCheck, Activity, Quote } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO ================= */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
              <ShieldCheck size={14} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Verified Clinical Success</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
              Predictable ROI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Flawless Execution.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              See how healthcare leaders across Gujarat use the Innovate IndAI infrastructure stack to launch, scale, and automate their dialysis centers.
            </p>
          </motion.div>
        </div>

        {/* ================= CASE STUDY 1: DAHEJ ================= */}
        <div className="mb-32">
          <GlassCard accent="gold" interactive={false} className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                    <Building2 className="text-[#D4AF37]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Dahej Public Hospital</h2>
                    <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest mt-1">50-Bed High-Volume Setup • Gujarat</p>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  Dahej Public Hospital required a massive, scalable dialysis infrastructure capable of handling high patient volumes without compromising clinical safety or operational margins. 
                  By deploying our automated Reuse Model and a centralized medical-grade RO plant, we drastically lowered their Variable OPEX.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <KPI icon={<TrendingUp />} label="EBITDA Increase" value="+30%" color="gold" />
                  <KPI icon={<Clock />} label="Execution Time" value="45 Days" color="gold" />
                  <KPI icon={<Activity />} label="Daily Capacity" value="150+ Tx" color="gold" />
                  <KPI icon={<ShieldCheck />} label="Compliance" value="100% NABH" color="gold" />
                </div>

                <Link href="/start">
                  <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    Model a 50-Bed Setup <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              {/* Right: Quote / Visual */}
              <div className="relative h-full min-h-[300px] bg-[#010810] rounded-[2rem] border border-white/5 p-10 flex flex-col justify-center">
                <Quote className="text-[#D4AF37] opacity-20 absolute top-8 left-8" size={80} />
                <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10 text-white italic mb-6">
                  "Innovate IndAI didn't just sell us machines. They architected our entire financial and operational workflow. The 30% jump in our margins was a direct result of their reuse automation strategies."
                </p>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Board of Directors</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Dahej Public Hospital</p>
                  </div>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>

        {/* ================= CASE STUDY 2: NOVA LIFELINE ================= */}
        <div className="mb-24">
          <GlassCard accent="blue" interactive={false} className="p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="order-2 lg:order-1 relative h-full min-h-[300px] bg-[#010810] rounded-[2rem] border border-white/5 p-10 flex flex-col justify-center">
                <Quote className="text-[#3B82F6] opacity-20 absolute top-8 right-8" size={80} />
                <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10 text-white italic mb-6">
                  "The peace of mind knowing our capital break-even was mathematically locked in at 13 months allowed us to focus purely on patient care. Their Zero-Downtime AMC is unparalleled."
                </p>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full" />
                  <div>
                    <p className="font-bold text-white">Dr. Vijay & Dr. Abhishek</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Nova Lifeline Super Speciality</p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/20">
                    <Building2 className="text-[#3B82F6]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight">Nova Lifeline Hospital</h2>
                    <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest mt-1">18-Bed Super Speciality • Bardoli</p>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  A premium facility demanding the highest standards of care. We provided a complete turnkey consultancy, handling NABH compliance zoning, authorized Diacare procurement, and an aggressive 13-month ROI payback model.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <KPI icon={<TrendingUp />} label="Capital Break-even" value="13 Months" color="blue" />
                  <KPI icon={<Clock />} label="Machine Uptime" value="99.9%" color="blue" />
                </div>

                <Link href="/tools">
                  <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                    Run Financial Model <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

            </div>
          </GlassCard>
        </div>

        {/* ================= CTA BANNER ================= */}
        <section className="text-center bg-gradient-to-t from-[#D4AF37]/10 to-transparent border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-full bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">Join the top 1% of profitable renal centers.</h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto">
              Stop guessing your capital expenditure. Use our AI engine to generate a pixel-perfect financial model for your hospital today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tools">
                <button className="bg-[#D4AF37] text-[#010810] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-yellow-500 transition-all flex items-center gap-2">
                  Generate Custom DPR <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

// Sub-component for KPIs
function KPI({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: "gold" | "blue" }) {
  const isGold = color === "gold";
  return (
    <div className={`p-4 rounded-xl border bg-[#010810] ${isGold ? "border-[#D4AF37]/20" : "border-[#3B82F6]/20"}`}>
      <div className={`flex items-center gap-2 mb-2 ${isGold ? "text-[#D4AF37]" : "text-[#3B82F6]"}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 16 } as any)}
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}