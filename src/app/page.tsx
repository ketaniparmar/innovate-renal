"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Cpu, Activity, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810] overflow-hidden">
      
      {/* GLOBAL NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-[#010810]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center font-bold text-[#010810]">
              II
            </div>
            <span className="font-bold text-xl tracking-tight">Innovate India</span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
            <Link href="/sales" className="hover:text-[#D4AF37] transition-colors">Sales</Link>
            <Link href="/service" className="hover:text-[#3B82F6] transition-colors">Service</Link>
            <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/tools" className="hover:text-white transition-colors">AI Tools</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tools" className="hidden lg:block text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors">
              Client Login
            </Link>
            <Link href="/contact">
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md">
                Get Quote
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* DUAL-ENTRY HERO SECTION */}
      <section className="relative h-screen pt-20 flex flex-col md:flex-row">
        {/* Left Side: SALES (Gold) */}
        <Link href="/sales" className="relative flex-1 group overflow-hidden border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center p-8 md:p-16 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md"
          >
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Activity size={14} /> Acquisition Suite
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              The Future of <br/> Dialysis.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Equip your facility with world-class medical technology. From premium Diacare dialyzers to full-scale hospital RO systems.
            </p>
            <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group-hover:gap-4 transition-all">
              Explore Equipment <ArrowRight size={16} />
            </div>
          </motion.div>
        </Link>

        {/* Right Side: SERVICE (Blue) */}
        <Link href="/service" className="relative flex-1 group overflow-hidden flex items-center justify-center p-8 md:p-16 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#3B82F6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-full max-w-md"
          >
            <p className="text-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <ShieldCheck size={14} /> Care Network
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Zero <br/> Downtime.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Certified engineering, rapid HDG-level breakdown repair, and AI-driven predictive maintenance for critical care infrastructure.
            </p>
            <div className="flex items-center gap-2 text-[#3B82F6] font-bold text-sm group-hover:gap-4 transition-all">
              View AMC Plans <ArrowRight size={16} />
            </div>
          </motion.div>
        </Link>

        {/* Center Orb (Decorative) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#010810] border border-white/10 rounded-full z-20 hidden md:flex items-center justify-center shadow-2xl backdrop-blur-xl">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">Select</span>
        </div>
      </section>

      {/* TRUST METRICS STRIP */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <div className="pt-4 md:pt-0">
            <h3 className="text-4xl font-extrabold text-white mb-2">100+</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Machines Installed</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-4xl font-extrabold text-white mb-2">50+</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Hospitals Served</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#3B82F6] mb-2">24/7</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3B82F6]">Service Support</p>
          </div>
        </div>
      </section>

      {/* SAAS PLATFORM CAPABILITIES */}
      <section className="py-32 max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-6">End-to-End Infrastructure</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Innovate India bridges the gap between global medical technology and local operational excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <motion.div whileHover={{ y: -8 }} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
            <Stethoscope className="text-[#D4AF37] mb-6" size={32} />
            <h3 className="text-xl font-bold mb-3">Equipment Supply</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Authorized distribution of Diacare machines, RO systems, and specialized consumables for modern clinical workflows.
            </p>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div whileHover={{ y: -8 }} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
            <ShieldCheck className="text-[#3B82F6] mb-6" size={32} />
            <h3 className="text-xl font-bold mb-3">Service & AMC</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Certified engineering, rapid breakdown repair, and predictive maintenance to guarantee zero operational downtime.
            </p>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div whileHover={{ y: -8 }} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm relative group overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <Cpu className="text-white mb-6" size={32} />
            <h3 className="text-xl font-bold mb-3">Smart Planning Tools</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Generate instant Detailed Project Reports (DPR) and estimate setup costs with our AI-driven SaaS calculators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="pb-32 px-6">
        <div className="max-w-[1280px] mx-auto bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-[#D4AF37]/10 blur-[120px] rounded-full z-0 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-6">Start Your Dialysis Project</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-8">Ready to architect your success?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                  Get Custom Quote
                </button>
              </Link>
              <Link href="/service">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-md">
                  Book Service
                </button>
              </Link>
            </div>
            <p className="mt-10 text-xs text-gray-500">
              Innovate India is an authorized distributor of Diacare Solutions in Gujarat.
            </p>
          </div>
        </div>
      </section>
      
    </div>
  );
}