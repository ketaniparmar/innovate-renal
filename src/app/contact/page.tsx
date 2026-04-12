"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Phone, Mail, MessageCircle, ArrowRight, 
  CheckCircle2, Loader2, ShieldCheck, Activity, Wrench
} from "lucide-react";

export default function ContactPage() {
  const [formType, setFormType] = useState<"sales" | "service">("sales");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call to backend/CRM
    setTimeout(() => {
      setFormStatus("success");
    }, 2000);
  };

  const themeColor = formType === "sales" ? "#D4AF37" : "#3B82F6";
  const themeGlow = formType === "sales" ? "focus:border-[#D4AF37]/50 focus:ring-[#D4AF37]/20" : "focus:border-[#3B82F6]/50 focus:ring-[#3B82F6]/20";

  return (
    <div className="min-h-screen bg-[#010810] text-white selection:bg-gray-800 selection:text-white pt-24 pb-32 relative overflow-hidden">
      
      {/* Background Ambient Orbs */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] blur-[150px] rounded-full pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: formType === "sales" ? 'rgba(212,175,55,0.05)' : 'rgba(59,130,246,0.05)' }}
      />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">Connect with Innovate India.</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Select your requirement below. Our regional specialists will route your request and respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* LEFT: FORM AREA */}
          <div className="lg:col-span-2">
            
            {/* Intent Switcher */}
            <div className="flex p-1 bg-white/[0.02] border border-white/5 rounded-2xl mb-8 w-full md:w-fit backdrop-blur-md">
              <button 
                onClick={() => { setFormType("sales"); setFormStatus("idle"); }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${formType === "sales" ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_20px_rgba(212,175,55,0.3)]" : "text-gray-400 hover:text-white"}`}
              >
                <Activity size={16} /> Request Quote
              </button>
              <button 
                onClick={() => { setFormType("service"); setFormStatus("idle"); }}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${formType === "service" ? "bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" : "text-gray-400 hover:text-white"}`}
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
                  className="bg-white/[0.02] border border-white/5 p-12 rounded-3xl flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request Received</h3>
                  <p className="text-gray-400 max-w-md mb-8">
                    Your {formType === "sales" ? "quotation request" : "service ticket"} has been securely logged. A specialist will contact you shortly.
                  </p>
                  <button 
                    onClick={() => setFormStatus("idle")}
                    className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                  className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-3xl backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Facility / Hospital Name *</label>
                      <input required type="text" className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 transition-all ${themeGlow}`} placeholder="e.g. Apex Lifeline" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contact Person *</label>
                      <input required type="text" className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 transition-all ${themeGlow}`} placeholder="Your Name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number *</label>
                      <input required type="tel" className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 transition-all ${themeGlow}`} placeholder="+91" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {formType === "sales" ? "Requirement Type *" : "Service Type *"}
                      </label>
                      <select required className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 transition-all appearance-none ${themeGlow}`}>
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

                  <div className="mb-8">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Additional Details</label>
                    <textarea rows={4} className={`w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-1 transition-all resize-none ${themeGlow}`} placeholder="Please provide any specific models, bed capacity, or urgent notes..." />
                  </div>

                  <button 
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{ backgroundColor: themeColor, color: formType === "sales" ? "#010810" : "#ffffff", boxShadow: `0 0 20px ${themeColor}40` }}
                  >
                    {formStatus === "submitting" ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : <>{formType === "sales" ? "Submit Quotation Request" : "Dispatch Service Request"} <ArrowRight size={18} /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: CONTACT INFO & TRUST ANCHORS */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6">Regional Headquarters</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Gujarat Office</p>
                    <p className="text-sm text-gray-300 leading-relaxed">Surat, Gujarat<br/>India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Direct Email</p>
                    <p className="text-sm text-gray-300 font-medium">info@innovate-india.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Support Hotline</p>
                    <p className="text-sm text-gray-300 font-medium">+91 9879576332</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance / Authority Card */}
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden">
              <ShieldCheck size={80} className="absolute -right-4 -bottom-4 text-white/5 pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 size={20} className="text-[#D4AF37]" />
                <h4 className="font-bold text-white">Authorized Partner</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Innovate India is an officially authorized distributor of Diacare Solutions. All equipment and parts are 100% genuine OEM.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FIXED WHATSAPP FLOATING BUTTON */}
      <a 
        href="https://wa.me/919879576332" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 group"
      >
        <div className="bg-[#25D366] text-[#010810] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
          Chat on WhatsApp
        </div>
        <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-[#010810] shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform">
          <MessageCircle size={28} />
        </div>
      </a>

    </div>
  );
}