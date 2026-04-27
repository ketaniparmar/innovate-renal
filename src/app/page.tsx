"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, Landmark, ChevronRight } from "lucide-react";

export default function EntryGate() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] flex flex-col items-center justify-center p-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C] relative overflow-hidden">
      
      {/* Institutional Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C6A85A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 text-center animate-in fade-in zoom-in duration-700 mt-16">
        
        <div className="w-20 h-20 mx-auto bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(198,168,90,0.15)]">
          <Activity className="text-[#C6A85A]" size={36} />
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
          Doctor, before you invest <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-yellow-500">₹2–5 Crore</span> in a dialysis center...
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          Let’s make sure your center generates stable monthly income — not hidden losses.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16">
          <Link href="/os" className="w-full sm:w-auto">
            <button className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-[0_15px_30px_rgba(198,168,90,0.2)] flex items-center justify-center gap-3">
              Start Financial Assessment <ChevronRight size={18} />
            </button>
          </Link>
          <Link href="/start" className="w-full sm:w-auto">
            <button className="w-full bg-transparent border border-white/20 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
              Request Project Proposal
            </button>
          </Link>
        </div>

        {/* TRUST ANCHOR */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] pt-8 border-t border-white/5">
          <span className="flex items-center gap-2"><Landmark size={16} className="text-[#00A8A8]"/> Used for Bank Funding</span>
          <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#00A8A8]"/> Hospital Planning Standards</span>
          <span className="flex items-center gap-2"><Activity size={16} className="text-[#00A8A8]"/> Investor Discussions</span>
        </div>

      </div>
    </main>
  );
}