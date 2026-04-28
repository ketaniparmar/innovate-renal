"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Server, ShieldCheck, Zap, ArrowRight, Activity } from "lucide-react";

const MACHINE_MODELS = [
  {
    brand: "Fresenius",
    model: "4008S NG",
    origin: "Germany",
    grade: "Institutional Standard",
    features: ["OCM (On-line Clearance Monitoring)", "DIASAFE plus filter", "Proven reliability"],
    color: "#00A8A8"
  },
  {
    brand: "Nipro",
    model: "Surdial X",
    origin: "Japan",
    grade: "Precision Engineering",
    features: ["User-friendly interface", "High-precision UF control", "Compact footprint"],
    color: "#C6A85A"
  },
  {
    brand: "B.Braun",
    model: "Dialog+",
    origin: "Germany",
    grade: "Premium Analytics",
    features: ["Adimea real-time monitoring", "Fully automated disinfection", "Advanced data networking"],
    color: "#00A8A8"
  }
];

export default function MachinesPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HERO SECTION */}
        <div className="mb-20 text-center md:text-left">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#C6A85A] font-bold mb-4">CAPEX Setup (Hardware)</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Institutional <br/> Hardware Selection.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            We provide procurement intelligence for global dialysis brands, ensuring your hardware choices align with local PMJAY realization rates and long-term AMC costs.
          </p>
        </div>

        {/* MACHINE GRID */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {MACHINE_MODELS.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 group hover:border-white/20 transition-all"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                  <Server size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                  {item.origin}
                </span>
              </div>
              
              <p className="text-[#C6A85A] text-xs font-black uppercase tracking-widest mb-1">{item.brand}</p>
              <h3 className="text-3xl font-black text-white mb-2">{item.model}</h3>
              <p className="text-xs text-gray-500 mb-6 font-bold">{item.grade}</p>
              
              <ul className="space-y-3 mb-8">
                {item.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                    <ShieldCheck size={14} className="text-[#00A8A8]" /> {f}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border border-white/5">
                Request Quotation
              </button>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="p-12 bg-gradient-to-br from-[#0D1525] to-[#121D33] rounded-[3rem] border border-[#C6A85A]/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black text-white mb-2">Unsure which machine fits your ROI?</h2>
            <p className="text-gray-400">Our Advisory OS can simulate different hardware CAPEX impacts on your EBITDA.</p>
          </div>
          <Link href="/os" className="bg-[#C6A85A] text-[#0A0F1C] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg flex items-center gap-2">
            Run ROI Simulation <ArrowRight size={16}/>
          </Link>
        </div>

      </div>
    </main>
  );
}