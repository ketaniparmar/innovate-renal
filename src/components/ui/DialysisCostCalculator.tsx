"use client";

import React, { useState, useEffect } from "react";
import { 
  IndianRupee, RefreshCcw, Layers, TrendingUp, 
  Activity, PieChart, Download, AlertCircle, 
  CheckCircle2, Building2, Landmark 
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { LeadCaptureModal } from "./LeadCaptureModal"; // Ensure path is correct

export default function DialysisCostCalculator() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Core Inputs
  const [machines, setMachines] = useState(10);
  const [sessionsPerDay, setSessionsPerDay] = useState(24); 
  const [revenuePerSession, setRevenuePerSession] = useState(2200);
  const [mode, setMode] = useState<"reuse" | "single">("reuse");
  const [scenario, setScenario] = useState<"private" | "govt">("private");

  // Constants & Fixed Costs
  const days = 26;
  const staffCost = 180000;
  const rentCost = scenario === "govt" ? 20000 : 80000; // Subsidized rent for Govt models
  const miscFixed = 70000;
  const fixedMonthlyCost = staffCost + rentCost + miscFixed;

  // OPEX Logic
  const varCostBase = 340; // Power + Clinical Consumables + Disinfection + Sundries
  const dialyzerCost = mode === "reuse" ? 70 : 1200;
  const tubingCost = mode === "reuse" ? 20 : 250;
  const costPerSession = varCostBase + dialyzerCost + tubingCost;

  // Monthly Calculations
  const totalSessions = sessionsPerDay * days;
  const monthlyRevenue = totalSessions * (scenario === "govt" ? 1100 : revenuePerSession);
  const monthlyVariableCost = totalSessions * costPerSession;
  const monthlyEBITDA = monthlyRevenue - (monthlyVariableCost + fixedMonthlyCost);
  const profitMargin = monthlyRevenue > 0 ? ((monthlyEBITDA / monthlyRevenue) * 100).toFixed(1) : "0.0";

  // CAPEX & Investor Intelligence
  const machineCapex = machines * 650000;
  const roPlant = machines > 10 ? 450000 : 250000;
  const infra = scenario === "govt" ? 200000 : 500000;
  const totalCapex = machineCapex + roPlant + infra;

  const breakEvenMonths = monthlyEBITDA > 0 ? (totalCapex / monthlyEBITDA).toFixed(1) : "∞";
  const annualProfit = monthlyEBITDA * 12;
  const roiPercentage = totalCapex > 0 ? ((annualProfit / totalCapex) * 100).toFixed(1) : "0";
  const fiveYearProfit = (monthlyEBITDA * 60) - totalCapex;
  
  // Viability Logic
  const isViable = Number(breakEvenMonths) < 16 && monthlyEBITDA > 0;

  return (
    <div className="w-full">
      <GlassCard accent={mode === "reuse" ? "gold" : "blue"} interactive={false} className="max-w-6xl mx-auto p-8 lg:p-12 border-white/5">
        
        {/* TOP: SCENARIO & REUSE TOGGLES */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div className="flex bg-[#010810] p-1.5 rounded-2xl border border-white/5">
            <button onClick={() => setScenario("private")} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scenario === "private" ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}>
              <Building2 size={14} /> Private Center
            </button>
            <button onClick={() => setScenario("govt")} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scenario === "govt" ? "bg-[#D4AF37] text-black shadow-lg" : "text-gray-500 hover:text-white"}`}>
              <Landmark size={14} /> Govt (PMBJP/PPP)
            </button>
          </div>

          <div className="flex bg-[#010810] p-1.5 rounded-2xl border border-white/5">
            <button onClick={() => setMode("reuse")} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "reuse" ? "bg-[#D4AF37] text-black shadow-lg" : "text-gray-500 hover:text-white"}`}>
              <RefreshCcw size={14} /> Reuse Logic (8x)
            </button>
            <button onClick={() => setMode("single")} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "single" ? "bg-blue-500 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}>
              <Layers size={14} /> Single Use
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* LEFT: FINANCIAL PARAMETERS */}
          <div className="space-y-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8">Infrastructure Matrix</p>
              <div className="space-y-8">
                <Slider label="Installed Capacity (Machines)" min={3} max={30} value={machines} onChange={setMachines} unit="Units" />
                <Slider label="Operational Volume (Sessions/Day)" min={5} max={100} value={sessionsPerDay} onChange={setSessionsPerDay} unit="Tx" />
                {scenario === "private" && (
                  <Slider label="Target Revenue per Session" min={1200} max={4000} value={revenuePerSession} onChange={setRevenuePerSession} unit="₹" />
                )}
              </div>
            </div>

            <div className="p-6 bg-[#010810] rounded-2xl border border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-4">OPEX Breakdown</p>
              <div className="space-y-3">
                <Row label="Staff & Overheads (Monthly)" value={fixedMonthlyCost} isCurrency />
                <Row label="Clinical Cost (Per Session)" value={costPerSession} isCurrency />
                <Row label="Total Project CAPEX" value={totalCapex} isCurrency highlight />
              </div>
            </div>
          </div>

          {/* RIGHT: INVESTOR INTELLIGENCE DASHBOARD */}
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center ${isViable ? "bg-green-500/5 border-green-500/20" : "bg-red-500/5 border-red-500/20"}`}>
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">Viability</p>
                <div className={`flex items-center gap-1 font-black text-sm ${isViable ? "text-green-400" : "text-red-400"}`}>
                  {isViable ? <CheckCircle2 size={14}/> : <AlertCircle size={14}/>} {isViable ? "VIABLE" : "MARGINAL"}
                </div>
              </div>
              <KPI label="Annual ROI" value={`${roiPercentage}%`} color="gold" />
              <KPI label="Break-even" value={`${breakEvenMonths} Mo`} color="white" />
            </div>

            <div className="bg-[#010810] border border-white/5 rounded-3xl p-10 mb-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">5-Year Projected Net Profit</p>
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white flex items-baseline gap-2">
                 <span className="text-2xl text-gray-600">₹</span>
                 {(fiveYearProfit / 10000000).toFixed(2)}
                 <span className="text-2xl text-gray-600">Cr</span>
               </h2>
               <div className="mt-8 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <TrendingUp size={14} className="text-green-400"/> {profitMargin}% Margin
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                    <Activity size={14} className="text-blue-400"/> {totalSessions} Sessions/Mo
                  </span>
               </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <Download size={16} /> Unlock Official DPR & Detailed Audit
            </button>
          </div>
        </div>
      </GlassCard>

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        contextData={{ machines, breakeven: breakEvenMonths, profit: (fiveYearProfit / 10000000).toFixed(2) }} 
      />
    </div>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function Slider({ label, min, max, value, onChange, unit }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</label>
        <span className="text-xl font-black text-white">{value} <span className="text-[10px] text-gray-600">{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
    </div>
  );
}

function Row({ label, value, isCurrency, highlight }: any) {
  return (
    <div className={`flex justify-between text-[11px] font-bold uppercase tracking-widest ${highlight ? "text-white mt-2 pt-2 border-t border-white/5" : "text-gray-500"}`}>
      <span>{label}</span>
      <span className={highlight ? "text-[#D4AF37]" : "text-gray-300"}>
        {isCurrency ? "₹ " : ""}{value.toLocaleString()}
      </span>
    </div>
  );
}

function KPI({ label, value, color }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-black ${color === 'gold' ? 'text-[#D4AF37]' : 'text-white'}`}>{value}</p>
    </div>
  );
}