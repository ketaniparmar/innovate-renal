"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, ShieldCheck, 
  Database, TrendingUp, Building2, 
  AlertTriangle, Cpu, MessageSquare,
  BarChart3, Settings, Clock
} from "lucide-react";
import Link from "next/link";

// Core UI Components
import { GlassCard } from "@/components/ui/GlassCard";
import { OsButton } from "@/components/ui/OsButton";
import DialysisCostCalculator from "@/components/ui/DialysisCostCalculator";

export default function SaasHomepage() {
  return (
    <main className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] overflow-hidden font-sans">
      
      {/* ================= 1. HERO: FINANCIAL OUTCOME POSITIONING ================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        {/* Ambient Depth Layers */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-8 backdrop-blur-md">
               <Cpu size={14} className="text-[#D4AF37]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">The Dialysis Infrastructure OS</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-10"
          >
            Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">₹30–50L/Month</span> <br />
            Dialysis Center.
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
          >
            Predict your success before you invest ₹1. Run ROI simulations, 
            generate audit-ready DPRs, and plan full infrastructure in minutes.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-lg"
          >

<OsButton label="Run Financial Model" variant="primary" href="/tools" /> 
            <OsButton label="View Success Stories" variant="glass" href="/success-stories" />
          </motion.div>
        </div>
      </section>

      {/* ================= 2. PROBLEM AGITATION (REVENUE LEAKAGE) ================= */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              The Cost of Poor <br/> Planning: <span className="text-red-500">₹2 Crores.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Traditional equipment vendors sell you machines and leave. They don’t account for the high-risk variables that kill profitability in the first 24 months.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
               <ProblemItem title="Overestimated ROI" desc="Incorrect session-to-staff ratios." />
               <ProblemItem title="AMC Downtime" desc="Revenue bleeds when machines stop." />
               <ProblemItem title="Poor Reuse Logic" desc="OPEX spikes due to manual errors." />
               <ProblemItem title="Compliance Risk" desc="Non-NABH layouts trigger rebuilds." />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <GlassCard accent="white" interactive={false} className="p-10 border-red-500/20 relative">
               <div className="absolute top-0 right-0 p-6 opacity-10 text-red-500"><AlertTriangle size={80}/></div>
               <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">Immediate Risk Warning</p>
               <h3 className="text-3xl font-black text-white mb-4 leading-tight">Most dialysis projects fail because they buy hardware, not a business model.</h3>
               <p className="text-gray-500 text-sm">We provide the validated financial blueprint that secures your investment capital.</p>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ================= 3. THE HOOK: LIVE ROI ENGINE ================= */}
      <section id="simulator" className="py-32 bg-gradient-to-b from-transparent to-[#D4AF37]/5">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
              Simulate Viability in Seconds.
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              Is your ₹1Cr investment viable? Run the simulator to find out.
            </p>
          </div>

          <DialysisCostCalculator />
          
          <div className="mt-12 text-center">
             <Link href="/tools" className="text-xs text-[#D4AF37] hover:text-white font-bold uppercase tracking-[0.3em] transition-all">
               Launch Full Enterprise DPR Engine <ArrowRight className="inline ml-2" size={14}/>
             </Link>
          </div>
        </div>
      </section>

      {/* ================= 4. SYSTEM ARCHITECTURE (PLATFORM VISUAL) ================= */}
      <section className="py-32 border-y border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6">Operating System Architecture</h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-20">
            One Unified OS Layer.
          </h3>

          <div className="grid md:grid-cols-5 gap-8 relative px-10">
            {/* Visual connector line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 hidden md:block -translate-y-1/2" />
            
            <ArchNode label="Machines" icon={<Activity />} status="Infrastructure" />
            <ArchNode label="AI Engine" icon={<Zap />} status="Intelligence" active />
            <ArchNode label="DPR" icon={<Database />} status="Capitalization" />
            <ArchNode label="AMC Support" icon={<ShieldCheck />} status="Reliability" />
            <ArchNode label="EBITDA" icon={<TrendingUp />} status="Outcome" active />
          </div>
        </div>
      </section>

      {/* ================= 5. CASE STUDIES: REAL PROOF ================= */}
      <section className="py-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center mb-20">
            Proven Outcomes in Gujarat.
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <TrustCard 
              hospital="Dahej Public Hospital" 
              stat="₹ 4.2 Cr" 
              label="Projected Revenue Gen." 
              outcome="Break-even: 14.2 Months"
              desc="Full 50-bed infrastructure OS deployment including turnkey build and medical-RO systems."
              accent="gold"
            />
            <TrustCard 
              hospital="Nova Lifeline Hospital" 
              stat="120+ Units" 
              label="Fleet Management" 
              outcome="99.9% Uptime SLA"
              desc="Migration to AMC Intelligence platform resulting in 30% reduction in session downtime."
              accent="blue"
            />
          </div>
        </div>
      </section>

      {/* ================= 6. CAPABILITIES: THE 3 PILLARS ================= */}
      <section className="py-24 bg-white/[0.01] border-y border-white/5">
         <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-3 gap-16">
            <CapabilityBlock 
              title="AI-Driven DPR Engine" 
              desc="Generate investment-grade financial models and session forecasts instantly." 
              icon={<BarChart3 className="text-[#D4AF37]" />}
            />
            <CapabilityBlock 
              title="Infrastructure OS" 
              desc="End-to-end deployment of clinical machines, RO plants, and civil workflows." 
              icon={<Building2 className="text-[#3B82F6]" />}
            />
            <CapabilityBlock 
              title="Predictive AMC" 
              desc="Zero-downtime service systems powered by regional Surat spare-parts warehouse." 
              icon={<Settings className="text-white" />}
            />
         </div>
      </section>

      {/* ================= 7. AI ASSISTANT (ALDEN LAYER) ================= */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard accent="white" className="p-12 text-center border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-white"><Zap size={120} /></div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8">
              Ask Your AI Advisor.
            </h2>
            <div className="bg-[#010810] border border-white/10 rounded-2xl p-8 text-left max-w-2xl mx-auto shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Contextual Intelligence Queries</p>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex items-center gap-4 text-gray-300 group cursor-pointer hover:text-[#D4AF37] transition-colors">
                  <ArrowRight size={14} className="text-[#D4AF37]" /> How many machines for a 100-bed hospital?
                </li>
                <li className="flex items-center gap-4 text-gray-300 group cursor-pointer hover:text-[#D4AF37] transition-colors">
                  <ArrowRight size={14} className="text-[#D4AF37]" /> What is the EBITDA gap for Single-Use machines?
                </li>
                <li className="flex items-center gap-4 text-gray-300 group cursor-pointer hover:text-[#D4AF37] transition-colors">
                  <ArrowRight size={14} className="text-[#D4AF37]" /> Expected ROI in Gujarat for Private Centers?
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ================= 8. FINAL CONVERSION ================= */}
      <section className="py-40 text-center px-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
            Secure Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Capital Outcome.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
            <OsButton label="Generate My DPR" variant="primary" href="/tools" />
            <OsButton label="Discuss Model on WhatsApp" variant="glass" onClick={() => window.open('https://wa.me/919879576332?text=I%20want%20to%20discuss%20a%20dialysis%20project%20ROI%20model.', '_blank')} />
          </div>
        </motion.div>
      </section>

    </main>
  );
}

