"use client";

import React, { useMemo, useState } from "react";
import { 
  Activity, ShieldCheck, Zap, Clock, 
  Settings, AlertOctagon, CheckCircle2, 
  Wrench, Droplets, Thermometer, Cpu,
  BarChart3, ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

// --- 1. IMPORT GLOBAL STATE & ENGINE ---
import { useInfra } from "@/context/InfrastructureContext";
import { calculateV7Sovereign } from "@/lib/sovereign-engine";

export default function AMCIntelPage() {
  // HOOK INTO GLOBAL DATA
  const { machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode } = useInfra();

  // CRM DISPATCH STATE
  const [isDispatching, setIsDispatching] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);

  // CALCULATE FINANCIAL IMPACT OF SERVICE
  const metrics = useMemo(() => {
    const res = calculateV7Sovereign({ machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode });
    
    // Theoretical Leakage vs. Recoverable Yield
    const monthlyLeakage = (res.totalCapex * 0.02) / 12; // Simplified benchmark
    const recoverableYield = monthlyLeakage * 0.85; // Recapture 85% through predictive AMC
    
    return { ...res, monthlyLeakage, recoverableYield };
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode]);

  // HANDLE CRM SERVICE REQUEST
  const handleDispatch = async () => {
    setIsDispatching(true);
    try {
      // In production, this hits your /api/crm/service-lead route
      // Simulating network delay for the UI experience
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTicket(`SRV-${Math.floor(Math.random() * 9000) + 1000}`);
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#010810] p-6 lg:p-12">
      
      {/* 2. HEADER: ASSET HEALTH OVERVIEW */}
      <div className="max-w-7xl mx-auto mb-12">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-2">
                <ShieldCheck size={12} /> Predictive AMC Active
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Service Intelligence.</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl">
              Monitoring <span className="text-white font-bold">{machines} Machines</span> and RO Infrastructure to protect your <span className="text-[#D4AF37] font-bold">₹ {(metrics.exitValue / 10000000).toFixed(2)} Cr</span> enterprise value.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl text-right">
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Recoverable Leakage</p>
              <p className="text-xl font-black text-emerald-400">₹ {new Intl.NumberFormat('en-IN').format(metrics.recoverableYield)} <span className="text-[10px] text-gray-600">/MO</span></p>
            </div>
          </div>
        </header>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* 3. LEFT COLUMN: REAL-TIME TELEMETRY */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* UPTIME MONITOR */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative">
             <div className="flex justify-between items-center mb-8">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={14} className="text-emerald-500" /> Fleet Uptime Status
                </h4>
                <span className="text-xs font-black text-white">99.8% Average</span>
             </div>

             <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {Array.from({ length: machines }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center group relative cursor-help"
                  >
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-[8px] font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap z-20">
                      Machine #{100 + i} - ONLINE
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* CRITICAL COMPONENTS LIFECYCLE */}
          <div className="grid md:grid-cols-2 gap-6">
            <LifecycleCard 
              icon={<Droplets className="text-blue-400" />} 
              label="RO Membrane Permeability" 
              value="82%" 
              status="Optimal" 
              health={82}
            />
            <LifecycleCard 
              icon={<Cpu className="text-purple-400" />} 
              label="Power Supply Module (PSU)" 
              value="1,420 Hrs" 
              status="Review at 2k" 
              health={65}
            />
          </div>

          {/* MAINTENANCE LOG */}
          <div className="bg-black/40 border border-white/5 rounded-[2.5rem] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recent Activity Log</h4>
              <button className="text-[10px] text-[#D4AF37] font-black uppercase">View Full Audit</button>
            </div>
            <div className="divide-y divide-white/5">
              <LogItem date="24 APR" task="RO System Descaling" machine="Main Plant" tech="K. Parmar" status="Complete" />
              <LogItem date="22 APR" task="Machine #104 Periodic Service" machine="Unit 104" tech="R. Mehta" status="Pending" />
              <LogItem date="19 APR" task="Endotoxin Filter Replacement" machine="Fleet-Wide" tech="System" status="Complete" />
            </div>
          </div>
        </div>

        {/* 4. RIGHT COLUMN: SERVICE ACTION HUB */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AMC STATUS CARD WITH CRM INTEGRATION */}
          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl" />
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">Next Scheduled Audit</p>
            <div className="flex justify-center items-end gap-2 mb-2">
              <span className="text-6xl font-black text-white tracking-tighter">14</span>
              <span className="text-xl font-bold text-gray-600 mb-2">Days</span>
            </div>
            <p className="text-xs text-emerald-500 font-bold mb-8">System Health: 94%</p>
            
            {/* DYNAMIC CRM DISPATCH BUTTON */}
            <button 
              disabled={isDispatching || !!ticket}
              onClick={handleDispatch}
              className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                ticket ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "bg-[#D4AF37] hover:bg-yellow-500 text-black"
              }`}
            >
              {isDispatching ? "Syncing with Fleet..." : ticket ? `Ticket Active: ${ticket}` : "Request On-Site Tech"}
            </button>
          </div>

          {/* LEAKAGE RECAPTURE WIDGET */}
          <div className="bg-[#0A1118] border border-white/5 rounded-[2.5rem] p-8">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart3 size={14} className="text-[#D4AF37]" /> Yield Protection
            </h4>
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-400">Monthly Opex Saved</span>
                  <span className="text-lg font-black text-emerald-400">₹ {new Intl.NumberFormat('en-IN').format(metrics.recoverableYield)}</span>
               </div>
               <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-400">Downtime Prevented</span>
                  <span className="text-lg font-black text-white">42 Hours</span>
               </div>
               <div className="pt-4 border-t border-white/5">
                 <p className="text-[9px] text-gray-600 italic uppercase leading-tight">
                   "By reducing technical friction, the Innovate OS recaptures enough yield to cover your SaaS subscription 14x over."
                 </p>
               </div>
            </div>
          </div>

          {/* SPARE PARTS QUICK ORDER */}
          <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 rounded-2xl flex items-center justify-center gap-3 transition-all text-[10px] font-black uppercase tracking-widest">
            <Wrench size={16} className="text-blue-400" /> Order Verified Spares
          </button>
        </div>

      </div>
    </main>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function LifecycleCard({ icon, label, value, status, health }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 hover:bg-white/[0.04] transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-right">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Status</span>
          <span className="text-[10px] font-bold text-white uppercase">{status}</span>
        </div>
      </div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-black text-white">{value}</h3>
        <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} animate={{ width: `${health}%` }}
            className={`h-full ${health > 70 ? "bg-emerald-500" : "bg-orange-500"}`} 
          />
        </div>
      </div>
    </div>
  );
}

function LogItem({ date, task, machine, tech, status }: any) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-all">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-gray-600 w-12">{date}</span>
        <div>
          <p className="text-xs font-bold text-white">{task}</p>
          <p className="text-[10px] text-gray-500 uppercase font-bold">{machine} • {tech}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${status === "Complete" ? "bg-emerald-500" : "bg-orange-500"}`} />
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{status}</span>
      </div>
    </div>
  );
}