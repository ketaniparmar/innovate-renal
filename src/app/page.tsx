"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  ArrowRight,
  AlertTriangle,
  Building2,
  PackageCheck,
  Calculator,
  Server,
  TrendingUp,
  Activity,
  IndianRupee,
  Users
} from "lucide-react";

type Persona = "Nephrologist" | "Dialysis Technician" | "Hospital Owner / Investor";

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const [persona, setPersona] = useState<Persona>("Nephrologist");
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setShowStickyCTA(window.scrollY > window.innerHeight * 0.25);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const personaContent = {
    "Nephrologist": {
      title: "Safe Patient Care. Zero Infection Risk.",
      desc: "Our smart software automatically blocks mistakes, prevents cross-infections, and ensures every dialysis session follows strict medical protocols.",
      cta: "See How Our Software Works",
      href: "/clinical-os",
      icon: <Activity className="w-8 h-8" />
    },
    "Dialysis Technician": {
      title: "Manage Shifts Easily. No More Paperwork.",
      desc: "See your clear patient queue, machine status, and real-time alerts on one screen. No confusion, no double-booking, no paperwork errors.",
      cta: "View The Daily Dashboard",
      href: "/clinical-os/demo",
      icon: <Users className="w-8 h-8" />
    },
    "Hospital Owner / Investor": {
      title: "Fill Every Bed. Maximize Your Profit.",
      desc: "Stop losing money on empty machines and rejected PM-JAY claims. We help you track efficiency and convert every single session into pure profit.",
      cta: "Calculate Your Profit",
      href: "/calculator",
      icon: <IndianRupee className="w-8 h-8" />
    }
  };

  const ui = personaContent[persona];

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-hidden relative font-sans">

      {/* ===== STICKY STRIP ===== */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showStickyCTA ? 0 : -100 }}
        className="fixed top-24 left-0 w-full z-40 bg-[#0D1525]/80 backdrop-blur-2xl border-b border-white/10 py-3 px-6 hidden md:flex justify-between items-center shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-[#C6A85A]" />
          <p className="text-xs font-black uppercase tracking-widest text-white">
            Zero Infection Risk • Smooth Operations • Maximum Profit
          </p>
        </div>

        <Link href="/calculator">
          <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(198,168,90,0.4)] hover:bg-[#D4B970] transition-all">
            Calculate Profit
          </button>
        </Link>
      </motion.div>

      {/* ===== HERO ===== */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6">

        {/* BACKGROUND LIGHT (Golden Glow Emphasis) */}
        <motion.div style={{ y }} className="absolute inset-0 opacity-50 pointer-events-none z-0">
          <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-[#C6A85A]/15 blur-[160px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#C6A85A]/10 blur-[180px] rounded-full" />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="flex justify-center md:justify-start mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#C6A85A] shadow-[0_0_20px_rgba(198,168,90,0.15)]">
              Complete Dialysis Setup Partner · South Gujarat
            </div>
          </div>

          {/* ===== MASSIVE APPLE-STYLE GLASS CARDS ===== */}
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {(Object.keys(personaContent) as Persona[]).map((p) => {
              const isActive = persona === p;
              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`relative p-8 md:p-10 rounded-[2.5rem] border text-left transition-all duration-500 overflow-hidden group
                  ${
                    isActive
                      ? "border-[#C6A85A]/50 bg-[#C6A85A]/10 shadow-[0_20px_80px_rgba(198,168,90,0.25)] scale-[1.02] backdrop-blur-3xl"
                      : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 backdrop-blur-xl"
                  }`}
                >
                  {/* Internal Golden Glow for Active State */}
                  {isActive && (
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C6A85A]/30 blur-[60px] rounded-full pointer-events-none" />
                  )}

                  <div className={`mb-6 transition-colors duration-500 ${isActive ? "text-[#C6A85A]" : "text-gray-500 group-hover:text-gray-300"}`}>
                    {personaContent[p].icon}
                  </div>

                  <h3 className={`text-xl md:text-2xl font-black tracking-tight mb-2 transition-colors duration-500 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                    {p}
                  </h3>
                  
                  <p className={`text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${isActive ? "text-[#C6A85A]" : "text-gray-600"}`}>
                    {p === "Nephrologist" ? "Patient Care" : p === "Dialysis Technician" ? "Daily Operations" : "Profit & Business Growth"}
                  </p>
                </button>
              );
            })}
          </div>

          {/* ===== DYNAMIC CONTENT (INSTAGRAM-LIKE SMOOTH TRANSITION) ===== */}
          <div className="min-h-[250px] flex flex-col justify-center text-center md:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={persona}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                  {ui.title.split('. ')[0]}. <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">
                    {ui.title.split('. ')[1]}
                  </span>
                </h1>

                <p className="text-lg md:text-2xl font-medium text-gray-400 max-w-3xl mb-10 leading-relaxed mx-auto md:mx-0">
                  {ui.desc}
                </p>

                <Link href={ui.href}>
                  <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center md:justify-start gap-4 shadow-[0_20px_40px_rgba(198,168,90,0.3)] hover:scale-105 hover:bg-[#D4B970] transition-all w-full md:w-auto mx-auto md:mx-0">
                    {ui.cta}
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM / SOLUTION ===== */}
      <section className="py-24 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">

          <div className="p-12 md:p-16 rounded-[3rem] bg-red-950/10 border border-red-900/20 backdrop-blur-2xl shadow-2xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <AlertTriangle className="text-red-500" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                The Hidden Costs of Paper
              </h3>
            </div>

            <p className="text-base font-medium text-gray-400 mb-10 leading-relaxed">
              Dialysis profit margins are tight. If you rely on staff to manage schedules on paper, your center is losing money every single shift.
            </p>

            <ul className="space-y-6 text-base font-bold text-gray-300">
              <li className="flex items-start gap-4"><span className="text-red-500 mt-1 font-black">✕</span> 1 empty machine per shift = ₹1.8–2.5L lost every month.</li>
              <li className="flex items-start gap-4"><span className="text-red-500 mt-1 font-black">✕</span> Missing vitals on paper lead to 12%+ PM-JAY claim rejections.</li>
              <li className="flex items-start gap-4"><span className="text-red-500 mt-1 font-black">✕</span> Overworked staff make mistakes that cost you money and patient safety.</li>
            </ul>
          </div>

          <div className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#1A160C] border border-[#C6A85A]/20 backdrop-blur-2xl shadow-[0_30px_60px_rgba(198,168,90,0.05)]">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-full bg-[#C6A85A]/10 flex items-center justify-center border border-[#C6A85A]/20">
                <TrendingUp className="text-[#C6A85A]" size={24} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                The Complete Solution
              </h3>
            </div>

            <p className="text-base font-medium text-gray-400 mb-10 leading-relaxed">
              You own the hospital. We provide the complete setup, the medical supplies, and the smart software to make sure your center runs smoothly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/calculator"><MiniSystem icon={<Calculator />} title="Profit Calculator" desc="See your exact profit" /></Link>
              <Link href="/turnkey"><MiniSystem icon={<Building2 />} title="Hospital Setup" desc="NABH compliant setup" /></Link>
              <Link href="/supply"><MiniSystem icon={<PackageCheck />} title="Medical Supplies" desc="Locked wholesale prices" /></Link>
              <Link href="/clinical-os/technician-portal"><MiniSystem icon={<Server />} title="Smart Software" desc="Shift & billing control" /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniSystem({ icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-[#C6A85A]/40 transition-all duration-300 group cursor-pointer h-full shadow-lg hover:shadow-[0_10px_30px_rgba(198,168,90,0.15)]">
      <div className="flex items-center gap-3 mb-4 text-gray-400 group-hover:text-[#C6A85A] transition-colors duration-300">
        {React.cloneElement(icon, { size: 22 })}
        <h4 className="text-[11px] md:text-xs font-black uppercase tracking-widest text-white">{title}</h4>
      </div>
      <p className="text-xs md:text-sm font-medium text-gray-500">{desc}</p>
    </div>
  );
}