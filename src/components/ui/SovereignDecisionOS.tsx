"use client";

import React, { useState, useMemo } from "react";
// Removed unused icons to prevent Vercel linting errors
import { Globe, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { calculateV7Sovereign, generateSensitivityMatrix } from "@/lib/sovereign-engine";

// --- STRICT TYPES (Prevents Build Crashes) ---
interface SovereignData {
  machines: number;
  sessionsPerDay: number;
  downtime: number;
  pmjay: number;
  pvt: number;
  tpa: number;
  state: string;
  mode: "single" | "reuse";
}

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  suffix?: string;
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}

export default function SovereignDecisionOS() {
  const [data, setData] = useState<SovereignData>({
    machines: 15,
    sessionsPerDay: 2.5,
    downtime: 5,
    pmjay: 60,
    pvt: 25,
    tpa: 15,
    state: "Gujarat",
    mode: "single"
  });

  // Safely default to fallback values if the engine fails
  const financials = useMemo(() => {
    try {
      return calculateV7Sovereign(data);
    } catch (error) {
      return { npv: 0, irr: 0, exitValue: 0, fcfTrajectory: [0, 0, 0, 0, 0] };
    }
  }, [data]);

  const matrix = useMemo(() => {
    try {
      return generateSensitivityMatrix(data);
    } catch (error) {
      return [[{ irr: 0 }]]; // Safe fallback
    }
  }, [data]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val || 0);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid lg:grid-cols-12 gap-8 bg-[#0A0F1C] p-6 lg:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* DECORATIVE LIGHT */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A85A]/5 blur-[120px] -z-10 rounded-full" />

        {/* LEFT: CONTROLS */}
        <div className="lg:col-span-4 space-y-8">
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-[#C6A85A] rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6A85A]">Infrastructure Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Sovereign OS <span className="text-gray-600">v7.0</span></h1>
          </header>

          <section className="space-y-6">
            <div className="bg-[#0D1525] p-6 rounded-3xl border border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <Globe size={14} className="text-[#C6A85A]" /> Governance Policy
              </h4>
              <select 
                value={data.state}
                onChange={(e) => setData({...data, state: e.target.value})}
                className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-sm font-bold text-white focus:border-[#C6A85A] outline-none mb-4"
              >
                <option value="Gujarat">Gujarat (PM-JAY Centric)</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
              <div className="flex bg-[#0A0F1C] p-1 rounded-xl border border-white/5">
                <button onClick={() => setData({...data, mode: 'single'})} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${data.mode === 'single' ? 'bg-[#00A8A8] text-white' : 'text-gray-500'}`}>Single Use</button>
                <button disabled={data.state === 'Gujarat'} onClick={() => setData({...data, mode: 'reuse'})} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${data.mode === 'reuse' ? 'bg-[#C6A85A] text-[#0A0F1C]' : 'text-gray-500 opacity-20 cursor-not-allowed'}`}>Reuse</button>
              </div>
            </div>

            <div className="bg-[#0D1525] p-6 rounded-3xl border border-white/5 space-y-8">
              <Slider label="Asset Scale" value={data.machines} min={5} max={50} onChange={(val) => setData({...data, machines: val})} />
              <Slider label="Clinical Intensity" value={data.sessionsPerDay} min={1} max={4} step={0.1} onChange={(val) => setData({...data, sessionsPerDay: val})} />
              <Slider label="Downtime Friction" value={data.downtime} min={1} max={20} suffix="%" onChange={(val) => setData({...data, downtime: val})} />
            </div>
          </section>
        </div>

        {/* RIGHT: DASHBOARD */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Enterprise NPV" value={`₹${formatINR(financials.npv)}`} sub="Net Present Value" highlight={financials.npv > 0} />
            <StatCard label="Project Yield (IRR)" value={`${(financials.irr || 0).toFixed(1)}%`} sub="Internal Rate of Return" highlight={financials.irr > 15} />
            <StatCard label="Exit Valuation" value={`₹${formatINR(financials.exitValue)}`} sub="8.5x EBITDA Multiple" />
          </div>

          {/* FCF CHART */}
          <div className="bg-[#0D1525] border border-white/5 rounded-[2rem] p-8">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-10 text-center">Free Cash Flow (FCF) Trajectory</h4>
            <div className="flex items-end justify-between h-48 gap-3">
              {financials.fcfTrajectory?.map((fcf: number, i: number) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: `${Math.max(15, (Math.abs(fcf) / (financials.exitValue || 1)) * 800)}%` }}
                    className={`w-full rounded-t-xl ${fcf > 0 ? "bg-[#00A8A8]/30 border-t-2 border-[#00A8A8]" : "bg-[#A6192E]/30 border-t-2 border-[#A6192E]"}`}
                  />
                  <span className="text-[10px] font-black text-gray-600">Y0{i+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SENSITIVITY MATRIX */}
          <div className="bg-[#0D1525] border border-white/5 rounded-[2rem] p-8">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-8">Risk Sensitivity (IRR %)</h4>
            <div className="grid grid-cols-5 gap-2">
              {matrix?.flat().map((cell: any, i: number) => (
                <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border text-[10px] font-black transition-all ${cell.irr > 12.5 ? "bg-[#00A8A8]/10 border-[#00A8A8]/20 text-[#00A8A8]" : "bg-[#A6192E]/10 border-[#A6192E]/20 text-[#A6192E]"}`}>
                  {(cell.irr || 0).toFixed(0)}%
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] transition-all">
              <Download size={16} /> Download Sovereign Audit
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white font-black py-5 rounded-2xl border border-white/10 flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] transition-all">
              <FileText size={16} /> Request Site Feasibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- STRICT SUB-COMPONENTS ---

function Slider({ label, value, min = 0, max, step = 1, onChange, suffix = "" }: SliderProps) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors group-hover:text-[#00A8A8]">{label}</span>
        <span className="text-xs font-black text-white bg-white/5 px-2 py-1 rounded">{value}{suffix}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#C6A85A]" 
      />
    </div>
  );
}

function StatCard({ label, value, sub, highlight }: StatCardProps) {
  return (
    <div className={`p-6 rounded-[2rem] border transition-all ${highlight ? "bg-[#C6A85A]/5 border-[#C6A85A]/20" : "bg-[#0A0F1C] border-white/5"}`}>
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">{label}</span>
      <span className={`text-2xl font-black block tracking-tighter ${highlight ? "text-[#C6A85A]" : "text-white"}`}>{value}</span>
      <span className="text-[9px] text-gray-600 font-bold uppercase mt-1 block leading-none">{sub}</span>
    </div>
  );
}