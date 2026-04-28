"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OperationalAudit() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    machines: 10,
    state: "Maharashtra",
    maintenance: "AMC",
    consumables: "Reuse",
    phone: ""
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <StepContainer title="What is the current scale of your operation?">
            <div className="mt-12 bg-[#0D1525] p-8 rounded-3xl border border-white/5">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Machines</span>
                <span className="text-3xl font-black text-white">{data.machines}</span>
              </div>
              <input 
                type="range" min="3" max="40" step="1" value={data.machines}
                onChange={(e) => setData({...data, machines: Number(e.target.value)})}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#C6A85A]" 
              />
            </div>
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer title="Which state are you operating in?" subtitle="This helps us check your compliance with local PM-JAY and single-use mandates.">
            <select 
              value={data.state}
              onChange={(e) => setData({...data, state: e.target.value})}
              className="w-full mt-8 bg-[#0D1525] border border-white/10 rounded-2xl p-5 text-lg font-bold text-white focus:outline-none focus:border-[#C6A85A]"
            >
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Other">Other Region</option>
            </select>
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer title="How are you currently managing machine maintenance?" subtitle="Machine downtime is the #1 cause of unrecoverable revenue loss.">
            <div className="flex flex-col gap-4 mt-8">
              {[
                { type: "AMC", desc: "Annual Maintenance Contract (Routine Checks)" },
                { type: "CMC", desc: "Comprehensive Maintenance Contract (Parts Included)" },
                { type: "On-Call / None", desc: "We call technicians only when a machine breaks." }
              ].map((m) => (
                <button
                  key={m.type} onClick={() => { setData({...data, maintenance: m.type}); nextStep(); }}
                  className="p-6 text-left border border-white/10 bg-[#0D1525] rounded-2xl hover:border-[#C6A85A] transition-all"
                >
                  <h3 className="text-white font-bold text-lg">{m.type}</h3>
                  <p className="text-gray-400 text-sm">{m.desc}</p>
                </button>
              ))}
            </div>
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer title="Your diagnostic is ready for review." subtitle="Enter your contact number to generate your custom leakage analysis.">
            <input 
              type="tel" placeholder="WhatsApp Number" 
              value={data.phone} onChange={(e) => setData({...data, phone: e.target.value})}
              className="w-full mt-8 bg-[#0D1525] border border-white/10 rounded-2xl p-5 text-lg font-bold text-white focus:border-[#C6A85A]"
            />
            <button 
              disabled={data.phone.length < 5}
              onClick={() => router.push(`/optimize/report?m=${data.machines}&s=${data.state}&amc=${data.maintenance}`)}
              className="w-full mt-6 bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-2xl font-black uppercase tracking-widest transition-all disabled:opacity-50"
            >
              Generate Optimization Report
            </button>
          </StepContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-32 px-6 flex flex-col items-center selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <div className="w-full max-w-2xl mb-12">
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-[#C6A85A]" initial={{ width: 0 }} animate={{ width: `${(step / 4) * 100}%` }} />
        </div>
      </div>
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
        {step > 1 && step < 4 && (
          <button onClick={prevStep} className="mt-12 flex items-center gap-2 text-gray-500 hover:text-white uppercase tracking-widest text-xs font-bold">
            <ArrowLeft size={16} /> Back
          </button>
        )}
      </div>
    </div>
  );
}

function StepContainer({ title, subtitle, children }: { title: string, subtitle?: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{title}</h2>
      {subtitle && <p className="text-gray-400 text-lg font-medium">{subtitle}</p>}
      {children}
    </div>
  );
}