"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  FileWarning,
  ServerCrash,
  FileCheck,
  RefreshCcw,
  ArrowRight,
  BrainCircuit,
  MapPin // <-- Added this!
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA ---
const claimTrendData = [
  { day: 'Mon', cleared: 45, blocked: 2 },
  { day: 'Tue', cleared: 52, blocked: 4 },
  { day: 'Wed', cleared: 48, blocked: 0 },
  { day: 'Thu', cleared: 50, blocked: 1 },
  { day: 'Fri', cleared: 55, blocked: 3 },
  { day: 'Sat', cleared: 58, blocked: 0 },
];

export default function BillingComplianceEngine() {
  const [activeTab, setActiveTab] = useState<"PMJAY" | "DIALYZER">("PMJAY");

  return (
    <main className="min-h-screen bg-[#05080F] text-slate-200 overflow-x-hidden font-sans pb-24">
      
      {/* 🌌 Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[0%] right-[10%] w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-[#00A8A8]/10 blur-[150px] rounded-full" />
      </div>

      {/* HEADER: Executive Control Panel */}
      <header className="bg-[#0A0F1C]/90 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-40 shadow-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1A160C] to-[#0A0F1C] border border-[#C6A85A]/30 flex items-center justify-center shadow-[0_0_15px_rgba(198,168,90,0.2)]">
                <ShieldCheck size={20} className="text-[#C6A85A]" />
              </div>
              <div>
                <h1 className="text-sm font-black text-white uppercase tracking-widest leading-tight">Innovate India</h1>
                <p className="text-[9px] font-black text-[#C6A85A] uppercase tracking-[0.2em]">Compliance & Billing Engine</p>
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
        
        {/* PAGE TITLE & TOGGLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">Revenue Protection</h2>
            <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
              <MapPin size={16} className="text-[#00A8A8]"/> Active Region: <strong className="text-white">Ankleshwar, Gujarat (Strict Compliance Active)</strong>
            </p>
          </div>
          <div className="flex bg-[#0A0F1C] p-1.5 rounded-xl border border-white/5 shadow-inner w-fit">
            <button
              onClick={() => setActiveTab("PMJAY")}
              className={`px-6 py-3 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                activeTab === "PMJAY" ? 'bg-[#C6A85A] text-[#0A0F1C] shadow-md' : 'text-gray-500 hover:text-white'
              }`}
            >
              <FileCheck size={16}/> PM-JAY Claim Firewall
            </button>
            <button
              onClick={() => setActiveTab("DIALYZER")}
              className={`px-6 py-3 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                activeTab === "DIALYZER" ? 'bg-[#00A8A8] text-white shadow-md' : 'text-gray-500 hover:text-white'
              }`}
            >
              <RefreshCcw size={16}/> Dialyzer Tracking AI
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {/* ======================================================= */}
          {/* VIEW 1: PM-JAY REJECTION PREVENTION ENGINE                */}
          {/* ======================================================= */}
          {activeTab === "PMJAY" && (
            <motion.div key="pmjay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              <div className="grid lg:grid-cols-3 gap-6 mb-10">
                <KpiCard title="Claims Cleared for Billing" value="₹ 4.2L" subtitle="234 Sessions Auto-Approved" icon={<CheckCircle2 />} color="#00A8A8" />
                <KpiCard title="Revenue Blocked by AI" value="₹ 14,400" subtitle="8 Sessions Missing Data" icon={<AlertTriangle />} color="#EF4444" alert />
                <KpiCard title="Avg. PM-JAY Clearance Time" value="< 1 Sec" subtitle="Zero manual paperwork required" icon={<BrainCircuit />} color="#C6A85A" />
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* THE FIREWALL / ERROR QUEUE */}
                <div className="lg:col-span-2 bg-[#0D1525]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <h3 className="text-xl font-black text-white flex items-center gap-3">
                      <FileWarning className="text-red-500"/> Action Required: Blocked Claims
                    </h3>
                    <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest animate-pulse">
                      8 Files Locked
                    </span>
                  </div>

                  <div className="space-y-4">
                    <ErrorRow 
                      id="S-10442" patient="Patient P-089" time="Today, 10:15 AM"
                      error="Missing Post-Dialysis Weight. PM-JAY portal will reject this file."
                    />
                    <ErrorRow 
                      id="S-10445" patient="Patient P-112" time="Today, 11:30 AM"
                      error="Ayushman Card ID format invalid (Length mismatch)."
                    />
                    <ErrorRow 
                      id="S-10419" patient="Patient P-034" time="Yesterday, 04:00 PM"
                      error="UF Removed value is zero. Clinical contradiction."
                    />
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                      Send Fix Request to Floor Manager <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>

                {/* CLAIM CLEARANCE TREND */}
                <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[2.5rem] p-8 shadow-xl flex flex-col">
                  <h3 className="text-lg font-black text-white mb-2">Billing Clearance Trend</h3>
                  <p className="text-xs text-gray-400 font-medium mb-8">AI-approved vs AI-blocked claims before government submission.</p>
                  
                  <div className="flex-1 min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={claimTrendData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="day" stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#ffffff50" tick={{fill: '#ffffff50', fontSize: 10}} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: '#0A0F1C', borderColor: '#ffffff20', borderRadius: '12px' }} />
                        <Bar dataKey="cleared" stackId="a" fill="#00A8A8" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="blocked" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 bg-[#C6A85A]/10 border border-[#C6A85A]/20 p-4 rounded-xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A] mb-1">Total Prevented Losses (This Month)</p>
                    <p className="text-2xl font-black text-white tracking-tighter">₹ 1.84 Lakhs</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ======================================================= */}
          {/* VIEW 2: DIALYZER REUSE AI COMPLIANCE SYSTEM             */}
          {/* ======================================================= */}
          {activeTab === "DIALYZER" && (
            <motion.div key="dialyzer" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              {/* STATE COMPLIANCE OVERRIDE ALERT */}
              <div className="bg-gradient-to-r from-red-950/40 to-[#0A0F1C] border border-red-900/50 p-6 rounded-[2rem] mb-8 flex items-start sm:items-center gap-5 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 shrink-0">
                  <ShieldCheck className="text-red-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-3">
                    State Compliance Lock Active <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[9px] uppercase tracking-widest">Gujarat Mandate</span>
                  </h3>
                  <p className="text-sm text-red-200 font-medium mt-1">
                    System has automatically disabled dialyzer reuse calculations for PM-JAY patients in this jurisdiction. All ROI models are locked to Single-Use costs to guarantee audit survival.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* ACTIVE INVENTORY TRACKER */}
                <div className="bg-[#0D1525]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
                  <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                    <RefreshCcw className="text-[#00A8A8]"/> Active Dialyzer Lifecycle
                  </h3>
                  
                  <div className="space-y-4">
                    <DialyzerRow id="D-9042" patient="P-089 (Cash)" uses={4} max={6} status="SAFE" />
                    <DialyzerRow id="D-9011" patient="P-112 (Corporate)" uses={6} max={6} status="WARNING" />
                    <DialyzerRow id="D-8890" patient="P-034 (PM-JAY)" uses={1} max={1} status="DISCARD_MANDATORY" />
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 bg-[#00A8A8]/5 p-5 rounded-2xl border border-[#00A8A8]/20">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#00A8A8] mb-1">Cost Optimization (Cash/Corp Patients)</p>
                    <p className="text-2xl font-black text-white tracking-tighter">₹ 42,500 Saved</p>
                    <p className="text-xs text-gray-400 font-medium mt-1">Safely reprocessed using compliant AAMI standard protocols.</p>
                  </div>
                </div>

                {/* THE HARD BLOCKS (AI ENFORCEMENT) */}
                <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[2.5rem] p-8 shadow-xl">
                  <h3 className="text-xl font-black text-white mb-2">Cross-Infection AI Blocks</h3>
                  <p className="text-sm text-gray-400 font-medium mb-8">System-level interventions preventing fatal clinical or billing errors.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <ServerCrash className="text-[#C6A85A] mt-1 shrink-0" size={20}/>
                      <div>
                        <p className="text-sm font-bold text-white">Cross-Patient Reuse Prevented</p>
                        <p className="text-xs text-gray-400 font-medium mt-1">Barcode D-8802 was scanned for a different patient ID. Machine instantly locked.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <ServerCrash className="text-[#C6A85A] mt-1 shrink-0" size={20}/>
                      <div>
                        <p className="text-sm font-bold text-white">Max Limit Exceeded</p>
                        <p className="text-xs text-gray-400 font-medium mt-1">Dialyzer D-9011 reached its 6th use. Software barred further scheduling until discard confirmed.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <ShieldCheck className="text-[#00A8A8] mt-1 shrink-0" size={20}/>
                      <div>
                        <p className="text-sm font-bold text-white">Infection Zoning Maintained</p>
                        <p className="text-xs text-gray-400 font-medium mt-1">Zero HCV/HBsAg dialyzers entered general reprocessing area today.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function KpiCard({ title, value, subtitle, icon, color, alert }: any) {
  return (
    <div className={`p-6 rounded-[2rem] border shadow-lg relative overflow-hidden ${alert ? 'bg-red-950/10 border-red-900/30' : 'bg-white/[0.02] border-white/5'}`}>
      {alert && <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-[30px] rounded-full" />}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ color }}>
          {icon}
        </div>
      </div>
      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 relative z-10">{title}</h3>
      <p className="text-3xl font-black text-white tracking-tighter relative z-10">{value}</p>
      <p className={`text-[10px] font-bold mt-2 relative z-10 ${alert ? 'text-red-400' : 'text-gray-500'}`}>{subtitle}</p>
    </div>
  );
}

function ErrorRow({ id, patient, time, error }: any) {
  return (
    <div className="bg-[#0A0F1C] border border-red-900/30 p-5 rounded-2xl flex items-start gap-4">
      <AlertTriangle className="text-red-500 shrink-0 mt-1" size={18} />
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-white">Session {id} <span className="text-gray-500 ml-2">{patient}</span></p>
          <p className="text-[9px] font-bold text-gray-500">{time}</p>
        </div>
        <p className="text-xs text-red-300 font-medium">{error}</p>
      </div>
    </div>
  );
}

function DialyzerRow({ id, patient, uses, max, status }: any) {
  return (
    <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl flex items-center justify-between">
      <div>
        <p className="text-[11px] font-black text-white tracking-widest mb-0.5">{id}</p>
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{patient}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Uses</p>
          <p className="text-sm font-black text-white">{uses} <span className="text-gray-600">/ {max}</span></p>
        </div>
        <div className="w-24">
          {status === "SAFE" && <span className="w-full block text-center bg-[#00A8A8]/20 text-[#00A8A8] border border-[#00A8A8]/30 py-1.5 rounded text-[9px] font-black uppercase tracking-widest">Safe</span>}
          {status === "WARNING" && <span className="w-full block text-center bg-yellow-900/40 text-yellow-500 border border-yellow-700/50 py-1.5 rounded text-[9px] font-black uppercase tracking-widest">Max Limit</span>}
          {status === "DISCARD_MANDATORY" && <span className="w-full block text-center bg-red-950/50 text-red-500 border border-red-900/50 py-1.5 rounded text-[9px] font-black uppercase tracking-widest animate-pulse">Discard</span>}
        </div>
      </div>
    </div>
  );
}