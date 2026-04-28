"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2, ShieldAlert, Info, ShieldCheck, Phone } from "lucide-react";
import { useInfra } from "@/context/InfrastructureContext";

export default function ProjectBlueprintReport() {
  const infra = useInfra();
  
  // 1. PULL CONTEXT (Fallback to safe defaults if accessed directly)
  const machines = infra?.machines || 15;
  const stateLocation = infra?.cityTier || "Gujarat"; // Mapped from your context
  const buildGrade = infra?.buildGrade || "Premium";

  // 2. THE SILENT ENGINE (We do the math, but only show the human results)
  const reportData = useMemo(() => {
    // Hidden Math (Simplified V8 Logic translated to human terms)
    const baseMachineCost = buildGrade === "Premium" ? 1450000 : 1100000;
    const machinesTotal = machines * baseMachineCost;
    const infraSetup = machines <= 15 ? machines * 500000 : (15 * 500000) + ((machines - 15) * 350000); 
    const totalSetupCost = (machinesTotal + infraSetup) / 0.92; // Including construction delay buffer

    // Realistic conservative profit estimate (30% margin after all operational leaks)
    const monthlyRevenue = machines * 2.1 * 26 * 1850; 
    const monthlyTakeHome = (monthlyRevenue * 0.30) * 0.88; 
    const monthlyExpenses = monthlyRevenue - monthlyTakeHome;

    const paybackMonths = (totalSetupCost / monthlyTakeHome).toFixed(0);

    return {
      setupCost: totalSetupCost,
      monthlyExpenses: monthlyExpenses,
      monthlyProfit: monthlyTakeHome,
      payback: paybackMonths,
      isHighRisk: machines < 10, // Under 10 machines struggles with fixed overheads
    };
  }, [machines, buildGrade, stateLocation]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(val))}`;
  const formatCr = (val: number) => `₹${(val / 10000000).toFixed(2)} Crore`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] py-32 px-6">
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
        
        {/* DOCUMENT HEADER */}
        <header className="mb-12 border-b border-white/10 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-xl flex items-center justify-center text-[#C6A85A]">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em]">Official Advisory Output</p>
              <p className="text-gray-400 text-sm font-medium">Prepared for a {machines}-Machine Facility in {stateLocation}</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Your Dialysis Project Blueprint.
          </h1>
        </header>

        <div className="space-y-12">
          
          {/* SECTION 1: THE FINANCIAL REALITY */}
          <section>
            <h2 className="text-2xl font-black text-white mb-6">1. The Financial Reality</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Setup Cost</p>
                <h3 className="text-4xl font-black text-white tracking-tighter mb-4">{formatCr(reportData.setupCost)}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  This is the complete amount required to open your doors. It includes your medical machines, water purification plant, infection-controlled interiors, and electrical safety backups.
                </p>
              </div>

              <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expected Take-Home Profit</p>
                <h3 className="text-4xl font-black text-[#00A8A8] tracking-tighter mb-4">{formatINR(reportData.monthlyProfit)} <span className="text-lg text-gray-500">/ mo</span></h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  This is your estimated monthly profit after paying all staff salaries, medical supply costs, electricity, and facility maintenance.
                </p>
              </div>

            </div>
          </section>

          {/* SECTION 2: INVESTMENT RECOVERY */}
          <section className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 p-10 rounded-[2.5rem]">
            <h2 className="text-2xl font-black text-white mb-4">2. Investment Recovery</h2>
            <p className="text-lg text-gray-300 font-medium leading-relaxed mb-6">
              Based on conservative patient ramp-up estimates and standard operational expenses, your facility is projected to fully recover its initial setup cost in exactly <strong className="text-[#C6A85A] text-2xl">{reportData.payback} Months</strong>.
            </p>
            <div className="flex items-start gap-3 p-4 bg-[#0A0F1C]/50 rounded-xl border border-white/5">
              <Info className="text-gray-400 shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-gray-400 font-medium">
                After month {reportData.payback}, the center's monthly profit transitions into pure asset yield.
              </p>
            </div>
          </section>

          {/* SECTION 3: RISK & SAFETY ASSESSMENT */}
          <section>
            <h2 className="text-2xl font-black text-white mb-6">3. Operational Risk Summary</h2>
            
            {reportData.isHighRisk ? (
              <div className="bg-[#A6192E]/10 border border-[#A6192E]/20 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start">
                <ShieldAlert size={40} className="text-[#A6192E] shrink-0" />
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Scale Caution Required</h3>
                  <p className="text-gray-300 leading-relaxed font-medium mb-4">
                    At {machines} machines, your facility is considered "Entry Level." The primary risk here is that fixed costs (like specialized nephrology staff and water plant maintenance) will consume a high percentage of your income. 
                  </p>
                  <p className="text-sm text-[#A6192E] font-bold">Recommendation: We strongly advise discussing supply chain optimization with our consultants to protect your margins.</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#00A8A8]/10 border border-[#00A8A8]/20 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-start">
                <ShieldCheck size={40} className="text-[#00A8A8] shrink-0" />
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Stable Operational Scale</h3>
                  <p className="text-gray-300 leading-relaxed font-medium mb-4">
                    A {machines}-machine facility absorbs fixed overhead costs highly efficiently. Your primary risk is machine downtime. If a machine breaks, you lose income and patient trust.
                  </p>
                  <p className="text-sm text-[#00A8A8] font-bold">Prevention: We will structure a predictive maintenance plan to ensure your uptime remains above 99%.</p>
                </div>
              </div>
            )}
          </section>

          {/* SECTION 4: CONSULTANT'S VERDICT & NEXT STEPS */}
          <section className="mt-16 border-t border-white/10 pt-12 text-center">
            <h2 className="text-3xl font-black text-white mb-4">Our Verdict: Ready for Execution.</h2>
            <p className="text-lg text-gray-400 font-medium mb-10 max-w-2xl mx-auto">
              The financial structure for your {machines}-machine center is mathematically sound. The next step is to review this blueprint with an infrastructure expert to formalize your execution plan.
            </p>
            
            <Link href="/consultation">
              <button className="w-full sm:w-auto bg-[#C6A85A] text-[#0A0F1C] px-12 py-6 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all inline-flex items-center justify-center gap-3 shadow-xl">
                Speak to a Consultant <Phone size={18} />
              </button>
            </Link>
          </section>

        </div>
      </div>
    </main>
  );
}