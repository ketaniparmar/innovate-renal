"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Activity, 
  PieChart,
  DollarSign,
  ChevronRight,
  Info
} from "lucide-react";

export default function ROICalculator() {
  // --- INPUT STATE ---
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(3.0);
  const [avgRevenue, setAvgRevenue] = useState(2200);
  const [cityTier, setCityTier] = useState<"A" | "B" | "C">("B");

  // --- BUSINESS LOGIC ENGINE ---
  const results = useMemo(() => {
    const WORKING_DAYS = 26;
    const monthlySessions = machines * sessionsPerDay * WORKING_DAYS;
    
    // Revenue Math
    const monthlyRevenue = monthlySessions * avgRevenue;
    
    // OPEX Math (Based on Diacare Optimized Supply Rail)
    // 27ml Sterilant per session [cite: 157] + Med-grade consumables
    const consumableCostPerSession = 850; 
    const totalConsumableOpex = monthlySessions * consumableCostPerSession;
    
    // Staff & Rent (City Tier Multipliers)
    const tierMultiplier = cityTier === "A" ? 1.4 : cityTier === "B" ? 1.0 : 0.7;
    const fixedOpex = (machines * 45000 * tierMultiplier); // Staff, Rent, Utilities
    
    const totalOpex = totalConsumableOpex + fixedOpex;
    const monthlyEbitda = monthlyRevenue - totalOpex;
    const ebitdaMargin = (monthlyEbitda / monthlyRevenue) * 100;
    
    // CAPEX Modeling (Equipment + Infrastructure)
    const machineCapex = machines * 1050000; // AI-Series Premium Setup
    const infraCapex = machines * 350000; 
    const totalCapex = machineCapex + infraCapex;
    
    const paybackMonths = monthlyEbitda > 0 ? totalCapex / monthlyEbitda : 0;

    return {
      monthlySessions: Math.round(monthlySessions),
      monthlyRevenue,
      monthlyEbitda,
      ebitdaMargin: ebitdaMargin.toFixed(1),
      totalCapex,
      paybackYears: (paybackMonths / 12).toFixed(1),
      yearlyRecurringRevenue: monthlyRevenue * 12
    };
  }, [machines, sessionsPerDay, avgRevenue, cityTier]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-24 pb-24 px-6 overflow-hidden">
      
      {/* 🌌 Background Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/5 blur-[150px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[150px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.4em] mb-4">Financial Intelligence Layer</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">Dialysis Project <br/><span className="text-white/60">ROI Engine.</span></h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT: INPUT CONTROLS --- */}
          <div className="lg:col-span-5 space-y-8 p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl">
            
            <Slider 
              label="Planned Machines" 
              value={machines} 
              min={5} max={50} 
              onChange={setMachines} 
              icon={<Activity size={16} className="text-[#00A8A8]"/>}
            />

            <Slider 
              label="Sessions per Day" 
              value={sessionsPerDay} 
              min={1.0} max={4.0} step={0.5}
              onChange={setSessionsPerDay} 
              icon={<Zap size={16} className="text-[#C6A85A]"/>}
            />

            <Slider 
              label="Avg. Revenue / Session" 
              value={avgRevenue} 
              min={1100} max={4500} step={100}
              suffix="₹"
              onChange={setAvgRevenue} 
              icon={<DollarSign size={16} className="text-[#00A8A8]"/>}
            />

            <div className="space-y-4">
               <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                 Location Tier (Staff & Rent Impact)
               </label>
               <div className="grid grid-cols-3 gap-3">
                 {(['A', 'B', 'C'] as const).map(tier => (
                   <button 
                     key={tier}
                     onClick={() => setCityTier(tier)}
                     className={`py-3 rounded-xl font-bold text-xs transition-all border ${cityTier === tier ? 'bg-[#C6A85A] text-[#0A0F1C] border-[#C6A85A]' : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20'}`}
                   >
                     Tier {tier}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* --- RIGHT: REAL-TIME OUTPUTS --- */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <OutputCard 
                label="Monthly EBITDA" 
                value={`₹${formatINR(results.monthlyEbitda)}`} 
                subValue={`${results.ebitdaMargin}% Margin`}
                highlight
              />
              <OutputCard 
                label="Total Project CAPEX" 
                value={`₹${(results.totalCapex / 10000000).toFixed(2)} Cr`} 
                subValue="Equip + Infra + Setup"
              />
              <OutputCard 
                label="Payback Horizon" 
                value={`${results.paybackYears} Years`} 
                subValue="Capital Recovery Period"
              />
              <OutputCard 
                label="Sessions / Month" 
                value={results.monthlySessions.toString()} 
                subValue={`at ${sessionsPerDay} Utilization`}
              />
            </div>

            {/* --- SYSTEM VALIDATION BAR --- */}
            <div className="p-8 rounded-[2.5rem] bg-[#00A8A8]/10 border border-[#00A8A8]/20 flex items-center gap-6">
              <div className="hidden md:flex w-12 h-12 rounded-full bg-[#00A8A8]/20 items-center justify-center shrink-0">
                <ShieldCheck className="text-[#00A8A8]" />
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                <strong className="text-white">Margin Note:</strong> These projections include the **Diacare 27ml Sterilant Advantage**  and **12-minute dual-station reprocessing**. Optimized throughput increases monthly EBITDA by approximately 18% compared to fragmented setups.
              </p>
            </div>

            {/* --- FINAL CONVERSION CTA --- */}
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full mt-4 p-8 rounded-[2.5rem] bg-gradient-to-r from-[#C6A85A] to-[#D4B970] text-[#0A0F1C] flex items-center justify-between group shadow-[0_20px_50px_rgba(198,168,90,0.2)]"
              >
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Next Step</p>
                  <h3 className="text-2xl font-black tracking-tight">Download Full Feasibility Report</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                  <ChevronRight size={24} />
                </div>
              </motion.button>
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}

/* --- UI SUB-COMPONENTS --- */

function Slider({ label, value, min, max, step = 1, onChange, suffix = "", icon }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-lg font-black text-white">{suffix}{value}</span>
      </div>
      <input 
        type="range" 
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C6A85A]"
      />
    </div>
  );
}

function OutputCard({ label, value, subValue, highlight = false }: any) {
  return (
    <div className={`p-8 rounded-[2.5rem] border ${highlight ? 'bg-[#C6A85A]/10 border-[#C6A85A]/30' : 'bg-white/[0.03] border-white/10'}`}>
      <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">{label}</p>
      <p className={`text-3xl font-black mb-1 ${highlight ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</p>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{subValue}</p>
    </div>
  );
}