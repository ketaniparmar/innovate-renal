"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, AlertTriangle, ChevronRight, Activity, 
  MessageSquare, CheckCircle2, Zap, Package, FileText 
} from "lucide-react";
import { useInfra } from "@/context/InfrastructureContext";
import { calculateV8Capex } from "@/lib/capex-engine-v8";

// --- STRICT TYPES ---
interface ToggleRowProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color: string;
  cost: number;
  recovery: number;
}

export default function RiskStackDecisionEngine() {
  const infra = useInfra();

  // Safe fallbacks for direct routing
  const {
    machines = 15,
    sessionsPerDay = 2.8,
    downtime = 5,
    pmjay = 40,
    pvt = 40,
    tpa = 20,
    cityTier = "Tier_2",
    tdsLevel = 850,
    buildGrade = "Premium"
  } = infra || {};

  // Unified Stack State (Default to Assumed Close)
  const [withAMC, setWithAMC] = useState(true);
  const [withInsurance, setWithInsurance] = useState(true);
  const [withDiacare, setWithDiacare] = useState(true);

  const metrics = useMemo(() => {
    // CAPEX & Base Revenue
    let totalCapex = machines * 1200000;
    try {
      const capex = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
      totalCapex = capex.totalCapex;
    } catch (e) { /* Fallback used */ }

    const WAR = (pmjay / 100) * 1300 + (pvt / 100) * 2600 + (tpa / 100) * 2100;
    const monthlyRevenue = machines * sessionsPerDay * 26 * WAR;

    // 1. AMC Economics
    const downtimeLoss = monthlyRevenue * (downtime / 100);
    const amcCost = (45000 * machines) / 12;
    const amcRecovery = (downtimeLoss - (monthlyRevenue * 0.01)) * 0.85;

    // 2. Insurance Economics
    const insuranceCost = (totalCapex * 0.01) / 12;
    const insuranceProtection = (monthlyRevenue * 0.12) * 0.95; // Hedging 95% of catastrophic risk

    // 3. Diacare Supply Economics
    const baseConsumableCost = machines * sessionsPerDay * 26 * 455;
    const diacareSavings = baseConsumableCost * 0.18; // 18% margin improvement

    // Stack Aggregation
    const totalExposedRisk = downtimeLoss + insuranceProtection + diacareSavings;
    
    let netImpact = 0;
    let totalRecovered = 0;
    let totalPremium = 0;

    if (withAMC) { netImpact += (amcRecovery - amcCost); totalRecovered += amcRecovery; totalPremium += amcCost; }
    else { netImpact -= downtimeLoss; }

    if (withInsurance) { netImpact += (insuranceProtection - insuranceCost); totalRecovered += insuranceProtection; totalPremium += insuranceCost; }
    else { netImpact -= insuranceProtection; }

    if (withDiacare) { netImpact += diacareSavings; totalRecovered += diacareSavings; }
    else { netImpact -= diacareSavings; }

    // Analytics
    const riskCoveragePct = totalExposedRisk > 0 ? (totalRecovered / totalExposedRisk) * 100 : 0;
    const unhedgedMoney = totalExposedRisk - totalRecovered;

    // Dynamic Recommendation (FIX 1)
    const isHighlyRecommended = downtime > 2 || machines >= 10;
    const confidenceScore = isHighlyRecommended ? 98 : 82;

    return {
      netImpact,
      totalExposedRisk,
      riskCoveragePct,
      unhedgedMoney,
      amcCost, amcRecovery, downtimeLoss,
      insuranceCost, insuranceProtection,
      diacareSavings,
      isHighlyRecommended,
      confidenceScore
    };
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, cityTier, tdsLevel, buildGrade, withAMC, withInsurance, withDiacare]);

  const formatINR = (val: number) =>
    `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(val))}`;

  // Assumed Close WhatsApp Injection (FIX 4)
  const handleWhatsApp = () => {
    const stackStatus = [
      withAMC ? "AMC" : "", 
      withInsurance ? "EEI" : "", 
      withDiacare ? "Diacare" : ""
    ].filter(Boolean).join(" + ") || "None";

    const text = `*Innovate India Advisory - Risk Stack Integration*%0A%0A*Proceeding with:* ${stackStatus}%0A*Net Monthly Financial Impact:* ${metrics.netImpact >= 0 ? '+' : '-'}${formatINR(Math.abs(metrics.netImpact))}%0A*Risk Shielded:* ${metrics.riskCoveragePct.toFixed(0)}%%0A%0AProceeding with Risk Stack integration. Please share execution details and DPR formatting.`;
    
    window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
  };

  const stackIsFull = withAMC && withInsurance && withDiacare;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 flex flex-col items-center justify-center px-6 py-24 selection:bg-[#00A8A8] selection:text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[150px] rounded-full pointer-events-none transition-colors duration-700 ${metrics.netImpact > 0 ? 'bg-[#00A8A8]/10' : 'bg-[#A6192E]/10'}`} />

      <div className="max-w-4xl w-full relative z-10 animate-in fade-in zoom-in-95 duration-500">

        {/* HEADLINE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-white tracking-tight">
            The Risk Stack Engine
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Toggle your operational controls to finalize your financial projection.
          </p>
        </div>

        {/* 1. DYNAMIC AUTO RECOMMENDATION ENGINE (FIX 1 & 2) */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#0D1525] border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
            <Activity size={18} className="text-[#C6A85A]" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400">System Recommendation:</span>
            <span className={`text-xs font-black uppercase tracking-widest flex items-center gap-1 ${metrics.isHighlyRecommended ? "text-[#00A8A8]" : "text-[#C6A85A]"}`}>
              <CheckCircle2 size={14} /> 
              {metrics.isHighlyRecommended ? "FULL STACK" : "OPTIONAL"} ({metrics.confidenceScore}% Confidence)
            </span>
          </div>
          {/* Decision Justification Anchor */}
          <p className="text-[11px] text-gray-500 mt-3 text-center font-bold tracking-wide uppercase">
            {metrics.isHighlyRecommended
              ? `A fleet of ${machines} machines with ${downtime}% expected downtime makes full integration financially dominant.`
              : "Low operational scale reduces absolute urgency, but capital exposure still exists."}
          </p>
        </div>

        {/* 2. UNIFIED DECISION CARD */}
        <div className={`p-8 md:p-12 rounded-[2.5rem] border transition-all duration-500 shadow-2xl mb-8
          ${metrics.netImpact >= 0 ? "bg-[#0A0F1C] border-[#00A8A8]/30 shadow-[#00A8A8]/10" : "bg-[#0A0F1C] border-[#A6192E]/30 shadow-[#A6192E]/10"}`}>

          {/* STACK TOGGLES */}
          <div className="space-y-4 mb-12">
            <ToggleRow 
              title="AMC Protection" subtitle="Managed predictive maintenance"
              icon={<Zap size={20} />} color="bg-[#00A8A8]"
              active={withAMC} onClick={() => setWithAMC(!withAMC)}
              cost={metrics.amcCost} recovery={metrics.amcRecovery}
            />
            <ToggleRow 
              title="EEI Insurance" subtitle="Catastrophic asset risk transfer"
              icon={<ShieldCheck size={20} />} color="bg-[#C6A85A]"
              active={withInsurance} onClick={() => setWithInsurance(!withInsurance)}
              cost={metrics.insuranceCost} recovery={metrics.insuranceProtection}
            />
            <ToggleRow 
              title="Diacare Supply" subtitle="Optimized clinical procurement"
              icon={<Package size={20} />} color="bg-[#00A8A8]"
              active={withDiacare} onClick={() => setWithDiacare(!withDiacare)}
              cost={0} recovery={metrics.diacareSavings}
            />
          </div>

          {/* IMPACT NUMBER */}
          <div className="text-center mb-10 pt-10 border-t border-white/5">
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 mb-4">Total Net Monthly Impact</p>
            <h2 className={`text-7xl md:text-8xl font-black tracking-tighter tabular-nums transition-colors duration-500 ${metrics.netImpact >= 0 ? "text-[#00A8A8]" : "text-[#A6192E]"}`}>
              {metrics.netImpact >= 0 ? "+" : "-"}{formatINR(Math.abs(metrics.netImpact))}
            </h2>
          </div>

          {/* DYNAMIC RISK METER (FIX 3) */}
          <div className="mb-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
              <span>Total Risk Covered: {metrics.riskCoveragePct.toFixed(0)}%</span>
              <span className={stackIsFull ? "text-[#00A8A8]" : "text-[#A6192E]"}>
                {stackIsFull 
                  ? "Minimal residual risk" 
                  : `${formatINR(metrics.unhedgedMoney)} at risk monthly`}
              </span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-700 ${stackIsFull ? 'bg-[#00A8A8]' : 'bg-[#A6192E]'}`}
                 style={{ width: `${Math.max(5, metrics.riskCoveragePct)}%` }}
               />
            </div>
          </div>

          {/* LOSS AVERSION SPIKE (FIX 5) */}
          {!stackIsFull && (
            <div className="mt-8 p-5 bg-[#A6192E]/10 border border-[#A6192E]/20 rounded-xl text-center animate-in fade-in duration-300">
              <p className="text-sm text-[#A6192E] font-bold flex items-center justify-center gap-2">
                <AlertTriangle size={18} />
                You are abandoning {formatINR(metrics.unhedgedMoney)} in unhedged losses and unrealized gains every month.
              </p>
            </div>
          )}

          {/* POSITIVE REINFORCEMENT */}
          {stackIsFull && (
            <div className="mt-8 p-5 bg-[#00A8A8]/10 border border-[#00A8A8]/20 rounded-xl text-center animate-in fade-in duration-300">
              <p className="text-sm text-[#00A8A8] font-bold flex items-center justify-center gap-2">
                <ShieldCheck size={18} />
                Your capital and clinical yield are structurally insulated.
              </p>
            </div>
          )}
        </div>

        {/* 3. HARDER CTA LAYER (FIX 4) */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white py-5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-[0_5px_15px_rgba(37,211,102,0.2)] flex justify-center items-center gap-2"
          >
            <MessageSquare size={16}/> Proceed with Risk Stack
          </button>
          
          <Link href="/loan">
            <button className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all shadow-[0_5px_15px_rgba(198,168,90,0.2)] flex justify-center items-center gap-2">
              <FileText size={16} /> Export Board DPR / Loan Report
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function ToggleRow({ title, subtitle, icon, active, onClick, color, cost, recovery }: ToggleRowProps) {
  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(val))}`;

  return (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${active ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5 opacity-60 hover:opacity-100'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${active ? `${color}/20 text-white` : 'border-white/5 text-gray-500'}`}>
          {React.cloneElement(icon as React.ReactElement<any>, { className: active ? color.replace('bg-', 'text-') : 'text-gray-500' })}
        </div>
        <div>
          <h4 className="text-base font-black text-white tracking-tight">{title}</h4>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">Net Impact</p>
          <p className={`text-sm font-bold tabular-nums ${active ? 'text-white' : 'text-gray-600'}`}>
            {active ? `+ ${formatINR(recovery - cost)}` : 'Deactivated'}
          </p>
        </div>

        <button
          onClick={onClick}
          className={`w-14 h-7 rounded-full p-1 transition-all shadow-inner flex items-center ${active ? color : "bg-gray-800"}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full transition-all shadow-sm ${active ? "translate-x-7" : ""}`} />
        </button>
      </div>
    </div>
  );
}