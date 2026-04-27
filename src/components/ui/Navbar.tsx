"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Menu, X, ChevronRight } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

const navLinks = [
  { name: "Capital Setup (CAPEX)", href: "/capex" },
  { name: "Risk Control", href: "/risk-control" }, // Changed from /risk
  { name: "Turnkey Execution", href: "/turnkey" },
  { name: "Case Studies", href: "/success-stories" }, // Changed from /success
];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0F1C]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* BRAND AUTHORITY */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-xl flex items-center justify-center group-hover:bg-[#C6A85A]/20 transition-all">
            <Activity className="text-[#C6A85A]" size={20} />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight text-white uppercase italic">
              Innovate India
            </h1>
            <p className="text-[9px] text-[#00A8A8] font-black uppercase tracking-widest">
              Hospital Advisory
            </p>
          </div>
        </Link>

        {/* DESKTOP ROUTING */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#C6A85A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <Link href="/os">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(198,168,90,0.2)]">
              Start Assessment <ChevronRight size={14} />
            </button>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1525] border-b border-white/5 p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-gray-300 uppercase tracking-widest py-2 border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/os" onClick={() => setIsOpen(false)}>
            <button className="w-full mt-4 bg-[#C6A85A] text-[#0A0F1C] px-6 py-3 rounded-lg text-[11px] font-black uppercase tracking-[0.2em]">
              Start Financial Assessment
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}