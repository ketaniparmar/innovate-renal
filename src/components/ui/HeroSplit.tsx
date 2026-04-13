"use client";

import { useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSplit() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  // GPU-Accelerated Mouse Tracking (Zero React Re-renders)
  const leftX = useMotionValue(0);
  const leftY = useMotionValue(0);
  const rightX = useMotionValue(0);
  const rightY = useMotionValue(0);

  const leftGlow = useMotionTemplate`radial-gradient(500px circle at ${leftX}px ${leftY}px, rgba(212,175,55,0.15), transparent 80%)`;
  const rightGlow = useMotionTemplate`radial-gradient(500px circle at ${rightX}px ${rightY}px, rgba(59,130,246,0.15), transparent 80%)`;

  const spring = { type: "spring" as const, stiffness: 300, damping: 40 };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden bg-[#010810] border-b border-white/5">

      {/* ================= CENTER MEDALLION ================= */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center gap-8">
        
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
          {/* Rotating Outer Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/10 border-dashed"
          />

          {/* Pulse Ring */}
          <div className="absolute inset-2 rounded-full border border-white/5 animate-ping" />

          {/* Core Medallion */}
          <motion.div
            animate={{
              rotate: hoveredSide === "left" ? -10 : hoveredSide === "right" ? 10 : 0,
              scale: hoveredSide ? 1.05 : 1,
              boxShadow:
                hoveredSide === "left"
                  ? "0 0 60px rgba(212,175,55,0.3)"
                  : hoveredSide === "right"
                  ? "0 0 60px rgba(59,130,246,0.3)"
                  : "0 0 40px rgba(0,0,0,0.8)",
              borderColor:
                hoveredSide === "left"
                  ? "rgba(212,175,55,0.8)"
                  : hoveredSide === "right"
                  ? "rgba(59,130,246,0.8)"
                  : "rgba(255,255,255,0.15)",
            }}
            transition={spring}
            className="relative w-full h-full rounded-full border flex items-center justify-center bg-[#010810]/80 backdrop-blur-xl overflow-hidden"
          >
            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
            
            <div className="relative w-[60%] h-[60%]">
              <Image
                src="/indai-icon.png"
                alt="IndAI Core"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* TRUST METRICS (Hidden on small mobile to prevent overlap) */}
        <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-[#010810]/60 px-6 py-2 rounded-full backdrop-blur-md border border-white/5">
          <div>120+ Centers</div>
          <div className="w-px h-full bg-white/10" />
          <div>₹50Cr+ Value</div>
          <div className="w-px h-full bg-white/10" />
          <div className="text-white">99.9% Uptime</div>
        </div>
      </div>

      {/* ================= LEFT SIDE (SALES) ================= */}
      <motion.div
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          leftX.set(e.clientX - rect.left);
          leftY.set(e.clientY - rect.top);
        }}
        animate={{
          flex: hoveredSide === "left" ? 1.4 : hoveredSide === "right" ? 0.85 : 1,
          opacity: hoveredSide === "right" ? 0.4 : 1,
        }}
        transition={spring}
        className="relative flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden border-b md:border-b-0 md:border-r border-white/5 cursor-pointer group"
      >
        {/* GPU Cursor Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ background: leftGlow, opacity: hoveredSide === "left" ? 1 : 0 }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent" />

        <div className="absolute top-8 left-8 md:left-auto md:right-8 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
          AI-Powered Planning
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto md:mx-0">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 transition-transform group-hover:scale-105">
            <Zap size={14} className="text-[#D4AF37] fill-[#D4AF37]/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Acquisition Suite
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6">
            Build Profitable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">
              Infrastructure.
            </span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-md leading-relaxed">
            AI-driven project planning, precise cost modeling, and turnkey execution for high-yield dialysis centers.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/tools" className="z-20">
              <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all">
                Get Project Cost
              </button>
            </Link>
            <Link href="/sales" className="z-20">
              <button className="text-white hover:text-[#D4AF37] flex items-center gap-2 text-xs font-bold uppercase tracking-widest group/btn transition-colors">
                Explore Equipment <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ================= RIGHT SIDE (SERVICE) ================= */}
      <motion.div
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          rightX.set(e.clientX - rect.left);
          rightY.set(e.clientY - rect.top);
        }}
        animate={{
          flex: hoveredSide === "right" ? 1.4 : hoveredSide === "left" ? 0.85 : 1,
          opacity: hoveredSide === "left" ? 0.4 : 1,
        }}
        transition={spring}
        className="relative flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 overflow-hidden cursor-pointer group"
      >
        {/* GPU Cursor Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ background: rightGlow, opacity: hoveredSide === "right" ? 1 : 0 }}
        />

        <div className="absolute inset-0 bg-gradient-to-bl from-[#3B82F6]/5 via-transparent to-transparent" />

        <div className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-widest text-[#3B82F6] border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-4 py-1.5 rounded-full backdrop-blur-sm">
          24/7 Operations
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto md:ml-auto md:mr-0 flex flex-col items-start md:items-end text-left md:text-right">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 transition-transform group-hover:scale-105">
            <ShieldCheck size={14} className="text-[#3B82F6]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6]">
              Care Network
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] mb-6">
            Keep Machines <br />
            <span className="text-white">Running.</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base mb-10 max-w-md leading-relaxed">
            Unbroken engineering support, zero-risk AMC contracts, and predictive maintenance protocols.
          </p>

          <div className="flex flex-wrap items-center justify-start md:justify-end gap-6 flex-row-reverse">
            <Link href="/contact" className="z-20">
              <button className="bg-[#3B82F6] hover:bg-blue-500 text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all">
                Request Engineer
              </button>
            </Link>
            <Link href="/service" className="z-20">
              <button className="text-white hover:text-[#3B82F6] flex items-center gap-2 text-xs font-bold uppercase tracking-widest flex-row-reverse group/btn transition-colors">
                AMC Plans <ArrowRight size={16} className="rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

    </section>
  );
}