"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Building2, 
  PackageCheck, 
  ArrowRight,
  User,
  ShieldCheck
} from "lucide-react";
import { saveUserIntent } from "@/utils/intentTracker";

// --- STRICT TYPES ---
interface InfoRowProps {
  icon: React.ReactNode;
  title: string;
  desc: React.ReactNode;
}

export default function ContactPage() {
  const [formType, setFormType] = useState<"project" | "supply">("project");
  const [formData, setFormData] = useState({ name: "", hospital: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Log the conversion intent before routing
    saveUserIntent("action", `Submitted ${formType} Form`);
    
    const text = `*New Request: ${formType === "project" ? "Hospital Setup" : "Medical Supplies"}*%0A%0A*Name:* ${formData.name}%0A*Hospital:* ${formData.hospital}%0A*Details:* ${formData.message}`;
    
    setTimeout(() => {
      // Routes directly to the Innovate India WhatsApp line
      window.open(`https://wa.me/919879576332?text=${text}`, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 text-slate-200 overflow-x-hidden w-full relative selection:bg-[#C6A85A] selection:text-[#0A0F1C] font-sans">
      
      {/* Dynamic Background Glow */}
      <div className={`absolute top-20 right-[10%] w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none transition-colors duration-700 ${formType === "project" ? "bg-[#C6A85A]/10" : "bg-[#00A8A8]/10"}`} />
      <div className="absolute bottom-[-100px] left-[-10%] w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION: Plain English Positioning */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-in fade-in zoom-in duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8">
            Talk to the Founders
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-tight">
            Start Your <br/>
            <span className={`transition-colors duration-500 ${formType === "project" ? "text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]" : "text-[#00A8A8]"}`}>
              Dialysis Project.
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Skip the generic sales calls. Speak directly with us to plan your new hospital setup, order equipment, or fix your medical supply chain.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: CONTACT FORM (Glassmorphism Upgrade) */}
          <div className="lg:col-span-2 animate-in slide-in-from-bottom duration-500 delay-100">
            <div className="bg-[#0D1525]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              
              {/* Form Toggles */}
              <div className="flex bg-[#0A0F1C] p-2 rounded-2xl border border-white/5 mb-10 shadow-inner">
                <button
                  onClick={() => setFormType("project")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                    formType === "project" 
                      ? "bg-[#C6A85A] text-[#0A0F1C] shadow-[0_5px_20px_rgba(198,168,90,0.3)]" 
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Building2 size={16} /> New Hospital Setup
                </button>
                <button
                  onClick={() => setFormType("supply")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                    formType === "supply" 
                      ? "bg-[#00A8A8] text-white shadow-[0_5px_20px_rgba(0,168,168,0.3)]" 
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <PackageCheck size={16} /> Order Supplies
                </button>
              </div>

              {/* Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-[#C6A85A] transition-all shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">Hospital / Clinic Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.hospital} 
                      onChange={(e) => setFormData({...formData, hospital: e.target.value})} 
                      className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-[#C6A85A] transition-all shadow-inner" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-1">How can we help?</label>
                  <textarea 
                    required 
                    rows={4} 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    className="w-full bg-[#0A0F1C] border border-white/10 rounded-2xl py-4 px-5 text-sm font-bold text-white focus:outline-none focus:border-[#C6A85A] transition-all resize-none shadow-inner" 
                    placeholder={formType === "project" ? "I am planning to open a 15-bed dialysis center in Surat and need a cost estimate..." : "I want to get a quote for bulk dialyzers and fluids for my 10 machines..."} 
                  />
                </div>
                
                {/* CTA Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full mt-8 py-5 rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-70 ${
                    formType === "project" 
                      ? "bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] shadow-[0_15px_30px_rgba(198,168,90,0.2)] hover:scale-[1.02]" 
                      : "bg-[#00A8A8] hover:bg-teal-500 text-white shadow-[0_15px_30px_rgba(0,168,168,0.2)] hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting 
                    ? "Connecting to WhatsApp..." 
                    : formType === "project" ? "Discuss Project Details" : "Get Supply Pricing"
                  } 
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: CONTACT INFO & AUTHORITY */}
          <aside className="flex flex-col gap-6 animate-in slide-in-from-bottom duration-500 delay-200">
            
            {/* Direct WhatsApp Box (Bypass Form) */}
            <div className="bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-white/10 rounded-[2.5rem] p-8 text-center flex flex-col justify-center items-center flex-1 shadow-2xl group hover:border-[#25D366]/30 transition-all backdrop-blur-xl">
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mb-5 text-[#25D366] group-hover:scale-110 transition-transform">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">Fastest Response</h3>
              <p className="text-sm text-gray-400 mb-8 font-medium">Bypass the form entirely. Chat directly with us right now.</p>
              <a 
                href="https://wa.me/919879576332" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full"
                onClick={() => saveUserIntent("action", "Clicked Fast WhatsApp Chat")}
              >
                <button className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] py-4 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all">
                  Open WhatsApp Chat
                </button>
              </a>
            </div>

            {/* Regional HQ Card */}
            <div className="bg-[#0D1525]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl flex-1">
              <h3 className="text-xl font-black text-white mb-8 tracking-tight">Our Office</h3>
              <div className="space-y-6">
                <InfoRow 
                  icon={<User />} 
                  title="Director" 
                  desc={<>Ketankumar Parmar <br/><span className="text-xs text-gray-400 font-medium">Hospital Project Consultant</span></>} 
                />
                <InfoRow 
                  icon={<MapPin />} 
                  title="Gujarat HQ" 
                  desc={<>135, Soham Arcade, Nr. Baghban Circle, <br/>Green City Road, Pal, Surat 394510</>} 
                />
                <InfoRow 
                  icon={<Phone />} 
                  title="Direct Line" 
                  desc={<a href="tel:+919879576332" className="hover:text-[#C6A85A] transition-colors">+91 98795 76332</a>} 
                />
                <InfoRow 
                  icon={<Mail />} 
                  title="Email" 
                  desc={<a href="mailto:director@innovate-india.com" className="hover:text-[#C6A85A] transition-colors break-all">director@innovate-india.com</a>} 
                />
              </div>

              {/* Authority Badge */}
              <div className="mt-8 pt-8 border-t border-white/5 flex items-start gap-3">
                <ShieldCheck className="text-[#C6A85A] shrink-0 mt-0.5" size={18} />
                <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-widest">
                  Innovate India is the exclusive channel partner for DiaCare Solutions in South Gujarat.
                </p>
              </div>
            </div>

          </aside>
        </div>

        {/* --- BOTTOM: THE SOFT EXIT (Funnel Catcher) --- */}
        <div className="mt-24 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">
            Not ready to talk? Run your own numbers first.
          </p>
          <Link href="/calculator">
            <button className="bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-black hover:bg-white/10 transition-all flex items-center gap-3 mx-auto text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-lg">
              Calculate Your Profit <ArrowRight size={16}/>
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function InfoRow({ icon, title, desc }: InfoRowProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-[#C6A85A] mt-0.5">
        {React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
      </div>
      <div>
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{title}</p>
        <div className="text-sm font-bold text-gray-200 leading-snug">{desc}</div>
      </div>
    </div>
  );
}