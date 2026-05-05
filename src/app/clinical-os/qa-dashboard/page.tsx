"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  FileCheck,
  ClipboardList,
  AlertOctagon,
  ArrowRight,
  TrendingUp,
  Droplets
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK QA DATA ---
const qualityTrendData = [
  { day: 'Mon', score: 88 },
  { day: 'Tue', score: 91 },
  { day: 'Wed', score: 94 },
  { day: 'Thu', score: 85 }, // Drop due to missed vitals
  { day: 'Fri', score: 92 },
  { day: 'Sat', score: 95 },
  { day: 'Sun', score: 96 },
];

export default function QADashboard() {
  const [activeFacility, setActiveFacility] = useState("Dahej Public Hospital");

  return (
    <main className="min-h-screen bg-[#05080F] text-slate-200 overflow-x-hidden font-sans pb-24">
      
      {/* 🌌 Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#00A8A8]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      {/* HEADER: Executive Control Panel */}
      <header className="bg-[#0A0F1C]/90 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-40 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A8A8] to-teal-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,168,168,0.4)]">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-black text-white uppercase tracking-widest leading-tight">Innovate India</h1>
                <p className="text-[9px] font-black text-[#00A8A8] uppercase tracking-[0.2em]">Automated QA System</p>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white">Ketankumar Parmar</p>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Director</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0A0F1C] border border-red-600/50 shadow-[0_0_10px_rgba(220,38,38,0.2)] flex items-center justify-center overflow-hidden">
               <img src="/api/placeholder/40/40" alt="Profile" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 mt-10 relative z-10">
        
        {/* PAGE TITLE & FACILITY SELECTOR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">Quality & Compliance</h2>
            <p className="text-sm text-gray-400 font-medium">Auto-generated NABH audit scores based on live technician floor data.</p>
          </div>
          <div className="bg-[#0A0F1C] p-1.5 rounded-xl border border-white/5 shadow-inner w-fit flex">
            {["Dahej Public Hospital", "Nova Lifeline Hospital"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFacility(f)}
                className={`px-6 py-3 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all ${
                  activeFacility === f 
                    ? 'bg-white/10 text-white shadow-md border border-white/10' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {f.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MASTER QUALITY SCORE (THE GOD VIEW)                       */}
        {/* ========================================================= */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          
          <div className="lg:col-span-1 bg-gradient-to-br from-[#121D33] to-[#0A0F1C] border border-[#00A8A8]/30 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,168,168,0.1)] flex flex-col justify-center items-center text-center">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] mb-6">Master Quality Score</h3>
            
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff10" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#00A8A8" strokeWidth="8" strokeDasharray="283" strokeDashoffset="22" className="transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white tracking-tighter">92<span className="text-2xl">%</span></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] mt-1">Excellent</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-medium px-4">
              Facility is running within safe NABH parameters. PM-JAY billing risk is extremely low.
            </p>
          </div>

          <div className="lg:col-span-2 bg-[#0D1525]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-white">7-Day Quality Trend</h3>
              <button className="text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                Export NABH Report
              </button>
            </div>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0A0F1C', borderColor: '#ffffff20', borderRadius: '12px' }} />
                  <Line type="monotone" dataKey="score" stroke="#00A8A8" strokeWidth={4} dot={{ r: 4, fill: '#00A8A8', strokeWidth: 2, stroke: '#0A0F1C' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SUB-CATEGORY AUDITS (Plain English)                       */}
        {/* ========================================================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <ScoreCard title="Clinical Safety" score={94} icon={<Activity />} color="#00A8A8" desc="Vitals & Weight Tracking" />
          <ScoreCard title="Infection Control" score={100} icon={<ShieldCheck />} color="#C6A85A" desc="Isolation Zoning" />
          <ScoreCard title="Billing Accuracy" score={98} icon={<FileCheck />} color="#00A8A8" desc="PM-JAY Data Completion" />
          <ScoreCard title="Machine Use" score={85} icon={<TrendingUp />} color="#F59E0B" desc="Bed Occupancy Rate" warning />
        </div>

        {/* ========================================================= */}
        {/* THE "HARD STOPS" & AUTO-ALERTS                            */}
        {/* ========================================================= */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Infection Control (Zero Tolerance) */}
          <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8 border-b border-[#C6A85A]/20 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <ShieldCheck className="text-[#C6A85A]" size={24}/> Infection Control
              </h3>
              <span className="bg-[#C6A85A]/10 text-[#C6A85A] border border-[#C6A85A]/30 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                Zero Tolerance
              </span>
            </div>

            <div className="space-y-5">
              <AuditItem pass text="HBsAg patients isolated to dedicated machines." />
              <AuditItem pass text="HCV patients isolated to dedicated machines." />
              <AuditItem pass text="Zero cross-machine use detected in software logs." />
              <AuditItem pass text="End-of-day heat disinfection completed on all machines." />
            </div>
          </div>

          {/* Clinical & Staff Errors */}
          <div className="bg-[#0D1525]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-xl">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                <ClipboardList className="text-[#00A8A8]" size={24}/> Daily Clinical Audit
              </h3>
              <span className="bg-red-950/50 text-red-400 border border-red-900/50 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
                1 Warning
              </span>
            </div>

            <div className="space-y-5">
              <AuditItem pass text="Pre-dialysis weight and BP logged for 100% of sessions." />
              <AuditItem fail text="Session S-1049: Post-dialysis weight not logged by Tech." />
              <AuditItem pass text="PM-JAY consent forms verified for all active claims." />
              <AuditItem pass text="Dialyzer reuse count limits strictly enforced." />
            </div>

            <div className="mt-8 bg-red-950/20 border border-red-900/30 p-4 rounded-xl flex items-start gap-3">
              <AlertOctagon className="text-red-500 shrink-0 mt-0.5" size={16}/>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">Action Required</p>
                <p className="text-xs text-gray-300 font-medium">Technician assigned to Session S-1049 must log post-weight to unlock PM-JAY claim generation.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function ScoreCard({ title, score, icon, color, desc, warning }: any) {
  return (
    <div className={`bg-white/[0.02] border p-6 rounded-[2rem] shadow-lg relative overflow-hidden transition-all hover:bg-white/[0.04] ${warning ? 'border-yellow-900/30' : 'border-white/5'}`}>
      {warning && <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-[30px] rounded-full pointer-events-none" />}
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ color }}>
          {React.cloneElement(icon, { size: 20 })}
        </div>
        <span className={`text-2xl font-black tracking-tighter ${score === 100 ? 'text-[#C6A85A]' : warning ? 'text-yellow-500' : 'text-white'}`}>
          {score}%
        </span>
      </div>
      
      <h3 className="text-sm font-black text-white mb-1 relative z-10">{title}</h3>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest relative z-10">{desc}</p>
    </div>
  );
}

function AuditItem({ pass, text }: { pass?: boolean, fail?: boolean, text: string }) {
  return (
    <div className="flex items-start gap-4">
      {pass ? (
        <CheckCircle2 size={18} className="text-[#00A8A8] shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
      )}
      <p className={`text-sm font-bold leading-relaxed ${pass ? 'text-gray-300' : 'text-red-200'}`}>
        {text}
      </p>
    </div>
  );
}