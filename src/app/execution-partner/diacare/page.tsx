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
        
        {/* --- 🚀 HERO: PLAIN ENGLISH POSITIONING --- */}
        <div className="mb-24 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-8"
          >
            Premium Equipment Partner · South Gujarat
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8"
          >
            Top-Quality Dialysis Machines. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Installed on Time.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-12 font-medium mx-auto md:mx-0"
          >
            We ensure your ₹7–25 Cr dialysis project opens without delays. With our direct access to <strong className="text-white">DiaCare Solutions</strong>, we handle the equipment delivery, installation, and testing so you can focus on opening day.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto md:mx-0"
          >
            <MetricBadge icon={<TrendingUp size={18}/>} label="Project Size" value="₹7–25 Cr" />
            <MetricBadge icon={<Clock size={18}/>} label="Target Setup" value="16 Weeks" />
            <MetricBadge icon={<ShieldCheck size={18}/>} label="Safety Standard" value="NABH-Ready" />
          </motion.div>
        </div>

        {/* --- ⏱️ EXECUTION TIMELINE: TRUST TRIGGER --- */}
        <section className="mb-32">
          <h2 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10 text-center">16-Week Setup Timeline</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TimelineStep week="01-02" task="Planning & Approvals" />
            <TimelineStep week="03-06" task="Hospital Layout" />
            <TimelineStep week="07-10" task="Ordering Equipment" highlight />
            <TimelineStep week="11-14" task="Machine Installation" />
            <TimelineStep week="15-16" task="Opening Day" />
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
              <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">Built for Patient Safety</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Smart Dialysis Machines</h2>
              <p className="text-sm text-gray-400 mb-10 font-medium leading-relaxed">
                Advanced machines designed to reduce medical complications and improve patient comfort with real-time safety monitoring.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <FeatureItem label="Ultrapure Fluid System" icon={<Droplets size={16}/>} />
                <FeatureItem label="Kt/V Quality Tracking" icon={<Activity size={16}/>} />
                <FeatureItem label="Auto-Priming" icon={<Cpu size={16}/>} />
                <FeatureItem label="Live Blood Pressure" icon={<ShieldCheck size={16}/>} />
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-white/5 pt-6 mt-6">
                Easy to repair, so your machines are rarely down.
              </p>
            </motion.div>

            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight">Why Doctors Choose Us: Safety</h3>
              <ul className="space-y-8">
                <ReasonItem 
                  title="Fewer Medical Complications" 
                  desc="Generating ultrapure fluids in real-time protects patients from infections, ensuring your beds stay full and patients stay healthy." 
                />
                <ReasonItem 
                  title="Easy Maintenance" 
                  desc="Smart design and easy-to-use screens mean your technicians spend less time fixing machines and more time helping patients." 
                />
              </ul>
            </div>
          </div>
        </section>

        {/* --- 🏗️ LAYER 02: OPERATIONAL EFFICIENCY --- */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center flex-row-reverse">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight">Why Owners Choose Us: Profit</h3>
              <ul className="space-y-8">
                <ReasonItem 
                  title="Faster Turnaround Times" 
                  desc="Clean and prep two dialyzers at the same time in just 12 minutes, allowing you to treat more patients every single shift." 
                />
                <ReasonItem 
                  title="Lower Supply Costs" 
                  desc="Our machines use very little sterilant (only 27ml per dialyzer), which instantly lowers your cost per session and protects your profit." 
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
              <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">Built for Center Efficiency</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Automated Dialyzer Cleaning</h2>
              <p className="text-sm text-gray-400 mb-10 font-medium leading-relaxed">
                Smart cleaning systems that follow strict medical safety rules, so you can safely reuse dialyzers and save money.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <FeatureItem label="Auto Leak Testing" icon={<BarChart3 size={16}/>} />
                <FeatureItem label="Volume Testing" icon={<Lock size={16}/>} />
                <FeatureItem label="Battery Backup" icon={<Zap size={16}/>} />
                <FeatureItem label="Barcode Scanning" icon={<Server size={16}/>} />
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-t border-[#C6A85A]/10 pt-6 mt-6">
                Medical-grade stainless steel frame that will not rust.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- 💰 THE FINANCIAL LAYER: EXECUTION ROI --- */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4">How Great Equipment Increases Your Profit</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">
              Getting the right machines delivered on time directly impacts how much money your center makes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <ImpactCard title="Open 1 Month Earlier" desc="Because we partner directly with DiaCare, your machines arrive faster. You can start treating patients and making money 30 days sooner." />
            <ImpactCard title="Fewer Broken Machines" desc="Our local repair teams fix issues quickly, so your machines are never sitting empty when a patient needs them." />
            <ImpactCard title="Flexible Payment Options" desc="We offer leasing and financing plans for growing hospital groups who want to expand without huge upfront costs." />
          </div>
        </section>

        {/* --- 🏁 FINAL CONVERSION FUNNEL --- */}
        <div className="text-center p-12 md:p-16 rounded-[4rem] bg-[#0D1525] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter relative z-10">Let's Get Your Equipment Ready.</h2>
          <p className="text-sm md:text-base font-medium text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            "We don’t just talk about building hospitals. We actually deliver and install the best equipment on the market, exactly when you need it."
          </p>
          <Link href="/calculator" className="relative z-10">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-[#C6A85A] text-[#0A0F1C] px-8 md:px-10 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-[0_10px_30px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] transition-all flex items-center gap-3 mx-auto"
            >
              Calculate Your Profit <ArrowRight size={16}/>
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