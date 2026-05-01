"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0A0F1C]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">

        {/* --- AUDIT-SIZED IMAGE LOGO --- */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 group">
          {/* Strict Image Container: 32px Mobile, 40px Desktop */}
          <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shrink-0">
            <Image 
              src="/logo.png" 
              alt="Innovate India Logo" 
              fill
              className="object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Logo Typography */}
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-black text-white tracking-[0.15em] uppercase leading-none">
              Innovate <span className="text-[#00A8A8]">India</span>
            </span>
            <span className="text-[8px] md:text-[9px] text-gray-500 font-bold tracking-[0.3em] uppercase mt-1">
              Sovereign Clinical OS
            </span>
          </div>
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/turnkey" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Infrastructure</Link>
          <Link href="/supply" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Supply Line</Link>
          <Link href="/clinical-os/technician-portal" className="text-xs font-bold text-gray-400 hover:text-[#00A8A8] uppercase tracking-widest transition-colors">OS Portal</Link>
          <Link href="/calculator" className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg text-xs font-black text-white hover:bg-white/10 uppercase tracking-widest transition-all">Yield Simulator</Link>
        </div>

        {/* --- MOBILE MENU TOGGLE --- */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0D1525] border-b border-white/10 py-6 px-6 flex flex-col gap-6 shadow-2xl">
          <Link href="/turnkey" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-gray-300 uppercase tracking-widest">Infrastructure</Link>
          <Link href="/supply" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-gray-300 uppercase tracking-widest">Supply Line</Link>
          <Link href="/clinical-os/technician-portal" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#00A8A8] uppercase tracking-widest">OS Simulator</Link>
          <Link href="/calculator" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#C6A85A] uppercase tracking-widest">Yield Simulator</Link>
        </div>
      )}
    </nav>
  );
}