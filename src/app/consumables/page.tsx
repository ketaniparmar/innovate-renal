"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, ArrowRight, ShieldCheck, TrendingDown, 
  Droplets, Zap, CheckCircle2, Phone
} from "lucide-react";
import Link from "next/link";

export default function ConsumablesSupplyPage() {
  // Calculator State
  const [monthlySessions, setMonthlySessions] = useState(500);
  
  // The Math: Reuse equivalent cost (₹600) - Single-Use PMJAY Cost (₹400) = ₹200 savings/session
  const SAVINGS_PER_SESSION = 200; 
  const monthlySavings = monthlySessions * SAVINGS_PER_SESSION;
  const yearlySavings = monthlySavings * 12;

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;
  const formatLakhs = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= HERO SECTION ================= */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C6A85A]/30 bg-[#C6A85A]/10 mb-6">
            <Package size={14} className="text-[#C6A85A]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C6A85A]">Direct Procurement Network</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-white">
            Medical-Grade Supply. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">PMJAY-Aligned Pricing.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
            Stop losing ₹200 per session to hidden dialyzer reprocessing overhead. We supply premium single-use dialysis kits engineered to protect your clinical margins.
          </p>
          <div className="flex justify-center">
            <Link 
              href={`https://wa.me/919879576332?text=I%20want%20to%20order%20the%20%E2%82%B9400%20Single-Use%20Dialysis%20Consumable%20Kits.%20My%20volume%20is%20${monthlySessions}%20sessions/month.`}
              target="_blank"
              className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(198,168,90,0.2)]"
            >
              Order Bulk Supply Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ================= THE MATH (PROBLEM VS SOLUTION) ================= */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-10 rounded-[2.5rem]">
            <div className="flex items-center gap-4 mb-6">
              <TrendingDown className="text-[#A6192E]" size={32} />
              <h2 className="text-2xl font-black text-white tracking-tight">The Legacy Reuse Trap</h2>
            </div>
            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">
              Many facilities believe washing and reusing dialyzers saves money. However, when factoring in RO water, chemical sterilants, technician time, and infection cross-contamination risks, the true operational cost skyrockets.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Equivalent Cost</span>
                <span className="text-xl font-black text-[#A6192E]">₹600+ / session</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Infection Risk</span>
                <span className="text-sm font-black text-white">High (Cross-contamination)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Hidden Overhead</span>
                <span className="text-sm font-black text-white">Water, Labor, Chemicals</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/30 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <ShieldCheck className="text-[#00A8A8]" size={32} />
              <h2 className="text-2xl font-black text-white tracking-tight">The Single-Use Benchmark</h2>
            </div>
            <p className="text-gray-300 text-sm font-medium leading-relaxed mb-8">
              We supply the complete single-use bundle (High-Flux Dialyzer + Blood Tubing Set + AV Fistula Needle + Transducer Protector) capped at the PMJAY reimbursement standard. Predictable costs. Zero hidden overhead.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Fixed Supply Cost</span>
                <span className="text-2xl font-black text-[#00A8A8]">₹400 / kit</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Clinical Safety</span>
                <span className="text-sm font-black text-white">100% Sterile (Zero Reuse)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Labor Impact</span>
                <span className="text-sm font-black text-[#C6A85A]">Zero Processing Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ROI SAVINGS CALCULATOR ================= */}
        <div className="bg-[#0D1525] border border-white/10 rounded-[3rem] p-10 md:p-16 mb-24 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-[#C6A85A]/5 to-transparent pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-[#C6A85A]" size={24} />
                <h3 className="text-2xl font-black text-white tracking-tight">Calculate Your Savings</h3>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10">
                Adjust the slider below based on your current monthly patient load. See exactly how much cash you recover by switching from a legacy reuse model to our optimized single-use supply chain.
              </p>

              <div className="bg-[#0A0F1C] p-8 rounded-3xl border border-white/5">
                <div className="flex justify-between mb-6">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Monthly Sessions</span>
                  <span className="text-2xl font-black text-white">{monthlySessions}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="3000" 
                  step="50" 
                  value={monthlySessions} 
                  onChange={(e) => setMonthlySessions(Number(e.target.value))} 
                  className="w-full accent-[#C6A85A]" 
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Monthly Cash Recovered</p>
                <p className="text-5xl font-black text-white tracking-tighter">{formatCurrency(monthlySavings)}</p>
              </div>
              <div className="border-t border-white/10 pt-8">
                <p className="text-[10px] text-[#C6A85A] font-bold uppercase tracking-widest mb-2">Annual Bottom-Line Impact</p>
                <p className="text-6xl font-black text-[#C6A85A] tracking-tighter">{formatLakhs(yearlySavings)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= WHAT'S IN THE BOX ================= */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-12">The ₹400 Standard Kit</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["High-Flux Dialyzer", "A/V Blood Tubing Set", "AV Fistula Needles", "Transducer Protectors"].map((item, i) => (
              <div key={i} className="bg-[#0D1525] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                <Droplets className="text-[#00A8A8] mb-4" size={24} />
                <span className="text-sm font-bold text-white tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FINAL CTA ================= */}
        <div className="text-center">
          <Link 
            href={`https://wa.me/919879576332?text=I%20want%20to%20order%20the%20%E2%82%B9400%20Single-Use%20Dialysis%20Consumable%20Kits.%20My%20volume%20is%20${monthlySessions}%20sessions/month.`}
            target="_blank"
            className="inline-flex w-full sm:w-auto bg-[#00A8A8] text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-teal-500 transition-all items-center justify-center gap-3 shadow-xl"
          >
            Connect to Supply Desk <Phone size={18} />
          </Link>
        </div>

      </div>
    </main>
  );
}