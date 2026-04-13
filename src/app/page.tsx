"use client";

import React from "react";
import HeroSplit from "@/components/ui/HeroSplit";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[#010810] text-white selection:bg-[#D4AF37] selection:text-[#010810]">
      
      {/* 1. INTERACTIVE HERO */}
      <HeroSplit />

      {/* 2. TRUST METRICS STRIP */}
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

      {/* 3. AS FEATURED IN / PARTNERS STRIP */}
      <section className="py-12 border-b border-white/5 opacity-60 hover:opacity-100 transition-opacity">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-8">
            Industry Recognition & Strategic Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale brightness-200 opacity-40">
            <div className="text-xl font-black italic tracking-tighter">NABH</div>
            <div className="text-xl font-bold tracking-tight">DIACARE</div>
            <div className="text-xl font-serif italic">MedicalWorld</div>
            <div className="text-xl font-sans font-bold border-2 border-white/40 px-2">ISN</div>
            <div className="text-xl font-mono tracking-tighter">HEALTH-GUJ</div>
          </div>
        </div>
      </section>

      {/* 4. SAAS PLATFORM CAPABILITIES */}
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

      {/* 5. FINAL CTA SECTION */}
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