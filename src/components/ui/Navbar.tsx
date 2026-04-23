"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ArrowRight, Activity } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ROUTING: Safely pointing directly to the tools page for Hostinger compatibility
  const navLinks = [
    { name: "DPR Engine", href: "/tools", icon: <Zap size={14} className="text-[#D4AF37]" /> },
    { name: "ROI Simulator", href: "/tools" }, 
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/success-stories" },
    { name: "AMC Intel", href: "/service" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-[#010810]/80 backdrop-blur-xl border-white/10 py-4 shadow-2xl" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
              <Activity className="text-[#D4AF37]" size={20} />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight text-white leading-none">Innovate IndAI</h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mt-1">Infrastructure OS</p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive ? "text-white" : "text-gray-500 hover:text-[#D4AF37]"
                  }`}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/tools"
              className="bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              Run ROI Model <ArrowRight size={14} />
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            aria-label="Toggle Menu"
            className="lg:hidden text-gray-400 hover:text-white p-2 z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#010810] pt-28 px-6 lg:hidden flex flex-col h-screen overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`flex items-center gap-3 text-lg font-black uppercase tracking-widest border-b border-white/5 pb-4 ${
                      isActive ? "text-[#D4AF37]" : "text-gray-400"
                    }`}
                  >
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-12 pb-12">
              <Link 
                href="/tools"
                className="w-full bg-[#D4AF37] hover:bg-yellow-500 transition-colors text-[#010810] py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
              >
                Run ROI Model <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}