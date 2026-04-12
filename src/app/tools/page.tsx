"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Calculator, FileText, Users, ShieldCheck, 
  Settings, Bell, Search, IndianRupee, Activity, Loader2, Download
} from "lucide-react";

export default function SaaSPlatform() {
  const [activeTab, setActiveTab] = useState("ai-engine");
  
  // AI Engine States
  const [machines, setMachines] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dprReady, setDprReady] = useState(false);

  // Mock Math for UI realism
  const machineCost = machines * 650000;
  const roCost = machines > 10 ? 450000 : 250000;
  const totalCapex = machineCost + roCost + 500000; // Base infrastructure

  const handleGenerateDPR = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDprReady(true);
    }, 2500); // Fake processing time for premium feel
  };

  return (
    <div className="min-h-screen bg-[#010810] text-white flex overflow-hidden selection:bg-[#D4AF37] selection:text-[#010810]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white/[0.02] border-r border-white/5 hidden lg:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center font-bold text-[#010810] mr-3">
            II
          </div>
          <span className="font-bold text-lg tracking-tight">Acquisition<span className="text-[#D4AF37]">OS</span></span>
        </div>
        
        <div className="p-4 flex-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Platform</p>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "overview" ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <LayoutDashboard size={18} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab("ai-engine")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "ai-engine" ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
            >
              <Calculator size={18} /> AI Planning Engine
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
              <Users size={18} /> Lead Pipeline
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
              <ShieldCheck size={18} /> AMC Tracking
            </button>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings size={18} /> Settings
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B82F6]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* TOP HEADER */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#010810]/80 backdrop-blur-md z-10">
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search projects, leads..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3B82F6] to-blue-400 border border-white/10 flex items-center justify-center text-sm font-bold">
              KP
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: AI PLANNING ENGINE (Step 7) */}
            {activeTab === "ai-engine" && (
              <motion.div 
                key="ai-engine"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="max-w-6xl mx-auto"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold tracking-tight mb-2">AI Planning Engine</h1>
                  <p className="text-gray-400 text-sm">Generate instant feasibility reports and infrastructure cost models.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Interactive Calculator */}
                  <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col">
                    <h2 className="font-bold mb-6 flex items-center gap-2"><Calculator size={18} className="text-[#3B82F6]" /> Cost Parameters</h2>
                    
                    <div className="space-y-6 flex-1">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Dialysis Machines</span>
                          <span className="font-bold text-[#D4AF37]">{machines} Units</span>
                        </div>
                        <input 
                          type="range" min="2" max="50" value={machines} 
                          onChange={(e) => setMachines(parseInt(e.target.value))}
                          className="w-full accent-[#D4AF37] bg-white/10 rounded-lg appearance-none h-2"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 block mb-2">Facility Type</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-[#D4AF37]/50 appearance-none text-white">
                          <option>Standalone Dialysis Center</option>
                          <option>Hospital Wing Upgrade</option>
                          <option>Turnkey NGO Setup</option>
                        </select>
                      </div>

                      <div className="p-4 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#3B82F6] mb-1">Estimated CAPEX</p>
                        <p className="text-3xl font-bold tracking-tight text-white flex items-center">
                          <IndianRupee size={24} className="mr-1 opacity-50" />
                          {(totalCapex / 100000).toFixed(2)}L
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerateDPR}
                      disabled={isGenerating}
                      className="mt-6 w-full bg-white text-[#010810] hover:bg-gray-200 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <FileText size={18} />}
                      {isGenerating ? "Processing Data..." : "Generate DPR"}
                    </button>
                  </div>

                  {/* Right Column: DPR Output */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    {!dprReady && !isGenerating && (
                      <div className="text-center opacity-50">
                        <Activity size={48} className="mx-auto mb-4 text-gray-500" />
                        <p className="font-bold">Awaiting Parameters</p>
                        <p className="text-sm text-gray-400 mt-2">Adjust sliders and click generate to build report.</p>
                      </div>
                    )}

                    {isGenerating && (
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-[#D4AF37] font-bold animate-pulse text-sm tracking-wider uppercase">Architecting Solution...</p>
                      </div>
                    )}

                    {dprReady && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full bg-white rounded-xl p-8 text-[#010810] shadow-2xl relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] to-[#3B82F6] rounded-t-xl" />
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Project Feasibility Report</p>
                            <h3 className="text-2xl font-extrabold">{machines}-Bed Renal Setup</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Est. Breakeven</p>
                            <p className="text-xl font-bold text-[#3B82F6]">14 Months</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 font-bold uppercase">Required Space</p>
                            <p className="font-bold text-lg">{machines * 120} sq.ft</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <p className="text-xs text-gray-500 font-bold uppercase">RO Plant Capacity</p>
                            <p className="font-bold text-lg">{machines > 10 ? '1000 LPH' : '500 LPH'}</p>
                          </div>
                        </div>

                        <button className="w-full bg-[#010810] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                          <Download size={16} /> Download Full PDF Report
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: PLATFORM OVERVIEW (Step 8 - Dashboard) */}
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="max-w-6xl mx-auto"
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-extrabold tracking-tight mb-2">Platform Overview</h1>
                  <p className="text-gray-400 text-sm">Real-time metrics for Sales Pipeline and Care Network.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Active Leads</p>
                    <p className="text-3xl font-extrabold">24</p>
                    <p className="text-xs text-green-400 mt-2">+12% this month</p>
                  </div>
                  <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-2xl p-6">
                    <p className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest mb-2">Active AMCs</p>
                    <p className="text-3xl font-extrabold text-white">42</p>
                    <p className="text-xs text-gray-400 mt-2">Zero downtime reported</p>
                  </div>
                  <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl p-6">
                    <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2">Pipeline Value</p>
                    <p className="text-3xl font-extrabold text-white">₹4.2Cr</p>
                    <p className="text-xs text-gray-400 mt-2">Pending quotes</p>
                  </div>
                </div>

                {/* Leads Table Mockup */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h2 className="font-bold">Recent Inquiries</h2>
                    <button className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">View All</button>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { name: "Apollo Clinics Surat", type: "Setup Quote", status: "New", color: "bg-[#D4AF37]" },
                        { name: "City Care Hospital", type: "AMC Renewal", status: "Pending", color: "bg-[#3B82F6]" },
                        { name: "Dr. Mehta (Nephro)", type: "RO Plant Repair", status: "Urgent", color: "bg-red-500" },
                      ].map((lead, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/[0.01] rounded-xl border border-white/5 hover:bg-white/[0.03] transition-colors">
                          <div>
                            <p className="font-bold text-sm mb-1">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.type}</p>
                          </div>
                          <span className={`${lead.color}/20 text-${lead.color.replace('bg-', '')} border border-${lead.color.replace('bg-', '')}/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                            {lead.status}
                          </span>
                        </div>
                      ))}
                    </div>
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