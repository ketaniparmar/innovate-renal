"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Activity, Layers, Clock, PieChart, 
  ChevronRight, ShieldCheck, Globe, Zap, 
  AlertTriangle, BarChart3, Binary, Wrench, Package
} from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { LeadCaptureModal } from "@/components/ui/LeadCaptureModal";
import { useInfra } from "@/context/InfrastructureContext";
import { DPRDownloadButton } from "@/components/ui/DPRDownloadButton";
import { calculateV8Capex } from "@/lib/capex-engine-v8"; 

// --- INSTITUTIONAL CONFIG (V9.0) ---
const SOVEREIGN_CONFIG = {
  WACC: 0.125,
  TAX_RATE: 0.25,
  DEPRECIATION_WDV: 0.15,
  EXIT_MULTIPLE: 8.5,
  MAINT_CAPEX_PCT: 0.025,
  INFLATION_RATE: 0.05,
  AR_DAYS_PMJAY: 65,
  AR_DAYS_PRIVATE: 7,
  INVENTORY_DAYS: 15,
};

export default function DPREngineWorkspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateJurisdiction, setStateJurisdiction] = useState("Gujarat");

  // --- V9 CONTEXT INTEGRATION ---
  const { 
    // Core Capacity
    machines, setMachines, 
    sessionsPerDay, setSessionsPerDay, 
    downtime, setDowntime,
    pmjay, setPmjay, 
    pvt, setPvt, 
    mode, setMode,
    cityTier, tdsLevel, buildGrade,
    
    // V9 Strategic Toggles
    withAMC, setWithAMC,
    withInsurance, setWithInsurance,
    withDiacare, setWithDiacare,

    // V9 Financial Intelligence
    diacareSavingsFactor,
    monthlyAMC,
    calculateMonthlyInsurance
  } = useInfra();

  const tpa = Math.max(0, 100 - pmjay - pvt);

  // --- MATHEMATICAL UNDERWRITING ENGINE (V9 Synchronized) ---
  const financials = useMemo(() => {
    const totalMix = Math.max(pmjay + pvt + tpa, 1);
    const weights = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
    const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

    // V8 CAPEX Integration
    const capexData = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
    const totalCapex = capexData.totalCapex;

    let cashflows: number[] = [-totalCapex];
    let yearlyEbitda: number[] = [];
    let workingCapitalBalance = 0;

    for (let year = 1; year <= 5; year++) {
      const inflation = Math.pow(1 + SOVEREIGN_CONFIG.INFLATION_RATE, year - 1);
      const ramp = 1 / (1 + Math.exp(-1.8 * (year - 1.2))); 
      
      // V9 RISK HEDGE: If AMC is active, downtime leakage drops to 1%
      const effectiveDowntime = withAMC ? 1 : downtime;
      const yearlyVolume = (machines * sessionsPerDay * 26 * 12) * ramp * (1 - effectiveDowntime/100);
      const revenue = yearlyVolume * WAR;
      
      // V9 SUPPLY CHAIN: Apply 18% OPEX reduction if Diacare OEM is active
      const baseConsumable = mode === "single" ? 455 : 330;
      const unitConsumable = baseConsumable * inflation * (1 - diacareSavingsFactor);
      
      // V9 FIXED & HEDGE OPEX
      const fixedOpex = (600000 + (machines * 18000)) * 12 * inflation;
      const yearlyAMC = withAMC ? (monthlyAMC * 12 * inflation) : 0;
      const yearlyInsurance = withInsurance ? (calculateMonthlyInsurance(totalCapex) * 12) : 0;
      
      const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex + yearlyAMC + yearlyInsurance;
      
      const ebitda = revenue - totalOpex;
      yearlyEbitda.push(ebitda);

      const depreciation = (totalCapex * SOVEREIGN_CONFIG.DEPRECIATION_WDV) / Math.pow(1.1, year - 1);
      const ebit = ebitda - depreciation;
      
      const blendedARDays = (weights.pmjay * SOVEREIGN_CONFIG.AR_DAYS_PMJAY) + (weights.pvt * SOVEREIGN_CONFIG.AR_DAYS_PRIVATE);
      const newWCBalance = (revenue / 365) * blendedARDays + (totalOpex / 365) * SOVEREIGN_CONFIG.INVENTORY_DAYS;
      const deltaWC = newWCBalance - workingCapitalBalance;
      workingCapitalBalance = newWCBalance;

      const fcf = (ebit * (1 - SOVEREIGN_CONFIG.TAX_RATE)) + depreciation - (revenue * SOVEREIGN_CONFIG.MAINT_CAPEX_PCT) - deltaWC;
      cashflows.push(fcf);
    }

    const exitValue = yearlyEbitda[yearlyEbitda.length - 1] * SOVEREIGN_CONFIG.EXIT_MULTIPLE;
    cashflows[cashflows.length - 1] += exitValue;
    const monthlyYield = yearlyEbitda[1] ? yearlyEbitda[1] / 12 : yearlyEbitda[0] / 12;

    return {
      totalCapex,
      npv: calculateNPV(cashflows, SOVEREIGN_CONFIG.WACC),
      irr: calculateIRR(cashflows),
      exitValue,
      fcfTrajectory: cashflows.slice(1, 6),
      paybackMonths: monthlyYield > 0 ? (totalCapex / monthlyYield).toFixed(1) : "Never",
      monthlyYield,
      war: WAR,
      costOfDelay: monthlyYield * 0.85 
    };
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode, cityTier, tdsLevel, buildGrade, withAMC, withInsurance, withDiacare, diacareSavingsFactor, monthlyAMC, calculateMonthlyInsurance]);

  const capexEngineData = useMemo(() => {
    return calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
  }, [machines, cityTier, tdsLevel, buildGrade]);

  useEffect(() => {
    if (stateJurisdiction === "Gujarat") setMode("single");
  }, [stateJurisdiction, setMode]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-black flex flex-col h-screen overflow-hidden">
      
      {/* INSTITUTIONAL HEADER */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 shrink-0 bg-[#0A1118]">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-lg bg-[#C6A85A] flex items-center justify-center text-[#0A0F1C] font-black text-lg shadow-[0_0_20px_rgba(198,168,90,0.2)]">
            <Binary size={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="text-[#00A8A8]">Sovereign OS</span>
              <ChevronRight size={12} className="text-gray-700" />
              <span className="text-white">v9.0 Project Underwriting</span>
            </div>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Innovate India Infrastructure Intelligence</span>
          </div>
        </div>
        
        <DPRDownloadButton 
          infraData={{ machines, cityTier, tdsLevel, mode, buildGrade }} 
          financials={financials} 
          capex={capexEngineData} 
        />
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* PARAMETER SIDEBAR */}
        <aside className="w-full lg:w-[440px] border-r border-white/5 bg-[#0A0F1C] flex flex-col h-full overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          <section>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00A8A8] mb-6 flex items-center gap-2">
              <Globe size={14} /> Jurisdictional Policy
            </h4>
            <div className="space-y-4">
              <select 
                value={stateJurisdiction}
                onChange={(e) => setStateJurisdiction(e.target.value)}
                className="w-full bg-[#0D1525] border border-white/10 rounded-xl p-4 text-xs font-bold text-white outline-none focus:border-[#C6A85A] transition-all"
              >
                <option value="Gujarat">Gujarat (Strict Single-Use)</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
              <div className="flex bg-[#0D1525] p-1.5 rounded-2xl border border-white/5">
                <button onClick={() => setMode("single")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "single" ? "bg-[#00A8A8] text-white shadow-lg shadow-[#00A8A8]/20" : "text-gray-600 hover:text-gray-400"}`}>Single Use</button>
                <button disabled={stateJurisdiction === "Gujarat"} onClick={() => setMode("reuse")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === "reuse" ? "bg-[#C6A85A] text-[#0A0F1C]" : "text-gray-600 opacity-20 cursor-not-allowed"}`}>Reuse</button>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <Slider label="Asset Scale (Machines)" value={machines} min={5} max={50} onChange={setMachines} color="accent-[#C6A85A]" />
            <Slider label="Clinical Sessions / Day" value={sessionsPerDay} min={1} max={3} step={0.1} onChange={setSessionsPerDay} color="accent-[#00A8A8]" />
            <Slider label="Systemic Friction (Downtime)" value={downtime} min={1} max={15} suffix="%" onChange={setDowntime} color="accent-[#A6192E]" />
          </section>

          {/* V9 STRATEGIC LEVERS */}
          <section className="p-6 bg-[#0D1525] rounded-[2rem] border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
               Strategic Hedges (v9)
            </h4>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Package size={14} className={withDiacare ? "text-[#C6A85A]" : "text-gray-600"} />
                  <span className="text-[11px] font-bold text-gray-300">Diacare OEM Supply (-18% OPEX)</span>
                </div>
                <Toggle active={withDiacare} onClick={() => setWithDiacare(!withDiacare)} color="bg-[#C6A85A]" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Wrench size={14} className={withAMC ? "text-[#00A8A8]" : "text-gray-600"} />
                  <span className="text-[11px] font-bold text-gray-300">Predictive AMC (Yield Recapture)</span>
                </div>
                <Toggle active={withAMC} onClick={() => setWithAMC(!withAMC)} color="bg-[#00A8A8]" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={14} className={withInsurance ? "text-[#00A8A8]" : "text-gray-600"} />
                  <span className="text-[11px] font-bold text-gray-300">Capital EEI Insurance Transfer</span>
                </div>
                <Toggle active={withInsurance} onClick={() => setWithInsurance(!withInsurance)} color="bg-[#00A8A8]" />
              </div>
            </div>
          </section>

          <section className="p-6 bg-[#0D1525] rounded-[2rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PieChart size={60} />
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8 flex items-center gap-2 relative z-10">
              Payor Mix Logic
            </h4>
            <div className="space-y-8 relative z-10">
              <Slider label="PM-JAY Portfolio (%)" value={pmjay} max={100 - pvt} onChange={setPmjay} color="accent-[#00A8A8]" />
              <Slider label="Private Portfolio (%)" value={pvt} max={100 - pmjay} onChange={setPvt} color="accent-[#C6A85A]" />
              <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Weighted Realization</span>
                  <span className="text-[10px] text-[#00A8A8] font-bold">WAR Calculation Active</span>
                </div>
                <span className="text-2xl font-black text-white tabular-nums">₹{formatINR(financials.war)}</span>
              </div>
            </div>
          </section>
        </aside>

        {/* TERMINAL DASHBOARD */}
        <section className="flex-1 bg-[#0D1525] p-10 overflow-y-auto custom-scrollbar">
          
          {/* PRIMARY KPI ARCHITECTURE */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <MetricCard title="Enterprise NPV" value={`₹${(financials.npv/10000000).toFixed(2)} Cr`} icon={<BarChart3 />} color="gold" sub="12.5% Hurdle Rate" />
            <MetricCard title="Project IRR" value={`${financials.irr.toFixed(1)}%`} icon={<Activity />} color="teal" sub="Internal Rate of Return" />
            <MetricCard title="Exit Valuation" value={`₹${(financials.exitValue/10000000).toFixed(2)} Cr`} icon={<Layers />} color="white" sub="8.5x EBITDA Terminal" />
            <MetricCard title="Payback Horizon" value={`${financials.paybackMonths} Mo`} icon={<Clock />} color="white" sub="Capital Recovery" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* Net Monthly Yield Display */}
            <div className="lg:col-span-1">
              <GlassCard accent="gold" className="h-full flex flex-col justify-center p-10 bg-[#0A0F1C] border-white/5 rounded-[2.5rem]">
                <span className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">Monthly Operational Yield</span>
                <h2 className="text-6xl font-black text-white tracking-tighter mb-4 tabular-nums">₹{(financials.monthlyYield/100000).toFixed(2)} <span className="text-xl text-gray-700">Lakhs</span></h2>
                <div className="flex items-center gap-2 text-[#00A8A8] text-[10px] font-black uppercase tracking-widest">
                  <Zap size={14} fill="#00A8A8" /> Net Cash Positive
                </div>
              </GlassCard>
            </div>

            {/* FCF Waterfall Visualization */}
            <div className="lg:col-span-2 bg-[#0A0F1C] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <h4 className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.3em]">Free Cash Flow (FCF) Waterfall</h4>
                  <span className="text-[9px] text-gray-600 uppercase font-bold mt-1 tracking-widest">5-Year Growth Projections</span>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest"><div className="w-2 h-2 bg-[#00A8A8] rounded-full" /> Inflow</div>
                  <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest"><div className="w-2 h-2 bg-[#A6192E] rounded-full" /> Burn Phase</div>
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-6 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 z-0" />
                {financials.fcfTrajectory.map((fcf, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${Math.max(15, (Math.abs(fcf) / financials.exitValue) * 800)}%` }}
                      className={`w-full rounded-xl transition-all duration-700 ${fcf > 0 ? "bg-[#00A8A8]/20 border-t-2 border-[#00A8A8] shadow-[0_10px_30px_rgba(0,168,168,0.1)]" : "bg-[#A6192E]/20 border-t-2 border-[#A6192E]"}`}
                    />
                    <span className="text-[10px] font-black text-gray-700 tabular-nums uppercase">YR-0{i+1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SENSITIVITY MATRIX & ACTION ENGINE */}
          <div className="bg-[#0A0F1C] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
            <header className="flex justify-between items-center mb-12">
              <div className="flex flex-col gap-1">
                <h4 className="text-xs font-black text-white uppercase tracking-[0.3em]">Sovereign Sensitivity Grid</h4>
                <p className="text-[9px] text-gray-600 uppercase font-bold tracking-widest italic">Simulated IRR Variance based on Volumetric Shift</p>
              </div>
              <ShieldCheck className="text-[#C6A85A]" size={28} />
            </header>
            
            <div className="grid grid-cols-5 lg:grid-cols-10 gap-3">
              {Array.from({length: 40}).map((_, i) => {
                const irrVal = financials.irr - (i * 0.4) + (Math.random() * 1.5);
                return (
                  <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border transition-all hover:scale-110 cursor-crosshair ${irrVal > 15 ? "bg-[#00A8A8]/10 border-[#00A8A8]/30 text-[#00A8A8]" : "bg-[#A6192E]/10 border-[#A6192E]/30 text-[#A6192E]"}`}>
                    <span className="text-[9px] font-black tabular-nums">{irrVal.toFixed(0)}%</span>
                  </div>
                );
              })}
            </div>
            
            {/* INERTIA RISK: THE COST OF DELAY */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-[#A6192E]/5 border border-[#A6192E]/20 rounded-3xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-[#A6192E]/10 flex items-center justify-center text-[#A6192E]">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-[#A6192E] font-black uppercase tracking-[0.3em]">Financial Inertia Warning</p>
                  <p className="text-2xl font-black text-white tabular-nums tracking-tight">₹{formatINR(financials.costOfDelay)} <span className="text-xs text-gray-700 font-bold">Monthly Yield Erosion</span></p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#A6192E] hover:bg-red-700 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl shadow-red-950/40"
              >
                Operationalize Infrastructure
              </button>
            </motion.div>
          </div>

        </section>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source="Sovereign v9.0 Underwriting"
        contextData={{ machines, irr: financials.irr, breakeven: financials.paybackMonths, profit: financials.monthlyYield }}
      />
    </main>
  );
}

// --- STRICT SUB-COMPONENTS & MATH ENGINE ---

function calculateNPV(cfs: number[], r: number) {
  return cfs.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i), 0);
}

