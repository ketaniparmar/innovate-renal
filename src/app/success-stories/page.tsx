"use client";

import React from "react";
import { ArrowRight, Building2, TrendingUp, Clock, ShieldCheck, Activity, Quote, Landmark } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-slate-200 overflow-hidden relative selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* Institutional Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#00A8A8]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* ================= HERO ================= */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00A8A8]/20 bg-[#00A8A8]/10 mb-6">
              <ShieldCheck size={14} className="text-[#00A8A8]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00A8A8]">Verified Clinical Success</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-tight text-white">
              Predictable ROI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-yellow-500">Flawless Execution.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              See how healthcare leaders across Gujarat use Innovate India's financial underwriting and infrastructure planning to launch, scale, and secure their dialysis centers.
            </p>
          </motion.div>
        </div>

        {/* ================= CASE STUDY 1: DAHEJ ================= */}
        <div className="mb-32">
          <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all hover:border-white/10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center border border-[#00A8A8]/20">
                    <Building2 className="text-[#00A8A8]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-white">Dahej Public Hospital</h2>
                    <p className="text-[10px] text-[#00A8A8] font-black uppercase tracking-[0.2em] mt-1">50-Machine High-Volume Setup • Gujarat</p>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 text-base font-medium">
                  Dahej Public Hospital required a massive, scalable dialysis infrastructure capable of handling high patient volumes without compromising clinical safety or operational margins. 
                  By deploying our optimized clinical supply chain and a centralized medical-grade RO plant, we drastically lowered their variable OPEX and secured their cash flow.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <KPI icon={<TrendingUp />} label="EBITDA Increase" value="+30%" color="teal" />
                  <KPI icon={<Clock />} label="Execution Time" value="45 Days" color="teal" />
                  <KPI icon={<Activity />} label="Daily Capacity" value="150+ Tx" color="teal" />
                  <KPI icon={<ShieldCheck />} label="Compliance" value="100% NABH" color="teal" />
                </div>

                <Link href="/os">
                  <button className="bg-[#00A8A8] hover:bg-teal-500 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_10px_20px_rgba(0,168,168,0.15)]">
                    Assess High-Volume Setup <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              {/* Right: Quote / Visual */}
              <div className="relative h-full min-h-[300px] bg-[#0A0F1C] rounded-[2rem] border border-white/5 p-10 flex flex-col justify-center shadow-inner">
                <Quote className="text-[#00A8A8] opacity-10 absolute top-8 left-8" size={80} />
                <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10 text-white italic mb-6">
                  "Innovate India didn't just sell us machines. They architected our entire financial and operational workflow. The 30% jump in our margins was a direct result of their structured supply strategies."
                </p>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full border border-white/10" />
                  <div>
                    <p className="font-bold text-white">Board of Directors</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Dahej Public Hospital</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ================= CASE STUDY 2: NOVA LIFELINE ================= */}
        <div className="mb-24">
          <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all hover:border-white/10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content (Visual/Quote) */}
              <div className="order-2 lg:order-1 relative h-full min-h-[300px] bg-[#0A0F1C] rounded-[2rem] border border-white/5 p-10 flex flex-col justify-center shadow-inner">
                <Quote className="text-[#C6A85A] opacity-10 absolute top-8 right-8" size={80} />
                <p className="text-xl md:text-2xl font-medium leading-relaxed relative z-10 text-white italic mb-6">
                  "The peace of mind knowing our capital break-even was mathematically locked in at 13 months allowed us to focus purely on patient care. Their Zero-Downtime AMC is unparalleled."
                </p>
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full border border-white/10" />
                  <div>
                    <p className="font-bold text-white">Dr. Vijay & Dr. Abhishek</p>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nova Lifeline Super Speciality</p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center border border-[#C6A85A]/20">
                    <Building2 className="text-[#C6A85A]" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-white">Nova Lifeline Hospital</h2>
                    <p className="text-[10px] text-[#C6A85A] font-black uppercase tracking-[0.2em] mt-1">18-Machine Super Speciality • Bardoli</p>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed mb-8 text-base font-medium">
                  A premium facility demanding the highest standards of care. We provided a complete turnkey advisory, handling NABH compliance zoning, structured equipment procurement, and an aggressive 13-month ROI payback model.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <KPI icon={<TrendingUp />} label="Capital Break-even" value="13 Months" color="gold" />
                  <KPI icon={<Clock />} label="Machine Uptime" value="99.9%" color="gold" />
                </div>

                <Link href="/os">
                  <button className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                    Underwrite Your Setup <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ================= CTA BANNER ================= */}
        <section className="text-center bg-[#0D1525] border border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-full bg-[#C6A85A]/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-2xl flex items-center justify-center mb-6">
              <Landmark className="text-[#C6A85A]" size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">Join the top 1% of profitable renal centers.</h2>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto font-medium text-lg">
              Doctor, secure your capital before you deploy it. Generate a precise financial model for your hospital today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/os">
                <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(198,168,90,0.15)] hover:bg-[#D4B970] transition-all flex items-center justify-center gap-2">
                  Start Financial Assessment <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

// STRICT SUB-COMPONENTS
function KPI({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: "gold" | "teal" }) {
  const isGold = color === "gold";
  return (
    <div className={`p-5 rounded-2xl border bg-[#0A0F1C] transition-colors ${isGold ? "border-[#C6A85A]/20 hover:border-[#C6A85A]/40" : "border-[#00A8A8]/20 hover:border-[#00A8A8]/40"}`}>
      <div className={`flex items-center gap-2 mb-2 ${isGold ? "text-[#C6A85A]" : "text-[#00A8A8]"}`}>
        {/* Type-safe cloneElement to prevent build crashes */}
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</p>
      </div>
      <p className="text-2xl font-black text-white tracking-tight">{value}</p>
    </div>
  );
}