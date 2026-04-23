import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// CRITICAL FIX: The Navbar MUST have curly braces here!
import { Navbar } from "@/components/ui/Navbar"; 

import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Innovate IndAI | Infrastructure OS",
    template: "%s | Innovate IndAI",
  },
  description:
    "Enterprise AI Operating System for Dialysis Infrastructure. Plan, simulate, and deploy dialysis centers with AI-powered DPR and predictive AMC.",
  keywords: [
    "Dialysis setup",
    "Hospital infrastructure",
    "Dialysis ROI Calculator",
    "Dialysis machines India",
    "RO plant dialysis",
    "NABH compliance dialysis"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-[#010810] text-white antialiased relative`}
      >
        {/* GLOBAL BACKGROUND EFFECTS */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[140px] rounded-full" />
        </div>

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="min-h-[calc(100vh-80px)] pt-[88px]">
          {children}
        </main>

        {/* ENTERPRISE FOOTER */}
        <footer className="border-t border-white/5 bg-[#010810] relative overflow-hidden mt-20">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

          <div className="max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            
            {/* BRANDING */}
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
                <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  <Activity className="text-[#D4AF37]" size={20} />
                </div>
                <div>
                  <h1 className="font-black text-xl tracking-tight text-white leading-none">Innovate IndAI</h1>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mt-1">Infrastructure OS</p>
                </div>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Advanced dialysis infrastructure intelligence. Run financial simulations, generate DPRs, and deploy clinical setups with zero-downtime service architectures.
              </p>
            </div>

            {/* NAV LINKS (Synchronized with Navbar) */}
            <div className="flex flex-col gap-4 text-sm md:pl-10">
              <span className="text-gray-600 uppercase text-[10px] font-bold tracking-widest mb-2">
                Platform Architecture
              </span>
              <Link href="/tools" className="text-gray-400 hover:text-[#D4AF37] transition-colors font-medium">
                DPR Engine & ROI Simulator
              </Link>
              <Link href="/solutions" className="text-gray-400 hover:text-[#D4AF37] transition-colors font-medium">
                End-to-End Solutions
              </Link>
              <Link href="/success-stories" className="text-gray-400 hover:text-[#D4AF37] transition-colors font-medium">
                Verified Case Studies
              </Link>
              <Link href="/service" className="text-gray-400 hover:text-[#D4AF37] transition-colors font-medium">
                Predictive AMC Intel
              </Link>
            </div>

            {/* HIGH-INTENT CTA BLOCK */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.2em] mb-3">
                  Capital Deployment
                </p>
                <h3 className="text-2xl font-black mb-3 tracking-tighter">
                  Secure Your ROI.
                </h3>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  Stop guessing. Get an audit-ready financial model and equipment deployment plan today.
                </p>
              </div>

              <Link href="/tools">
                <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  Run Financial Model <ArrowRight size={14} />
                </button>
              </Link>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-white/5 py-8 text-center flex flex-col items-center justify-center">
            <p className="text-xs text-gray-600 font-medium">
              © {new Date().getFullYear()} Innovate IndAI — Authorized Diacare & Lepu Medical Partner (Gujarat)
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}