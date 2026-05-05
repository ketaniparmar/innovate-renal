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
    // STRICT OVERFLOW CONTROL
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-x-hidden w-full relative pt-32 pb-24 font-sans">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0 overflow-hidden">
        <div className="absolute top-[5%] right-[-5%] w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* --- HERO: THE HOOK & INSIGHT --- */}
        <section className="mb-24 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/20 border border-red-900/40 text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-8 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
          >
            <ShieldAlert size={14}/> The Problem with Multiple Contractors
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8"
          >
            Dealing with multiple vendors <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">doubles your setup time.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-12 font-medium"
          >
            Most delays in dialysis setups happen because contractors blame each other. The RO plant technician blames the plumber, and the civil team blames the machine supplier. <span className="text-white font-bold">We build your entire center under one roof, so you open on time.</span>
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Link href="/calculator">
              <button 
                onClick={() => saveUserIntent("interest", "Cost Breakdown")}
                className="bg-[#C6A85A] text-[#0A0F1C] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(198,168,90,0.2)] hover:scale-105"
              >
                Get Cost Breakdown for My Project <ArrowRight size={16}/>
              </button>
            </Link>
          </motion.div>
        </section>

        {/* --- COST BREAKDOWN: FINANCIAL CLARITY --- */}
        <section className="mb-32">
          <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
            <Wallet className="text-[#C6A85A]" size={28}/> Your Setup Costs Explained
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CostCard 
              percent="40-50%" 
              title="Machines & Dialyzers" 
              desc="Brand new DiaCare dialysis machines and automated medical supplies."
              color="#C6A85A"
            />
            <CostCard 
              percent="20-25%" 
              title="Hospital Setup & Interiors" 
              desc="Medical-grade flooring, plumbing, and patient-friendly lighting."
              color="#F1E5AC"
            />
            <CostCard 
              percent="15-20%" 
              title="Water Purification" 
              desc="AAMI-standard RO plants. If your water isn't perfect, patients are at risk."
              color="#A89460"
            />
            <CostCard 
              percent="10%" 
              title="Beds & Furniture" 
              desc="Motorized ICU beds, nursing stations, and emergency crash carts."
              color="#8A94A6"
            />
          </div>
        </section>

        {/* --- THE SYSTEM: UNIFIED EXECUTION --- */}
        <section className="mb-32 bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#C6A85A]/20 rounded-[3rem] p-10 md:p-16 backdrop-blur-2xl shadow-[0_20px_60px_rgba(198,168,90,0.05)]">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-8">
                Our Complete Setup Process
              </h2>
              <p className="text-base text-gray-400 leading-relaxed mb-10 font-medium">
                You fund the hospital. We build it. By handling the flooring, plumbing, water systems, and machine installation together, we remove the delays that cost you money before you even open.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-sm font-black text-gray-300 uppercase tracking-widest">
                  <CheckCircle2 size={20} className="text-[#C6A85A]"/> One single contract
                </li>
                <li className="flex items-center gap-4 text-sm font-black text-gray-300 uppercase tracking-widest">
                  <CheckCircle2 size={20} className="text-[#C6A85A]"/> Built to strict NABH standards
                </li>
                <li className="flex items-center gap-4 text-sm font-black text-gray-300 uppercase tracking-widest">
                  <CheckCircle2 size={20} className="text-[#C6A85A]"/> Fixed pricing, no surprises
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-[#0A0F1C]/80 p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-lg">
                <Building2 size={28} className="text-[#C6A85A] mb-5"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 1</p>
                <p className="text-sm text-gray-500 font-bold">Hospital Layout & Wiring</p>
              </div>
              <div className="bg-[#0A0F1C]/80 p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-lg">
                <Activity size={28} className="text-[#C6A85A] mb-5"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 2</p>
                <p className="text-sm text-gray-500 font-bold">Medical Water Systems</p>
              </div>
              <div className="bg-[#0A0F1C]/80 p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-lg">
                <Wrench size={28} className="text-[#C6A85A] mb-5"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 3</p>
                <p className="text-sm text-gray-500 font-bold">Machine Installation</p>
              </div>
              <div className="bg-[#0A0F1C]/80 p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-lg">
                <FileText size={28} className="text-[#C6A85A] mb-5"/>
                <p className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Phase 4</p>
                <p className="text-sm text-gray-500 font-bold">NABH & Licenses</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TIMELINE: 16 WEEKS TO REVENUE --- */}
        <section className="mb-32">
          <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-4 justify-center md:justify-start tracking-tighter">
            <Clock className="text-[#C6A85A]" size={28}/> 16-Week Setup Timeline
          </h2>
          
          <div className="space-y-5">
            <TimelineRow week="Week 1–2" title="Planning & Approvals" desc="Financial planning, hospital layout, and facility checks." />
            <TimelineRow week="Week 3–6" title="Construction" desc="Specialized flooring, plumbing, and medical gas setup." />
            <TimelineRow week="Week 7–10" title="Ordering Equipment" desc="Dialysis machines and RO plant delivery to your center." highlight />
            <TimelineRow week="Week 11–14" title="Installation" desc="Setting up machines, testing water purity, and software setup." />
            <TimelineRow week="Week 15–16" title="Opening Day" desc="Staff training, final checks, and treating your first patient." />
          </div>
        </section>

        {/* --- BOTTOM CONVERSION --- */}
        <div className="text-center p-12 md:p-20 rounded-[4rem] bg-[#0D1525] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter relative z-10">Stop guessing your setup costs.</h2>
          <p className="text-base font-medium text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
            Send us your hospital layout. Our engineering team will calculate your maximum machine capacity and estimate the setup cost within 48 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">
            <a href="https://wa.me/919879576332" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("action", "Requested Layout Review")}
                className="w-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-[#25D366] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center"
              >
                Send Layout on WhatsApp
              </button>
            </a>
            <Link href="/calculator" className="w-full sm:w-auto">
              <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_15px_30px_rgba(198,168,90,0.2)] hover:scale-105 flex items-center justify-center gap-2">
                Calculate Full Setup Cost <ArrowRight size={16} />
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
    <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-[#C6A85A]/30 transition-all duration-300 shadow-lg group">
      <h3 className="text-4xl font-black mb-4 tracking-tighter group-hover:scale-105 transition-transform origin-left" style={{ color }}>{percent}</h3>
      <p className="text-[11px] font-black uppercase tracking-widest text-white mb-3">{title}</p>
      <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function TimelineRow({ week, title, desc, highlight }: any) {
  return (
    <div className={`p-6 md:p-8 rounded-[2rem] border flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-300 ${highlight ? 'bg-[#C6A85A]/10 border-[#C6A85A]/30 shadow-[0_10px_30px_rgba(198,168,90,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}>
      <div className="md:w-40 shrink-0">
        <p className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-[#C6A85A]' : 'text-gray-500'}`}>{week}</p>
      </div>
      <div className="md:w-56 shrink-0">
        <h4 className="text-xl font-black text-white tracking-tight">{title}</h4>
      </div>
      <div>
        <p className={`text-sm font-medium ${highlight ? 'text-gray-300' : 'text-gray-400'}`}>{desc}</p>
      </div>
    </div>
  );
}