/* ================= HELPER COMPONENTS ================= */

function ProblemItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-5 rounded-xl">
       <p className="font-bold text-white text-xs mb-1 uppercase tracking-wider">{title}</p>
       <p className="text-[10px] text-gray-500 font-medium">{desc}</p>
    </div>
  );
}

function ArchNode({ label, icon, status, active }: any) {
  return (
    <div className="flex flex-col items-center relative z-10 group">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${active ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)]" : "bg-[#010810] text-gray-400 border-white/10 group-hover:border-white/30 backdrop-blur-md"}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <p className="text-xs font-black uppercase tracking-widest text-white mb-1">{label}</p>
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600">{status}</p>
    </div>
  );
}

function TrustCard({ hospital, stat, label, outcome, desc, accent }: any) {
  const isGold = accent === "gold";
  return (
    <GlassCard accent={accent} className={`p-10 ${isGold ? "border-[#D4AF37]/20" : "border-[#3B82F6]/20"}`}>
       <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-2xl font-black mb-1">{hospital}</h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{outcome}</p>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isGold ? "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20" : "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"}`}>Verified Case</div>
       </div>
       <div className="grid grid-cols-2 gap-8 mb-8 border-y border-white/5 py-8">
          <div>
             <p className="text-4xl font-black text-white">{stat}</p>
             <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-2">{label}</p>
          </div>
          <div className="flex items-center">
             <div className={`w-full h-1 rounded-full ${isGold ? "bg-[#D4AF37]" : "bg-[#3B82F6]"} opacity-30`} />
          </div>
       </div>
       <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </GlassCard>
  );
}

function CapabilityBlock({ icon, title, desc }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-white/30 group-hover:-translate-y-1 transition-all">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 28 })}
      </div>
      <h4 className="text-xl font-bold mb-4 tracking-tight text-white">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}