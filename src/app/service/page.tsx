"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Wrench,
  BarChart3,
  ExternalLink,
  Zap,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

import { useInfra } from "@/context/InfrastructureContext";
import { calculateV8Capex } from "@/lib/capex-engine-v8";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// --- STRICT TYPES (Prevents Vercel Build Crashes) ---
interface MetricProps {
  label: string;
  value: string;
  danger?: boolean;
  warning?: boolean;
}

interface ActionCardProps {
  label: string;
  title: string;
  icon: React.ReactNode;
  href: string;
  highlight?: boolean;
}

interface ToggleProps {
  active: boolean;
  onClick: () => void;
  color: string;
}

export default function AMCIntelligencePage() {
  // Safe extraction of Context
  const infraContext = useInfra();
  const infra = infraContext || {};

  // --- 1. CORE INFRA DNA (Synchronized with V8 Context) ---
  const {
    machines = 15,
    sessionsPerDay = 2.8,
    downtime = 5,
    pmjay = 40,
    pvt = 40,
    tpa = 20,
    mode = "single",
    amcCostPerMachine = 22000, // Aligned with your local South Gujarat/Maharashtra rate
    cityTier = "Tier_2",
    tdsLevel = 850,
    buildGrade = "Premium"
  } = infra;

  // --- NEW RISK STATES ---
  const [withAMC, setWithAMC] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);

  // --- CFO RISK ENGINE (Upgraded to V8 Architecture) ---
  const metrics = useMemo(() => {
    // Sync with V8 CAPEX math
    const capexData = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
    const totalCapex = capexData.totalCapex;

    // Sync with V8 Revenue Realization
    const totalMix = Math.max(pmjay + pvt + tpa, 1);
    const weights = { pmjay: pmjay / totalMix, pvt: pvt / totalMix, tpa: tpa / totalMix };
    const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

    const monthlySessions = machines * sessionsPerDay * 26;
    const monthlyRevenue = monthlySessions * WAR;

    // Loss Segmentation
    const downtimeLoss = monthlyRevenue * (downtime / 100);
    const utilLoss = monthlyRevenue * 0.12; // Base underutilization factor
    const totalExposure = downtimeLoss + utilLoss;

    // Split: 70% Operational (AMC), 30% Catastrophic (Insurance)
    const recoverableLoss = totalExposure * 0.7;
    const catastrophicLoss = totalExposure * 0.3;

    // AMC Logic
    const monthlyAMC = (amcCostPerMachine * machines) / 12;
    const optimizedDowntimeLoss = monthlyRevenue * 0.01;
    const amcSavings = recoverableLoss - optimizedDowntimeLoss;

    // Insurance (EEI) Logic - 1% CAPEX annually
    const yearlyInsurance = totalCapex * 0.01;
    const monthlyInsurance = yearlyInsurance / 12;
    const insuredLossReduction = catastrophicLoss * 0.9; // 90% risk transfer

    // Combined ROI
    const totalCost = (withAMC ? monthlyAMC : 0) + (withInsurance ? monthlyInsurance : 0);
    const totalGain = (withAMC ? amcSavings : 0) + (withInsurance ? insuredLossReduction : 0);
    const netSavings = totalGain - totalCost;
    const roi = totalCost > 0 ? (netSavings / totalCost) * 100 : 0;

    // Risk Coverage %
    const covered = (withAMC ? recoverableLoss : 0) + (withInsurance ? catastrophicLoss : 0);
    const riskCoverage = totalExposure > 0 ? (covered / totalExposure) * 100 : 0;

    // --- AUTO RECOMMENDATION ENGINE (Brand Palette Applied) ---
    let recommendation = "BASE RISK PROFILE";
    let recColor = "text-gray-400";
    
    if (roi > 200 && !withAMC) {
      recommendation = "CRITICAL: AMC MANDATORY";
      recColor = "text-[#A6192E]"; // Brand Red
    } else if (catastrophicLoss > 200000 && !withInsurance) {
      recommendation = "HIGH EXPOSURE: INSURANCE CRITICAL";
      recColor = "text-orange-500";
    } else if (withAMC && withInsurance) {
      recommendation = "FULLY HEDGED SYSTEM";
      recColor = "text-[#00A8A8]"; // Brand Teal
    }

    return {
      monthlyRevenue,
      totalExposure,
      recoverableLoss,
      catastrophicLoss,
      monthlyAMC,
      monthlyInsurance,
      netSavings,
      roi,
      riskCoverage,
      totalCapex,
      recommendation,
      recColor
    };
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode, amcCostPerMachine, cityTier, tdsLevel, buildGrade, withAMC, withInsurance]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(Math.round(val || 0))}`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 p-6 lg:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* INSTITUTIONAL HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00A8A8] mb-3">
              Sovereign OS <ChevronRight size={12} /> Service & AMC
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Risk Intelligence</h1>
            <p className="text-gray-500 text-sm mt-3">
              Downside Neutralization for <span className="text-[#C6A85A] font-bold">₹{(metrics.totalCapex / 10000000).toFixed(2)} Cr</span> Asset Base.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Risk Coverage</p>
            <p className={`text-4xl font-black tracking-tighter ${metrics.riskCoverage > 80 ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
              {metrics.riskCoverage.toFixed(0)}%
            </p>
          </div>
        </header>

        {/* CFO CONTROL PANEL */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className={`p-8 rounded-[2rem] border transition-all ${withAMC ? 'bg-[#00A8A8]/10 border-[#00A8A8]/30' : 'bg-[#0D1525] border-white/5'}`}>
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-widest flex items-center gap-2">
              <Wrench size={14} className={withAMC ? "text-[#00A8A8]" : "text-gray-500"} /> Operational Efficiency (AMC)
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400">Target: 85% Recovery</span>
              <Toggle active={withAMC} onClick={() => setWithAMC(!withAMC)} color="bg-[#00A8A8]" />
            </div>
          </div>

          <div className={`p-8 rounded-[2rem] border transition-all ${withInsurance ? 'bg-[#C6A85A]/10 border-[#C6A85A]/30' : 'bg-[#0D1525] border-white/5'}`}>
            <h3 className="text-[10px] font-black text-gray-400 uppercase mb-6 tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className={withInsurance ? "text-[#C6A85A]" : "text-gray-500"} /> Risk Transfer (Insurance)
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400">Target: 90% Protection</span>
              <Toggle active={withInsurance} onClick={() => setWithInsurance(!withInsurance)} color="bg-[#C6A85A]" />
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <Metric label="Recoverable (AMC)" value={formatINR(metrics.recoverableLoss)} warning />
          <Metric label="Catastrophic Risk" value={formatINR(metrics.catastrophicLoss)} danger />
          <Metric label="Current Exposure" value={formatINR(metrics.totalExposure - (metrics.netSavings > 0 ? metrics.netSavings : 0))} />
        </div>

        {/* STRATEGIC IMPACT BOX */}
        <div className="bg-[#0A1118] border border-white/5 rounded-[3rem] p-12 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldAlert size={200} />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${metrics.recColor}`}>
                {metrics.recommendation}
              </p>
              <h2 className={`text-6xl font-black tracking-tighter mb-4 tabular-nums ${metrics.netSavings > 0 ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
                {formatINR(metrics.netSavings)} <span className="text-xl text-gray-600">/MO</span>
              </h2>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <p className="text-sm text-gray-400 leading-relaxed font-medium">
                {withAMC && withInsurance 
                  ? "Your system is fully hedged. Inefficiencies are eliminated via AMC, and catastrophic risks are transferred via insurance. Unpredictable loss is now a controlled cost."
                  : withAMC 
                  ? "Operational profit is stabilized, but you remain exposed to catastrophic capital breakdown."
                  : "You are leaking operational profit daily. Your risk coverage is suboptimal for this asset scale."}
              </p>
            </div>
          </div>
        </div>

        {/* 3-SCENARIO CHART */}
        <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-10 mb-10">
           <h3 className="text-[10px] text-gray-500 mb-8 uppercase font-black tracking-widest flex items-center gap-2">
            <BarChart3 size={14} className="text-[#C6A85A]" /> Financial Exposure Scenarios
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { name: "Break-Fix", loss: metrics.totalExposure },
                { name: "AMC Enabled", loss: withAMC ? metrics.catastrophicLoss + metrics.monthlyAMC : metrics.totalExposure },
                { name: "Full Hedge", loss: (withAMC && withInsurance) ? metrics.monthlyAMC + metrics.monthlyInsurance : metrics.totalExposure }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="bold" />
                <YAxis stroke="#475569" fontSize={10} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip 
                  formatter={(value: any) => [formatINR(Number(value)), "Total Exposure"]}
                  contentStyle={{ backgroundColor: '#0A0F1C', border: '1px solid #1e293b', borderRadius: '12px' }} 
                />
                <Line type="monotone" dataKey="loss" stroke="#C6A85A" strokeWidth={4} dot={{ fill: '#C6A85A', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACTION LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard label="Underwriting" title="Full CAPEX Model" icon={<Activity size={20}/>} href="/tools" />
          <ActionCard label="WhatsApp ROI" title="Send CFO Audit" icon={<Zap size={20}/>} href="https://wa.me/9879576332" highlight />
          <ActionCard label="PDF Logic" title="Generate DPR" icon={<ExternalLink size={20}/>} href="/tools" />
        </div>
      </div>
    </main>
  );
}

// --- STRICT COMPONENTS ---

function Toggle({ active, onClick, color }: ToggleProps) {
  return (
    <button 
      onClick={onClick} 
      role="switch"
      aria-checked={active}
      className={`w-14 h-7 rounded-full p-1 transition-all ${active ? color : "bg-gray-800"}`}
    >
      <motion.div layout className="w-5 h-5 bg-white rounded-full shadow-lg" animate={{ x: active ? 28 : 0 }} />
    </button>
  );
}

function Metric({ label, value, danger, warning }: MetricProps) {
  return (
    <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5">
      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-3">{label}</p>
      <p className={`text-2xl font-black tracking-tight tabular-nums ${danger ? "text-[#A6192E]" : warning ? "text-orange-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function ActionCard({ label, title, icon, href, highlight }: ActionCardProps) {
  return (
    <a href={href} className={`p-8 rounded-[2rem] border transition-all flex justify-between items-center group ${highlight ? 'bg-[#C6A85A] border-[#C6A85A] text-[#0A0F1C]' : 'bg-[#0D1525] border-white/5 text-white hover:bg-white/10'}`}>
      <div>
        <p className={`text-[10px] font-black uppercase tracking-widest mb-1.5 ${highlight ? 'text-[#0A0F1C]/70' : 'text-gray-500'}`}>{label}</p>
        <h4 className="text-lg font-black">{title}</h4>
      </div>
      <div className="group-hover:translate-x-1 transition-transform">
        {icon}
      </div>
    </a>
  );
}