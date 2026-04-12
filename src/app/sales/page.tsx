"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Droplets, Box, Shield, ArrowRight, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

export default function SalesPage() {
  const categories = [
    {
      title: "Dialysis Machines",
      description: "High-performance systems engineered for accuracy, safety, and patient comfort. Built for modern clinical workflows.",
      icon: <Activity size={24} />,
      tags: ["Real-time Monitoring", "Ultrafiltration"],
    },
    {
      title: "RO Water Systems",
      description: "Multi-stage purification delivering ultrapure water meeting strict international dialysis safety standards.",
      icon: <Droplets size={24} />,
      tags: ["Bacterial Control", "Scalable LPH"],
    },
    {
      title: "Consumables",
      description: "Complete range of premium dialyzers, bloodlines, and fistula needles for uninterrupted operations.",
      icon: <Box size={24} />,
      tags: ["OEM Quality", "Reliable Supply"],
    },
    {
      title: "Disinfectants",
      description: "Dialysis-grade chemicals and disinfectants designed for strict microbial control and machine safety.",
      icon: <Shield size={24} />,
      tags: ["Compliance Ready", "Equipment Safe"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] pb-32 pt-24">
      
      {/* SALES HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-6 mb-24 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6">
            <Zap size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Equipment Procurement
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Advanced Clinical <br /> Technology.
          </h1>
          
          <p className="text-xl text-white font-medium mb-4">
            Innovate India is the authorized distributor of Diacare Solutions in the Gujarat region.
          </p>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-2xl">
            We bring globally trusted dialysis equipment, RO systems, and consumables directly to your facility—backed by local installation expertise and relentless service support.
          </p>
          
          <Link href="/contact">
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] flex items-center gap-3">
              Request Global Quote <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURED PRODUCT (The Flagship Highlight) */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-1 md:p-1 overflow-hidden relative group">
          {/* Animated Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent opacity-50" />
          
          <div className="relative bg-[#010810] rounded-[1.9rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
            
            {/* Left: Product Image Placeholder */}
            <div className="w-full lg:w-1/2 h-[400px] rounded-2xl bg-gradient-to-tr from-white/5 to-transparent border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />
              <Activity size={80} className="text-white/10 mb-4" />
              <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Diacare System Rendering</span>
            </div>

            {/* Right: Product Specs */}
            <div className="w-full lg:w-1/2">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-2 block">Flagship Series</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">Diacare Hemodialysis Workstation</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Engineered for high-volume hospitals and standalone centers. Delivers consistent clinical outcomes with intelligent monitoring, advanced ultrafiltration control, and emergency safety protocols.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Intelligent UI Interface",
                  "Energy-efficient Operation",
                  "Real-time Monitoring",
                  "Automated Safety Systems"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#D4AF37]" />
                    <span className="text-sm text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="text-white hover:text-[#D4AF37] text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2">
                Download Technical Specs <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES GRID */}
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Complete Infrastructure</h2>
            <p className="text-gray-400 max-w-xl">Everything required to build, scale, and supply a modern renal care facility.</p>
          </div>
          <Link href="/contact">
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md">
              Talk to Specialist
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-2xl backdrop-blur-sm group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity transform group-hover:scale-110 duration-500">
                {React.cloneElement(cat.icon as React.ReactElement, { size: 120 } as any)}
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors">
                {cat.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md">
                {cat.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {cat.tags.map((tag, idx) => (
                  <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Request Specifications <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}