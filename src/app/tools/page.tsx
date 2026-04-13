"use client";

import React, { useState } from "react";
import { 
  Activity, RefreshCcw, Layers, IndianRupee, 
  TrendingUp, Clock, PieChart, Download, Settings, ChevronRight
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { LeadCaptureModal } from "@/components/ui/LeadCaptureModal"; // Integrating the Lead Capture Funnel

export default function DPREngineWorkspace() {
  // Funnel State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Core Parameters
  const [machines, setMachines] = useState(10);
  const [sessionsPerDay, setSessionsPerDay] = useState(20);
  const [pricePerSession, setPricePerSession] = useState(1800);
  const [mode, setMode] = useState<"reuse" | "single">("reuse");

  // Advanced Parameters (Fixed Costs & CAPEX)
  const staffCost = 180000;
  const rentCost = 80000;
  const miscFixed = 70000;
  const fixedMonthlyCost = staffCost + rentCost + miscFixed;

  // Variable Costs (From your clinical data)
  const electricity = 80;
  const clinicalConsumables = 115;
  const disinfection = 20;
  const sundries = 125;
  const dialyzer = mode === "reuse" ? 70 : 1200;
  const tubing = mode === "reuse" ? 20 : 250;
  
  const costPerSession = electricity + clinicalConsumables + disinfection + sundries + dialyzer + tubing;

  // Monthly Projections
  const monthlySessions = sessionsPerDay * 26; // 26 working days
  const monthlyRevenue = monthlySessions * pricePerSession;
  const monthlyVariableCost = monthlySessions * costPerSession;
  const monthlyEBITDA = monthlyRevenue - (monthlyVariableCost + fixedMonthlyCost);
  const margin = monthlyRevenue > 0 ? ((monthlyEBITDA / monthlyRevenue) * 100) : 0;

  // CAPEX & Break-even
  const machineCost = machines * 650000;
  const roCost = machines > 10 ? 450000 : 250000;
  const infraCost = 500000;
  const totalCapex = machineCost + roCost + infraCost;
  const breakevenMonths = monthlyEBITDA > 0 ? (totalCapex / monthlyEBITDA) : 0;

  // Utilization
  const maxCapacity = machines * 3 * 26; // 3 shifts max
  const utilization = ((monthlySessions / maxCapacity) * 100).toFixed(1);

  return (
    <main className="min-h-screen bg-[#010810] pt-20 pb-0 text-white selection:bg-[#D4AF37] selection:text-black flex flex-col h-screen">
      
      {/* Top Action Bar */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-[#0A1118]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#010810] font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            II
          </div>
          <div className="flex items-center gap-2 text-sm font-medium hidden sm:flex">
            <span className="text-gray-400">Workspace</span>
            <ChevronRight size={14} className="text-gray-600" />
            <span className="text-white">AI DPR Engine</span>
          </div>
        </div>
        
        {/* Export Button -> Triggers the Lead Capture Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-gray-200 text-[#010810] px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <Download size={14} /> Export Official DPR
        </button>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ================= LEFT: PARAMETER CONTROLS ================= */}
        <aside className="w-full lg:w-[400px] border-r border-white/5 bg-[#010810] flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2">
              <Settings size={14} /> Financial Parameters
            </h2>

            {/* Mode Toggle */}
            <div className="flex bg-[#0A1118] p-1.5 rounded-xl border border-white/5 mb-8">
              <button
                onClick={() => setMode("reuse")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  mode === "reuse" ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "text-gray-500 hover:text-white"
                }`}
              >
                <RefreshCcw size={14} /> Reuse
              </button>
              <button
                onClick={() => setMode("single")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  mode === "single" ? "bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "text-gray-500 hover:text-white"
                }`}
              >
                <Layers size={14} /> Single Use
              </button>
            </div>

            {/* Input Sliders */}
            <div className="space-y-8">
              {/* Machine Input */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dialysis Machines</label>
                  <span className="text-xl font-black text-white">{machines}</span>
                </div>
                <input 
                  type="range" min="3" max="50" step="1" value={machines} 
                  onChange={(e) => setMachines(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              {/* Sessions Input */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sessions / Day</label>
                  <span className="text-xl font-black text-white">{sessionsPerDay}</span>
                </div>
                <input 
                  type="range" min="5" max="150" step="1" value={sessionsPerDay} 
                  onChange={(e) => setSessionsPerDay(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              {/* Price Input */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Charge / Session</label>
                  <span className="text-xl font-black text-[#D4AF37] flex items-center gap-1">
                    <IndianRupee size={16} /> {pricePerSession}
                  </span>
                </div>
                <input 
                  type="range" min="1200" max="4000" step="50" value={pricePerSession} 
                  onChange={(e) => setPricePerSession(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>
            </div>

            {/* Cost Breakdown Mini-View */}
            <div className="mt-10 p-5 bg-[#0A1118] border border-white/5 rounded-2xl">
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-4">Per Session OPEX</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-400"><span>Consumables & Power</span><span>₹{electricity + clinicalConsumables + disinfection + sundries}</span></div>
                <div className="flex justify-between text-[#D4AF37] font-medium"><span>Dialyzer & Tubing</span><span>₹{dialyzer + tubing}</span></div>
                <div className="pt-3 border-t border-white/10 flex justify-between text-white font-bold">
                  <span>Total Variable Cost</span><span>₹{costPerSession}</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* ================= RIGHT: BLOOMBERG TERMINAL DASHBOARD ================= */}
        <section className="flex-1 bg-[#0A1118] p-6 lg:p-8 overflow-y-auto custom-scrollbar relative">
          
          {/* Top KPI Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <MetricCard title="Est. Break-even" value={breakevenMonths > 0 ? `${breakevenMonths.toFixed(1)} Mo` : "Never"} icon={<Clock />} color="blue" />
            <MetricCard title="EBITDA Margin" value={`${margin.toFixed(1)}%`} icon={<TrendingUp />} color="gold" />
            <MetricCard title="Capacity Utilization" value={`${utilization}%`} icon={<Activity />} color="white" />
            <MetricCard title="Total CAPEX" value={`₹${(totalCapex/100000).toFixed(2)} L`} icon={<IndianRupee />} color="white" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            
            {/* Massive EBITDA Display */}
            <div className="lg:col-span-1">
              <GlassCard accent="gold" className="h-full flex flex-col justify-center items-center text-center p-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#D4AF37]/5 blur-[50px] rounded-full pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)] relative z-10">
                  <IndianRupee size={28} className="text-[#D4AF37]" />
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2 relative z-10">Projected Monthly EBITDA</p>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-white mb-2 relative z-10">
                  {(monthlyEBITDA / 100000).toFixed(2)} <span className="text-xl lg:text-2xl text-gray-500">Lakhs</span>
                </h2>
                <p className={`text-sm font-medium relative z-10 ${monthlyEBITDA > 0 ? "text-green-400" : "text-red-400"}`}>
                  {monthlyEBITDA > 0 ? "Profitable Operations" : "Operating at a Loss"}
                </p>
              </GlassCard>
            </div>

            {/* Simulated Break-even ROI Graph */}
            <div className="lg:col-span-2 bg-[#010810] border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg text-white">Capital Recovery Timeline</h3>
                  <p className="text-xs text-gray-500 mt-1">Cumulative profit vs Total CAPEX over 24 months.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-end sm:items-center">
                  <span className="flex items-center gap-2 text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-[#3B82F6]" /> CAPEX Line</span>
                  <span className="flex items-center gap-2 text-xs text-gray-400"><div className="w-2 h-2 rounded-full bg-[#D4AF37]" /> Net Cashflow</span>
                </div>
              </div>

              {/* Advanced SVG Graph Implementation */}
              <div className="flex-1 w-full relative flex items-end mt-4 min-h-[200px]">
                {/* Grid */}
                <div className="absolute inset-0 flex flex-col justify-between border-b border-l border-white/10 pb-6 pl-8">
                  {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-white/5" />)}
                  <div className="flex justify-between w-full absolute bottom-0 left-8 text-[10px] text-gray-500 px-2 mt-3">
                    <span>M1</span><span>M6</span><span>M12</span><span>M18</span><span>M24</span>
                  </div>
                </div>

                {/* SVG Graph Curve */}
                <svg className="w-full h-full absolute inset-0 pl-8 pb-6 overflow-visible" preserveAspectRatio="none">
                  {/* Fixed CAPEX Line (Blue) */}
                  <line x1="0" y1="40" x2="100%" y2="40" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" className="opacity-50" />
                  
                  {/* Profit Growth Curve (Gold) */}
                  <path 
                    d="M 0 200 L 100 160 L 250 120 L 400 80 L 600 40 L 800 -10" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="3"
                    className="drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                  />
                  
                  {/* Intersection Point (Break-even Indicator) */}
                  {breakevenMonths > 0 && breakevenMonths <= 24 && (
                    <g transform={`translate(${Math.min(750, breakevenMonths * 33)}, 40)`}>
                      <circle cx="0" cy="0" r="5" fill="#010810" stroke="#D4AF37" strokeWidth="2" className="drop-shadow-[0_0_6px_rgba(212,175,55,1)]" />
                      <text x="-15" y="-12" fill="white" fontSize="10" fontWeight="bold">BEP</text>
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Detailed Financial Ledger */}
          <div className="bg-[#010810] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <PieChart className="text-gray-400" size={18} />
              <h3 className="font-bold text-lg text-white">Monthly Ledger Forecast</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-6">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2">Total Gross Revenue</p>
                <p className="text-3xl font-bold text-white tracking-tighter">₹ {(monthlyRevenue/100000).toFixed(2)} L</p>
                <p className="text-xs text-gray-500 mt-2">Based on {monthlySessions} sessions/mo</p>
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2">Total Variable OPEX</p>
                <p className="text-3xl font-bold text-gray-300 tracking-tighter">₹ {(monthlyVariableCost/100000).toFixed(2)} L</p>
                <p className="text-xs text-gray-500 mt-2">Consumables & Power</p>
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2">Fixed Monthly Overheads</p>
                <p className="text-3xl font-bold text-gray-300 tracking-tighter">₹ {(fixedMonthlyCost/100000).toFixed(2)} L</p>
                <p className="text-xs text-gray-500 mt-2">Staff, Rent, Maintenance</p>
              </div>
            </div>
          </div>
          
        </section>
      </div>

      {/* Global Conversion Modal Triggered Here */}
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source="AI DPR Engine Dashboard"
        contextData={{ machines: machines, breakeven: breakevenMonths }}
      />

      {/* Custom Scrollbar CSS for this specific terminal layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #010810; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </main>
  );
}

// Sub-component for KPI Row
function MetricCard({ title, value, icon, color }: any) {
  const isGold = color === "gold";
  const isBlue = color === "blue";
  
  return (
    <div className="bg-[#010810] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 blur-[40px] rounded-full opacity-10 group-hover:opacity-30 transition-opacity ${isGold ? "bg-[#D4AF37]" : isBlue ? "bg-[#3B82F6]" : "bg-white"}`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`text-gray-400 ${isGold ? "text-[#D4AF37]" : isBlue ? "text-[#3B82F6]" : ""}`}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
      </div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 relative z-10">{title}</p>
      <h3 className="text-2xl font-black text-white relative z-10">{value}</h3>
    </div>
  );
}