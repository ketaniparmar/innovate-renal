"use client";

import React, { useState, useMemo } from "react";
import { 
  ShieldCheck, Globe, Download, FileText, AlertTriangle, 
  Clock, Zap, TrendingDown, Activity 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateV7Sovereign, generateSensitivityMatrix } from "@/lib/sovereign-engine";

export default function SovereignDecisionOS() {
  const [data, setData] = useState({
    machines: 15,
    sessionsPerDay: 2.5,
    downtime: 5,
    pmjay: 60,
    pvt: 25,
    tpa: 15,
    state: "Gujarat",
    mode: "single"
  });

  const financials = useMemo(() => calculateV7Sovereign(data), [data]);
  const matrix = useMemo(() => generateSensitivityMatrix(data), [data]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid lg:grid-cols-12 gap-8 bg-[#020617] p-6 lg:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* DECORATIVE LIGHT */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] -z-10 rounded-full" />

        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-4 space-y-8">
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Infrastructure Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Sovereign OS <span className="text-gray-600">v7.0</span></h1>
          </header>

          <section className="space-y-6">
            <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <Globe size={14} className="text-[#D4AF37]" /> Governance Policy
              </h4>
              <select 
                value={data.state}
                onChange={(e) => setData({...data, state: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm font-bold text-white focus:border-[#D4AF37] outline-none mb-4"
              >
                <option value="Gujarat">Gujarat (PM-JAY Centric)</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
              <div className="flex bg-black p-1 rounded-xl border border-white/5">
                <button onClick={() => setData({...data, mode: 'single'})} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase ${data.mode === 'single' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>Single Use</button>
                <button disabled={data.state === 'Gujarat'} onClick={() => setData({...data, mode: 'reuse'})} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase ${data.mode === 'reuse' ? 'bg-[#D4AF37] text-black' : 'text-gray-500 opacity-20'}`}>Reuse</button>
              </div>
            </div>

            <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 space-y-8">
              <Slider label="Asset Scale" value={data.machines} min={5} max={50} onChange={(val) => setData({...data, machines: val})} />
              <Slider label="Clinical Intensity" value={data.sessionsPerDay} min={1} max={4} step={0.1} onChange={(val) => setData({...data, sessionsPerDay: val})} />
              <Slider label="Downtime Friction" value={data.downtime} min={1} max={20} suffix="%" onChange={(val) => setData({...data, downtime: val})} />
            </div>
          </section>
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Enterprise NPV" value={formatINR(financials.npv)} sub="Net Present Value" highlight={financials.npv > 0} />
            <StatCard label="Project Yield (IRR)" value={`${financials.irr.toFixed(1)}%`} sub="Internal Rate of Return" highlight={financials.irr > 15} />
            <StatCard label="Exit Valuation" value={formatINR(financials.exitValue)} sub="8.5x EBITDA Multiple" />
          </div>

          {/* FCF CHART */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-8">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-10 text-center">Free Cash Flow (FCF) Trajectory</h4>
            <div className="flex items-end justify-between h-48 gap-3">
              {financials.fcfTrajectory.map((fcf, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${Math.max(15, (Math.abs(fcf) / financials.exitValue) * 800)}%` }}
                    className={`w-full rounded-t-xl ${fcf > 0 ? "bg-emerald-500/30 border-t-2 border-emerald-500" : "bg-red-500/30 border-t-2 border-red-500"}`}
                  />
                  <span className="text-[10px] font-black text-gray-600">Y0{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SENSITIVITY MATRIX */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2rem] p-8">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-8">Risk Sensitivity (IRR %)</h4>
            <div className="grid grid-cols-5 gap-2">
              {matrix.flat().map((cell, i) => (
                <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border text-[10px] font-black ${cell.irr > 12.5 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                  {cell.irr.toFixed(0)}%
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#D4AF37] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
              <Download size={16} /> Download Sovereign Audit
            </button>
            <button className="bg-white/5 text-white font-black py-5 rounded-2xl border border-white/10 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
              <FileText size={16} /> Request Site Feasibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// SUB-COMPONENTS
function Slider({ label, value, min = 0, max, step = 1, onChange, suffix = "" }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</span>
        <span className="text-xs font-black text-white bg-white/5 px-2 py-1 rounded">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
    </div>
  );
}

function StatCard({ label, value, sub, highlight }: { label: string; value: string; sub: string; highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-[2rem] border ${highlight ? "bg-[#D4AF37]/5 border-[#D4AF37]/20" : "bg-white/[0.02] border-white/5"}`}>
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">{label}</span>
      <span className={`text-2xl font-black block tracking-tighter ${highlight ? "text-white" : "text-gray-300"}`}>{value}</span>
      <span className="text-[9px] text-gray-600 font-bold uppercase mt-1 block leading-none">{sub}</span>
    </div>
  );
}