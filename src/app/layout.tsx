import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. IMPORT GLOBAL STATE & COMPONENTS
import { InfraProvider } from "@/context/InfrastructureContext";
import { Navbar } from "@/components/ui/Navbar"; 
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 2. NEXT.JS 14 METADATA (SEO & Branding)
export const metadata: Metadata = {
  title: {
    default: "Innovate IndAI | Sovereign Infrastructure OS",
    template: "%s | Innovate IndAI",
  },
  description:
    "Institutional-grade Operating System for Dialysis Infrastructure. NPV/IRR modeling, Sigmoid occupancy simulations, and automated PM-JAY compliance.",
  keywords: [
    "Dialysis Project Report",
    "Dialysis ROI Calculator",
    "PM-JAY Dialysis Rates 2026",
    "Hospital Infrastructure Gujarat",
    "Lepu Medical Distributor India",
    "Dialysis Machine Procurement"
  ],
  authors: [{ name: "Ketan Parmar", url: "https://innovate-india.com" }],
};

// 3. NEXT.JS 14 VIEWPORT (Fixes the terminal warning)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#010810",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added data-scroll-behavior to fix Next.js scroll warning
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} font-sans bg-[#010810] text-white antialiased relative selection:bg-[#D4AF37] selection:text-black`}
      >
        {/* 4. GLOBAL STATE WRAPPER */}
        <InfraProvider>
          
          {/* GLOBAL BACKGROUND EFFECTS */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/5 blur-[140px] rounded-full" />
          </div>

          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENT AREA */}
          <main className="min-h-[calc(100vh-80px)] pt-[88px]">
            {children}
          </main>

          {/* ENTERPRISE FOOTER */}
          <footer className="border-t border-white/5 bg-[#010810] relative overflow-hidden mt-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              
              {/* BRANDING & AUTHENTICITY */}
              <div className="md:col-span-1">
                <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                    <Activity className="text-[#D4AF37]" size={20} />
                  </div>
                  <div>
                    <h1 className="font-black text-xl tracking-tight text-white leading-none">Innovate IndAI</h1>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mt-1 italic">Sovereign OS v7.0</p>
                  </div>
                </Link>
                <p className="text-xs text-gray-500 leading-relaxed">
                  The first unified capital-allocation and clinical operating system for dialysis infrastructure in the Global South.
                </p>
                <div className="mt-6 flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-emerald-500" /> ISO 9001:2026 Compliant Logic
                </div>
              </div>

              {/* ARCHITECTURE LINKS */}
              <div className="flex flex-col gap-4 text-xs">
                <span className="text-gray-600 uppercase text-[9px] font-black tracking-[0.2em] mb-2">Systems Architecture</span>
                <Link href="/tools" className="text-gray-400 hover:text-[#D4AF37] transition-all">Institutional DPR Engine</Link>
                <Link href="/capex" className="text-gray-400 hover:text-[#D4AF37] transition-all">Detailed CAPEX Audit</Link>
                <Link href="/service" className="text-gray-400 hover:text-[#D4AF37] transition-all">Predictive AMC Dashboard</Link>
                <Link href="/solutions" className="text-gray-400 hover:text-[#D4AF37] transition-all">Turnkey Deployment</Link>
              </div>

              {/* REGULATORY LINKS */}
              <div className="flex flex-col gap-4 text-xs">
                <span className="text-gray-600 uppercase text-[9px] font-black tracking-[0.2em] mb-2">Policy Framework</span>
                <Link href="#" className="text-gray-400 hover:text-white transition-all">PM-JAY GUV v4.2 Compliance</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-all">NABH Infrastructure Standards</Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-all">Clinical Risk Sensitivity Audit</Link>
              </div>

              {/* GLOBAL CONVERSION CTA */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black mb-2 tracking-tighter">Underwrite Your Project.</h3>
                  <p className="text-[10px] text-gray-500 mb-6 uppercase font-bold leading-tight">
                    Convert operational friction into recoverable EBITDA using our Sovereign Engine.
                  </p>
                </div>
                <Link href="/tools" className="w-full">
                  <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    Access Terminal <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-white/5 py-10 text-center flex flex-col items-center justify-center">
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.1em]">
                © {new Date().getFullYear()} Innovate IndAI — Specialized Healthcare Consultant & Authorized Lepu Medical Partner
              </p>
            </div>
          </footer>

        </InfraProvider>

        {/* 5. GLOBAL SCROLLBAR & FONT OVERRIDES */}
        <style dangerouslySetInnerHTML={{__html: `
          :root { --font-sans: ${inter.style.fontFamily}; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #010810; }
          ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.1); border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
          .font-sans { font-family: var(--font-sans), system-ui, sans-serif; }
        `}} />
      </body>
    </html>
  );
}