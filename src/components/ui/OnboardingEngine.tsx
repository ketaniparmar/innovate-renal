"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Activity, ShieldCheck } from "lucide-react";

// --- 1. THE UNIFIED DATA STATE ---
// This payload is exactly what will be sent to your CRM/Backend
interface OnboardingData {
  role: string;
  projectType: string;
  state: string;
  machines: number;
  sessionsPerDay: number;
  pmjayMix: number;
  privateMix: number;
  tpaMix: number;
  phone: string;
}

export function OnboardingEngine() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    role: "",
    projectType: "",
    state: "Gujarat",
    machines: 10,
    sessionsPerDay: 2.5,
    pmjayMix: 50,
    privateMix: 30,
    tpaMix: 20,
    phone: "",
  });

  // --- 2. PROGRESSION HANDLERS ---
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 9));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // --- 3. THE STEP RENDERER ---
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer title="Let's build your dialysis business model." subtitle="Who are we customizing this for?">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {["Hospital Owner", "Nephrologist", "Investor", "Consultant"].map((role) => (
                <button
                  key={role}
                  onClick={() => { updateData("role", role); nextStep(); }}
                  className="p-6 text-left border border-white/10 rounded-2xl hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
                >
                  <span className="block text-white font-bold group-hover:text-[#D4AF37] transition-colors">{role}</span>
                </button>
              ))}
            </div>
          </StepContainer>
        );
      
      case 2:
        return (
          <StepContainer title="What is the scope of the project?" subtitle="This helps us benchmark your infrastructure costs.">
            <div className="flex flex-col gap-4 mt-8">
              {["New Standalone Dialysis Center", "Addition to Existing Hospital", "PPP / Government Tender"].map((type) => (
                <button
                  key={type}
                  onClick={() => { updateData("projectType", type); nextStep(); }}
                  className="p-6 text-left border border-white/10 rounded-2xl hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-white font-bold"
                >
                  {type}
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 3:
        const strictStates = ["Gujarat", "Tamil Nadu", "Karnataka", "Telangana"];
        const isStrict = strictStates.includes(data.state);
        
        return (
          <StepContainer title="Where is the facility located?" subtitle="We will auto-apply state-specific medical compliance policies.">
            <div className="mt-8 space-y-6">
              <select 
                value={data.state}
                onChange={(e) => updateData("state", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-lg font-bold text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Other">Other Region</option>
              </select>

              <AnimatePresence>
                {isStrict && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3 p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl">
                    <ShieldCheck className="text-blue-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-blue-300 leading-relaxed">
                      Single-use dialysis policy auto-applied as per <strong>{data.state}</strong> guidelines. Reuse economics disabled.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StepContainer>
        );

      // ... Steps 4, 5, 6 would follow the same pattern, capturing data

      case 7:
        // THE WOW MOMENT (Live Simulation)
        return (
          <StepContainer title="Your System Output is Ready." subtitle="Generating audit-ready financial projections...">
             {/* Render your previously built Simulator Component Here, passing in the 'data' state */}
             <div className="p-8 border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-2xl text-center mt-8">
               <Activity className="text-[#D4AF37] mx-auto mb-4 animate-pulse" size={40} />
               <h3 className="text-2xl font-black text-white">Analyzing {data.machines} Machine Setup</h3>
               <p className="text-gray-400 mt-2">Compiling local PMJAY rates and operational leakage...</p>
               <button onClick={nextStep} className="mt-6 bg-[#D4AF37] text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest">View Results</button>
             </div>
          </StepContainer>
        );

      case 8: // Assuming step 8 is the Lead Capture
        return (
          <StepContainer title="Unlock Your Full DPR." subtitle="Enter your WhatsApp number to receive the detailed financial model and setup blueprint.">
            <div className="mt-8 space-y-4">
              <input 
                type="tel" 
                placeholder="+91 Phone Number" 
                value={data.phone}
                onChange={(e) => updateData("phone", e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-lg font-bold text-white focus:outline-none focus:border-green-500"
              />
              <button 
                onClick={() => alert(`Sending data to CRM: ${JSON.stringify(data)}`)}
                className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all"
              >
                Send DPR to WhatsApp
              </button>
            </div>
          </StepContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#010810] flex flex-col justify-center py-20 px-6">
      
      {/* 4. TOP PROGRESS BAR */}
      <div className="max-w-2xl mx-auto w-full mb-12">
        <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          <span>Phase {Math.ceil(step / 3)}</span>
          <span>Step {step} of 8</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#D4AF37]" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 8) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* 5. SLIDING CONTENT WINDOW */}
      <div className="max-w-2xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 6. BOTTOM NAVIGATION (Only show on input steps, hide on initial choice & final capture) */}
      {step > 2 && step < 8 && (
        <div className="max-w-2xl mx-auto w-full flex justify-between mt-12">
          <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-wider">
            <ArrowLeft size={16} /> Back
          </button>
          <button onClick={nextStep} className="flex items-center gap-2 text-[#D4AF37] hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-widest">
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

// Helper wrapper for consistent step styling
function StepContainer({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">{title}</h2>
      <p className="text-gray-400 mt-4 text-lg">{subtitle}</p>
      {children}
    </div>
  );
}