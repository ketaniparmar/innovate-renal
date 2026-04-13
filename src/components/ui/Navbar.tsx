"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close mobile menu if the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "Equipment", href: "/sales" },
    { name: "Service", href: "/service" },
    { name: "AI Tools", href: "/tools" },
    { name: "Resources", href: "/resources/dialysis-cost-calculator-india" },
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
            Innovate India
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={i}
                href={link.href}
                className={`transition-colors relative group py-2 ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {link.name}

                {/* Hover / Active underline animation */}
                <span 
                  className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                    isActive ? "w-full bg-[#D4AF37]" : "w-0 bg-white group-hover:w-full"
                  }`} 
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              Get Quote <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Mobile Menu"
        >
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#010810] border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-2">
              
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={i}
                    href={link.href}
                    className={`block px-4 py-3.5 rounded-xl transition-colors text-xs font-bold tracking-widest uppercase ${
                      isActive ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* MOBILE CTA */}
              <Link href="/contact" className="block pt-4">
                <button className="w-full bg-[#D4AF37] text-[#010810] py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2">
                  Get Custom Quote <ArrowRight size={16} />
                </button>
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}