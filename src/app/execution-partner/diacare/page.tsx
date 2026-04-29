"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Activity, 
  Droplets, 
  CheckCircle2, 
  Lock,
  BarChart3,
  Server,
  TrendingUp,
  Clock,
  Briefcase
} from "lucide-react";

export default function DiaCareExecutionPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-hidden">
      
      {/* 🌌 Ambient Background (Apple-grade Depth) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-[#00A8A8]/5 blur-[150px] top-[-200px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[150px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- 🚀 HERO: OUTCOME-DRIVEN POSITIONING --- */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-6 mb-8"
          >
            <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A]">
              Execution Engine (South Gujarat)
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8">
            Infrastructure Designed for ROI. <br />
            <span className="text-white/60">Deployed with Certainty.</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed mb-12">
            We ensure your ₹7–25 Cr dialysis project actually works. Utilizing priority regional access via **DiaCare Solutions**, we bridge the gap between financial planning and operational go-live.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
            <MetricBadge icon={<TrendingUp size={16}/>} label="Project Range" value="₹7–25 Cr" />
            <MetricBadge icon={<Clock size={16}/>} label="Go-Live Model" value="16-Week Target" />
            <MetricBadge icon={<ShieldCheck size={16}/>} label="Compliance" value="NABH-Ready" />
          </div>
        </div>

        {/* --- ⏱️ EXECUTION TIMELINE: TRUST TRIGGER --- */}
        <section className="mb-32">
          <h2 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-12 text-center opacity-50">16-Week Deployment Architecture</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <TimelineStep week="01-02" task="Feasibility & DPR" />
            <TimelineStep week="03-06" task="Design & Planning" />
            <TimelineStep week="07-10" task="Priority Procurement" highlight />
            <TimelineStep week="11-14" task="Installation Loop" />
            <TimelineStep week="15-16" task="Revenue Go-Live" />
          </div>
        </section>

        {/* --- 🏥 LAYER 01: CLINICAL PERFORMANCE --- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 relative overflow-hidden"
            >
              <p className="text-[10px] font-black text-[#00A8A8] uppercase tracking-[0.3em] mb-4">The Clinical Performance Layer</p>
              <h2 className="text-4xl font-black text-white mb-6">AI-Series Hemodialysis [cite: 182]</h2>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Hardware engineered to reduce clinical complications and improve patient quality of life through real-time AI monitoring[cite: 182, 206].
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <FeatureItem label="Ultrapure Dialysis" icon={<Droplets size={14}/>} /> {/* [cite: 194, 205] */}
                <FeatureItem label="Kt/V Adequate Monitoring" icon={<Activity size={14}/>} /> {/* [cite: 241, 244] */}
                <FeatureItem label="One-Touch Auto-Priming" icon={<Cpu size={14}/>} /> {/* [cite: 227, 228] */}
                <FeatureItem label="Online BPM Integration" icon={<ShieldCheck size={14}/>} /> {/* [cite: 207, 208] */}
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-6">
                Modular distributed design for high-speed technical servicing[cite: 191, 195, 256].
              </p>
            </motion.div>

            <div>
              <h3 className="text-2xl font-black text-white mb-6">ROI Impact: Safety</h3>
              <ul className="space-y-6">
                <ReasonItem 
                  title="Reduced Complication Risk" 
                  desc="Ultrapure fluid generation in real-time significantly reduces patient complications, stabilizing occupancy[cite: 206]." 
                />
                <ReasonItem 
                  title="Simplified Maintenance" 
                  desc="Unique dual-wing door design and user-friendly interface minimize labor-hours for servicing[cite: 192, 256, 260]." 
                />
              </ul>
            </div>
          </div>
        </section>

        {/* --- 🏗️ LAYER 02: OPERATIONAL EFFICIENCY --- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-black text-white mb-6">ROI Impact: Margin</h3>
              <ul className="space-y-6">
                <ReasonItem 
                  title="Rapid Asset Recovery" 
                  desc="Simultaneous reprocessing of two dialyzers in ~12 minutes improves facility throughput[cite: 38, 154]." 
                />
                <ReasonItem 
                  title="Optimized Consumable Rail" 
                  desc="Low sterilant consumption (27ml per dialyzer) protects per-session gross margins[cite: 42, 157]." 
                />
              </ul>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 relative overflow-hidden order-1 md:order-2"
            >
              <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">The Operational Efficiency Layer</p>
              <h2 className="text-4xl font-black text-white mb-6">Dialyzer Reprocessing System (DRS) [cite: 8, 21]</h2>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Automated infrastructure to standardize reuse protocols and ensure AAMI-standard patient safety[cite: 34].
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <FeatureItem label="Pressure Leak Test" icon={<BarChart3 size={14}/>} /> {/* [cite: 149] */}
                <FeatureItem label="Volume (TBV) Testing" icon={<Lock size={14}/>} /> {/* [cite: 152] */}
                <FeatureItem label="Battery Resilience" icon={<Zap size={14}/>} /> {/* [cite: 107, 143] */}
                <FeatureItem label="Barcode Serialization" icon={<Server size={14}/>} /> {/* [cite: 112, 142] */}
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-6">
                Medical-grade stainless steel frame for zero-corrosion institutional longevity[cite: 24].
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 💰 THE FINANCIAL LAYER: EXECUTION ROI --- */}
        <section className="mb-32 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center">
          <h2 className="text-3xl font-black text-white mb-4">Execution Impact on ROI</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            How priority deployment access translates into financial performance.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard title="4-Week Accelerated Start" desc="Priority access via DiaCare starts revenue generation 30 days earlier than open-market procurement." />
            <ImpactCard title="22% Lower Downtime" desc="Regional technical support proximity reduces asset idle time, increasing monthly machine utilization." />
            <ImpactCard title="Asset-Light Expansion" desc="Proprietary leasing models available for high-growth healthcare groups in South Gujarat." />
          </div>
        </section>

        {/* --- 🏁 FINAL CONVERSION FUNNEL --- */}
        <div className="text-center p-16 rounded-[4rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 shadow-[0_0_80px_rgba(198,168,90,0.1)]">
          <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">Initialize Your Execution.</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            "We don’t just design systems. We provide the execution rails to actually deliver them—faster and better."
          </p>
          <Link href="/os">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_40px_rgba(198,168,90,0.3)] flex items-center gap-3 mx-auto"
            >
              Get Project Feasibility + Execution Plan <ArrowRight size={16}/>
            </motion.button>
          </Link>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function MetricBadge({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
      <div className="text-[#C6A85A]">{icon}</div>
      <div>
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function TimelineStep({ week, task, highlight = false }: { week: string, task: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'border-[#C6A85A]/40 bg-[#C6A85A]/5' : 'border-white/5 bg-white/[0.02]'}`}>
      <p className={`text-[10px] font-black tracking-widest mb-2 ${highlight ? 'text-[#C6A85A]' : 'text-gray-500'}`}>WEEK {week}</p>
      <p className="text-sm font-bold text-white leading-tight">{task}</p>
    </div>
  );
}

function FeatureItem({ label, icon }: { label: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
      <div className="text-white/20">{icon}</div> {label}
    </div>
  );
}

function ReasonItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="mb-6">
      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
        <CheckCircle2 size={16} className="text-[#00A8A8]" /> {title}
      </h4>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ImpactCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-left">
      <h4 className="text-[#C6A85A] font-black uppercase tracking-widest text-xs mb-3">{title}</h4>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}