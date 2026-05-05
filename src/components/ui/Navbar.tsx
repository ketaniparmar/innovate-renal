"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, Phone } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // PLAIN ENGLISH NAVIGATION
  const navLinks = [
    { name: "Turnkey Setup", href: "/turnkey" },
    { name: "Our Equipment", href: "/execution-partner/diacare" },
    { name: "Medical Supplies", href: "/supply" },
    { name: "Smart Software", href: "/clinical-os" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0F1C]/85 backdrop-blur-xl border-b border-white/10 shadow-lg">

      <div className="max-w-[1400px] mx-auto px-6 h-[88px] flex items-center justify-between">

        {/* 🔶 LOGO (RESTORED MASSIVE SIZE) */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Innovate India"
            width={300}
            height={90}
            className="object-contain h-[55px] md:h-[75px] w-auto transform origin-left transition-transform hover:scale-105"
            priority
          />
        </Link>

        {/* 🔷 NAV LINKS */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] hover:text-[#C6A85A] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 🔶 RIGHT SECTION (CONTACT & CTA) */}
        <div className="hidden lg:flex items-center gap-6">

          {/* 📞 RESTORED GOLDEN GLOW PULSING PHONE NUMBER */}
          <a
            href="tel:+919879576332"
            className="group flex items-center gap-2 text-xs xl:text-sm font-black text-[#C6A85A] transition-all duration-300 hover:scale-105"
          >
            <Phone
              size={16}
              className="animate-pulse drop-shadow-[0_0_8px_rgba(198,168,90,0.8)]"
            />
            <span className="tracking-widest animate-pulse drop-shadow-[0_0_8px_rgba(198,168,90,0.5)] group-hover:animate-none group-hover:drop-shadow-[0_0_15px_rgba(198,168,90,1)] transition-all">
              +91 98795 76332
            </span>
          </a>

          <Link href="/calculator">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-[0.18em] flex items-center gap-2 shadow-[0_0_15px_rgba(198,168,90,0.2)] hover:bg-[#D4B970] hover:scale-105 transition-all">
              Profit Calculator
              <ChevronRight size={14} />
            </button>
          </Link>

        </div>

        {/* 📱 MOBILE TOGGLE */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 📱 MOBILE PANEL */}
      {isOpen && (
        <div className="lg:hidden bg-[#0D1525] border-b border-white/5 p-6 flex flex-col gap-4 shadow-2xl absolute w-full left-0 top-[88px]">
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

          {/* Restored Mobile Pulse */}
          <a
            href="tel:+919879576332"
            className="flex items-center gap-2 text-sm font-black text-[#C6A85A] py-3 border-b border-white/5 animate-pulse drop-shadow-[0_0_8px_rgba(198,168,90,0.6)]"
          >
            <Phone size={16} /> +91 98795 76332
          </a>

          <Link href="/calculator" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-6 py-4 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] shadow-lg flex justify-center items-center gap-2 mt-2">
              Calculate Your Profit <ChevronRight size={16} />
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}