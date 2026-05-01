"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Server, Users, Activity, 
  TrendingUp, AlertTriangle, CheckCircle2, Lock,
  Stethoscope, BarChart3, Building2, Terminal
} from "lucide-react";
import { saveUserIntent } from "@/utils/intentTracker";

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-hidden relative pt-32 pb-24">
      
      {/* --- STICKY CONVERSION STRIP --- */}
      <motion.div 
        initial={{ y: -100 }} animate={{ y: showStickyCTA ? 0 : -100 }}
        className="fixed top-20 left-0 w-full z-40 bg-[#0D1525]/95 backdrop-blur-md border-b border-white/10 py-3 px-6 hidden md:flex justify-between items-center shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <Server size={16} className="text-[#00A8A8]" />
          <p className="text-xs font-black uppercase tracking-widest text-white">
            Clinical Protocol Enforced. Operations Controlled. Revenue Captured.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/calculator">
            <button 
              onClick={() => saveUserIntent("action", "Clicked Sticky Calculate")}
              className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all hidden lg:block"
            >
              Calculate Utilization
            </button>
          </Link>
          <Link href="/clinical-os/demo">
            <button 
              onClick={() => saveUserIntent("action", "Clicked Sticky Demo")}
              className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_0_15px_rgba(198,168,90,0.3)]"
            >
              See Live System Demo
            </button>
          </Link>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* --- HERO: CORE POSITIONING --- */}
        <section className="mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-6">
            The Sovereign Execution Layer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            This is not dialysis software. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">This is a Clinical Execution System.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-4 font-medium">
            It controls treatment, enforces safety, and captures revenue—automatically. Designed for real dialysis centers running 15–25 machines across 3 shifts—where every missed protocol is a clinical risk and every idle machine is lost revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-12">
            <Link href="/clinical-os/demo" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("action", "Requested System Demo")}
                className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,168,90,0.2)]"
              >
                See Live System Demo <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/calculator" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("action", "Requested Utilization Calc")}
                className="w-full bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <BarChart3 size={16} className="text-[#00A8A8]"/> Calculate Center Utilization
              </button>
            </Link>
          </div>
        </section>

        {/* --- THE THREE PERSONAS (CORE VALUE) --- */}
        <section className="mb-32 space-y-8">
          
          {/* Nephrologist */}
          <div className="p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-[#00A8A8]/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A8A8]/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center text-[#00A8A8] border border-[#00A8A8]/20">
                <Stethoscope size={28}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8]">For Nephrologists</p>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Clinical Safety Is Not a Checklist. It Must Be Enforced by the System.</h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-8 max-w-3xl relative z-10 leading-relaxed">
              In most centers, protocols exist on paper—but execution depends on human memory. You are no longer relying on compliance. You are operating within a controlled clinical environment.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              <ul className="space-y-4">
                <ListItem text="A session cannot start without pre-dialysis vitals." />
                <ListItem text="A session cannot complete without post-dialysis data." />
                <ListItem text="Infection zoning is enforced automatically—no cross-allocation possible." />
                <ListItem text="Every treatment step is recorded, time-stamped, and auditable." />
              </ul>
              <div className="bg-[#05080F] p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">Key Outcomes & Expectations</p>
                <div className="space-y-3 text-sm font-bold text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]"/> Zero cross-infection risk</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]"/> Complete treatment audit trails</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]"/> Reliable complication tracking</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technician */}
          <div className="p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#121626] to-[#0A0F1C] border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-300 border border-white/10">
                <Activity size={28}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">For Dialysis Technicians</p>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Clear Instructions. No Confusion. No Mistakes.</h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-8 max-w-3xl relative z-10 leading-relaxed">
              On the dialysis floor, speed matters—but clarity matters more. No guesswork. No manual tracking. No last-minute corrections. This system guides every step.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              <ul className="space-y-4">
                <ListItem text="You see exactly which patient, which machine, and what time." />
                <ListItem text="You cannot start a session unless required vitals are entered." />
                <ListItem text="You are alerted if a machine or patient assignment is incorrect." />
                <ListItem text="You always know your current patient load." />
              </ul>
              <div className="bg-[#05080F] p-6 rounded-2xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">How It Helps You on the Floor</p>
                <div className="space-y-3 text-sm font-bold text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-white"/> Prevents errors before they happen</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-white"/> Reduces stress during busy shifts</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-white"/> Ensures proper documentation automatically</div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner / Investor */}
          <div className="p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1A160C] to-[#0A0F1C] border border-[#C6A85A]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C6A85A]/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center text-[#C6A85A] border border-[#C6A85A]/30">
                <TrendingUp size={28}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A]">For Owners & Investors</p>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Every Session Controlled. Every Machine Utilized. Every Rupee Captured.</h2>
              </div>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-8 max-w-3xl relative z-10 leading-relaxed">
              Dialysis profitability depends on three variables: Machine utilization, Operational discipline, and Billing accuracy. This is not reporting. This is real-time operational control tied directly to revenue generation.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              <ul className="space-y-4">
                <ListItem text="Idle machines are identified in real-time." color="text-[#C6A85A]" />
                <ListItem text="Technician overload is prevented, ensuring consistent throughput." color="text-[#C6A85A]" />
                <ListItem text="Every completed session automatically becomes a billable event." color="text-[#C6A85A]" />
                <ListItem text="Missing clinical data cannot leak revenue." color="text-[#C6A85A]" />
              </ul>
              <div className="bg-[#05080F] p-6 rounded-2xl border border-[#C6A85A]/10 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest text-[#C6A85A] font-bold mb-4">Business & Financial Impact</p>
                <div className="space-y-3 text-sm font-bold text-gray-300">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> Achieve 90%+ machine utilization</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> Reduce revenue leakage from incomplete data</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#C6A85A]"/> Standardize operations across multiple centers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HOW THE SYSTEM WORKS (CONTINUOUS FLOW) --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">Operational Architecture</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">From Scheduling to Billing—<br/>One Continuous Flow</h3>
          </div>

          <div className="grid lg:grid-cols-5 gap-4">
            <FlowStep num="1" title="Smart Allocation" desc="Patients assigned to machines based on infection status. Invalid assignments blocked." />
            <FlowStep num="2" title="Controlled Start" desc="Technicians must enter pre-dialysis vitals before starting. No shortcuts allowed." />
            <FlowStep num="3" title="Live Monitoring" desc="Machine status updates in real-time: Ready, Running, Cleaning, or Down." />
            <FlowStep num="4" title="Structured Data" desc="Post-dialysis vitals and fluid removal must be recorded before completion." />
            <FlowStep num="5" title="Auto Billing" desc="The moment a session is completed, billing is generated—no manual intervention." isLast />
          </div>
          <div className="mt-12 text-center col-span-1 lg:col-span-5">
  <Link href="/clinical-os/technician-portal">
    <button className="bg-transparent border border-[#00A8A8] text-[#00A8A8] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#00A8A8]/10 transition-all shadow-[0_0_20px_rgba(0,168,168,0.15)]">
      Open Live Floor Simulator 
    </button>
  </Link>
