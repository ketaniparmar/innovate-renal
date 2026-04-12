import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Innovate India",
    template: "%s | Innovate India",
  },
  description:
    "Advanced dialysis infrastructure, AI-powered DPR tools, and certified Diacare service network across Gujarat.",
  keywords: [
    "Dialysis setup",
    "Hospital infrastructure",
    "DPR generator",
    "Dialysis machines India",
    "RO plant dialysis",
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
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[140px] rounded-full" />
        </div>

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="min-h-[calc(100vh-80px)] pt-20">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/5 bg-[#010810] relative overflow-hidden">
          
          {/* subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#D4AF37]/10 blur-[120px]" />

          <div className="max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center text-[#010810] font-bold text-sm">
                  II
                </div>
                <span className="font-bold text-lg">Innovate India</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Advanced dialysis infrastructure, AI-powered DPR systems, and
                zero-downtime service network across Gujarat.
              </p>
            </div>

            {/* NAV LINKS */}
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-gray-500 uppercase text-xs tracking-widest mb-2">
                Navigation
              </span>
              <Link href="/solutions" className="text-gray-400 hover:text-white">
                Solutions
              </Link>
              <Link href="/sales" className="text-gray-400 hover:text-white">
                Equipment
              </Link>
              <Link href="/service" className="text-gray-400 hover:text-white">
                Service
              </Link>
              <Link href="/tools" className="text-gray-400 hover:text-white">
                AI Tools
              </Link>
            </div>

            {/* CTA BLOCK */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-2">
                  Start Project
                </p>
                <h3 className="text-xl font-bold mb-4">
                  Build Your Dialysis Center
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Get a custom DPR and equipment plan within minutes.
                </p>
              </div>

              <Link href="/contact">
                <button className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-[#010810] py-3 rounded-full text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  Get Consultation <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-white/5 py-6 text-center text-xs text-gray-500">
            © 2026 Innovate India — Authorized Diacare Partner (Gujarat)
          </div>
        </footer>
      </body>
    </html>
  );
}