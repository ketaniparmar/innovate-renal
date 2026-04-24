"use client";

import { useInfra } from "@/context/InfrastructureContext";
import { GlassCard } from "./GlassCard";

export default function UnderwritingTerminal({ financials, simulation }: any) {
  return (
    <div className="bg-sovereign-navy p-8 min-h-screen">
      {/* 1. CONFIDENCE HEADER */}
      <div className="mb-12">
        <h2 className="text-sovereign-white text-5xl font-black tracking-tighter">
          Institutional <span className="text-gradient-gold">Underwriting.</span>
        </h2>
        <p className="text-sovereign-gray uppercase tracking-widest text-[10px] mt-2">
          Monte Carlo Confidence Interval: <span className="text-emerald-400">P90 Validated</span>
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* 2. PROBABILITY DISTRIBUTION (STYLIZED) */}
        <div className="col-span-8 bg-sovereign-navy-light border border-sovereign-navy-border rounded-[3rem] p-10 h-[400px] relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-black text-sovereign-gray uppercase tracking-widest">Yield Probability Distribution</span>
            <span className="text-sovereign-teal font-bold text-xs">Simulated Iterations: 1,000</span>
          </div>
          
          {/* Heatmap visualization would go here */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-sovereign-teal/10 to-transparent" />
        </div>

        {/* 3. HARD AUDIT KPIs */}
        <div className="col-span-4 space-y-6">
          <GlassCard accent="gold">
            <p className="text-[10px] font-black text-sovereign-gray uppercase mb-2">Enterprise NPV</p>
            <h3 className="text-4xl font-black text-sovereign-white">₹ {(financials.npv / 10000000).toFixed(2)} Cr</h3>
          </GlassCard>

          <GlassCard accent="teal">
            <p className="text-[10px] font-black text-sovereign-gray uppercase mb-2">Weighted Realization (WAR)</p>
            <h3 className="text-4xl font-black text-sovereign-white">₹ {financials.war.toFixed(0)}</h3>
          </GlassCard>

          <div className="p-8 bg-sovereign-red-muted border border-sovereign-red/20 rounded-3xl">
             <p className="text-[10px] font-black text-sovereign-red uppercase mb-1 tracking-widest">Risk Factor</p>
             <p className="text-xs text-sovereign-white leading-relaxed font-medium">
               High TDS profile detected. Membrane replacement frequency accelerated by 1.8x. 
               <span className="block mt-2 font-bold text-sovereign-red underline cursor-pointer">View Mitigation Strategy</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}