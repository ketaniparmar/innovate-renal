"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { translateY: -5, borderColor: "rgba(212, 175, 55, 0.3)" } : {}}
      className={cn(
        "glass rounded-2xl p-6 transition-colors duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  );
}