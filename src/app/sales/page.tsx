"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Box,
  Shield,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard"; // Upgraded UI Component

export default function SalesPage() {
  const categories = [
    {
      title: "Hemodialysis Machines",
      description: "High-performance Diacare systems engineered for precision, safety, and long-term clinical reliability in high-volume centers.",
      icon: <Activity size={32} />,
      tags: ["Real-time Monitoring", "Ultrafiltration", "Patient Safety"],
    },
    {
      title: "Medical RO Water Systems",
      description: "Advanced multi-stage purification plants delivering ultrapure water meeting stringent AAMI/ISO dialysis compliance.",
      icon: <Droplets size={32} />,
      tags: ["Bacterial Control", "Medical Grade", "Scalable LPH"],
    },
    {
      title: "Dialysis Consumables",
      description: "Reliable bulk supply of high-flux dialyzers, bloodlines, and fistula needles ensuring uninterrupted hospital operations.",
      icon: <Box size={32} />,
      tags: ["OEM Quality", "High Flux", "Consistent Supply"],
    },
    {
      title: "Clinical Disinfectants",
      description: "Specialized dialysis-grade chemicals ensuring strict microbial control, decalcification, and equipment safety.",
      icon: <Shield size={32} />,
      tags: ["Compliance Ready", "Machine Safe", "Effective Cleaning"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#010810] text-white pt-32 pb-32 overflow-hidden">

      {/* 🔥 HERO: SEO-Optimized Header */}
      <header className="max-w-[1280px] mx-auto px-6 mb-20 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6 rounded-full backdrop-blur-md">
            <Zap size={14} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Authorized Diacare Distributor
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            Build Scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F1E5AC]">
              Dialysis Infrastructure.
            </span>
          </h1>

          <p className="text-xl text-gray-300 font-medium mb-6">
            Official Diacare procurement partner for the Gujarat region.
          </p>

          <p className="text-gray-400 text-base mb-10 max-w-2xl leading-relaxed">
            Get access to globally trusted hemodialysis machines, medical RO systems, and
            consumables — delivered with local expertise, technical installation, and
            long-term AMC support.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <button className="bg-[#D4AF37] text-[#010810] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-yellow-500 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Request Project Quote <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </motion.div>
      </header>

      {/* 📊 TRUST METRICS */}
      <section className="border-y border-white/5 bg-white/[0.02] mb-32">
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <div className="pt-4 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">100+</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Machines Installed</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">50+</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Hospitals Equipped</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#D4AF37] mb-2">10+</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Years Clinical Expertise</p>
          </div>
        </div>
      </section>

      {/* ⭐ FEATURED PRODUCT (Apple-Style Presentation) */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <GlassCard accentColor="gold" className="p-0 border-0 bg-gradient-to-br from-white/[0.05] to-transparent">
          <div className="flex flex-col lg:flex-row items-center gap-12 p-8 lg:p-16">
            <div className="lg:w-1/2">
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Flagship Hardware</span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
                Diacare Hemodialysis System
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Designed for high-efficiency dialysis centers. Engineered with intelligent monitoring, automated safety protocols, and consistent clinical output to maximize patient safety and operational ROI.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  "Real-time UF Monitoring",
                  "Energy Efficient Operation",
                  "Automated Disinfection",
                  "NABH Compliance Ready",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#D4AF37]" />
                    <span className="text-sm font-medium text-gray-300">{f}</span>
                  </div>
                ))}
              </div>

              <button className="text-[#D4AF37] hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                Download Technical Specs <ChevronRight size={16} />
              </button>
            </div>
            
            {/* Visual Placeholder for the Machine */}
            <div className="lg:w-1/2 w-full h-[400px] rounded-2xl bg-gradient-to-tr from-[#D4AF37]/10 to-transparent border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-transparent to-transparent opacity-50" />
                <Activity size={80} className="text-white/10" />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 🧩 PRODUCT CATEGORIES (Using GlassCard) */}
      <section className="max-w-[1280px] mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6">
            Complete Dialysis Ecosystem
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg">
            Procure everything required to build, scale, and operate a modern renal care center from a single authorized source.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <GlassCard key={index} accentColor="gold" className="flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-[#D4AF37]">
                {cat.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {cat.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-[#D4AF37] font-bold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Request Details <ArrowRight size={16} />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="mt-32 px-6">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-b from-[#D4AF37]/10 to-transparent border border-white/10 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">
            Ready to Build Your Dialysis Center?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Connect with our Gujarat engineering team for equipment pricing, RO plant sizing, and DPR generation.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <button className="bg-[#D4AF37] text-[#010810] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-yellow-500 transition-all">
                Get Custom Quote
              </button>
            </Link>
            <Link href="/service">
              <button className="bg-white/5 border border-white/20 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all">
                Explore AMC Services
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}