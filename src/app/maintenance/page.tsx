"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Monitor, ShieldCheck, Zap, TrendingUp, 
  CheckCircle2, AlertTriangle, ArrowRight, Phone,
  Cpu, BadgeCheck, BadgePercent, Landmark, Info, BarChart3
} from "lucide-react";
import Link from "next/link";

// ⚙️ V2.0 UNDERWRITING CONSTANTS
const MARKET_UNIT_PRICE = 800000;
const DIACARE_BASE_PRICE = 800000;
const CMC_YEARLY_COST = 45000;

export default function MachinesRevenueOS() {
  const [unitCount, setUnitCount] = useState(10);
  const [cityTier, setCityTier] = useState<'A' | 'B' | 'C'>('B');

  // 🧠 V2.0 UNDERWRITING ENGINE (Integrated Logic)
  const stats = useMemo(() => {
    // 1. Revenue Realization Logic
    const avgRealizedRate = cityTier === 'A' ? 1850 : cityTier === 'B' ? 1650 : 1450;
    const monthlySessions = unitCount * 2.5 * 0.85 * 26; // 85% Occupancy benchmark
    const monthlyRevenue = monthlySessions * avgRealizedRate;
    
    // 2. OPEX Modeling (Staff + Rent + Consumables)
    const monthlyOpex = (monthlySessions * 550) + (unitCount * 15000); // Variable + Semi-Fixed
    const monthlyEbitda = monthlyRevenue - monthlyOpex;
    const ebitdaMargin = (monthlyEbitda / monthlyRevenue) * 100;

    // 3. Investment Grade Logic
    const totalCapex = unitCount * 1000000; // 8L Machine + 2L Infra share
    const paybackMonths = totalCapex / monthlyEbitda;
    
    let grade = "B";
    if (ebitdaMargin > 25 && paybackMonths < 24) grade = "A+";
    else if (ebitdaMargin > 20 && paybackMonths < 30) grade = "A";
    else if (ebitdaMargin > 15) grade = "B";
    else grade = "C";

    return {
      monthlyRevenue,
      monthlyEbitda,
      ebitdaMargin,
      paybackMonths,
      grade,
      marketLiability: unitCount * (MARKET_UNIT_PRICE + (CMC_YEARLY_COST * 2)), // 2 years extra CMC
      diacareInvestment: unitCount * DIACARE_BASE_PRICE
    };
  }, [unitCount, cityTier]);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 selection:bg-[#C6A85A]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO: REVENUE PROTECTION */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A85A]/30 bg-[#C6A85A]/10 mb-6">
            <ShieldCheck size={14} className="text-[#C6A85A]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6A85A]">Investment Grade Engine v2.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white">
            Stop Buying Machines. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#D4B970]">Start Buying Cash Flow.</span>
          </h1>
        </div>

        {/* 📊 THE UNDERWRITING DASHBOARD */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0D1525] p-8 rounded-[2rem] border border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Projected Monthly EBITDA</p>
            <p className="text-4xl font-black text-white">₹{(stats.monthlyEbitda / 100000).toFixed(2)}L</p>
            <p className="text-xs text-[#00A8A8] mt-2 font-bold">{stats.ebitdaMargin.toFixed(1)}% Margin</p>
          </div>
          <div className="bg-[#0D1525] p-8 rounded-[2rem] border border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Capital Payback Period</p>
            <p className="text-4xl font-black text-white">{stats.paybackMonths.toFixed(1)} <span className="text-lg">Months</span></p>
            <p className="text-xs text-gray-400 mt-2 font-bold">Total CAPEX: ₹{(unitCount * 10).toFixed(0)}L</p>
          </div>
          <div className="bg-[#C6A85A]/10 p-8 rounded-[2rem] border border-[#C6A85A]/30 flex flex-col justify-center items-center">
            <p className="text-[10px] text-[#C6A85A] font-black uppercase tracking-widest mb-2">Investment Grade</p>
            <p className="text-7xl font-black text-[#C6A85A]">{stats.grade}</p>
          </div>
        </div>

        {/* INTERACTIVE CONTROLS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#0D1525] p-10 rounded-[2.5rem] border border-white/10">
             <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
               <BarChart3 className="text-[#C6A85A]" /> Adjust Project Parameters
             </h3>
             <div className="space-y-8">
               <div>
                 <div className="flex justify-between mb-4">
                   <span className="text-xs font-bold text-gray-400 uppercase">Machine Count</span>
                   <span className="text-xl font-black text-white">{unitCount}</span>
                 </div>
                 <input type="range" min="5" max="50" value={unitCount} onChange={(e) => setUnitCount(Number(e.target.value))} className="w-full accent-[#C6A85A]" />
               </div>
               <div>
                 <p className="text-xs font-bold text-gray-400 uppercase mb-4">City Tier (Revenue Realization)</p>
                 <div className="grid grid-cols-3 gap-2">
                   {(['A', 'B', 'C'] as const).map(tier => (
                     <button key={tier} onClick={() => setCityTier(tier)} className={`py-3 rounded-xl font-black text-sm transition-all ${cityTier === tier ? 'bg-[#C6A85A] text-[#0A0F1C]' : 'bg-[#0A0F1C] text-gray-500 border border-white/5'}`}>
                       Tier {tier}
                     </button>
                   ))}
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-10 rounded-[2.5rem]">
             <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
               <AlertTriangle className="text-[#A6192E]" /> The Irrational Alternative
             </h3>
             <div className="space-y-6">
               <div>
                 <p className="text-sm font-bold text-[#A6192E]">The "Year 2" Trap</p>
                 <p className="text-xs text-gray-400">Standard market machines bill ₹45,000 CMC per machine immediately after Month 12. For {unitCount} machines, that is a ₹{((unitCount * 45000)/100000).toFixed(2)}L cash-flow hit.</p>
               </div>
               <div className="pt-4 border-t border-[#A6192E]/10">
                 <p className="text-sm font-bold text-[#A6192E]">Unprotected Liability</p>
                 <p className="text-4xl font-black text-white tracking-tighter">₹{(stats.marketLiability / 10000000).toFixed(2)} Cr</p>
                 <p className="text-[10px] text-gray-500 uppercase mt-1">Total 3-Year Cost (Market Standard)</p>
               </div>
             </div>
          </div>
        </div>

        {/* 5-YEAR SYSTEM LOCK */}
        <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/30 p-12 md:p-20 rounded-[4rem] mb-24 relative overflow-hidden group text-center md:text-left">
           <div className="absolute -top-10 -right-10 opacity-5"><BadgePercent size={300} className="text-[#C6A85A]" /></div>
           <div className="max-w-3xl relative z-10">
             <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Zero Maintenance for 5 Years.</h2>
             <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10">
               Secure your margins. Lock your consumable supply with our Direct Procurement Network and we extend your Diacare Advance warranty to <span className="text-white font-bold underline decoration-[#C6A85A]">60 Months</span>.
             </p>
             <Link 
               href={`https://wa.me/919879576332?text=I%20want%20to%20negotiate%20the%205-Year%20Zero-Maintenance%20Lock-In%20Deal%20for%20${unitCount}%20machines.`}
               target="_blank"
               className="inline-flex bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#D4B970] transition-all items-center gap-3 shadow-2xl"
             >
               Negotiate 5-Year System Lock <Phone size={16} />
             </Link>
           </div>
        </div>

        {/* CROSS-SELL SYSTEM */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/consumables" className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 hover:border-[#00A8A8]/30 transition-all text-left group">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 group-hover:text-[#00A8A8]">Consumable Rail</p>
            <h4 className="text-white font-bold text-lg">₹400 / session Supply</h4>
          </Link>
          <Link href="/maintenance" className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 hover:border-[#A6192E]/30 transition-all text-left group">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 group-hover:text-[#A6192E]">Risk Control</p>
            <h4 className="text-white font-bold text-lg">AMC / CMC Stability</h4>
          </Link>
          <Link href="/ro-plant" className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 hover:border-[#C6A85A]/30 transition-all text-left group">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 group-hover:text-[#C6A85A]">Water Infra</p>
            <h4 className="text-white font-bold text-lg">Medical RO Architecture</h4>
          </Link>
        </div>
      </div>
    </main>
  );
}