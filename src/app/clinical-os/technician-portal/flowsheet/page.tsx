"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  AlertTriangle,
  Droplets,
  Timer,
  FileCheck
} from "lucide-react";

type SessionPhase = "PRE_DIALYSIS" | "INTRA_DIALYSIS" | "POST_DIALYSIS" | "COMPLETED";

export default function TechnicianFlowsheet() {
  const [phase, setPhase] = useState<SessionPhase>("PRE_DIALYSIS");
  
  // SOP 3: Pre-Dialysis Hard Stop State
  const [preVitals, setPreVitals] = useState({ bpSys: "", bpDia: "", weight: "", consent: false });
  const isPreValid = preVitals.bpSys !== "" && preVitals.bpDia !== "" && preVitals.weight !== "" && preVitals.consent;

  // SOP 6: Post-Dialysis Hard Stop State
  const [postVitals, setPostVitals] = useState({ bpSys: "", bpDia: "", weight: "", ufRemoved: "" });
  const isPostValid = postVitals.bpSys !== "" && postVitals.bpDia !== "" && postVitals.weight !== "" && postVitals.ufRemoved !== "";

  const handleStartSession = () => {
    if (isPreValid) setPhase("INTRA_DIALYSIS");
  };

  const handleEndSession = () => {
    setPhase("POST_DIALYSIS");
  };

  const handleCompleteBilling = () => {
    if (isPostValid) setPhase("COMPLETED");
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-x-hidden font-sans pb-24">
      
      {/* HEADER: Patient Identity & Zoning (SOP 1 & 7) */}
      <header className="bg-[#0D1525] border-b border-white/5 sticky top-0 z-40 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/clinical-os/technician-portal" className="text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">Patient 04 (M-02)</h1>
              <div className="flex items-center gap-3 mt-1 text-[10px] font-black uppercase tracking-widest">
                <span className="text-[#00A8A8]">PM-JAY: VALID</span>
                <span className="text-gray-500">|</span>
                <span className="text-white">Dialyzer: 3rd Use</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#00A8A8]/10 border border-[#00A8A8]/30 text-[#00A8A8] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck size={14}/> Stable (General)
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* PHASE PROGRESS BAR */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 z-0 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-[#C6A85A] -translate-y-1/2 z-0 rounded-full transition-all duration-500" 
            style={{ width: phase === 'PRE_DIALYSIS' ? '0%' : phase === 'INTRA_DIALYSIS' ? '50%' : phase === 'POST_DIALYSIS' ? '100%' : '100%' }}
          />
          
          <StepIndicator active={phase === "PRE_DIALYSIS"} completed={phase !== "PRE_DIALYSIS"} label="Pre" />
          <StepIndicator active={phase === "INTRA_DIALYSIS"} completed={phase === "POST_DIALYSIS" || phase === "COMPLETED"} label="Intra" />
          <StepIndicator active={phase === "POST_DIALYSIS"} completed={phase === "COMPLETED"} label="Post" />
        </div>

        <AnimatePresence mode="wait">
          
          {/* ========================================= */}
          {/* SOP 3: PRE-DIALYSIS (The Hard Stop) */}
          {/* ========================================= */}
          {phase === "PRE_DIALYSIS" && (
            <motion.div key="pre" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-[#0D1525]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#C6A85A]/10 text-[#C6A85A] flex items-center justify-center border border-[#C6A85A]/20">
                    <Lock size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">Pre-Dialysis Clearance</h2>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mandatory before machine unlocks</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Weight (kg)</label>
                      <input 
                        type="number" placeholder="00.0" 
                        value={preVitals.weight} onChange={e => setPreVitals({...preVitals, weight: e.target.value})}
                        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A]"
                      />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">BP (Sys / Dia)</label>
                       <div className="flex items-center gap-2">
                         <input 
                          type="number" placeholder="120" 
                          value={preVitals.bpSys} onChange={e => setPreVitals({...preVitals, bpSys: e.target.value})}
                          className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A] text-center"
                        />
                         <span className="text-gray-600 font-black">/</span>
                         <input 
                          type="number" placeholder="80" 
                          value={preVitals.bpDia} onChange={e => setPreVitals({...preVitals, bpDia: e.target.value})}
                          className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A] text-center"
                        />
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5 cursor-pointer" onClick={() => setPreVitals({...preVitals, consent: !preVitals.consent})}>
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${preVitals.consent ? 'bg-[#00A8A8] border-[#00A8A8]' : 'bg-[#0A0F1C] border-white/20'}`}>
                      {preVitals.consent && <CheckCircle2 size={14} className="text-white"/>}
                    </div>
                    <span className="text-xs font-bold text-gray-300">Patient consent & vascular access checked.</span>
                  </div>

                  {!isPreValid ? (
                    <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl flex items-center gap-3">
                      <AlertTriangle className="text-red-500 shrink-0" size={16}/>
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Cannot start. Missing mandatory vitals.</p>
                    </div>
                  ) : (
                    <button 
                      onClick={handleStartSession}
                      className="w-full bg-[#C6A85A] text-[#0A0F1C] py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] transition-all"
                    >
                      Start Dialysis Session
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* SOP 5: INTRA-DIALYSIS (Active Monitoring) */}
          {/* ========================================= */}
          {phase === "INTRA_DIALYSIS" && (
            <motion.div key="intra" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-gradient-to-br from-[#061818] to-[#0D1525] border border-[#00A8A8]/30 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,168,168,0.1)]">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#00A8A8]/10 border border-[#00A8A8]/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Activity className="text-[#00A8A8] animate-pulse" size={32}/>
                  </div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Session Active</h2>
                  <p className="text-xs text-[#00A8A8] font-black uppercase tracking-widest mt-1">Machine M-02 Running</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl text-center">
                    <Timer className="text-gray-500 mx-auto mb-2" size={20}/>
                    <p className="text-3xl font-black text-white">02:15</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">Elapsed (HH:MM)</p>
                  </div>
                  <div className="bg-[#0A0F1C] border border-white/5 p-4 rounded-xl text-center">
                    <Droplets className="text-[#00A8A8] mx-auto mb-2" size={20}/>
                    <p className="text-3xl font-black text-white">1.2</p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">UF Removed (L)</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                    <Activity size={16}/> Log Mid-Session Vitals
                  </button>
                  <button 
                    onClick={handleEndSession}
                    className="w-full bg-[#00A8A8] text-white py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(0,168,168,0.2)] hover:bg-teal-500 transition-all"
                  >
                    End Dialysis Session
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* SOP 6 & 9: POST-DIALYSIS & CLAIM GENERATION */}
          {/* ========================================= */}
          {phase === "POST_DIALYSIS" && (
            <motion.div key="post" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-[#0D1525]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#C6A85A]/10 text-[#C6A85A] flex items-center justify-center border border-[#C6A85A]/20">
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">Post-Dialysis & Billing</h2>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Mandatory for PM-JAY Claim Approval</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Post Weight (kg)</label>
                      <input 
                        type="number" placeholder="00.0" 
                        value={postVitals.weight} onChange={e => setPostVitals({...postVitals, weight: e.target.value})}
                        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Total UF (L)</label>
                      <input 
                        type="number" placeholder="0.0" 
                        value={postVitals.ufRemoved} onChange={e => setPostVitals({...postVitals, ufRemoved: e.target.value})}
                        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A]"
                      />
                    </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Post BP (Sys / Dia)</label>
                     <div className="flex items-center gap-2">
                       <input 
                        type="number" placeholder="120" 
                        value={postVitals.bpSys} onChange={e => setPostVitals({...postVitals, bpSys: e.target.value})}
                        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A] text-center"
                      />
                       <span className="text-gray-600 font-black">/</span>
                       <input 
                        type="number" placeholder="80" 
                        value={postVitals.bpDia} onChange={e => setPostVitals({...postVitals, bpDia: e.target.value})}
                        className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-[#C6A85A] text-center"
                      />
                     </div>
                  </div>

                  {!isPostValid ? (
                    <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl flex items-center gap-3">
                      <AlertTriangle className="text-red-500 shrink-0" size={16}/>
                      <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Cannot close session. PM-JAY claim will be rejected.</p>
                    </div>
                  ) : (
                    <button 
                      onClick={handleCompleteBilling}
                      className="w-full bg-[#C6A85A] text-[#0A0F1C] py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] transition-all flex justify-center items-center gap-2"
                    >
                      <CheckCircle2 size={16}/> Save & Generate Claim
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================= */}
          {/* COMPLETED STATE */}
          {/* ========================================= */}
          {phase === "COMPLETED" && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="bg-[#00A8A8]/10 border border-[#00A8A8]/30 rounded-[2rem] p-10 text-center shadow-[0_20px_50px_rgba(0,168,168,0.1)]">
                <div className="w-20 h-20 bg-[#00A8A8] rounded-full mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,168,168,0.5)]">
                  <CheckCircle2 size={40} className="text-white"/>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Session Closed</h2>
                <p className="text-sm font-medium text-gray-400 mb-8">All protocols met. PM-JAY billing data securely logged.</p>
                
                <Link href="/clinical-os/technician-portal">
                  <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                    Return to Floor Dashboard
                  </button>
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </main>
  );
}

// Visual Stepper Component
function StepIndicator({ active, completed, label }: { active: boolean, completed: boolean, label: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
        completed ? 'bg-[#C6A85A] border-[#C6A85A] text-[#0A0F1C]' : 
        active ? 'bg-[#0A0F1C] border-[#C6A85A] text-[#C6A85A]' : 
        'bg-[#0A0F1C] border-white/20 text-gray-600'
      }`}>
        {completed ? <CheckCircle2 size={16}/> : <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#C6A85A]' : 'bg-transparent'}`} />}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${active || completed ? 'text-white' : 'text-gray-600'}`}>{label}</span>
    </div>
  );
}