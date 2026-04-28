"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Activity, LineChart, Settings, 
  CheckCircle2, AlertTriangle, UserCheck, Briefcase, Server, HeartPulse,
  Monitor, Droplets, Package, Wrench
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] overflow-x-hidden">
      
      {/* 🟦 SECTION 1: HERO (The Decision Gate) */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center animate-in fade-in duration-1000">
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#00A8A8]/5 to-transparent pointer-events-none -z-10" />
        
        <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-6">
          Healthcare Infrastructure Operating System
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1] max-w-5xl">
          Build & Scale Dialysis Centers <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#D4B970]">Without the Guesswork.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl leading-relaxed mb-12">
          We help doctors and investors understand the exact capital required for new setups, procure equipment at OEM pricing, and plug financial leakage in existing operations.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-5 w-full max-w-2xl">
          <Link 
            href="/new-center" 
            className="flex-1 bg-[#C6A85A] text-[#0A0F1C] px-8 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(198,168,90,0.2)]"
          >
            <Server size={18} /> Plan a New Center
          </Link>
          <Link 
            href="/running-center" 
            className="flex-1 bg-[#0D1525] border border-[#00A8A8]/50 text-white px-8 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#00A8A8]/10 transition-all flex items-center justify-center gap-3"
          >
            <Activity size={18} /> Optimize Existing Center
          </Link>
        </div>
      </section>

      {/* 🟦 SECTION 2: TRUST STATEMENT */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <p className="text-sm font-bold text-gray-500 tracking-wide">
            Trusted by healthcare leaders to turn clinical vision into stable, income-generating reality.
          </p>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="flex items-center gap-6 opacity-70">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00A8A8]"><ShieldCheck size={16}/> NABH Ready</span>
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00A8A8]"><LineChart size={16}/> CFO Verified</span>
          </div>
        </div>
      </section>

      {/* 🔥 NEW SECTION 3: DIRECT REVENUE STRIP (Supply OS Fast-Lane) */}
      <section className="py-12 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Know exactly what you need?</h2>
            <p className="text-sm text-gray-400 font-medium mt-1">Bypass the advisory and go straight to procurement.</p>
          </div>
          <span className="inline-flex w-fit text-[10px] font-black text-[#C6A85A] uppercase tracking-widest bg-[#C6A85A]/10 px-4 py-1.5 rounded-full border border-[#C6A85A]/20">
            Direct Procurement Network
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Monitor size={22} className="text-[#00A8A8]" />, title: "Dialysis Machines", desc: "Compare models, pricing & ROI", href: "/machines", borderHover: "hover:border-[#00A8A8]/50", bgHover: "hover:bg-[#00A8A8]/5" },
            { icon: <Droplets size={22} className="text-[#00A8A8]" />, title: "Medical RO Plants", desc: "Double-pass water systems", href: "/ro-plant", borderHover: "hover:border-[#00A8A8]/50", bgHover: "hover:bg-[#00A8A8]/5" },
            { icon: <Package size={22} className="text-[#C6A85A]" />, title: "Consumables Supply", desc: "Kits @ ₹400 PMJAY benchmark", href: "/consumables", borderHover: "hover:border-[#C6A85A]/50", bgHover: "hover:bg-[#C6A85A]/5" },
            { icon: <Wrench size={22} className="text-[#A6192E]" />, title: "AMC / CMC Service", desc: "Prevent downtime & revenue loss", href: "/maintenance", borderHover: "hover:border-[#A6192E]/50", bgHover: "hover:bg-[#A6192E]/5" }
          ].map((item, i) => (
            <Link key={i} href={item.href} className={`bg-[#0D1525] p-6 rounded-2xl border border-white/5 transition-all duration-300 group ${item.borderHover} ${item.bgHover}`}>
              <div className="mb-4 bg-[#0A0F1C] w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-black text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🟦 SECTION 4: THE ADVISORY ENGINES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Building a center? You need clear answers.</h2>
          <p className="text-gray-400 font-medium">We map out the critical variables of your project before you deploy any capital.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Server size={32} className="text-[#00A8A8]" />, title: "1. Infrastructure Scale", desc: "How many dialysis machines actually make sense for your location, city tier, and operational budget?" },
            { icon: <Settings size={32} className="text-[#C6A85A]" />, title: "2. The Turnkey CAPEX", desc: "What is the complete, honest cost of setting up a safe dialysis center without hidden contractor leaks?" },
            { icon: <HeartPulse size={32} className="text-[#00A8A8]" />, title: "3. Clinical Operations", desc: "How do you plug financial leakage from machine downtime and consumable waste in your existing center?" }
          ].map((card, i) => (
            <div key={i} className="bg-[#0D1525] border border-white/5 p-10 rounded-[2.5rem] hover:border-white/10 transition-colors">
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-xl font-black text-white mb-3">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🟦 SECTION 5: FINANCIAL CLARITY */}
      <section className="py-24 px-6 bg-[#0D1525] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Understanding Your Investment</h2>
            <p className="text-gray-400 font-medium max-w-2xl mx-auto">We do not use confusing accounting jargon. Here is exactly how the money flows in a dialysis project.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-[#0A0F1C] border border-white/10 p-8 rounded-[2rem] shadow-xl hover:border-white/20 transition-all">
              <h3 className="text-sm font-black uppercase text-gray-500 tracking-widest mb-6 border-b border-white/5 pb-4">1. The Setup Cost (CAPEX)</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">Everything needed to open your doors safely and legally:</p>
              <ul className="space-y-4">
                {["Dialysis Machines & Beds", "Medical RO Water Plant", "Infection-Control Interiors", "Electrical & UPS Backups"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={16} className="text-[#00A8A8]"/> {li}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0A0F1C] border border-white/10 p-8 rounded-[2rem] shadow-xl hover:border-white/20 transition-all">
              <h3 className="text-sm font-black uppercase text-gray-500 tracking-widest mb-6 border-b border-white/5 pb-4">2. Monthly Run Cost (OPEX)</h3>
              <p className="text-sm text-gray-400 mb-6 font-medium">What it takes to keep the clinic operating every month:</p>
              <ul className="space-y-4">
                {["Clinical Staff Salaries", "Medical Consumables", "Electricity & Water", "Machine Upkeep & AMC"].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={16} className="text-[#C6A85A]"/> {li}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/30 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><LineChart size={100} /></div>
              <h3 className="text-sm font-black uppercase text-[#00A8A8] tracking-widest mb-6 border-b border-white/5 pb-4">3. Income & Profit</h3>
              <p className="text-sm text-gray-300 mb-6 font-medium">What comes in vs what remains after all expenses are paid.</p>
              <div className="bg-[#0A0F1C]/50 p-5 rounded-xl border border-white/5">
                <p className="text-xs text-gray-400 font-medium leading-relaxed">
                  Profit is the true "take-home" money. Once your monthly profits equal your initial Setup Cost, you have reached <span className="text-white font-bold">Capital Payback</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 6: RISK CLARITY */}
      <section className="py-24 px-6 bg-[#A6192E]/5 border-y border-[#A6192E]/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="bg-[#A6192E]/10 p-6 rounded-3xl shrink-0">
            <AlertTriangle size={48} className="text-[#A6192E]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Why Some Dialysis Centers Fail</h2>
            <p className="text-gray-300 leading-relaxed font-medium mb-4">
              Most failures are not due to a lack of patients. They happen because machines break down, water systems fail, or maintenance is ignored causing revenue leakage.
            </p>
            <p className="text-[#A6192E] font-bold text-sm uppercase tracking-widest">
              Our approach: We supply the hardware and design your center so operations remain stable and uninterrupted.
            </p>
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 7: FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Start your financial diagnostic.</h2>
          <p className="text-lg text-gray-400 font-medium mb-12">
            Select your current stage below to generate a highly accurate clinical and financial blueprint for your center.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/new-center" 
              className="flex-1 sm:flex-none bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              Plan a New Center <Server size={18} />
            </Link>
            <Link 
              href="/running-center" 
              className="flex-1 sm:flex-none bg-[#0D1525] border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-3"
            >
              Optimize Running Center <Activity size={18} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}