"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, MessageCircle, ArrowRight, 
  CheckCircle2, Loader2, ShieldCheck, Activity, Wrench
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ContactPage() {
  const [formType, setFormType] = useState<"sales" | "service">("sales");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 2000);
  };

  const themeColor = formType === "sales" ? "#D4AF37" : "#3B82F6";
  const themeGlow = formType === "sales" 
    ? "focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/20" 
    : "focus:border-[#3B82F6]/50 focus:ring-1 focus:ring-[#3B82F6]/20";

  return (
    <main className="min-h-screen bg-[#010810] text-white pt-32 pb-32 relative overflow-hidden">
      
      {/* Dynamic Ambient Glow */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: formType === "sales" ? 'rgba(212,175,55,0.05)' : 'rgba(59,130,246,0.05)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 leading-tight">
            Connect with <br className="md:hidden"/> <span className="text-white">Innovate India.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Select your requirement below. Our regional specialists will route your request to the appropriate engineering or sales team and respond within 2 hours.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: FORM AREA */}
          <div className="lg:col-span-2">
            
            {/* Intent Switcher */}
            <div className="flex p-1.5 bg-white/[0.02] border border-white/10 rounded-2xl mb-10 w-full md:w-fit backdrop-blur-md">
              <button 
                type="button"
                onClick={() => { setFormType("sales"); setFormStatus("idle"); }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formType === "sales" ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-gray-500 hover:text-white"}`}
              >
                <Activity size={16} /> Request Quote
              </button>
              <button 
                type="button"
                onClick={() => { setFormType("service"); setFormStatus("idle"); }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formType === "service" ? "bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "text-gray-500 hover:text-white"}`}
              >
                <Wrench size={16} /> Book Service
              </button>
            </div>

            {/* The Form */}
            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.02] border border-white/5 p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center min-h-[450px]"
                >
                  <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-extrabold mb-4 tracking-tighter">Request Received</h3>
                  <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
                    Your {formType === "sales" ? "quotation request" : "service ticket"} has been securely logged. A specialist from our Gujarat office will contact you shortly.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-full hover:bg-white/5"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-1 transition-colors duration-500" style={{ backgroundColor: themeColor }} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Facility Name *</label>
                      <input required type="text" className={`w-full bg-[#010810] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-700 ${themeGlow}`} placeholder="e.g. Apex Lifeline" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Person *</label>
                      <input required type="text" className={`w-full bg-[#010810] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-700 ${themeGlow}`} placeholder="Your Name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number *</label>
                      <input required type="tel" className={`w-full bg-[#010810] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-all placeholder:text-gray-700 ${themeGlow}`} placeholder="+91" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                        {formType === "sales" ? "Requirement Type *" : "Service Type *"}
                      </label>
                      <select required className={`w-full bg-[#010810] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-all appearance-none ${themeGlow}`}>
                        {formType === "sales" ? (
                          <>
                            <option value="">Select Equipment...</option>
                            <option value="machine">Dialysis Machines</option>
                            <option value="ro">RO Water System</option>
                            <option value="setup">Complete Turnkey Setup</option>
                            <option value="consumables">Consumables Bulk Order</option>
                          </>
                        ) : (
                          <>
                            <option value="">Select Request...</option>
                            <option value="breakdown">Emergency Breakdown Repair</option>
                            <option value="amc_new">New AMC Contract</option>
                            <option value="pm">Preventive Maintenance</option>
                            <option value="parts">Spare Parts Request</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="mb-10">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Additional Details</label>
                    <textarea rows={4} className={`w-full bg-[#010810] border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none transition-all resize-none placeholder:text-gray-700 ${themeGlow}`} placeholder="Please provide any specific models, bed capacity, or urgent notes..." />
                  </div>

                  <button 
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{ backgroundColor: themeColor, color: formType === "sales" ? "#010810" : "#ffffff", boxShadow: `0 0 30px ${themeColor}40` }}
                  >
                    {formStatus === "submitting" ? <><Loader2 size={18} className="animate-spin" /> Processing Data...</> : <>{formType === "sales" ? "Submit Quotation Request" : "Dispatch Service Request"} <ArrowRight size={18} /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: CONTACT INFO & TRUST ANCHORS */}
          <aside className="flex flex-col gap-6">
            <GlassCard accentColor={formType === "sales" ? "gold" : "blue"} hover={false} className="p-8 border-white/5">
              <h3 className="text-2xl font-bold mb-8 tracking-tight">Regional HQ</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-gray-400">
                    <MapPin size={20} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Gujarat Office</p>
                    <p className="text-sm text-white leading-relaxed">Surat, Gujarat<br/>India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-gray-400">
                    <Mail size={20} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Direct Email</p>
                    <p className="text-sm text-white font-medium">info@innovate-india.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-gray-400">
                    <Phone size={20} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Support Hotline</p>
                    <p className="text-sm text-white font-medium">+91 9879576332</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Compliance / Authority Card */}
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-8 rounded-[2.5rem] relative overflow-hidden">
              <ShieldCheck size={120} className="absolute -right-8 -bottom-8 text-white/[0.03] pointer-events-none" />
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <CheckCircle2 size={24} className="text-[#D4AF37]" />
                <h4 className="font-bold text-white text-lg tracking-tight">Authorized Partner</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                Innovate India is an officially authorized distributor of Diacare Solutions. All equipment and parts are 100% genuine OEM.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* FIXED WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/919879576332" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-4 group"
      >
        <div className="bg-[#25D366] text-[#010810] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.2)]">
          Chat on WhatsApp
        </div>
        <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-[#010810] shadow-[0_0_30px_rgba(37,211,102,0.4)] group-hover:scale-110 transition-transform duration-300">
          <MessageCircle size={32} />
        </div>
      </a>

    </main>
  );
}