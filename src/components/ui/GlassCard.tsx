"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  accent?: "gold" | "blue" | "white" | "none"; // ADDED "white"
  className?: string;
  interactive?: boolean;
}

export function GlassCard({ children, accent = "none", className = "", interactive = false }: GlassCardProps) {
  const accentBorder = 
    accent === "gold" ? "group-hover:border-gold/30" : 
    accent === "blue" ? "group-hover:border-blue/30" : 
    accent === "white" ? "group-hover:border-white/30" : ""; // ADDED white logic

  return (
    <motion.div 
      whileHover={interactive ? { y: -5 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative group rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl overflow-hidden shadow-inner ${className} ${accentBorder}`}
    >
      {accent !== "none" && (
        <div className={`absolute top-0 left-0 w-full h-[2px] opacity-50 ${
          accent === "gold" ? "bg-gradient-to-r from-transparent via-gold to-transparent" : 
          accent === "blue" ? "bg-gradient-to-r from-transparent via-blue to-transparent" :
          "bg-gradient-to-r from-transparent via-white/40 to-transparent"
        }`} />
      )}
      
      {interactive && accent !== "none" && (
        <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none ${
          accent === "gold" ? "shadow-[0_0_20px_rgba(212,175,55,0.2)]" : 
          accent === "blue" ? "shadow-[0_0_20px_rgba(59,130,246,0.2)]" :
          "shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        }`} />
      )}
      
      <div className="relative z-10 p-6 md:p-8">
        {children}
      </div>
    </motion.div>
  );
}