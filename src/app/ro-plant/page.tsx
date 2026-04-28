"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Droplets, ShieldAlert, CheckCircle2, FlaskConical } from "lucide-react";

export default function ROPlantPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#00A8A8] font-bold mb-4">Water Treatment Systems</p>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6 leading-tight">
              Clinical Grade <br/> RO Infrastructure.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              In dialysis, water is the primary consumable. Our RO systems are engineered for Indian groundwater conditions, maintaining TDS levels below 10 for absolute clinical safety.
            </p>
            
            <div className="space-y-4">
              {[
                "Double Pass Membrane System",
                "Automated Endotoxin Filters",
                "Real-time TDS & Conductivity Monitoring",
                "Hot Water Disinfection Capable"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-sm">
                  <CheckCircle2 size={18} className="text-[#00A8A8]" /> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#00A8A8]/10 blur-[100px] -z-10" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8">
                <FlaskConical size={32} className="text-[#C6A85A]" />
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Input Analysis</p>
                  <p className="text-xl font-bold text-white">850 TDS Tolerance</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "98%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#00A8A8] to-[#C6A85A]"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span>Input: Raw Water</span>
                  <span className="text-white">Purity Efficiency: 99.4%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* COMPLIANCE WARNING */}
        <div className="p-10 bg-[#A6192E]/10 border border-[#A6192E]/20 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
          <ShieldAlert className="text-[#A6192E] shrink-0" size={40} />
          <p className="text-sm font-medium text-gray-300">
            <strong className="text-white">NABH Compliance Alert:</strong> Poor water quality is the #1 cause of machine downtime and pyrogenic reactions. Our systems are pre-validated for NABH and ISO 23500 standards.
          </p>
        </div>

      </div>
    </main>
  );
}