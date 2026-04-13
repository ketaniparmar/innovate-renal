"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Added Link import

interface OsButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "glass";
  onClick?: () => void;
  showIcon?: boolean;
  href?: string; // Added href capability
}

export function OsButton({ label, variant = "primary", onClick, showIcon = true, href }: OsButtonProps) {
  const baseStyles = "relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all overflow-hidden w-full cursor-pointer";
  
  const variants = {
    primary: "bg-gold text-background hover:bg-[#E5C158] shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-glow-gold",
    secondary: "bg-blue text-white hover:bg-[#4F8FF7] shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-glow-blue",
    glass: "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md"
  };

  const innerContent = (
    <>
      <span className="relative z-10">{label}</span>
      {showIcon && (
        <motion.span 
          className="relative z-10"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <ArrowRight size={16} />
        </motion.span>
      )}
    </>
  );

  // If an href is passed, render a Next.js Link with a motion.div
  if (href) {
    return (
      <Link href={href} className="w-full block">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${baseStyles} ${variants[variant]} group`}
        >
          {innerContent}
        </motion.div>
      </Link>
    );
  }

  // Otherwise, render a standard motion.button
  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} group`}
    >
      {innerContent}
    </motion.button>
  );
}