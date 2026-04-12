"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, IndianRupee, Info, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CalculatorSEOPage() {
  const [beds, setBeds] = useState(5);
  
  // SEO-friendly dynamic math
  const estCost = (beds * 7.5).toFixed(1); // approx 7.5L per bed fully loaded

  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-20">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* LEFT: SEO CONTENT SIDE */}
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">
            Dialysis Center <br/> <span className="text-[#3B82F6]">Setup Cost 2026.</span>
          </h1>
          
          <div className="prose prose-invert prose-sm max-w-none text-gray-400">
            <p className="text-lg mb-6">
              Planning a dialysis unit in India requires balancing high-quality clinical care with financial sustainability. 
              The average cost to start a 5-bed dialysis center ranges from <strong>₹35 Lakhs to ₹50 Lakhs</strong> depending on the RO plant capacity and civil works.
            </p>
            
            <h3 className="text-white text-xl font-bold mt-10 mb-4">Breakdown of Major Expenses</h3>
            <ul className="space-y-4 mb-10">
              <li className="flex gap-3"><CheckCircle2 className="text-[#3B82F6] shrink-0" size={20} /> <span><strong>Equipment:</strong> Diacare machines and high-flux dialyzers.</span></li>
              <li className="flex gap-3"><CheckCircle2 className="text-[#3B82F6] shrink-0" size={20} /> <span><strong>Water Treatment:</strong> Double-pass RO systems are now industry standard.</span></li>
              <li className="flex gap-3"><CheckCircle2 className="text-[#3B82F6] shrink-0" size={20} /> <span><strong>Compliance:</strong> NABH zoning and fire-safety certifications.</span></li>
            </ul>

            <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 p-6 rounded-2xl">
              <h4 className="text-[#3B82F6] font-bold mb-2">Pro Tip for Investors</h4>
              <p className="m-0 italic">AMC costs can consume up to 15% of your annual OPEX. Opting for a Comprehensive Maintenance Contract (CMC) at the time of purchase can save nearly ₹2 Lakhs per machine over 5 years.</p>
            </div>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE TOOL SIDE */}
        <div className="order-1 lg:order-2 sticky top-32">
          <div className="glass p-8 md:p-12 rounded-[2.5rem] border-[#3B82F6]/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="text-[#3B82F6]" size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Setup Estimator</h2>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Number of Beds</label>
                <span className="text-3xl font-black text-white">{beds}</span>
              </div>
              <input 
                type="range" min="3" max="50" value={beds} 
                onChange={(e) => setBeds(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-bold uppercase">
                <span>Min: 3</span>
                <span>Max: 50</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-8">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Estimated CAPEX (India)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">₹{estCost}L</span>
                <span className="text-gray-500 text-sm font-bold">Approx.</span>
              </div>
            </div>

            <Link href="/contact">
              <button className="w-full bg-[#3B82F6] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 group">
                Request Detailed Budget <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <p className="text-[10px] text-gray-600 text-center mt-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <Info size={12} /> Includes Machines, RO & Basic Infrastructure
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}