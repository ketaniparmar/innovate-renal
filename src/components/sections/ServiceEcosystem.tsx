"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Activity, ShieldCheck, Clock, Drill, Zap, Bell } from "lucide-react";

export default function ServiceEcosystem() {
  return (
    <section id="service" className="py-24 px-6 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 blur-[120px] rounded-full" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mb-16">
          <h3 className="text-brand-blue font-mono tracking-widest text-sm uppercase mb-4">
            Technical Operations
          </h3>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Zero Downtime. <br />
            <span className="text-gray-500">Maximum Lifespan.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Beyond repairs, we provide a predictive ecosystem. Our engineers use AI diagnostics 
            to identify failures before they happen, keeping your dialysis unit operational 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: AI Monitoring Mockup */}
          <div className="lg:col-span-7">
            <GlassCard className="h-full border-brand-blue/20 bg-brand-blue/5 p-0 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-brand-blue animate-pulse" />
                  <span className="text-sm font-medium">Predictive Health Monitor (Live)</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                   {[
                     { label: "Pump Pressure", val: "102.4", status: "Optimal" },
                     { label: "Flow Rate", val: "500ml", status: "Stable" },
                     { label: "Filter Age", val: "84%", status: "Good" },
                     { label: "System Temp", val: "37.2°C", status: "Optimal" }
                   ].map((stat) => (
                     <div key={stat.label}>
                       <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">{stat.label}</p>
                       <p className="text-xl font-bold text-white">{stat.val}</p>
                       <p className="text-[10px] text-brand-blue">{stat.status}</p>
                     </div>
                   ))}
                </div>

                {/* Simulated Graph Area */}
                <div className="relative h-48 w-full bg-white/5 rounded-xl border border-white/5 flex items-end p-4 gap-2">
                    {[40, 70, 45, 90, 65, 80, 50, 70, 95, 60, 75, 85].map((h, i) => (
                        <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: i * 0.05 }}
                            className="flex-1 bg-brand-blue/40 rounded-t-sm hover:bg-brand-blue transition-colors cursor-help"
                        />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="glass px-4 py-2 rounded-lg border-brand-blue/30 text-xs font-bold text-brand-blue flex items-center gap-2">
                           <Bell size={14} /> AI Alert: Schedule Filter Swap in 48h
                        </div>
                    </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right: AMC Tiers */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4">
               {[
                 {
                   title: "Emergency Repair",
                   desc: "4-hour on-site response time nationwide.",
                   icon: <Zap className="text-brand-blue" />
                 },
                 {
                   title: "Comprehensive AMC",
                   desc: "Parts, labor, and monthly AI diagnostics included.",
                   icon: <ShieldCheck className="text-brand-blue" />
                 },
                 {
                   title: "Certified Engineers",
                   desc: "OEM-trained technicians with genuine spare parts.",
                   icon: <Activity className="text-brand-blue" />
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ x: 10 }}
                   className="glass p-6 rounded-2xl border-white/5 flex items-start gap-4 hover:bg-brand-blue/5 transition-all cursor-pointer"
                 >
                   <div className="p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/20">
                     {item.icon}
                   </div>
                   <div>
                     <h4 className="font-bold text-lg">{item.title}</h4>
                     <p className="text-sm text-gray-400">{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
            
            <button className="w-full py-5 rounded-2xl bg-brand-blue text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,122,255,0.4)] transition-all flex items-center justify-center gap-3">
               Request Service Support <Clock size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}