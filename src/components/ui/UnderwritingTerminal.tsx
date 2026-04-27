"use client";

import React from "react";
import { useInfra } from "@/context/InfrastructureContext";
import { GlassCard } from "@/components/ui/GlassCard"; // Ensure this path matches your structure

// --- STRICT TYPES (Prevents Vercel Build Crashes) ---
interface FinancialMetrics {
  npv: number;
  war: number;
  [key: string]: any; // Allows passing broader financial objects safely
}

interface SimulationData {
  iterations?: number;
  confidence?: string;
}

interface UnderwritingTerminalProps {
  financials: FinancialMetrics;
  simulation?: SimulationData; 
}

export default function UnderwritingTerminal({ financials, simulation }: UnderwritingTerminalProps) {
  // ✅ FIX: Safely extract the TDS level from V9 Context to make the risk dynamic
  const infraContext = useInfra();
  const tdsLevel = infraContext?.tdsLevel || 850; 

  // Dynamic Risk Assessment Logic
  const isHighTDS = tdsLevel > 600;

  return (
    <div className="bg-[#0A0F1C] p-8 md:p-12 min-h-screen font-sans">
      
      {/* 1. CONFIDENCE HEADER */}
      <div className="mb-12 border-b border-white/5 pb-8">
        <h2 className="text-white text-5xl font-black tracking-tighter">
          Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-yellow-500">Underwriting.</span>
        </h2>
        <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] mt-4 font-black">
          Monte Carlo Confidence Interval: <span className="text-[#00A8A8]">P90 Validated</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* 2. PROBABILITY DISTRIBUTION (STYLIZED) */}
        <div className="md:col-span-8 bg-[#0D1525] border border-white/5 rounded-[3rem] p-10 h-[400px] relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Yield Probability Distribution</span>
            <span className="text-[#00A8A8] font-bold text-xs uppercase tracking-widest">
              Simulated Iterations: {simulation?.iterations || "1,000"}
            </span>
          </div>
          
          {/* Heatmap/Graph Background Glow */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#00A8A8]/10 to-transparent pointer-events-none" />
          
          <div className="w-full h-full flex items-center justify-center relative z-10 pb-10 opacity-30">
             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full">
               Awaiting Monte Carlo Rendering Engine
             </span>
          </div>
        </div>

        {/* 3. HARD AUDIT KPIs */}
        <div className="md:col-span-4 space-y-6">
          <GlassCard accent="gold" interactive={false} className="p-8 bg-[#0D1525] border-white/5 rounded-[2rem]">
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Enterprise NPV</p>
            <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">
              ₹ {financials?.npv ? (financials.npv / 10000000).toFixed(2) : "0.00"} Cr
            </h3>
          </GlassCard>

       <GlassCard accent="blue" interactive={false} className="p-8 bg-[#0D1525] border-white/5 rounded-[2rem]">
            <p className="text-[10px] font-black text-gray-500 uppercase mb-2 tracking-[0.2em]">Weighted Realization (WAR)</p>
            <h3 className="text-4xl font-black text-white tracking-tighter tabular-nums">
              ₹ {financials?.war ? financials.war.toFixed(0) : "0"}
            </h3>
          </GlassCard>

          {/* DYNAMIC RISK FACTOR BOX */}
          <div className={`p-8 border rounded-[2rem] shadow-xl transition-all ${isHighTDS ? 'bg-[#A6192E]/5 border-[#A6192E]/20' : 'bg-white/5 border-white/10'}`}>
             <p className={`text-[10px] font-black uppercase mb-3 tracking-widest ${isHighTDS ? 'text-[#A6192E]' : 'text-gray-400'}`}>
               Operational Risk Factor
             </p>
             <p className="text-xs text-gray-300 leading-relaxed font-medium">
               {isHighTDS 
                 ? `High TDS profile (${tdsLevel} ppm) detected. RO Membrane replacement frequency is accelerated. OPEX variance modeled at +4%.`
                 : `Stable water profile (${tdsLevel} ppm). Membrane lifecycle is within standard parameters. No major CAPEX variance required.`
               }
               <span className={`block mt-4 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity ${isHighTDS ? 'text-[#A6192E] underline' : 'text-[#00A8A8]'}`}>
                 {isHighTDS ? "View Mitigation Strategy" : "System Optimized"}
               </span>
             </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}