"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  IndianRupee, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  ShieldCheck,
  Building2,
  Bell,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area
} from 'recharts';

// --- MOCK FINANCIAL DATA ---
const weeklyRevenueData = [
  { name: 'Mon', revenue: 120000, leakage: 5000 },
  { name: 'Tue', revenue: 135000, leakage: 2000 },
  { name: 'Wed', revenue: 142000, leakage: 0 },
  { name: 'Thu', revenue: 138000, leakage: 8000 },
  { name: 'Fri', revenue: 150000, leakage: 0 },
  { name: 'Sat', revenue: 145000, leakage: 3000 },
  { name: 'Sun', revenue: 110000, leakage: 12000 },
];

const pmjayClaimData = [
  { name: 'Week 1', approved: 85, rejected: 2 },
  { name: 'Week 2', approved: 92, rejected: 1 },
  { name: 'Week 3', approved: 88, rejected: 0 },
  { name: 'Week 4', approved: 105, rejected: 0 },
];

export default function InvestorDashboard() {
  const [timeframe, setTimeframe] = useState<"TODAY" | "WEEK" | "MONTH">("WEEK");

  return (
    <main className="min-h-screen bg-[#05080F] text-slate-200 overflow-x-hidden font-sans pb-24">
      
      {/* HEADER: Executive Control Panel */}
      <header className="bg-[#0A0F1C]/90 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-40 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#C6A85A]/10 border border-[#C6A85A]/30 flex items-center justify-center">
                <Building2 size={16} className="text-[#C6A85A]" />
              </div>
              <h1 className="text-sm font-black text-white uppercase tracking-widest hidden sm:block">Innovate India</h1>
            </Link>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <p className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">Financial Command Center</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Ketankumar Parmar</p>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Director</p>
              </div>
              {/* Profile Avatar with subtle numerological red tie accent integrated into the border/glow */}
              <div className="w-10 h-10 rounded-full bg-[#0A0F1C] border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.2)] flex items-center justify-center overflow-hidden">
                 <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 mt-10">
        
        {/* PAGE TITLE & FILTERS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">Facility Performance</h2>
            <p className="text-sm text-gray-400 font-medium">Real-time revenue, utilization, and PM-JAY claim tracking.</p>
          </div>
          <div className="flex bg-[#0A0F1C] p-1.5 rounded-xl border border-white/5 shadow-inner w-fit">
            {["TODAY", "WEEK", "MONTH"].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t as any)}
                className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  timeframe === t 
                    ? 'bg-[#C6A85A] text-[#0A0F1C] shadow-md' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* TOP ROW: CORE FINANCIAL KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <KpiCard 
            title="Total Revenue (7 Days)" 
            value="₹ 9.40 Lakhs" 
            trend="+12%" 
            isPositive={true} 
            icon={<IndianRupee size={20} className="text-[#C6A85A]" />} 
          />
          <KpiCard 
            title="Machine Utilization" 
            value="89.5%" 
            trend="+5%" 
            isPositive={true} 
            icon={<Activity size={20} className="text-[#00A8A8]" />} 
          />
          <KpiCard 
            title="Revenue Leakage" 
            value="₹ 12,000" 
            trend="-80%" 
            isPositive={true} 
            icon={<AlertTriangle size={20} className="text-red-400" />} 
            subtitle="Losses from idle beds"
            alertMode
          />
          <KpiCard 
            title="PM-JAY Approval Rate" 
            value="99.2%" 
            trend="+2%" 
            isPositive={true} 
            icon={<ShieldCheck size={20} className="text-[#00A8A8]" />} 
            subtitle="0 rejected claims this week"
          />
        </div>

        {/* MIDDLE ROW: CHARTS */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Revenue vs Leakage Chart */}
          <div className="lg:col-span-2 bg-[#0D1525]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-white">Revenue vs. Leakage</h3>
              <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-2 text-[#C6A85A]"><div className="w-2 h-2 rounded-full bg-[#C6A85A]"/> Yield</span>
                <span className="flex items-center gap-2 text-red-500"><div className="w-2 h-2 rounded-full bg-red-500"/> Leakage</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C6A85A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C6A85A" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLeakage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0A0F1C', borderColor: '#ffffff20', borderRadius: '12px', fontWeight: 'bold' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#C6A85A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="leakage" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorLeakage)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SOP Compliance & Claim Protection */}
          <div className="bg-[#0D1525]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-xl flex flex-col">
            <h3 className="text-lg font-black text-white mb-2">SOP Compliance Score</h3>
            <p className="text-xs text-gray-400 font-medium mb-8">System safeguards actively preventing errors.</p>
            
            <div className="space-y-6 mt-auto">
              <ComplianceRow label="Pre-Dialysis Vitals Captured" percentage={100} />
              <ComplianceRow label="Post-Dialysis Data Logged" percentage={98} />
              <ComplianceRow label="Infection Zoning Adherence" percentage={100} />
              <ComplianceRow label="Consent Forms Digitized" percentage={100} />
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 bg-[#00A8A8]/10 -mx-8 -mb-8 p-8 rounded-b-[2rem] border-x border-b border-[#00A8A8]/30">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-[#00A8A8] shrink-0" size={24}/>
                <div>
                  <h4 className="text-sm font-black text-white mb-1">Audit Ready</h4>
                  <p className="text-xs font-medium text-gray-300 leading-relaxed">
                    Zero critical NABH violations detected. PM-JAY billing data is fully secured for the current shift.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: CLAIM PERFORMANCE & ALERTS */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          <div className="bg-[#1A160C] border border-[#C6A85A]/20 rounded-[2rem] p-8 shadow-xl">
            <h3 className="text-lg font-black text-white mb-6">PM-JAY Claim Performance</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pmjayClaimData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                  <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#0A0F1C', borderColor: '#ffffff20', borderRadius: '12px' }} />
                  <Bar dataKey="approved" stackId="a" fill="#00A8A8" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="rejected" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-red-950/10 border border-red-900/20 rounded-[2rem] p-8 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white">Active Financial Alerts</h3>
              <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">2 Warnings</span>
            </div>
            
            <div className="space-y-4 flex-1">
              <div className="bg-[#0A0F1C] border border-red-900/50 p-5 rounded-xl flex items-start gap-4">
                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18}/>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Machine 04 Idle for 45 Minutes</p>
                  <p className="text-xs text-gray-400 font-medium">Missed turnaround time is projecting a ₹1,800 revenue loss for this shift.</p>
                </div>
              </div>
              <div className="bg-[#0A0F1C] border border-yellow-900/50 p-5 rounded-xl flex items-start gap-4">
                <AlertTriangle className="text-yellow-500 shrink-0 mt-0.5" size={18}/>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Dialyzer Stock Running Low</p>
                  <p className="text-xs text-gray-400 font-medium">Inventory predicts depletion in 4 days. Reorder wholesale supplies to prevent retail purchasing.</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-white/5 border border-white/10 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors">
              View All Floor Logs
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function KpiCard({ title, value, trend, isPositive, icon, subtitle, alertMode = false }: any) {
  return (
    <div className={`p-6 rounded-3xl border shadow-lg relative overflow-hidden ${alertMode ? 'bg-red-950/10 border-red-900/30' : 'bg-white/[0.02] border-white/5'}`}>
      {alertMode && <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-[30px] rounded-full" />}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alertMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-white/5 border border-white/10'}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${isPositive ? 'text-[#00A8A8] bg-[#00A8A8]/10' : 'text-red-400 bg-red-400/10'}`}>
          {isPositive ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>} {trend}
        </div>
      </div>
      <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1 relative z-10">{title}</h3>
      <p className="text-2xl md:text-3xl font-black text-white tracking-tighter relative z-10">{value}</p>
      {subtitle && <p className={`text-[10px] font-bold mt-2 relative z-10 ${alertMode ? 'text-red-400' : 'text-gray-500'}`}>{subtitle}</p>}
    </div>
  );
}

function ComplianceRow({ label, percentage }: { label: string, percentage: number }) {
  const isPerfect = percentage === 100;
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
          {isPerfect ? <CheckCircle2 size={14} className="text-[#00A8A8]"/> : <AlertTriangle size={14} className="text-yellow-500"/>} 
          {label}
        </span>
        <span className={`text-sm font-black ${isPerfect ? 'text-[#00A8A8]' : 'text-yellow-500'}`}>{percentage}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full ${isPerfect ? 'bg-[#00A8A8]' : 'bg-yellow-500'}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}