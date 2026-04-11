"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Send, CheckCircle, Package, Wrench, ShieldCheck, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

type InquiryType = "purchase" | "service" | "amc" | "consumables";

export default function LeadCapture() {
  const [type, setType] = useState<InquiryType>("purchase");
  const [submitted, setSubmitted] = useState(false);

  const options = [
    { id: "purchase", label: "Equipment Purchase", icon: <Stethoscope size={18} />, color: "text-brand-gold" },
    { id: "service", label: "One-Time Repair", icon: <Wrench size={18} />, color: "text-brand-blue" },
    { id: "amc", label: "AMC Inquiry", icon: <ShieldCheck size={18} />, color: "text-brand-blue" },
    { id: "consumables", label: "Consumables", icon: <Package size={18} />, color: "text-brand-gold" },
  ];

  if (submitted) {
    return (
      <section className="py-24 px-6 flex justify-center">
        <GlassCard className="max-w-md w-full text-center p-12 border-brand-gold/30">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle className="mx-auto text-brand-gold mb-4" size={64} />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Request Received</h3>
          <p className="text-gray-400">An Innovate India specialist will contact you within 30 minutes.</p>
        </GlassCard>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 px-6 bg-brand-dark">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Partner with <br /><span className="text-gradient-gold">Innovate India.</span></h2>
            <p className="text-gray-400 text-lg mb-8">Whether you are setting up a new center or need world-class maintenance for existing infrastructure, we are ready to deploy.</p>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border-brand-gold/20 text-brand-gold">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Global Logistics</h4>
                  <p className="text-sm text-gray-500">Pan-India delivery and installation in 7 days.</p>
                </div>
              </div>
            </div>
          </div>

          <GlassCard className="border-white/5">
            <div className="mb-8">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">I am looking for:</p>
              <div className="grid grid-cols-2 gap-3">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setType(opt.id as InquiryType)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-bold transition-all",
                      type === opt.id 
                        ? "bg-white/10 border-brand-gold text-white" 
                        : "border-white/5 bg-white/5 text-gray-500 hover:border-white/20"
                    )}
                  >
                    <span className={type === opt.id ? opt.color : "text-gray-500"}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-gold outline-none transition-all" />
              <div className="grid grid-cols-2 gap-4">
                <input type="email" placeholder="Work Email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-gold outline-none transition-all" />
                <input type="tel" placeholder="Phone Number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-gold outline-none transition-all" />
              </div>
              <input type="text" placeholder="Hospital / Organization Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-gold outline-none transition-all" />
              <textarea placeholder="Tell us about your requirements..." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm h-32 focus:border-brand-gold outline-none transition-all" />
              
              <button className="w-full py-4 bg-brand-gold text-black font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 group">
                Submit Inquiry <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}