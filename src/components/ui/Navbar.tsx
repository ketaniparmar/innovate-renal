"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Updated SaaS Navigation Structure
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "AI Planner", href: "/tools" }, // Pushed to priority #2
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/success-stories" },
    { name: "Infrastructure", href: "/sales" },
    { name: "Operations", href: "/service" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] backdrop-blur-xl bg-[#010810]/80 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#010810] font-bold text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            II
          </div>
          <span className="font-bold text-xl tracking-tighter text-white group-hover:text-[#D4AF37] transition-colors">
            Innovate IndAI
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-8 text-[10px] font-bold tracking-[0.15em] uppercase">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            const isPlanner = link.name === "AI Planner";
            return (
              <Link
                key={i}
                href={link.href}
                className={`transition-colors relative group py-2 flex items-center gap-1.5 ${
                  isActive ? "text-white" : isPlanner ? "text-[#D4AF37]" : "text-gray-400 hover:text-white"
                }`}
              >
                {isPlanner && <Zap size={12} className="animate-pulse" />}
                {link.name}
                <span className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                    isActive ? "w-full bg-[#D4AF37]" : "w-0 bg-white group-hover:w-full"
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/tools">
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              Generate DPR <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2 focus:outline-none">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#010810] border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={`block px-4 py-3.5 rounded-xl transition-colors text-xs font-bold tracking-widest uppercase ${
                    pathname === link.href ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/tools" className="block pt-4">
                <button className="w-full bg-[#D4AF37] text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  Generate Custom DPR <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}