"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  IndianRupee, TrendingUp, TrendingDown, Activity, 
  PieChart, Download, AlertTriangle, ShieldCheck, 
  Clock, Zap, ChevronRight, BarChart3
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";

export default function DialysisDecisionOS() {
  // --- 1. INFRASTRUCTURE & OPERATION STATE ---
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [downtime, setDowntime] = useState(5);
  const [stateJurisdiction, setStateJurisdiction] = useState("Gujarat");
  const [mode, setMode] = useState<"reuse" | "single">("single");

  // --- 2. PAYOR MIX ---
  const [pmjay, setPmjay] = useState(50);
  const [privateMix, setPrivateMix] = useState(30);
  const [tpa, setTpa] = useState(20);

  // --- 3. THE V4.2 ENTERPRISE ENGINE ---
  const financials = useMemo(() => {
    // Benchmarks & Constants
    const DAYS = 26;
    const DEMAND_FACTOR = 0.85; // 85% realistic patient fill rate
    const IDEAL_SESSIONS = 2.8; 
    const CONTINGENCY = 1.10; // 10% CAPEX buffer
    const VOLATILITY = 1.05; // 5% Consumable price buffer
    const ANNUAL_GROWTH = 1.05; // 5% session volume growth
    const ANNUAL_INFLATION = 1.05; // 5% medical inflation

    // Revenue Realization
    const totalMix = pmjay + privateMix + tpa;
    const pmjayWt = pmjay / totalMix;
    const privateWt = privateMix / totalMix;
    const tpaWt = tpa / totalMix;
    const weightedAvgRevenue = (pmjayWt * 1300) + (privateWt * 2500) + (tpaWt * 2000);

    // Operational Volume
    const baseMonthlySessions = machines * sessionsPerDay * DAYS;
    // Apply Demand Factor + Technical Downtime
    const effectiveSessions = baseMonthlySessions * DEMAND_FACTOR * (1 - downtime / 100);
    const monthlyRevenue = effectiveSessions * weightedAvgRevenue;

    // Consumables Logic (INTEGRATED PROCUREMENT DATA: ₹455 KIT)
    const unitKitRate = mode === "single" ? 455 : 330; // 330 is est. reuse combo
    const monthlyConsumables = effectiveSessions * unitKitRate * VOLATILITY;
    
    // Fixed & Staff OPEX
    const staffCost = 250000 + (machines > 10 ? (machines - 10) * 15000 : 0);
    const fixedOpex = staffCost + 150000 + (machines * 10000) + (machines * 4000) + 30000;
    const totalMonthlyOpex = fixedOpex + monthlyConsumables;

    // Profit & Leakage
    const netEffectiveProfit = monthlyRevenue - totalMonthlyOpex;
    const capexRaw = (machines * 1000000) + 2500000;
    const totalCapex = capexRaw * CONTINGENCY;

    const breakEvenMonths = netEffectiveProfit > 0 
      ? (totalCapex / netEffectiveProfit).toFixed(1) 
      : null;

    // 5-YEAR STRATEGIC FORECAST
    let forecast = [];
    let curSessions = effectiveSessions * 12;
    let curRate = unitKitRate;
    for (let i = 1; i <= 5; i++) {
      forecast.push({ year: i, exp: curSessions * curRate, sessions: Math.round(curSessions) });
      curSessions *= ANNUAL_GROWTH;
      curRate *= ANNUAL_INFLATION;
    }
    const cumulative5YrOutflow = forecast.reduce((acc, curr) => acc + curr.exp, 0);

    return {
      totalCapex,
      netEffectiveProfit,
      breakEvenMonths,
      weightedAvgRevenue,
      monthlyRevenue,
      totalMonthlyOpex,
      effectiveSessions,
      forecast,
      cumulative5YrOutflow,
      downtimeLoss: (baseMonthlySessions - effectiveSessions) * weightedAvgRevenue,
      utilLoss: sessionsPerDay < IDEAL_SESSIONS ? (machines * (IDEAL_SESSIONS - sessionsPerDay) * DAYS * weightedAvgRevenue) : 0,
      utilization: ((effectiveSessions / (machines * 3 * DAYS)) * 100).toFixed(1)
    };
  }, [machines, sessionsPerDay, downtime, mode, pmjay, privateMix, tpa]);

  // Policy Compliance
  useEffect(() => {
    if (["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"].includes(stateJurisdiction)) {
      setMode("single");
    }
  }, [stateJurisdiction]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <GlassCard accent={mode === "reuse" ? "gold" : "blue"} interactive={false} className="max-w-7xl mx-auto p-6 lg:p-12 relative overflow-hidden bg-slate-950">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Infrastructure OS v4.2</span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 font-mono italic">Audit-Ready Logic</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">Dialysis Strategy Engine.</h2>
          <p className="text-gray-400 mt-4 text-sm max-w-xl leading-relaxed italic">
            Simulating clinical volatility, state policy shifts, and a 60-month expenditure lifecycle based on real-time procurement data.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* 2. CONTROLS (Left Column) */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-2xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#D4AF37]" /> Jurisdiction & Mode
            </h4>
            <select 
              value={stateJurisdiction}
              onChange={(e) => setStateJurisdiction(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm font-bold text-white mb-4 focus:border-[#D4AF37] outline-none transition-all"
            >
              <option value="Gujarat">Gujarat (Strict Single-Use)</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Other">Other Region</option>
            </select>
            <div className="flex bg-black p-1 rounded-xl border border-white/5">
              <button disabled={mode === "single" && ["Gujarat"].includes(stateJurisdiction)} onClick={() => setMode("reuse")} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${mode === "reuse" ? "bg-[#D4AF37] text-black" : "text-gray-600 opacity-40 cursor-not-allowed"}`}>Reuse Mode</button>
              <button onClick={() => setMode("single")} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${mode === "single" ? "bg-blue-500 text-white shadow-lg" : "text-gray-600"}`}>Single Use Only</button>
            </div>
          </section>

          <section className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-8">
            <Slider label="Installed Machines" value={machines} setter={setMachines} min={5} max={50} color="accent-white" />
            <Slider label="Avg sessions / machine" value={sessionsPerDay} setter={setSessionsPerDay} min={1.0} max={4.0} step={0.1} color="accent-[#D4AF37]" />
            <Slider label="Est. System Downtime" value={downtime} setter={setDowntime} min={1} max={15} color="accent-red-500" suffix="%" />
          </section>

          <section className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2"><PieChart size={14} className="text-[#D4AF37]"/> Payor realization mix</h4>
            <div className="space-y-6">
              <Slider label="PMJAY (Govt Rate)" value={pmjay} setter={setPmjay} max={100} color="accent-blue-500" />
              <Slider label="Private (Premium)" value={privateMix} setter={setPrivateMix} max={100} color="accent-[#D4AF37]" />
              <div className="pt-4 border-t border-white/5 flex justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Weighted Avg Realization</span>
                <span className="text-xl font-black text-white tabular-nums">₹ {formatINR(financials.weightedAvgRevenue)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* 3. DASHBOARD (Right Column) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <KPICard label="Total CAPEX" value={`₹ ${formatINR(financials.totalCapex)}`} sub="Incl. 10% Contingency" />
            <div className={`p-5 rounded-2xl border transition-all ${financials.breakEvenMonths ? "bg-[#D4AF37]/5 border-[#D4AF37]/30" : "bg-red-950 border-red-500/30"}`}>
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block mb-1">Recovery timeline</span>
              <span className="text-xl font-black text-white block">{financials.breakEvenMonths ? `${financials.breakEvenMonths} Months` : "Infeasible"}</span>
              <span className="text-[9px] text-gray-500 font-bold uppercase mt-1 block">{financials.breakEvenMonths ? "Full Capital Return" : "Negative Cashflow"}</span>
            </div>
            <KPICard label="Utilization" value={`${financials.utilization}%`} sub="Net of Demand Gap" />
          </div>

          {/* 4. THE 5-YEAR STRATEGIC FORECAST */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-1">5-Year Strategic Outlook</h4>
                <p className="text-[10px] text-gray-500">Projected Consumable Outflow (₹455 Kit Baseline)</p>
              </div>
              <BarChart3 className="text-white/10 group-hover:text-[#D4AF37]/20 transition-all" size={32} />
            </div>
            
            <div className="space-y-5 mb-8">
              {financials.forecast.map((y) => (
                <div key={y.year} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-[10px] font-bold text-gray-600 w-8 tabular-nums italic">YR 0{y.year}</span>
                    <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden max-w-[200px]">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(y.exp / financials.forecast[4].exp) * 100}%` }} className="h-full bg-[#D4AF37]" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-white tabular-nums tracking-tighter">₹ {formatINR(y.exp)}</span>
                    <span className="text-[9px] text-gray-500 uppercase block tracking-tighter">{y.sessions} Sessions</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between items-end">
              <div>
                <span className="text-[9px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-1 block">Cumulative 60-Mo Outflow</span>
                <span className="text-3xl font-black text-white tracking-tighter tabular-nums">₹ {(financials.cumulative5YrOutflow / 10000000).toFixed(2)} Cr</span>
              </div>
              <div className="text-right bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest mb-1 flex items-center gap-1 justify-end"><Zap size={10}/> Recoverable Leakage</p>
                <p className="text-sm font-black text-white tabular-nums">₹ {formatINR(financials.cumulative5YrOutflow * 0.08)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl">
               <div className="flex items-center gap-2 text-red-500 mb-2 font-black text-[10px] uppercase tracking-widest"><Clock size={16}/> The Cost of Delay</div>
               <p className="text-sm text-gray-300 font-bold leading-tight">Every month of postponed deployment results in a <span className="text-red-500">₹ {formatINR(financials.netEffectiveProfit)}</span> loss in net cashflow.</p>
             </div>
             <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl flex flex-col justify-center text-center">
               <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-2 italic">Standardized System Fee</span>
               <div className="text-xl font-black text-white">₹ 15,000 / mo</div>
               <p className="text-[9px] text-[#D4AF37] font-bold mt-2 uppercase tracking-widest italic opacity-70">"The system pays for itself by 12.5x"</p>
             </div>
          </div>

          <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] shadow-2xl active:scale-[0.98]">
            <Download size={16} /> Export 5-Year Financial Blueprint (PDF)
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

// --- SUB-COMPONENTS ---

function Slider({ label, value, setter, min = 0, max, step = 1, color, suffix = "" }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
        <span className="text-xs font-black text-white bg-white/10 px-2 py-0.5 rounded tabular-nums font-mono">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setter(Number(e.target.value))} className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${color}`} />
    </div>
  );
}

function KPICard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] shadow-xl">
      <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest block mb-1">{label}</span>
      <span className="text-xl font-black block tracking-tight text-white tabular-nums">{value}</span>
      <span className="text-[9px] text-gray-600 font-bold uppercase mt-1 block italic">{sub}</span>
    </div>
  );
}