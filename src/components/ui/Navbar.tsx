"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { Menu, X, ChevronRight, Phone } from "lucide-react"; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // --- FUNNEL LINKS ---
  const navLinks = [
    { name: "Infrastructure", href: "/turnkey" },
    { name: "Execution Stack", href: "/execution-partner/diacare" },
    { name: "Supply Engine", href: "/supply" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0F1C]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- BRAND AUTHORITY (Logo - Size Increased) --- */}
        <Link href="/" className="flex items-center transition-transform hover:scale-105 py-1">
          <Image 
            src="/logo.png" 
            alt="Innovate India - Smart Healthcare Solutions" 
            width={500} 
            height={180} 
            className="object-contain w-auto h-[50px] md:h-[65px]" // Increased height for better visibility
            priority 
          />
        </Link>

        {/* --- DESKTOP ROUTING --- */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-[#C6A85A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {/* DIRECT CALL TO ACTION */}
          <div className="flex items-center gap-6 pl-4 border-l border-white/10">
            <a href="tel:+919879576332" className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-[#C6A85A] transition-colors group">
              <Phone size={14} className="group-hover:animate-pulse" /> +91 98795 76332
            </a>
            
            <Link href="/calculator">
              <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(198,168,90,0.2)]">
                Calculate ROI <ChevronRight size={14} />
              </button>
            </Link>
          </div>
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
          
          <a href="tel:+919879576332" className="text-xs font-bold text-[#C6A85A] py-3 border-b border-white/5 flex items-center gap-2">
            <Phone size={14} /> Call: +91 98795 76332
          </a>

          <Link href="/calculator" onClick={() => setIsOpen(false)}>
            <button className="w-full mt-4 bg-[#C6A85A] text-[#0A0F1C] px-6 py-4 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] shadow-lg flex justify-center items-center gap-2">
              Calculate Project ROI <ChevronRight size={16} />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}