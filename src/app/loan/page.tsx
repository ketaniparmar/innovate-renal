"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Landmark, FileText, ChevronRight, AlertCircle, CheckCircle2, TrendingDown } from "lucide-react";
import { useInfra } from "@/context/InfrastructureContext";

export default function LoanUnderwritingPage() {
  const infra = useInfra();
  
  // 1. Pull Global State (Synchronized from CAPEX Page)
  const machines = infra?.machines || 15;
  const buildGrade = infra?.buildGrade || "Premium";
  const cityTier = infra?.cityTier || "Tier 2";

  // 2. Financing Parameters
  const [loanPercentage, setLoanPercentage] = useState(70); // Bank funds 70%
  const [interestRate, setInterestRate] = useState(10.5); // 10.5% standard medical eq rate
  const [tenureYears, setTenureYears] = useState(5); // 5 Year term

  const financialModel = useMemo(() => {
    // Reconstruct CAPEX & Profit from global state
    const baseCost = buildGrade === "Premium" ? 1450000 : 1100000;
    const machinesTotal = machines * baseCost;
    const infraCapex = machines <= 15 ? machines * 500000 : (15 * 500000) + ((machines - 15) * 350000); 
    const totalCapex = (machinesTotal + infraCapex) / 0.92; // Including Capital Drag
    
    // Estimate Steady State Monthly Profit (Conservative 30% margin)
    const monthlyRev = machines * 2.1 * 26 * 1850; 
    const netMonthlyOperatingIncome = (monthlyRev * 0.30) * 0.88; // NOI after inefficiency floor

    // LOAN MATH
    const principal = totalCapex * (loanPercentage / 100);
    const downPayment = totalCapex - principal;
    
    // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const r = (interestRate / 100) / 12;
    const n = tenureYears * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // DSCR (Debt Service Coverage Ratio) = NOI / Debt Service
    // Banks typically want DSCR > 1.25
    const dscr = netMonthlyOperatingIncome / emi;
    const isFundable = dscr >= 1.25;

    return { 
      totalCapex, principal, downPayment, emi, dscr, isFundable, netMonthlyOperatingIncome 
    };
  }, [machines, buildGrade, cityTier, loanPercentage, interestRate, tenureYears]);

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(val))}`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 px-6 text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom duration-500">
        
        <header className="text-center mb-16">
          <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-4">Bank DPR Preparation</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
            Medical Equipment <br/>
            <span className="text-[#C6A85A]">Loan Feasibility</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Configure your debt structure. We automatically calculate your EMI and Debt Service Coverage Ratio (DSCR) to ensure your dialysis project clears bank underwriting standards.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: FINANCIAL CONTROLS */}
          <div className="lg:col-span-5 space-y-8 bg-[#0D1525] p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-xl">
            
            <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5 mb-8">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Synced Project Size</p>
              <p className="text-xl font-black text-white">{machines} Machines <span className="text-gray-500 text-sm font-medium">({buildGrade})</span></p>
              <p className="text-xs text-[#00A8A8] font-bold mt-2">CAPEX: {formatINR(financialModel.totalCapex)}</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">LTV (Bank Funding %)</label>
                <span className="text-lg font-black text-white">{loanPercentage}%</span>
              </div>
              <input type="range" min="50" max="85" step="5" value={loanPercentage} onChange={(e) => setLoanPercentage(Number(e.target.value))} className="w-full accent-[#C6A85A]" />
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Interest Rate</label>
                <span className="text-lg font-black text-white">{interestRate}%</span>
              </div>
              <input type="range" min="8.5" max="14.0" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-[#C6A85A]" />
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">Loan Tenure</label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 7].map(y => (
                  <button key={y} onClick={() => setTenureYears(y)} className={`py-3 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all ${tenureYears === y ? 'bg-white text-[#0A0F1C] border-white' : 'bg-[#0A0F1C] text-gray-400 border-white/5'}`}>
                    {y} Years
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: BANK OUTPUT */}
          <div className="lg:col-span-7 bg-[#0D1525] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Landmark size={200} /></div>

            <div className="grid sm:grid-cols-2 gap-8 mb-10 relative z-10 border-b border-white/5 pb-10">
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Required Down Payment</p>
                <h2 className="text-4xl font-black text-white tracking-tighter tabular-nums">{formatINR(financialModel.downPayment)}</h2>
                <p className="text-[10px] text-gray-400 font-medium mt-2">Director's Capital Contribution</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] text-[#A6192E] font-black uppercase tracking-widest mb-2">Monthly EMI Liability</p>
                <h2 className="text-4xl font-black text-[#A6192E] tracking-tighter tabular-nums">{formatINR(financialModel.emi)}</h2>
                <p className="text-[10px] text-gray-400 font-medium mt-2">Over {tenureYears * 12} Months</p>
              </div>
            </div>

            <div className="relative z-10 mb-10">
              <div className={`p-6 rounded-2xl border flex items-start gap-4 ${financialModel.isFundable ? 'bg-[#00A8A8]/10 border-[#00A8A8]/20' : 'bg-[#A6192E]/10 border-[#A6192E]/20'}`}>
                {financialModel.isFundable ? <CheckCircle2 className="text-[#00A8A8] shrink-0 mt-1" size={24} /> : <TrendingDown className="text-[#A6192E] shrink-0 mt-1" size={24} />}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${financialModel.isFundable ? 'text-[#00A8A8]' : 'text-[#A6192E]'}`}>
                      Bank DSCR Rating: {financialModel.dscr.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-medium">
                    {financialModel.isFundable 
                      ? "Your projected Net Operating Income comfortably covers your EMI. This project structure is highly favorable for medical infrastructure funding."
                      : "Warning: Your DSCR is below 1.25. The monthly EMI is dangerously close to your net income. Consider increasing down payment or loan tenure."}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-8">
              <Link href="https://wa.me/919879576332?text=I%20have%20completed%20the%20Loan%20Feasibility%20calculation.%20I%20need%20help%20drafting%20my%20Bank%20DPR." target="_blank" className="w-full sm:flex-1">
                <button className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 px-4 rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] md:text-xs shadow-xl flex items-center justify-center gap-2 transition-all">
                  <FileText size={16} /> Request Bank DPR Format
                </button>
              </Link>
              <Link href="/risk-control" className="w-full sm:flex-1">
                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 px-4 rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] md:text-xs transition-all flex items-center justify-center gap-2">
                  View Operational Risks <ChevronRight size={16} />
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}