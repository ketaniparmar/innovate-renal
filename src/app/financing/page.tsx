"use client";

import React, { useState, useMemo } from "react";
import { 
  Landmark, AlertTriangle, ShieldCheck, ArrowRight, Phone,
  TrendingDown, Coins, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { calculateWorkingCapital } from "@/lib/advisory/working-capital";

export default function FinancingOS() {
  const [monthlyOpex, setMonthlyOpex] = useState(800000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(1200000);
  const [delayDays, setDelayDays] = useState(60);

  const stats = useMemo(() => {
    return calculateWorkingCapital({
      monthlyOpex,
      monthlyRevenue,
      delayDays
    });
  }, [monthlyOpex, monthlyRevenue, delayDays]);

  const formatINR = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 selection:bg-[#C6A85A]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= HERO ================= */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A85A]/30 bg-[#C6A85A]/10 mb-6">
            <Landmark size={14} className="text-[#C6A85A]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6A85A]">Liquidity Protection System</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white">
            Survive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A6192E] to-red-500">Death Valley.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
            Profitable centers go bankrupt when PMJAY and insurance claims take 60 to 90 days to clear. We model your exact cash flow gap and structure the working capital required to keep your doors open.
          </p>
        </div>

        {/* ================= CALCULATOR ================= */}
        <div className="bg-[#0D1525] border border-white/10 rounded-[3rem] p-10 md:p-16 mb-16 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Inputs */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-6">
                <TrendingDown className="text-[#A6192E]" /> The Cash Flow Drag
              </h3>
              
              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Monthly OPEX (Burn Rate)</span>
                  <span className="text-lg font-black text-[#A6192E]">{formatINR(monthlyOpex)}</span>
                </div>
                <input type="range" min="300000" max="2500000" step="50000" value={monthlyOpex} onChange={(e) => setMonthlyOpex(Number(e.target.value))} className="w-full accent-[#A6192E]" />
              </div>

              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Average Payment Delay</span>
                  <span className="text-lg font-black text-white">{delayDays} Days</span>
                </div>
                <input type="range" min="15" max="120" step="5" value={delayDays} onChange={(e) => setDelayDays(Number(e.target.value))} className="w-full accent-[#C6A85A]" />
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-8 rounded-[2rem]">
                <p className="text-[10px] text-[#A6192E] font-black uppercase tracking-widest mb-2">Required Survival Buffer</p>
                <p className="text-5xl font-black text-white tracking-tighter mb-2">{formatINR(stats.minimumCashBuffer)}</p>
                <p className="text-xs text-gray-400 font-medium">Cash needed in the bank to pay staff and rent while waiting for claims to clear.</p>
              </div>

              <div className="bg-[#C6A85A]/10 p-8 rounded-[2rem] border border-[#C6A85A]/30">
                <p className="text-[10px] text-[#C6A85A] font-black uppercase tracking-widest mb-2">Recommended Working Capital Line</p>
                <p className="text-4xl font-black text-[#C6A85A] tracking-tighter mb-2">{formatINR(stats.recommendedLoanAmount)}</p>
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <Coins size={14} className="text-[#C6A85A]" /> Interest Burden: {formatINR(stats.monthlyInterestBurden)} / mo
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= CALL TO ACTION ================= */}
        <div className="bg-gradient-to-br from-[#0A0F1C] to-[#0D1525] border border-white/5 p-12 rounded-[3rem] text-center">
          <h2 className="text-3xl font-black text-white mb-4">Don't let government delays kill your facility.</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            We help structure your capital stack correctly from Day 1, ensuring your CAPEX doesn't drain the liquidity you need to survive your first 6 months of operations.
          </p>
          <Link 
            href={`https://wa.me/919879576332?text=I%20need%20working%20capital%20advisory.%20My%20estimated%20burn%20rate%20is%20${formatINR(monthlyOpex)}/mo%20with%20a%20${delayDays}-day%20delay.`}
            target="_blank"
            className="inline-flex bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#D4B970] transition-all items-center gap-3 shadow-xl"
          >
            Structure Capital Stack <ArrowUpRight size={16} />
          </Link>
        </div>

      </div>
    </main>
  );
}