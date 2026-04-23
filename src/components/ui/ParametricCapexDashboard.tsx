"use client";

import React, { useMemo } from "react";
import { 
  Building2, Droplets, Zap, Wind, 
  ShieldAlert, Landmark, LayoutGrid, Info 
} from "lucide-react";

export function ParametricCapexDashboard({ infraData }: any) {
  const capex = useMemo(() => calculateSovereignCapex(infraData), [infraData]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(val);

  return (
    <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] p-8 space-y-12 shadow-2xl">
      
      {/* 1. MASTER CAPEX SUMMARY */}
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Parametric Underwriting.</h2>
          <div className="flex gap-4 mt-2">
            <Badge icon={<LayoutGrid size={12}/>} text={`${capex.totalArea.toFixed(0)} Sq Ft Facility`} />
            <Badge icon={<Landmark size={12}/>} text={`${infraData.facilityType} Model`} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-1">Estimated Capital Outlay</p>
          <p className="text-5xl font-black text-white tracking-tighter">₹ {formatINR(capex.totalCapex)}</p>
        </div>
      </header>

      {/* 2. THE ENGINEERING BLOCKS */}
      <div className="grid md:grid-cols-4 gap-6">
        <BlockCard icon={<Building2 className="text-blue-400" />} title="Civil / Interiors" value={formatINR(capex.civilCost)} sub={`₹${(capex.civilCost / capex.totalArea).toFixed(0)} /sq ft`} />
        <BlockCard icon={<Droplets className="text-cyan-400" />} title="Water Engineering" value={formatINR(capex.waterSystemCost)} sub={`TDS: ${infraData.tdsLevel} ppm`} />
        <BlockCard icon={<Zap className="text-yellow-400" />} title="Elec & UPS" value={formatINR(capex.electricalCost)} sub="Medical Grade Backup" />
        <BlockCard icon={<Wind className="text-emerald-400" />} title="HVAC Control" value={formatINR(capex.hvacCost)} sub="Infection Control Zones" />
      </div>

      {/* 3. COST CONSTITUTION BAR */}
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
          <span>Capital Allocation Matrix</span>
          <span>Sovereign v6 Audit</span>
        </div>
        <div className="h-6 w-full flex rounded-2xl overflow-hidden bg-white/5 border border-white/5">
          {capex.breakdown.map((item, i) => (
            <div 
              key={i} 
              style={{ width: `${(item.value / capex.totalCapex) * 100}%` }}
              className={`h-full transition-all hover:opacity-80 cursor-help ${
                i === 0 ? "bg-blue-600" : i === 1 ? "bg-[#D4AF37]" : i === 2 ? "bg-emerald-600" : "bg-gray-700"
              }`}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2">
           {capex.breakdown.map((item, i) => (
             <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-blue-600" : i === 1 ? "bg-[#D4AF37]" : i === 2 ? "bg-emerald-600" : "bg-gray-700"}`} />
                <span className="text-[9px] text-gray-500 font-bold uppercase">{item.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* 4. THE INTELLIGENCE ALERT */}
      <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-3xl flex gap-4">
        <ShieldAlert className="text-[#D4AF37] shrink-0" size={20} />
        <div>
          <h5 className="text-xs font-black text-white uppercase tracking-widest mb-1">Engineering Risk Note</h5>
          <p className="text-[10px] text-gray-400 leading-relaxed italic">
            The high TDS profile ({infraData.tdsLevel} ppm) in your region requires a double-pass RO configuration, increasing the Water System CAPEX by 30%. HVAC load is adjusted for Gujarat thermal standards.
          </p>
        </div>
      </div>
    </div>
  );
}

function BlockCard({ icon, title, value, sub }: any) {
  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
      <div className="p-3 bg-black/40 rounded-xl w-fit mb-4">{icon}</div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-2xl font-black text-white tabular-nums">₹ {value}</h4>
      <p className="text-[9px] font-bold text-gray-600 mt-1 uppercase italic">{sub}</p>
    </div>
  );
}

function Badge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-gray-400 border border-white/5">
      {icon} {text}
    </div>
  );
}