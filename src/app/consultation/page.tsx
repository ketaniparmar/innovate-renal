"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, Calendar, Clock, ArrowLeft, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { useAdvisorySession } from "@/lib/session/advisory-session";

export default function ConsultationEscalationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const { activeJourney, newCenterData, runningCenterData } = useAdvisorySession();

  // Prevent hydration mismatch with Zustand persistence
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center"><Loader2 className="animate-spin text-[#C6A85A]" /></div>;
  }

  // Generate dynamic WhatsApp payload based on their specific journey
  const generateWhatsAppHandoff = () => {
    const phone = "919879576332"; // Innovate India Contact
    let text = "Hello Innovate India, I need to schedule an infrastructure consultation.\n\n";

    if (activeJourney === "NEW_CENTER" && newCenterData) {
      text += `*PROJECT TYPE:* New Turnkey Setup\n`;
      text += `*SCALE:* ${newCenterData.machines} Machines\n`;
      text += `*LOCATION:* ${newCenterData.cityTier}\n`;
      text += `*GRADE:* ${newCenterData.buildGrade}\n`;
    } else if (activeJourney === "RUNNING_CENTER" && runningCenterData) {
      text += `*PROJECT TYPE:* Operational Optimization\n`;
      text += `*SCALE:* ${runningCenterData.machines} Machines\n`;
      text += `*CURRENT MAINT:* ${runningCenterData.maintenanceContract}\n`;
      text += `*CONSUMABLES:* ${runningCenterData.consumableModel}\n`;
    }

    text += `\nI have generated my blueprint on the Advisory OS and am ready to discuss execution.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 py-32 px-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <div className="max-w-3xl mx-auto">
        
        {/* ESCALATION HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-16 h-16 bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(198,168,90,0.15)]">
            <ShieldCheck className="text-[#C6A85A]" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Finalize Your Execution Strategy.
          </h1>
          <p className="text-lg text-gray-400 font-medium leading-relaxed">
            Your clinical and financial blueprints are ready. Transition from digital modeling to physical execution by consulting directly with our senior infrastructure planners.
          </p>
        </motion.div>

        {/* SESSION CONTEXT AWARENESS */}
        {activeJourney && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-[#0D1525] border border-[#00A8A8]/30 p-6 rounded-2xl mb-12 flex items-center gap-4">
            <FileText className="text-[#00A8A8] shrink-0" size={24} />
            <div>
              <p className="text-[10px] font-black text-[#00A8A8] uppercase tracking-widest mb-1">Session Data Recovered</p>
              <p className="text-sm text-white font-medium">
                We have saved your parameters for a <strong className="text-[#C6A85A]">
                  {activeJourney === "NEW_CENTER" ? `${newCenterData?.machines}-Machine New Setup` : `${runningCenterData?.machines}-Machine Optimization Audit`}
                </strong>. This context will be securely passed to your consultant.
              </p>
            </div>
          </motion.div>
        )}

        {/* HANDOFF ACTION BLOCK */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Option A: Direct WhatsApp */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0D1525] border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-colors flex flex-col h-full">
            <h3 className="text-xl font-black text-white mb-2">Priority Direct Line</h3>
            <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed flex-1">
              Connect immediately with our planning desk via WhatsApp. Your project parameters will be automatically attached to your message.
            </p>
            <Link href={generateWhatsAppHandoff()} target="_blank">
              <button className="w-full bg-[#C6A85A] text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-[#D4B970] transition-all flex justify-center items-center gap-3 shadow-xl">
                Open WhatsApp <Phone size={18} />
              </button>
            </Link>
          </motion.div>

          {/* Option B: Scheduled Call (Calendly/Booking placeholder) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-white/5 p-8 rounded-[2rem] hover:border-white/10 transition-colors flex flex-col h-full">
            <h3 className="text-xl font-black text-white mb-2">Schedule Deep Dive</h3>
            <p className="text-sm text-gray-400 font-medium mb-8 leading-relaxed flex-1">
              Book a 30-minute infrastructure review call. We will walk through your generated blueprint line-by-line.
            </p>
            <button className="w-full bg-[#0A0F1C] text-white border border-white/20 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/5 transition-all flex justify-center items-center gap-3">
              Book Discovery Call <Calendar size={18} />
            </button>
          </motion.div>

        </div>

        {/* RETURN ROUTING */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => window.history.back()} 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors"
          >
            <ArrowLeft size={16} /> Return to Blueprint
          </button>
        </div>

      </div>
    </main>
  );
}