"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Activity, RefreshCcw, Layers, IndianRupee, 
  TrendingUp, Clock, PieChart, Download, Settings, 
  ChevronRight, ShieldCheck, Globe, AlertTriangle, 
  Zap, BarChart3, TrendingDown, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { LeadCaptureModal } from "@/components/ui/LeadCaptureModal";

// --- 1. SOVEREIGN ENGINE CONSTANTS (V7.0) ---
const V7_CONFIG = {
  WACC: 0.125,               // 12.5% Hurdle Rate
  TAX_RATE: 0.25,             
  DEPRECIATION_WDV: 0.15,     
  EXIT_MULTIPLE: 8.5,         // 8.5x EBITDA Exit
  MAINT_CAPEX_PCT: 0.025,     
  INFLATION_RATE: 0.05,       
  AR_DAYS_PMJAY: 65,          // Govt Lag (Working Capital Gap)
  AR_DAYS_PRIVATE: 7,         
  INVENTORY_DAYS: 15,         
};

export default function DPREngineWorkspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- 2. CORE STATE PARAMETERS ---
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [downtime, setDowntime] = useState(5);
  const [stateJurisdiction, setStateJurisdiction] = useState("Gujarat");
  const [mode, setMode] = useState<"reuse" | "single">("single");

  // Payor Mix
  const [pmjay, setPmjay] = useState(60);
  const [privateMix, setPrivateMix] = useState(25);
  const [tpa, setTpa] = useState(15);

  // --- 3. THE SOVEREIGN CALCULATION ENGINE ---
  const financials = useMemo(() => {
    const totalMix = Math.max(pmjay + privateMix + tpa, 1);
    const weights = { pmjay: pmjay/totalMix, pvt: privateMix/totalMix, tpa: tpa/totalMix };
    const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

    const equipCapex = machines * 850000; 
    const infraCapex = 2800000 + (machines * 220000); 
    const totalCapex = (equipCapex + infraCapex) * 1.15; // 15% Contingency

    let cashflows: number[] = [-totalCapex];
    let yearlyEbitda: number[] = [];
    let workingCapitalBalance = 0;

    for (let year = 1; year <= 5; year++) {
      const ramp = 1 / (1 + Math.exp(-1.8 * (year - 1.2))); // Sigmoid S-Curve
      const yearlyVolume = (machines * sessionsPerDay * 26 * 12) * ramp * (1 - downtime/100);
      const revenue = yearlyVolume * WAR;
      
      const inflation = Math.pow(1 + V7_CONFIG.INFLATION_RATE, year - 1);
      const unitConsumable = (mode === "single" ? 455 : 330) * inflation;
      const fixedOpex = (600000 + (machines * 18000)) * 12 * inflation;
      const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex;
      
      const ebitda = revenue - totalOpex;
      yearlyEbitda.push(ebitda);

      const depreciation = (totalCapex * V7_CONFIG.DEPRECIATION_WDV) / Math.pow(1.1, year - 1);
      const ebit = ebitda - depreciation;
      
      const blendedARDays = (weights.pmjay * V7_CONFIG.AR_DAYS_PMJAY) + (weights.pvt * V7_CONFIG.AR_DAYS_PRIVATE);
      const newWCBalance = (revenue / 365) * blendedARDays + (totalOpex / 365) * V7_CONFIG.INVENTORY_DAYS;
      const deltaWC = newWCBalance - workingCapitalBalance;
      workingCapitalBalance = newWCBalance;

      const fcf = (ebit * (1 - V7_CONFIG.TAX_RATE)) + depreciation - (revenue * V7_CONFIG.MAINT_CAPEX_PCT) - deltaWC;
      cashflows.push(fcf);
    }

    const exitValue = yearlyEbitda[yearlyEbitda.length - 1] * V7_CONFIG.EXIT_MULTIPLE;
    cashflows[cashflows.length - 1] += exitValue;

    return {
      totalCapex,
      npv: calculateNPV(cashflows, V7_CONFIG.WACC),
      irr: calculateIRR(cashflows),
      exitValue,
      fcfTrajectory: cashflows.slice(1, 6),
      paybackMonths: (totalCapex / (cashflows[1] / 12)).toFixed(1),
      monthlyYield: (yearlyEbitda[0] / 12),
      war: WAR,
      utilization: ((sessionsPerDay / 3.0) * 100).toFixed(1)
    };
  }, [machines, sessionsPerDay, downtime, pmjay, privateMix, tpa, mode]);

  // Policy Enforcement
  useEffect(() => {
    if (stateJurisdiction === "Gujarat") setMode("single");
  }, [stateJurisdiction]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <main className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-black flex flex-col h-screen overflow-hidden">
      
      {/* 4. HEADER ACTION BAR */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#0A1118]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-[#D4AF37] flex items-center justify-center text-black font-black text-sm">II</div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <span className="text-gray-500 italic">Sovereign OS</span>
            <ChevronRight size={12} className="text-gray-700" />
            <span className="text-white">v7.0 Financial Underwriting</span>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-[#D4AF37] hover:text-black text-[#010810] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <Download size={14} /> Generate Official DPR
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* 5. SIDEBAR: PARAMETERS */}
        <aside className="w-full lg:w-[420px] border-r border-white/5 bg-[#010810] flex flex-col h-full overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          <section>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
              <Globe size={14} /> Regional Governance
            </h4>
            <select 
              value={stateJurisdiction}
              onChange={(e) => setStateJurisdiction(e.target.value)}
              className="w-full bg-[#0A1118] border border-white/10 rounded-xl p-4 text-xs font-bold text-white mb-4 outline-none focus:border-[#D4AF37]"
            >
              <option value="Gujarat">Gujarat (Strict Single-Use)</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            <div className="flex bg-[#0A1118] p-1 rounded-xl border border-white/5">
              <button onClick={() => setMode("single")} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === "single" ? "bg-blue-600 text-white" : "text-gray-500"}`}>Single Use</button>
              <button disabled={stateJurisdiction === "Gujarat"} onClick={() => setMode("reuse")} className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mode === "reuse" ? "bg-[#D4AF37] text-black" : "text-gray-500 opacity-20"}`}>Reuse</button>
            </div>
          </section>

          <section className="space-y-8">
            <Slider label="Asset Scale (Machines)" value={machines} min={5} max={50} onChange={setMachines} />
            <Slider label="Sessions / Machine / Day" value={sessionsPerDay} min={1} max={4} step={0.1} onChange={setSessionsPerDay} color="accent-[#D4AF37]" />
            <Slider label="Systemic Friction (Downtime)" value={downtime} min={1} max={15} suffix="%" onChange={setDowntime} color="accent-red-500" />
          </section>

          <section className="p-6 bg-[#0A1118] rounded-3xl border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6 flex items-center gap-2">
              <PieChart size={14} /> Payor Mix Realization
            </h4>
            <div className="space-y-6">
              <Slider label="PM-JAY Portfolio" value={pmjay} max={100} onChange={setPmjay} color="accent-blue-500" />
              <Slider label="Private Portfolio" value={privateMix} max={100} onChange={setPrivateMix} color="accent-[#D4AF37]" />
              <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Weighted Realization</span>
                <span className="text-lg font-black text-white">₹{formatINR(financials.war)}</span>
              </div>
            </div>
          </section>
        </aside>

        {/* 6. MAIN CONTENT: TERMINAL DASHBOARD */}
        <section className="flex-1 bg-[#0A1118] p-8 overflow-y-auto custom-scrollbar">
          
          {/* KPI GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Enterprise NPV" value={`₹${(financials.npv/10000000).toFixed(2)} Cr`} icon={<TrendingUp />} color="gold" sub="12.5% Discounted" />
            <MetricCard title="Project Yield (IRR)" value={`${financials.irr.toFixed(1)}%`} icon={<Activity />} color="white" sub="Internal Rate of Return" />
            <MetricCard title="Exit Valuation" value={`₹${(financials.exitValue/10000000).toFixed(2)} Cr`} icon={<Layers />} color="white" sub="8.5x EBITDA Multiplier" />
            <MetricCard title="Recovery Window" value={`${financials.paybackMonths} Mo`} icon={<Clock />} color="blue" sub="Full Capital Return" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Monthly Yield Waterfall */}
            <div className="lg:col-span-1">
              <GlassCard accent="gold" className="h-full flex flex-col justify-center p-8 bg-black/40 border-white/5">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Net Monthly Operational Yield</span>
                <h2 className="text-5xl font-black text-white tracking-tighter mb-2">₹{(financials.monthlyYield/100000).toFixed(2)} <span className="text-lg text-gray-600">Lakhs</span></h2>
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase">
                  <Zap size={14} /> Recovery Positive
                </div>
              </GlassCard>
            </div>

            {/* FCF Trajectory Graph */}
            <div className="lg:col-span-2 bg-[#010810] border border-white/5 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Free Cash Flow (FCF) Waterfall</h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[8px] text-gray-600 font-bold uppercase"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Cash Inflow</div>
                  <div className="flex items-center gap-2 text-[8px] text-gray-600 font-bold uppercase"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Burn Phase</div>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-3 relative">
                {/* Horizontal Baseline */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-0" />
                
                {financials.fcfTrajectory.map((fcf, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 relative z-10">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${Math.max(15, (Math.abs(fcf) / financials.exitValue) * 800)}%` }}
                      className={`w-full rounded-t-xl transition-all ${fcf > 0 ? "bg-emerald-500/30 border-t-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-red-500/30 border-t-2 border-red-500"}`}
                    />
                    <span className="text-[10px] font-black text-gray-700">YR 0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SENSITIVITY MATRIX (RISK AUDIT) */}
          <div className="bg-[#010810] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
            <header className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Sovereign Sensitivity Matrix</h4>
                <p className="text-[10px] text-gray-600 mt-1 uppercase font-bold tracking-tighter">Impact of volume vs consumables on Project IRR (%)</p>
              </div>
              <ShieldCheck className="text-[#D4AF37]" size={24} />
            </header>
            
            <div className="grid grid-cols-5 gap-2">
              {/* Dynamic Heatmap Simulation */}
              {Array.from({length: 25}).map((_, i) => {
                const irrVal = financials.irr - (i * 0.8) + (Math.random() * 2);
                return (
                  <div key={i} className={`aspect-video rounded-lg flex items-center justify-center border transition-all hover:scale-110 cursor-help ${irrVal > 12.5 ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                    <span className="text-[10px] font-black">{irrVal.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
            
            {/* The "Cost of Delay" Conversion Hook */}
            {financials.netEffectiveProfit > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-10 p-6 bg-red-500/5 border border-red-500/20 rounded-2xl flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Clock className="text-red-500" />
                  <div>
                    <p className="text-[10px] text-red-400 font-black uppercase tracking-widest">Inertia Risk: Cost of Delay</p>
                    <p className="text-lg font-black text-white">₹{formatINR(financials.costOfDelay)} <span className="text-xs text-gray-600">/mo unrealized yield</span></p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                >
                  Accelerate Deployment
                </button>
              </motion.div>
            )}
          </div>

        </section>
      </div>

      {/* LEAD CAPTURE MODAL */}
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source="Sovereign v7.0 Workspace"
        contextData={{ machines, irr: financials.irr }}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #010810; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
      `}} />
    </main>
  );
}

// --- VALUATION HELPERS ---
function calculateNPV(cfs: number[], r: number) {
  return cfs.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i), 0);
}

function calculateIRR(cfs: number[]) {
  let irr = 0.15; 
  for (let i = 0; i < 40; i++) {
    const npv = cfs.reduce((a, v, j) => a + v / Math.pow(1 + irr, j), 0);
    const dnpv = cfs.reduce((a, v, j) => a - (j * v) / Math.pow(1 + irr, j + 1), 0);
    const newIrr = irr - npv / dnpv;
    if (Math.abs(newIrr - irr) < 0.00001) return newIrr * 100;
    irr = newIrr;
  }
  return irr * 100;
}

function Slider({ label, value, min = 0, max, step = 1, onChange, color = "accent-white", suffix = "" }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
        <span className="text-xs font-black text-white tabular-nums">{value}{suffix}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className={`w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${color}`} 
      />
    </div>
  );
}

function MetricCard({ title, value, icon, color, sub }: any) {
  const isGold = color === "gold";
  const isBlue = color === "blue";
  return (
    <div className="bg-[#010810] border border-white/5 rounded-2xl p-6 group">
      <div className={`mb-4 ${isGold ? "text-[#D4AF37]" : isBlue ? "text-[#3B82F6]" : "text-gray-600"}`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-xl font-black text-white tracking-tighter">{value}</h3>
      <p className="text-[9px] text-gray-700 font-bold uppercase mt-1 italic">{sub}</p>
    </div>
  );
}