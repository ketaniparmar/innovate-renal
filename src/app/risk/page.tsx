"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  BarChart3,
  ExternalLink,
  AlertTriangle,
  Zap,
  Lock,
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

export default function AMCIntelligencePage() {
  const infra = useInfra();

  // --- 1. CORE INFRA DNA (v8.0) ---
  const {
    machines = 15,
    sessionsPerDay = 2.8,
    downtime = 5,
    pmjay = 40,
    pvt = 40,
    tpa = 20,
    mode = "single",
    cityTier = "Tier_2",
    tdsLevel = 850,
    buildGrade = "Premium"
  } = infra || {};

  const [withAMC, setWithAMC] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);

  // --- 2. HEDGING ENGINE (v8.0 Sync) ---
  const metrics = useMemo(() => {
    // Sync with V8 CAPEX math
    const capex = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
    const totalCapex = capex.totalCapex;

    // Sync with V8 Revenue Realization
    const WAR = (pmjay/100 * 1300) + (pvt/100 * 2600) + (tpa/100 * 2100);
    const monthlyRevenue = (machines * sessionsPerDay * 26) * WAR;

    // Exposure Segmentation
    const downtimeLoss = monthlyRevenue * (downtime / 100);
    const clinicalLeakage = monthlyRevenue * 0.12; // Standard underutilization/leakage factor
    const totalExposure = downtimeLoss + clinicalLeakage;

    // Hedge Logic: 75% Recovery via Managed Service (AMC)
    const monthlyAMC = (45000 * machines) / 12; // AMC Unit Cost
    const netDowntimePostAMC = monthlyRevenue * 0.01; // Optimized to 1%
    const amcGain = (downtimeLoss - netDowntimePostAMC);

    // Hedge Logic: Insurance (EEI) Risk Transfer
    const monthlyInsurance = (totalCapex * 0.01) / 12;
    const catastrophicRisk = clinicalLeakage * 0.95; // 95% risk transfer on breakdown

    // ROI Integration
    const totalCost = (withAMC ? monthlyAMC : 0) + (withInsurance ? monthlyInsurance : 0);
    const totalProtection = (withAMC ? amcGain : 0) + (withInsurance ? catastrophicRisk : 0);
    const netSavings = totalProtection - totalCost;
    const riskCoverage = totalExposure > 0 ? (totalProtection / totalExposure) * 100 : 0;

    return {
      monthlyRevenue,
      totalExposure,
      totalCapex,
      netSavings,
      riskCoverage,
      monthlyAMC,
      monthlyInsurance,
      downtimeLoss,
      clinicalLeakage
    };
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, cityTier, tdsLevel, buildGrade, withAMC, withInsurance]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(Math.round(val))}`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 p-8 lg:p-12 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* INSTITUTIONAL HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/5 pb-10 gap-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00A8A8] mb-3">
              Sovereign OS <ChevronRight size={12} /> Risk Neutralization
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white">Downside Intelligence</h1>
            <p className="text-gray-500 text-sm mt-3">
              Safeguarding <span className="text-[#C6A85A] font-bold">₹{(metrics.totalCapex / 10000000).toFixed(2)} Cr</span> Dialysis Infrastructure.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Exposure Hedged</p>
            <p className={`text-5xl font-black tracking-tighter ${metrics.riskCoverage > 80 ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
              {metrics.riskCoverage.toFixed(0)}%
            </p>
          </div>
        </header>

        {/* RISK HEDGING CONTROLS */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className={`p-8 rounded-[2.5rem] border transition-all ${withAMC ? 'bg-[#00A8A8]/10 border-[#00A8A8]/30' : 'bg-[#0D1525] border-white/5'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center text-[#00A8A8]">
                <Zap size={24} fill={withAMC ? "#00A8A8" : "none"} />
              </div>
              <Toggle active={withAMC} onClick={() => setWithAMC(!withAMC)} color="bg-[#00A8A8]" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">Managed Service (AMC)</h3>
            <p className="text-xs text-gray-500">Eliminate downtime leakage via 24/7 technical oversight.</p>
          </div>

          <div className={`p-8 rounded-[2.5rem] border transition-all ${withInsurance ? 'bg-[#C6A85A]/10 border-[#C6A85A]/30' : 'bg-[#0D1525] border-white/5'}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center text-[#C6A85A]">
                <ShieldCheck size={24} fill={withInsurance ? "#C6A85A" : "none"} />
              </div>
              <Toggle active={withInsurance} onClick={() => setWithInsurance(!withInsurance)} color="bg-[#C6A85A]" />
            </div>
            <h3 className="text-lg font-black text-white mb-1">Risk Transfer (EEI)</h3>
            <p className="text-xs text-gray-500">Transfer catastrophic electronic breakdown risk to underwriters.</p>
          </div>
        </div>

        {/* FINANCIAL IMPACT */}
        <div className="bg-[#0A1118] border border-white/5 rounded-[3rem] p-12 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <ShieldAlert size={200} />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Projected Monthly Net Impact</p>
              <h2 className={`text-7xl font-black tracking-tighter tabular-nums ${metrics.netSavings > 0 ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
                {formatINR(metrics.netSavings)}
              </h2>
              <div className="mt-8 flex gap-4">
                <Metric label="AMC Cost" value={formatINR(withAMC ? metrics.monthlyAMC : 0)} />
                <Metric label="Premium" value={formatINR(withInsurance ? metrics.monthlyInsurance : 0)} />
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
               <p className="text-xs text-gray-400 leading-relaxed font-medium">
                {withAMC && withInsurance 
                  ? "SYSTEM FULLY HEDGED: You have successfully converted unpredictable clinical leakage into a fixed operational cost. Your EBITDA is now resilient to machine failure."
                  : "EXPOSURE DETECTED: You are currently operating with unhedged clinical risks. Downtime and catastrophic failure remain direct threats to your monthly yield."}
              </p>
            </div>
          </div>
        </div>

        {/* ACTION PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard title="Underwriting" sub="Adjust CAPEX Parameters" href="/tools" icon={<BarChart3 size={20}/>} />
          <ActionCard title="CFO Audit" sub="Send Summary to WhatsApp" href="https://wa.me/9879576332" icon={<MessageSquare size={20}/>} gold />
          <ActionCard title="Download DPR" sub="Finalize Board Report" href="/tools" icon={<FileText size={20}/>} />
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function Toggle({ active, onClick, color }: any) {
  return (
    <button onClick={onClick} className={`w-14 h-7 rounded-full p-1 transition-all ${active ? color : "bg-gray-800"}`}>
      <motion.div layout className="w-5 h-5 bg-white rounded-full" animate={{ x: active ? 28 : 0 }} />
    </button>
  );
}

function Metric({ label, value }: any) {
  return (
    <div>
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-white tabular-nums">{value}</p>
    </div>
  );
}

function ActionCard({ title, sub, icon, href, gold }: any) {
  return (
    <a href={href} className={`p-8 rounded-[2rem] border transition-all flex justify-between items-center group ${gold ? 'bg-[#C6A85A] text-[#0A0F1C]' : 'bg-white/5 border-white/5 text-white hover:bg-white/10'}`}>
      <div>
        <h4 className="text-lg font-black tracking-tight">{title}</h4>
        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${gold ? 'text-[#0A0F1C]/60' : 'text-gray-500'}`}>{sub}</p>
      </div>
      <div className="group-hover:translate-x-1 transition-transform">{icon}</div>
    </a>
  );
}