"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ShieldAlert, CheckCircle2, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

// --- THE HUMANIZED DATA STATE ---
interface ProjectSafetyData {
  role: string;
  projectType: string;
  state: string;
  scale: number;
  patientMix: string;
  phone: string;
}

export default function ProjectSafetyEvaluation() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState<ProjectSafetyData>({
    role: "",
    projectType: "",
    state: "Gujarat",
    scale: 15,
    patientMix: "Mixed",
    phone: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const updateData = (key: keyof ProjectSafetyData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFinalSubmission = () => {
    setIsProcessing(true);
    // Here you would typically save 'data' to your global context or backend
    setTimeout(() => {
      router.push("/report"); // Push to the final Blueprint Report
    }, 2500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepContainer 
            title="Let's ensure your project is structurally sound." 
            subtitle="To give you the most accurate safety and cost analysis, who are we planning this for?"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {["Practicing Doctor", "Hospital Owner", "Private Investor", "Real Estate Developer"].map((role) => (
                <button
                  key={role}
                  onClick={() => { updateData("role", role); nextStep(); }}
                  className="p-6 text-left border border-white/10 bg-[#0D1525] rounded-2xl hover:border-[#C6A85A] hover:bg-[#C6A85A]/5 transition-all group"
                >
                  <span className="block text-white font-bold group-hover:text-[#C6A85A] transition-colors text-lg">{role}</span>
                </button>
              ))}
            </div>
          </StepContainer>
        );
      
      case 2:
        return (
          <StepContainer 
            title="What is the scope of your facility?" 
            subtitle="This determines your infection-control layout and NABH compliance requirements."
          >
            <div className="flex flex-col gap-4 mt-8">
              {[
                { title: "New Standalone Dialysis Center", desc: "Building a dedicated facility from the ground up." },
                { title: "Addition to Existing Hospital", desc: "Expanding current hospital infrastructure." },
                { title: "Government / PPP Tender", desc: "Executing a public-private partnership contract." }
              ].map((type) => (
                <button
                  key={type.title}
                  onClick={() => { updateData("projectType", type.title); nextStep(); }}
                  className="p-6 text-left border border-white/10 bg-[#0D1525] rounded-2xl hover:border-[#C6A85A] hover:bg-[#C6A85A]/5 transition-all"
                >
                  <h3 className="text-white font-bold text-lg mb-1">{type.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{type.desc}</p>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 3:
        const isSingleUseState = ["Gujarat", "Tamil Nadu", "Karnataka"].includes(data.state);
        return (
          <StepContainer 
            title="Where is the facility located?" 
            subtitle="We will automatically apply state-specific medical compliance and infection-control policies to your estimate."
          >
            <div className="mt-8 space-y-6">
              <select 
                value={data.state}
                onChange={(e) => updateData("state", e.target.value)}
                className="w-full bg-[#0D1525] border border-white/10 rounded-2xl p-5 text-lg font-bold text-white focus:outline-none focus:border-[#C6A85A]"
              >
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Other">Other Region</option>
              </select>

              <AnimatePresence>
                {isSingleUseState && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 p-5 bg-[#00A8A8]/10 border border-[#00A8A8]/20 rounded-2xl">
                    <UserCheck className="text-[#00A8A8] shrink-0 mt-0.5" size={24} />
                    <p className="text-sm text-gray-300 font-medium leading-relaxed">
                      Based on your location ({data.state}), we will apply strict <strong>Single-Use Dialyzer</strong> policies to your financial model to ensure you are legally compliant and patient-safe from day one.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StepContainer>
        );

      case 4:
        return (
          <StepContainer 
            title="What scale are you considering?" 
            subtitle="The number of machines directly impacts the size of the medical water plant (RO) you will need to install."
          >
            <div className="mt-12 space-y-8 bg-[#0D1525] p-8 rounded-3xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Planned Capacity</span>
                <span className="text-3xl font-black text-white">{data.scale} Machines</span>
              </div>
              <input 
                type="range" min="5" max="50" step="1" 
                value={data.scale}
                onChange={(e) => updateData("scale", Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#C6A85A]" 
              />
              <p className="text-xs text-[#C6A85A] font-bold uppercase tracking-widest text-center mt-6">
                {data.scale < 12 ? "Entry-Level Clinical Setup" : data.scale > 25 ? "Corporate Hub Infrastructure" : "Optimal ROI Setup Range"}
              </p>
            </div>
          </StepContainer>
        );

      case 5:
        return (
          <StepContainer 
            title="Who are your primary patients?" 
            subtitle="This determines your income stability. Government schemes provide steady volume, while private patients yield higher margins."
          >
            <div className="flex flex-col gap-4 mt-8">
              {[
                { title: "Mostly Government Schemes", desc: "High volume, standardized rates (e.g., PM-JAY)." },
                { title: "A Balanced Mix", desc: "A stable blend of scheme patients and private walk-ins." },
                { title: "Strictly Private & Corporate Insurance", desc: "Lower volume, premium billing rates." }
              ].map((mix) => (
                <button
                  key={mix.title}
                  onClick={() => { updateData("patientMix", mix.title); nextStep(); }}
                  className="p-6 text-left border border-white/10 bg-[#0D1525] rounded-2xl hover:border-[#C6A85A] hover:bg-[#C6A85A]/5 transition-all"
                >
                  <h3 className="text-white font-bold text-lg mb-1">{mix.title}</h3>
                  <p className="text-gray-400 text-sm font-medium">{mix.desc}</p>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 6:
        return (
          <StepContainer 
            title="Your Project Blueprint is ready to be generated." 
            subtitle="We have audited your parameters. Enter your contact number so we can securely send your customized financial report and risk analysis."
          >
            <div className="mt-8 space-y-6">
              <input 
                type="tel" 
                placeholder="Your Mobile / WhatsApp Number" 
                value={data.phone}
                onChange={(e) => updateData("phone", e.target.value)}
                className="w-full bg-[#0D1525] border border-white/10 rounded-2xl p-5 text-lg font-bold text-white focus:outline-none focus:border-[#C6A85A]"
              />
              
              <button 
                onClick={handleFinalSubmission}
                disabled={isProcessing || data.phone.length < 5}
                className="w-full bg-[#C6A85A] hover:bg-[#D4B970] disabled:bg-gray-700 disabled:text-gray-500 text-[#0A0F1C] py-5 rounded-2xl text-sm font-black uppercase tracking-[0.1em] transition-all flex justify-center items-center gap-3"
              >
                {isProcessing ? "Auditing Project Safety..." : "Generate My Project Blueprint"}
              </button>

              <div className="flex items-start gap-3 p-4 bg-[#A6192E]/5 border border-[#A6192E]/20 rounded-xl mt-6">
                <ShieldAlert className="text-[#A6192E] shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Your blueprint will include a strict warning analysis regarding operational downtime risks and hidden infrastructure costs specific to {data.scale}-machine setups in {data.state}.
                </p>
              </div>
            </div>
          </StepContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex flex-col justify-center py-32 px-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* TOP PROGRESS BAR */}
      <div className="max-w-3xl mx-auto w-full mb-16">
        <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
          <span>Project Safety Check</span>
          <span>Step {step} of 6</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#C6A85A]" 
            initial={{ width: 0 }}
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* SLIDING CONTENT WINDOW */}
      <div className="max-w-3xl mx-auto w-full relative">
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

      {/* BOTTOM NAVIGATION (Hide on final step) */}
      {step > 1 && step < 6 && (
        <div className="max-w-3xl mx-auto w-full flex justify-between mt-12">
          <button onClick={prevStep} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Back
          </button>
          {step !== 1 && step !== 2 && step !== 5 && (
            <button onClick={nextStep} className="flex items-center gap-2 text-[#C6A85A] hover:text-[#D4B970] transition-colors text-xs font-bold uppercase tracking-widest">
              Continue <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Helper wrapper for consistent styling
function StepContainer({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-4">{title}</h2>
      <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl">{subtitle}</p>
      {children}
    </div>
  );
}