"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IndianRupee, 
  AlertOctagon, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Building2,
  Settings
} from "lucide-react";

// --- STRICT REGULATORY & FINANCIAL TYPES ---
type CityTier = "Tier 1" | "Tier 2" | "Tier 3";
type StateRegion = "Maharashtra" | "Gujarat" | "Karnataka" | "Tamil Nadu" | "Delhi NCR" | "Other";
type PayerType = "PM-JAY" | "Insurance" | "Private";
type PolicyType = "Reuse (6x)" | "Single-Use";
type SourcingType = "Open Market" | "Optimized Contract";

const RESTRICTED_STATES: StateRegion[] = ["Gujarat", "Karnataka", "Tamil Nadu", "Delhi NCR"];

export default function OpexEnginePage() {
  // --- CONTROL STATE ---
  const [machines, setMachines] = useState(10);
  const [occupancy, setOccupancy] = useState(80);
  const [tier, setTier] = useState<CityTier>("Tier 2");
  const [stateRegion, setStateRegion] = useState<StateRegion>("Maharashtra");
  const [payer, setPayer] = useState<PayerType>("PM-JAY");
  const [policy, setPolicy] = useState<PolicyType>("Reuse (6x)");
  const [sourcing, setSourcing] = useState<SourcingType>("Open Market");

  // --- REGULATORY COMPLIANCE ENGINE ---
  const isRegulatoryLockActive = RESTRICTED_STATES.includes(stateRegion) && payer === "PM-JAY";

  // Force policy to Single-Use if they trigger the regulatory lock
  useEffect(() => {
    if (isRegulatoryLockActive) {
      setPolicy("Single-Use");
    }
  }, [stateRegion, payer, isRegulatoryLockActive]);

  // --- CORE FINANCIAL ENGINE ---
  const financials = useMemo(() => {
    // 1. Volume Capacity
    const maxSessions = machines * 3 * 26; // 3 shifts, 26 days
    const actualSessions = Math.floor(maxSessions * (occupancy / 100));

    // 2. Fixed Monthly Costs
    const staffCost = (machines / 10) * 250000; // Base 2.5L per 10 machines
    const rentCost = tier === "Tier 1" ? 200000 : tier === "Tier 2" ? 100000 : 60000;
    const amcCost = machines * 10000;
    const miscCost = 100000;
    const totalFixedMonthly = staffCost + rentCost + amcCost + miscCost;
    const fixedCostPerSession = totalFixedMonthly / actualSessions;

    // 3. Variable Costs (Per Session)
    const utilitiesTech = 150;
    let consumablesBase = policy === "Single-Use" ? 1300 : 900;
    
    // The "Innovate India" Sourcing Advantage
    if (sourcing === "Optimized Contract") {
      consumablesBase -= 300; 
    }
    
    const variableCostPerSession = consumablesBase + utilitiesTech;

    // 4. Revenue & Margins
    const revenueMap = { "PM-JAY": 1500, "Insurance": 2100, "Private": 2800 };
    const revenuePerSession = revenueMap[payer];

    const totalCostPerSession = fixedCostPerSession + variableCostPerSession;
    const grossMarginPerSession = revenuePerSession - totalCostPerSession;
    const monthlyProfitLoss = grossMarginPerSession * actualSessions;

    return {
      actualSessions,
      totalFixedMonthly,
      fixedCostPerSession,
      variableCostPerSession,
      totalCostPerSession,
      revenuePerSession,
      grossMarginPerSession,
      monthlyProfitLoss,
      marginPercentage: (grossMarginPerSession / revenuePerSession) * 100
    };
  }, [machines, occupancy, tier, policy, sourcing, payer]);

  // Utility for formatting currency
  const formatINR = (num: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-24 pb-24 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            Clinical OPEX <span className="text-[#00A8A8]">Engine.</span>
          </h1>
          <p className="text-gray-400 font-medium">Dynamically calculate your per-treatment cost stack and EBITDA margins.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* ========================================== */}
          {/* LEFT: CONTROL PANEL (INPUTS)               */}
          {/* ========================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121A2F] border border-white/5 rounded-3xl p-6 shadow-xl">
              
              <h3 className="text-xs font-black uppercase tracking-widest text-[#00A8A8] mb-6 flex items-center gap-2">
                <Activity size={16}/> Capacity & Volume
              </h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-gray-400">Active Machines</label>
                    <span className="text-sm font-black text-white">{machines}</span>
                  </div>
                  <input type="range" min="5" max="50" step="1" value={machines} onChange={(e) => setMachines(Number(e.target.value))} className="w-full accent-[#00A8A8] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-gray-400">Occupancy Rate (%)</label>
                    <span className="text-sm font-black text-white">{occupancy}%</span>
                  </div>
                  <input type="range" min="40" max="100" step="5" value={occupancy} onChange={(e) => setOccupancy(Number(e.target.value))} className="w-full accent-[#00A8A8] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>

              <h3 className="text-xs font-black uppercase tracking-widest text-[#00A8A8] mb-6 flex items-center gap-2 border-t border-white/5 pt-6">
                <Building2 size={16}/> Market & Compliance
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">State</label>
                  <select value={stateRegion} onChange={(e) => setStateRegion(e.target.value as StateRegion)} className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg p-2.5 text-xs font-bold text-white outline-none">
                    {["Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "Delhi NCR", "Other"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">City Tier</label>
                  <select value={tier} onChange={(e) => setTier(e.target.value as CityTier)} className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg p-2.5 text-xs font-bold text-white outline-none">
                    {["Tier 1", "Tier 2", "Tier 3"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Primary Revenue Source</label>
                  <select value={payer} onChange={(e) => setPayer(e.target.value as PayerType)} className="w-full bg-[#0A0F1C] border border-white/10 rounded-lg p-2.5 text-xs font-bold text-white outline-none">
                    {["PM-JAY", "Insurance", "Private"].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Dialyzer Policy</label>
                  <select 
                    value={policy} 
                    onChange={(e) => setPolicy(e.target.value as PolicyType)} 
                    disabled={isRegulatoryLockActive}
                    className={`w-full border rounded-lg p-2.5 text-xs font-bold outline-none transition-colors ${isRegulatoryLockActive ? 'bg-red-950/20 border-red-900/50 text-red-400 cursor-not-allowed' : 'bg-[#0A0F1C] border-white/10 text-white'}`}
                  >
                    <option value="Reuse (6x)">Reuse (6x)</option>
                    <option value="Single-Use">Single-Use (Discard)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#C6A85A] uppercase block mb-1">Supply Chain Sourcing</label>
                  <select value={sourcing} onChange={(e) => setSourcing(e.target.value as SourcingType)} className="w-full bg-[#1A160C] border border-[#C6A85A]/30 rounded-lg p-2.5 text-xs font-bold text-[#C6A85A] outline-none">
                    <option value="Open Market">Open Market (Standard Rates)</option>
                    <option value="Optimized Contract">Innovate India Contract (Wholesale)</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT: DASHBOARD (OUTPUTS)                 */}
          {/* ========================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regulatory Warning Banner */}
            <AnimatePresence>
              {isRegulatoryLockActive && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                  className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4 flex items-start gap-4"
                >
                  <AlertOctagon className="text-red-500 shrink-0 mt-0.5" size={24}/>
                  <div>
                    <h4 className="text-red-400 font-black text-sm uppercase tracking-wide mb-1">Regulatory Lock Active</h4>
                    <p className="text-red-300/80 text-xs font-medium leading-relaxed">
                      PM-JAY guidelines strictly mandate Single-Use dialyzers in <strong>{stateRegion}</strong>. 
                      The financial engine has locked your policy to prevent illegal auditing projections.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary KPI Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121A2F] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Cost Per Session (TCPS)</p>
                <h3 className="text-3xl font-black text-white">{formatINR(financials.totalCostPerSession)}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Variable (Consumables)</span>
                    <span className="text-white font-bold">{formatINR(financials.variableCostPerSession)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Fixed (Diluted)</span>
                    <span className="text-white font-bold">{formatINR(financials.fixedCostPerSession)}</span>
                  </div>
                </div>
              </div>

              <div className={`border rounded-3xl p-6 relative overflow-hidden transition-colors ${financials.grossMarginPerSession >= 0 ? 'bg-[#00A8A8]/10 border-[#00A8A8]/30' : 'bg-red-950/20 border-red-900/50'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${financials.grossMarginPerSession >= 0 ? 'text-[#00A8A8]' : 'text-red-500'}`}>Gross Margin Per Session</p>
                <h3 className={`text-3xl font-black flex items-center gap-2 ${financials.grossMarginPerSession >= 0 ? 'text-white' : 'text-red-400'}`}>
                  {formatINR(financials.grossMarginPerSession)}
                  {financials.grossMarginPerSession >= 0 ? <TrendingUp size={24} className="text-[#00A8A8]"/> : <TrendingDown size={24} className="text-red-500"/>}
                </h3>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Yield / Session</span>
                    <span className="text-white font-bold">{formatINR(financials.revenuePerSession)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Profit/Loss Massive Indicator */}
            <div className="bg-[#121A2F] border border-white/5 rounded-3xl p-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Projected Monthly EBITDA</p>
                <h2 className={`text-5xl font-black tracking-tighter ${financials.monthlyProfitLoss >= 0 ? 'text-white' : 'text-red-500'}`}>
                  {formatINR(financials.monthlyProfitLoss)}
                </h2>
                <p className="text-xs text-gray-400 mt-2 font-medium">Based on {financials.actualSessions} sessions/month</p>
              </div>
              
              {/* Visual Margin Bar */}
              <div className="hidden md:flex flex-col items-end gap-2 w-1/3">
                <span className="text-xs font-bold text-gray-400 uppercase">Margin Spread</span>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-red-500/80 h-full" 
                    style={{ width: `${Math.min((financials.totalCostPerSession / financials.revenuePerSession) * 100, 100)}%` }}
                  />
                  {financials.grossMarginPerSession > 0 && (
                    <div 
                      className="bg-[#00A8A8] h-full" 
                      style={{ width: `${Math.max(financials.marginPercentage, 0)}%` }}
                    />
                  )}
                </div>
                <div className="w-full flex justify-between text-[9px] text-gray-500 font-bold uppercase mt-1">
                  <span>Cost</span>
                  <span>Profit</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}