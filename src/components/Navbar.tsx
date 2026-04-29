"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <-- Added Image import
import { Menu, X, ChevronRight } from "lucide-react"; // <-- Removed Activity icon

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Capital Setup (CAPEX)", href: "/capex" },
    { name: "Risk Control", href: "/risk-control" }, 
    { name: "Turnkey Execution", href: "/turnkey" },
    { name: "Case Studies", href: "/success-stories" }, 
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0F1C]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- BRAND AUTHORITY (Official Logo) --- */}
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <Image 
            src="/logo.png" 
            alt="Innovate India - Smart Healthcare Solutions" 
            width={180} 
            height={55} 
            className="object-contain"
            priority // Forces immediate load so it doesn't pop in late
          />
        </Link>

        {/* --- DESKTOP ROUTING --- */}
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

        {/* --- MOBILE MENU TOGGLE --- */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      {isOpen && (
        <div className="md:hidden bg-[#0D1525] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl absolute w-full left-0 top-20">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-gray-300 uppercase tracking-widest py-3 border-b border-white/5 hover:text-[#C6A85A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/os" onClick={() => setIsOpen(false)}>
            <button className="w-full mt-4 bg-[#C6A85A] text-[#0A0F1C] px-6 py-4 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] shadow-lg flex justify-center items-center gap-2">
              Start Financial Assessment <ChevronRight size={16} />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}