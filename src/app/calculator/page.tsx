"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck,
  MessageCircle,
  Lock,
  AlertTriangle,
  Activity,
  IndianRupee
} from "lucide-react";

export default function ROICalculatorPage() {
  // --- STATE: Underwriting Variables ---
  const [machines, setMachines] = useState<number>(10);
  const [location, setLocation] = useState<string>("South Gujarat");
  const [sessionsPerDay, setSessionsPerDay] = useState<number>(3);
  const [pmjayMix, setPmjayMix] = useState<number>(40); // % PM-JAY
  const [avgSessionFee, setAvgSessionFee] = useState<number>(1800);
  const [consumableCost, setConsumableCost] = useState<number>(850); 

  // --- HYDRATE FROM LEAD CAPTURE ---
  useEffect(() => {
    const savedIntent = localStorage.getItem("innovate_dialysis_intent");
    if (savedIntent) {
      try {
        const parsed = JSON.parse(savedIntent);
        const machineMatch = parsed.machines?.match(/\d+/);
        if (machineMatch) setMachines(parseInt(machineMatch[0]));
        if (parsed.location) setLocation(parsed.location);
      } catch (e) {
        console.error("Failed to parse intent");
      }
    }
  }, []);

  // --- THE CLINICAL & FINANCIAL MATH (OS vs MANUAL) ---
  const economics = useMemo(() => {
    const workingDays = 26; 
    const maxCapacity = machines * sessionsPerDay * workingDays;
    
    // --- MANUAL OPERATIONS (The Bleed) ---
    const manualUtilization = 0.65;
    const manualRejectionRate = 0.12;
    const manualGrossSessions = maxCapacity * manualUtilization;
    const manualPmjaySessions = manualGrossSessions * (pmjayMix / 100);
    const manualRejectedSessions = manualPmjaySessions * manualRejectionRate;
    const manualNetSessions = manualGrossSessions - manualRejectedSessions;
    const manualRevenue = manualNetSessions * avgSessionFee;

    // --- SOVEREIGN OS (The Yield) ---
    const osUtilization = 0.90;
    const osGrossSessions = maxCapacity * osUtilization;
    const osRevenue = osGrossSessions * avgSessionFee;

    // The Delta
    const monthlyBleed = osRevenue - manualRevenue;
    
    // OPEX (Based on OS Volume)
    const monthlyConsumablesOpex = osGrossSessions * consumableCost;
    const fixedOpex = machines * 35000; 
    const totalOpex = monthlyConsumablesOpex + fixedOpex;
    
    // Profit
    const ebitda = osRevenue - totalOpex;
    
    // CAPEX (DiaCare Benchmark + Turnkey Civil)
    const machineCapex = machines * 650000;
    const infraCapex = machines * 400000; 
    const totalCapex = machineCapex + infraCapex;
    
    const paybackMonths = totalCapex / ebitda;

    return {
      osRevenue,
      ebitda,
      totalCapex,
      paybackMonths,
      monthlyBleed
    };
  }, [machines, sessionsPerDay, pmjayMix, avgSessionFee, consumableCost]);

  // --- WHATSAPP CONVERSION GENERATOR ---
  const handleUnlock = () => {
    const text = `*DPR & ROI Request*%0A%0A*Location:* ${location || "Not Specified"}%0A*Model:* ${machines} Machines @ ${sessionsPerDay} shifts/day%0A*Current Bleed:* Losing ₹${(economics.monthlyBleed / 100000).toFixed(2)}L/mo to manual operations%0A*Projected CAPEX:* ₹${(economics.totalCapex / 10000000).toFixed(2)} Cr%0A%0AI want to unlock my Sovereign OS EBITDA projections and discuss the Detailed Project Report.`;
    window.open(`https://wa.me/919879576332?text=${text}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-hidden relative">
      
      {/* 🌌 Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-20 w-[500px] h-[500px] bg-red-900/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- HERO: BLUNT FINANCIAL TRUTH --- */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-6">
            <AlertTriangle size={14}/> Operational Bleed vs. Sovereign Yield
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Calculate Your <span className="text-red-400">Hidden Losses.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg font-medium">
            "Rule of thumb" math bankrupts hospitals. See exactly how much revenue you lose to manual inefficiencies, then unlock your exact EBITDA and Break-even horizon under the Sovereign OS.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: INPUT CONTROLS --- */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-8">
                <Activity className="text-[#00A8A8]" size={20}/>
                <h3 className="text-sm font-black uppercase tracking-widest text-white">Facility Parameters</h3>
              </div>
              
              <div className="space-y-8">
                {/* Location Input */}
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
                <SliderControl label="Expected Shifts / Day" value={sessionsPerDay} min={2} max={4} step={1} onChange={setSessionsPerDay} />
                <SliderControl label="PM-JAY Patient Mix (%)" value={pmjayMix} min={0} max={100} step={5} onChange={setPmjayMix} color="accent-red-500" />
                <SliderControl label="Avg. Fee per Session (₹)" value={avgSessionFee} min={1200} max={4000} step={100} onChange={setAvgSessionFee} />
                
                <div className="pt-6 border-t border-white/5">
                  <SliderControl label="Consumable OPEX Cost (₹)" value={consumableCost} min={700} max={1500} step={50} onChange={setConsumableCost} highlight />
                  <p className="text-[10px] text-gray-500 font-bold mt-3 leading-relaxed">
                    *Slide this down to see how DiaCare supply contracts accelerate your payback horizon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: THE OUTPUT TERMINAL --- */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* THE BLEED (Unlocks urgency) */}
            <div className="p-8 rounded-[2rem] bg-red-950/20 border border-red-900/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
              <AlertTriangle className="absolute -right-4 -top-4 text-red-500/10" size={120} />
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Monthly Revenue Lost to Manual Inefficiency</p>
                <p className="text-4xl md:text-5xl font-black text-white flex items-center gap-1 tracking-tighter">
                  <IndianRupee size={32} className="text-red-500"/>
                  {Math.round(economics.monthlyBleed).toLocaleString('en-IN')}
                </p>
                <p className="text-xs font-medium text-gray-400 mt-2">Due to 65% utilization gaps & PM-JAY rejections.</p>
              </div>
            </div>

            {/* THE LOCK & OS DATA */}
            <div className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/20 shadow-[0_20px_50px_rgba(0,168,168,0.05)] h-full flex flex-col relative overflow-hidden">
              
              {/* Unlocked Top Section (Sovereign Yield) */}
              <div className="mb-10 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] flex items-center gap-2">
                    <ShieldCheck size={14}/> Sovereign OS Yield
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <DataReadout 
                    label="Est. Setup CAPEX" 
                    value={`₹${(economics.totalCapex / 10000000).toFixed(2)} Cr`} 
                    subtext="DiaCare Machines + Infra"
                  />
                  <DataReadout 
                    label="Gross OS Revenue" 
                    value={`₹${(economics.osRevenue / 100000).toFixed(2)} L`} 
                    subtext="At 90% enforced utilization"
                  />
                </div>
              </div>

              {/* Locked Bottom Section (The Lead Magnet) */}
              <div className="relative flex-grow mt-4 pt-10 border-t border-white/10 z-10">
                
                {/* The Blur Overlay */}
                <div className="absolute inset-0 z-20 backdrop-blur-md bg-[#0D1525]/70 flex flex-col items-center justify-center rounded-2xl border border-white/5 p-6 text-center">
                  <Lock className="text-[#C6A85A] mb-4" size={32}/>
                  <h4 className="text-xl font-black text-white mb-2 tracking-tight">Unlock EBITDA & Payback</h4>
                  <p className="text-xs text-gray-400 mb-8 font-medium max-w-sm leading-relaxed">
                    Net profit margins require a brief structural review of your specific location. Unlock the exact break-even horizon with our team.
                  </p>
                  <button 
                    onClick={handleUnlock}
                    className="bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(198,168,90,0.3)] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center gap-2"
                  >
                    Unlock DPR via WhatsApp <MessageCircle size={16}/>
                  </button>
                </div>

                {/* The Teaser Data (Blurred underneath) */}
                <div className="grid grid-cols-2 gap-6 opacity-30 select-none">
                  <DataReadout 
                    label="Net Monthly EBITDA" 
                    value={`₹${(economics.ebitda / 100000).toFixed(2)} L`} 
                    subtext="Protected Margins"
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

function SliderControl({ label, value, min, max, step, onChange, highlight, color }: any) {
  const accentColor = color ? color : (highlight ? 'accent-[#C6A85A]' : 'accent-[#00A8A8]');
  
  return (
    <div>
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.1em] mb-4">
        <span className="text-gray-400">{label}</span>
        <span className={`text-base font-black ${highlight ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} 
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))} 
        className={`w-full h-1.5 rounded-full appearance-none bg-white/10 ${accentColor} cursor-pointer`} 
      />
    </div>
  );
}

function DataReadout({ label, value, subtext, primary }: any) {
  return (
    <div className={`p-5 rounded-[2rem] border ${primary ? 'bg-[#C6A85A]/5 border-[#C6A85A]/20' : 'bg-white/[0.02] border-white/5'}`}>
      <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-2">{label}</p>
      <p className={`text-2xl md:text-3xl tracking-tighter font-black ${primary ? 'text-[#C6A85A]' : 'text-white'}`}>{value}</p>
      <p className="text-[10px] text-gray-500 font-bold mt-2 leading-tight">{subtext}</p>
    </div>
  );
}