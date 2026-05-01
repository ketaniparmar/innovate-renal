"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Server,
  AlertTriangle,
  Lock,
  IndianRupee,
  Users,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export default function ClinicalOSDemoStory() {
  const [step, setStep] = useState(1);

  return (
    // STRICT OVERFLOW CONTROL: Prevents horizontal scrolling on mobile
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6 overflow-x-hidden w-full relative font-sans">
      
      {/* 🌌 Background Ambience (Locked inside overflow container) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[#00A8A8]/10 blur-[150px] top-[10%] left-[-10%]" />
        <div className="absolute w-[600px] h-[600px] bg-red-900/10 blur-[150px] bottom-[10%] right-[-10%]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* --- HERO: SCENARIO SETTING --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-6 shadow-[0_0_15px_rgba(0,168,168,0.15)]"
          >
            Live Scenario Simulation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6"
          >
            The 06:00 AM <br className="hidden md:block" /> Morning Shift.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Watch the Sovereign OS orchestrate a high-volume clinical environment, block a critical infection error, and automatically capture revenue.
          </motion.p>
        </div>

        {/* --- SCENARIO PARAMETERS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          <ParamCard label="Active Machines" value="20" icon={<Server size={16}/>} />
          <ParamCard label="Morning Patients" value="45" icon={<Users size={16}/>} />
          <ParamCard label="Isolation (HCV+)" value="5" icon={<ShieldAlert size={16}/>} alert />
          <ParamCard label="Target Yield" value="₹81,000" icon={<IndianRupee size={16}/>} gold />
        </motion.div>

        {/* --- INTERACTIVE STORYTELLING ENGINE --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col justify-between"
        >
          
          {/* Top Event Navigator */}
          <div className="flex flex-wrap gap-3 mb-12">
            {[1, 2, 3].map((num) => (
              <button 
                key={num}
                onClick={() => setStep(num)}
                className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  step === num 
                    ? num === 1 ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                    : num === 2 ? 'bg-[#00A8A8] text-white shadow-[0_0_15px_rgba(0,168,168,0.4)]'
                    : 'bg-[#C6A85A] text-[#0A0F1C] shadow-[0_0_15px_rgba(198,168,90,0.4)]'
                    : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'
                }`}
              >
                Event 0{num}
              </button>
            ))}
          </div>

          <div className="flex-grow flex items-center">
            <AnimatePresence mode="wait">
              
              {/* EVENT 1: THE MANUAL ERROR */}
              {step === 1 && (
                <motion.div 
                  key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-black uppercase tracking-widest text-red-500 mb-6">
                      <AlertTriangle size={12} /> 06:12 AM • Allocation Conflict
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">A technician attempts to assign an HCV+ patient to a General Bed.</h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                      In a manual paper-based system, this oversight leads directly to cross-infection, legal liability, and center shutdown. The technician is rushed, the floor is crowded, and the error goes unnoticed.
                    </p>
                  </div>
                  <div className="bg-red-950/20 border border-red-900/40 rounded-[2rem] p-8 relative shadow-[0_0_40px_rgba(239,68,68,0.05)]">
                    <div className="absolute top-6 right-6"><AlertTriangle className="text-red-500 animate-pulse" size={28}/></div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Manual Entry Log</p>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center pb-3 border-b border-red-900/30">
                        <span className="text-sm font-bold text-white">Patient: Vikram S.</span>
                        <span className="text-xs font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded">HCV POSITIVE</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-red-900/30">
                        <span className="text-sm font-bold text-white">Assigned Bed</span>
                        <span className="text-xs font-black text-gray-300">General M-04</span>
                      </div>
                      <div className="mt-6 p-4 bg-red-500/10 rounded-xl border border-red-500/30 text-center">
                        <p className="text-[11px] font-black text-red-400 uppercase tracking-[0.1em]">High Risk: Cross-Infection Imminent</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* EVENT 2: THE SOVEREIGN BLOCK */}
              {step === 2 && (
                <motion.div 
                  key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-widest text-[#00A8A8] mb-6">
                      <ShieldAlert size={12} /> 06:12 AM • Sovereign OS Intervention
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">The Constraint Engine mathematically blocks the assignment.</h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                      The OS cross-references the patient's UHID serology data against the machine's zoning designation. It physically locks the software, preventing the session from starting until the patient is moved to Isolation Machine M-19.
                    </p>
                  </div>
                  <div className="bg-[#00A8A8]/10 border border-[#00A8A8]/30 rounded-[2rem] p-8 relative shadow-[0_0_50px_rgba(0,168,168,0.1)]">
                    <div className="absolute top-6 right-6"><Lock className="text-[#00A8A8]" size={28}/></div>
                    <p className="text-[10px] font-black text-[#00A8A8] uppercase tracking-widest mb-6">System Enforcement Log</p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-black/40 rounded-xl">
                        <CheckCircle2 size={18} className="text-[#00A8A8] shrink-0"/>
                        <p className="text-sm font-bold text-white">Serology Check: <span className="text-red-400 ml-1 font-black">HCV+</span></p>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-red-950/40 rounded-xl border border-red-900/50">
                        <Lock size={18} className="text-red-500 shrink-0"/>
                        <p className="text-sm font-bold text-red-200">Bed M-04 Status: <span className="text-white ml-1 font-black">GENERAL (BLOCKED)</span></p>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-[#00A8A8]/20 rounded-xl border border-[#00A8A8]/30 shadow-[0_0_15px_rgba(0,168,168,0.2)]">
                        <ArrowRight size={18} className="text-[#00A8A8] shrink-0"/>
                        <p className="text-sm font-bold text-[#00A8A8]">Rerouting to: <span className="text-white ml-1 font-black">ISOLATION M-19</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* EVENT 3: AUTOMATED BILLING */}
              {step === 3 && (
                <motion.div 
                  key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
                >
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-widest text-[#C6A85A] mb-6">
                      <Activity size={12} /> 10:15 AM • Automated Revenue Capture
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">The session ends. The yield is secured instantly.</h3>
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-medium">
                      Because the system forced the technician to input post-dialysis vitals (BP, UF removal) before closing the session, there are no missing data points. The PM-JAY claim is generated with 100% compliance. Zero revenue leakage.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-[#1A160C] to-[#0A0A0A] border border-[#C6A85A]/30 rounded-[2rem] p-8 relative shadow-[0_0_50px_rgba(198,168,90,0.15)]">
                    <div className="absolute top-6 right-6"><IndianRupee className="text-[#C6A85A]" size={28}/></div>
                    <p className="text-[10px] font-black text-[#C6A85A] uppercase tracking-widest mb-6">Yield Capture Log</p>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Required Vitals</span>
                        <span className="text-xs font-black text-[#00A8A8] flex items-center gap-1"><CheckCircle2 size={14}/> 100% COMPLETED</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">PM-JAY Audit</span>
                        <span className="text-xs font-black text-[#00A8A8] flex items-center gap-1"><CheckCircle2 size={14}/> READY FOR CLAIM</span>
                      </div>
                      <div className="pt-6 border-t border-[#C6A85A]/20">
                        <p className="text-[10px] uppercase font-black text-gray-500 mb-2">Session Revenue Captured</p>
                        <p className="text-4xl md:text-5xl font-black text-white tracking-tighter">₹1,800.00</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white disabled:opacity-20 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={16}/> Previous Event
            </button>
            <button 
              onClick={() => setStep(Math.min(3, step + 1))}
              disabled={step === 3}
              className={`text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${step === 3 ? 'text-gray-600 disabled:opacity-20' : 'text-white hover:text-[#C6A85A]'}`}
            >
              Next Event <ChevronRight size={16}/>
            </button>
          </div>
        </motion.div>

        {/* --- CLOSING CTA --- */}
        <div className="mt-20 text-center">
          <Link href="/clinical-os/technician-portal">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(198,168,90,0.25)] hover:bg-[#D4B970] transition-all inline-flex items-center gap-3"
            >
              Open the Technician Floor UI <ArrowRight size={16}/>
            </motion.button>
          </Link>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function ParamCard({ label, value, icon, alert, gold }: { label: string, value: string, icon: React.ReactNode, alert?: boolean, gold?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-5 md:p-6 rounded-[2rem] border transition-colors ${
        alert ? 'bg-red-950/10 border-red-900/30' : 
        gold ? 'bg-[#C6A85A]/5 border-[#C6A85A]/20' : 
        'bg-white/[0.02] border-white/10 hover:border-white/20'
      }`}
    >
      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4 ${
        alert ? 'text-red-500' : 
        gold ? 'text-[#C6A85A]' : 
        'text-gray-500'
      }`}>
        {icon} {label}
      </div>
      <p className={`text-3xl md:text-4xl tracking-tighter font-black ${
        alert ? 'text-red-400' : 
        gold ? 'text-[#C6A85A]' : 
        'text-white'
      }`}>{value}</p>
    </motion.div>
  );
}