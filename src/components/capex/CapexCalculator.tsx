"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TrendingUp, AlertTriangle, Database, Activity, MapPin, Calculator, Loader2 } from "lucide-react";
import { useInfra } from "@/context/InfrastructureContext";

// 🚀 THE FIX: Explicitly type the props for TypeScript
interface CapexCalculatorProps {
  initialMachines?: number;
}

export default function CapexCalculator({ initialMachines }: CapexCalculatorProps) {
  const router = useRouter();
  const infra = useInfra();
  
  if (!infra) console.error("CRITICAL: InfrastructureContext missing. Wrapping layout required.");
  
  const machines = infra?.machines || 15;
  const setMachines = infra?.setMachines || (() => {});
  
  // 🚀 SYNC URL PARAM TO STATE
  useEffect(() => {
    if (initialMachines && initialMachines !== machines) {
      setMachines(initialMachines);
    }
  }, [initialMachines, setMachines, machines]);

  const [grade, setGrade] = useState<"Standard" | "Premium">("Premium");
  const [modelType, setModelType] = useState<"Govt/PPP" | "Mixed" | "Premium Pvt">("Mixed");
  const [cityTier, setCityTier] = useState<"Tier 1" | "Tier 2/3">("Tier 2/3");
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    localStorage.setItem("capexState", JSON.stringify({ machines, grade, modelType, cityTier }));
  }, [machines, grade, modelType, cityTier]);

  const calc = useMemo(() => {
    const baseWAR = { "Govt/PPP": 1400, "Mixed": 1850, "Premium Pvt": 2600 }[modelType];
    
    const marginMap = {
      "Govt/PPP": cityTier === "Tier 1" ? 0.22 : 0.30,
      "Mixed":    cityTier === "Tier 1" ? 0.28 : 0.38,
      "Premium Pvt": cityTier === "Tier 1" ? 0.35 : 0.42,
    };
    const ebitdaMargin = marginMap[modelType];
    
    const baseMachineCost = grade === "Premium" ? 1450000 : 1100000;
    const machinesTotal = machines * baseMachineCost;
    
    const infraCapex = machines <= 15 
      ? machines * 500000 
      : (15 * 500000) + ((machines - 15) * 350000); 
      
    const rawTotalCapex = machinesTotal + infraCapex;
    const delayFactor = 0.92; 
    const totalCapex = rawTotalCapex / delayFactor;

    const baseCycles = modelType === "Govt/PPP" ? 1.6 : 1.9;
    const avgCycles = baseCycles + (machines > 20 ? 0.5 : 0.2);
    
    const yearlyRev = (machines * avgCycles * 26 * 12) * baseWAR;
    
    const year1Profit = (yearlyRev * 0.65 * ebitdaMargin) * 0.88; 
    const steadyStateProfit = (yearlyRev * ebitdaMargin) * 0.88;

    const paybackYear1 = (totalCapex / (year1Profit / 12)).toFixed(1);
    const paybackSteady = (totalCapex / (steadyStateProfit / 12)).toFixed(1);

    return { totalCapex, year1Profit, steadyStateProfit, paybackYear1, paybackSteady, baseWAR, ebitdaMargin };
  }, [machines, grade, modelType, cityTier]);

  const handleCapture = (e: React.MouseEvent) => {
    setIsCapturing(true);
    fetch("/api/capture", {
      method: "POST",
      body: JSON.stringify({ machines, grade, modelType, cityTier, result: calc }),
    }).catch(() => console.warn("Silent capture fail"));
  };

  const formatINR = (val: number) => `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(val))}`;

  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom duration-500 delay-100">
      
      <div className="lg:col-span-5 space-y-8 bg-[#0D1525] p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-xl">
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Activity size={14} className="text-[#00A8A8]" /> Fleet Scale
            </label>
            <span className="text-xl font-black text-white">{machines} Units</span>
          </div>
          <input 
            type="range" min="5" max="50" value={machines} 
            onChange={(e) => setMachines(Number(e.target.value))}
            className="w-full accent-[#C6A85A] cursor-pointer"
          />
          <p className="text-[9px] text-[#00A8A8] font-bold tracking-widest uppercase mt-3">
            {machines < 12 ? "Entry Level Setup" : machines > 25 ? "Corporate Hub Scale" : "Recommended: 12-20 for Tier-2"}
          </p>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Calculator size={14} className="text-[#C6A85A]" /> Patient Mix (WAR)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {["Govt/PPP", "Mixed", "Premium Pvt"].map(m => (
              <button 
                key={m} onClick={() => setModelType(m as any)}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${modelType === m ? 'bg-[#C6A85A] text-[#0A0F1C] border-[#C6A85A]' : 'bg-[#0A0F1C] text-gray-400 border-white/5 hover:border-white/20'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-3 font-medium">Higher WAR increases revenue ceiling but may introduce occupancy volatility.</p>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <MapPin size={14} className="text-[#00A8A8]" /> Location Economics
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Tier 1", "Tier 2/3"].map(t => (
              <button 
                key={t} onClick={() => setCityTier(t as any)}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${cityTier === t ? 'bg-[#00A8A8] text-white border-[#00A8A8]' : 'bg-[#0A0F1C] text-gray-400 border-white/5 hover:border-white/20'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 block">Asset Grade</label>
          <div className="grid grid-cols-2 gap-2">
            {["Standard", "Premium"].map(g => (
              <button 
                key={g} onClick={() => setGrade(g as any)}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${grade === g ? 'bg-white text-[#0A0F1C] border-white' : 'bg-[#0A0F1C] text-gray-400 border-white/5 hover:border-white/20'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-[#0D1525] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Database size={200} /></div>

        <div className="grid sm:grid-cols-2 gap-10 mb-10 relative z-10">
          <div>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Total Project CAPEX</p>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums">{formatINR(calc.totalCapex)}</h2>
            <p className="text-[10px] text-gray-400 font-medium mt-3">
              Incl. 8% Capital Drag (Time Factor), RO, Civil & Setup.
            </p>
          </div>
          <div className="sm:text-right">
            <p className="text-[10px] text-[#00A8A8] font-black uppercase tracking-widest mb-2">Stabilized Payback</p>
            <h2 className="text-5xl font-black text-[#00A8A8] tracking-tighter tabular-nums">{calc.paybackSteady} <span className="text-2xl">Mo</span></h2>
            <p className="text-[10px] text-gray-400 font-medium mt-3">
              Year-1 Adjusted Payback: <strong>{calc.paybackYear1} Mo</strong>
            </p>
          </div>
        </div>

        <div className="relative z-10 mb-10">
          <div className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-5 rounded-2xl flex items-start gap-4">
            <AlertTriangle className="text-[#A6192E] shrink-0 mt-1" size={20} />
            <div>
              <p className="text-[10px] font-black uppercase text-[#A6192E] tracking-widest mb-1">CFO Reality Check Applied</p>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Standard calculators assume immediate 100% occupancy. We have applied a <strong>35% ramp-up penalty</strong>, an <strong>8% construction time lag</strong>, and a permanent <strong>12% operational inefficiency floor</strong> to ensure your bank repayment schedule holds true.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-8">
          <Link href="/risk-control" onClick={handleCapture} className="w-full sm:flex-1">
            <button 
              disabled={isCapturing}
              className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 px-4 rounded-2xl font-black uppercase tracking-[0.05em] text-[10px] md:text-xs shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            >
              {isCapturing ? <Loader2 size={16} className="animate-spin"/> : <TrendingUp size={16} />}
              {isCapturing ? "Securing Analysis..." : "Check Profit Risk For Your Setup"}
            </button>
          </Link>
          
          <Link href="/os" onClick={handleCapture} className="w-full sm:flex-1">
            <button 
              disabled={isCapturing}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 px-4 rounded-2xl font-black uppercase tracking-[0.05em] text-[10px] md:text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              <Database size={16} /> Get Detailed Project Report
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}