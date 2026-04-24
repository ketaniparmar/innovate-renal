import React from "react";
import { PieChart, HardDrive, Construction, AlertCircle, IndianRupee } from "lucide-react";

// 1. STRICT UI CONTRACT: We define exactly what the UI expects from the API.
export interface CapexBreakdownProps {
  data?: {
    civil: number;
    equipment: number;
    ro: number;
    mep: number;
    contingency: number;
    totalCapex: number;
  } | null;
}

export default function CapexDetailedBreakdown({ data }: CapexBreakdownProps) {
  // 2. GRACEFUL FALLBACK: If the API hasn't sent data yet, show a placeholder.
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-gray-800 border-dashed rounded-xl bg-gray-900/50">
        <AlertCircle className="w-8 h-8 mb-3 text-yellow-500/70" />
        <h3 className="text-sm font-medium text-gray-300">Awaiting Sovereign Engine</h3>
        <p className="text-xs text-gray-500">CAPEX calculations are now securely processed by the backend.</p>
      </div>
    );
  }

  // 3. PURE RENDERING: No math happens here. Just formatting numbers.
  return (
    <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
      <div className="flex items-center mb-6 space-x-3">
        <PieChart className="w-6 h-6 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">CAPEX Breakdown</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="flex items-center text-gray-400"><Construction className="w-4 h-4 mr-2"/> Civil Works</span>
          <span className="text-white">₹{(data.civil).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="flex items-center text-gray-400"><HardDrive className="w-4 h-4 mr-2"/> Equipment</span>
          <span className="text-white">₹{(data.equipment).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 pl-6">RO Water Plant</span>
          <span className="text-white">₹{(data.ro).toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 pl-6">MEP (Electrical/HVAC)</span>
          <span className="text-white">₹{(data.mep).toLocaleString('en-IN')}</span>
        </div>
        <div className="pt-4 border-t border-gray-800 flex justify-between font-bold">
          <span className="text-gray-300">Total Infrastructure CAPEX</span>
          <span className="text-blue-400">₹{(data.totalCapex).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}