"use client";

import React, { useState } from "react";
import { Calculator, IndianRupee, Info, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function CalculatorSEOPage() {
  const [beds, setBeds] = useState(5);
  
  // SEO-friendly dynamic math (Simulated base logic)
  const estCost = (beds * 7.5).toFixed(1); 

  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-32 text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start relative">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

        {/* LEFT: SEO CONTENT SIDE */}
        <article className="order-2 lg:order-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-600/30 bg-gray-500/10 mb-6">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Resource Hub</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
            Dialysis Center <br/> <span className="text-[#3B82F6]">Setup Cost 2026.</span>
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-400 leading-relaxed">
            <p className="mb-8">
              Planning a new dialysis unit in India requires balancing high-quality clinical care with strict financial sustainability. 
              The average initial capital expenditure to start a standard 5-bed dialysis center ranges from <strong>₹35 Lakhs to ₹50 Lakhs</strong>, largely dependent on your choice of RO plant capacity and mandatory civil compliance works.
            </p>
            
            <h3 className="text-2xl text-white font-extrabold mt-12 mb-6 tracking-tight">Breakdown of Major Expenses</h3>
            <ul className="space-y-4 mb-12 list-none pl-0">
              <li className="flex gap-4 items-start">
                <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-1" size={20} /> 
                <span><strong className="text-gray-200">Medical Equipment:</strong> Procurement of Hemodialysis machines (e.g., Diacare) and high-flux dialyzers.</span>
              </li>
              <li className="flex gap-4 items-start">
                <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-1" size={20} /> 
                <span><strong className="text-gray-200">Water Treatment:</strong> Double-pass medical RO systems (500 LPH minimum) are now the industry standard for patient safety.</span>
              </li>
              <li className="flex gap-4 items-start">
                <CheckCircle2 className="text-[#3B82F6] shrink-0 mt-1" size={20} /> 
                <span><strong className="text-gray-200">Regulatory Compliance:</strong> NABH zoning configurations, PPCB approvals, and fire-safety certifications.</span>
              </li>
            </ul>

            <div className="bg-[#3B82F6]/10 border border-[#3B82F6]/20 p-8 rounded-[2rem] mt-8">
              <h4 className="text-[#3B82F6] font-bold mb-3 text-lg">Strategic Pro Tip for Investors</h4>
              <p className="m-0 text-sm leading-relaxed text-gray-300">
                AMC costs can consume up to 15% of your annual OPEX. Opting for a Comprehensive Maintenance Contract (CMC) at the time of initial purchase locks in your operating expenses and can save nearly ₹2 Lakhs per machine over a 5-year lifecycle.
              </p>
            </div>
          </div>
        </article>

        {/* RIGHT: INTERACTIVE TOOL SIDE */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-32 relative z-10">
          <GlassCard accent="blue" interactive={false} className="p-8 md:p-12 shadow-[0_0_50px_rgba(59,130,246,0.15)] border-[#3B82F6]/30 bg-white/[0.01]">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                <Calculator className="text-[#3B82F6]" size={24} />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Setup Estimator</h2>
            </div>

            <div className="mb-12">
              <div className="flex justify-between items-end mb-6">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Required Capacity</label>
                <span className="text-4xl font-black text-white tracking-tighter">{beds} <span className="text-xl text-gray-500">Beds</span></span>
              </div>
              <input 
                type="range" min="3" max="50" value={beds} 
                onChange={(e) => setBeds(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <div className="flex justify-between mt-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <span>Min: 3 Units</span>
                <span>Max: 50 Units</span>
              </div>
            </div>

            <div className="bg-[#010810] rounded-2xl p-8 border border-white/10 mb-10 shadow-inner">
              <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-[0.2em] mb-2">Estimated CAPEX (India)</p>
              <div className="flex items-baseline gap-2">
                <IndianRupee size={32} className="text-white opacity-50" />
                <span className="text-5xl font-black text-white tracking-tighter">{estCost}L</span>
              </div>
            </div>

            <Link href="/contact">
              <button className="w-full bg-[#3B82F6] text-[#010810] py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3 group">
                Request Detailed Budget <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <p className="text-[10px] text-gray-500 text-center mt-8 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <Info size={14} className="text-gray-600" /> Includes Machines, RO & Basic Infrastructure
            </p>
          </GlassCard>
        </div>

      </div>
    </main>
  );
}