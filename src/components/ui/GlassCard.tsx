// src/components/ui/GlassCard.tsx
"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  accent?: "gold" | "blue" | "none";
  className?: string;
  interactive?: boolean;
}

export function GlassCard({ children, accent = "none", className = "", interactive = false }: GlassCardProps) {
  const accentBorder = 
    accent === "gold" ? "group-hover:border-gold/30" : 
    accent === "blue" ? "group-hover:border-blue/30" : "";

  return (
    <motion.div 
      whileHover={interactive ? { y: -5 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative group rounded-3xl bg-glass-light border border-glass-border backdrop-blur-xl overflow-hidden shadow-glass-inset ${className} ${accentBorder}`}
    >
      {/* Subtle top gradient line based on accent */}
      {accent !== "none" && (
        <div className={`absolute top-0 left-0 w-full h-[2px] opacity-50 ${accent === "gold" ? "bg-gradient-to-r from-transparent via-gold to-transparent" : "bg-gradient-to-r from-transparent via-blue to-transparent"}`} />
      )}
      
      {/* Glow effect on hover */}
      {interactive && accent !== "none" && (
        <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none ${accent === "gold" ? "shadow-glow-gold" : "shadow-glow-blue"}`} />
      )}
      
      <div className="relative z-10 p-6 md:p-8">
        {children}
      </div>
    </motion.div>
  );
}