"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  accentColor?: "gold" | "blue" | "white";
}

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  accentColor = "gold" 
}: GlassCardProps) {
  
  // Dynamic hover colors based on the journey
  const accentBorder = {
    gold: "rgba(212, 175, 55, 0.3)",
    blue: "rgba(59, 130, 246, 0.3)",
    white: "rgba(255, 255, 255, 0.2)"
  };

  return (
    <motion.div
      whileHover={hover ? { 
        translateY: -8, 
        borderColor: accentBorder[accentColor],
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
      } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "glass rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group",
        className
      )}
    >
      {/* Subtle Inner Highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}