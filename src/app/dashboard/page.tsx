"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Activity, TrendingUp, AlertOctagon, 
  FileText, ArrowRight, MapPin, BarChart3, Clock,
  ShieldCheck, LayoutDashboard, Settings
} from "lucide-react";

// --- MOCK DATA (Mapped to your Supabase Schema) ---
// In natural English, representing real Indian dialysis scenarios
const PORTFOLIO_METRICS = {
  totalDeployed: "₹ 6.4 Cr",
  activeProjects: 3,
  blendedPayback: "28 Months",
  monthlyEbitda: "₹ 11.2 L"
};

const PROJECTS = [
  {
    id: "PRJ-SURAT-01",
    name: "Surat Central Superspeciality",
    location: "Gujarat • Tier 1",
    machines: 20,
    status: "HEALTHY",
    capex: "₹ 2.8 Cr",
    ebitda: "₹ 5.8 L",
    occupancy: 85,
    insight: "Operating at optimal capacity. High private payor mix is driving strong EBITDA margins.",
    compliance: "Single-Use Mandated (Audit Safe)",
  },
  {
    id: "PRJ-VAPI-02",
    name: "Vapi Industrial Healthcare",
    location: "Gujarat • Tier 2",
    machines: 10,
    status: "RAMP_UP",
    capex: "₹ 1.4 Cr",
    ebitda: "₹ 1.2 L",
    occupancy: 45,
    insight: "Currently in the 6-month ramp-up window. Utilizing working capital buffer. Marketing intervention recommended to boost footfall.",
    compliance: "Single-Use Mandated",
  },
  {
    id: "PRJ-NASHIK-03",
    name: "Nashik Municipal Dialysis Unit",
    location: "Maharashtra • Tier 2",
    machines: 15,
    status: "OPTIMIZED",
    capex: "₹ 2.2 Cr",
    ebitda: "₹ 4.2 L",
    occupancy: 78,
    insight: "Dialyzer reuse protocol is active and compliant. Lowest per-session operating cost in the current portfolio.",
    compliance: "Reuse Protocol Active",
  }
];

