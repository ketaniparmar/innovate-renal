import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

// FIX: Reverted to relative path to bypass tsconfig alias errors
import "./globals.css"; 

import { InfraProvider } from "@/context/InfrastructureContext";
import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// --- METADATA (CFO & Institutional Authority) ---
export const metadata: Metadata = {
  title: {
    default: "Sovereign OS v9.0 | Dialysis Infrastructure Underwriting",
    template: "%s | Innovate India",
  },
  description:
    "Institutional-grade financial planning for dialysis centers. Precise CAPEX modeling, EBITDA projections, and risk-hedged operational architecture.",
  keywords: [
    "Dialysis Infrastructure Underwriting",
    "Sovereign OS Dialysis",
    "Healthcare CAPEX Modeling",
    "Dialysis Project Report DPR",
    "PMJAY Revenue Optimization",
    "Medical Facility Financial Planning"
  ],
  authors: [{ name: "Innovate India", url: "https://innovate-india.com" }],
};

// --- VIEWPORT (Deep Navy Theme) ---
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F1C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans bg-[#0A0F1C] text-slate-200 antialiased relative selection:bg-[#C6A85A] selection:text-[#0A0F1C]`}
      >
        {/* GLOBAL STATE ENGINE */}
        <InfraProvider>

          {/* BRANDED BACKGROUND AMBIENCE */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[140px] rounded-full" />
            {/* Intelligence Teal Glow */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[140px] rounded-full" />
          </div>

          {/* NAVIGATION BAR */}
          <Navbar />

          {/* MAIN CONTENT AREA */}
          <main className="min-h-[calc(100vh-80px)] pt-[88px]">
            {children}
          </main>

          {/* INSTITUTIONAL FOOTER */}
          <footer className="border-t border-white/5 bg-[#0A0F1C] relative overflow-hidden mt-20">
            
            <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

              {/* BRAND ARCHITECTURE */}
              <div>
                <Link href="/" className="inline-block mb-8 transition-transform hover:scale-105">
                  <Image 
                    src="/logo.png" 
                    alt="Innovate India - Smart Healthcare Solutions" 
                    width={220} 
                    height={70} 
                    className="object-contain"
                  />
                </Link>

                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  We engineer medical infrastructure as high-yield financial systems. 
                  Providing institutional clarity for nephrologists and hospital owners.
                </p>

                <div className="mt-6 flex items-center gap-2 text-gray-600 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-[#00A8A8]" />
                  NABH & PM-JAY Compliance Audit
                </div>
              </div>

              {/* STRATEGIC TOOLS (Synchronized with new Funnel) */}
              <div className="flex flex-col gap-3 text-sm">
                <span className="text-gray-600 font-black uppercase tracking-widest text-[10px] mb-4">
                  Planning Hub
                </span>
                <Link href="/turnkey" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">
                  Turnkey Infrastructure
                </Link>
                <Link href="/execution-partner/diacare" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">
                  Execution Stack
                </Link>
                <Link href="/supply" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">
                  Recurring Revenue Engine
                </Link>
                <Link href="/calculator" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">
                  ROI Underwriting Engine
                </Link>
              </div>

              {/* COMPLIANCE STANDARDS */}
              <div className="flex flex-col gap-3 text-sm">
                <span className="text-gray-600 font-black uppercase tracking-widest text-[10px] mb-4">
                  Frameworks
                </span>
                <span className="text-gray-500 font-bold">PM-JAY v2.0 Guidelines</span>
                <span className="text-gray-500 font-bold">ESIC / CGHS Underwriting</span>
                <span className="text-gray-500 font-bold">AAMI Water Standards</span>
                <span className="text-gray-500 font-bold">Capital Risk Hedging</span>
              </div>

              {/* CONVERSION ENGINE CTA */}
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl group hover:border-[#C6A85A]/20 transition-all">
                <div>
                  <h3 className="text-lg font-black mb-3 text-white">
                    Operationalize Assets
                  </h3>
                  <p className="text-xs text-gray-500 mb-6 leading-relaxed font-medium">
                    Convert clinical uncertainty into predictable monthly yield through the Sovereign v9.0 Engine.
                  </p>
                </div>

                <Link href="/calculator">
                  <button className="w-full bg-[#C6A85A] text-[#0A0F1C] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#D4B970] transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)] group-hover:scale-[1.02]">
                    Start Underwriting <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </div>

            {/* COPYRIGHT BAR */}
            <div className="border-t border-white/5 py-10 text-center">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">
                © {new Date().getFullYear()} Innovate India — Healthcare Infrastructure Intelligence
              </p>
            </div>
          </footer>

        </InfraProvider>
      </body>
    </html>
  );
}