"use client";

import React, { useState } from "react";
import { IndianRupee, RefreshCcw, Layers, TrendingUp, Activity, PieChart } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DialysisCostCalculator() {
  const [sessionsPerDay, setSessionsPerDay] = useState(20);
  const [days, setDays] = useState(30);
  const [mode, setMode] = useState<"reuse" | "single">("reuse");
  const [reuseCycles, setReuseCycles] = useState(6);
  const [revenuePerSession, setRevenuePerSession] = useState(2500);

  // Base Costs
  const baseDialyzerPrice = 1200;
  const dialyzerCost = mode === "reuse" ? baseDialyzerPrice / reuseCycles : baseDialyzerPrice;
  const tubingCost = 250;
  const staffCost = 400;
  const electricity = 150;
  const misc = 200;

  // Calculations
  const costPerSession = dialyzerCost + tubingCost + staffCost + electricity + misc;
  const totalSessions = sessionsPerDay * days;
  
  const monthlyCost = totalSessions * costPerSession;
  const monthlyRevenue = totalSessions * revenuePerSession;
  const monthlyProfit = monthlyRevenue - monthlyCost;
  const profitMargin = monthlyRevenue > 0 ? ((monthlyProfit / monthlyRevenue) * 100).toFixed(1) : "0.0";

  return (
    <GlassCard accentColor={mode === "reuse" ? "gold" : "blue"} hover={false} className="max-w-5xl mx-auto p-8 lg:p-12">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Financial Modeling</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter">Dialysis ROI Engine</h2>
          <p className="text-sm text-gray-400 mt-2">
            Calculate operational OPEX, EBITDA, and margins based on clinical workflow.
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
            <RefreshCcw size={14} /> Reuse
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
        <div className="space-y-8">
          
          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
              <Activity size={14} /> Volume & Pricing Parameters
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-300 font-medium">Charge per Session (Revenue)</span>
                  <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <IndianRupee size={12} /> {revenuePerSession}
                  </span>
                </div>
                <input
                  type="range" min="1500" max="5000" step="100" value={revenuePerSession}
                  onChange={(e) => setRevenuePerSession(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-300 font-medium">Sessions per Day</span>
                  <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">{sessionsPerDay}</span>
                </div>
                <input
                  type="range" min="5" max="100" value={sessionsPerDay}
                  onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              {mode === "reuse" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                  <div className="flex justify-between text-sm mb-3 mt-2">
                    <span className="text-[#D4AF37] font-medium">Dialyzer Reuse Cycles</span>
                    <span className="text-[#D4AF37] font-bold bg-[#D4AF37]/10 px-2 py-0.5 rounded">{reuseCycles}x</span>
                  </div>
                  <input
                    type="range" min="2" max="12" value={reuseCycles}
                    onChange={(e) => setReuseCycles(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />
                  <p className="text-[10px] text-gray-500 mt-2 italic">Dialyzer cost drops to ₹{(baseDialyzerPrice / reuseCycles).toFixed(0)} per session.</p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="bg-[#010810] p-6 rounded-2xl border border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Cost Breakdown (Per Session)</h3>
            <div className="space-y-3">
              <Row label="Dialyzer (Variable)" value={dialyzerCost} />
              <Row label="Blood Tubing & Fluids" value={tubingCost} />
              <Row label="Clinical Staffing" value={staffCost} />
              <Row label="Power & Maintenance" value={electricity + misc} />
            </div>
            <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center font-bold">
              <span className="text-sm uppercase tracking-widest text-white">Total OPEX / Session</span>
              <span className="flex items-center text-xl text-[#D4AF37]">
                <IndianRupee size={16} className="opacity-70 mr-1" /> {costPerSession.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: OUTPUT DASHBOARD */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-8 flex-1 flex flex-col justify-center relative overflow-hidden">
            <div className={`absolute top-0 inset-x-0 h-1 ${mode === "reuse" ? "bg-[#D4AF37]" : "bg-[#3B82F6]"}`} />
            
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
              <PieChart size={14} /> Estimated Monthly Revenue
            </p>
            <p className="text-4xl font-black flex items-center text-white mb-8 tracking-tighter">
              <IndianRupee size={28} className="opacity-50 mr-1" />
              {(monthlyRevenue / 100000).toFixed(2)} Lakhs
            </p>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 flex items-center gap-2">
              <Activity size={14} /> Monthly Operating Cost
            </p>
            <p className="text-3xl font-bold flex items-center text-gray-300 mb-8 tracking-tighter">
              <IndianRupee size={24} className="opacity-50 mr-1" />
              {(monthlyCost / 100000).toFixed(2)} Lakhs
            </p>

            <div className={`mt-auto p-6 rounded-2xl border ${monthlyProfit > 0 ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-1 ${monthlyProfit > 0 ? "text-green-400" : "text-red-400"}`}>
                    Net Profit (EBITDA)
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
          
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all">
            Download Financial Model PDF
          </button>
        </div>

      </div>
    </GlassCard>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center text-gray-400 text-sm">
      <span>{label}</span>
      <span className="flex items-center font-medium text-gray-200">
        <IndianRupee size={12} className="opacity-50 mr-1" /> {value.toFixed(0)}
      </span>
    </div>
  );
}