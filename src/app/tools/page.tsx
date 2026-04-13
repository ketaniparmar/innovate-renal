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
  Search,
  IndianRupee,
  Activity,
  Loader2,
  Download,
  Zap,
  TrendingUp
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

/* ---------------- TYPES & CONFIG ---------------- */

interface DPRData {
  beds: number;
  space: number;
  ro: string;
  breakeven: string;
  revenue: string;
  roi: string;
}

const COST_CONFIG = {
  MACHINE_COST: 650000,
  RO_SMALL: 250000,
  RO_LARGE: 450000,
  INFRA: 500000,
};

const LEADS = [
  { name: "Apollo Clinics Surat", type: "Setup Quote", status: "New" },
  { name: "City Care Hospital", type: "AMC Renewal", status: "Pending" },
  { name: "Dr. Mehta (Nephro)", type: "RO Repair", status: "Urgent" },
];

const STATUS_STYLES: Record<string, string> = {
  New: "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  Pending: "bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30",
  Urgent: "bg-red-500/20 text-red-400 border-red-500/30",
};

/* ---------------- MAIN COMPONENT ---------------- */

export default function SaaSPlatform() {
  const [activeTab, setActiveTab] = useState("ai-engine");
  const [machines, setMachines] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dprData, setDprData] = useState<DPRData | null>(null);

  const calculateCost = () => {
    const machineCost = machines * COST_CONFIG.MACHINE_COST;
    const roCost = machines > 10 ? COST_CONFIG.RO_LARGE : COST_CONFIG.RO_SMALL;
    const total = machineCost + roCost + COST_CONFIG.INFRA;
    return { machineCost, roCost, total };
  };

  const { total } = calculateCost();

  const generateDPR = () => {
    setIsGenerating(true);
    setDprData(null);

    // Simulate AI processing time
    setTimeout(() => {
      setIsGenerating(false);
      setDprData({
        beds: machines,
        space: machines * 120,
        ro: machines > 10 ? "1000 LPH" : "500 LPH",
        breakeven: `${12 + Math.floor(machines / 5)} Months`,
        revenue: `₹${(machines * 2.4).toFixed(1)}L / month`,
        roi: `${18 + Math.floor(machines / 3)}%`,
      });
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-80px)] bg-[#010810] text-white flex overflow-hidden">

      {/* 📱 SIDEBAR */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-white/5 bg-white/[0.01] relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <span className="font-bold text-sm tracking-widest uppercase text-gray-500">
            Platform Menu
          </span>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <SidebarItem 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            active={activeTab === "overview"} 
            onClick={() => setActiveTab("overview")} 
          />
          <SidebarItem 
            icon={<Calculator size={18} />} 
            label="AI Engine" 
            active={activeTab === "ai-engine"} 
            onClick={() => setActiveTab("ai-engine")} 
            highlight 
          />
          <SidebarItem 
            icon={<Users size={18} />} 
            label="CRM Pipeline" 
            active={activeTab === "crm"} 
            onClick={() => setActiveTab("crm")} 
          />
          <SidebarItem 
            icon={<ShieldCheck size={18} />} 
            label="AMC System" 
            active={activeTab === "amc"} 
            onClick={() => setActiveTab("amc")} 
          />
        </nav>

        <div className="p-4 border-t border-white/5">
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </aside>

      {/* 🖥️ MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B82F6]/5 blur-[150px] rounded-full pointer-events-none" />

        {/* UTILITY CONTROL BAR */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-white/[0.01] backdrop-blur-md z-10">
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all text-white placeholder:text-gray-600" 
              placeholder="Search leads, projects..." 
            />
          </div>

          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold uppercase tracking-widest text-green-500 bg-green-500/10 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> System Online
             </span>
          </div>
        </header>

        {/* DYNAMIC DASHBOARD VIEWS */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 z-10">
          <AnimatePresence mode="wait">

            {/* VIEW 1: OVERVIEW */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <PageHeader title="Business Intelligence" desc="Real-time Sales Pipeline & Care Network Metrics." />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <StatCard title="Active Leads" value="24" />
                  <StatCard title="Live AMCs" value="42" highlight />
                  <StatCard title="Pipeline Value" value="₹4.2Cr" gold />
                </div>

                <GlassCard accentColor="white" hover={false} className="p-0 overflow-hidden border-white/10">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="font-bold text-sm uppercase tracking-widest">Recent Activity</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {LEADS.map((lead, i) => (
                      <div key={i} className="flex justify-between items-center p-6 hover:bg-white/[0.02] transition-colors">
                        <div>
                          <p className="font-bold text-white mb-1">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.type}</p>
                        </div>
                        <span className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border ${STATUS_STYLES[lead.status]}`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* VIEW 2: AI ENGINE */}
            {activeTab === "ai-engine" && (
              <motion.div key="ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <PageHeader title="AI Planning Engine" desc="Instant dialysis DPR, ROI & feasibility modeling." />

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* LEFT: CONTROLS */}
                  <GlassCard accentColor="gold" className="flex flex-col h-full p-6 lg:p-8">
                    <h3 className="font-bold mb-8 flex items-center gap-2 text-[#D4AF37] uppercase tracking-widest text-xs">
                      <Calculator size={16} /> Project Parameters
                    </h3>

                    <div className="space-y-8 flex-1">
                      <div>
                        <div className="flex justify-between text-sm mb-4">
                          <span className="text-gray-400">Dialysis Machines</span>
                          <span className="text-white font-bold text-lg">{machines} Units</span>
                        </div>
                        <input
                          type="range" min="2" max="50" value={machines}
                          onChange={(e) => setMachines(Number(e.target.value))}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                      </div>

                      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-6 rounded-2xl">
                        <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Estimated Base CAPEX</p>
                        <p className="text-4xl font-black flex items-center text-white">
                          <IndianRupee size={24} className="opacity-50 mr-1" />
                          {(total / 100000).toFixed(2)}L
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={generateDPR}
                      disabled={isGenerating}
                      className="mt-8 w-full bg-[#D4AF37] text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                      {isGenerating ? "Architecting Model..." : "Generate Smart DPR"}
                    </button>
                  </GlassCard>

                  {/* RIGHT: OUTPUT AREA */}
                  <div className="lg:col-span-2 flex items-center justify-center border border-white/5 bg-white/[0.01] rounded-[2.5rem] p-8 min-h-[400px]">
                    {!dprData && !isGenerating && <EmptyState />}
                    {isGenerating && <LoadingState />}
                    {dprData && <DPRCard data={dprData} />}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: CRM PIPELINE */}
            {activeTab === "crm" && (
              <motion.div key="crm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <PageHeader title="CRM Pipeline" desc="Manage hospital leads and quotation requests." />
                
                <GlassCard accentColor="gold" hover={false} className="p-0 overflow-hidden border-white/10">
                  <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-[#D4AF37]">Active Deals</h3>
                  </div>
                  <div className="p-8 text-center text-gray-500 min-h-[300px] flex flex-col items-center justify-center">
                    <Users size={48} className="mb-4 opacity-20" />
                    <p className="font-bold text-white mb-2">Lead Database Connected</p>
                    <p className="text-sm">New leads from the /contact page will automatically route here.</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* VIEW 4: AMC SYSTEM */}
            {activeTab === "amc" && (
              <motion.div key="amc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <PageHeader title="AMC Management" desc="Monitor active maintenance contracts and machine uptime." />
                
                <GlassCard accentColor="blue" hover={false} className="p-0 overflow-hidden border-white/10">
                  <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-[#3B82F6]">Contract Status</h3>
                  </div>
                  <div className="p-8 text-center text-gray-500 min-h-[300px] flex flex-col items-center justify-center">
                    <ShieldCheck size={48} className="mb-4 opacity-20" />
                    <p className="font-bold text-white mb-2">Service Network Online</p>
                    <p className="text-sm">Engineer dispatching and ticket tracking module is ready.</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ---------------- SUB-COMPONENTS ---------------- */

function SidebarItem({ icon, label, active, onClick, highlight }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
      ${active ? "bg-white/10 text-white shadow-inner" : "text-gray-500 hover:bg-white/5 hover:text-white"}
      ${highlight && active ? "border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5" : ""}`}
    >
      {icon}
      {label}
    </button>
  );
}

function PageHeader({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2">{title}</h1>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function StatCard({ title, value, highlight, gold }: { title: string, value: string, highlight?: boolean, gold?: boolean }) {
  return (
    <div className={`p-8 rounded-3xl border border-white/5 relative overflow-hidden
      ${highlight ? "bg-[#3B82F6]/5" : ""}
      ${gold ? "bg-[#D4AF37]/5" : "bg-white/[0.02]"}`}>
      <div className={`absolute top-0 left-0 w-1 h-full 
        ${highlight ? "bg-[#3B82F6]" : gold ? "bg-[#D4AF37]" : "bg-white/20"}`} 
      />
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{title}</p>
      <p className={`text-4xl font-black ${highlight ? "text-[#3B82F6]" : gold ? "text-[#D4AF37]" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center opacity-30 flex flex-col items-center">
      <Activity size={60} className="mb-6" />
      <p className="font-bold text-xl tracking-tight">Awaiting Parameters</p>
      <p className="text-sm mt-2">Adjust sliders to generate model.</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center flex flex-col items-center">
      <Loader2 className="animate-spin mb-6 text-[#D4AF37]" size={48} />
      <p className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm animate-pulse">
        Compiling Neural Blueprint...
      </p>
    </div>
  );
}

function DPRCard({ data }: { data: DPRData }) {
  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white text-[#010810] p-8 md:p-10 rounded-3xl w-full max-w-xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#D4AF37] to-[#3B82F6]" />
      
      <div className="flex justify-between items-start mb-8">
         <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Project Feasibility Report</span>
            <h3 className="font-black text-3xl tracking-tight mt-1">{data.beds}-Bed Facility</h3>
         </div>
         <ShieldCheck className="text-green-500" size={32} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Info label="Est. Floor Space" value={`${data.space} sq.ft`} />
        <Info label="Required RO Capacity" value={data.ro} />
        <Info label="Projected Revenue" value={data.revenue} />
        <Info label="Expected ROI (Annual)" value={data.roi} />
      </div>

      <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex justify-between items-center">
        <div>
           <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Capital Breakeven</p>
           <p className="font-black text-3xl text-blue-600">{data.breakeven}</p>
        </div>
        <TrendingUp className="text-blue-200" size={48} />
      </div>

      <button className="w-full bg-[#010810] hover:bg-gray-800 text-white py-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
        <Download size={16} /> Download Full PDF Report
      </button>
    </motion.div>
  );
}

function Info({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="font-bold text-lg text-gray-900">{value}</p>
    </div>
  );
}