// src/components/ui/OsInput.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface OsInputProps {
  label: string;
  type?: "text" | "number";
  value: string | number;
  onChange: (val: string) => void;
  icon?: React.ReactNode;
}

export function OsInput({ label, type = "text", value, onChange, icon }: OsInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      <label className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isFocused ? "text-gold" : "text-gray-500"}`}>
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? "text-gold" : "text-gray-500"}`}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-background border rounded-xl py-3.5 outline-none transition-all duration-300 font-mono text-sm text-white ${icon ? "pl-12 pr-4" : "px-4"} ${isFocused ? "border-gold/50 shadow-glow-gold bg-surface" : "border-glass-border hover:border-white/20"}`}
        />
        {/* Animated focus indicator */}
        <motion.div 
          initial={false}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-gold origin-left rounded-b-xl"
        />
      </div>
    </div>
  );
}