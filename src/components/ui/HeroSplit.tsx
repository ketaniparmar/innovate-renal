"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSplit() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  // Apple-style spring physics for ultra-smooth expansion
  const springConfig = { type: "spring", stiffness: 200, damping: 30 };

  return (
    <section className="relative w-full h-[calc(100vh-80px)] min-h-[600px] flex flex-col md:flex-row overflow-hidden bg-[#010810] border-b border-white/5">

      {/* CENTER LOGO MEDALLION */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center gap-4">
        <motion.div
          animate={{
            rotate: hoveredSide === "left" ? -10 : hoveredSide === "right" ? 10 : 0,
            scale: hoveredSide ? 1.1 : 1,
            boxShadow: hoveredSide === "left" 
              ? "0 0 50px rgba(212,175,55,0.4)" 
              : hoveredSide === "right" 
              ? "0 0 50px rgba(59,130,246,0.4)" 
              : "0 0 30px rgba(255,255,255,0.1)",
            borderColor: hoveredSide === "left" ? "#D4AF37" : hoveredSide === "right" ? "#3B82F6" : "rgba(255,255,255,0.2)"
          }}
          transition={springConfig}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20 flex items-center justify-center p-4 bg-[#010810] backdrop-blur-md relative overflow-hidden"
        >
          {/* Logo - Assuming /indai-icon.png exists in your public folder */}
          <div className="relative w-full h-full flex items-center justify-center">
             <Image
              src="/indai-icon.png"
              alt="Innovate IndAI Logo"
              fill
              className="object-contain p-2"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* LEFT SIDE (SALES - GOLD) */}
      <motion.div
        className="relative flex-1 h-full cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-center px-8 md:px-16 lg:px-24"
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{
          flex: hoveredSide === "left" ? 1.5 : hoveredSide === "right" ? 0.8 : 1,
          opacity: hoveredSide === "right" ? 0.3 : 1,
        }}
        transition={springConfig}
      >
        {/* Dynamic Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent opacity-50" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent"
          animate={{ opacity: hoveredSide === "left" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 w-full max-w-lg mx-auto md:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 backdrop-blur-md">
            <Zap size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Acquisition Suite
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tighter leading-[1.1]">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">
              Dialysis.
            </span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-md mb-10 leading-relaxed">
            Equip your facility with world-class medical technology. Authorized Diacare distribution and complete infrastructure planning.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/contact" className="z-20">
              <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Get Quote
              </button>
            </Link>
            <Link href="/sales" className="z-20">
              <button className="text-white hover:text-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center gap-2 group transition-colors">
                Explore Equipment
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE (SERVICE - BLUE) */}
      <motion.div
        className="relative flex-1 h-full cursor-pointer overflow-hidden flex flex-col justify-center px-8 md:px-16 lg:px-24"
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        animate={{
          flex: hoveredSide === "right" ? 1.5 : hoveredSide === "left" ? 0.8 : 1,
          opacity: hoveredSide === "left" ? 0.3 : 1,
        }}
        transition={springConfig}
      >
        {/* Dynamic Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#3B82F6]/10 via-transparent to-transparent opacity-50" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-bl from-[#3B82F6]/20 via-transparent to-transparent"
          animate={{ opacity: hoveredSide === "right" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 w-full max-w-lg mx-auto md:ml-auto md:mr-0 text-left md:text-right flex flex-col items-start md:items-end">
          
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 backdrop-blur-md">
            <ShieldCheck size={14} className="text-[#3B82F6]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6]">
              Care Network
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 tracking-tighter leading-[1.1]">
            Zero <br />
            <span className="text-white">Downtime.</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-md mb-10 leading-relaxed">
            Certified engineering, rapid HDG-level breakdown repair, and predictive AMC maintenance for critical infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-6 flex-row-reverse">
            <Link href="/contact" className="z-20">
              <button className="bg-[#3B82F6] hover:bg-blue-500 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                Book Repair
              </button>
            </Link>
            <Link href="/service" className="z-20">
              <button className="text-white hover:text-[#3B82F6] text-xs font-bold uppercase tracking-wider flex items-center gap-2 group transition-colors flex-row-reverse">
                AMC Plans
                <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

    </section>
  );
}