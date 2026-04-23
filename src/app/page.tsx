"use client";

import SovereignDecisionOS from "@/components/ui/SovereignDecisionOS";
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION: THE ENTRY POINT */}
      <section className="pt-20 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
          The Dialysis <span className="text-[#D4AF37]">Operating System.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Plan, Underwrite, and Deploy healthcare infrastructure with v7.0 Sovereign Intelligence. 
          From CAPEX modeling to Predictive AMC.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/tools" className="bg-[#D4AF37] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2">
            Open Terminal <Zap size={16} />
          </Link>
          <Link href="/service" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2">
            Service Intel <BarChart3 size={16} />
          </Link>
        </div>
      </section>

      {/* 2. THE CORE ENGINE (Embedded) */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck className="text-[#D4AF37]" />
            <h2 className="text-xl font-black uppercase tracking-widest">Live Underwriting Workspace</h2>
          </div>
          <SovereignDecisionOS />
        </div>
      </section>
    </div>
  );
}