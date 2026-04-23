"use client";

import React, { useState, useEffect } from "react";
import { IndianRupee, Layers, TrendingUp, TrendingDown, Activity, PieChart, Download, AlertTriangle, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function DialysisCostCalculator() {
  // --- 1. INFRASTRUCTURE & OPERATION STATE ---
  const [machines, setMachines] = useState(10);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [downtime, setDowntime] = useState(5);
  const days = 26; // Fixed clinical standard

  // --- 2. POLICY & MODE STATE ---
  const [stateJurisdiction, setStateJurisdiction] = useState("Gujarat");
  const [mode, setMode] = useState<"reuse" | "single">("single");

  const strictStates = ["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"];
  const isStrictState = strictStates.includes(stateJurisdiction);

  // Auto-lock mode based on state compliance
  useEffect(() => {
    if (isStrictState) {
      setMode("single");
    }
  }, [stateJurisdiction, isStrictState]);

  // --- 3. PAYOR MIX STATE (Relative Weighting) ---
  const [pmjay, setPmjay] = useState(50);
  const [privateMix, setPrivateMix] = useState(30);
  const [tpa, setTpa] = useState(20);

  // --- 4. THE FINANCIAL ENGINE ---
  
  // A. Revenue Logic
  const totalMix = pmjay + privateMix + tpa;
  const pmjayWt = pmjay / totalMix;
  const privateWt = privateMix / totalMix;
  const tpaWt = tpa / totalMix;

  const weightedAvgRevenue = (pmjayWt * 1300) + (privateWt * 2500) + (tpaWt * 2000);
  const monthlySessions = machines * sessionsPerDay * days;
  const maxCapacitySessions = machines * 3 * days; 
  const utilization = ((monthlySessions / maxCapacitySessions) * 100).toFixed(1);
  
  const grossMonthlyRevenue = monthlySessions * weightedAvgRevenue;

  // B. Consumable COGS Logic (Grounded in real procurement)
  // Base: Kit(455) + Meds(115) + RO(100) + Misc(30) = 700
  // Reuse: (700 - 330) + 66 (Dialyzer/5) + 60 (Reprocessing) = 496
  const consumableCostPerSession = mode === "single" ? 700 : 496;
  const totalMonthlyConsumables = monthlySessions * consumableCostPerSession;

  // C. Fixed OPEX Logic
  const staffCost = 250000 + (machines > 10 ? (machines - 10) * 15000 : 0);
  const rentCost = 150000;
  const powerCost = machines * 10000;
  const machineMaint = machines * 4000;
  const roMaint = 30000;
  
  const fixedMonthlyOpex = staffCost + rentCost + powerCost + machineMaint + roMaint;
  const totalOpex = fixedMonthlyOpex + totalMonthlyConsumables;

  // D. The Leakage Engine (The Moat)
  const downtimeLoss = grossMonthlyRevenue * (downtime / 100);
  const utilLoss = sessionsPerDay < 3 ? (machines * (3 - sessionsPerDay) * days * weightedAvgRevenue) : 0;
  const totalLeakage = downtimeLoss + utilLoss;

  // E. Profitability & CAPEX
  const grossProfit = grossMonthlyRevenue - totalOpex;
  const netEffectiveProfit = grossProfit - totalLeakage;
  
  const totalCapex = (machines * 800000) + 2500000 + (machines * 200000); // Machines + RO + Interiors
  const breakEvenMonths = netEffectiveProfit > 0 ? (totalCapex / netEffectiveProfit).toFixed(1) : "0.0";

  // Formatting Helper
  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <GlassCard accent={mode === "reuse" ? "gold" : "blue"} interactive={false} className="max-w-7xl mx-auto p-6 lg:p-10 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-white/5 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Innovate IndAI Intelligence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white">Financial Decision Engine</h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl">
            Audit-ready projections mapping exact state compliance, weighted payor mix, and operational leakage to determine true net effective profit.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* LEFT: CONTROLS & INTELLIGENCE */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Policy & Mode Matrix */}
          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5 shadow-inner">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#D4AF37]" /> Operating Jurisdiction
              </h3>
            </div>
            
            <select 
              value={stateJurisdiction}
              onChange={(e) => setStateJurisdiction(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-[#D4AF37] mb-4"
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Other">Other Region</option>
            </select>

            {isStrictState ? (
              <div className="flex items-start gap-3 p-3 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                <Layers className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <p className="text-[10px] text-blue-300 uppercase tracking-wider">
                  Mandated Single-Use State. Reuse mode locked to ensure regulatory compliance and eliminate infection liability.
                </p>
              </div>
            ) : (
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
                <button onClick={() => setMode("reuse")} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mode === "reuse" ? "bg-[#D4AF37] text-black" : "text-gray-500"}`}>Reuse Mode</button>
                <button onClick={() => setMode("single")} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mode === "single" ? "bg-blue-500 text-white" : "text-gray-500"}`}>Single Use</button>
              </div>
            )}
          </div>

          {/* Payor Mix Engine */}
          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5 shadow-inner">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <PieChart size={14} className="text-[#D4AF37]"/> Payor Mix Weighting
            </h3>
            <div className="space-y-5">
              <SliderRow label="PMJAY Scheme" value={pmjay} setter={setPmjay} max={100} color="accent-blue-500" suffix="%" />
              <SliderRow label="Private Cash" value={privateMix} setter={setPrivateMix} max={100} color="accent-[#D4AF37]" suffix="%" />
              <SliderRow label="TPA / Corporate" value={tpa} setter={setTpa} max={100} color="accent-emerald-500" suffix="%" />
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-widest">Weighted Avg Realization</span>
              <span className="text-lg font-black text-white tabular-nums">₹ {formatINR(weightedAvgRevenue)}</span>
            </div>
          </div>

          {/* Infrastructure Sliders */}
          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5 shadow-inner space-y-6">
            <SliderRow label="Installed Machines" value={machines} setter={setMachines} min={5} max={40} step={1} color="accent-white" />
            <SliderRow label="Sessions / Day" value={sessionsPerDay} setter={setSessionsPerDay} min={1.0} max={4.0} step={0.1} color="accent-[#D4AF37]" />
            <SliderRow label="System Downtime" value={downtime} setter={setDowntime} min={0} max={15} step={1} color="accent-red-500" suffix="%" />
          </div>
        </div>

        {/* RIGHT: OUTPUT DASHBOARD & LEAKAGE ENGINE */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Top KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPI label="Capacity Util" value={`${utilization}%`} />
            <KPI label="Total CAPEX" value={`${(totalCapex / 100000).toFixed(2)} L`} />
            <KPI label="Mo. Sessions" value={monthlySessions} />
            <KPI label="Break-Even" value={Number(breakEvenMonths) > 0 ? `${breakEvenMonths} mo` : "Loss"} highlight />
          </div>

          {/* The Financial Waterfall */}
          <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl p-8 flex-1 flex flex-col relative">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">P&L Waterfall & Leakage Analysis</h3>
            
            <div className="space-y-6 flex-1">
              {/* Gross Revenue */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Gross Potential Revenue</span>
                  <span className="font-bold text-white tabular-nums">₹ {formatINR(grossMonthlyRevenue)}</span>
                </div>
              </div>

              {/* OPEX */}
              <div className="pl-4 border-l border-white/10">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Total Operational Expense (COGS + Fixed)</span>
                  <span className="font-bold text-gray-400 tabular-nums">- ₹ {formatINR(totalOpex)}</span>
                </div>
              </div>

              {/* Gross Margin */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#D4AF37] font-bold">Gross Operating Profit</span>
                  <span className="font-bold text-[#D4AF37] tabular-nums">₹ {formatINR(grossProfit)}</span>
                </div>
              </div>

              {/* Leakage Engine */}
              <div className="pl-4 border-l-2 border-red-500/50 space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-400/80 flex items-center gap-2"><TrendingDown size={14}/> Downtime Cannibalization</span>
                  <span className="font-bold text-red-400 tabular-nums">- ₹ {formatINR(downtimeLoss)}</span>
                </div>
                {utilLoss > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-orange-400/80 flex items-center gap-2"><AlertTriangle size={14}/> Underutilization Cost (Opportunity)</span>
                    <span className="font-bold text-orange-400 tabular-nums">- ₹ {formatINR(utilLoss)}</span>
                  </div>
                )}
              </div>

              {/* Net Effective Profit */}
              <div className="pt-6 mt-auto border-t border-white/10">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-1">Net Effective Profit</p>
                    <p className="text-xs text-gray-500">Actual yield after operational leakage</p>
                  </div>
                  <p className="text-4xl md:text-5xl font-black text-white tracking-tighter tabular-nums">
                    <span className="text-2xl text-gray-500 mr-1">₹</span>
                    {netEffectiveProfit > 0 ? formatINR(netEffectiveProfit) : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* INTELLIGENCE PANEL */}
          <div className="space-y-3">
            {pmjayWt > 0.65 && isStrictState && (
              <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex gap-3 items-start">
                <ShieldCheck className="text-red-400 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-red-300 font-medium leading-relaxed">
                  <strong className="text-red-400 uppercase tracking-wider text-[10px] block mb-1">Margin Pressure Alert</strong>
                  High PMJAY dependency in a mandated single-use environment creates severe margin compression. High capacity utilization is strictly required to maintain solvency.
                </p>
              </div>
            )}
            {downtime > 6 && (
              <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-xl flex gap-3 items-start">
                <Activity className="text-orange-400 shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-orange-300 font-medium leading-relaxed">
                  <strong className="text-orange-400 uppercase tracking-wider text-[10px] block mb-1">AMC Upgrade Required</strong>
                  System downtime is actively cannibalizing net yields. Premium RO and machine maintenance contracts will yield a positive ROI against current leakage rates.
                </p>
              </div>
            )}
          </div>
          
          <button className="mt-2 w-full bg-[#D4AF37] text-[#010810] hover:bg-yellow-500 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Download size={16} /> Export Audit-Ready DPR
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function SliderRow({ label, value, setter, min = 0, max, step = 1, color, suffix = "" }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-300 font-medium">{label}</span>
        <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded text-xs tabular-nums">
          {value}{suffix}
        </span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => setter(Number(e.target.value))} 
        className={`w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer ${color}`} 
      />
    </div>
  );
}

function KPI({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className={`border rounded-xl p-4 text-center shadow-inner ${highlight ? "bg-[#D4AF37]/5 border-[#D4AF37]/30" : "bg-black/40 border-white/10"}`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${highlight ? "text-[#D4AF37]" : "text-gray-500"}`}>{label}</p>
      <p className="text-xl font-black text-white tabular-nums">{value}</p>
    </div>
  );
}