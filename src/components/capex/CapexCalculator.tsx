"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, TrendingUp, AlertTriangle, Database } from "lucide-react";
import { useInfra } from "@/context/InfrastructureContext";

export default function CapexCalculator() {
  const router = useRouter();
  const infra = useInfra();
  
  // Pull from Global Context to ensure cross-page synchronization
  const machines = infra?.machines || 15;
  const setMachines = infra?.setMachines || (() => {});

  const [grade, setGrade] = useState<"Standard" | "Premium">("Premium");

  const calc = useMemo(() => {
    // 1. DYNAMIC CAPEX ENGINE
    const baseCost = grade === "Premium" ? 1450000 : 1100000;
    const machinesTotal = machines * baseCost;
    const infraTotal = machines * 450000; // Civil + Electrical + Furniture
    const totalCapex = machinesTotal + infraTotal;

    // 2. CFO REALISM: THE RAMP-UP CURVE (Months 1-12)
    const avgWAR = 1850;
    const yearlyRev = (machines * 2.5 * 26 * 12) * avgWAR;
    
    // 65% ramp-up penalty, 40% operating margin, 12% operational inefficiency floor
    const year1Profit = (yearlyRev * 0.65 * 0.40) * 0.88; 
    
    const payback = (totalCapex / (year1Profit / 12)).toFixed(1);

    return { totalCapex, year1Profit, payback };
  }, [machines, grade]);

  const handleCaptureAndNavigate = async () => {
    // DATA PERSISTENCE: Background Lead Capture (Fails silently if endpoint not ready)
    try {
      await fetch("/api/capture", {
        method: "POST",
        body: JSON.stringify({ machines, grade, result: calc }),
      });
    } catch (e) {
      console.warn("Capture endpoint pending - proceeding to funnel.");
    }
    // FORCED PROGRESSION: Push to next logical step
    router.push("/risk-control");
  };

  const formatINR = (val: number) => 
    `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(val))}`;

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom duration-500 delay-100">
      
      {/* INPUTS PANEL */}
      <div className="lg:col-span-1 space-y-8 bg-[#0D1525] p-10 rounded-[3rem] border border-white/5 shadow-xl">
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">
            Fleet Scale
          </label>
          <input 
            type="range" min="5" max="50" value={machines} 
            onChange={(e) => setMachines(Number(e.target.value))}
            className="w-full accent-[#C6A85A] cursor-pointer"
          />
          <p className="text-right text-white font-black mt-2">{machines} Units</p>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">
            Asset Grade
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Standard", "Premium"].map(g => (
              <button 
                key={g} onClick={() => setGrade(g as any)}
                className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${grade === g ? 'bg-[#C6A85A] text-[#0A0F1C] border-[#C6A85A]' : 'bg-[#0A0F1C] text-gray-500 border-white/5 hover:border-white/20'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULT PANEL */}
      <div className="lg:col-span-2 bg-[#0D1525] border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Database size={150} /></div>

        <div className="grid sm:grid-cols-2 gap-12 mb-12 border-b border-white/5 pb-12 relative z-10">
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-3">Projected CAPEX</p>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums">{formatINR(calc.totalCapex)}</h2>
          </div>
          <div className="sm:text-right">
            <p className="text-[10px] text-[#00A8A8] font-black uppercase tracking-widest mb-3">Conservative Payback</p>
            <h2 className="text-5xl font-black text-[#00A8A8] tracking-tighter tabular-nums">{calc.payback} Months</h2>
          </div>
        </div>

        <div className="relative z-10">
          {/* SURFACING THE FORMULA (Trust Logic) */}
          <div className="mb-10 text-center">
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.3em] mb-3">Auditable ROI Logic</p>
            <div className="bg-[#0A0F1C] py-4 rounded-xl border border-white/5">
              <span className="text-gray-400 text-xs italic font-serif tracking-wide">
                Payback = Total CAPEX ÷ (Adjusted Annual Profit ÷ 12)
              </span>
            </div>
          </div>

          <div className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-6 rounded-2xl mb-12">
            <p className="text-xs text-gray-400 leading-relaxed font-medium flex items-start gap-3">
              <AlertTriangle className="text-[#A6192E] shrink-0 mt-0.5" size={18} />
              <span>
                <strong>Market Calibration:</strong> Unlike standard calculators, this engine enforces a 12% operational inefficiency floor and a 65% Year-1 ramp-up curve.
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleCaptureAndNavigate}
              className="w-full sm:flex-1 bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 px-6 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] md:text-xs shadow-xl flex items-center justify-center gap-3 transition-all"
            >
              Model Risk Exposure <TrendingUp size={16} />
            </button>
            <Link href="/os" className="w-full sm:flex-1">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 px-6 rounded-2xl font-black uppercase tracking-[0.15em] text-[10px] md:text-xs transition-all flex items-center justify-center gap-3">
                Full Assessment <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}