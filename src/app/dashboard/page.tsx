"use client";

import React, { useState } from "react";
// FIXED: Added ArrowRight to the import list
import { 
  LayoutDashboard, Zap, Users, Wrench, BarChart3, 
  Search, Bell, Settings, TrendingUp, Activity, 
  ChevronRight, MoreVertical, IndianRupee, Clock, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function SaasDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  const sidebarLinks = [
    { name: "Overview", icon: <LayoutDashboard size={18} /> },
    { name: "AI Engine", icon: <Zap size={18} /> },
    { name: "Leads Pipeline", icon: <Users size={18} /> },
    { name: "AMC Tracking", icon: <Wrench size={18} /> },
    { name: "Reports", icon: <BarChart3 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#010810] text-white flex font-sans selection:bg-[#D4AF37] selection:text-[#010810]">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-[#0A1118] border-r border-white/5 flex flex-col hidden md:flex">
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#010810] font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.3)] mr-3">
            II
          </div>
          <span className="font-bold text-lg tracking-tight">Innovate OS</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Main Menu</p>
          {sidebarLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.icon}
                {link.name}
                {isActive && <motion.div layoutId="sidebar-indicator" className="absolute left-0 w-1 h-8 bg-[#D4AF37] rounded-r-full" />}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center font-bold">
              KP
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold">Ketan Parmar</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Super Admin</p>
            </div>
            <Settings size={16} className="text-gray-400" />
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#010810]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-white">{activeTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search leads, hospitals..." 
                className="bg-[#0A1118] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20 transition-all w-64"
              />
            </div>
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            </button>
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] flex items-center gap-2">
              <Zap size={14} /> New DPR
            </button>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">System Overview</h1>
            <p className="text-gray-400 mt-1">Real-time intelligence on your dialysis infrastructure pipeline.</p>
          </div>

          {/* 1. KPI TOP ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KpiCard title="Active Deals Value" value="₹ 4.2 Cr" trend="+12%" icon={<IndianRupee />} accent="gold" />
            <KpiCard title="Avg. Profit Margin" value="28.4%" trend="+2.1%" icon={<TrendingUp />} accent="blue" />
            <KpiCard title="Avg. Break-even" value="14.2 Mo" trend="-1.5 Mo" icon={<Clock />} accent="white" />
            <KpiCard title="Qualified Leads" value="24" trend="+4" icon={<Users />} accent="white" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* 2. CHART AREA */}
            <div className="lg:col-span-2 bg-[#0A1118] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-lg">Projected ROI vs Capital Recovery</h3>
                  <p className="text-xs text-gray-500">Aggregate timeline across all active 10+ bed proposals.</p>
                </div>
                <button className="text-gray-400 hover:text-white"><MoreVertical size={16}/></button>
              </div>
              
              <div className="h-64 w-full relative flex items-end">
                <div className="absolute inset-0 flex flex-col justify-between border-b border-l border-white/10 pb-6 pl-6">
                  {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-white/5 border-dashed" />)}
                  <div className="flex justify-between w-full absolute bottom-0 left-6 text-[10px] text-gray-500 px-2 mt-2">
                    <span>Month 0</span><span>Month 6</span><span>Month 12</span><span>Month 18</span>
                  </div>
                </div>
                
                <svg className="w-full h-full absolute inset-0 pl-6 pb-6 overflow-visible" preserveAspectRatio="none">
                  <path 
                    d="M 0 200 Q 100 200, 300 100 T 800 20" 
                    fill="none" 
                    stroke="#D4AF37" 
                    strokeWidth="3"
                    className="drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                  />
                  <circle cx="300" cy="100" r="6" fill="#0A1118" stroke="#D4AF37" strokeWidth="2" className="drop-shadow-[0_0_8px_rgba(212,175,55,1)]" />
                  <text x="320" y="95" fill="white" fontSize="12" fontWeight="bold">Break-even</text>
                </svg>
              </div>
            </div>

            {/* AI Assistant Quick Panel */}
            <div className="bg-gradient-to-b from-[#3B82F6]/10 to-[#0A1118] border border-[#3B82F6]/20 rounded-3xl p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="text-[#3B82F6]" size={20} />
                <h3 className="font-bold text-lg">AI Co-Pilot</h3>
              </div>
              <div className="flex-1 bg-[#010810] rounded-2xl border border-white/5 p-4 mb-4 flex flex-col gap-3">
                <div className="bg-white/5 self-start px-3 py-2 rounded-xl text-sm text-gray-300 max-w-[85%]">
                  Nova Lifeline just updated their target to 20 beds. Should I recalculate their DPR?
                </div>
                <div className="bg-[#3B82F6]/20 text-white self-end px-3 py-2 rounded-xl text-sm max-w-[85%]">
                  Yes, run the model and send to my WhatsApp.
                </div>
              </div>
              <div className="relative mt-auto">
                <input type="text" placeholder="Ask AI to run a simulation..." className="w-full bg-[#010810] border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-[#3B82F6]/50" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3B82F6] hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. PIPELINE TABLE */}
          <div className="bg-[#0A1118] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-lg">Active Deals Pipeline</h3>
              <button className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-yellow-400">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.02] text-[10px] uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Hospital / Client</th>
                    <th className="px-6 py-4 font-bold">Capacity</th>
                    <th className="px-6 py-4 font-bold">Est. CAPEX</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <TableRow name="Dahej Public Hospital" capacity="50 Beds" capex="₹ 1.8 Cr" status="Hot" />
                  <TableRow name="Nova Lifeline" capacity="18 Beds" capex="₹ 65 L" status="Negotiation" />
                  <TableRow name="Sanjeevani Care" capacity="10 Beds" capex="₹ 42 L" status="DPR Sent" />
                  <TableRow name="City Nephro Clinic" capacity="5 Beds" capex="₹ 22 L" status="Warm" />
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* ================= SUB-COMPONENTS ================= */

function KpiCard({ title, value, trend, icon, accent }: any) {
  const isGold = accent === "gold";
  const isBlue = accent === "blue";
  
  return (
    <div className={`p-6 rounded-3xl border bg-[#0A1118] relative overflow-hidden group transition-all duration-300 ${isGold ? "border-[#D4AF37]/20 hover:border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.05)]" : isBlue ? "border-[#3B82F6]/20 hover:border-[#3B82F6]/40 shadow-[0_0_20px_rgba(59,130,246,0.05)]" : "border-white/5 hover:border-white/10"}`}>
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-50 ${isGold ? "bg-[#D4AF37]" : isBlue ? "bg-[#3B82F6]" : "bg-white"}`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isGold ? "bg-[#D4AF37]/10 border-[#D4AF37]/20 text-[#D4AF37]" : isBlue ? "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" : "bg-white/5 border-white/10 text-gray-400"}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${trend.startsWith('+') ? "text-green-400" : "text-red-400"}`}>
          {trend}
        </span>
      </div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 relative z-10">{title}</p>
      <h3 className="text-2xl font-black relative z-10">{value}</h3>
    </div>
  );
}

function TableRow({ name, capacity, capex, status }: any) {
  const getStatusColor = (s: string) => {
    if(s === "Hot") return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    if(s === "Negotiation") return "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20";
    if(s === "DPR Sent") return "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20";
    return "text-gray-400 bg-white/5 border-white/10";
  };

  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4 font-bold">{name}</td>
      <td className="px-6 py-4 text-gray-400"><span className="flex items-center gap-2"><Activity size={14}/> {capacity}</span></td>
      <td className="px-6 py-4 text-white font-mono">{capex}</td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(status)}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <button className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          Open Details
        </button>
      </td>
    </tr>
  );
}