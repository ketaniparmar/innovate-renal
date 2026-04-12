import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

// 1. TYPOGRAPHY OPTIMIZATION
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 2. ENTERPRISE SEO METADATA
export const metadata: Metadata = {
  title: "Innovate India | Advanced Dialysis Infrastructure & AI Planning",
  description: "Authorized distributor of Diacare Solutions in Gujarat. Premium dialysis equipment, turnkey hospital setups, zero-downtime AMC contracts, and AI-driven DPR tools.",
  keywords: ["Dialysis Machine Gujarat", "Diacare Solutions Distributor", "RO Plant Hospital", "Turnkey Dialysis Setup", "HDG AMC Service", "Innovate India"],
  openGraph: {
    title: "Innovate India | Healthcare Infrastructure Platform",
    description: "Next-generation procurement, predictive maintenance, and AI feasibility tools for modern renal care facilities.",
    url: "https://innovate-india.com",
    siteName: "Innovate India",
    images: [
      {
        url: "https://innovate-india.com/og-image.jpg", // Add a premium dark-themed 1200x630 image here
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#010810] text-white antialiased min-h-screen flex flex-col selection:bg-[#D4AF37] selection:text-[#010810]`}>
        
        {/* GLOBAL CONTENT WRAPPER */}
        <main className="flex-1">
          {children}
        </main>

        {/* GLOBAL PREMIUM FOOTER */}
        <footer className="border-t border-white/5 bg-[#010810] pt-20 pb-10 relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              
              {/* Brand Col */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D4AF37] to-yellow-600 flex items-center justify-center font-bold text-[#010810]">
                    II
                  </div>
                  <span className="font-bold text-xl tracking-tight">Innovate India</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                  Architecting the future of renal care. From AI-driven feasibility reports to zero-downtime maintenance networks.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02]">
                  <ShieldCheck size={14} className="text-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                    Authorized Diacare Distributor
                  </span>
                </div>
              </div>

              {/* Links Col 1 */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Platform</p>
                <ul className="space-y-4">
                  <li><Link href="/sales" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">Acquisition Suite</Link></li>
                  <li><Link href="/service" className="text-sm text-gray-400 hover:text-[#3B82F6] transition-colors">Care Network (AMC)</Link></li>
                  <li><Link href="/solutions" className="text-sm text-gray-400 hover:text-white transition-colors">Turnkey Solutions</Link></li>
                  <li><Link href="/tools" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">AI Engine <span className="px-1.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[8px] font-bold uppercase">Beta</span></Link></li>
                </ul>
              </div>

              {/* Links Col 2 */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Connect</p>
                <ul className="space-y-4">
                  <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Request Quotation</Link></li>
                  <li><Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Emergency Support</Link></li>
                  <li><Link href="/client-portal" className="text-sm text-gray-400 hover:text-white transition-colors">Client Portal Login</Link></li>
                  <li><a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer" className="text-sm text-[#25D366] hover:text-green-400 transition-colors flex items-center gap-1">WhatsApp Chat <ArrowRight size={12}/></a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-600 font-medium">
                © {new Date().getFullYear()} Innovate India. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs text-gray-600 font-medium">
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}