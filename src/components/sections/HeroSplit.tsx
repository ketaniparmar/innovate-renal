"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export default function HeroSplit() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <section className="relative w-full h-[85vh] flex overflow-hidden bg-black mt-20">
      
      {/* --- CENTER LOGO MEDALLION --- */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center gap-4">
        <motion.div 
          animate={{ 
            rotate: hoveredSide === "left" ? -5 : hoveredSide === "right" ? 5 : 0,
            scale: hoveredSide ? 1.05 : 1
          }}
          transition={{ duration: 0.5, type: "spring" }}
          // PURE WHITE BACKGROUND FOR IndAI LOGO VISIBILITY
          className="w-28 h-28 rounded-full border-2 border-[#D4AF37] flex items-center justify-center p-3 shadow-[0_0_40px_rgba(212,175,55,0.4)] bg-white"
        >
          <Image 
            src="/indai-icon.png" 
            alt="Innovate IndAI" 
            width={90} 
            height={90} 
            style={{ width: 'auto', height: 'auto' }}
            className="object-contain drop-shadow-md"
            priority
          />
        </motion.div>
      </div>

      {/* --- LEFT SIDE: ACQUISITION / SALES --- */}
      <motion.div
        // REMOVED Tailwind 'flex-1' and added Framer Motion 'initial' to fix the terminal warning
        className="relative h-full cursor-pointer overflow-hidden border-r border-white/5"
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
        initial={{ flex: 1 }}
        animate={{
          flex: hoveredSide === "left" ? 1.5 : hoveredSide === "right" ? 0.8 : 1,
          opacity: hoveredSide === "right" ? 0.4 : 1,
          filter: hoveredSide === "right" ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1405] to-black z-0" />
        
        {/* FIXED: Watermark Image Performance Warnings */}
        <div className="absolute top-1/4 -left-20 z-0 pointer-events-none">
           <Image 
             src="/logo.png" 
             alt="watermark" 
             width={600} 
             height={200} 
             priority
             style={{ width: 'auto', height: 'auto' }}
             className="object-contain invert opacity-10" 
           />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-12 md:px-24">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 w-fit">
            <Zap size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
              Acquisition Suite
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 relative z-10">
            The Future of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">
              Dialysis.
            </span>
          </h1>
          
          <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-10 relative z-10">
            Equip your facility with world-class medical technology. From premium dialyzers to full-scale hospital consulting.
          </p>

          <div className="flex items-center gap-6 relative z-10">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all">
              Consultation
            </button>
            <button className="text-white hover:text-[#D4AF37] transition-colors font-bold text-sm flex items-center gap-2 group">
              Explore Inventory 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- RIGHT SIDE: SERVICE / AMC --- */}
      <motion.div
        // REMOVED Tailwind 'flex-1' and added Framer Motion 'initial' to fix the terminal warning
        className="relative h-full cursor-pointer overflow-hidden"
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
        initial={{ flex: 1 }}
        animate={{
          flex: hoveredSide === "right" ? 1.5 : hoveredSide === "left" ? 0.8 : 1,
          opacity: hoveredSide === "left" ? 0.4 : 1,
          filter: hoveredSide === "left" ? "blur(4px)" : "blur(0px)",
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-[#0a0f1a] to-black z-0" />
        
        {/* FIXED: Watermark Image Performance Warnings */}
        <div className="absolute bottom-1/4 -right-20 z-0 pointer-events-none">
           <Image 
             src="/logo.png" 
             alt="watermark" 
             width={600} 
             height={200} 
             priority
             style={{ width: 'auto', height: 'auto' }}
             className="object-contain invert opacity-10" 
           />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-end text-right px-12 md:px-24">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-500/30 bg-gray-500/10 w-fit">
            <ShieldCheck size={14} className="text-gray-300" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">
              Care Network
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 relative z-10">
            Zero <br />
            <span className="text-gray-300">
              Downtime.
            </span>
          </h1>
          
          <p className="text-gray-400 max-w-md text-lg leading-relaxed mb-10 text-right relative z-10">
            Certified engineering, rapid AMC support, and AI-driven predictive maintenance for critical care infrastructure.
          </p>

          <div className="flex items-center justify-end gap-6 flex-row-reverse relative z-10">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all">
              Request Service
            </button>
            <button className="text-white hover:text-gray-300 transition-colors font-bold text-sm flex items-center gap-2 group flex-row-reverse">
              AMC Plans 
              <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform rotate-180" />
            </button>
          </div>
        </div>
      </motion.div>

    </section>
  );
}