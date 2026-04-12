"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Activity,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#010810] text-white overflow-hidden">

      {/* 🔹 TOP CLARITY STRIP */}
      <div className="text-center text-xs tracking-widest text-gray-500 py-2 border-b border-white/5">
        Dialysis Infrastructure • Equipment Supply • AMC & Maintenance • Gujarat
      </div>

      {/* 🔹 HERO SECTION (DUAL ENTRY) */}
      <section className="relative h-[calc(100vh-80px)] flex flex-col md:flex-row">

        {/* 🟡 SALES */}
        <Link href="/sales" className="relative flex-1 group border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center p-8 md:p-16">

          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 max-w-md"
          >
            <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Activity size={14} /> Acquisition Suite
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Build High-Performance <br />
              <span className="text-[#D4AF37]">Dialysis Infrastructure</span>
            </h1>

            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Authorized distribution of Diacare dialysis machines, RO systems,
              and critical consumables — optimized for cost, compliance, and
              long-term performance.
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Reduce setup cost and achieve faster ROI with optimized procurement.
            </p>

            <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group-hover:gap-4 transition-all">
              Explore Equipment <ArrowRight size={16} />
            </div>
          </motion.div>
        </Link>

        {/* 🔵 SERVICE */}
        <Link href="/service" className="relative flex-1 group flex items-center justify-center p-8 md:p-16">

          <div className="absolute inset-0 bg-gradient-to-bl from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 max-w-md"
          >
            <p className="text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <ShieldCheck size={14} /> Care Network
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Zero Downtime <br />
              <span className="text-[#3B82F6]">Guaranteed</span>
            </h1>

            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Certified engineering, rapid-response repair, and structured AMC
              programs designed to keep your dialysis unit running without interruption.
            </p>

            <p className="text-sm text-red-400 mb-6">
              Every hour of downtime impacts patient care and revenue.
            </p>

            <div className="flex items-center gap-2 text-[#3B82F6] font-bold text-sm group-hover:gap-4 transition-all">
              View AMC Plans <ArrowRight size={16} />
            </div>
          </motion.div>
        </Link>

        {/* CENTER BADGE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-28 h-28 bg-[#010810] border border-white/10 rounded-full shadow-xl backdrop-blur-xl text-center">
          <div>
            <p className="text-[8px] text-gray-500 uppercase">Authorized</p>
            <p className="text-xs font-bold">Diacare</p>
            <p className="text-[9px] text-gray-400">Gujarat</p>
          </div>
        </div>

      </section>

      {/* 🔹 TRUST METRICS */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-[#D4AF37]">100+</h3>
            <p className="text-xs text-gray-500">Machines Installed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#D4AF37]">50+</h3>
            <p className="text-xs text-gray-500">Hospitals Supported</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-[#3B82F6]">24/7</h3>
            <p className="text-xs text-[#3B82F6]">Service Coverage</p>
          </div>
        </div>
      </section>

      {/* 🔹 PLATFORM SECTION */}
      <section className="py-24 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Complete Renal Infrastructure Platform
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Combining global medical technology, local expertise, and AI-driven tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="p-8 border border-white/5 rounded-2xl">
            <Stethoscope className="text-[#D4AF37] mb-4" />
            <h3 className="text-xl font-bold mb-2">Equipment Supply</h3>
            <p className="text-sm text-gray-400">
              Authorized distribution of dialysis machines, RO systems, and consumables.
            </p>
          </div>

          <div className="p-8 border border-white/5 rounded-2xl">
            <ShieldCheck className="text-[#3B82F6] mb-4" />
            <h3 className="text-xl font-bold mb-2">Service & AMC</h3>
            <p className="text-sm text-gray-400">
              Preventive maintenance, repair, and uptime assurance.
            </p>
          </div>

          <div className="p-8 border border-white/5 rounded-2xl">
            <Cpu className="text-white mb-4" />
            <h3 className="text-xl font-bold mb-2">Smart Tools</h3>
            <p className="text-sm text-gray-400">
              DPR generation, cost estimation, and planning tools.
            </p>
          </div>

        </div>
      </section>

      {/* 🔹 WHO IT’S FOR */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Built for Healthcare Decision Makers
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Supporting hospital owners, nephrologists, investors, and dialysis operators with complete infrastructure solutions.
        </p>
      </section>

      {/* 🔹 CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Build or Optimize Your Dialysis Unit
          </h2>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold">
                Get Equipment Quote
              </button>
            </Link>

            <Link href="/service">
              <button className="border border-white/20 px-6 py-3 rounded-full">
                Book Service Inspection
              </button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Authorized Distributor of Diacare Solutions – Gujarat Region
          </p>
        </div>
      </section>

    </div>
  );
}