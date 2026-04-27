"use client";

import React from "react";
import Link from "next/link";
import { Server, Droplets, Zap, ShieldCheck, ChevronRight } from "lucide-react";

export default function CapexPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 px-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom duration-500">
        
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Doctor, where exactly is your <br/><span className="text-[#C6A85A]">₹2–5 Crore</span> investment going?
          </h1>
          <p className="text-lg text-gray-400 font-medium">
            This is not an expense — this is structured capital deployment to create an income-generating asset.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <InvestmentBlock 
            icon={<Server className="text-[#00A8A8]" size={28} />}
            title="1. Dialysis Machines"
            desc="Your primary income-generating asset. These require precision selection to ensure maximum clinical uptime and longevity."
          />
          <InvestmentBlock 
            icon={<Droplets className="text-[#00A8A8]" size={28} />}
            title="2. RO Plant & Water System"
            desc="Required for safe and compliant dialysis. We structure double-pass systems for high-TDS regions to prevent catastrophic machine failure."
          />
          <InvestmentBlock 
            icon={<ShieldCheck className="text-[#C6A85A]" size={28} />}
            title="3. Interiors & Civil Setup"
            desc="Structured for clinical patient flow, strict infection control, and seamless NABH compliance alignment."
          />
          <InvestmentBlock 
            icon={<Zap className="text-[#C6A85A]" size={28} />}
            title="4. Electrical & Backup"
            desc="Medical-grade UPS and isolation systems. Prevents mid-treatment interruptions and protects your sensitive motherboards from frying."
          />
        </div>

        <div className="bg-[#0D1525] border border-white/5 rounded-3xl p-10 text-center shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-4">Ready to structure your capital?</h3>
          <p className="text-gray-400 mb-8 font-medium">Evaluate your exact capacity and see your projected setup cost.</p>
          <Link href="/os">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all hover:bg-[#D4B970] inline-flex items-center gap-2 shadow-[0_10px_20px_rgba(198,168,90,0.15)]">
              Evaluate Your Project <ChevronRight size={16} />
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}

function InvestmentBlock({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[#0D1525] p-8 border border-white/5 rounded-[2rem] hover:border-white/10 transition-all shadow-lg">
      <div className="w-14 h-14 rounded-xl bg-[#0A0F1C] border border-white/5 flex items-center justify-center mb-6 shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}