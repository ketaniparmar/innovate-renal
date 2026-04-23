"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ArrowRight, Activity, TrendingUp, Calculator } from "lucide-react";
import { useInfra } from "@/context/InfrastructureContext";
import { calculateV7Sovereign } from "@/lib/sovereign-engine";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode } = useInfra();

  const liveMetrics = useMemo(() => {
    return calculateV7Sovereign({ machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode });
  }, [machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- UPDATED NAV LINKS ---
  const navLinks = [
    { name: "DPR Engine", href: "/tools" },
    { name: "CAPEX Audit", href: "/capex" }, // New Link
    { name: "Solutions", href: "/solutions" },
    { name: "AMC Intel", href: "/service" },
  ];

  const formatCr = (val: number) => (val / 10000000).toFixed(2);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? "bg-[#010810]/80 backdrop-blur-xl border-white/10 py-3 shadow-2xl" : "bg-transparent border-transparent py-5"}`}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all">
              <Activity className="text-[#D4AF37]" size={20} />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight text-white leading-none">Innovate IndAI</h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mt-1 italic">Sovereign OS v7.0</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${pathname === link.href ? "text-[#D4AF37]" : "text-gray-500 hover:text-white"}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-2 hover:bg-white/[0.05] transition-all cursor-help group">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Enterprise Value</span>
              <span className="text-sm font-black text-white tracking-tighter tabular-nums group-hover:text-[#D4AF37] transition-colors">₹ {formatCr(liveMetrics.exitValue)} Cr</span>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1"><TrendingUp size={8} /> Project IRR</span>
              <span className="text-sm font-black text-emerald-400 tabular-nums">{liveMetrics.irr.toFixed(1)}%</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/tools" className="bg-white hover:bg-[#D4AF37] hover:text-black text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center gap-2">
              Access Terminal <ArrowRight size={14} />
            </Link>
          </div>

          <button className="lg:hidden text-gray-400 hover:text-white p-2 z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="fixed inset-0 z-40 bg-[#010810] pt-28 px-8 lg:hidden flex flex-col h-screen">
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className={`text-2xl font-black uppercase tracking-tighter ${pathname === link.href ? "text-[#D4AF37]" : "text-gray-500"}`}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto pb-12">
              <Link href="/tools" className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                Run Simulator <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}