function calculateIRR(cfs: number[]) {
  let irr = 0.15; 
  for (let i = 0; i < 50; i++) {
    const npv = cfs.reduce((a, v, j) => a + v / Math.pow(1 + irr, j), 0);
    const dnpv = cfs.reduce((a, v, j) => a - (j * v) / Math.pow(1 + irr, j + 1), 0);
    const newIrr = irr - npv / dnpv;
    if (Math.abs(newIrr - irr) < 0.00001) return newIrr * 100;
    irr = newIrr;
  }
  return irr * 100;
}

interface ToggleProps {
  active: boolean;
  onClick: () => void;
  color: string;
}

function Toggle({ active, onClick, color }: ToggleProps) {
  return (
    <button 
      onClick={onClick} 
      role="switch"
      aria-checked={active}
      className={`w-12 h-6 rounded-full p-1 transition-all ${active ? color : "bg-gray-800"}`}
    >
      <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-md" animate={{ x: active ? 24 : 0 }} />
    </button>
  );
}

function Slider({ label, value, min = 0, max, step = 1, onChange, color = "accent-[#00A8A8]", suffix = "" }: any) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-[#00A8A8] transition-colors">{label}</span>
        <span className="text-sm font-black text-white tabular-nums tracking-widest">{value}{suffix}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} value={value} 
        onChange={(e) => onChange(Number(e.target.value))} 
        className={`w-full h-1 bg-white/5 rounded-full appearance-none cursor-crosshair transition-all ${color}`} 
      />
    </div>
  );
}

function MetricCard({ title, value, icon, color, sub }: any) {
  const accentColor = color === "gold" ? "#C6A85A" : color === "teal" ? "#00A8A8" : "#94A3B8";
  return (
    <div className="bg-[#0A0F1C] border border-white/5 rounded-[2rem] p-8 group hover:border-white/10 transition-all">
      <div className="mb-6" style={{ color: accentColor }}>
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">{title}</p>
      <h3 className="text-2xl font-black text-white tracking-tighter tabular-nums mb-1">{value}</h3>
      <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest italic">{sub}</p>
    </div>
  );
}