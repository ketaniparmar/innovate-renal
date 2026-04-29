"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Activity, 
  ChevronRight, 
  ShieldCheck,
  MessageCircle,
  ArrowLeft
} from "lucide-react";

export default function ROICalculatorPage() {
  // --- STATE: Pulled from Funnel or Defaults ---
  const [machines, setMachines] = useState<number>(10);
  const [location, setLocation] = useState<string>("South Gujarat");
  
  // --- STATE: Underwriting Variables ---
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(3);
  const [avgSessionFee, setAvgSessionFee] = useState<number>(1800);
  const [consumableCost, setConsumableCost] = useState<number>(850); // DiaCare optimized

  // --- HYDRATE FROM LEAD CAPTURE ---
  useEffect(() => {
    const savedIntent = localStorage.getItem("innovate_dialysis_intent");
    if (savedIntent) {
      try {
        const parsed = JSON.parse(savedIntent);
        // Extract number from "10–20 Machines" string safely
        const machineMatch = parsed.machines.match(/\d+/);
        if (machineMatch) setMachines(parseInt(machineMatch[0]));
        if (parsed.location) setLocation(parsed.location);
      } catch (e) {
        console.error("Failed to parse intent");
      }
    }
  }, []);

  // --- THE CLINICAL MATH (Sovereign OS Logic) ---
  const economics = useMemo(() => {
    const workingDays = 26; // Standard clinical month
    const totalSessionsMonthly = machines * sessionsPerDay * workingDays;
    
    // Revenue
    const grossRevenue = totalSessionsMonthly * avgSessionFee;
    
    // OPEX
    const monthlyConsumablesOpex = totalSessionsMonthly * consumableCost;
    const fixedOpex = machines * 35000; // Staff, Rent, Utilities baseline
    const totalOpex = monthlyConsumablesOpex + fixedOpex;
    
    // Profit
    const ebitda = grossRevenue - totalOpex;
    const ebitdaMargin = (ebitda / grossRevenue) * 100;
    
    // CAPEX (DiaCare Benchmark)
    const machineCapex = machines * 650000;
    const infraCapex = machines * 400000; // RO, beds, civil
    const totalCapex = machineCapex + infraCapex;
    
    const paybackMonths = totalCapex / ebitda;

    return {
      grossRevenue,
      ebitda,
      ebitdaMargin,
      totalCapex,
      paybackMonths
    };
  }, [machines, sessionsPerDay, avgSessionFee, consumableCost]);

  // --- WHATSAPP CONVERSION GENERATOR ---
  const generateWhatsAppLink = () => {
    const text = `Hello Innovate India Team,%0A%0AI used your Sovereign OS Calculator for a project in *${location}*.%0A%0A*My Model:*%0A- Machines: ${machines}%0A- Expected Monthly EBITDA: ₹${(economics.ebitda / 100000).toFixed(2)} Lakhs%0A- Est. CAPEX: ₹${(economics.totalCapex / 10000000).toFixed(2)} Cr%0A%0AI want to discuss the Detailed Project Report (DPR) and DiaCare supply contracts.`;
    return `https://wa.me/919879576332?text=${text}`; 
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-24 pb-24 px-6 overflow-hidden">
      {/* 🌌 Background Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/5 blur-[150px] top-[-200px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[150px] bottom-[-100px] left-[-100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <Link href="/supply" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#C6A85A] transition-colors mb-12">
          <ArrowLeft size={14}/> Back to Supply Engine
        </Link>
        
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-6">
            <Calculator size={12}/> Sovereign OS v9.0
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Financial Underwriting.
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
            Adjust the clinical parameters below. This engine calculates your localized EBITDA and payback horizon based on DiaCare benchmark efficiencies.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* --- LEFT: INPUT CONTROLS --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2">
                <Activity size={14}/> Clinical Assumptions
              </h3>
              
              <SliderControl 
                label="Dialysis Machines" 
                value={machines} min={5} max={50} step={1} 
                onChange={setMachines} 
              />
              <SliderControl 
                label="Sessions per Machine / Day" 
                value={sessionsPerDay} min={1} max={4} step={0.5} 
                onChange={setSessionsPerDay} 
              />
              <SliderControl 
                label="Avg. Revenue per Session (₹)" 
                value={avgSessionFee} min={1200} max={4000} step={100} 
                onChange={setAvgSessionFee} 
              />
              
              <div className="mt-8 pt-8 border-t border-white/5">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#C6A85A] mb-6">
                  Innovate India Supply Advantage
                </h3>
                <SliderControl 
                  label="Consumable Cost per Session (₹)" 
                  value={consumableCost} min={700} max={1500} step={50} 
                  onChange={setConsumableCost} 
                  highlight
                />
                <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-4 font-bold">
                  *Lower consumable costs via our exclusive DiaCare supply contracts directly boost EBITDA.
                </p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: THE OUTPUT TERMINAL --- */}
          <div className="lg:col-span-7">
            <div className="p-10 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between">
              
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8">
                  Projected Financial Model: <span className="text-white">{location}</span>
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <DataReadout 
                    label="Monthly EBITDA" 
                    value={`₹${(economics.ebitda / 100000).toFixed(2)}L`} 
                    subtext={`${economics.ebitdaMargin.toFixed(1)}% Margin`}
                    primary
                  />
                  <DataReadout 
                    label="Est. Setup CAPEX" 
                    value={`₹${(economics.totalCapex / 10000000).toFixed(2)}Cr`} 
                    subtext="Turnkey Infra + DiaCare"
                  />
                  <DataReadout 
                    label="Gross Revenue / Mo" 
                    value={`₹${(economics.grossRevenue / 100000).toFixed(2)}L`} 
                    subtext="At 100% Target Utilization"
                  />
                  <DataReadout 
                    label="Payback Horizon" 
                    value={`${economics.paybackMonths.toFixed(1)} Mo`} 
                    subtext="Break-even timeline"
                  />
                </div>
              </div>

              {/* --- THE HARD CLOSE --- */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-start gap-4 mb-8">
                  <ShieldCheck className="text-[#00A8A8] shrink-0 mt-1" size={20}/>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    This is a baseline mathematical model. To finalize this project, you need a <strong className="text-white">Detailed Project Report (DPR)</strong> and a locked-in <strong className="text-white">Supply Contract</strong> for your region.
                  </p>
                </div>

                <a href={generateWhatsAppLink()} target="_blank" rel="noreferrer" className="block w-full">
                  <motion.button 
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl flex items-center justify-center gap-3"
                  >
                    Send Model via WhatsApp <MessageCircle size={16}/>
                  </motion.button>
                </a>
                <p className="text-center text-[9px] text-gray-500 uppercase tracking-widest mt-4 font-bold">
                  Connect instantly with our executive team.
                </p>
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
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em]">
        <span className="text-gray-400">{label}</span>
        <span className={`text-base ${highlight ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))} 
        className={`w-full h-1.5 rounded-full appearance-none bg-white/10 ${highlight ? 'accent-[#C6A85A]' : 'accent-[#00A8A8]'}`} 
      />
    </div>
  );
}

function DataReadout({ label, value, subtext, primary }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border ${primary ? 'bg-[#C6A85A]/10 border-[#C6A85A]/30' : 'bg-white/[0.03] border-white/5'}`}>
      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</p>
      <p className={`text-3xl tracking-tighter font-black ${primary ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</p>
      <p className="text-[10px] text-gray-500 font-bold mt-2">{subtext}</p>
    </div>
  );
}