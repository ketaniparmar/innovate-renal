import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 

import { InfraProvider } from "@/context/InfrastructureContext";
import { Navbar } from "@/components/ui/Navbar";
import Footer from "@/components/Footer"; // NOTE: Adjust if your Footer is inside /ui/

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// --- METADATA (CFO & Institutional Authority) ---
export const metadata: Metadata = {
  title: {
    default: "Innovate India | Dialysis Infrastructure Underwriting",
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
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[140px] rounded-full" />
          </div>

          {/* NAVIGATION BAR */}
          <Navbar />

          {/* MAIN CONTENT AREA */}
          <main className="min-h-[calc(100vh-80px)] pt-[88px]">
            {children}
          </main>

          {/* INSTITUTIONAL FOOTER */}
          <Footer />

        </InfraProvider>
      </body>
    </html>
  );
}