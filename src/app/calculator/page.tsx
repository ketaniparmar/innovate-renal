"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  PackageCheck, 
  ArrowRight, 
  ArrowLeft,
  Calculator,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  MessageSquare
} from "lucide-react";

type CalcMode = "selection" | "capex" | "opex";

export default function ROICalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("selection");

  // CAPEX STATE (New Setup)
  const [newMachines, setNewMachines] = useState(10);
  
  // OPEX STATE (Existing Setup)
  const [existingMachines, setExistingMachines] = useState(10);
  const [currentSupplyCost, setCurrentSupplyCost] = useState(1200);

  // --- CAPEX MATH (Estimates) ---
  const machineCost = newMachines * 650000; // ₹6.5L per machine avg
  const roPlantCost = newMachines > 10 ? 850000 : 550000;
  const civilCost = newMachines * 200000; // ₹2L per bed avg
  const totalCapex = machineCost + roPlantCost + civilCost;
  
  // Projected Monthly Revenue (Assuming 2 shifts, 26 days, 80% utilization, ₹1800 per session)
  const monthlySessionsNew = Math.floor(newMachines * 2 * 26 * 0.8);
  const projectedRevenue = monthlySessionsNew * 1800;
  const projectedProfit = monthlySessionsNew * (1800 - 850); // ₹850 wholesale supply cost

  // --- OPEX MATH (Savings) ---
  const wholesaleCost = 850; // Our locked-in price
  const monthlySessionsExisting = Math.floor(existingMachines * 2 * 26 * 0.85);
  const currentMonthlyExpense = monthlySessionsExisting * currentSupplyCost;
  const optimizedMonthlyExpense = monthlySessionsExisting * wholesaleCost;
  const monthlySavings = currentMonthlyExpense - optimizedMonthlyExpense;

  const handleWhatsApp = (type: "capex" | "opex") => {
    let text = "";
    if (type === "capex") {
      text = `*New Setup Inquiry*%0A%0A*Machines:* ${newMachines}%0A*Est. Budget:* ₹${(totalCapex / 100000).toFixed(2)} Lakhs%0A%0AI'd like to discuss a formal DPR.`;
    } else {
      text = `*Supply Optimization Inquiry*%0A%0A*Machines:* ${existingMachines}%0A*Current Cost/Session:* ₹${currentSupplyCost}%0A*Potential Savings:* ₹${(monthlySavings / 100000).toFixed(2)} Lakhs/month%0A%0AI want to discuss wholesale pricing.`;
    }
    window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-slate-200 overflow-x-hidden font-sans relative">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-6">
            <Calculator size={14}/> ROI & Profit Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            Stop Guessing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Run The Math.</span>
          </h1>
        </div>

        <AnimatePresence mode="wait">
          
          {/* ========================================== */}
          {/* STEP 1: THE FORK (Select Journey)            */}
          {/* ========================================== */}
          {mode === "selection" && (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
              className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto"
            >
              {/* CAPEX PATH */}
              <button 
                onClick={() => setMode("capex")}
                className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#1A160C] to-[#0A0F1C] border border-[#C6A85A]/30 shadow-2xl hover:scale-105 transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C6A85A]/20 blur-[50px] rounded-full group-hover:bg-[#C6A85A]/40 transition-colors" />
                <Building2 size={40} className="text-[#C6A85A] mb-6" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">I want to build a <br/>NEW Dialysis Center</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">Calculate exact machine costs, RO plant setup, civil work, and your break-even timeline.</p>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A]">
                  Calculate Setup Cost <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </button>

              {/* OPEX PATH */}
              <button 
                onClick={() => setMode("opex")}
                className="p-10 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-[#00A8A8]/30 shadow-2xl hover:scale-105 transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00A8A8]/20 blur-[50px] rounded-full group-hover:bg-[#00A8A8]/40 transition-colors" />
                <PackageCheck size={40} className="text-[#00A8A8] mb-6" />
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">I want to optimize an <br/>EXISTING Center</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">Lock in wholesale supply prices, stop hidden financial leaks, and boost monthly profit.</p>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8]">
                  Calculate Supply Savings <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </button>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* STEP 2A: CAPEX CALCULATOR (New Setup)        */}
          {/* ========================================== */}
          {mode === "capex" && (
            <motion.div 
              key="capex"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 20 }}
              className="max-w-4xl mx-auto"
            >
              <button onClick={() => setMode("selection")} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-8">
                <ArrowLeft size={14}/> Back
              </button>

              <div className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12">
                  
                  {/* Controls */}
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
                      <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-600">
                        <span>5</span><span>40</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <CostRow label="Machines & Equipment" value={`₹ ${(machineCost / 100000).toFixed(2)} L`} />
                      <CostRow label="AAMI RO Water Plant" value={`₹ ${(roPlantCost / 100000).toFixed(2)} L`} />
                      <CostRow label="Civil & Interiors (Est)" value={`₹ ${(civilCost / 100000).toFixed(2)} L`} />
                    </div>
                  </div>

                  {/* Output Panel */}
                  <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6A85A]/10 blur-[50px] rounded-full" />
                    
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A] mb-2">Estimated Setup Cost (CAPEX)</p>
                    <h4 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                      ₹ {(totalCapex / 100000).toFixed(2)} Lakhs
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

          {/* ========================================== */}
          {/* STEP 2B: OPEX CALCULATOR (Existing Center)   */}
          {/* ========================================== */}
          {mode === "opex" && (
            <motion.div 
              key="opex"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: 20 }}
              className="max-w-4xl mx-auto"
            >
              <button onClick={() => setMode("selection")} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-8">
                <ArrowLeft size={14}/> Back
              </button>

              <div className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12">
                  
                  {/* Controls */}
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Stop Supply Leakage</h3>
                    <p className="text-sm text-gray-400 font-medium mb-10">See how much money you lose by buying from multiple small vendors.</p>
                    
                    <div className="mb-8">
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-black text-[#00A8A8] uppercase tracking-widest">Active Machines</label>
                        <span className="text-3xl font-black text-white">{existingMachines}</span>
                      </div>
                      <input 
                        type="range" min="5" max="40" step="1" 
                        value={existingMachines} 
                        onChange={(e) => setExistingMachines(parseInt(e.target.value))}
                        className="w-full accent-[#00A8A8] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-[10px] font-black text-red-400 uppercase tracking-widest">Your Current Supply Cost / Session</label>
                        <span className="text-3xl font-black text-white flex items-center"><IndianRupee size={24}/>{currentSupplyCost}</span>
                      </div>
                      <input 
                        type="range" min="800" max="1800" step="50" 
                        value={currentSupplyCost} 
                        onChange={(e) => setCurrentSupplyCost(parseInt(e.target.value))}
                        className="w-full accent-red-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-600">
                        <span>₹800</span><span>₹1800</span>
                      </div>
                    </div>
                  </div>

                  {/* Output Panel */}
                  <div className="bg-[#061818] border border-[#00A8A8]/30 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A8A8]/10 blur-[50px] rounded-full" />
                    
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] mb-2">Our Wholesale Lock-in Price</p>
                    <h4 className="text-3xl font-black text-gray-300 mb-8 tracking-tighter flex items-center opacity-80">
                      <IndianRupee size={24}/> 850 / Session
                    </h4>

                    <div className="bg-[#00A8A8]/10 border border-[#00A8A8]/30 rounded-xl p-5 mb-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">Money Saved Every Month</p>
                      <p className="text-3xl font-black text-[#00A8A8] mb-1">
                        + ₹ {(monthlySavings / 100000).toFixed(2)} Lakhs
                      </p>
                      <p className="text-[9px] text-gray-400 uppercase font-bold">This is pure profit added back to your center.</p>
                    </div>

                    <button 
                      onClick={() => handleWhatsApp("opex")}
                      className="w-full bg-[#00A8A8] text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-teal-500 hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16}/> Secure Wholesale Contract
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

// Sub-component for neat cost rows
function CostRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5">
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{label}</span>
      <span className="text-base font-black text-white">{value}</span>
    </div>
  );
}