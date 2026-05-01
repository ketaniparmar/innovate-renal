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
  Clock
} from "lucide-react";

export default function DiaCareExecutionPage() {
  return (
    // STRICT OVERFLOW CONTROL: Prevents horizontal scrolling on mobile
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-x-hidden w-full relative font-sans">
      
      {/* 🌌 Background Depth (Locked inside overflow container) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/5 blur-[150px] top-[-200px] right-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[150px] bottom-[-100px] left-[-100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- 🚀 HERO: OUTCOME-DRIVEN POSITIONING --- */}
        <div className="mb-24 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8"
          >
            Execution Engine · South Gujarat
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8"
          >
            Infrastructure Built for ROI. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Deployed with Certainty.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-12 font-medium mx-auto md:mx-0"
          >
            We ensure your ₹7–25 Cr dialysis project actually works. Utilizing priority regional access via <strong className="text-white">DiaCare Solutions</strong>, we bridge the gap between financial underwriting and operational go-live.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto md:mx-0"
          >
            <MetricBadge icon={<TrendingUp size={18}/>} label="Project Range" value="₹7–25 Cr" />
            <MetricBadge icon={<Clock size={18}/>} label="Go-Live Model" value="16-Week Target" />
            <MetricBadge icon={<ShieldCheck size={18}/>} label="Compliance" value="NABH-Ready" />
          </motion.div>
        </div>

        {/* --- ⏱️ EXECUTION TIMELINE: TRUST TRIGGER --- */}
        <section className="mb-32">
          <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10 text-center">16-Week Deployment Architecture</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TimelineStep week="01-02" task="Feasibility & DPR" />
            <TimelineStep week="03-06" task="Design & Planning" />
            <TimelineStep week="07-10" task="Priority Procurement" highlight />
            <TimelineStep week="11-14" task="Installation Loop" />
            <TimelineStep week="15-16" task="Revenue Go-Live" />
          </div>
        </section>

        {/* --- 🏥 LAYER 01: CLINICAL PERFORMANCE --- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 shadow-[0_20px_50px_rgba(198,168,90,0.05)] rounded-[3rem] p-10 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShieldCheck size={120} className="text-[#C6A85A]" />
              </div>
              <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">The Clinical Performance Layer</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">AI-Series Hemodialysis</h2>
              <p className="text-sm text-gray-400 mb-10 font-medium leading-relaxed">
                Hardware engineered to reduce clinical complications and improve patient quality of life through real-time AI monitoring.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <FeatureItem label="Ultrapure Dialysis" icon={<Droplets size={16}/>} />
                <FeatureItem label="Kt/V Adequate Monitoring" icon={<Activity size={16}/>} />
                <FeatureItem label="One-Touch Auto-Priming" icon={<Cpu size={16}/>} />
                <FeatureItem label="Online BPM Integration" icon={<ShieldCheck size={16}/>} />
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-6 mt-6">
                Modular distributed design for high-speed technical servicing.
              </p>
            </motion.div>

            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight">ROI Impact: Safety</h3>
              <ul className="space-y-8">
                <ReasonItem 
                  title="Reduced Complication Risk" 
                  desc="Ultrapure fluid generation in real-time significantly reduces patient complications, stabilizing monthly bed occupancy." 
                />
                <ReasonItem 
                  title="Simplified Maintenance" 
                  desc="Unique dual-wing door design and user-friendly interface minimize labor-hours for servicing, reducing technical downtime." 
                />
              </ul>
            </div>
          </div>
        </section>

        {/* --- 🏗️ LAYER 02: OPERATIONAL EFFICIENCY --- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center flex-row-reverse">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight">ROI Impact: Margin</h3>
              <ul className="space-y-8">
                <ReasonItem 
                  title="Rapid Asset Recovery" 
                  desc="Simultaneous reprocessing of two dialyzers in ~12 minutes mathematically improves daily facility throughput." 
                />
                <ReasonItem 
                  title="Optimized Consumable Rail" 
                  desc="Exceptionally low sterilant consumption (27ml per dialyzer) permanently protects your per-session gross margins." 
                />
              </ul>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A160C] to-[#121D33] border border-[#C6A85A]/20 shadow-[0_20px_50px_rgba(198,168,90,0.05)] rounded-[3rem] p-10 md:p-12 relative overflow-hidden order-1 md:order-2"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <BarChart3 size={120} className="text-[#C6A85A]" />
              </div>
              <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">The Operational Efficiency Layer</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Dialyzer Reprocessing System</h2>
              <p className="text-sm text-gray-400 mb-10 font-medium leading-relaxed">
                Automated infrastructure to standardize reuse protocols and ensure strict AAMI-standard patient safety.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <FeatureItem label="Pressure Leak Test" icon={<BarChart3 size={16}/>} />
                <FeatureItem label="Volume (TBV) Testing" icon={<Lock size={16}/>} />
                <FeatureItem label="Battery Resilience" icon={<Zap size={16}/>} />
                <FeatureItem label="Barcode Serialization" icon={<Server size={16}/>} />
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-[#C6A85A]/10 pt-6 mt-6">
                Medical-grade stainless steel frame for zero-corrosion institutional longevity.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 💰 THE FINANCIAL LAYER: EXECUTION ROI --- */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">Execution Impact on ROI</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">
              How priority deployment access physically translates into financial performance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ImpactCard title="4-Week Accelerated Start" desc="Priority access via DiaCare starts revenue generation 30 days earlier than open-market procurement." />
            <ImpactCard title="22% Lower Downtime" desc="Regional technical support proximity reduces asset idle time, permanently increasing monthly machine utilization." />
            <ImpactCard title="Asset-Light Expansion" desc="Proprietary leasing models available for high-growth healthcare groups scaling in South Gujarat." />
          </div>
        </section>

        {/* --- 🏁 FINAL CONVERSION FUNNEL --- */}
        <div className="text-center p-12 md:p-16 rounded-[4rem] bg-[#0D1525] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter relative z-10">Initialize Your Execution.</h2>
          <p className="text-sm md:text-base font-medium text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            "We don’t just design systems. We provide the execution rails to actually deliver them—faster and with absolute mathematical certainty."
          </p>
          <Link href="/calculator" className="relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-[#C6A85A] text-[#0A0F1C] px-8 md:px-10 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-[0_10px_30px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] transition-all flex items-center gap-3 mx-auto"
            >
              Simulate Execution Yield <ArrowRight size={16}/>
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
    <div className="flex items-center justify-center md:justify-start gap-4 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-2xl border border-white/5 group">
      <div className="text-[#C6A85A] group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-left">
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1.5">{label}</p>
        <p className="text-sm font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function TimelineStep({ week, task, highlight = false }: { week: string, task: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border transition-colors ${highlight ? 'border-[#C6A85A]/40 bg-[#C6A85A]/10 shadow-[0_0_20px_rgba(198,168,90,0.1)]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}>
      <p className={`text-[9px] font-black tracking-widest mb-2 ${highlight ? 'text-[#C6A85A]' : 'text-gray-500'}`}>WEEK {week}</p>
      <p className="text-xs md:text-sm font-bold text-white leading-tight">{task}</p>
    </div>
  );
}

function FeatureItem({ label, icon }: { label: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
      <div className="text-[#C6A85A] shrink-0">{icon}</div> {label}
    </div>
  );
}

function ReasonItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="group">
      <h4 className="text-white font-black mb-2 flex items-center gap-3 text-sm md:text-base">
        <CheckCircle2 size={18} className="text-[#C6A85A] group-hover:scale-110 transition-transform shrink-0" /> {title}
      </h4>
      <p className="text-sm font-medium text-gray-400 leading-relaxed pl-7">{desc}</p>
    </div>
  );
}

function ImpactCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-[#C6A85A]/30 transition-all text-left group shadow-lg">
      <h4 className="text-[#C6A85A] font-black uppercase tracking-widest text-[10px] mb-3 group-hover:text-[#F1E5AC] transition-colors">{title}</h4>
      <p className="text-sm font-medium text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}