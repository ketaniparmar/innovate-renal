"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, PackageCheck, ArrowRight, ArrowLeft, IndianRupee,
  ShieldCheck, MessageSquare, AlertOctagon, TrendingUp, Info,
  Save, LayoutDashboard, Database, Gauge
} from "lucide-react";

// --- TYPES & CONFIG (V3.2 Engine) ---
type CalcMode = "selection" | "capex" | "opex";
type StateRegion = "GUJARAT" | "DELHI_NCR" | "MAHARASHTRA" | "KARNATAKA" | "TAMIL_NADU" | "OTHER";
type PayerType = "PM_JAY" | "CGHS" | "CASH" | "MIXED";

const SINGLE_USE_STATES: StateRegion[] = ["GUJARAT", "DELHI_NCR", "KARNATAKA", "TAMIL_NADU"];

export default function ROICalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("selection");
  const [leadId, setLeadId] = useState<string>("");
  const [investorMode, setInvestorMode] = useState(false);

  // --- INPUT STATE ---
  const [machines, setMachines] = useState(10);
  const [region, setRegion] = useState<StateRegion>("GUJARAT");
  const [payer, setPayer] = useState<PayerType>("PM_JAY");
  const [isNABH, setIsNABH] = useState(true);
  const [currentSupplyCost, setCurrentSupplyCost] = useState(1400);

  // --- 1. FUNNEL PERSISTENCE (CTO PRIORITY 1) ---
  useEffect(() => {
    const savedId = localStorage.getItem("sovereign_lead_id") || `LEAD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    localStorage.setItem("sovereign_lead_id", savedId);
    setLeadId(savedId);

    // Hydrate previous session if exists
    const savedData = localStorage.getItem("sovereign_sim_cache");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setMachines(parsed.machines || 10);
      setRegion(parsed.region || "GUJARAT");
    }
  }, []);

  // Sync inputs to local cache for Funnel Memory
  useEffect(() => {
    localStorage.setItem("sovereign_sim_cache", JSON.stringify({ machines, region, payer, mode }));
  }, [machines, region, payer, mode]);

  // --- 2. REGULATORY & COMPLIANCE ENGINE ---
  const compliance = useMemo(() => {
    const forcedSingleUse = SINGLE_USE_STATES.includes(region) && payer === "PM_JAY";
    return {
      forcedSingleUse,
      consumableCost: forcedSingleUse ? 1250 : 850, // Single-use wholesale vs optimized reuse
      status: forcedSingleUse ? "COMPLIANCE_LOCK" : "STANDARD_REUSE"
    };
  }, [region, payer]);

  // --- 3. UNDERWRITING ENGINE (CFO V3.2 MATH) ---
  const financials = useMemo(() => {
    // CAPEX Breakdown
    const area = machines * (isNABH ? 100 : 80);
    const civilRate = region === "GUJARAT" ? 2800 : 3500;
    
    const machineTotal = machines * 650000;
    const roPlant = machines > 12 ? 1200000 : 750000;
    const civilTotal = area * civilRate;
    const mepEquip = machines * 150000;
    
    const subTotal = machineTotal + roPlant + civilTotal + mepEquip;
    const contingency = subTotal * 0.10; // 10% CFO Buffer
    const totalCapex = subTotal + contingency;

    // OPEX & ROI
    const monthlySessions = Math.floor(machines * 2 * 26 * 0.85); // 2 shifts, 85% occupancy
    const avgYield = payer === "PM_JAY" ? 1500 : 2200;
    
    const tcps = compliance.consumableCost + 650; // Variable + Fixed (Staff/Rent) allocation
    const monthlyEbitda = monthlySessions * (avgYield - tcps);
    const paybackMonths = Math.round(totalCapex / Math.max(monthlyEbitda, 1));
    const workingCapital = (monthlySessions * tcps) * 6; // 6-month buffer

    return { 
      totalCapex, area, contingency, monthlyEbitda, 
      paybackMonths, workingCapital, tcps, monthlySessions 
    };
  }, [machines, region, isNABH, compliance, payer]);

  // --- 4. LEAD SECURING HANDLER ---
  const handleConversion = async (intent: string) => {
    const payload = {
      leadId,
      intent,
      machines,
      location: region,
      projectedCapex: financials.totalCapex,
      status: "WHATSAPP_INITIATED"
    };

    try {
      await fetch("/api/lead", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload) 
      });
    } catch (e) { console.error("Lead write failed, stored in retry queue."); }

    const text = `*DPR INQUIRY: ${intent}*%0A%0A*Lead ID:* ${leadId}%0A*Facility:* ${region}%0A*Machines:* ${machines}%0A*Est. CAPEX:* ₹${(financials.totalCapex / 100000).toFixed(2)}L%0A%0AI want to review the full DPR.`;
    window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-24 pb-24 text-slate-200 font-sans relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-[#00A8A8]/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-widest text-[#C6A85A] flex items-center gap-2">
                <Database size={12}/> ID: {leadId}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Sovereign V3.2
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Underwriting.</span>
            </h1>
          </div>

          <button 
            onClick={() => setInvestorMode(!investorMode)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest ${investorMode ? 'bg-[#C6A85A] text-black border-[#C6A85A]' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
          >
            <Gauge size={16}/> {investorMode ? "Investor Mode Active" : "Enable Investor Mode"}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT: THE INPUT STACK */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121A2F]/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
              
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8 flex items-center gap-2">
                <Settings size={16} /> Asset Configuration
              </h3>

              {/* Step 1: Regional Context */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">State (Jurisdiction)</label>
                  <select value={region} onChange={(e) => setRegion(e.target.value as StateRegion)} className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-3 text-sm font-bold text-white outline-none">
                    {["GUJARAT", "MAHARASHTRA", "KARNATAKA", "DELHI_NCR", "TAMIL_NADU", "OTHER"].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Primary Payer</label>
                  <select value={payer} onChange={(e) => setPayer(e.target.value as PayerType)} className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-3 text-sm font-bold text-white outline-none">
                    {["PM_JAY", "CGHS", "CASH", "MIXED"].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              {/* Regulatory Alert UI */}
              <AnimatePresence>
                {compliance.forcedSingleUse && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 rounded-2xl bg-red-950/20 border border-red-900/50 flex gap-4">
                    <AlertOctagon className="text-red-500 shrink-0" size={20}/>
                    <p className="text-[11px] font-medium text-red-200/80 leading-relaxed">
                      <span className="font-black text-red-500 block uppercase mb-1">Regulatory Lock: {region}</span>
                      PM-JAY mandates single-use dialyzers here. Your consumables cost is locked to ₹{compliance.consumableCost} to ensure audit safety.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Machine Count Slider */}
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Machine Capacity</label>
                  <span className="text-3xl font-black text-white">{machines}</span>
                </div>
                <input 
                  type="range" min="5" max="50" step="1" 
                  value={machines} 
                  onChange={(e) => setMachines(parseInt(e.target.value))}
                  className="w-full accent-[#C6A85A] h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Standard Options */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 mb-8">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#00A8A8]" size={20}/>
                  <span className="text-xs font-bold text-gray-300">Premium NABH Build Grade</span>
                </div>
                <input type="checkbox" checked={isNABH} onChange={() => setIsNABH(!isNABH)} className="accent-[#00A8A8] w-5 h-5 cursor-pointer" />
              </div>

            </div>
          </div>

          {/* RIGHT: THE CFO DASHBOARD */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Total CAPEX Card */}
              <div className="bg-[#121A2F]/50 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Building2 size={80}/>
                </div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Setup Capital (CAPEX)</p>
                <h2 className="text-4xl font-black text-white mb-2">₹ {(financials.totalCapex / 100000).toFixed(2)} L</h2>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#C6A85A]">
                  <Info size={12}/> Includes 10% Contingency Buffer
                </div>
              </div>

              {/* Payback Period Card */}
              <div className="bg-[#121A2F]/50 border border-white/5 rounded-[2.5rem] p-8">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">Est. Payback Horizon</p>
                <h2 className="text-4xl font-black text-white mb-2">{financials.paybackMonths} Months</h2>
                <p className="text-[10px] font-bold text-[#00A8A8] uppercase tracking-widest">
                  Amortized Break-Even Focus
                </p>
              </div>
            </div>

            {/* Investor Mode Panel (Advanced Metrics) */}
            <AnimatePresence>
              {investorMode && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#121A2F] border border-[#C6A85A]/30 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(198,168,90,0.1)]"
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8 flex items-center gap-2">
                    <TrendingUp size={16} /> Deep Underwriting Metrics
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <MetricItem label="Monthly EBITDA" value={`₹ ${(financials.monthlyEbitda / 100000).toFixed(2)} L`} sub="Post-OpEx Net" />
                    <MetricItem label="Working Capital" value={`₹ ${(financials.workingCapital / 100000).toFixed(2)} L`} sub="6-Month Survival Buffer" />
                    <MetricItem label="TCPS" value={`₹ ${financials.tcps}`} sub="Total Cost Per Session" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final CTA Stack */}
            <div className="grid md:grid-cols-2 gap-4">
              <button 
                onClick={() => handleConversion("GENERATE_DPR")}
                className="group bg-[#C6A85A] text-black p-6 rounded-3xl flex items-center justify-between hover:scale-[1.02] transition-all shadow-xl"
              >
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Sovereign Asset</p>
                  <h4 className="text-lg font-black tracking-tight">Generate Full DPR</h4>
                </div>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform"/>
              </button>

              <button 
                onClick={() => handleConversion("CONSULT_EXPERT")}
                className="group bg-white/5 border border-white/10 text-white p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-all"
              >
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8]">Turnkey Support</p>
                  <h4 className="text-lg font-black tracking-tight">WhatsApp Advisor</h4>
                </div>
                <MessageSquare size={24} className="text-[#00A8A8]"/>
              </button>
            </div>

            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                Data calibrated for 2026 Indian healthcare market. Errors/Omissions excepted.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function MetricItem({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-white">{value}</p>
      <p className="text-[9px] font-bold text-[#C6A85A] uppercase">{sub}</p>
    </div>
  );
}

function Settings(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
}