export default function PortfolioDashboard() {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "COMPARE">("OVERVIEW");

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-24 pb-24 text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- 1. DASHBOARD HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-widest text-[#C6A85A] flex items-center gap-2">
                <LayoutDashboard size={12}/> Executive View
              </span>
              <span className="text-xs text-gray-500 font-medium">Welcome back, Director</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A8A8] to-[#6EE7B7]">Intelligence.</span>
            </h1>
          </div>

          <div className="flex bg-[#121A2F] p-1.5 rounded-2xl border border-white/5">
            <button 
              onClick={() => setActiveTab("OVERVIEW")}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "OVERVIEW" ? 'bg-[#00A8A8] text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab("COMPARE")}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "COMPARE" ? 'bg-[#00A8A8] text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Compare Assets
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "OVERVIEW" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              
              {/* --- 2. HERO METRICS (CFO LAYER) --- */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <MetricCard title="Total Capital Deployed" value={PORTFOLIO_METRICS.totalDeployed} icon={<Building2 />} trend="+12% YoY" />
                <MetricCard title="Active Clinical Assets" value={PORTFOLIO_METRICS.activeProjects.toString()} icon={<Activity />} />
                <MetricCard title="Blended Payback Horizon" value={PORTFOLIO_METRICS.blendedPayback} icon={<Clock />} />
                <MetricCard title="Monthly Portfolio EBITDA" value={PORTFOLIO_METRICS.monthlyEbitda} icon={<TrendingUp />} highlight />
              </div>

              {/* --- 3. AI PORTFOLIO INSIGHT --- */}
              <div className="bg-[#121A2F]/80 border border-[#C6A85A]/30 rounded-[2rem] p-6 mb-10 flex items-start gap-4">
                <BarChart3 className="text-[#C6A85A] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#C6A85A] mb-1">Automated Analyst Note</h4>
                  <p className="text-sm text-gray-300 font-medium leading-relaxed">
                    Your capital allocation is currently weighted heavily towards Tier 1 & Tier 2 urban centers. While the Surat unit is yielding high margins, the Vapi facility requires a temporary injection from your 6-month working capital buffer to sustain operations until patient volume stabilizes.
                  </p>
                </div>
              </div>

              {/* --- 4. PROJECT GRID --- */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white">Active Deployments</h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] hover:text-teal-400 flex items-center gap-1">
                  View All <ArrowRight size={14}/>
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {PROJECTS.map((project) => (
                  <ProjectCard key={project.id} data={project} />
                ))}
                
                {/* Add New Project Ghost Card */}
                <button className="bg-transparent border-2 border-dashed border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-[#00A8A8]/50 hover:bg-[#00A8A8]/5 transition-all group min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#00A8A8]/20 transition-colors">
                    <Building2 size={24} className="group-hover:text-[#00A8A8]" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">Simulate New Facility</h4>
                  <p className="text-xs text-center font-medium opacity-70">Run the underwriting engine to evaluate a new geographical market.</p>
                </button>
              </div>

            </motion.div>
          )}

          {activeTab === "COMPARE" && (
            <motion.div key="compare" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#121A2F]/50 border border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
              <FileText size={48} className="text-[#00A8A8] mb-6 opacity-50" />
              <h2 className="text-2xl font-black text-white mb-4">Comparison Matrix Active</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8 font-medium">
                Select up to 3 projects from your portfolio to view a side-by-side financial breakdown, including CAPEX variance and state-level compliance impacts.
              </p>
              <button className="bg-[#00A8A8] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(0,168,168,0.2)] hover:bg-teal-500 hover:scale-105 transition-all">
                Select Projects to Compare
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function MetricCard({ title, value, icon, trend, highlight = false }: any) {
  return (
    <div className={`p-6 rounded-3xl border relative overflow-hidden ${highlight ? 'bg-[#00A8A8]/10 border-[#00A8A8]/30' : 'bg-[#121A2F] border-white/5'}`}>
      {highlight && <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00A8A8]/20 blur-[40px] rounded-full" />}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl ${highlight ? 'bg-[#00A8A8]/20 text-[#00A8A8]' : 'bg-white/5 text-gray-400'}`}>
          {icon}
        </div>
        {trend && <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{trend}</span>}
      </div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
      <h3 className={`text-2xl font-black ${highlight ? 'text-white' : 'text-slate-200'}`}>{value}</h3>
    </div>
  );
}

function ProjectCard({ data }: { data: any }) {
  const isWarning = data.status === "RAMP_UP";
  
  return (
    <div className="bg-[#121A2F] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:border-white/10 transition-colors relative overflow-hidden group">
      
      {/* Status Glow */}
      <div className={`absolute top-0 right-0 w-40 h-40 blur-[60px] rounded-full opacity-20 pointer-events-none ${isWarning ? 'bg-amber-500' : 'bg-[#00A8A8]'}`} />

      <div>
        <div className="flex justify-between items-start mb-6">
          <span className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${isWarning ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-[#00A8A8]/10 text-[#00A8A8] border border-[#00A8A8]/20'}`}>
            {data.status.replace("_", " ")}
          </span>
          <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
            <MapPin size={10}/> {data.location}
          </span>
        </div>

        <h3 className="text-xl font-black text-white mb-2 leading-tight">{data.name}</h3>
        <p className="text-xs text-gray-400 font-medium mb-6">{data.machines} Active Machines</p>

        {/* Financial Mini-Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-white/5 border border-white/5">
          <div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Setup CAPEX</p>
            <p className="text-sm font-black text-white">{data.capex}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Monthly EBITDA</p>
            <p className="text-sm font-black text-[#6EE7B7]">{data.ebitda}</p>
          </div>
        </div>

        {/* Occupancy Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Occupancy Rate</span>
            <span className="text-xs font-black text-white">{data.occupancy}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${isWarning ? 'bg-amber-500' : 'bg-[#00A8A8]'}`} 
              style={{ width: `${data.occupancy}%` }}
            />
          </div>
        </div>

        {/* Natural English Insight */}
        <p className="text-[11px] text-gray-400 font-medium leading-relaxed mb-6 italic border-l-2 border-white/10 pl-3">
          "{data.insight}"
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6">
          {data.compliance.includes("Single-Use") ? <AlertOctagon size={14} className="text-red-400"/> : <ShieldCheck size={14} className="text-[#00A8A8]"/>}
          <span className={`text-[10px] font-bold uppercase tracking-widest ${data.compliance.includes("Single-Use") ? 'text-red-400' : 'text-[#00A8A8]'}`}>
            {data.compliance}
          </span>
        </div>

        <button className="w-full py-3.5 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center justify-center gap-2 text-white group-hover:border-white/20">
          <FileText size={14} /> View Latest DPR
        </button>
      </div>
    </div>
  );
}