"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

import { useInfra } from "@/context/InfrastructureContext";
// Ensure this path matches your v8 capex engine location
import { calculateV8Capex } from "@/lib/capex-engine-v8"; 

// --- STRICT TYPES (Prevents Vercel Build Crashes) ---
interface ToggleProps {
  active: boolean;
  onClick: () => void;
  color: string;
}

interface MetricProps {
  label: string;
  value: string;
}

export default function RiskControlPage() {
  const infra = useInfra();

  // --- 1. CORE INFRA DNA (Safe Fallbacks for Direct/SEO Traffic) ---
  const {
    machines = 15,
    sessionsPerDay = 2.8,
    downtime = 5,
    pmjay = 40,
    pvt = 40,
    tpa = 20,
    cityTier = "Tier_2",
    tdsLevel = 850,
    buildGrade = "Premium"
  } = infra || {};

  const [withAMC, setWithAMC] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);

  // --- 2. HEDGING ENGINE (v8.0 Sync) ---
  const metrics = useMemo(() => {
    // Sync with V8 CAPEX math safely
    let totalCapex = 0;
    try {
      const capex = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
      totalCapex = capex.totalCapex;
    } catch (e) {
      totalCapex = machines * 1200000; // Safe fallback if engine is missing
    }

    // Sync with V8 Revenue Realization
    const WAR = (pmjay/100 * 1300) + (pvt/100 * 2600) + (tpa/100 * 2100);
    const monthlyRevenue = (machines * sessionsPerDay * 26) * WAR;

    // Exposure Segmentation
    const downtimeLoss = monthlyRevenue * (downtime / 100);
    const clinicalLeakage = monthlyRevenue * 0.12; // Standard underutilization/leakage factor
    const totalExposure = downtimeLoss + clinicalLeakage;

    // Hedge Logic: 85% Recovery via Managed Service (AMC)
    const monthlyAMC = (45000 * machines) / 12; // AMC Unit Cost
    const netDowntimePostAMC = monthlyRevenue * 0.01; // Optimized to 1%
    const amcGain = (downtimeLoss - netDowntimePostAMC) * 0.85; // Realistic 85% conversion

    // Hedge Logic: Insurance (EEI) Risk Transfer
    const monthlyInsurance = (totalCapex * 0.01) / 12;
    const catastrophicRisk = clinicalLeakage * 0.95; // 95% risk transfer on breakdown

    // ROI Integration
    const totalCost = (withAMC ? monthlyAMC : 0) + (withInsurance ? monthlyInsurance : 0);
    const totalProtection = (withAMC ? amcGain : 0) + (withInsurance ? catastrophicRisk : 0);
    const netSavings = totalProtection - totalCost;
    const riskCoverage = totalExposure > 0 ? (totalProtection / totalExposure) * 100 : 0;

    return {
      monthlyRevenue,
      totalExposure,
      totalCapex,
      netSavings,
      riskCoverage,
      monthlyAMC,
      monthlyInsurance,
      downtimeLoss,
      clinicalLeakage
    };
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, cityTier, tdsLevel, buildGrade, withAMC, withInsurance]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(Math.round(val))}`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 p-6 lg:p-12 font-sans overflow-x-hidden selection:bg-[#C6A85A] selection:text-[#0A0F1C] pt-24">
      <div className="max-w-4xl mx-auto">
        
        {/* --- STRATEGIC ADD 1: PRE-FRAME --- */}
        <div className="max-w-3xl mb-12 animate-in fade-in duration-500">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
            Doctor, this is how you <span className="text-[#00A8A8]">stop the leakage.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
            In the previous step, you saw where money is lost.  
            Now, let's simulate how structured operational systems recover and protect your income.
          </p>
        </div>

        {/* INSTITUTIONAL HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-10 gap-8 animate-in slide-in-from-bottom duration-500 delay-100">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00A8A8] mb-3">
              Financial Underwriting <ChevronRight size={12} /> Risk Neutralization
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-white">Downside Intelligence</h1>
            <p className="text-gray-500 text-sm mt-3 font-medium">
              Safeguarding <span className="text-[#C6A85A] font-bold">₹{(metrics.totalCapex / 10000000).toFixed(2)} Cr</span> in Clinical Infrastructure.
            </p>
          </div>
          <div className="text-left md:text-right bg-[#0D1525] p-4 rounded-2xl border border-white/5">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Exposure Hedged</p>
            <p className={`text-4xl font-black tracking-tighter ${metrics.riskCoverage > 80 ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
              {metrics.riskCoverage.toFixed(0)}%
            </p>
          </div>
        </header>

        {/* --- STRATEGIC ADD 2: SIMPLIFIED INSIGHT LAYER --- */}
        <div className="bg-[#A6192E]/10 border border-[#A6192E]/20 p-8 rounded-[2rem] mb-10 shadow-lg animate-in slide-in-from-bottom duration-500 delay-200">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="text-[#A6192E]" size={24} />
            <p className="text-white font-black text-xl tracking-tight">
              Without control systems, 15–30% of your revenue is exposed every month.
            </p>
          </div>
          <p className="text-gray-400 text-sm mt-2 font-medium pl-9">
            This leakage is rarely visible in standard accounting reports — but it directly and continuously impacts your net profit margin. Activate the safety protocols below to model the recovery.
          </p>
        </div>

        {/* RISK HEDGING CONTROLS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 animate-in slide-in-from-bottom duration-500 delay-300">
          <div className={`p-8 rounded-[2.5rem] border transition-all shadow-xl ${withAMC ? 'bg-[#00A8A8]/10 border-[#00A8A8]/30' : 'bg-[#0D1525] border-white/5'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center text-[#00A8A8] border border-[#00A8A8]/20">
                <Zap size={28} fill={withAMC ? "#00A8A8" : "none"} />
              </div>
              <Toggle active={withAMC} onClick={() => setWithAMC(!withAMC)} color="bg-[#00A8A8]" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Predictive Maintenance (AMC)</h3>
            <p className="text-sm font-medium text-gray-400 leading-relaxed">Eliminate catastrophic downtime leakage via 24/7 technical oversight and preventive parts replacement.</p>
          </div>

          <div className={`p-8 rounded-[2.5rem] border transition-all shadow-xl ${withInsurance ? 'bg-[#C6A85A]/10 border-[#C6A85A]/30' : 'bg-[#0D1525] border-white/5'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center text-[#C6A85A] border border-[#C6A85A]/20">
                <ShieldCheck size={28} fill={withInsurance ? "#C6A85A" : "none"} />
              </div>
              <Toggle active={withInsurance} onClick={() => setWithInsurance(!withInsurance)} color="bg-[#C6A85A]" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Asset Risk Transfer (EEI)</h3>
            <p className="text-sm font-medium text-gray-400 leading-relaxed">Transfer massive electronic and mechanical breakdown capital risk directly to underwriters.</p>
          </div>
        </div>

        {/* FINANCIAL IMPACT */}
        <div className="bg-[#0A1118] border border-white/5 rounded-[3rem] p-10 md:p-14 mb-10 relative overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 delay-300">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldAlert size={250} />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Projected Monthly Net Impact</p>
              <h2 className={`text-6xl md:text-7xl font-black tracking-tighter tabular-nums ${metrics.netSavings > 0 ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
                {formatINR(metrics.netSavings)}
              </h2>
              <div className="mt-8 flex flex-wrap gap-6">
                <Metric label="Contract Cost" value={formatINR(withAMC ? metrics.monthlyAMC : 0)} />
                <Metric label="Premium Cost" value={formatINR(withInsurance ? metrics.monthlyInsurance : 0)} />
              </div>
            </div>
            
            <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/10">
               <p className="text-sm text-gray-300 leading-relaxed font-medium">
                {withAMC && withInsurance 
                  ? <span className="text-[#00A8A8] font-bold block mb-2">SYSTEM FULLY HEDGED</span>
                  : <span className="text-[#A6192E] font-bold block mb-2">EXPOSURE DETECTED</span>
                }
                {withAMC && withInsurance 
                  ? "You have successfully converted unpredictable clinical leakage into a fixed, manageable operational cost. Your EBITDA is now resilient to sudden mechanical failure."
                  : "You are currently operating with unhedged clinical risks. Machine downtime and catastrophic capital failure remain direct threats to your projected monthly yield."}
              </p>
            </div>
          </div>
        </div>

        {/* --- STRATEGIC ADD 3: FUNNEL CTA BRIDGE --- */}
        <div className="grid md:grid-cols-2 gap-4 mt-12 animate-in slide-in-from-bottom duration-500 delay-400">
          <Link href="/turnkey">
            <button className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)] flex justify-center items-center gap-2">
              Implement Full Turnkey System <ChevronRight size={16} />
            </button>
          </Link>

          <Link href="/os">
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex justify-center items-center gap-2">
              Recalculate with Protection <ChevronRight size={16} />
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function Toggle({ active, onClick, color }: ToggleProps) {
  return (
    <button 
      onClick={onClick} 
      className={`w-14 h-7 rounded-full p-1 transition-all flex items-center ${active ? color : "bg-gray-800"}`}
    >
      <motion.div 
        layout 
        className="w-5 h-5 bg-white rounded-full shadow-sm" 
        animate={{ x: active ? 28 : 0 }} 
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl flex-1">
      <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-lg font-black text-white tabular-nums tracking-tight">{value}</p>
    </div>
  );
}