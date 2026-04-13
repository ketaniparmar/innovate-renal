"use client";

import React, { useState } from "react";
import { IndianRupee, Download, Activity, Target, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

// --- TYPES ---
interface InputProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
  prefix?: string;
}

interface CardProps {
  title: string;
  value: string | number;
  highlight?: boolean;
  isCurrency?: boolean;
}

export default function DPRCalculator() {
  const [machines, setMachines] = useState(10);
  const [sessionsPerDay, setSessionsPerDay] = useState(20);
  const [pricePerSession, setPricePerSession] = useState(1800);
  const [mode, setMode] = useState<"reuse" | "single">("reuse");

  /* ---------- COST LOGIC ---------- */
  const reuseCycles = 6;
  const dialyzerBase = 1200;
  const dialyzerCost = mode === "reuse" ? dialyzerBase / reuseCycles : dialyzerBase;

  const tubing = 250;
  const staff = 400;
  const electricity = 150;
  const misc = 200;

  const costPerSession = dialyzerCost + tubing + staff + electricity + misc;

  /* ---------- VOLUME ---------- */
  const monthlySessions = sessionsPerDay * 30;

  /* ---------- FINANCIALS ---------- */
  const monthlyRevenue = monthlySessions * pricePerSession;
  const monthlyCost = monthlySessions * costPerSession;

  const profit = monthlyRevenue - monthlyCost;
  const margin = monthlyRevenue > 0 ? (profit / monthlyRevenue) * 100 : 0;

  /* ---------- CAPEX ---------- */
  const machineCost = machines * 650000;
  const infraCost = 500000;
  const roCost = machines > 10 ? 450000 : 250000;

  const totalCapex = machineCost + infraCost + roCost;
  const breakevenMonths = profit > 0 ? totalCapex / profit : 0;

  return (
    <GlassCard accentColor={mode === "reuse" ? "gold" : "blue"} hover={false} className="max-w-6xl mx-auto p-8 lg:p-10">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
        <div className={`p-3 rounded-xl ${mode === "reuse" ? "bg-[#D4AF37]/10" : "bg-blue-500/10"}`}>
          <Target className={mode === "reuse" ? "text-[#D4AF37]" : "text-blue-500"} size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">AI DPR Engine</h2>
          <p className="text-sm text-gray-400">Dynamic feasibility and ROI projection model.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT: INPUT PANEL */}
        <div className="space-y-6">
          <div className="flex bg-[#010810] p-1.5 rounded-xl border border-white/10 shrink-0 mb-6">
            <button
              onClick={() => setMode("reuse")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                mode === "reuse"
                  ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Reuse
            </button>
            <button
              onClick={() => setMode("single")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                mode === "single"
                  ? "bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Single Use
            </button>
          </div>

          <div className="space-y-5 bg-[#010810] p-6 rounded-2xl border border-white/5">
            <Input label="Dialysis Machines" value={machines} setValue={setMachines} />
            <Input label="Est. Sessions / Day" value={sessionsPerDay} setValue={setSessionsPerDay} />
            <Input label="Price / Session" value={pricePerSession} setValue={setPricePerSession} prefix="₹" />
          </div>
        </div>

        {/* RIGHT: KPI PANEL */}
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
          <StatCard title="Monthly Revenue" value={monthlyRevenue} isCurrency />
          <StatCard title="Monthly OPEX" value={monthlyCost} isCurrency />
          
          <StatCard 
            title="EBITDA (Monthly Profit)" 
            value={profit} 
            isCurrency 
            highlight={mode === "reuse" ? "gold" : "blue"} 
          />
          <StatCard title="Profit Margin" value={`${margin.toFixed(1)}%`} />

          <StatCard title="Total Required CAPEX" value={totalCapex} isCurrency />
          <StatCard 
            title="Capital Break-even" 
            value={breakevenMonths > 0 ? `${breakevenMonths.toFixed(1)} Months` : "Never"} 
            highlight={mode === "reuse" ? "gold" : "blue"} 
          />
        </div>

      </div>

      {/* DOWNLOAD CTA */}
      <button className="mt-10 w-full bg-white hover:bg-gray-200 text-[#010810] py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3">
        <Download size={18} /> Generate Official DPR PDF
      </button>
    </GlassCard>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function Input({ label, value, setValue, prefix }: InputProps) {
  return (
    <div>
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={`w-full bg-black/40 border border-white/10 rounded-xl py-3 text-sm font-bold text-white focus:outline-none focus:border-white/30 transition-colors ${prefix ? 'pl-8 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, highlight, isCurrency }: CardProps & { highlight?: "gold" | "blue" }) {
  const isGold = highlight === "gold";
  const isBlue = highlight === "blue";

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isGold ? "bg-[#D4AF37]/10 border-[#D4AF37]/30" : 
      isBlue ? "bg-blue-500/10 border-blue-500/30" : 
      "bg-white/[0.02] border-white/5"
    }`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${
        isGold ? "text-[#D4AF37]" : isBlue ? "text-blue-400" : "text-gray-500"
      }`}>
        {title}
      </p>
      <p className="text-3xl font-black tracking-tighter flex items-center text-white">
        {isCurrency && typeof value === "number" && <IndianRupee size={24} className="opacity-50 mr-1" />}
        {typeof value === "number" && isCurrency
          ? (value / 100000).toFixed(2) + "L"
          : value}
      </p>
    </div>
  );
}