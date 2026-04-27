"use client";

import React, { useMemo } from "react";
import { 
  Activity, ShieldCheck, Wrench, Droplets, Cpu, BarChart3 
} from "lucide-react";
import { motion } from "framer-motion";

// --- 1. IMPORT GLOBAL STATE & V8 ENGINE ---
import { useInfra } from "@/context/InfrastructureContext";
import { calculateV8Capex } from "@/lib/capex-engine-v8";

// --- STRICT TYPESCRIPT INTERFACES ---
interface LifecycleCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  status: string;
  health: number;
}

interface LogItemProps {
  date: string;
  task: string;
  machine: string;
  tech: string;
  status: "Complete" | "Pending" | "Failed";
}

export default function AMCIntelPage() {
  // HOOK INTO GLOBAL DATA (With strict V8 defaults)
  const infraContext = useInfra();
  
  const {
    machines = 15,
    sessionsPerDay = 2.8,
    downtime = 5,
    pmjay = 40,
    pvt = 40,
    tpa = 20,
    mode = "single", // FIXED: "standard" replaced with strict type "single"
    cityTier = "Tier_2",
    tdsLevel = 850,
    buildGrade = "Premium"
  } = infraContext || {};

  // CALCULATE FINANCIAL IMPACT (V8 Architecture)
  const metrics = useMemo(() => {
    try {
      // 1. Fetch exact CAPEX from the V8 Engine
      const capexData = calculateV8Capex({ machines, cityTier, tdsLevel, buildGrade });
      const safeTotalCapex = capexData.totalCapex || 0;

      // 2. Synthesize Real-Time Valuation
      const totalMix = Math.max(pmjay + pvt + tpa, 1);
      const weights = { pmjay: pmjay / totalMix, pvt: pvt / totalMix, tpa: tpa / totalMix };
      const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);
      
      const monthlyRevenue = (machines * sessionsPerDay * 26) * WAR;
      const estimatedYearlyEbitda = (monthlyRevenue * 12) * 0.35; // ~35% blended margin
      const safeExitValue = estimatedYearlyEbitda * 8.5; // 8.5x Institutional Exit Multiple

      // 3. Theoretical Leakage vs. Recoverable Yield
      const monthlyLeakage = (monthlyRevenue * (downtime / 100)) + (safeTotalCapex * 0.005);
      const recoverableYield = monthlyLeakage * 0.85; // Recapture 85% through predictive AMC
      
      return { 
        totalCapex: safeTotalCapex,
        exitValue: safeExitValue,
        monthlyLeakage, 
        recoverableYield 
      };
    } catch (error) {
      console.error("V8 Engine calculation failed:", error);
      return { exitValue: 0, monthlyLeakage: 0, recoverableYield: 0 };
    }
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode, cityTier, tdsLevel, buildGrade]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);

  return (
    <main className="min-h-screen bg-[#0A0F1C] p-6 lg:p-12 font-sans overflow-x-hidden selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* 2. HEADER: ASSET HEALTH OVERVIEW */}
      <div className="max-w-7xl mx-auto mb-12">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1.5 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] flex items-center gap-2">
                <ShieldCheck size={14} /> Predictive AMC Active
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Service Intelligence.</h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl font-medium">
              Monitoring <span className="text-white font-bold">{machines} Machines</span> and RO Infrastructure to protect your <span className="text-[#C6A85A] font-bold">₹ {(metrics.exitValue / 10000000).toFixed(2)} Cr</span> enterprise value.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#0D1525] border border-white/5 p-5 rounded-[1.5rem] text-right shadow-lg">
              <p className="text-[10px] text-gray-500 uppercase font-black mb-1.5 tracking-widest">Recoverable Leakage</p>
              <p className="text-2xl font-black text-[#00A8A8] tabular-nums">
                ₹ {formatINR(metrics.recoverableYield)} <span className="text-[10px] text-gray-600 tracking-widest">/MO</span>
              </p>
            </div>
          </div>
        </header>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* 3. LEFT COLUMN: REAL-TIME TELEMETRY */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* UPTIME MONITOR */}
          <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden relative shadow-xl">
             <div className="flex justify-between items-center mb-8">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity size={14} className="text-[#00A8A8]" /> Fleet Uptime Status
                </h4>
                <span className="text-xs font-black text-white tabular-nums tracking-widest">{(100 - (downtime * 0.1)).toFixed(1)}% Avg</span>
             </div>

             <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {Array.from({ length: Math.max(1, machines) }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="aspect-square bg-[#00A8A8]/10 border border-[#00A8A8]/30 rounded-xl flex items-center justify-center group relative cursor-crosshair"
                  >
                    <div className="w-1.5 h-1.5 bg-[#00A8A8] rounded-full shadow-[0_0_10px_#00A8A8] animate-pulse" />
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0A0F1C] border border-white/10 px-3 py-1.5 rounded-lg text-[9px] font-bold opacity-0 group-hover:opacity-100 whitespace-nowrap z-20 pointer-events-none transition-all shadow-xl text-white tracking-widest">
                      UNIT #{100 + i} - ONLINE
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* CRITICAL COMPONENTS LIFECYCLE */}
          <div className="grid md:grid-cols-2 gap-6">
            <LifecycleCard 
              icon={<Droplets className="text-[#00A8A8]" />} 
              label="RO Membrane Permeability" 
              value="82%" 
              status="Optimal" 
              health={82}
            />
            <LifecycleCard 
              icon={<Cpu className="text-[#C6A85A]" />} 
              label="Power Supply Module" 
              value="1,420 Hrs" 
              status="Review at 2k" 
              health={65}
            />
          </div>

          {/* MAINTENANCE LOG */}
          <div className="bg-[#0A0F1C] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0D1525]">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recent Activity Log</h4>
              <button className="text-[10px] text-[#C6A85A] font-black uppercase hover:text-white transition-colors tracking-widest">
                View Full Audit
              </button>
            </div>
            <div className="divide-y divide-white/5 bg-[#0D1525]/50">
              <LogItem date="24 APR" task="RO System Descaling" machine="Main Plant" tech="K. Parmar" status="Complete" />
              <LogItem date="22 APR" task="Machine #104 Periodic Service" machine="Unit 104" tech="R. Mehta" status="Pending" />
              <LogItem date="19 APR" task="Endotoxin Filter Replacement" machine="Fleet-Wide" tech="System" status="Complete" />
            </div>
          </div>
        </div>

        {/* 4. RIGHT COLUMN: SERVICE ACTION HUB */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AMC STATUS CARD */}
          <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 text-center relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#C6A85A]/5 blur-[60px] pointer-events-none" />
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6 relative z-10">Next Scheduled Audit</p>
            <div className="flex justify-center items-end gap-2 mb-2 relative z-10">
              <span className="text-7xl font-black text-white tracking-tighter tabular-nums">14</span>
              <span className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-widest">Days</span>
            </div>
            <p className="text-[10px] text-[#00A8A8] uppercase font-black tracking-widest mb-8 relative z-10">System Health: 94%</p>
            <button className="w-full relative z-10 bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(198,168,90,0.2)]">
              Request On-Site Tech
            </button>
          </div>

          {/* LEAKAGE RECAPTURE WIDGET */}
          <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
              <BarChart3 size={14} className="text-[#C6A85A]" /> Yield Protection
            </h4>
            <div className="space-y-6">
               <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-400 font-medium">Monthly Opex Saved</span>
                  <span className="text-lg font-black text-[#00A8A8] tabular-nums">₹ {formatINR(metrics.recoverableYield)}</span>
               </div>
               <div className="flex justify-between items-end">
                  <span className="text-xs text-gray-400 font-medium">Downtime Prevented</span>
                  <span className="text-lg font-black text-white tabular-nums">42 Hours</span>
               </div>
               <div className="pt-6 border-t border-white/5">
                 <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                   By reducing technical friction, the Sovereign OS recaptures enough yield to cover your operational subscription multiple times over.
                 </p>
               </div>
            </div>
          </div>

          {/* SPARE PARTS QUICK ORDER */}
          <button className="w-full bg-[#0A0F1C] hover:bg-white/5 border border-white/5 text-white py-6 rounded-[2rem] flex items-center justify-center gap-3 transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
            <Wrench size={16} className="text-[#00A8A8]" /> Order Verified Spares
          </button>
        </div>

      </div>
    </main>
  );
}

