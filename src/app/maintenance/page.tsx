"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wrench, ShieldAlert, Zap, Clock, 
  CheckCircle2, AlertTriangle, ArrowRight, Phone,
  BarChart3, LifeBuoy
} from "lucide-react";
import Link from "next/link";

export default function MaintenanceServicePage() {
  // Calculator State
  const [machineCount, setMachineCount] = useState(10);
  const [avgRevenue, setAvgRevenue] = useState(1850);
  const [downtimeDays, setDowntimeDays] = useState(3);

  // Math Logic: Revenue lost per machine per day of downtime
  const SESSIONS_PER_DAY = 2.5;
  const dailyLossPerMachine = SESSIONS_PER_DAY * avgRevenue;
  const totalDowntimeLoss = dailyLossPerMachine * downtimeDays * machineCount;

  const formatCurrency = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#A6192E] selection:text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= HERO SECTION ================= */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A6192E]/30 bg-[#A6192E]/10 mb-6">
            <Wrench size={14} className="text-[#A6192E]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A6192E]">Technical Operations Desk</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-white">
            Zero Downtime. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Maximum Revenue.</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
            Downtime is a clinical failure and a financial leak. We provide structured AMC and CMC plans designed to keep your facility operational 365 days a year.
          </p>
          <div className="flex justify-center">
            <Link 
              href={`https://wa.me/919879576332?text=I%20need%20a%20maintenance%20proposal%20for%20my%20center.%20I%20have%20${machineCount}%20machines%20and%20am%20looking%20for%20a%20service%20contract.`}
              target="_blank"
              className="bg-[#A6192E] text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#C41E3A] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(166,25,46,0.2)]"
            >
              Get Service Proposal <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ================= DOWNTIME LOSS CALCULATOR ================= */}
        <div className="bg-[#0D1525] border border-white/10 rounded-[3rem] p-10 md:p-16 mb-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-full bg-gradient-to-r from-[#A6192E]/5 to-transparent pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-[#A6192E]" size={24} />
                <h3 className="text-2xl font-black text-white tracking-tight">Downtime Loss Auditor</h3>
              </div>
              <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10">
                Most centers in India underestimate the cost of "On-Call" repairs. Calculate the revenue you lose when your machines sit idle waiting for a technician.
              </p>

              <div className="space-y-8">
                <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Number of Machines</span>
                    <span className="text-lg font-black text-white">{machineCount}</span>
                  </div>
                  <input type="range" min="1" max="50" value={machineCount} onChange={(e) => setMachineCount(Number(e.target.value))} className="w-full accent-[#A6192E]" />
                </div>

                <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Days Down (Waiting for Repair)</span>
                    <span className="text-lg font-black text-white">{downtimeDays} Days</span>
                  </div>
                  <input type="range" min="1" max="14" value={downtimeDays} onChange={(e) => setDowntimeDays(Number(e.target.value))} className="w-full accent-[#A6192E]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-[#A6192E]/10 border border-[#A6192E]/20 p-10 rounded-[2.5rem]">
              <p className="text-[10px] text-[#A6192E] font-black uppercase tracking-[0.2em] mb-2">Unprotected Revenue Risk</p>
              <p className="text-6xl font-black text-white tracking-tighter mb-4">{formatCurrency(totalDowntimeLoss)}</p>
              <p className="text-sm text-gray-400 font-medium leading-relaxed italic">
                *This is the revenue lost in just {downtimeDays} days. A Comprehensive Contract (CMC) typically costs less than this single loss event.
              </p>
            </div>
          </div>
        </div>

        {/* ================= SERVICE TIERS ================= */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          
          {/* AMC Card */}
          <div className="bg-[#0D1525] border border-white/5 p-12 rounded-[3rem] hover:border-[#00A8A8]/30 transition-all">
            <h3 className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.3em] mb-4">Tier 1: Preventive</h3>
            <h4 className="text-3xl font-black text-white mb-6">AMC Plan</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10">
              Focuses on longevity through scheduled calibration and deep cleaning. Ideal for new facilities with valid manufacturer warranties.
            </p>
            <ul className="space-y-4 mb-12">
              <ServiceFeature label="4 Mandatory Quarterly Visits" />
              <ServiceFeature label="Emergency Breakdown Support" />
              <ServiceFeature label="RO System Health Checks" />
              <ServiceFeature label="Electrical/UPS Validation" />
              <li className="flex items-center gap-3 text-xs text-gray-500 font-bold italic pt-4">
                *Parts and specialized consumables billed extra
              </li>
            </ul>
            <p className="text-2xl font-black text-white">₹20,000 – ₹25,000 <span className="text-xs text-gray-500 uppercase">/ machine / year</span></p>
          </div>

          {/* CMC Card */}
          <div className="bg-[#0D1525] border border-[#C6A85A]/30 p-12 rounded-[3rem] shadow-[0_0_50px_rgba(198,168,90,0.1)] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C6A85A] text-[#0A0F1C] px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Recommended</div>
            <h3 className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">Tier 2: Comprehensive</h3>
            <h4 className="text-3xl font-black text-white mb-6">CMC Plan</h4>
            <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10">
              The ultimate revenue protection. Full coverage including expensive spare parts, motherboards, and pump systems. Maximum uptime priority.
            </p>
            <ul className="space-y-4 mb-12">
              <ServiceFeature label="All Spare Parts Included" accent="gold" />
              <ServiceFeature label="Priority 24h Response Time" accent="gold" />
              <ServiceFeature label="Uptime Guarantee Contract" accent="gold" />
              <ServiceFeature label="Full Calibration & Software" accent="gold" />
              <ServiceFeature label="Direct Replacement Units" accent="gold" />
            </ul>
            <p className="text-2xl font-black text-white">₹42,000 – ₹45,000 <span className="text-xs text-gray-500 uppercase">/ machine / year</span></p>
          </div>

        </div>

        {/* ================= FINAL CTA ================= */}
        <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] p-12 md:p-20 rounded-[4rem] text-center border border-white/5">
          <LifeBuoy className="text-[#A6192E] mx-auto mb-8" size={48} />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Protect your infrastructure.</h2>
          <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto mb-12">
            In Surat, Jalgaon, and across Gujarat, we provide 24/7 technical coverage for kidney care centers. Lock in your service contract before your next breakdown.
          </p>
          <Link 
            href={`https://wa.me/919879576332?text=I%20need%20a%20maintenance%20proposal%20for%20my%20center.%20I%20have%20${machineCount}%20machines%20and%20am%20looking%20for%20a%20service%20contract.`}
            target="_blank"
            className="inline-flex bg-white text-[#0A0F1C] px-12 py-6 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-gray-200 transition-all items-center justify-center gap-3 shadow-2xl"
          >
            Connect to Technical Desk <Phone size={18} />
          </Link>
        </div>

      </div>
    </main>
  );
}

function ServiceFeature({ label, accent = "teal" }: { label: string, accent?: "teal" | "gold" }) {
  return (
    <li className="flex items-center gap-3 text-sm font-bold text-gray-300">
      <CheckCircle2 size={18} className={accent === "teal" ? "text-[#00A8A8]" : "text-[#C6A85A]"} />
      {label}
    </li>
  );
}