</div>
        </section>

        {/* --- DUAL THREAT: ALERTS & REVENUE CONTROL --- */}
        <section className="grid md:grid-cols-2 gap-8 mb-32">
          
          {/* REAL-TIME ALERTS */}
          <div className="bg-red-950/10 border border-red-900/30 rounded-[2.5rem] p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-500" size={28}/>
              <h3 className="text-2xl font-black text-white">Real-Time Alerts</h3>
            </div>
            <p className="text-sm text-gray-400 font-medium mb-8">
              The system tells you what needs attention—before it becomes a problem. These are not passive notifications. They are operational signals that require action.
            </p>
            <div className="space-y-4">
              <AlertItem text="Delayed session starts (15+ min)" />
              <AlertItem text="Idle machines during active shifts" />
              <AlertItem text="Technician overload risks" />
              <AlertItem text="Incorrect infection zone assignments" />
            </div>
          </div>

          {/* REVENUE CONTROL LAYER */}
          <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[2.5rem] p-10 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-[#C6A85A]" size={28}/>
              <h3 className="text-2xl font-black text-white">Revenue Control Layer</h3>
            </div>
            <p className="text-sm text-[#C6A85A] font-bold mb-4 uppercase tracking-widest">
              If it's not documented, it's not billable.
            </p>
            <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed">
              In many centers, revenue is lost due to missing vitals, incomplete documentation, and manual billing delays. This system fixes that.
            </p>
            <div className="space-y-4 text-sm font-bold text-white mb-6">
              <div className="flex items-start gap-3"><CheckCircle2 className="text-[#C6A85A] shrink-0 mt-0.5" size={18}/> Sessions cannot complete without required data.</div>
              <div className="flex items-start gap-3"><CheckCircle2 className="text-[#C6A85A] shrink-0 mt-0.5" size={18}/> Every valid session becomes a billing event.</div>
              <div className="flex items-start gap-3"><CheckCircle2 className="text-[#C6A85A] shrink-0 mt-0.5" size={18}/> Claim readiness is visible instantly.</div>
            </div>
            <div className="bg-[#C6A85A]/10 border border-[#C6A85A]/20 p-4 rounded-xl text-center">
              <p className="text-xs font-black text-[#C6A85A] uppercase tracking-widest">Result: Zero missed billing opportunities.</p>
            </div>
          </div>
        </section>

        {/* --- HUMANIZED DICTIONARY --- */}
        <section className="mb-32 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-white">What the System Means in Practice</h3>
          </div>
          <div className="bg-[#0D1525] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-2 bg-[#0A0F1C] border-b border-white/10 p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">What You See on Screen</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">What It Actually Means on the Floor</p>
            </div>
            <DictionaryRow term="Session Status" definition="Stage of patient treatment" />
            <DictionaryRow term="Machine State" definition="Whether the machine is usable right now" />
            <DictionaryRow term="Alerts" definition="Immediate operational risks" />
            <DictionaryRow term="Completed Session" definition="Ready for billing" highlight />
            <DictionaryRow term="Missing Data" definition="Revenue cannot be captured" warning />
          </div>
        </section>

        {/* --- BOTTOM CONVERSION CTA --- */}
        <div className="text-center p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#0A0F1C] to-[#0D1525] border border-[#C6A85A]/20 shadow-2xl relative overflow-hidden">
          <Terminal size={120} className="absolute -left-10 -bottom-10 text-white/5 rotate-12 pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">See How Your Dialysis Center Actually Performs Under Control</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm font-medium relative z-10">
            Most centers operate on assumptions. This system shows reality—and improves it.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/clinical-os/demo" className="w-full md:w-auto">
              <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)] flex items-center justify-center gap-3">
                Book Live Demo <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/calculator" className="w-full md:w-auto">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                Get Center Utilization Report
              </button>
            </Link>
            <a href="https://wa.me/919879576332?text=I%20want%20to%20talk%20to%20a%20Clinical%20Systems%20Expert." target="_blank" rel="noreferrer" className="w-full md:w-auto">
              <button className="w-full bg-transparent hover:bg-white/5 text-[#00A8A8] px-8 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                Talk to Clinical Expert
              </button>
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function ListItem({ text, color = "text-white" }: { text: string, color?: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className={`mt-1 bg-white/5 p-1 rounded ${color}`}>
        <ArrowRight size={14} />
      </div>
      <p className="text-sm text-gray-300 font-medium leading-relaxed">{text}</p>
    </li>
  );
}

function AlertItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 bg-red-950/40 border border-red-900/50 p-4 rounded-xl">
      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
      <p className="text-sm font-bold text-red-200">{text}</p>
    </div>
  );
}

function FlowStep({ num, title, desc, isLast }: { num: string, title: string, desc: string, isLast?: boolean }) {
  return (
    <div className="relative p-6 bg-[#0D1525] border border-white/5 rounded-2xl flex flex-col h-full hover:border-[#00A8A8]/30 transition-colors">
      <div className="text-3xl font-black text-white/10 mb-4">{num}</div>
      <h4 className="text-base font-black text-white mb-3">{title}</h4>
      <p className="text-xs text-gray-400 font-medium leading-relaxed">{desc}</p>
      {!isLast && (
        <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/20 z-10">
          <ArrowRight size={20} />
        </div>
      )}
    </div>
  );
}

function DictionaryRow({ term, definition, highlight, warning }: { term: string, definition: string, highlight?: boolean, warning?: boolean }) {
  return (
    <div className={`grid grid-cols-2 border-b border-white/5 last:border-0 p-6 transition-colors ${highlight ? 'bg-[#C6A85A]/10' : warning ? 'bg-red-950/20' : 'hover:bg-white/[0.02]'}`}>
      <div className="flex items-center"><span className={`text-sm font-bold ${highlight ? 'text-[#C6A85A]' : warning ? 'text-red-400' : 'text-white'}`}>{term}</span></div>
      <div className="flex items-center"><span className={`text-sm font-medium ${highlight ? 'text-[#C6A85A]' : warning ? 'text-red-300' : 'text-gray-400'}`}>{definition}</span></div>
    </div>
  );
}