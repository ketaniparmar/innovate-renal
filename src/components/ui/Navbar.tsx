"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap, ShieldCheck, Activity } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

// src/components/ui/Navbar.tsx (Updated Links)
const navLinks = [
  { name: "DPR Engine", href: "/tools", icon: <Zap size={12} /> },
  { name: "ROI Simulator", href: "/tools#simulator" },
  { name: "Solutions", href: "/solutions" },
  { name: "Case Studies", href: "/success-stories" },
  { name: "AMC Intel", href: "/service" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] backdrop-blur-md bg-[#010810]/80 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">

        {/* BRAND IDENTITY */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#010810] font-black text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            II
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tighter text-white group-hover:text-[#D4AF37] transition-colors leading-none">
              Innovate IndAI
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-bold mt-1">
              Infrastructure OS
            </span>
          </div>
        </Link>

        {/* JOURNEY-BASED NAV (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const isPlanner = link.name === "AI Planner";
            return (
              <Link
                key={i}
                href={link.href}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 flex items-center gap-1.5 ${
                  isActive 
                    ? "text-white" 
                    : isPlanner 
                      ? "text-[#D4AF37] hover:text-white" 
                      : "text-gray-500 hover:text-white"
                }`}
              >
                {link.icon && <span className={isPlanner ? "animate-pulse" : ""}>{link.icon}</span>}
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#D4AF37]" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* HIGH-INTENT PRIMARY ACTION */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/tools"
            className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
          >
            Run ROI Model <ArrowRight size={14} />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setOpen(!open)} 
          className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE JOURNEY OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#010810] border-t border-white/5 absolute top-20 left-0 w-full shadow-2xl"
          >
            <div className="px-6 py-10 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      pathname === link.href 
                        ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-white" 
                        : "bg-white/[0.02] border-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
                      {link.icon} {link.name}
                    </span>
                    <ArrowRight size={14} className="opacity-30" />
                  </Link>
                ))}
              </div>
              
              <div className="pt-6 border-t border-white/5">
                <Link 
                  href="/tools" 
                  className="w-full bg-[#D4AF37] text-[#010810] py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  Generate My DPR <Zap size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}