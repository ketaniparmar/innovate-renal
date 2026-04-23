"use client";

import React, { useMemo } from "react";
import { useInfra } from "@/context/InfrastructureContext";
import { calculateDetailedCapex } from "@/lib/capex-engine";
import { PieChart, HardDrive, Construction, AlertCircle, IndianRupee } from "lucide-react";

export default function CapexDetailedBreakdown() {
  const { machines } = useInfra();
  const capex = useMemo(() => calculateDetailedCapex(machines), [machines]);

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-[#020617] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-2 italic">Capital Allocation Audit</h3>
          <h2 className="text-4xl font-black text-white tracking-tighter">CAPEX Breakdown.</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500 uppercase font-bold">Total Investment</p>
          <p className="text-3xl font-black text-white tracking-tighter">₹ {formatINR(capex.total)}</p>
        </div>
      </header>

      {/* VISUAL BAR CHART */}
      <div className="h-4 w-full flex rounded-full overflow-hidden mb-12 bg-white/5">
        <div style={{ width: `${capex.breakdown[0].pct}%` }} className="bg-[#D4AF37]" />
        <div style={{ width: `${capex.breakdown[1].pct}%` }} className="bg-blue-500" />
        <div style={{ width: `${capex.breakdown[2].pct}%` }} className="bg-emerald-500" />
        <div style={{ width: `${capex.breakdown[3].pct}%` }} className="bg-gray-600" />
      </div>

      {/* LINE ITEM TABLE */}
      <div className="space-y-4">
        {capex.breakdown.map((item, i) => (
          <div key={i} className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-6">
              <div className="p-3 bg-white/5 rounded-xl text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                {i === 0 && <HardDrive size={20} />}
                {i === 1 && <PieChart size={20} />}
                {i === 2 && <Construction size={20} />}
                {i === 3 && <AlertCircle size={20} />}
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">{item.item}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{item.pct.toFixed(1)}% of Total Capital</p>
              </div>
            </div>
            <p className="text-xl font-black text-white tracking-tight">₹ {formatINR(item.cost)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}