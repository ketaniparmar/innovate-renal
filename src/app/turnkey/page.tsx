"use client";

import Link from "next/link";
import { CheckCircle2, Building2, AlertTriangle, ShieldCheck, TrendingUp, PhoneCall, Landmark } from "lucide-react";

export default function TurnkeyPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 px-6 md:px-12 py-24 relative overflow-hidden selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      
      {/* Institutional Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#C6A85A]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ---------------- HERO ---------------- */}
        <section className="text-center mb-24 animate-in fade-in zoom-in duration-700">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-[#C6A85A]/10 border border-[#C6A85A]/30 flex items-center justify-center shadow-[0_0_30px_rgba(198,168,90,0.15)]">
            <Building2 className="text-[#C6A85A]" size={40} />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
            Turnkey Dialysis Setup
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-yellow-500">
              Built as a Medical Asset
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Not just construction. Not just machines.  
            We engineer your dialysis center for <span className="text-white font-bold">predictable monthly income, controlled risk, and optimized OPEX.</span>
          </p>
        </section>

        {/* ---------------- RISK BLOCK ---------------- */}
        <section className="mb-24 animate-in slide-in-from-bottom duration-500 delay-100">
          <div className="bg-[#A6192E]/10 border border-[#A6192E]/20 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-8 flex items-center gap-4">
              <AlertTriangle className="text-[#A6192E]" size={32} />
              Why most dialysis projects fail financially
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300 font-medium">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#A6192E] font-black mt-0.5">•</span> CAPEX overspending without ROI planning
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A6192E] font-black mt-0.5">•</span> High downtime due to poor maintenance systems
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A6192E] font-black mt-0.5">•</span> Wrong patient mix and realization assumptions
                </li>
              </ul>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#A6192E] font-black mt-0.5">•</span> Uncontrolled variable consumable costs
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A6192E] font-black mt-0.5">•</span> Licensing delays and compliance gaps
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A6192E] font-black mt-0.5">•</span> No structured financial modeling prior to execution
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------- SYSTEM ---------------- */}
        <section className="mb-24 animate-in slide-in-from-bottom duration-500 delay-200">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-10 text-center">
            Our Turnkey System Covers Everything
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Clinical Layout Engineering (NABH-ready design)",
              "CAPEX Structuring & Machine Deployment",
              "Regulatory Licensing & Compliance Execution",
              "Staff Hiring + SOP Systemization",
              "OPEX Optimization via Centralized Supply Chain",
              "Predictive Maintenance & Risk Protection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-[#0D1525] p-6 md:p-8 rounded-2xl border border-white/5 hover:border-[#00A8A8]/30 transition-all shadow-lg">
                <CheckCircle2 className="text-[#00A8A8] shrink-0 mt-0.5" size={24} />
                <span className="text-base text-gray-300 font-bold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- PROOF ---------------- */}
        <section className="mb-24 animate-in slide-in-from-bottom duration-500 delay-300">
          <div className="bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <TrendingUp size={120} />
            </div>
            
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 relative z-10">
              <div className="p-2 bg-[#00A8A8]/10 rounded-lg border border-[#00A8A8]/20">
                <TrendingUp className="text-[#00A8A8]" size={24} />
              </div>
              Execution Snapshot
            </h3>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium relative z-10 max-w-3xl">
              18-machine dialysis center structured with optimized CAPEX, achieving 2.6 sessions/day utilization, 
              controlled consumable cost, and stable monthly income with <strong className="text-white">capital recovery within 14–18 months.</strong>
            </p>
          </div>
        </section>

        {/* ---------------- OUTCOME ---------------- */}
        <section className="mb-24 animate-in slide-in-from-bottom duration-500 delay-300">
          <div className="bg-[#0D1525] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-10 flex items-center gap-4">
              <ShieldCheck className="text-[#C6A85A]" size={32} />
              What this means for you
            </h3>

            <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-300">
              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <CheckCircle2 className="text-[#00A8A8] mb-4" size={28} />
                <span className="text-white text-lg font-black block mb-2">Stable Cashflow</span>
                <p className="font-medium text-gray-400 leading-relaxed">Designed for predictable revenue, not theoretical assumptions.</p>
              </div>

              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <CheckCircle2 className="text-[#00A8A8] mb-4" size={28} />
                <span className="text-white text-lg font-black block mb-2">Controlled Risk</span>
                <p className="font-medium text-gray-400 leading-relaxed">Predictive maintenance + insurance eliminate unexpected losses.</p>
              </div>

              <div className="bg-[#0A0F1C] p-6 rounded-2xl border border-white/5">
                <CheckCircle2 className="text-[#00A8A8] mb-4" size={28} />
                <span className="text-white text-lg font-black block mb-2">Clear ROI Visibility</span>
                <p className="font-medium text-gray-400 leading-relaxed">You know exactly when your initial capital investment returns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FUNNEL CTA ---------------- */}
        <section className="mb-20 animate-in slide-in-from-bottom duration-500 delay-300">
          <div className="grid md:grid-cols-3 gap-4">

            <Link href="/os">
              <button className="w-full h-full bg-[#00A8A8] hover:bg-teal-500 text-white py-5 px-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(0,168,168,0.15)] flex items-center justify-center gap-2">
                <Landmark size={16} /> Run Financial Assessment
              </button>
            </Link>

            <Link href="/opex">
              <button className="w-full h-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-5 px-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center">
                Understand OPEX
              </button>
            </Link>

            <Link href="/contact">
              <button className="w-full h-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-5 px-4 rounded-xl font-black text-[11px] uppercase tracking-widest flex justify-center items-center gap-2 transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)]">
                <PhoneCall size={16} />
                Talk to Consultant
              </button>
            </Link>

          </div>
        </section>

        {/* ---------------- CLOSING STATEMENT ---------------- */}
        <section className="text-center border-t border-white/10 pt-16 pb-8">
          <p className="text-2xl md:text-3xl text-white italic font-medium leading-relaxed">
            “This is not just a setup. <br />
            <span className="text-[#C6A85A] font-black not-italic mt-2 block">
              This is a structured, income-generating medical asset.
            </span>”
          </p>
        </section>

      </div>
    </main>
  );
}