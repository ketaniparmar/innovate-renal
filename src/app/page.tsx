"use client";

import React from "react";
import HeroSplit from "@/components/ui/HeroSplit";
import { GlassCard } from "@/components/ui/GlassCard";
// Using relative path to prevent Vercel module resolution errors
import DialysisCostCalculator from "../components/ui/DialysisCostCalculator";
import { ShieldCheck, Cpu, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";

// --- TYPES ---
interface MetricProps {
  value: string;
  label: string;
  highlight?: boolean;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: "gold" | "blue" | "white";
}

export default function HomePage() {
  return (
    <div className="bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810]">

      {/* ================= HERO ================= */}
      <HeroSplit />

      {/* ================= TRUST METRICS ================= */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <Metric value="100+" label="Machines Installed" />
          <Metric value="50+" label="Hospitals Served" />
          <Metric value="24/7" label="Service Support" highlight />
        </div>
      </section>

      {/* ================= PARTNERS / LOGOS ================= */}
      <section className="py-16 border-b border-white/5 relative overflow-hidden">
        {/* Subtle background glow for logos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[100px] bg-white/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-10">
            Trusted by Healthcare Leaders & Institutions
          </p>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            <span className="text-2xl font-black tracking-tighter text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">NABH</span>
            <span className="text-2xl font-bold tracking-widest text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">DIACARE</span>
            <span className="text-xl font-serif italic text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">MedicalWorld</span>
            <span className="text-xl font-black tracking-widest border-2 border-white px-2 py-0.5 text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">ISN</span>
            <span className="text-xl font-mono tracking-tighter text-white opacity-40 hover:opacity-100 transition-opacity cursor-default">HEALTH-GUJ</span>
          </div>
        </div>
      </section>

      {/* ================= PLATFORM SECTION ================= */}
      <section className="py-32 max-w-[1280px] mx-auto px-6">

        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-6">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Platform Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
            One Platform. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Complete Infrastructure.</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed">
            From financial planning and OEM procurement to precision installation and lifetime maintenance,
            Innovate India operates as a unified operating system for renal care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Stethoscope size={32} className="text-[#D4AF37]" />}
            title="Equipment Supply"
            desc="Authorized Diacare hemodialysis machines, RO systems, and clinical-grade consumables."
            accent="gold"
          />
          <FeatureCard
            icon={<ShieldCheck size={32} className="text-[#3B82F6]" />}
            title="Service & AMC"
            desc="24/7 breakdown support, predictive maintenance, and zero downtime operations for hospitals."
            accent="blue"
          />
          <FeatureCard
            icon={<Cpu size={32} className="text-white" />}
            title="AI Planning Tools"
            desc="Instant DPR generation, CAPEX/OPEX cost modeling, and data-driven ROI simulations."
            accent="white"
          />
        </div>

      </section>

      {/* ================= ROI ENGINE (CALCULATOR) ================= */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <DialysisCostCalculator />
        </div>
      </section>

      {/* ================= MICRO CONVERSION ================= */}
      <section className="py-16 border-t border-white/5 text-center bg-gradient-to-b from-white/[0.02] to-transparent">
        <p className="text-gray-400 mb-4 text-sm font-medium">Want to explore full setup costs?</p>
        <Link href="/resources/dialysis-cost-calculator-india">
          <button className="inline-flex items-center gap-2 text-[#D4AF37] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all bg-[#D4AF37]/10 px-6 py-3 rounded-full border border-[#D4AF37]/20 hover:bg-[#D4AF37]/20">
            View Capital Setup Estimator <ArrowRight size={16} />
          </button>
        </Link>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="pb-32 px-6 pt-16">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-b from-[#D4AF37]/5 to-transparent border border-white/10 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">

          {/* Inner Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-full bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-6">
              Start Your Project
            </p>

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-10 leading-tight">
              Ready to build your <br/> dialysis center?
            </h2>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all">
                  Get Custom Quote
                </button>
              </Link>

              <Link href="/service">
                <button className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-md">
                  Book AMC Service
                </button>
              </Link>
            </div>

            <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-gray-500" /> Authorized Diacare Distributor — Gujarat Region
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function Metric({ value, label, highlight }: MetricProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className={`text-5xl font-black tracking-tighter mb-3 ${highlight ? "text-[#3B82F6]" : "text-white"}`}>
        {value}
      </h3>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, desc, accent }: FeatureCardProps) {
  return (
    <GlassCard accentColor={accent} className="flex flex-col h-full items-start text-left">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border
        ${accent === 'gold' ? 'bg-[#D4AF37]/10 border-[#D4AF37]/20' : 
          accent === 'blue' ? 'bg-[#3B82F6]/10 border-[#3B82F6]/20' : 
          'bg-white/10 border-white/20'}`}>
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>

      <p className="text-sm text-gray-400 leading-relaxed">
        {desc}
      </p>
    </GlassCard>
  );
}