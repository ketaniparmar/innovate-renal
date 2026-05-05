"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  PackageCheck, 
  ArrowRight, 
  ArrowLeft,
  Calculator,
  IndianRupee,
  ShieldCheck,
  MessageSquare,
  AlertOctagon,
  ToggleRight,
  ToggleLeft,
  ChevronDown
} from "lucide-react";

// --- STRICT POLICY TYPES ---
type CalcMode = "selection" | "capex" | "opex";
type StateRegion = "KARNATAKA" | "TAMIL_NADU" | "GUJARAT" | "DELHI_NCR" | "MAHARASHTRA" | "OTHER";
type PayerType = "PM_JAY" | "CGHS" | "CASH" | "MIXED";

const SINGLE_USE_STATES: StateRegion[] = ["KARNATAKA", "TAMIL_NADU", "GUJARAT", "DELHI_NCR"];

export default function ROICalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("selection");

  // --- CAPEX STATE ---
  const [newMachines, setNewMachines] = useState(10);
  
  // --- OPEX & POLICY STATE ---
  const [existingMachines, setExistingMachines] = useState(15);
  const [currentSupplyCost, setCurrentSupplyCost] = useState(1400);
  const [region, setRegion] = useState<StateRegion>("GUJARAT");
  const [payer, setPayer] = useState<PayerType>("PM_JAY");
  const [auditSafeMode, setAuditSafeMode] = useState(true);

  // --- POLICY ENGINE LOGIC ---
  const isReuseAllowed = useMemo(() => {
    // 1. Hard State-Level Override
    if (SINGLE_USE_STATES.includes(region)) return false;
    // 2. Audit Safe Toggle Override
    if (auditSafeMode && payer === "PM_JAY") return false; 
    return true;
  }, [region, payer, auditSafeMode]);

  // --- CAPEX MATH ---
  const machineCost = newMachines * 650000;
  const roPlantCost = newMachines > 10 ? 850000 : 550000;
  const civilCost = newMachines * 200000; 
  const totalCapex = machineCost + roPlantCost + civilCost;
  const monthlySessionsNew = Math.floor(newMachines * 2 * 26 * 0.8);
  const projectedProfit = monthlySessionsNew * (1800 - 850); 

  // --- OPEX MATH (Regulatory Aware) ---
  const wholesaleCost = isReuseAllowed ? 850 : 1150; // Single-use wholesale is higher, but still cheaper than retail
  const monthlySessionsExisting = Math.floor(existingMachines * 2 * 26 * 0.85);
  const currentMonthlyExpense = monthlySessionsExisting * currentSupplyCost;
  const optimizedMonthlyExpense = monthlySessionsExisting * wholesaleCost;
  const monthlySavings = currentMonthlyExpense - optimizedMonthlyExpense;

  const handleWhatsApp = (type: "capex" | "opex") => {
    let text = "";
    if (type === "capex") {
      text = `*New Hospital Underwriting*%0A%0A*Machines:* ${newMachines}%0A*Est. CAPEX:* ₹${(totalCapex / 100000).toFixed(2)} Lakhs%0A%0AI'd like to discuss a formal DPR.`;
    } else {
      text = `*Supply Optimization & Compliance*%0A%0A*Region:* ${region}%0A*Policy Mode:* ${isReuseAllowed ? "Reuse Allowed" : "Single-Use Mandated"}%0A*Machines:* ${existingMachines}%0A*Potential Savings:* ₹${(monthlySavings / 100000).toFixed(2)} Lakhs/month%0A%0AI want to lock in wholesale supply pricing.`;
    }
    window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-slate-200 overflow-x-hidden font-sans relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-6 shadow-[0_0_15px_rgba(198,168,90,0.15)]">
            <ShieldCheck size={14}/> Regulatory-Aware ROI Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Audit-Safe <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Underwriting.</span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* STEP 1: THE FORK                             */}
          {/* ========================================== */}
          {mode === "selection" && (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
              className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
            >
              <button onClick={() => setMode("capex")} className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#1A160C] to-[#0A0F1C] border border-[#C6A85A]/30 shadow-[0_20px_50px_rgba(198,168,90,0.1)] hover:scale-105 transition-all text-left group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C6A85A]/20 blur-[50px] rounded-full group-hover:bg-[#C6A85A]/40 transition-colors" />
                <Building2 size={40} className="text-[#C6A85A] mb-6" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Underwrite a <br/>NEW Facility (CAPEX)</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">Calculate exact machine costs, RO plant setup, civil work, and your break-even timeline.</p>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A]">
                  Calculate Setup Cost <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </button>

              <button onClick={() => setMode("opex")} className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-[#00A8A8]/30 shadow-[0_20px_50px_rgba(0,168,168,0.1)] hover:scale-105 transition-all text-left group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00A8A8]/20 blur-[50px] rounded-full group-hover:bg-[#00A8A8]/40 transition-colors" />
                <PackageCheck size={40} className="text-[#00A8A8] mb-6" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Optimize an <br/>EXISTING Center (OPEX)</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">Run state-compliant supply calculations to stop hidden financial leaks and boost EBITDA.</p>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8]">
                  Calculate Supply Savings <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </button>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* STEP 2B: OPEX CALCULATOR (State-Aware)       */}
          {/* ========================================== */}
          {mode === "opex" && (
            <motion.div key="opex" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 20 }} className="max-w-5xl mx-auto">
              <button onClick={() => setMode("selection")} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-8">
                <ArrowLeft size={14}/> Back
              </button>

              <div className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-12">
                  
                  {/* --- LEFT: POLICY & INPUT CONTROLS --- */}
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Compliance & Cost Engine</h3>
                    <p className="text-sm text-gray-400 font-medium mb-10">Select your jurisdiction. Our engine will restrict illegal parameters and output audit-safe projections.</p>
                    
                    {/* Policy Inputs */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">State Jurisdiction</label>
                        <SelectBox value={region} onChange={(v) => setRegion(v as StateRegion)} options={["GUJARAT", "MAHARASHTRA", "KARNATAKA", "DELHI_NCR", "TAMIL_NADU", "OTHER"]} />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Primary Payer</label>
                        <SelectBox value={payer} onChange={(v) => setPayer(v as PayerType)} options={["PM_JAY", "CGHS", "CASH", "MIXED"]} />
                      </div>
                    </div>

                    {/* Dynamic Compliance Lock UI */}
                    <div className={`mb-8 p-5 rounded-2xl border transition-colors ${!isReuseAllowed ? 'bg-red-950/20 border-red-900/50' : 'bg-[#00A8A8]/10 border-[#00A8A8]/30'}`}>
                      <div className="flex items-start gap-4">
                        {!isReuseAllowed ? <AlertOctagon className="text-red-500 shrink-0 mt-0.5" size={20}/> : <ShieldCheck className="text-[#00A8A8] shrink-0 mt-0.5" size={20}/>}
                        <div>
                          <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${!isReuseAllowed ? 'text-red-500' : 'text-[#00A8A8]'}`}>
                            {!isReuseAllowed ? "Reuse Disabled (Regulatory Lock)" : "Dialyzer Reuse Allowed"}
                          </p>
                          <p className="text-xs text-gray-400 font-medium">
                            {!isReuseAllowed 
                              ? `Your jurisdiction (${region}) or payer restricts dialyzer reuse. Financial model is locked to Single-Use costs.` 
                              : "Standard clinical reprocessing protocols active based on regional guidelines."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Operational Inputs */}
                    <div className="mb-8">
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-black text-white uppercase tracking-widest">Active Machines</label>
                        <span className="text-2xl font-black text-white">{existingMachines}</span>
                      </div>
                      <input 
                        type="range" min="5" max="40" step="1" 
                        value={existingMachines} 
                        onChange={(e) => setExistingMachines(parseInt(e.target.value))}
                        className="w-full accent-white h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-black text-red-400 uppercase tracking-widest">Current Retail Supply Cost / Session</label>
                        <span className="text-2xl font-black text-white flex items-center"><IndianRupee size={20}/>{currentSupplyCost}</span>
                      </div>
                      <input 
                        type="range" min={!isReuseAllowed ? 1100 : 800} max="2500" step="50" 
                        value={currentSupplyCost} 
                        onChange={(e) => setCurrentSupplyCost(parseInt(e.target.value))}
                        className="w-full accent-red-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* --- RIGHT: OUTPUT PANEL --- */}
                  <div className="bg-[#061818] border border-[#00A8A8]/30 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A8A8]/10 blur-[50px] rounded-full" />
                    
                    {/* Audit Toggle */}
                    <div className="flex items-center justify-between mb-8 border-b border-[#00A8A8]/20 pb-4">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Force Audit-Safe Projection</span>
                      <button onClick={() => setAuditSafeMode(!auditSafeMode)} className="text-[#00A8A8] transition-transform hover:scale-105">
                        {auditSafeMode ? <ToggleRight size={32}/> : <ToggleLeft size={32} className="text-gray-600"/>}
                      </button>
                    </div>

                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] mb-2">Our Wholesale Lock-in Price</p>
                    <h4 className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center">
                      <IndianRupee size={24}/> {wholesaleCost} <span className="text-sm text-gray-500 ml-2 font-medium">/ Session</span>
                    </h4>

                    <div className="bg-[#00A8A8]/10 border border-[#00A8A8]/30 rounded-xl p-6 mb-8 shadow-inner">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Money Saved Every Month</p>
                      <p className="text-4xl md:text-5xl font-black text-[#00A8A8] mb-2 tracking-tighter">
                        + ₹ {(monthlySavings >= 0 ? monthlySavings : 0) / 100000}L
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase font-bold">Projected EBITDA added back to your center.</p>
                    </div>

                    <button 
                      onClick={() => handleWhatsApp("opex")}
                      className="w-full bg-[#00A8A8] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(0,168,168,0.2)] hover:bg-teal-500 hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16}/> Secure Compliant Supply Contract
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* STEP 2A: CAPEX CALCULATOR (Standard)         */}
          {/* ========================================== */}
          {mode === "capex" && (
            <motion.div key="capex" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 20 }} className="max-w-4xl mx-auto">
               <button onClick={() => setMode("selection")} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-8">
                <ArrowLeft size={14}/> Back
              </button>

              <div className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Hospital Setup Plan</h3>
                    <p className="text-sm text-gray-400 font-medium mb-10">Adjust the machine count to see your estimated turnkey capital requirement.</p>
                    
                    <div className="mb-10">
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-black text-[#C6A85A] uppercase tracking-widest">Number of Dialysis Machines</label>
                        <span className="text-3xl font-black text-white">{newMachines}</span>
                      </div>
                      <input 
                        type="range" min="5" max="40" step="1" 
                        value={newMachines} 
                        onChange={(e) => setNewMachines(parseInt(e.target.value))}
                        className="w-full accent-[#C6A85A] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-4">
                      <CostRow label="Machines & Equipment" value={`₹ ${(machineCost / 100000).toFixed(2)} L`} />
                      <CostRow label="AAMI RO Water Plant" value={`₹ ${(roPlantCost / 100000).toFixed(2)} L`} />
                      <CostRow label="Civil & Interiors (Est)" value={`₹ ${(civilCost / 100000).toFixed(2)} L`} />
                    </div>
                  </div>

                  <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A85A]/10 blur-[50px] rounded-full" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A] mb-2">Estimated Setup Cost (CAPEX)</p>
                    <h4 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                      ₹ {(totalCapex / 100000).toFixed(2)} L
                    </h4>
                    <div className="bg-[#0A0F1C]/50 border border-[#C6A85A]/20 rounded-xl p-5 mb-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Projected Monthly Profit</p>
                      <p className="text-2xl font-black text-[#C6A85A]">₹ {(projectedProfit / 100000).toFixed(2)} L / mo</p>
                      <p className="text-[9px] text-gray-500 mt-2 uppercase font-bold">Assuming 80% occupancy & wholesale supplies.</p>
                    </div>
                    <button 
                      onClick={() => handleWhatsApp("capex")}
                      className="w-full bg-[#C6A85A] text-[#0A0F1C] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16}/> Discuss Floor Plan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function CostRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5">
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{label}</span>
      <span className="text-base font-black text-white">{value}</span>
    </div>
  );
}

function SelectBox({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-sm font-bold text-white outline-none focus:border-[#00A8A8] appearance-none cursor-pointer transition-colors shadow-inner"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt.replace("_", " ")}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
    </div>
  );
}