"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Building2, Wrench } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { OsButton } from "@/components/ui/OsButton";

export default function ContactPage() {
  const [formType, setFormType] = useState<"sales" | "service">("sales");
  const [formData, setFormData] = useState({ name: "", hospital: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New ${formType === "sales" ? "Project" : "Service"} Inquiry*%0A%0A*Name:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-24 text-white overflow-hidden relative">
      
      {/* Dynamic Background Glow */}
      <div className={`absolute top-20 right-20 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none transition-colors duration-700 ${formType === "sales" ? "bg-[#D4AF37]/10" : "bg-[#3B82F6]/10"}`} />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">Let's Talk Infrastructure.</h1>
          <p className="text-gray-400 text-lg">Whether you are planning a new 50-bed center or need emergency AMC support, our team is ready to deploy.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-2">
            {/* FIXED PROPS: Using 'accent' and 'interactive' */}
            <GlassCard accent={formType === "sales" ? "gold" : "blue"} interactive={false} className="p-8 md:p-12">
              
              {/* Form Toggles */}
              <div className="flex bg-[#0A1118] p-1.5 rounded-xl border border-white/5 mb-8">
                <button
                  onClick={() => setFormType("sales")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    formType === "sales" ? "bg-[#D4AF37] text-[#010810] shadow-[0_0_15px_rgba(212,175,55,0.3)]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Building2 size={16} /> Project Sales
                </button>
                <button
                  onClick={() => setFormType("service")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                    formType === "service" ? "bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <Wrench size={16} /> AMC & Service
                </button>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Hospital / Clinic</label>
                    <input required type="text" value={formData.hospital} onChange={(e) => setFormData({...formData, hospital: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">How can we help?</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-[#010810] border border-white/10 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/30 transition-all resize-none" placeholder={formType === "sales" ? "I am looking to setup a 10-bed facility..." : "We need an AMC contract for 5 Diacare machines..."} />
                </div>
                
                <OsButton 
                  label={formType === "sales" ? "Request Turnkey Proposal" : "Request Service Dispatch"} 
                  variant={formType === "sales" ? "primary" : "secondary"} 
                />
              </form>
            </GlassCard>
          </div>

          {/* RIGHT: CONTACT INFO */}
          <aside className="flex flex-col gap-6">
            
            {/* FIXED PROPS: Using 'accent' and 'interactive' */}
            <GlassCard accent={formType === "sales" ? "gold" : "blue"} interactive={false} className="p-8">
              <h3 className="text-xl font-bold mb-8">Regional HQ</h3>
              <div className="space-y-6">
                <InfoRow icon={<MapPin />} title="Gujarat Office" desc="Surat, Gujarat, India" />
                <InfoRow icon={<Phone />} title="Direct Line" desc="+91 98795 76332" />
                <InfoRow icon={<Mail />} title="Email" desc="contact@innovate-india.com" />
                <InfoRow icon={<Clock />} title="Support Hours" desc="24/7 Emergency Dispatch" />
              </div>
            </GlassCard>

            {/* Direct WhatsApp Box */}
            <GlassCard accent="none" interactive={true} className="p-8 text-center flex flex-col justify-center items-center h-full">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 text-green-500">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Fastest Response</h3>
              <p className="text-xs text-gray-400 mb-6">Skip the form and chat directly with our infrastructure specialists.</p>
              <a href="https://wa.me/919879576332" target="_blank" rel="noreferrer" className="w-full">
                <button className="w-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-500 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                  WhatsApp Chat
                </button>
              </a>
            </GlassCard>

          </aside>
        </div>
      </div>
    </main>
  );
}

// Sub-component for contact info rows
function InfoRow({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-gray-500 mt-0.5">{React.cloneElement(icon, { size: 18 })}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">{title}</p>
        <p className="text-sm text-white">{desc}</p>
      </div>
    </div>
  );
}