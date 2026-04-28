"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, ShieldAlert, Activity, TrendingUp, 
  ListChecks, Server, Settings, Package 
} from "lucide-react";
import Link from "next/link";

// 🧠 ARCHITECTURE RULE: Import all business logic from the isolated Advisory Engine
import { calculateOperationalLeakage, FacilityInputs } from "@/lib/advisory-engine/leakage-engine";
import { generateActionPlan } from "@/lib/advisory-engine/prioritization";
import { generateCommercialAdvisory } from "@/lib/advisory-engine/commercial-intelligence";

export default function RunningCenterAdvisory() {
  const [step, setStep] = useState(1);

  // 🧭 THE INPUT LAYER (Data Collection Only)
  const [inputs, setInputs] = useState<FacilityInputs>({
    machines: 10,
    sessionsPerDay: 2.0,
    avgRevenue: 1850,
    insuranceMix: 60,
    consumableModel: "Reuse",
    maintenanceContract: "AMC",
    occupancyRate: 70,
  });

  // 🧠 THE ENGINE CALLS (Wrapped in useMemo for slider performance)
  const { leakage, actionPlan, commercialAdvisory } = useMemo(() => {
    return {
      leakage: calculateOperationalLeakage(inputs),
      actionPlan: generateActionPlan(inputs),
      commercialAdvisory: generateCommercialAdvisory(inputs)
    };
  }, [inputs]);

  // Helper for rendering large INR amounts
  const formatLakhs = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  // UI Navigation
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      // ==========================================
      // STEP 1: CLINICAL SITUATION
      // ==========================================
      case 1:
        return (
          <StepContainer title="Step 1: Clinical Situation" subtitle="Let's establish your current operational revenue baseline.">
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Active Machines</span>
                  <span className="text-xl font-black text-white">{inputs.machines}</span>
                </div>
                <input type="range" min="3" max="50" value={inputs.machines} onChange={(e) => setInputs({...inputs, machines: Number(e.target.value)})} className="w-full accent-[#C6A85A]" />
              </div>
              
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Avg Sessions/Day</span>
                  <span className="text-xl font-black text-white">{inputs.sessionsPerDay.toFixed(1)}</span>
                </div>
                <input type="range" min="1" max="4" step="0.1" value={inputs.sessionsPerDay} onChange={(e) => setInputs({...inputs, sessionsPerDay: Number(e.target.value)})} className="w-full accent-[#C6A85A]" />
              </div>
              
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Avg Revenue / Session</span>
                  <span className="text-xl font-black text-[#00A8A8]">₹{inputs.avgRevenue}</span>
                </div>
                <input type="range" min="900" max="3500" step="50" value={inputs.avgRevenue} onChange={(e) => setInputs({...inputs, avgRevenue: Number(e.target.value)})} className="w-full accent-[#00A8A8]" />
              </div>
              
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Insurance / Govt Mix</span>
                  <span className="text-xl font-black text-[#00A8A8]">{inputs.insuranceMix}%</span>
                </div>
                <input type="range" min="0" max="100" step="5" value={inputs.insuranceMix} onChange={(e) => setInputs({...inputs, insuranceMix: Number(e.target.value)})} className="w-full accent-[#00A8A8]" />
              </div>

              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg md:col-span-2">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Average Occupancy Rate</span>
                  <span className="text-xl font-black text-white">{inputs.occupancyRate}%</span>
                </div>
                <input type="range" min="30" max="100" value={inputs.occupancyRate} onChange={(e) => setInputs({...inputs, occupancyRate: Number(e.target.value)})} className="w-full accent-[#C6A85A]" />
              </div>
            </div>
            <button onClick={nextStep} className="mt-8 bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all w-full flex justify-center items-center gap-3 shadow-xl">
              Continue Diagnostic <ArrowRight size={18}/>
            </button>
          </StepContainer>
        );

      // ==========================================
      // STEP 2: FINANCIAL PRESSURE CHECK
      // ==========================================
      case 2:
        return (
          <StepContainer title="Step 2: Financial Pressure Check" subtitle="How is your facility structurally managing core expenditures today?">
            <div className="space-y-8 mt-8">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Consumable Model Selection</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <button onClick={() => setInputs({...inputs, consumableModel: "Single-Use"})} className={`p-6 rounded-2xl border font-black tracking-wide transition-all ${inputs.consumableModel === "Single-Use" ? "bg-[#00A8A8] text-white border-[#00A8A8] shadow-[0_0_20px_rgba(0,168,168,0.2)]" : "bg-[#0D1525] text-gray-500 border-white/5 hover:border-white/20"}`}>
                    Single-Use (PMJAY Aligned)
                  </button>
                  <button onClick={() => setInputs({...inputs, consumableModel: "Reuse"})} className={`p-6 rounded-2xl border font-black tracking-wide transition-all ${inputs.consumableModel === "Reuse" ? "bg-[#C6A85A] text-[#0A0F1C] border-[#C6A85A] shadow-[0_0_20px_rgba(198,168,90,0.2)]" : "bg-[#0D1525] text-gray-500 border-white/5 hover:border-white/20"}`}>
                    Reuse (Legacy Model)
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Machine Maintenance Strategy</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {["CMC", "AMC", "On-Call / None"].map(opt => (
                    <button key={opt} onClick={() => setInputs({...inputs, maintenanceContract: opt as "AMC" | "CMC" | "On-Call / None"})} className={`p-6 rounded-2xl border font-black text-sm tracking-wide transition-all ${inputs.maintenanceContract === opt ? "bg-[#00A8A8] text-white border-[#00A8A8] shadow-[0_0_20px_rgba(0,168,168,0.2)]" : "bg-[#0D1525] text-gray-500 border-white/5 hover:border-white/20"}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={prevStep} className="px-8 py-5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all"><ArrowLeft size={18}/></button>
              <button onClick={nextStep} className="flex-1 bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all flex justify-center items-center gap-3 shadow-xl">
                Run Financial Diagnosis <Activity size={18}/>
              </button>
            </div>
          </StepContainer>
        );

      // ==========================================
      // STEP 3: DIAGNOSTIC & COMMERCIAL OUTPUT
      // ==========================================
      case 3:
        return (
          <StepContainer title="Step 3: Advisory Blueprint" subtitle="Your customized clinical and financial intelligence output.">
            
            {/* TRUST LAYER */}
            <div className="bg-[#0A0F1C]/50 border border-white/5 p-5 rounded-xl mb-10 flex items-start gap-4">
              <ShieldAlert className="text-[#C6A85A] shrink-0 mt-0.5" size={20} />
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase font-black tracking-[0.2em]">
                DISCLAIMER: This intelligence model is driven by Indian dialysis operational benchmarks, standard PMJAY pricing, and industry-standard service contracts. Recommendations are designed to protect facility uptime and revenue stability.
              </p>
            </div>

            {/* FINANCIAL RECOVERY DELTA (Before/After) */}
            <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/30 p-8 md:p-10 rounded-[2rem] mb-10 shadow-2xl relative overflow-hidden">
              <h3 className="text-sm font-black text-[#00A8A8] uppercase tracking-widest mb-8 border-b border-[#00A8A8]/20 pb-4">Financial Recovery Potential (Monthly)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Current Estimated Leakage</p>
                  <p className="text-4xl font-black text-[#A6192E] tracking-tighter">{formatLakhs(leakage.totalMonthlyLeakage)}</p>
                </div>
                <div className="hidden md:flex justify-center">
                  <ArrowRight className="text-gray-600" size={32} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Target Optimized Leakage</p>
                  <p className="text-4xl font-black text-white tracking-tighter">{formatLakhs(leakage.optimizedLeakage)}</p>
                </div>
                <div className="md:border-l md:border-white/10 md:pl-8 pt-6 md:pt-0 border-t border-white/10 md:border-t-0 mt-4 md:mt-0">
                  <p className="text-[10px] text-[#C6A85A] font-bold uppercase tracking-widest mb-2">Net Improvement</p>
                  <p className="text-5xl font-black text-[#C6A85A] tracking-tighter">{formatLakhs(leakage.netImprovement)}</p>
                </div>
              </div>
            </div>

            {/* COMMERCIAL INTELLIGENCE PILLARS */}
            <h2 className="text-2xl font-black text-white mb-6 mt-12">Infrastructure & Operations Alignment</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              
              {/* Pillar 1: Infrastructure */}
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Server size={18} className="text-[#00A8A8]" /> Clinical Infrastructure
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Required RO Plant</span>
                    <span className="text-sm font-black text-white text-right">{commercialAdvisory.infrastructure.waterSystem}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Consumable Volume</span>
                    <span className="text-sm font-black text-[#00A8A8]">{commercialAdvisory.infrastructure.monthlyConsumables} Kits / Month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Reprocessor Status</span>
                    <span className="text-xs font-black text-gray-300 text-right">{commercialAdvisory.infrastructure.reprocessorRequired}</span>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Service Model */}
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Settings size={18} className="text-[#C6A85A]" /> Service Requirements
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Target Contract Tier</p>
                    <p className="text-sm font-black text-white">{commercialAdvisory.serviceModel.recommended}</p>
                  </div>
                  <div className={`p-4 rounded-xl border ${commercialAdvisory.serviceModel.isHighRisk ? 'bg-[#A6192E]/10 border-[#A6192E]/20' : 'bg-[#0A0F1C] border-white/5'}`}>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Operational Justification</p>
                    <p className={`text-xs font-medium leading-relaxed ${commercialAdvisory.serviceModel.isHighRisk ? 'text-[#A6192E]' : 'text-gray-300'}`}>
                      {commercialAdvisory.serviceModel.riskAnalysis}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ACTION PLAN ENGINE */}
            <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-xl">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                <ListChecks size={20} className="text-[#C6A85A]" /> First Actions (Next 30 Days)
              </h3>
              <div className="space-y-6">
                {actionPlan.map((leak, idx) => (
                  <div key={idx} className="flex gap-5 items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs text-gray-400 shrink-0 border border-white/10">
                      P{idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                        <p className="text-base font-black text-white tracking-wide">{leak.category}</p>
                        <span className="text-xs font-black text-[#A6192E] bg-[#A6192E]/10 px-3 py-1 rounded-full border border-[#A6192E]/20">
                          Risk: {formatLakhs(leak.value)} / mo
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed font-medium">👉 {leak.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔥 FIXED HYDRATION CTA BUTTON 🔥 */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button onClick={prevStep} className="px-8 py-5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <ArrowLeft size={18}/> Back
              </button>
              
              {/* Note: The button tag has been removed from inside the Link. 
                  The styling is now directly on the Link component itself. */}
              <Link 
                href="https://wa.me/919879576332?text=I%20have%20reviewed%20my%20Infrastructure%20and%20Commercial%20Advisory%20report.%20I%20need%20a%20consultation%20to%20execute%20the%20recovery%20plan." 
                target="_blank" 
                className="flex-1 w-full bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all flex justify-center items-center gap-3 shadow-xl"
              >
                Discuss Infrastructure & Execution <TrendingUp size={18}/>
              </Link>
            </div>

          </StepContainer>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] py-32 px-6 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* GLOBAL PROGRESS TRACKER */}
        <div className="mb-16">
          <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">
            <span>Advisory Diagnostic Engine</span>
            <span className="text-[#C6A85A]">Phase {step} of 3</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#00A8A8] to-[#C6A85A]" 
              initial={{ width: 0 }} 
              animate={{ width: `${(step / 3) * 100}%` }} 
              transition={{ duration: 0.5, ease: "easeInOut" }} 
            />
          </div>
        </div>

        {/* DYNAMIC CONTENT VIEW */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}

// 🧱 STRICT UI SUB-COMPONENT
function StepContainer({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-6">{title}</h2>
      <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-2xl">{subtitle}</p>
      {children}
    </div>
  );
}