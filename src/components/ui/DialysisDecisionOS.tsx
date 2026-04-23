"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  IndianRupee, TrendingUp, TrendingDown, Activity, 
  PieChart, Download, AlertTriangle, ShieldCheck, 
  Clock, Zap, Info, ChevronRight
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

  // --- 2. PAYOR MIX & RATES ---
  const [pmjay, setPmjay] = useState(50);
  const [privateMix, setPrivateMix] = useState(30);
  const [tpa, setTpa] = useState(20);

  // --- 3. THE V3 FINANCIAL ENGINE ---
  const financials = useMemo(() => {
    // Benchmarks
    const DAYS = 26;
    const IDEAL_SESSIONS_INDIA = 2.8; 
    const CONTINGENCY_BUFFER = 1.10; 
    const VOLATILITY_BUFFER = 1.05;

    // Revenue Weighting
    const totalMix = pmjay + privateMix + tpa;
    const pmjayWt = pmjay / totalMix;
    const privateWt = privateMix / totalMix;
    const tpaWt = tpa / totalMix;
    const weightedAvgRevenue = (pmjayWt * 1300) + (privateWt * 2500) + (tpaWt * 2000);

    const baseMonthlySessions = machines * sessionsPerDay * DAYS;
    const effectiveSessions = baseMonthlySessions * (1 - downtime / 100);
    const monthlyRevenue = effectiveSessions * weightedAvgRevenue;

    // Cost Logic
    const consumableBase = mode === "single" ? 700 : 496;
    const adjustedConsumableCost = consumableBase * VOLATILITY_BUFFER;
    const fixedOpex = 180000 + 100000 + (machines * 10000) + (machines * 4000) + 30000;
    const totalOpex = fixedOpex + (effectiveSessions * adjustedConsumableCost);

    // Leakage Engine
    const downtimeLoss = (baseMonthlySessions - effectiveSessions) * weightedAvgRevenue;
    const utilLoss = sessionsPerDay < IDEAL_SESSIONS_INDIA
      ? machines * (IDEAL_SESSIONS_INDIA - sessionsPerDay) * DAYS * weightedAvgRevenue
      : 0;
    const totalLeakage = downtimeLoss + utilLoss;

    // Profitability
    const netEffectiveProfit = monthlyRevenue - totalOpex;
    const capexRaw = (machines * 1000000) + 2500000;
    const totalCapex = capexRaw * CONTINGENCY_BUFFER;

    const breakEvenMonths = netEffectiveProfit > 0 
      ? (totalCapex / netEffectiveProfit).toFixed(1) 
      : null;

    return {
      totalCapex,
      netEffectiveProfit,
      breakEvenMonths,
      downtimeLoss,
      utilLoss,
      totalLeakage,
      weightedAvgRevenue,
      monthlyRevenue,
      totalOpex,
      costOfDelay: netEffectiveProfit > 0 ? netEffectiveProfit : 0,
      saasRoiJustification: totalLeakage * 0.15, // Recover 15% of identified leakage
      utilization: ((effectiveSessions / (machines * 3 * DAYS)) * 100).toFixed(1)
    };
  }, [machines, sessionsPerDay, downtime, mode, pmjay, privateMix, tpa]);

  // Policy Enforcement
  useEffect(() => {
    if (["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"].includes(stateJurisdiction)) {
      setMode("single");
    }
  }, [stateJurisdiction]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <GlassCard accent={mode === "reuse" ? "gold" : "blue"} interactive={false} className="max-w-7xl mx-auto p-6 lg:p-12 relative overflow-hidden">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 border-b border-white/5 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">
              Decision OS v3.0
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              CFO Validated
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Infrastructure Strategy Engine</h2>
          <p className="text-gray-400 mt-2 text-sm max-w-xl">
            Audit-ready projections mapping exact state compliance, weighted payor mix, and operational leakage to determine true survival yields.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Jurisdiction & Policy */}
          <section className="bg-black/40 p-6 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#D4AF37]" /> Jurisdiction Policy
            </h4>
            <select 
              value={stateJurisdiction}
              onChange={(e) => setStateJurisdiction(e.target.value)}
              className="w-full bg-[#010810] border border-white/10 rounded-xl p-3 text-sm font-bold text-white mb-4 focus:border-[#D4AF37] outline-none"
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Other">Other Region</option>
            </select>
            <div className="flex bg-[#010810] p-1 rounded-xl border border-white/5">
              <button 
                disabled={["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"].includes(stateJurisdiction)}
                onClick={() => setMode("reuse")} 
                className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${mode === "reuse" ? "bg-[#D4AF37] text-black" : "text-gray-500 opacity-50 cursor-not-allowed"}`}
              >
                Reuse Mode
              </button>
              <button 
                onClick={() => setMode("single")} 
                className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${mode === "single" ? "bg-blue-500 text-white" : "text-gray-500"}`}
              >
                Single Use
              </button>
            </div>
          </section>

          {/* Operational Sliders */}
          <section className="space-y-6 bg-black/20 p-6 rounded-2xl border border-white/5">
            <Slider label="Dialysis Machines" value={machines} setter={setMachines} min={5} max={50} color="accent-white" />
            <Slider label="Sessions / Machine / Day" value={sessionsPerDay} setter={setSessionsPerDay} min={1.0} max={4.0} step={0.1} color="accent-[#D4AF37]" />
            <Slider label="System Downtime %" value={downtime} setter={setDowntime} min={1} max={20} color="accent-red-500" />
          </section>

          {/* Payor Mix Engine */}
          <section className="p-6 bg-black/40 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <PieChart size={14} className="text-[#D4AF37]" /> Payor Realization Matrix
            </h4>
            <div className="space-y-4">
              <Slider label="PMJAY (Govt)" value={pmjay} setter={setPmjay} max={100} color="accent-blue-400" />
              <Slider label="Private (Cash)" value={privateMix} setter={setPrivateMix} max={100} color="accent-[#D4AF37]" />
              <div className="flex justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Weighted Realization</span>
                <span className="text-lg font-black text-white">₹ {formatINR(financials.weightedAvgRevenue)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: OUTPUT DASHBOARD */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <KPICard label="Total CAPEX" value={`₹ ${formatINR(financials.totalCapex)}`} sub="Incl. 10% Contingency" />
            
            {/* THE BREAK-EVEN KPI */}
            <div className={`p-5 rounded-2xl border transition-all duration-500 ${
              financials.breakEvenMonths ? "bg-[#D4AF37]/5 border-[#D4AF37]/20" : "bg-red-900/10 border-red-500/30"
            }`}>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-1 font-black">Recovery Timeline</span>
              <span className={`text-xl font-black block tracking-tight ${financials.breakEvenMonths ? "text-[#D4AF37]" : "text-white"}`}>
                {financials.breakEvenMonths ? `${financials.breakEvenMonths} Months` : "Infeasible"}
              </span>
              {!financials.breakEvenMonths ? (
                <span className="text-[9px] text-red-400 font-bold uppercase mt-1 block">OPEX {'>'} Revenue</span>
              ) : (
                <span className="text-[9px] text-gray-600 uppercase font-bold mt-1 block">Full Capital Return</span>
              )}
            </div>

            <KPICard label="Utilization" value={`${financials.utilization}%`} sub="Installed Capacity" />
          </div>

          {/* THE WATERFALL ANALYSIS */}
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-8">P&L Waterfall Analysis</h4>
            
            <div className="space-y-6">
              {/* Gross Potential */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-gray-400">Gross Monthly Revenue</span>
                  <span className="text-lg font-bold text-white tabular-nums">{formatINR(financials.monthlyRevenue)}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-full" />
                </div>
              </div>

              {/* Operational Expenses */}
              <div className="pl-4 border-l border-white/10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs text-gray-500">Fixed & Variable OPEX</span>
                  <span className="text-sm font-medium text-gray-400 tabular-nums">-{formatINR(financials.totalOpex)}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-600" style={{ width: `${Math.min((financials.totalOpex / financials.monthlyRevenue) * 100, 100)}%` }} />
                </div>
              </div>

              {/* Leakage Block */}
              <div className="pl-4 border-l-2 border-red-500/30 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-red-400/70 flex items-center gap-2 italic">
                    <TrendingDown size={12} /> Tech Downtime Leakage
                  </span>
                  <span className="text-sm font-bold text-red-400 tabular-nums">-{formatINR(financials.downtimeLoss)}</span>
                </div>
                {financials.utilLoss > 0 && (
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-orange-400/70 flex items-center gap-2 italic">
                      <Activity size={12} /> Underutilization Opportunity Cost
                    </span>
                    <span className="text-sm font-bold text-orange-400 tabular-nums">-{formatINR(financials.utilLoss)}</span>
                  </div>
                )}
              </div>

              {/* Net Result */}
              <div className="pt-6 border-t border-white/10 mt-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.2em] block mb-1">Net Effective Yield</span>
                    <span className="text-gray-500 text-[10px]">Post-Leakage Monthly Cashflow</span>
                  </div>
                  <span className={`text-4xl font-black tabular-nums tracking-tighter ${financials.netEffectiveProfit > 0 ? "text-white" : "text-red-500"}`}>
                    {financials.netEffectiveProfit > 0 ? `₹ ${formatINR(financials.netEffectiveProfit)}` : "₹ 0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CONVERSION WEAPON: COST OF DELAY */}
          <AnimatePresence>
            {financials.netEffectiveProfit > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-500/20 rounded-lg text-red-500">
                    <Clock size={18} />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">The Cost of Delay</h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Every month this deployment is postponed, your facility incurs an unrealized net loss of <span className="text-red-400 font-black">₹ {formatINR(financials.costOfDelay)}</span>. 
                  <span className="block mt-2 font-bold text-white italic">"In clinical CAPEX, inertia is the most expensive variable."</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* THE SAAS HOOK */}
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-3xl" />
            <div className="flex justify-between items-center mb-4">
              <div>
                <h5 className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Innovate IndAI Efficiency Lift</h5>
                <p className="text-2xl font-black text-emerald-400 tabular-nums">₹ {formatINR(financials.saasRoiJustification)} <span className="text-[10px] text-emerald-500/50">/mo</span></p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase block font-bold mb-1">System Fee</span>
                <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-white font-bold text-sm">₹ 15,000</div>
              </div>
            </div>
            <p className="text-[10px] text-gray-600 leading-relaxed italic text-center uppercase tracking-widest border-t border-white/5 pt-4">
              "The system pays for itself by recovering 15% of your identified operational leakage."
            </p>
          </div>

          <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Download size={16} /> Generate Investor DPR Blueprint
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function Slider({ label, value, setter, min = 0, max, step = 1, color }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
        <span className="text-xs font-black text-white bg-white/5 px-2 py-1 rounded tabular-nums">{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => setter(Number(e.target.value))} 
        className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${color}`} 
      />
    </div>
  );
}

function KPICard({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl border ${highlight ? "bg-[#D4AF37]/5 border-[#D4AF37]/20" : "bg-black/40 border-white/5"}`}>
      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1">{label}</span>
      <span className={`text-xl font-black block tracking-tight ${highlight ? "text-[#D4AF37]" : "text-white"}`}>{value}</span>
      <span className="text-[9px] text-gray-600 uppercase font-bold mt-1 block">{sub}</span>
    </div>
  );
}