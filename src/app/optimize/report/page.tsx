"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FileSearch, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle, Phone, ShieldCheck } from "lucide-react";

function ReportContent() {
  const searchParams = useSearchParams();
  const machines = Number(searchParams.get("m")) || 10;
  const state = searchParams.get("s") || "Maharashtra";
  const maintenance = searchParams.get("amc") || "On-Call / None";
  const consumableMode = searchParams.get("c") || "Reuse"; // Add this to your audit form if not present

  const reportData = useMemo(() => {
    const sessionsPerYear = machines * 2.5 * 26 * 12; 
    const avgRevenuePerSession = 1850;
    const baseRevenue = sessionsPerYear * avgRevenuePerSession;

    // AMC vs CMC Logic (Using exact user IP)
    let downtimeLossPct = 0.02; // CMC
    let maintenanceCost = 45000 * machines;
    
    if (maintenance === "AMC") {
      downtimeLossPct = 0.05;
      maintenanceCost = 25000 * machines;
    }
    if (maintenance === "On-Call / None") {
      downtimeLossPct = 0.12;
      maintenanceCost = 10000 * machines; // Underbudgeted but risky
    }

    const unrecoveredRevenue = baseRevenue * downtimeLossPct;

    // Consumable Logic (Single-use vs Reuse)
    const strictStates = ["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"];
    const isSingleUseMandated = strictStates.includes(state);
    
    // If they use Reuse in a mandated state, highlight severe risk.
    const isComplianceRisk = isSingleUseMandated && consumableMode === "Reuse";

    // Expected vs Actual Benchmark Leakage
    // If they are spending ₹600 on reuse but could be spending ₹400 on single-use bundle
    const potentialConsumableSavings = consumableMode === "Reuse" ? sessionsPerYear * 200 : sessionsPerYear * 40; 
    
    // EEI Insurance Rule (1%)
    const eeiInsurance = 8000 * machines; 

    return {
      sessionsPerYear,
      unrecoveredRevenue,
      consumableLeakage: potentialConsumableSavings,
      totalAnnualLeakage: unrecoveredRevenue + potentialConsumableSavings,
      isSingleUseMandated,
      isComplianceRisk,
      downtimeLossPct: (downtimeLossPct * 100).toFixed(0),
      maintenance,
      maintenanceCost,
      eeiInsurance
    };
  }, [machines, state, maintenance, consumableMode]);

  const formatLakhs = (val: number) => `₹${(val / 100000).toFixed(2)} Lakhs`;
  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN").format(Math.round(val))}`;

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      
      <header className="mb-12 border-b border-white/10 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#A6192E]/10 border border-[#A6192E]/30 rounded-xl flex items-center justify-center text-[#A6192E]">
            <FileSearch size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-[#A6192E] tracking-[0.2em]">Operational Leakage Audit</p>
            <p className="text-gray-400 text-sm font-medium">Prepared for a {machines}-Machine Facility in {state}</p>
          </div>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter leading-tight">
          Your Profit Recovery Report.
        </h1>
      </header>

      <div className="space-y-12">
        
        {/* ASSUMPTION MODEL OVERVIEW (MANDATORY RULE ENFORCEMENT) */}
        <section className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#0D1525] p-6 rounded-2xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Consumable Benchmark</p>
            <p className="text-lg text-white font-black">{reportData.isSingleUseMandated ? "Single-Use PMJAY" : consumableMode}</p>
            <p className="text-xs text-[#00A8A8] mt-1 font-bold">Target: {reportData.isSingleUseMandated ? "₹400 / session" : "₹600+ / session"}</p>
          </div>
          <div className="bg-[#0D1525] p-6 rounded-2xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Maintenance Structure</p>
            <p className="text-lg text-white font-black">{reportData.maintenance}</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">Est. Cost: {formatINR(reportData.maintenanceCost)} / yr</p>
          </div>
          <div className="bg-[#0D1525] p-6 rounded-2xl border border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">EEI Insurance (1% Capex)</p>
            <p className="text-lg text-white font-black">{formatINR(reportData.eeiInsurance)} / yr</p>
            <p className="text-xs text-gray-400 mt-1 font-medium">Equipment Protection Active</p>
          </div>
        </section>

        {/* THE FINANCIAL BLEED */}
        <section className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-8 rounded-[2.5rem]">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <AlertTriangle className="text-[#A6192E]" /> Annual Profit Leakage
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Unrecovered Revenue (Downtime)</p>
              <h3 className="text-4xl font-black text-[#A6192E] tracking-tighter mb-2">{formatLakhs(reportData.unrecoveredRevenue)}</h3>
              <p className="text-sm text-gray-400 font-medium">
                With a {reportData.downtimeLossPct}% machine downtime rate (standard for {reportData.maintenance}), every missed shift is unrecoverable income.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Consumable Margin Loss</p>
              <h3 className="text-4xl font-black text-[#A6192E] tracking-tighter mb-2">{formatLakhs(reportData.consumableLeakage)}</h3>
              <p className="text-sm text-gray-400 font-medium">
                {consumableMode === "Reuse" ? "Legacy reuse economics (₹600+) create massive margin loss compared to modern single-use bundles (₹400)." : "Untracked per-session consumption and poor vendor pricing slowly destroys your margin."}
              </p>
            </div>
          </div>

          <div className="bg-[#0A0F1C] border border-white/5 p-6 rounded-2xl flex items-center justify-between">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Estimated Leakage</span>
            <span className="text-3xl font-black text-white">{formatLakhs(reportData.totalAnnualLeakage)} <span className="text-sm text-gray-500">/ Year</span></span>
          </div>
        </section>

        {/* COMPLIANCE RISK */}
        {reportData.isComplianceRisk && (
          <section className="bg-[#A6192E]/10 border border-[#A6192E]/20 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start">
            <ShieldAlert size={40} className="text-[#A6192E] shrink-0" />
            <div>
              <h3 className="text-xl font-black text-white mb-2">Critical PM-JAY Compliance Risk</h3>
              <p className="text-gray-300 leading-relaxed font-medium mb-4">
                You indicated a Reuse model in <strong>{state}</strong>. State protocol heavily restricts or mandates Single-Use consumables for regulated/PM-JAY setups. Utilizing a ₹600+ reuse framework here causes immediate margin destruction and regulatory risk.
              </p>
            </div>
          </section>
        )}

        {/* CONSULTANT HANDOFF */}
        <section className="mt-16 text-center">
          <Link href={`https://wa.me/919879576332?text=${encodeURIComponent("I need an operational recovery plan. My audit shows " + formatLakhs(reportData.totalAnnualLeakage) + " in leakage.")}`} target="_blank">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-12 py-6 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all inline-flex items-center gap-3">
              Discuss Recovery Plan <Phone size={18} />
            </button>
          </Link>
        </section>

      </div>
    </div>
  );
}

export default function OptimizationReportPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] py-32 px-6">
      <Suspense fallback={<p className="text-white text-center">Loading Audit...</p>}>
        <ReportContent />
      </Suspense>
    </main>
  );
}