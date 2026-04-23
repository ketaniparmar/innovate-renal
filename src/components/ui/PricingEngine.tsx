"use client";

import React from "react";
import { CheckCircle2, TrendingUp, ShieldAlert, PackageCheck } from "lucide-react";

// Types mapping directly from Simulator V2
interface PricingEngineProps {
  machines: number;
  sessionsPerDay: number;
  state: string;
  avgRevenue: number;
  pmjayPercent: number; // e.g., 75 for 75%
}

export function PricingEngine({
  machines,
  sessionsPerDay,
  state,
  avgRevenue,
  pmjayPercent,
}: PricingEngineProps) {
  
  const WORKING_DAYS = 26;
  const monthlySessions = machines * sessionsPerDay * WORKING_DAYS;
  const singleUseStates = ["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"];
  const isSingleUse = singleUseStates.includes(state);

  // --- 1. CORE PRICING LOGIC ---
  const getBaseFee = (m: number) => {
    if (m <= 10) return 10000;
    if (m <= 20) return 15000;
    return 25000;
  };

  const getMachineFee = (m: number) => {
    let rate = 1000;
    if (m > 20) rate = 800; // Volume scaling
    if (m <= 10) rate = 1200; // Small center premium
    return m * rate;
  };

  const getSessionFee = (sessions: number, currentState: string) => {
    let rate = 10;
    // State margin adjustment
    if (singleUseStates.includes(currentState)) rate = 7; 
    // Volume discount
    if (sessions > 10000) rate -= 2; 
    
    return sessions * rate;
  };

  const baseFee = getBaseFee(machines);
  const machineFee = getMachineFee(machines);
  const sessionFee = getSessionFee(monthlySessions, state);
  const totalFee = baseFee + machineFee + sessionFee;

  // --- 2. VALUE JUSTIFICATION ENGINE ---
  const UTILIZATION_GAIN = 0.3; // System improves efficiency by 0.3 sessions/day
  const addedSessions = machines * UTILIZATION_GAIN * WORKING_DAYS;
  const addedRevenue = addedSessions * avgRevenue;
  
  const netBenefit = addedRevenue - totalFee;
  const roiMultiple = totalFee > 0 ? (addedRevenue / totalFee).toFixed(1) : "0";

  // Formatting Helper
  const formatINR = (value: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="w-full bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-3xl p-8 shadow-2xl">
      
      {/* HEADER */}
      <div className="mb-8">
        <h3 className="text-xl font-black tracking-tight text-white">Revenue Optimization System Fee</h3>
        <p className="text-sm text-gray-400 mt-1">Adaptive pricing aligned with your operational volume and state compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT: PRICING BREAKDOWN */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Platform Base Access</span>
              <span className="font-bold text-white tabular-nums">{formatINR(baseFee)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Infrastructure Matrix ({machines} Assets)</span>
              <span className="font-bold text-white tabular-nums">{formatINR(machineFee)}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
              <span className="text-gray-400">Performance Volume ({monthlySessions} Sessions)</span>
              <span className="font-bold text-white tabular-nums">{formatINR(sessionFee)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest">Total Monthly Investment</span>
              <span className="text-2xl font-black text-[#D4AF37] tabular-nums">{formatINR(totalFee)}</span>
            </div>
          </div>

          {/* INTELLIGENCE ALERTS */}
          <div className="space-y-3 pt-4">
            {pmjayPercent > 70 && isSingleUse && (
              <div className="flex items-start gap-3 p-3 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                <ShieldAlert className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <p className="text-[10px] text-blue-300 leading-relaxed uppercase tracking-wider">
                  Adjusted pricing applied. Session fee reduced to accommodate lower margins in PMJAY-heavy, single-use environments.
                </p>
              </div>
            )}
            {sessionsPerDay < 2.0 && (
              <div className="flex items-start gap-3 p-3 bg-emerald-900/10 border border-emerald-500/20 rounded-xl">
                <TrendingUp className="text-emerald-400 shrink-0 mt-0.5" size={14} />
                <p className="text-[10px] text-emerald-300 leading-relaxed uppercase tracking-wider">
                  High improvement potential. Current underutilization indicates a projected {parseFloat(roiMultiple) + 1.5}x ROI upon system deployment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: ROI JUSTIFICATION */}
        <div className="bg-[#010810] border border-[#D4AF37]/30 rounded-2xl p-6 relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[50px] rounded-full pointer-events-none" />
          
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Value Justification</h4>
          
          <div className="space-y-5">
            <div className="flex justify-between items-end">
              <div>
                <span className="block text-sm text-white font-medium">Est. Recaptured Leakage</span>
                <span className="text-[10px] text-gray-500">+0.3 sessions/day optimization</span>
              </div>
              <span className="text-lg font-bold text-emerald-400 tabular-nums">+{formatINR(addedRevenue)}</span>
            </div>
            
            <div className="flex justify-between items-center pb-5 border-b border-white/10">
              <span className="text-sm text-gray-400">System Investment</span>
              <span className="text-lg font-bold text-red-400 tabular-nums">-{formatINR(totalFee)}</span>
            </div>

            <div className="flex justify-between items-end pt-2">
              <span className="block text-[11px] text-[#D4AF37] font-black uppercase tracking-widest">Net Financial Benefit</span>
              <span className="text-3xl font-black text-white tabular-nums">+{formatINR(netBenefit > 0 ? netBenefit : 0)}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#D4AF37] rounded-xl flex items-center justify-between">
            <span className="text-[#010810] font-black uppercase tracking-wider text-xs">System ROI</span>
            <span className="text-[#010810] font-black text-xl">{roiMultiple}×</span>
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-3 font-medium">
            Your system pays for itself {roiMultiple} times over every month.
          </p>
        </div>
      </div>

      {/* BUNDLE OFFER (THE CLOSER) */}
      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PackageCheck className="text-gray-400" size={20} />
          <div>
            <p className="text-sm font-bold text-white">Enterprise Consumables Bundle</p>
            <p className="text-xs text-gray-500">Source your dialyzers and tubing through Innovate IndAI.</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white uppercase tracking-wider transition-colors">
          Unlock 30% OS Discount
        </button>
      </div>

    </div>
  );
}