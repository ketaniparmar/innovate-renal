"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, Activity, TrendingUp, ShieldAlert, 
  CheckCircle2, Layers, AlertTriangle, ArrowRight, Server
} from "lucide-react";

// --- THE DATA DICTIONARY ---
const JOURNEYS = {
  nephrologist: {
    theme: "from-[#0A192F] to-[#020C1B]", // Deep Clinical Navy
    accent: "text-[#00A8A8]",
    hero: {
      headline: "Clinical Control Without Operational Chaos",
      subtext: "Every dialysis session protocol-enforced. Every patient flow audited. No cross-infection. No guesswork.",
      primaryCTA: "View Clinical Workflow",
      secondaryCTA: "Simulate Today's Shift"
    },
    problem: {
      title: "Where Clinical Risk Actually Happens",
      points: [
        "Manual scheduling → infection exposure risk",
        "Missing vitals → incomplete treatment validation",
        "Overloaded technicians → compromised care",
        "No audit trail → medico-legal vulnerability"
      ]
    },
    solution: {
      title: "A Deterministic Clinical Execution System",
      points: [
        "Infection zoning enforced at system level",
        "Session cannot complete without clinical data",
        "Machine usage tied to protocol compliance",
        "Every action logged, traceable, defensible"
      ]
    },
    realityCheck: {
      title: "“This is not a dashboard.”",
      desc: "This is the layer where protocol is enforced, errors are blocked, and clinical responsibility is protected."
    }
  },
  technician: {
    theme: "from-[#111827] to-[#000000]", // Floor Ops Black/Slate
    accent: "text-white",
    hero: {
      headline: "No Confusion. No Overload. Just Clear Shifts.",
      subtext: "Know your patients. Know your machines. Know exactly what to do next.",
      primaryCTA: "View Live Shift Layout",
      secondaryCTA: "Download Sample Flowsheet"
    },
    problem: {
      title: "What Makes Your Shift Difficult",
      points: [
        "Too many patients at once",
        "Machine delays",
        "Paperwork overload",
        "Last-minute changes"
      ]
    },
    solution: {
      title: "Your Shift, Structured",
      points: [
        "Every patient pre-assigned",
        "Machine status always visible",
        "Infection clearly marked",
        "No double-booking possible"
      ]
    },
    realityCheck: {
      title: "Machine States at a Glance",
      desc: "🟢 Ready | 🔵 Running | 🟡 Cleaning | 🔴 Down. You always know which machine is usable and which is blocked."
    }
  },
  investor: {
    theme: "from-[#1A160C] to-[#0A0A0A]", // Wealth/EBITDA Gold & Black
    accent: "text-[#C6A85A]",
    hero: {
      headline: "Turn Dialysis Units Into Predictable Revenue Systems",
      subtext: "Maximize machine utilization. Eliminate idle time. Capture every billable session.",
      primaryCTA: "Simulate Revenue",
      secondaryCTA: "View ROI Model"
    },
    problem: {
      title: "Where Money Is Lost",
      points: [
        "Idle machines between shifts",
        "Missed or delayed sessions",
        "Claim rejection due to incomplete data",
        "Technician inefficiency"
      ]
    },
    solution: {
      title: "Capacity → Execution → Billing",
      points: [
        "Machines allocated with zero conflict",
        "Sessions executed with protocol enforcement",
        "Billing triggered automatically on completion",
        "Utilization: 55% → 90%+"
      ]
    },
    realityCheck: {
      title: "The Hard Truth",
      desc: "Every idle machine is lost revenue. 1 machine idle per shift = ₹1.5–2.5 lakh/month loss. We fix this."
    }
  }
};

type PersonaKey = keyof typeof JOURNEYS;

export default function PersonaJourneys() {
  const [activePersona, setActivePersona] = useState<PersonaKey>("investor");

  const data = JOURNEYS[activePersona];

  return (
    <section className={`min-h-screen transition-colors duration-1000 bg-gradient-to-br ${data.theme} py-24 px-6 relative overflow-hidden font-sans`}>
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none mix-blend-overlay" />
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* --- PERSONA TOGGLE (Apple Style Segmented Control) --- */}
        <div className="flex justify-center mb-20">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setActivePersona("nephrologist")}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activePersona === "nephrologist" ? 'bg-white/10 text-[#00A8A8] shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Stethoscope size={16} className="inline mr-2 mb-0.5"/> Clinical Director
            </button>
            <button 
              onClick={() => setActivePersona("technician")}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activePersona === "technician" ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Activity size={16} className="inline mr-2 mb-0.5"/> Floor Technician
            </button>
            <button 
              onClick={() => setActivePersona("investor")}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activePersona === "investor" ? 'bg-[#C6A85A]/20 text-[#C6A85A] border border-[#C6A85A]/30 shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <TrendingUp size={16} className="inline mr-2 mb-0.5"/> Owner / Investor
            </button>
          </div>
        </div>

        {/* --- DYNAMIC CONTENT RENDER --- */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePersona}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-12"
          >
            
            {/* HERO GLASS CARD */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                {data.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                {data.hero.subtext}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className={`px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-2 ${activePersona === 'investor' ? 'bg-[#C6A85A] text-black hover:bg-[#D4B970]' : 'bg-white text-black hover:bg-gray-200'}`}>
                  {data.hero.primaryCTA} <ArrowRight size={16}/>
                </button>
                <button className="px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all shadow-xl">
                  {data.hero.secondaryCTA}
                </button>
              </div>
            </div>

            {/* THREE COLUMN GLASS CARDS */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Problem Card */}
              <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col group hover:bg-white/10 transition-all duration-500">
                <ShieldAlert className="text-red-400 mb-6" size={32}/>
                <h3 className="text-xl font-black text-white mb-6 tracking-tight">{data.problem.title}</h3>
                <ul className="space-y-4 flex-grow">
                  {data.problem.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 font-medium">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution Card */}
              <div className="p-8 md:p-10 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col group hover:bg-white/10 transition-all duration-500">
                <Layers className={data.accent + " mb-6"} size={32}/>
                <h3 className="text-xl font-black text-white mb-6 tracking-tight">{data.solution.title}</h3>
                <ul className="space-y-4 flex-grow">
                  {data.solution.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                      <CheckCircle2 className={data.accent + " shrink-0"} size={16} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reality Check Card */}
              <div className={`p-8 md:p-10 rounded-[2rem] backdrop-blur-xl border shadow-2xl flex flex-col justify-center ${activePersona === 'investor' ? 'bg-[#C6A85A]/5 border-[#C6A85A]/20' : 'bg-white/5 border-white/10'}`}>
                <AlertTriangle className={data.accent + " mb-6 opacity-80"} size={40}/>
                <h3 className={`text-2xl font-black mb-4 tracking-tight ${activePersona === 'investor' ? 'text-[#C6A85A]' : 'text-white'}`}>
                  {data.realityCheck.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-gray-400">
                  {data.realityCheck.desc}
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}