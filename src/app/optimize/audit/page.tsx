"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ShieldAlert, Activity, TrendingUp, CheckCircle2, AlertTriangle, ListChecks, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function ClinicalFinancialDiagnostic() {
  const [step, setStep] = useState(1);

  // --- 🧭 STEP 1 & 2: THE INPUT LAYER (Real Market Reality) ---
  const [data, setData] = useState({
    machines: 10,
    sessionsPerDay: 2.0,
    avgRevenue: 1850, // Now Dynamic
    insuranceMix: 60, // % of patients on insurance/PMJAY vs Private
    consumables: "Reuse",
    maintenance: "AMC",
  });

  // --- 🧠 THE AI ADVISOR ENGINE (Logic & Prioritization) ---
  const diagnosis = useMemo(() => {
    const daysPerMonth = 26;
    const currentMonthlySessions = data.machines * data.sessionsPerDay * daysPerMonth;
    const monthlyRevenue = currentMonthlySessions * data.avgRevenue;

    // 1. Consumable Leakage
    let consumableLeakage = 0;
    let costControlScore = 95;
    if (data.consumables === "Reuse") {
      consumableLeakage = currentMonthlySessions * 200; 
      costControlScore = 45;
    } else {
      consumableLeakage = currentMonthlySessions * 40; 
      costControlScore = 80;
    }

    // 2. Downtime Leakage
    let downtimeRate = 0.02; 
    let operationalScore = 92;
    if (data.maintenance === "AMC") {
      downtimeRate = 0.05;
      operationalScore = 75;
    }
    if (data.maintenance === "On-Call / None") {
      downtimeRate = 0.12;
      operationalScore = 40;
    }
    const downtimeLeakage = monthlyRevenue * downtimeRate;

    // 3. Cash Flow/Insurance Leakage (Tied to insurance dependency)
    const costOfCapitalMonthly = 0.015; // 1.5% capital drag
    const delayMonths = 2.5; // Average 75 days delay for Govt/TPA
    const insuranceRevenue = monthlyRevenue * (data.insuranceMix / 100);
    const cashFlowLeakage = insuranceRevenue * (delayMonths * costOfCapitalMonthly);
    const revenueStabilityScore = Math.max(30, 100 - (data.insuranceMix * 0.6));

    const totalMonthlyLeakage = consumableLeakage + downtimeLeakage + cashFlowLeakage;
    
    // The "Before / After" Profit Engine
    const optimizedLeakage = totalMonthlyLeakage * 0.15; // Unavoidable baseline friction
    const netImprovement = totalMonthlyLeakage - optimizedLeakage;

    // 🏆 PRIORITY RANKING ENGINE (Execution Order)
    const leaks = [
      { category: "Consumable Waste & Margin", value: consumableLeakage, action: data.consumables === "Reuse" ? "Transition to Single-Use compliant models to instantly recover ~₹200/session margin." : "Audit vendor pricing to hit the ₹400/kit benchmark." },
      { category: "Machine Downtime Exposure", value: downtimeLeakage, action: data.maintenance === "CMC" ? "Monitor machine breakdown patterns to ensure >98% uptime." : "Upgrade to CMC contract to cap downtime at <2% and ensure revenue continuity." },
      { category: "Working Capital Drag", value: cashFlowLeakage, action: `With a ${data.insuranceMix}% insurance dependency, optimizing your claim submission cycle is critical to recovering capital interest.` }
    ].sort((a, b) => b.value - a.value);

    const overallHealth = Math.round((costControlScore + operationalScore + revenueStabilityScore) / 3);

    return {
      monthlyRevenue,
      totalMonthlyLeakage,
      optimizedLeakage,
      netImprovement,
      topLeaks: leaks,
      scores: {
        operational: operationalScore,
        cost: costControlScore,
        stability: Math.round(revenueStabilityScore),
        overall: overallHealth
      },
      riskLevel: overallHealth < 50 ? "HIGH" : overallHealth < 75 ? "MEDIUM" : "LOW"
    };
  }, [data]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const formatLakhs = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <StepContainer title="Step 1: Clinical Situation" subtitle="Let's establish your current operational revenue baseline.">
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-4"><span className="text-sm text-gray-400 font-bold uppercase">Active Machines</span><span className="text-xl font-black text-white">{data.machines}</span></div>
                <input type="range" min="3" max="50" value={data.machines} onChange={(e) => setData({...data, machines: Number(e.target.value)})} className="w-full accent-[#C6A85A]" />
              </div>
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-4"><span className="text-sm text-gray-400 font-bold uppercase">Avg Sessions/Day</span><span className="text-xl font-black text-white">{data.sessionsPerDay.toFixed(1)}</span></div>
                <input type="range" min="1" max="4" step="0.1" value={data.sessionsPerDay} onChange={(e) => setData({...data, sessionsPerDay: Number(e.target.value)})} className="w-full accent-[#C6A85A]" />
              </div>
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-4"><span className="text-sm text-gray-400 font-bold uppercase">Avg Revenue / Session</span><span className="text-xl font-black text-white">₹{data.avgRevenue}</span></div>
                <input type="range" min="900" max="3500" step="50" value={data.avgRevenue} onChange={(e) => setData({...data, avgRevenue: Number(e.target.value)})} className="w-full accent-[#00A8A8]" />
              </div>
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-4"><span className="text-sm text-gray-400 font-bold uppercase">Insurance / Govt Mix</span><span className="text-xl font-black text-white">{data.insuranceMix}%</span></div>
                <input type="range" min="0" max="100" step="5" value={data.insuranceMix} onChange={(e) => setData({...data, insuranceMix: Number(e.target.value)})} className="w-full accent-[#00A8A8]" />
              </div>
            </div>
            <button onClick={nextStep} className="mt-8 bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all w-full flex justify-center gap-2">Continue Diagnostic <ArrowRight size={18}/></button>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer title="Step 2: Financial Pressure Check" subtitle="How is your facility structurally managing expenditures today?">
            <div className="space-y-8 mt-8">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Consumable Model Selection</p>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setData({...data, consumables: "Single-Use"})} className={`p-5 rounded-2xl border font-bold transition-all ${data.consumables === "Single-Use" ? "bg-[#00A8A8] text-white border-[#00A8A8]" : "bg-[#0D1525] text-gray-500 border-white/5 hover:border-white/20"}`}>Single-Use (PMJAY Aligned)</button>
                  <button onClick={() => setData({...data, consumables: "Reuse"})} className={`p-5 rounded-2xl border font-bold transition-all ${data.consumables === "Reuse" ? "bg-[#C6A85A] text-[#0A0F1C] border-[#C6A85A]" : "bg-[#0D1525] text-gray-500 border-white/5 hover:border-white/20"}`}>Reuse (Legacy)</button>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Machine Maintenance Strategy</p>
                <div className="grid grid-cols-3 gap-4">
                  {["CMC", "AMC", "On-Call / None"].map(opt => (
                    <button key={opt} onClick={() => setData({...data, maintenance: opt})} className={`p-5 rounded-2xl border font-bold text-sm transition-all ${data.maintenance === opt ? "bg-[#00A8A8] text-white border-[#00A8A8]" : "bg-[#0D1525] text-gray-500 border-white/5 hover:border-white/20"}`}>{opt}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={prevStep} className="px-6 py-5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all"><ArrowLeft size={18}/></button>
              <button onClick={nextStep} className="flex-1 bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all flex justify-center gap-2">Run Financial Diagnosis <Activity size={18}/></button>
            </div>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer title="Step 3: Diagnosis & Action Plan" subtitle="Your customized financial intelligence output.">
            
            {/* TRUST LAYER */}
            <div className="bg-[#0A0F1C]/50 border border-white/5 p-4 rounded-xl mb-8 flex items-start gap-3">
              <ShieldAlert className="text-[#C6A85A] shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase font-bold tracking-widest">
                DISCLAIMER: This Innovate IndAI advisory is based on Indian dialysis operational benchmarks, standard PMJAY pricing structures, and industry maintenance contracts. It is a financial optimization model, not a clinical directive.
              </p>
            </div>

            {/* 1. CENTER HEALTH SCORE */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0D1525] p-5 rounded-2xl border border-white/5 text-center">
                <HeartPulse size={20} className="text-[#00A8A8] mx-auto mb-2" />
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Overall Health</p>
                <p className={`text-2xl font-black ${diagnosis.scores.overall < 50 ? "text-[#A6192E]" : "text-white"}`}>{diagnosis.scores.overall}/100</p>
              </div>
              <div className="bg-[#0D1525] p-5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Efficiency</p>
                <p className="text-xl font-black text-white">{diagnosis.scores.operational}/100</p>
              </div>
              <div className="bg-[#0D1525] p-5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Cost Control</p>
                <p className="text-xl font-black text-white">{diagnosis.scores.cost}/100</p>
              </div>
              <div className="bg-[#0D1525] p-5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Rev Stability</p>
                <p className="text-xl font-black text-white">{diagnosis.scores.stability}/100</p>
              </div>
            </div>

            {/* 2. BEFORE / AFTER PROFIT DELTA */}
            <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/30 p-8 rounded-[2rem] mb-8 relative overflow-hidden">
              <h3 className="text-sm font-black text-[#00A8A8] uppercase tracking-widest mb-6">Financial Recovery Potential (Monthly)</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Current Leakage</p>
                  <p className="text-3xl font-black text-[#A6192E]">{formatLakhs(diagnosis.totalMonthlyLeakage)}</p>
                </div>
                <ArrowRight className="text-gray-600" size={24} />
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Optimized Leakage</p>
                  <p className="text-3xl font-black text-white">{formatLakhs(diagnosis.optimizedLeakage)}</p>
                </div>
                <div className="text-right pl-6 border-l border-white/10">
                  <p className="text-[10px] text-[#C6A85A] font-bold uppercase mb-1">Net Improvement</p>
                  <p className="text-4xl font-black text-[#C6A85A]">{formatLakhs(diagnosis.netImprovement)}</p>
                </div>
              </div>
            </div>

            {/* 3. "WHAT TO DO FIRST" ENGINE */}
            <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 mb-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2"><ListChecks size={18} className="text-[#C6A85A]" /> First Actions (Next 30 Days)</h3>
              <div className="space-y-4">
                {diagnosis.topLeaks.map((leak, index) => (
                  <div key={index} className="flex gap-4 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center font-black text-[10px] text-gray-400 shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-bold text-white">{leak.category}</p>
                        <span className="text-xs font-black text-[#A6192E]">Losing {formatLakhs(leak.value)}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">👉 {leak.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={prevStep} className="px-6 py-5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all"><ArrowLeft size={18}/></button>
              <Link href="https://wa.me/919879576332?text=I%20need%20to%20execute%20my%20Profit%20Improvement%20Plan." target="_blank" className="flex-1">
                <button className="w-full bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all flex justify-center gap-2">Execute Recovery Plan <TrendingUp size={18}/></button>
              </Link>
            </div>
          </StepContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] py-24 px-6 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-12">
          <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
            <span>Consultant Diagnostic Engine</span>
            <span>Step {step} of 3</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#C6A85A]" initial={{ width: 0 }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepContainer({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4">{title}</h2>
      <p className="text-gray-400 text-lg font-medium leading-relaxed mb-8">{subtitle}</p>
      {children}
    </div>
  );
}