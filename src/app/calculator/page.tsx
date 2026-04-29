"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck,
  MessageCircle,
  FileText,
  Lock,
  AlertTriangle,
  Building2
} from "lucide-react";

export default function ROICalculatorPage() {
  // --- STATE: Underwriting Variables ---
  const [machines, setMachines] = useState<number>(10);
  const [location, setLocation] = useState<string>("South Gujarat");
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(3);
  const [avgSessionFee, setAvgSessionFee] = useState<number>(1800);
  const [consumableCost, setConsumableCost] = useState<number>(850); 

  // --- HYDRATE FROM LEAD CAPTURE (Cross-Page Tracking) ---
  useEffect(() => {
    const savedIntent = localStorage.getItem("innovate_dialysis_intent");
    if (savedIntent) {
      try {
        const parsed = JSON.parse(savedIntent);
        const machineMatch = parsed.machines.match(/\d+/);
        if (machineMatch) setMachines(parseInt(machineMatch[0]));
        if (parsed.location) setLocation(parsed.location);
      } catch (e) {
        console.error("Failed to parse intent");
      }
    }
  }, []);

  // --- THE CLINICAL MATH ---
  const economics = useMemo(() => {
    const workingDays = 26; 
    const totalSessionsMonthly = machines * sessionsPerDay * workingDays;
    
    // Revenue
    const grossRevenue = totalSessionsMonthly * avgSessionFee;
    
    // OPEX (Consumables + Baseline Fixed Costs)
    const monthlyConsumablesOpex = totalSessionsMonthly * consumableCost;
    const fixedOpex = machines * 35000; 
    const totalOpex = monthlyConsumablesOpex + fixedOpex;
    
    // Profit
    const ebitda = grossRevenue - totalOpex;
    
    // CAPEX (DiaCare Benchmark + Turnkey Civil)
    const machineCapex = machines * 650000;
    const infraCapex = machines * 400000; 
    const totalCapex = machineCapex + infraCapex;
    
    const paybackMonths = totalCapex / ebitda;

    return {
      grossRevenue,
      ebitda,
      totalCapex,
      paybackMonths
    };
  }, [machines, sessionsPerDay, avgSessionFee, consumableCost]);

  // --- WHATSAPP CONVERSION GENERATOR ---
  const handleUnlock = () => {
    const text = `*DPR & ROI Request*%0A%0A*Location:* ${location}%0A*Model:* ${machines} Machines @ ${sessionsPerDay} shifts/day%0A*Projected CAPEX:* ₹${(economics.totalCapex / 10000000).toFixed(2)} Cr%0A%0AI want to unlock my EBITDA projections and discuss the Detailed Project Report.`;
    window.open(`https://wa.me/919879576332?text=${text}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-hidden">
      
      {/* 🌌 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-20 w-[500px] h-[500px] bg-[#00A8A8]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HERO: BLUNT FINANCIAL TRUTH --- */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-6">
            Detailed Project Report (DPR) Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Clinical Excellence Built on <br className="hidden md:block"/> Mathematical Certainty.
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-medium">
            "Rule of thumb" math bankrupts hospitals. A 15-bed facility in Surat has vastly different unit economics than a 5-bed setup in a Tier-3 district. Model your exact CAPEX and break-even below before spending a single rupee.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: INPUT CONTROLS --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <Calculator className="text-[#00A8A8]" size={20}/>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Project Variables</h3>
              </div>
              
              <div className="space-y-8">
                {/* Location Input (Hydrated) */}
                <div>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em] mb-3">
                    <span className="text-gray-400">Target Location</span>
                  </div>
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    placeholder="e.g., Surat, Gujarat"
                    className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C6A85A] transition-colors"
                  />
                </div>

                <SliderControl label="Total Dialysis Machines" value={machines} min={5} max={40} step={1} onChange={setMachines} />
                <SliderControl label="Expected Sessions / Day" value={sessionsPerDay} min={1} max={4} step={0.5} onChange={setSessionsPerDay} />
                <SliderControl label="Avg. Fee per Session (₹)" value={avgSessionFee} min={1200} max={4000} step={100} onChange={setAvgSessionFee} />
                
                <div className="pt-6 border-t border-white/5">
                  <SliderControl label="Consumable OPEX Cost (₹)" value={consumableCost} min={700} max={1500} step={50} onChange={setConsumableCost} highlight />
                  <p className="text-[10px] text-gray-500 font-bold mt-3 leading-relaxed">
                    *Slide this down to see how DiaCare supply contracts drastically accelerate your payback horizon.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Trust Marker */}
            <div className="p-6 rounded-2xl bg-red-950/10 border border-red-900/20 flex items-start gap-4">
              <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16}/>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                <strong className="text-gray-300">Warning:</strong> These figures represent baseline clinical operations. They do not account for PM-JAY tariff delays or real estate rent, which must be underwritten in a formal DPR.
              </p>
            </div>
          </div>

          {/* --- RIGHT: THE OUTPUT TERMINAL (THE LOCK) --- */}
          <div className="lg:col-span-7">
            <div className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 shadow-[0_20px_50px_rgba(0,168,168,0.05)] h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Unlocked Top Section */}
              <div className="mb-10 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8]">
                    Live Financial Model
                  </p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Loc: {location || "Pending"}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <DataReadout 
                    label="Est. Setup CAPEX" 
                    value={`₹${(economics.totalCapex / 10000000).toFixed(2)} Cr`} 
                    subtext="DiaCare Machines + Turnkey Infra"
                  />
                  <DataReadout 
                    label="Gross Monthly Revenue" 
                    value={`₹${(economics.grossRevenue / 100000).toFixed(2)} L`} 
                    subtext="At targeted utilization"
                  />
                </div>
              </div>

              {/* Locked Bottom Section (The Lead Magnet) */}
              <div className="relative mt-4 pt-10 border-t border-white/10 z-10">
                
                {/* The Blur Overlay */}
                <div className="absolute inset-0 z-20 backdrop-blur-md bg-[#0D1525]/60 flex flex-col items-center justify-center rounded-2xl border border-white/5 p-6 text-center">
                  <Lock className="text-[#C6A85A] mb-4" size={28}/>
                  <h4 className="text-lg font-black text-white mb-2">Unlock EBITDA & Payback Data</h4>
                  <p className="text-xs text-gray-400 mb-6 font-medium max-w-sm">
                    Net profit margins require a brief structural review of your specific location and PM-JAY targets. 
                  </p>
                  <button 
                    onClick={handleUnlock}
                    className="bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Unlock Full DPR via WhatsApp <MessageCircle size={14}/>
                  </button>
                </div>

                {/* The Teaser Data (Blurred underneath) */}
                <div className="grid grid-cols-2 gap-6 opacity-30 select-none">
                  <DataReadout 
                    label="Net Monthly EBITDA" 
                    value={`₹${(economics.ebitda / 100000).toFixed(2)} L`} 
                    subtext="Protected by Supply Contracts"
                    primary
                  />
                  <DataReadout 
                    label="Payback Horizon" 
                    value={`${economics.paybackMonths.toFixed(1)} Mo`} 
                    subtext="Months to break-even"
                    primary
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

// --- UI SUB-COMPONENTS ---

function SliderControl({ label, value, min, max, step, onChange, highlight }: any) {
  return (
    <div>
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em] mb-4">
        <span className="text-gray-400">{label}</span>
        <span className={`text-base ${highlight ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))} 
        className={`w-full h-1.5 rounded-full appearance-none bg-white/10 ${highlight ? 'accent-[#C6A85A]' : 'accent-[#00A8A8]'} cursor-pointer`} 
      />
    </div>
  );
}

function DataReadout({ label, value, subtext, primary }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border ${primary ? 'bg-[#C6A85A]/5 border-[#C6A85A]/20' : 'bg-white/[0.02] border-white/5'}`}>
      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</p>
      <p className={`text-2xl md:text-3xl tracking-tighter font-black ${primary ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</p>
      <p className="text-[10px] text-gray-500 font-bold mt-2 leading-tight">{subtext}</p>
    </div>
  );
}