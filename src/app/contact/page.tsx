"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Building2, Wrench, ArrowRight } from "lucide-react";

// --- STRICT TYPES (Prevents Vercel Build Crashes) ---
interface InfoRowProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function ContactPage() {
  const [formType, setFormType] = useState<"project" | "service">("project");
  const [formData, setFormData] = useState({ name: "", hospital: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const text = `*New ${formType === "project" ? "Project Advisory" : "AMC & Operations"} Inquiry*%0A%0A*Doctor/Director:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Message:* ${formData.message}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/919879576332?text=${encodeURIComponent(text)}`, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-slate-200 overflow-hidden relative selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* Dynamic Institutional Background Glow */}
      <div className={`absolute top-20 right-20 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none transition-colors duration-700 ${formType === "project" ? "bg-[#C6A85A]/10" : "bg-[#00A8A8]/10"}`} />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-in fade-in zoom-in duration-500">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white">
            Speak directly with a <br/>
            <span className={formType === "project" ? "text-[#C6A85A]" : "text-[#00A8A8]"}>
              healthcare infrastructure
            </span> consultant.
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Discuss your upcoming project, financial investment, or risk-control for a running center.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-2 animate-in slide-in-from-bottom duration-500 delay-100">
            <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              
              {/* Form Toggles */}
              <div className="flex bg-[#0A0F1C] p-1.5 rounded-xl border border-white/5 mb-10">
                <button
                  onClick={() => setFormType("project")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    formType === "project" 
                      ? "bg-[#C6A85A] text-[#0A0F1C] shadow-[0_5px_15px_rgba(198,168,90,0.2)]" 
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Building2 size={16} /> Project Advisory
                </button>
                <button
                  onClick={() => setFormType("service")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    formType === "service" 
                      ? "bg-[#00A8A8] text-white shadow-[0_5px_15px_rgba(0,168,168,0.2)]" 
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Wrench size={16} /> AMC & Operations
                </button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Doctor / Director Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl py-4 px-4 text-sm font-medium text-white focus:outline-none focus:border-[#C6A85A]/50 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Hospital / Organization</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.hospital} 
                      onChange={(e) => setFormData({...formData, hospital: e.target.value})} 
                      className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl py-4 px-4 text-sm font-medium text-white focus:outline-none focus:border-[#C6A85A]/50 transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">How can we structure your setup?</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    className="w-full bg-[#0A0F1C] border border-white/10 rounded-xl py-4 px-4 text-sm font-medium text-white focus:outline-none focus:border-[#C6A85A]/50 transition-all resize-none" 
                    placeholder={formType === "project" ? "I am evaluating a 10-machine facility and need a DPR..." : "We need to secure an AMC for our existing infrastructure..."} 
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full mt-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${
                    formType === "project" 
                      ? "bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] shadow-[0_10px_20px_rgba(198,168,90,0.15)]" 
                      : "bg-[#00A8A8] hover:bg-teal-500 text-white shadow-[0_10px_20px_rgba(0,168,168,0.15)]"
                  }`}
                >
                  {isSubmitting 
                    ? "Routing to Advisory Team..." 
                    : formType === "project" ? "Request Project Proposal" : "Request Service Dispatch"
                  } 
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: CONTACT INFO */}
          <aside className="flex flex-col gap-6 animate-in slide-in-from-bottom duration-500 delay-200">
            
            {/* Regional HQ Card */}
            <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl">
              <h3 className="text-xl font-black text-white mb-8">Regional HQ</h3>
              <div className="space-y-6">
                <InfoRow icon={<MapPin />} title="Gujarat Office" desc="Surat, Gujarat, India" />
                <InfoRow icon={<Phone />} title="Direct Line" desc="+91 98795 76332" />
                <InfoRow icon={<Mail />} title="Email" desc="contact@innovate-india.com" />
                <InfoRow icon={<Clock />} title="Operations" desc="24/7 Emergency Support" />
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-white/5 rounded-[2.5rem] p-8 text-center flex flex-col justify-center items-center flex-1 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-4 text-[#25D366]">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Fastest Response</h3>
              <p className="text-xs text-gray-400 mb-6 font-medium">Skip the form and chat directly with our infrastructure specialists.</p>
              <a href="https://wa.me/919879576332" target="_blank" rel="noreferrer" className="w-full">
                <button className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  WhatsApp Chat
                </button>
              </a>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function InfoRow({ icon, title, desc }: InfoRowProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-gray-500 mt-0.5">
        {/* Safely clone the icon to prevent TypeScript build errors */}
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
      </div>
      <div>
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-sm font-bold text-gray-200">{desc}</p>
      </div>
    </div>
  );
}