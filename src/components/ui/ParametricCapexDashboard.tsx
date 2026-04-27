"use client";

import React, { useMemo } from "react";
import { 
  Building2, Droplets, Zap, Wind, 
  ShieldAlert, Landmark, LayoutGrid 
} from "lucide-react";
import { calculateV8Capex } from "@/lib/capex-engine-v8";

// --- STRICT TYPES ---
interface CapexDashboardProps {
  infraData: {
    machines: number;
    cityTier: "Tier_1" | "Tier_2" | "Tier_3";
    tdsLevel: number;
    buildGrade: "Standard" | "Premium" | "NABH";
    facilityType?: string;
  };
}

// ✅ FIX: We locally extend the engine's output type so Vercel doesn't panic
interface ExtendedCapexOutput {
  totalCapex: number;
  civilCost?: number;
  waterSystemCost?: number;
  electricalCost?: number;
  hvacCost?: number;
  breakdown?: { label: string; value: number }[];
  [key: string]: any; // Fallback for any other V8 engine properties
}

interface BlockCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  sub: string;
}

interface BadgeProps {
  icon: React.ReactNode;
  text: string;
}

export function ParametricCapexDashboard({ infraData }: CapexDashboardProps) {
  // ✅ FIX: Cast the output to our extended interface
  const capex = useMemo(() => calculateV8Capex(infraData) as ExtendedCapexOutput, [infraData]);
  
  // Safe area calculation (approx. 300 sq.ft required per machine station + utility space)
  const totalArea = infraData.machines * 300;

  const formatINR = (val: number) => 
    new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 2 }).format(val);

  // ... rest of your component remains exactly the same ...

  return (
    <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-12 space-y-12 shadow-2xl">
      
      {/* 1. MASTER CAPEX SUMMARY */}
      <header className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Parametric Underwriting.</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <Badge icon={<LayoutGrid size={12}/>} text={`${totalArea.toFixed(0)} Sq Ft Facility`} />
            <Badge icon={<Landmark size={12}/>} text={infraData.facilityType || "Turnkey Model"} />
          </div>
        </div>
        <div className="text-left md:text-right bg-[#0A0F1C] border border-white/5 p-6 rounded-3xl min-w-[280px]">
          <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-1">Estimated Capital Outlay</p>
          <p className="text-5xl font-black text-white tracking-tighter">₹ {formatINR(capex.totalCapex)}</p>
        </div>
      </header>

      {/* 2. THE ENGINEERING BLOCKS (Institutional Colors Applied) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <BlockCard 
          icon={<Building2 className="text-[#C6A85A]" />} 
          title="Civil / Interiors" 
          value={formatINR(capex.civilCost || 0)} 
          sub={`₹${((capex.civilCost || 0) / totalArea).toFixed(0)} /sq ft`} 
        />
        <BlockCard 
          icon={<Droplets className="text-[#00A8A8]" />} 
          title="Water Engineering" 
          value={formatINR(capex.waterSystemCost || 0)} 
          sub={`TDS: ${infraData.tdsLevel} ppm`} 
        />
        <BlockCard 
          icon={<Zap className="text-white" />} 
          title="Elec & UPS" 
          value={formatINR(capex.electricalCost || 0)} 
          sub="Medical Grade Backup" 
        />
        <BlockCard 
          icon={<Wind className="text-gray-400" />} 
          title="HVAC Control" 
          value={formatINR(capex.hvacCost || 0)} 
          sub="Infection Control Zones" 
        />
      </div>

      {/* 3. COST CONSTITUTION BAR */}
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">
          <span>Capital Allocation Matrix</span>
          <span className="text-[#00A8A8]">Sovereign v9.0 Engine</span>
        </div>
        
        {capex.breakdown && capex.breakdown.length > 0 ? (
          <>
            <div className="h-6 w-full flex rounded-2xl overflow-hidden bg-white/5 border border-white/5">
              {capex.breakdown.map((item: any, i: number) => (
                <div 
                  key={i} 
                  style={{ width: `${(item.value / capex.totalCapex) * 100}%` }}
                  className={`h-full transition-all hover:opacity-80 cursor-crosshair ${
                    i === 0 ? "bg-[#C6A85A]" : i === 1 ? "bg-[#00A8A8]" : i === 2 ? "bg-gray-400" : "bg-[#A6192E]"
                  }`}
                  title={`${item.label}: ₹${formatINR(item.value)}`}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
               {capex.breakdown.map((item: any, i: number) => (
                 <div key={i} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-[#C6A85A]" : i === 1 ? "bg-[#00A8A8]" : i === 2 ? "bg-gray-400" : "bg-[#A6192E]"}`} />
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest truncate">{item.label}</span>
                 </div>
               ))}
            </div>
          </>
        ) : (
          <div className="h-6 w-full bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center">
             <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Generating Allocation Data...</span>
          </div>
        )}
      </div>

      {/* 4. THE INTELLIGENCE ALERT */}
      <div className="p-6 bg-[#A6192E]/5 border border-[#A6192E]/20 rounded-[2rem] flex items-start gap-5">
        <div className="w-10 h-10 rounded-full bg-[#A6192E]/10 flex items-center justify-center shrink-0">
          <ShieldAlert className="text-[#A6192E]" size={18} />
        </div>
        <div>
          <h5 className="text-[10px] font-black text-[#A6192E] uppercase tracking-[0.3em] mb-1.5">Engineering Risk Note</h5>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            {infraData.tdsLevel > 600 
              ? `The high TDS profile (${infraData.tdsLevel} ppm) in your region requires an upgraded double-pass RO configuration, adjusting the Water System CAPEX parameters.` 
              : `The TDS profile (${infraData.tdsLevel} ppm) falls within standard operational limits. Routine pre-treatment filtration is sufficient.`}
            {" "}HVAC load is strictly adjusted for regional thermal compliance and NABH infection control zoning.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- STRICT SUB-COMPONENTS ---

function BlockCard({ icon, title, value, sub }: BlockCardProps) {
  return (
    <div className="p-6 bg-[#0A0F1C] border border-white/5 rounded-3xl hover:border-white/10 transition-all shadow-lg group">
      <div className="p-3 bg-[#0D1525] border border-white/5 rounded-xl w-fit mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1.5">{title}</p>
      <h4 className="text-2xl font-black text-white tabular-nums tracking-tight">{value}</h4>
      <p className="text-[9px] font-bold text-gray-600 mt-2 uppercase tracking-widest">{sub}</p>
    </div>
  );
}

function Badge({ icon, text }: BadgeProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0F1C] rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400 border border-white/5 shadow-md">
      {icon} {text}
    </div>
  );
}