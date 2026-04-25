"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Activity, RefreshCcw, Layers, IndianRupee, 
  TrendingUp, Clock, PieChart, Download, Settings, 
  ChevronRight, ShieldCheck, Globe, Zap, Binary, BarChart3, AlertTriangle,
  MessageSquare, FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { LeadCaptureModal } from "@/components/ui/LeadCaptureModal";
import { useInfra } from "@/context/InfrastructureContext";
import { DPRDownloadButton } from "@/components/ui/DPRDownloadButton";
import { calculateV8Capex } from "@/lib/capex-engine-v8"; 

const SOVEREIGN_CONFIG = {
  WACC: 0.125,
  TAX_RATE: 0.25,
  EXIT_MULTIPLE: 8.5,
};

export default function DPREngineWorkspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateJurisdiction, setStateJurisdiction] = useState("Gujarat");
  const [downtime, setDowntime] = useState(5);

  const { 
    machines, setMachines, 
    sessionsPerDay, setSessionsPerDay, 
    pmjay, setPmjay, 
    pvt, setPvt, 
    mode, setMode,
    cityTier, tdsLevel, buildGrade 
  } = useInfra(); //

  const tpa = Math.max(0, 100 - pmjay - pvt);

  // --- OPTIMIZED UNDERWRITING ENGINE (v8.0) ---
  const financials = useMemo(() => {
    // 1. Parametric CAPEX Logic
    const capexData = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade }); //
    const totalCapex = capexData.totalCapex;

    // 2. Revenue Realization (WAR)
    const totalMix = Math.max(pmjay + pvt + tpa, 1);
    const weights = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
    const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

    // 3. Operational Performance
    const monthlySessions = machines * sessionsPerDay * 26;
    const monthlyRevenue = monthlySessions * WAR;
    const variableCost = monthlySessions * (mode === "single" ? 700 : 450);
    const fixedCost = 450000;
    const monthlyEBITDA = monthlyRevenue - (variableCost + fixedCost);
    
    // 4. Institutional ROI Metrics
    const breakeven = monthlyEBITDA > 0 ? (totalCapex / monthlyEBITDA) : 0;
    const irr = totalCapex > 0 ? ((monthlyEBITDA * 12 / totalCapex) * 100 * 0.85) : 0;

    return {
      monthlyRevenue,
      ebitda: monthlyEBITDA,
      totalCapex,
      capexDetails: capexData,
      breakeven,
      irr,
      war: WAR,
      margin: (monthlyEBITDA / monthlyRevenue) * 100
    };
  }, [machines, sessionsPerDay, pmjay, pvt, tpa, mode, cityTier, tdsLevel, buildGrade]);

  useEffect(() => {
    if (stateJurisdiction === "Gujarat") setMode("single");
  }, [stateJurisdiction, setMode]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 flex flex-col h-screen overflow-hidden">
      
      {/* INSTITUTIONAL HEADER */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A1118]">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-lg bg-[#C6A85A] flex items-center justify-center text-[#0A0F1C] font-black shadow-[0_0_20px_rgba(198,168,90,0.2)]">
            <Binary size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8]">Sovereign OS v8.0</span>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Financial Underwriting</span>
          </div>
        </div>
        
        <DPRDownloadButton 
          infraData={{ machines, cityTier, tdsLevel, mode, buildGrade }} 
          financials={financials} 
          capex={financials.capexDetails} 
        />
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* SIDEBAR CONTROLS */}
        <aside className="w-full lg:w-[440px] border-r border-white/5 p-8 space-y-12 overflow-y-auto custom-scrollbar">
          <section className="space-y-10">
            <Slider label="Asset Scale (Machines)" value={machines} min={5} max={50} onChange={setMachines} color="accent-[#C6A85A]" />
            <Slider label="Clinical Sessions / Day" value={sessionsPerDay} min={1} max={4} step={0.1} onChange={setSessionsPerDay} color="accent-[#00A8A8]" />
          </section>

          <section className="p-8 bg-[#0D1525] rounded-[2.5rem] border border-white/5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8">Payor Mix Architecture</h4>
            <div className="space-y-8">
              <Slider label="PM-JAY Portfolio (%)" value={pmjay} max={100 - pvt} onChange={setPmjay} color="accent-[#00A8A8]" />
              <Slider label="Private Portfolio (%)" value={pvt} max={100 - pmjay} onChange={setPvt} color="accent-[#C6A85A]" />
            </div>
          </section>
        </aside>

        {/* INTELLIGENCE TERMINAL */}
        <section className="flex-1 bg-[#0D1525] p-10 overflow-y-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <MetricCard title="Total CAPEX" value={`₹${(financials.totalCapex/100000).toFixed(2)} L`} icon={<BarChart3 />} color="white" sub="v8 Parametric Math" />
            <MetricCard title="Project IRR" value={`${financials.irr.toFixed(1)}%`} icon={<Activity />} color="teal" sub="Audit Projection" />
            <MetricCard title="EBITDA Margin" value={`${financials.margin.toFixed(1)}%`} icon={<TrendingUp />} color="gold" sub="Yield Efficiency" />
            <MetricCard title="Break-even" value={`${financials.breakeven.toFixed(1)} Mo`} icon={<Clock />} color="white" sub="Capital Recovery" />
          </div>

          <GlassCard accent="gold" className="p-16 bg-[#0A0F1C] border-white/5 rounded-[3rem] text-center">
            <span className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4 block">Projected Monthly EBITDA</span>
            <h2 className="text-7xl font-black text-white tracking-tighter tabular-nums mb-8">₹{(financials.ebitda/100000).toFixed(2)} <span className="text-2xl text-gray-700">Lakhs</span></h2>
            <div className="flex justify-center gap-4">
              <button onClick={() => setIsModalOpen(true)} className="bg-white text-black px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#C6A85A] transition-all">Generate Full DPR</button>
              <button onClick={() => window.location.href='/risk'} className="bg-white/5 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border border-white/5 hover:bg-white/10 transition-all">Risk Intelligence</button>
            </div>
          </GlassCard>
        </section>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source="Sovereign OS Underwriting"
        contextData={{ 
          machines, 
          breakeven: financials.breakeven, 
          profit: financials.ebitda,
          irr: financials.irr 
        }}
      />
    </main>
  );
}

// --- SUB-COMPONENTS (Institutional Design Standard) ---

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  color: string;
  suffix?: string;
}

function Slider({ label, value, min = 0, max, step = 1, onChange, color, suffix = "" }: SliderProps) {
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

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "gold" | "teal" | "white";
  sub: string;
}

function MetricCard({ title, value, icon, color, sub }: MetricCardProps) {
  // Brand color mapping
  const accentColor = color === "gold" ? "#C6A85A" : color === "teal" ? "#00A8A8" : "#94A3B8";
  
  return (
    <div className="bg-[#0A0F1C] border border-white/5 rounded-[2rem] p-8 group hover:border-white/10 transition-all">
      <div className="mb-6" style={{ color: accentColor }}>
        {React.cloneElement(icon as React.ReactElement, { size: 22 })}
      </div>
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">{title}</p>
      <h3 className="text-2xl font-black text-white tracking-tighter tabular-nums mb-1">{value}</h3>
      <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest italic">{sub}</p>
    </div>
  );
}