// --- REUSABLE SUB-COMPONENTS (With Brand Color Logic) ---

function LifecycleCard({ icon, label, value, status, health }: LifecycleCardProps) {
  const isHealthy = health > 70;
  return (
    <div className="bg-[#0D1525] border border-white/5 rounded-[2rem] p-6 hover:border-white/10 transition-all group shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-[#0A0F1C] border border-white/5 rounded-xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-right">
          <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest block mb-1">Status</span>
          <span className={`text-[9px] font-black uppercase tracking-widest ${isHealthy ? 'text-[#00A8A8]' : 'text-[#C6A85A]'}`}>
            {status}
          </span>
        </div>
      </div>
      <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">{label}</p>
      <div className="flex items-center gap-5">
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        <div className="h-1.5 flex-1 bg-[#0A0F1C] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${Math.min(100, Math.max(0, health))}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${isHealthy ? "bg-[#00A8A8]" : "bg-[#C6A85A]"}`} 
          />
        </div>
      </div>
    </div>
  );
}

function LogItem({ date, task, machine, tech, status }: LogItemProps) {
  // Brand color routing
  const statusColor = 
    status === "Complete" ? "bg-[#00A8A8]" : 
    status === "Pending" ? "bg-[#C6A85A]" : 
    "bg-[#A6192E]";

  return (
    <div className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-all">
      <div className="flex items-center gap-5">
        <span className="text-[10px] font-black text-gray-600 tracking-widest w-12">{date}</span>
        <div>
          <p className="text-xs font-bold text-white tracking-wide">{task}</p>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-0.5">{machine} • {tech}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${statusColor}`} />
        <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{status}</span>
      </div>
    </div>
  );
}