"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Wrench, ChevronRight, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSplit() {
  const [hovered, setHovered] = useState<"sales" | "service" | null>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-brand-dark flex flex-col md:flex-row">
      {/* --- SALES SIDE --- */}
      <motion.div
        onMouseEnter={() => setHovered("sales")}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative flex-1 flex flex-col items-center justify-center transition-all duration-700 ease-in-out p-8 border-r border-white/5",
          hovered === "service" ? "md:flex-[0.5] opacity-40 blur-sm" : "md:flex-[1.5]"
        )}
      >
        {/* Background Accent for Sales */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-10 text-center space-y-6 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-goldLight text-xs font-medium uppercase tracking-widest"
          >
            <Zap size={14} /> Acquisition Suite
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            The Future of <span className="text-gradient-gold italic">Dialysis.</span>
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed">
            Equip your facility with world-class medical technology. From premium machines to full-scale hospital consulting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-brand-gold text-black font-bold rounded-full hover:bg-white transition-all flex items-center justify-center gap-2 group">
              Explore Inventory <ShoppingCart size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 glass rounded-full font-medium border-white/20 hover:bg-white/10 transition-all">
              Consultation
            </button>
          </div>
        </div>
      </motion.div>

      {/* --- SERVICE SIDE --- */}
      <motion.div
        onMouseEnter={() => setHovered("service")}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "relative flex-1 flex flex-col items-center justify-center transition-all duration-700 ease-in-out p-8",
          hovered === "sales" ? "md:flex-[0.5] opacity-40 blur-sm" : "md:flex-[1.5]"
        )}
      >
        {/* Background Accent for Service */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-transparent to-transparent opacity-50" />

        <div className="relative z-10 text-center space-y-6 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-xs font-medium uppercase tracking-widest"
          >
            <ShieldCheck size={14} /> Care Network
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
            Zero <span className="text-brand-blue">Downtime</span>.
          </h2>
          
          <p className="text-gray-400 text-lg leading-relaxed">
            Certified engineering, rapid AMC support, and AI-driven predictive maintenance for critical care infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-brand-blue text-white font-bold rounded-full hover:bg-white hover:text-brand-blue transition-all flex items-center justify-center gap-2 group">
              Book Service <Wrench size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
            <button className="px-8 py-4 glass rounded-full font-medium border-white/20 hover:bg-white/10 transition-all">
              AMC Plans
            </button>
          </div>
        </div>
      </motion.div>

      {/* Center Branding Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden md:block">
        <div className="w-20 h-20 rounded-full glass flex items-center justify-center border-white/20 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <span className="font-bold text-2xl tracking-tighter">IN</span>
        </div>
      </div>
    </section>
  );
}