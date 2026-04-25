"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Wrench,
  BarChart3,
  ExternalLink,
  AlertTriangle,
  Zap,
  Lock
} from "lucide-react";

import { useInfra } from "@/context/InfrastructureContext";
import { calculateV7Sovereign } from "@/lib/sovereign-engine";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

// --- TYPES ---
interface MetricProps {
  label: string;
  value: string;
  danger?: boolean;
  warning?: boolean;
}

export default function AMCIntelligencePage() {
  const infra = useInfra();

  const {
    machines = 10,
    sessionsPerDay = 2.5,
    downtime = 5,
    pmjay = 40,
    pvt = 40,
    tpa = 20,
    mode = "standard",
    amcCostPerMachine = 45000
  } = infra || {};

  // --- NEW RISK STATES ---
  const [withAMC, setWithAMC] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);

  // --- CFO RISK ENGINE ---
  const metrics = useMemo(() => {
    const res = calculateV7Sovereign({ machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode });

    const monthlyRevenue = res?.monthlyRevenue || 0;
    const totalCapex = res?.totalCapex || 0;

    // Loss Segmentation
    const downtimeLoss = res?.downtimeLoss || monthlyRevenue * (downtime / 100);
    const utilLoss = res?.underutilizationLoss || 0;
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

    // --- AUTO RECOMMENDATION ENGINE ---
    let recommendation = "BASE RISK PROFILE";
    let recColor = "text-gray-400";
    
    if (roi > 200 && !withAMC) {
      recommendation = "CRITICAL: AMC MANDATORY";
      recColor = "text-red-500";
    } else if (catastrophicLoss > 200000 && !withInsurance) {
      recommendation = "HIGH EXPOSURE: INSURANCE CRITICAL";
      recColor = "text-orange-500";
    } else if (withAMC && withInsurance) {
      recommendation = "FULLY HEDGED SYSTEM";
      recColor = "text-emerald-400";
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
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode, amcCostPerMachine, withAMC, withInsurance]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(Math.round(val || 0))}`;

  return (
    <main className="min-h-screen bg-[#010810] text-white p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">Risk Intelligence</h1>
            <p className="text-gray-400 text-sm mt-2">
              Downside Neutralization for <span className="text-[#D4AF37] font-bold">₹{(metrics.totalCapex / 10000000).toFixed(2)} Cr</span> Asset Base.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Risk Coverage</p>
            <p className={`text-3xl font-black tracking-tighter ${metrics.riskCoverage > 80 ? 'text-emerald-400' : 'text-red-500'}`}>
              {metrics.riskCoverage.toFixed(0)}%
            </p>
          </div>
        </header>

        {/* CFO CONTROL PANEL */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
            <h3 className="text-[10px] font-black text-gray-500 uppercase mb-6 tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-yellow-400" /> Operational Efficiency (AMC)
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400">Target: 85% Recovery</span>
              <Toggle active={withAMC} onClick={() => setWithAMC(!withAMC)} color="bg-emerald-500" />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
            <h3 className="text-[10px] font-black text-gray-500 uppercase mb-6 tracking-widest flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" /> Risk Transfer (Insurance)
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400">Target: 90% Protection</span>
              <Toggle active={withInsurance} onClick={() => setWithInsurance(!withInsurance)} color="bg-blue-500" />
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Metric label="Recoverable (AMC)" value={formatINR(metrics.recoverableLoss)} warning />
          <Metric label="Catastrophic Risk" value={formatINR(metrics.catastrophicLoss)} danger />
          <Metric label="Current Exposure" value={formatINR(metrics.totalExposure - (metrics.netSavings > 0 ? metrics.netSavings : 0))} />
        </div>

        {/* STRATEGIC IMPACT BOX */}
        <div className="bg-gradient-to-br from-black/60 to-[#0A1118] border border-white/10 rounded-[2.5rem] p-10 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${metrics.recColor}`}>
              {metrics.recommendation}
            </p>
            <h2 className={`text-5xl font-black tracking-tighter mb-4 ${metrics.netSavings > 0 ? 'text-emerald-400' : 'text-red-500'}`}>
              {formatINR(metrics.netSavings)} <span className="text-xl text-gray-600">/MO</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl leading-relaxed">
              {withAMC && withInsurance 
                ? "Your system is fully hedged. Inefficiencies are eliminated via AMC, and catastrophic risks are transferred via insurance. Unpredictable loss is now a controlled cost."
                : withAMC 
                ? "Operational profit is stabilized, but you remain exposed to catastrophic capital breakdown."
                : "You are leaking operational profit daily. Your risk coverage is suboptimal for this asset scale."}
            </p>
          </div>
        </div>

        {/* 3-SCENARIO CHART */}
        <div className="bg-[#0A1118] border border-white/5 rounded-[2rem] p-8 mb-8">
           <h3 className="text-[10px] text-gray-500 mb-6 uppercase font-black tracking-widest flex items-center gap-2">
            <BarChart3 size={14} className="text-[#D4AF37]" /> Financial Exposure Scenarios
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
                <YAxis stroke="#475569" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#010810', border: '1px solid #1e293b', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="loss" stroke="#D4AF37" strokeWidth={4} dot={{ fill: '#D4AF37', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ACTION LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard label="Underwriting" title="Full CAPEX Model" icon={<Activity size={18}/>} href="/capex" />
          <ActionCard label="WhatsApp ROI" title="Send CFO Audit" icon={<Zap size={18}/>} href="https://wa.me/9879576332" highlight />
          <ActionCard label="PDF Logic" title="Generate DPR" icon={<ExternalLink size={18}/>} href="/dpr" />
        </div>
      </div>
    </main>
  );
}

// --- COMPONENTS ---
function Toggle({ active, onClick, color }: { active: boolean, onClick: () => void, color: string }) {
  return (
    <button onClick={onClick} className={`w-12 h-6 rounded-full relative transition ${active ? color : "bg-gray-700"}`}>
      <motion.div layout className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg" animate={{ x: active ? 24 : 0 }} />
    </button>
  );
}

function Metric({ label, value, danger, warning }: MetricProps) {
  return (
    <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">{label}</p>
      <p className={`text-xl font-black tracking-tight ${danger ? "text-red-400" : warning ? "text-orange-400" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function ActionCard({ label, title, icon, href, highlight }: any) {
  return (
    <a href={href} className={`${highlight ? 'bg-[#D4AF37] text-black' : 'bg-white/[0.02] border border-white/5 text-white'} p-6 rounded-2xl hover:scale-[1.02] transition-all flex justify-between items-center`}>
      <div>
        <p className="text-[10px] font-black uppercase mb-1 opacity-60">{label}</p>
        <h4 className="text-lg font-bold">{title}</h4>
      </div>
      {icon}
    </a>
  );
}