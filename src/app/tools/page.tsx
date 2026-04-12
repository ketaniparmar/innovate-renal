"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calculator,
  FileText,
  Users,
  ShieldCheck,
  Settings,
  Bell,
  Search,
  IndianRupee,
  Activity,
  Loader2,
  Download,
} from "lucide-react";

/* ----------------------------- CONFIG ----------------------------- */

const LEADS = [
  { name: "Apollo Clinics Surat", type: "Setup Quote", status: "New" },
  { name: "City Care Hospital", type: "AMC Renewal", status: "Pending" },
  { name: "Dr. Mehta (Nephro)", type: "RO Repair", status: "Urgent" },
];

const STATUS_STYLES: any = {
  New: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Pending: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Urgent: "bg-red-500/20 text-red-400 border-red-500/30",
};

/* ----------------------------- MAIN ----------------------------- */

export default function SaaSPlatform() {
  const [activeTab, setActiveTab] = useState("ai-engine");

  // AI Engine
  const [machines, setMachines] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dprReady, setDprReady] = useState(false);

  const machineCost = machines * 650000;
  const roCost = machines > 10 ? 450000 : 250000;
  const infraCost = 500000;

  const totalCapex = machineCost + roCost + infraCost;

  const handleGenerateDPR = () => {
    setIsGenerating(true);
    setDprReady(false);

    setTimeout(() => {
      setIsGenerating(false);
      setDprReady(true);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#010810] text-white flex overflow-hidden">

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-white/5 bg-white/[0.02]">
        
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-yellow-600 rounded flex items-center justify-center font-bold text-black mr-3">
            II
          </div>
          <span className="font-bold text-lg">
            Acquisition<span className="text-[#D4AF37]">OS</span>
          </span>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarItem icon={<Calculator size={18} />} label="AI Engine" active={activeTab === "ai-engine"} onClick={() => setActiveTab("ai-engine")} highlight />
          <SidebarItem icon={<Users size={18} />} label="Lead Pipeline" />
          <SidebarItem icon={<ShieldCheck size={18} />} label="AMC Tracking" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <main className="flex-1 flex flex-col h-screen">

        {/* HEADER */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#010810]/80 backdrop-blur">
          
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/40"
              placeholder="Search..."
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
              KP
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">

          <AnimatePresence mode="wait">

            {/* ---------------- AI ENGINE ---------------- */}
            {activeTab === "ai-engine" && (
              <motion.div key="ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <PageHeader
                  title="AI Planning Engine"
                  desc="Generate dialysis project feasibility & DPR instantly"
                />

                <div className="grid lg:grid-cols-3 gap-6">

                  {/* LEFT PANEL */}
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col">

                    <h3 className="font-bold mb-6 flex items-center gap-2">
                      <Calculator size={18} /> Parameters
                    </h3>

                    <div className="space-y-6 flex-1">

                      {/* Machines */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Machines</span>
                          <span className="text-[#D4AF37] font-bold">{machines}</span>
                        </div>

                        <input
                          type="range"
                          min="2"
                          max="50"
                          value={machines}
                          onChange={(e) => setMachines(Number(e.target.value))}
                          className="w-full accent-[#D4AF37]"
                        />
                      </div>

                      {/* CAPEX */}
                      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                        <p className="text-xs text-blue-400 uppercase">Estimated CAPEX</p>
                        <p className="text-3xl font-bold flex items-center mt-1">
                          <IndianRupee size={20} />
                          {(totalCapex / 100000).toFixed(2)}L
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateDPR}
                      disabled={isGenerating}
                      className="mt-6 bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                      {isGenerating ? <Loader2 className="animate-spin" /> : <FileText size={18} />}
                      {isGenerating ? "Generating..." : "Generate DPR"}
                    </button>
                  </div>

                  {/* RIGHT PANEL */}
                  <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center justify-center">

                    {!dprReady && !isGenerating && (
                      <EmptyState />
                    )}

                    {isGenerating && (
                      <LoadingState />
                    )}

                    {dprReady && (
                      <DPRCard machines={machines} />
                    )}

                  </div>
                </div>
              </motion.div>
            )}

            {/* ---------------- OVERVIEW ---------------- */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <PageHeader
                  title="Dashboard Overview"
                  desc="Sales pipeline + AMC system metrics"
                />

                {/* STATS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <StatCard title="Leads" value="24" />
                  <StatCard title="Active AMCs" value="42" highlight />
                  <StatCard title="Pipeline" value="₹4.2Cr" gold />
                </div>

                {/* TABLE */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <h3 className="font-bold mb-4">Recent Leads</h3>

                  <div className="space-y-3">
                    {LEADS.map((lead, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-white/[0.01] rounded-xl border border-white/5">

                        <div>
                          <p className="font-bold text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.type}</p>
                        </div>

                        <span className={`px-3 py-1 text-xs rounded-full border ${STATUS_STYLES[lead.status]}`}>
                          {lead.status}
                        </span>

                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SidebarItem({ icon, label, active, onClick, highlight }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition
      ${active ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}
      ${highlight ? "border border-[#D4AF37]/20" : ""}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function PageHeader({ title, desc }: any) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="text-gray-400 text-sm mt-1">{desc}</p>
    </div>
  );
}

function StatCard({ title, value, highlight, gold }: any) {
  return (
    <div className={`p-6 rounded-2xl border border-white/5
      ${highlight ? "bg-blue-500/10" : ""}
      ${gold ? "bg-[#D4AF37]/10" : "bg-white/[0.02]"}
    `}>
      <p className="text-xs text-gray-400 uppercase">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center opacity-50">
      <Activity size={40} className="mx-auto mb-3" />
      <p>Awaiting input</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center">
      <Loader2 className="animate-spin mx-auto mb-3" size={32} />
      <p className="text-[#D4AF37]">Generating DPR...</p>
    </div>
  );
}

function DPRCard({ machines }: any) {
  return (
    <div className="bg-white text-black p-6 rounded-xl w-full max-w-lg">
      <h3 className="font-bold text-xl mb-4">{machines}-Machine Setup</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-gray-500">Space</p>
          <p className="font-bold">{machines * 120} sq.ft</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">RO Capacity</p>
          <p className="font-bold">{machines > 10 ? "1000 LPH" : "500 LPH"}</p>
        </div>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2">
        <Download size={16} /> Download DPR
      </button>
    </div>
  );
}