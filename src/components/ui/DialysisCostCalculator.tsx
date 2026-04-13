"use client";

import React, { useState } from "react";
import { IndianRupee, RefreshCcw, Layers, TrendingUp, Activity, PieChart, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function DialysisCostCalculator() {
  const [machines, setMachines] = useState(5);
  const [sessionsPerDay, setSessionsPerDay] = useState(12); // Realistic start for 5 machines
  const [days, setDays] = useState(26);
  const [mode, setMode] = useState<"reuse" | "single">("reuse");
  const [reuseCycles, setReuseCycles] = useState(8);
  const [revenuePerSession, setRevenuePerSession] = useState(2500);

  /* ---------- ACTUAL COST DATA FROM CLINICAL RECORDS ---------- */
  
  // Variable OPEX per Session
  const electricityCost = 80; 
  const clinicalConsumables = 115;
  const disinfectionCost = 20;
  const sundriesMisc = 125;
  
  const dialyzerBase = 1200;
  const tubingBase = 250;
  const dialyzerPerSession = mode === "reuse" ? 70 : dialyzerBase;
  const tubingPerSession = mode === "reuse" ? 20 : tubingBase;

  const costPerSession = electricityCost + clinicalConsumables + disinfectionCost + sundriesMisc + dialyzerPerSession + tubingPerSession;

  /* ---------- FIXED MONTHLY COSTS ---------- */
  const staffCost = 180000;   // Nurses + technicians
  const rentCost = 80000;
  const maintenanceCost = 40000;
  const adminCost = 30000;
  
  const fixedMonthlyCost = staffCost + rentCost + maintenanceCost + adminCost;

  /* ---------- UTILIZATION & VOLUME ---------- */
  const totalSessions = sessionsPerDay * days;
  const maxCapacity = machines * 3 * days; // 3 shifts max
  const utilization = ((totalSessions / maxCapacity) * 100).toFixed(1);

  /* ---------- FINANCIALS (EBITDA) ---------- */
  const monthlyRevenue = totalSessions * revenuePerSession;
  const monthlyVariableCost = totalSessions * costPerSession;
  
  const monthlyEBITDA = monthlyRevenue - (monthlyVariableCost + fixedMonthlyCost);
  const profitMargin = monthlyRevenue > 0 ? ((monthlyEBITDA / monthlyRevenue) * 100).toFixed(1) : "0.0";

  /* ---------- CAPEX & BREAK-EVEN ---------- */
  const machineCapex = machines * 650000;
  const roPlant = machines > 10 ? 450000 : 250000;
  const infra = 500000;
  
  const totalCapex = machineCapex + roPlant + infra;
  const breakEvenMonths = monthlyEBITDA > 0 ? (totalCapex / monthlyEBITDA).toFixed(1) : "∞";

  return (
    <GlassCard accentColor={mode === "reuse" ? "gold" : "blue"} hover={false} className="max-w-6xl mx-auto p-8 lg:p-12 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Investor Level DPR</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">Dialysis Financial Engine</h2>
          <p className="text-sm text-gray-400 mt-2">
            Complete business feasibility including CAPEX, fixed overheads, and break-even timelines.
          </p>
        </div>

        {/* MODE TOGGLE */}
        <div className="flex bg-[#010810] p-1.5 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setMode("reuse")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              mode === "reuse"
                ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <RefreshCcw size={14} /> Reuse (8x)
          </button>
          <button
            onClick={() => setMode("single")}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
              mode === "single"
                ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Layers size={14} /> Single Use
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* LEFT: CONTROLS */}
        <div className="space-y-6">
          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <Activity size={14} /> Core Capacity Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-300 font-medium">Installed Machines</span>
                  <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">{machines} Units</span>
                </div>
                <input type="range" min="3" max="30" step="1" value={machines} onChange={(e) => setMachines(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-300 font-medium">Charge per Session (Revenue)</span>
                  <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <IndianRupee size={12} /> {revenuePerSession}
                  </span>
                </div>
                <input type="range" min="1200" max="4000" step="50" value={revenuePerSession} onChange={(e) => setRevenuePerSession(Number(e.target.value))} className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Sessions / Day</label>
                  <input type="number" value={sessionsPerDay} onChange={(e) => setSessionsPerDay(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Days / Month</label>
                  <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5 shadow-inner">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Per Session Base OPEX</h3>
            <div className="space-y-3">
              <Row label="Power (HD + RO)" value={electricityCost} />
              <Row label="Clinical Consumables" value={clinicalConsumables} />
              <Row label="Disinfection & Sundries" value={disinfectionCost + sundriesMisc} />
              <Row label={mode === "reuse" ? "Dialyzer & Tubing (8x)" : "Dialyzer & Tubing (Single)"} value={dialyzerPerSession + tubingPerSession} highlight />
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center font-bold">
              <span className="text-sm uppercase tracking-widest text-white">Total Variable OPEX</span>
              <span className="flex items-center text-xl text-[#D4AF37]">
                <IndianRupee size={16} className="opacity-70 mr-1" /> {costPerSession}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: OUTPUT DASHBOARD */}
        <div className="flex flex-col h-full">
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 flex-1 flex flex-col relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-1 ${mode === "reuse" ? "bg-[#D4AF37]" : "bg-[#3B82F6]"}`} />
            
            {/* KPI ROW */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <KPI label="Utilization" value={`${utilization}%`} />
              <KPI label="Break-even" value={`${breakEvenMonths} mo`} />
              <KPI label="Monthly Tx" value={totalSessions} />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
              <PieChart size={14} /> Total Monthly Revenue
            </p>
            <p className="text-4xl font-black flex items-center text-white mb-6 tracking-tighter">
              <IndianRupee size={28} className="opacity-50 mr-1" />
              {(monthlyRevenue / 100000).toFixed(2)} Lakhs
            </p>

            <div className={`p-6 rounded-2xl border ${monthlyEBITDA > 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${monthlyEBITDA > 0 ? "text-green-400" : "text-red-400"}`}>
                    Net Monthly EBITDA
                  </p>
                  <p className="text-4xl font-black flex items-center text-white tracking-tighter">
                    <IndianRupee size={28} className="opacity-50 mr-1" />
                    {(monthlyEBITDA / 100000).toFixed(2)} L
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Margin</p>
                  <p className={`text-2xl font-bold flex items-center gap-1 ${monthlyEBITDA > 0 ? "text-green-400" : "text-red-400"}`}>
                    <TrendingUp size={20} /> {profitMargin}%
                  </p>
                </div>
              </div>
            </div>

            {/* CAPEX DISPLAY */}
            <div className="mt-auto pt-6">
              <div className="p-5 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Project CAPEX</p>
                  <p className="text-xs text-gray-500 mt-0.5">Machines, RO & Infrastructure</p>
                </div>
                <p className="text-2xl font-bold flex items-center text-white">
                  <IndianRupee size={20} className="mr-1 opacity-70" /> {(totalCapex / 100000).toFixed(2)} L
                </p>
              </div>
            </div>

          </div>
          
          <button className="mt-6 w-full bg-white text-black hover:bg-gray-200 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            <Download size={16} /> Generate Investor PDF Report
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function Row({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center text-sm ${highlight ? "text-white font-bold" : "text-gray-400"}`}>
      <span>{label}</span>
      <span className="flex items-center">
        <IndianRupee size={12} className="opacity-50 mr-1" /> {value}
      </span>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-center shadow-inner">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}