"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  Activity,
  ShieldCheck,
  Server,
  Users,
  Clock,
  Database,
  LineChart,
  CheckCircle2,
  FileText,
  Download,
  Terminal,
  LayoutDashboard,
  Lock
} from "lucide-react";
import { saveUserIntent } from "@/utils/intentTracker";

export default function ClinicalOSPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      saveUserIntent("lead", `Downloaded OS Overview: ${email}`);
      setIsSubmitted(true);
      setEmail("");
    }
  };

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
            The capacity orchestration layer governing center profitability.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="https://wa.me/919879576332?text=I%20want%20to%20request%20the%20Clinical%20OS%20Investor%20Deck." target="_blank" rel="noreferrer">
            <button 
              onClick={() => saveUserIntent("action", "Requested Investor Deck")}
              className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all hidden lg:block"
            >
              Investor Deck
            </button>
          </a>
          <a href="https://wa.me/919879576332?text=I%20want%20to%20see%20the%20Live%20Command%20Dashboard." target="_blank" rel="noreferrer">
            <button 
              onClick={() => saveUserIntent("action", "Requested Dashboard Demo")}
              className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_0_15px_rgba(198,168,90,0.3)]"
            >
              Live Dashboard
            </button>
          </a>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* --- HERO: THE SAAS POSITIONING --- */}
        <section className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-6">
            The Digital Infrastructure Layer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Dialysis Capacity Optimization <br className="hidden md:block"/>
            <span className="text-[#C6A85A]">& Clinical Workflow System.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-4 font-medium">
            We control the operational layer that determines your center's profitability. In a 20-machine center, every 10% drop in utilization can reduce annual revenue by <span className="text-white font-bold tracking-tight">₹40–60 Lakhs</span>, depending on payer mix and shift efficiency. 
          </p>
          
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#00A8A8] font-black mb-10">
            A Dedicated Capacity Orchestration Layer for Dialysis Infrastructure
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a href="https://wa.me/919879576332?text=I%20want%20to%20see%20the%20Live%20Command%20Dashboard." target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("action", "Requested Dashboard Demo")}
                className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,168,90,0.2)]"
              >
                See Live Command Dashboard <ArrowRight size={16}/>
              </button>
            </a>
            <a href="https://wa.me/919879576332?text=I%20want%20to%20request%20the%20Clinical%20OS%20Investor%20Deck." target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                <FileText size={16} className="text-[#00A8A8]"/> Request Investor Deck
              </button>
            </a>
          </div>

          {/* TARGET SEGMENT STRIP */}
          <div className="inline-block border-l-2 border-[#C6A85A] pl-4 text-left">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-1">
              Architected For
            </p>
            <h4 className="text-sm font-bold text-gray-300">
              Dialysis Chains • Hospital Groups • PPP Operators
            </h4>
          </div>
        </section>

        {/* --- LIVE METRICS STRIP (With Disclaimers) --- */}
        <section className="mb-24">
          <div className="border-y border-white/10 py-10 bg-[#0D1525]/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              <Metric label="Machine Utilization Target*" value="85–92%" color="text-white" />
              <Metric label="Missed Session Reduction*" value="-37%" color="text-[#25D366]" />
              <Metric label="Cross-Allocation (Scheduling Layer)" value="Near-Zero" color="text-[#00A8A8]" />
              <Metric label="EBITDA Revenue Uplift*" value="+18–25%" color="text-[#C6A85A]" />
            </div>
          </div>
          <p className="text-[10px] text-gray-600 mt-4 text-center font-bold uppercase tracking-widest">
            *Based on modeled capacity orchestration across 15–25 machine centers under rigid 3-shift operational conditions.
          </p>
        </section>

        {/* --- BEFORE VS AFTER ECONOMICS --- */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white tracking-tighter">The Economic Reality Check</h2>
            <p className="text-gray-400 mt-4 text-sm font-medium max-w-2xl mx-auto">
              You cannot scale a facility using fragmented data. Here is how constraint-aware capacity orchestration translates directly to your bottom line.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-[#0D1525] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-3 bg-[#0A0F1C] border-b border-white/10">
              <div className="p-6"><span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Metric</span></div>
              <div className="p-6 border-l border-white/5"><span className="text-[10px] font-black uppercase tracking-widest text-red-400">Without OS (Manual)</span></div>
              <div className="p-6 border-l border-white/5 bg-[#C6A85A]/5"><span className="text-[10px] font-black uppercase tracking-widest text-[#C6A85A]">With Sovereign OS</span></div>
            </div>
            
            <CompareRow label="Machine Utilization" oldVal="60–65%" newVal="85%+" />
            <CompareRow label="Infection Control" oldVal="High Human Error" newVal="Protocol-Enforced Isolation" />
            <CompareRow label="Monthly Revenue (20 Beds)" oldVal="₹18–22 Lakhs" newVal="₹25–30 Lakhs" />
            <CompareRow label="PM-JAY Claim Leakage" oldVal="12–15% Missed" newVal="< 2% Verified" />
          </div>
        </section>

        {/* --- CORE MODULES GRID --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-[#00A8A8] uppercase tracking-[0.3em] mb-4">Capacity Orchestration Layer</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Core Operating Modules</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ModuleCard 
              icon={<Users />}
              title="1. Clinical Profile Engine"
              desc="Tracks UHID, Dialysis Type, Dry Weight, Vascular Access, and strict infection flags (HBsAg, HCV, HIV) to feed rigid scheduling constraints."
            />
            <ModuleCard 
              icon={<Clock />}
              title="2. Constraint-Aware Scheduler"
              desc="Advanced scheduling engine mapping machine availability against technician shifts and infection isolation rules to eliminate dead slots."
            />
            <ModuleCard 
              icon={<Activity />}
              title="3. Session Lifecycle Tracking"
              desc="Tracks Pre/Post-weight, BP readings, complications, and exact consumable usage from confirmation to completion."
            />
            <ModuleCard 
              icon={<Database />}
              title="4. Billing & Interoperability"
              desc="Integrated revenue mapping. Tracks per-session pricing and strict PM-JAY reconciliation. Designed for API integration with existing HIS and hospital billing systems."
            />
          </div>
        </section>

        {/* --- DASHBOARD PREVIEW MOCK (The Proof of Life) --- */}
        <section className="mb-32 max-w-5xl mx-auto">
          <div className="text-center mb-10">
             <h3 className="text-3xl font-black text-white tracking-tighter">Command Center Preview</h3>
             <p className="text-sm text-gray-400 mt-3">Representative command center interface modeled on real-world dialysis workflows.</p>
          </div>

          <div className="bg-[#05080F] border border-[#00A8A8]/30 rounded-[2rem] p-4 shadow-[0_0_80px_rgba(0,168,168,0.1)] overflow-hidden relative">
            {/* Fake Mac Header */}
            <div className="flex gap-2 mb-6 px-4 pt-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-6 px-2 pb-4">
              {/* Fake Sidebar */}
              <div className="hidden lg:block space-y-4 border-r border-white/5 pr-6">
                <div className="flex items-center gap-3 text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-lg"><LayoutDashboard size={16}/> Capacity Grid</div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-500 px-4 py-2"><Users size={16}/> Patient Roster</div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-500 px-4 py-2"><Activity size={16}/> Shift Active</div>
              </div>

              {/* Fake Main Content */}
              <div className="col-span-3 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0A0F1C] border border-white/10 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Shift 1 Utilization</p>
                    <p className="text-2xl font-black text-white">92.5%</p>
                  </div>
                  <div className="bg-[#0A0F1C] border border-white/10 rounded-xl p-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Active Machines</p>
                    <p className="text-2xl font-black text-white">18 <span className="text-sm text-gray-600">/ 20</span></p>
                  </div>
                  <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4">
                    <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">Isolation Block</p>
                    <p className="text-2xl font-black text-red-400">2 <span className="text-sm text-red-900">HCV+</span></p>
                  </div>
                </div>

                <div className="bg-[#0A0F1C] border border-white/10 rounded-xl p-6 h-48 flex flex-col items-center justify-center relative overflow-hidden">
                   <Terminal className="text-white/5 absolute" size={120} />
                   <p className="text-sm font-black text-gray-600 uppercase tracking-[0.2em] relative z-10 flex items-center gap-3 mb-2">
                     <Lock size={16}/> Real-Time Allocation Grid
                   </p>
                   <p className="text-[10px] text-gray-500 relative z-10">• Live utilization % tracking • Missed session alerts</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-6 font-medium">
            Real-time visibility into machine utilization, isolation zoning, and shift efficiency—core drivers of dialysis center profitability.
          </p>
        </section>

        {/* --- DEPLOYMENT PROOF & MOAT --- */}
        <section className="mb-24">
          <div className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A8A8]/5 blur-[120px] pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#25D366] mb-6">
                  <ShieldCheck size={14}/> Validated Execution
                </div>
                <h2 className="text-3xl font-black text-white mb-6 tracking-tighter">Deployed & Battle-Tested.</h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 font-medium">
                  Investors don't fund ideas; they fund validated systems. This OS is engineered against real-world clinical constraints, staff shortages, and rigorous government audit requirements.
                </p>
                <div className="space-y-4 text-sm font-bold text-gray-300 mb-8">
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-[#00A8A8]" size={18}/> 15+ Machine Capacity Modeling Validated.</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-[#00A8A8]" size={18}/> 3-Shift Technician Optimization Stress-Tested.</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-[#00A8A8]" size={18}/> PM-JAY Billing Integration & Compliance Mapped.</div>
                </div>
              </div>

              <div className="bg-[#0A0F1C] p-8 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center">
                 <LineChart size={48} className="text-[#C6A85A] mb-6" />
                 <h4 className="text-lg font-black text-white mb-2">Time to Value</h4>
                 <p className="text-xs text-gray-500 font-medium mb-6">
                   Typical deployment time is 2–4 weeks post infrastructure readiness. Currently bundled exclusively with Innovate India turnkey deployments.
                 </p>
              </div>
            </div>
          </div>
          
          {/* THE MOAT SIGNAL */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-black">
              Proprietary Advantage
            </p>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              This system is engineered from ground-level dialysis infrastructure execution, integrating clinical constraints, technician workflows, and billing compliance into a unified operational model—not retrofitted software.
            </p>
          </div>
        </section>

        {/* --- BOTTOM CONVERSION (Dual CTA & Silent Lead Capture) --- */}
        <div className="text-center p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#0A0F1C] to-[#0D1525] border border-[#C6A85A]/20">
          <h2 className="text-3xl font-black text-white mb-6">Digitize Your Clinical Operations.</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm font-medium">
            Deploy this OS directly into your facilities to ensure Day 1 operational supremacy. Request a demo or download the technical overview.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="https://wa.me/919879576332?text=I%20want%20to%20request%20a%20demo%20of%20the%20Clinical%20OS." target="_blank" rel="noreferrer" className="w-full md:w-auto">
              <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)] flex items-center justify-center gap-3">
                Request Live Demo <ArrowRight size={16}/>
              </button>
            </a>
            
            {/* Soft Lead Capture Form (Silent State + High-Intent Filter) */}
            {isSubmitted ? (
              <div className="w-full md:w-auto bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 justify-center transition-all">
                <CheckCircle2 size={16}/> Check Your Inbox. Team will follow up.
              </div>
            ) : (
              <form onSubmit={handleDownload} className="w-full md:w-auto flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden p-1 focus-within:border-[#C6A85A]/50 transition-colors">
                <input 
                  type="email" 
                  required
                  placeholder="Work email (Hospital / Healthcare Group)" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-sm text-white px-4 py-3 outline-none w-full md:w-[300px] placeholder:text-gray-600"
                />
                <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
                  <Download size={14}/> Deck
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function Metric({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="px-4 text-center flex flex-col justify-between h-full">
      <p className={`text-3xl md:text-4xl font-black mb-3 tracking-tighter ${color}`}>{value}</p>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-snug mt-auto">{label}</p>
    </div>
  );
}

function CompareRow({ label, oldVal, newVal }: { label: string, oldVal: string, newVal: string }) {
  return (
    <div className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
      <div className="p-6 flex items-center"><span className="text-sm font-bold text-white">{label}</span></div>
      <div className="p-6 border-l border-white/5 flex items-center"><span className="text-sm font-medium text-gray-400">{oldVal}</span></div>
      <div className="p-6 border-l border-white/5 bg-[#C6A85A]/5 flex items-center"><span className="text-sm font-bold text-[#C6A85A]">{newVal}</span></div>
    </div>
  );
}

function ModuleCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-[#00A8A8]/30 transition-colors h-full flex flex-col group">
      <div className="w-12 h-12 bg-[#00A8A8]/10 rounded-xl flex items-center justify-center text-[#00A8A8] mb-6 group-hover:scale-110 transition-all">
        {icon}
      </div>
      <h4 className="text-lg font-black text-white mb-3">{title}</h4>
      <p className="text-xs text-gray-500 font-medium leading-relaxed flex-grow">{desc}</p>
    </div>
  );
}