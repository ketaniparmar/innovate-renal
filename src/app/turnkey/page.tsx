"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building2, 
  ArrowRight, 
  Clock, 
  Wallet, 
  ShieldAlert,
  Wrench,
  Activity,
  CheckCircle2,
  FileText
} from "lucide-react";
import { saveUserIntent } from "@/utils/intentTracker";

export default function TurnkeyInfrastructurePage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-hidden relative pt-32 pb-24">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A8A8]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* --- HERO: THE HOOK & INSIGHT --- */}
        <section className="mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/20 border border-red-900/30 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-6">
            <ShieldAlert size={14}/> The Multi-Vendor Risk
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            If execution is fragmented, <br className="hidden md:block"/>
            <span className="text-[#C6A85A]">your timeline will double.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-10 font-medium">
            Most delays in dialysis setups happen because of multi-vendor dependency. The RO plant technician blames the plumber, and the civil contractor blames the equipment supplier. We execute everything under <span className="text-white font-bold">one unified contract</span>.
          </p>

          <Link href="/calculator">
            <button 
              onClick={() => saveUserIntent("interest", "Cost Breakdown")}
              className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#C6A85A] hover:text-[#0A0F1C] transition-all flex items-center justify-center gap-3"
            >
              Get Cost Breakdown for My Project <ArrowRight size={16}/>
            </button>
          </Link>
        </section>

        {/* --- COST BREAKDOWN: FINANCIAL CLARITY --- */}
        <section className="mb-32">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Wallet className="text-[#00A8A8]"/> Where Your Capital Goes
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <CostCard 
              percent="40-50%" 
              title="Machines & Dialyzers" 
              desc="DiaCare AI-Series hemodialysis machines and automated reprocessing systems."
              color="#00A8A8"
            />
            <CostCard 
              percent="20-25%" 
              title="Civil & Interiors" 
              desc="NABH-ready flooring, clinical zoning, HVAC, and customized patient bays."
              color="#C6A85A"
            />
            <CostCard 
              percent="15-20%" 
              title="Medical RO Plant" 
              desc="AAMI-standard multi-stage water purification (the lifeblood of safety)."
              color="#4F46E5"
            />
            <CostCard 
              percent="10%" 
              title="Clinical Assets" 
              desc="Motorized ICU beds, central nursing stations, and crash carts."
              color="#8A94A6"
            />
          </div>
        </section>

        {/* --- THE SYSTEM: UNIFIED EXECUTION --- */}
        <section className="mb-32 bg-[#0D1525] border border-white/5 rounded-[3rem] p-10 md:p-16">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter mb-6">
                The Sovereign Execution System
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                You fund the asset. We build it. By consolidating civil architecture, electrical loads, RO deployment, and DiaCare equipment installation into one pipeline, we remove the contractor friction that burns pre-launch capital.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm font-bold text-gray-300">
                  <CheckCircle2 size={18} className="text-[#00A8A8]"/> Zero vendor overlap
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-gray-300">
                  <CheckCircle2 size={18} className="text-[#00A8A8]"/> Guaranteed NABH compliance
                </li>
                <li className="flex items-center gap-3 text-sm font-bold text-gray-300">
                  <CheckCircle2 size={18} className="text-[#00A8A8]"/> Direct DiaCare factory procurement
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <Building2 size={24} className="text-[#C6A85A] mb-4"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 1</p>
                <p className="text-xs text-gray-500 font-medium">Civil & Electrical Zoning</p>
              </div>
              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <Activity size={24} className="text-[#C6A85A] mb-4"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 2</p>
                <p className="text-xs text-gray-500 font-medium">AAMI Water Systems</p>
              </div>
              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <Wrench size={24} className="text-[#C6A85A] mb-4"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 3</p>
                <p className="text-xs text-gray-500 font-medium">Machine Installation</p>
              </div>
              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <FileText size={24} className="text-[#C6A85A] mb-4"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 4</p>
                <p className="text-xs text-gray-500 font-medium">NABH Documentation</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TIMELINE: 16 WEEKS TO REVENUE --- */}
        <section className="mb-24">
          <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-3 justify-center md:justify-start">
            <Clock className="text-[#C6A85A]"/> 16-Week Structured Deployment
          </h2>
          
          <div className="space-y-4">
            <TimelineRow week="Week 1–2" title="DPR + Planning" desc="Financial underwriting, layout locking, and facility audits." />
            <TimelineRow week="Week 3–6" title="Civil Work" desc="Floor reinforcement, plumbing loops, and medical gas pipeline setup." />
            <TimelineRow week="Week 7–10" title="Procurement" desc="DiaCare machinery and RO plant dispatch." highlight />
            <TimelineRow week="Week 11–14" title="Installation" desc="Hardware mounting, water quality testing, and software calibration." />
            <TimelineRow week="Week 15–16" title="Go-Live" desc="Staff training, trial runs, and revenue generation begins." />
          </div>
        </section>

        {/* --- BOTTOM CONVERSION --- */}
        <div className="text-center p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-[#00A8A8]/20">
          <h2 className="text-3xl font-black text-white mb-6">Let's look at your floor plan.</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm font-medium">
            Send us your hospital layout. Our engineering team will calculate your maximum machine capacity and estimate the civil setup cost within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/919879576332" target="_blank" rel="noreferrer">
              <button 
                onClick={() => saveUserIntent("action", "Requested Layout Review")}
                className="bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all"
              >
                Send Layout on WhatsApp
              </button>
            </a>
            <Link href="/calculator">
              <button className="bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)]">
                Calculate Full Setup Cost
              </button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function CostCard({ percent, title, desc, color }: any) {
  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-colors">
      <h3 className="text-4xl font-black mb-2" style={{ color }}>{percent}</h3>
      <p className="text-xs font-black uppercase tracking-widest text-white mb-3">{title}</p>
      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineRow({ week, title, desc, highlight }: any) {
  return (
    <div className={`p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row md:items-center gap-4 md:gap-8 ${highlight ? 'bg-[#00A8A8]/5 border-[#00A8A8]/30' : 'bg-[#0D1525] border-white/5'}`}>
      <div className="md:w-32 shrink-0">
        <p className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-[#00A8A8]' : 'text-[#C6A85A]'}`}>{week}</p>
      </div>
      <div className="md:w-48 shrink-0">
        <h4 className="text-lg font-bold text-white">{title}</h4>
      </div>
      <div>
        <p className="text-sm text-gray-400 font-medium">{desc}</p>
      </div>
    </div>
  );
}