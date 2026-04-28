"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, ShieldAlert, Building2, 
  Landmark, Activity, Server, Droplets, PieChart
} from "lucide-react";
import Link from "next/link";

// 🧠 ARCHITECTURE RULE: Import logic from isolated engines and PDF builder
import { calculateTurnkeyCapex, NewCenterInputs } from "@/lib/advisory-engine/cost-model";
import { DownloadReportButton } from "@/components/advisory/DownloadReportButton";

export default function NewCenterAdvisory() {
  const [step, setStep] = useState(1);

  // 🧭 THE INPUT LAYER
  const [inputs, setInputs] = useState<NewCenterInputs>({
    machines: 15,
    cityTier: "Tier 2 (Urban)",
    buildGrade: "Premium NABH Compliant",
    expectedSessionsPerDay: 2.0,
  });

  // 🧠 THE ENGINE CALL (Wrapped in useMemo for slider performance)
  const capexData = useMemo(() => calculateTurnkeyCapex(inputs), [inputs]);

  const formatCr = (val: number) => `₹${(val / 10000000).toFixed(2)} Crore`;
  const formatLakhs = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      // ==========================================
      // STEP 1: CLINICAL VISION
      // ==========================================
      case 1:
        return (
          <StepContainer title="Step 1: Clinical Scale" subtitle="Define the foundational footprint of your new facility.">
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg hover:border-white/10 transition-all">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Planned Machines</span>
                  <span className="text-xl font-black text-white">{inputs.machines}</span>
                </div>
                <input type="range" min="5" max="50" value={inputs.machines} onChange={(e) => setInputs({...inputs, machines: Number(e.target.value)})} className="w-full accent-[#00A8A8]" />
              </div>
              
              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg hover:border-white/10 transition-all">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Expected Utilization</span>
                  <span className="text-xl font-black text-white">{inputs.expectedSessionsPerDay.toFixed(1)} Sessions/Day</span>
                </div>
                <input type="range" min="1" max="4" step="0.1" value={inputs.expectedSessionsPerDay} onChange={(e) => setInputs({...inputs, expectedSessionsPerDay: Number(e.target.value)})} className="w-full accent-[#00A8A8]" />
              </div>

              <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 shadow-lg md:col-span-2 mt-4 hover:border-white/10 transition-all">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Target Geography</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {(["Tier 1 (Metro)", "Tier 2 (Urban)", "Tier 3 (Semi-Urban)"] as const).map(tier => (
                    <button key={tier} onClick={() => setInputs({...inputs, cityTier: tier})} className={`p-6 rounded-2xl border font-black text-sm tracking-wide transition-all ${inputs.cityTier === tier ? "bg-[#00A8A8] text-white border-[#00A8A8] shadow-[0_0_20px_rgba(0,168,168,0.2)]" : "bg-[#0A0F1C] text-gray-500 border-white/5 hover:border-white/20"}`}>
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={nextStep} className="mt-10 bg-[#00A8A8] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-teal-500 transition-all w-full flex justify-center items-center gap-3 shadow-xl">
              Configure Infrastructure <ArrowRight size={18}/>
            </button>
          </StepContainer>
        );

      // ==========================================
      // STEP 2: INFRASTRUCTURE STRATEGY
      // ==========================================
      case 2:
        return (
          <StepContainer title="Step 2: Build Strategy" subtitle="Determine the compliance and execution grade for your project.">
            <div className="space-y-6 mt-8">
              <div 
                onClick={() => setInputs({...inputs, buildGrade: "Premium NABH Compliant"})}
                className={`p-8 rounded-[2rem] border cursor-pointer transition-all ${inputs.buildGrade === "Premium NABH Compliant" ? "bg-[#C6A85A]/10 border-[#C6A85A] shadow-[0_0_30px_rgba(198,168,90,0.15)]" : "bg-[#0D1525] border-white/5 hover:border-white/20"}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <ShieldAlert className={inputs.buildGrade === "Premium NABH Compliant" ? "text-[#C6A85A]" : "text-gray-500"} size={28} />
                  <h3 className={`text-xl font-black tracking-wide ${inputs.buildGrade === "Premium NABH Compliant" ? "text-[#C6A85A]" : "text-white"}`}>Premium NABH Compliant (Recommended)</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  Strict infection control zoning, medical-grade HVAC isolation, and double-pass RO architecture. Designed for instant regulatory approval and high-tier insurance empanelment.
                </p>
              </div>

              <div 
                onClick={() => setInputs({...inputs, buildGrade: "Standard Commercial"})}
                className={`p-8 rounded-[2rem] border cursor-pointer transition-all ${inputs.buildGrade === "Standard Commercial" ? "bg-[#00A8A8]/10 border-[#00A8A8] shadow-[0_0_30px_rgba(0,168,168,0.15)]" : "bg-[#0D1525] border-white/5 hover:border-white/20"}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Building2 className={inputs.buildGrade === "Standard Commercial" ? "text-[#00A8A8]" : "text-gray-500"} size={28} />
                  <h3 className={`text-xl font-black tracking-wide ${inputs.buildGrade === "Standard Commercial" ? "text-[#00A8A8]" : "text-white"}`}>Standard Commercial Grade</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  Basic clinical layout suitable for baseline operations. Uses standard RO infrastructure and standard commercial MEP configurations. Limited future-proofing for strict regulatory changes.
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <button onClick={prevStep} className="px-8 py-5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all"><ArrowLeft size={18}/></button>
              <button onClick={nextStep} className="flex-1 bg-[#00A8A8] text-white py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-teal-500 transition-all flex justify-center items-center gap-3 shadow-xl">
                Generate Financial Blueprint <PieChart size={18}/>
              </button>
            </div>
          </StepContainer>
        );

      // ==========================================
      // STEP 3: CAPEX & PAYBACK OUTPUT
      // ==========================================
      case 3:
        return (
          <StepContainer title="Step 3: Investment Blueprint" subtitle="Your precise capital expenditure and cost recovery timeline.">
            
            {/* FINANCIAL SUMMARY */}
            <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/30 p-8 md:p-10 rounded-[2rem] mb-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8 mb-8">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Total Setup Investment (CAPEX)</p>
                  <p className="text-5xl font-black text-[#00A8A8] tracking-tighter">{formatCr(capexData.totalSetupCost)}</p>
                </div>
                <div className="md:text-right md:border-l md:border-white/10 md:pl-8">
                  <p className="text-[10px] text-[#C6A85A] font-bold uppercase tracking-widest mb-2">Estimated Investment Payback</p>
                  <p className="text-4xl font-black text-white tracking-tighter">{capexData.paybackMonths} Months</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 flex items-center gap-1"><Server size={12}/> HD Machines</p>
                  <p className="text-lg font-black text-white">{formatLakhs(capexData.breakdown.machines)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 flex items-center gap-1"><Droplets size={12}/> Water Plant</p>
                  <p className="text-lg font-black text-white">{formatLakhs(capexData.breakdown.roPlant)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 flex items-center gap-1"><Building2 size={12}/> Civil & Interiors</p>
                  <p className="text-lg font-black text-white">{formatLakhs(capexData.breakdown.civil)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 flex items-center gap-1"><Activity size={12}/> MEP / HVAC</p>
                  <p className="text-lg font-black text-white">{formatLakhs(capexData.breakdown.mep)}</p>
                </div>
              </div>
            </div>

            {/* ADVISORY DIRECTIVES */}
            <div className="bg-[#0D1525] p-8 rounded-3xl border border-white/5 mb-10">
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <ShieldAlert size={18} className="text-[#C6A85A]" /> Strategic Advisory
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-[#C6A85A] pl-5">
                  <p className="text-sm font-bold text-white mb-1 tracking-wide">Working Capital Reserve</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">In addition to the physical CAPEX, we strictly advise maintaining <strong className="text-white">{formatLakhs(capexData.safetyBuffer)}</strong> in liquid reserves to sustain operations during the initial 6-month patient ramp-up phase.</p>
                </div>
                <div className="border-l-2 border-[#00A8A8] pl-5">
                  <p className="text-sm font-bold text-white mb-1 tracking-wide">Infrastructure Liability</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">By selecting <strong className="text-white">{inputs.buildGrade}</strong>, your MEP and HVAC load has been properly scaled. Cutting costs on medical-grade HVAC or RO lines will result in critical NABH failure.</p>
                </div>
              </div>
            </div>

            {/* CONSULTANT & PDF CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button onClick={prevStep} className="px-8 py-5 border border-white/10 rounded-full text-gray-400 font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <ArrowLeft size={18}/> Back
              </button>
              <Link href="https://wa.me/919879576332?text=I%20have%20reviewed%20my%20Turnkey%20CAPEX%20Blueprint.%20I%20would%20like%20to%20discuss%20project%20execution." target="_blank" className="flex-1">
                <button className="w-full bg-[#00A8A8] text-white py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-teal-500 transition-all flex justify-center items-center gap-3 shadow-xl">
                  Discuss Turnkey Execution <Landmark size={18}/>
                </button>
              </Link>
            </div>

            {/* 🔥 THE PDF GENERATOR INJECTION */}
            <div className="mt-2">
              <DownloadReportButton inputs={inputs} capex={capexData} />
            </div>

          </StepContainer>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#00A8A8] selection:text-[#0A0F1C] py-32 px-6 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* GLOBAL PROGRESS TRACKER */}
        <div className="mb-16">
          <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4">
            <span>Infrastructure Planning Engine</span>
            <span className="text-[#00A8A8]">Phase {step} of 3</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#00A8A8]" 
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