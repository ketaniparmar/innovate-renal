"use client";

import React, { useState } from "react";
import { IndianRupee, RefreshCcw, Layers, TrendingUp, Activity, PieChart } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export default function DialysisCostCalculator() {
  const [sessionsPerDay, setSessionsPerDay] = useState(15); // Based on 3 shifts
  const [days, setDays] = useState(26); // Standard working month
  const [mode, setMode] = useState<"reuse" | "single">("reuse");
  const [reuseCycles, setReuseCycles] = useState(8); // Based on your clinical records
  const [revenuePerSession, setRevenuePerSession] = useState(2500);

  /* ---------- ACTUAL COST DATA FROM CLINICAL RECORDS ---------- */
  
  // Power: HD Machine (₹25) + RO Plant (₹55)
  const electricityCost = 80; 
  
  // Fixed Consumables: Needles (₹25) + Solution (₹70) + Protector (₹20)
  const clinicalConsumables = 115;
  
  // Disinfection: Citric Acid
  const disinfectionCost = 20;

  // Misc: Saline, Heparin, Syringes, IV Set, Gloves, etc.
  const sundriesMisc = 125;

  // Variable: Dialyzer & Tubing (Full market price vs Subsidized reuse)
  const dialyzerBase = 1200;
  const tubingBase = 250;
  
  const dialyzerPerSession = mode === "reuse" ? 70 : dialyzerBase;
  const tubingPerSession = mode === "reuse" ? 20 : tubingBase;

  /* ---------- CALCULATIONS ---------- */
  
  const costPerSession = 
    electricityCost + 
    clinicalConsumables + 
    disinfectionCost + 
    sundriesMisc + 
    dialyzerPerSession + 
    tubingPerSession;

  const totalSessions = sessionsPerDay * days;
  const monthlyCost = totalSessions * costPerSession;
  const monthlyRevenue = totalSessions * revenuePerSession;
  const monthlyProfit = monthlyRevenue - monthlyCost;
  const profitMargin = monthlyRevenue > 0 ? ((monthlyProfit / monthlyRevenue) * 100).toFixed(1) : "0.0";

  return (
    <GlassCard accentColor={mode === "reuse" ? "gold" : "blue"} hover={false} className="max-w-5xl mx-auto p-8 lg:p-12 relative overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Operational Modeling</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">Dialysis ROI Engine</h2>
          <p className="text-sm text-gray-400 mt-2">
            Calculate exact EBITDA based on power, clinical consumables, and reuse economics.
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
              <Activity size={14} /> Monthly Capacity Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-300 font-medium">Charge per Session</span>
                  <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <IndianRupee size={12} /> {revenuePerSession}
                  </span>
                </div>
                <input
                  type="range" min="1200" max="4000" step="50" value={revenuePerSession}
                  onChange={(e) => setRevenuePerSession(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
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
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Actual Cost Breakdown</h3>
            <div className="space-y-3">
              <Row label="Power (HD + RO)" value={electricityCost} />
              <Row label="Clinical Consumables" value={clinicalConsumables} />
              <Row label="Disinfection (Citric)" value={disinfectionCost} />
              <Row label="Medical Sundries & Misc" value={sundriesMisc} />
              <Row label={mode === "reuse" ? "Dialyzer & Tubing (8x)" : "Dialyzer & Tubing (Single)"} value={dialyzerPerSession + tubingPerSession} highlight />
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center font-bold">
              <span className="text-sm uppercase tracking-widest text-white">Total OPEX / Session</span>
              <span className="flex items-center text-xl text-[#D4AF37]">
                <IndianRupee size={16} className="opacity-70 mr-1" /> {costPerSession}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: OUTPUT DASHBOARD */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-1 ${mode === "reuse" ? "bg-[#D4AF37]" : "bg-[#3B82F6]"}`} />
            
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
              <PieChart size={14} /> Total Monthly Revenue
            </p>
            <p className="text-4xl font-black flex items-center text-white mb-8 tracking-tighter">
              <IndianRupee size={28} className="opacity-50 mr-1" />
              {(monthlyRevenue / 100000).toFixed(2)} Lakhs
            </p>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
              <Activity size={14} /> Total Monthly OPEX
            </p>
            <p className="text-3xl font-bold flex items-center text-gray-300 mb-8 tracking-tighter">
              <IndianRupee size={24} className="opacity-50 mr-1" />
              {(monthlyCost / 100000).toFixed(2)} Lakhs
            </p>

            <div className={`mt-auto p-6 rounded-2xl border ${monthlyProfit > 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${monthlyProfit > 0 ? "text-green-400" : "text-red-400"}`}>
                    Net Monthly EBITDA
                  </p>
                  <p className="text-4xl font-black flex items-center text-white tracking-tighter">
                    <IndianRupee size={28} className="opacity-50 mr-1" />
                    {(monthlyProfit / 100000).toFixed(2)} L
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Margin</p>
                  <p className={`text-2xl font-bold flex items-center gap-1 ${monthlyProfit > 0 ? "text-green-400" : "text-red-400"}`}>
                    <TrendingUp size={20} /> {profitMargin}%
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all">
            Download Detailed Cost Analysis
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

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