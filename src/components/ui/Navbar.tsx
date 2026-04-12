"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Equipment", href: "/sales" },
    { name: "Service", href: "/service" },
    { name: "AI Tools", href: "/tools" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#010810]/70 border-b border-white/5">
      
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center text-[#010810] font-bold text-sm">
            II
          </div>
          <span className="font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
            Innovate India
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors relative group"
            >
              {link.name}

              {/* Hover underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#D4AF37] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              Get Quote <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#010810] border-t border-white/5"
          >
            <div className="px-6 py-6 space-y-4">
              
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}

              {/* MOBILE CTA */}
              <Link href="/contact" onClick={() => setOpen(false)}>
                <button className="w-full mt-4 bg-[#D4AF37] text-[#010810] py-3 rounded-full text-sm font-bold uppercase tracking-wider">
                  Get Quote
                </button>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}