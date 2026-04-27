import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { InfraProvider } from "@/context/InfrastructureContext";
import { Navbar } from "@/components/ui/Navbar";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// --- METADATA (Doctor/CFO Language) ---
export const metadata: Metadata = {
  title: {
    default: "Dialysis Center Financial Planning | Innovate India",
    template: "%s | Innovate India",
  },
  description:
    "Plan your dialysis center with complete financial clarity. Know your setup cost, monthly running cost, profit, and investment recovery timeline.",
  keywords: [
    "Dialysis Setup Cost India",
    "Dialysis Center Profit Calculation",
    "Dialysis Project Report DPR",
    "PMJAY Dialysis Revenue",
    "Dialysis AMC Cost",
    "Hospital Financial Planning"
  ],
  authors: [{ name: "Innovate India", url: "https://innovate-india.com" }],
};

// --- VIEWPORT ---
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
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} font-sans bg-[#010810] text-white antialiased relative selection:bg-[#D4AF37] selection:text-black`}
      >
        {/* GLOBAL STATE */}
        <InfraProvider>

          {/* BACKGROUND EFFECT */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/5 blur-[140px] rounded-full" />
          </div>

          {/* NAVBAR */}
          <Navbar />

          {/* MAIN */}
          <main className="min-h-[calc(100vh-80px)] pt-[88px]">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="border-t border-white/5 bg-[#010810] relative overflow-hidden mt-20">
            
            <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

              {/* BRAND */}
              <div>
                <Link href="/" className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center">
                    <Activity className="text-[#D4AF37]" size={20} />
                  </div>
                  <div>
                    <h1 className="font-black text-xl tracking-tight text-white">
                      Innovate India
                    </h1>
                    <p className="text-[10px] text-[#D4AF37] font-bold uppercase">
                      Dialysis Consultancy
                    </p>
                  </div>
                </Link>

                <p className="text-sm text-gray-400 leading-relaxed">
                  We help doctors and hospital owners plan dialysis centers with
                  clear numbers — from setup cost to monthly profit and risk protection.
                </p>

                <div className="mt-6 flex items-center gap-2 text-gray-500 text-xs font-bold">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  NABH & PMJAY aligned planning
                </div>
              </div>

              {/* WHAT YOU CAN PLAN */}
              <div className="flex flex-col gap-3 text-sm">
                <span className="text-gray-500 font-bold mb-2">
                  What You Can Plan
                </span>
                <Link href="/capex" className="text-gray-400 hover:text-white">
                  Dialysis Setup Cost
                </Link>
                <Link href="/tools" className="text-gray-400 hover:text-white">
                  Monthly Income & Profit
                </Link>
                <Link href="/service" className="text-gray-400 hover:text-white">
                  AMC & Maintenance Cost
                </Link>
                <Link href="/solutions" className="text-gray-400 hover:text-white">
                  Complete Dialysis Setup
                </Link>
              </div>

              {/* COMPLIANCE */}
              <div className="flex flex-col gap-3 text-sm">
                <span className="text-gray-500 font-bold mb-2">
                  Compliance & Safety
                </span>
                <span className="text-gray-400">PM-JAY Guidelines</span>
                <span className="text-gray-400">ESIC / CGHS Protocols</span>
                <span className="text-gray-400">Infection Control Standards</span>
                <span className="text-gray-400">Insurance & Risk Planning</span>
              </div>

              {/* CTA */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black mb-3">
                    Plan Your Dialysis Center
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    See your monthly income, running cost, and how fast you can recover your investment.
                  </p>
                </div>

                <Link href="/os">
                  <button className="w-full bg-[#D4AF37] text-black py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-yellow-500 transition">
                    Start Planning <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="border-t border-white/5 py-8 text-center">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Innovate India — Dialysis Consultancy & Infrastructure Planning
              </p>
            </div>
          </footer>

        </InfraProvider>

        {/* SCROLLBAR */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #010810; }
          ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }
        `,
          }}
        />
      </body>
    </html>
  );
}