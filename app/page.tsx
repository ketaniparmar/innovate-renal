"use client";

import HeroSplit from "@/components/sections/HeroSplit";
import ProductInventory from "@/components/sections/ProductInventory";
import ServiceEcosystem from "@/components/sections/ServiceEcosystem";
import ServicePortal from "@/components/sections/ServicePortal";
import LeadCapture from "@/components/sections/LeadCapture";
import LiveChat from "@/components/ui/LiveChat";
import ServiceAreas from "@/components/sections/ServiceAreas";

export default function Home() {
  return (
    <main className="relative bg-brand-dark min-h-screen">
      {/* 1. Navigation - Floating Apple-style Nav */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            I
          </div>
          <span className="font-bold tracking-tight text-xl text-white">
            Innovate <span className="text-brand-gold">India</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#inventory" className="hover:text-brand-gold transition-colors uppercase tracking-widest text-[10px]">Products</a>
          <a href="#service" className="hover:text-brand-blue transition-colors uppercase tracking-widest text-[10px]">Service</a>
          <a href="#portal" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">Client Portal</a>
          <a href="#contact" className="hover:text-brand-gold transition-colors uppercase tracking-widest text-[10px]">Contact</a>
        </div>

        <button className="glass px-5 py-2 rounded-full text-[11px] font-bold border-white/10 hover:bg-white/5 transition-all text-white uppercase tracking-tighter">
          Client Login
        </button>
      </nav>

      {/* 2. Dual-Entry Hero (Sales vs Service) */}
      <HeroSplit />

      {/* 3. Trust Bar - Medical Partners */}
      <div className="w-full py-12 border-y border-white/5 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-30 hover:opacity-100 transition-opacity duration-700">
          <span className="text-xl font-bold italic tracking-tighter text-white">SIEMENS</span>
          <span className="text-xl font-bold italic tracking-tighter text-white">FRESENIUS</span>
          <span className="text-xl font-bold italic tracking-tighter text-white">BAXTER</span>
          <span className="text-xl font-bold italic tracking-tighter text-white">B. BRAUN</span>
          <span className="text-xl font-bold italic tracking-tighter text-white">NIPRO</span>
        </div>
      </div>

      {/* 4. Sales Section - Equipment & Machines */}
      <div id="inventory">
        <ProductInventory />
      </div>

      {/* 5. Service Section - Technical & AMC */}
      <div id="service">
        <ServiceEcosystem />
      </div>

      {/* 6. Operations Section - Service Tickets & CRM */}
      <div id="portal">
        <ServicePortal />
      </div>

      {/* 7. Regional SEO Section - Gujarat Coverage */}
      <ServiceAreas />

      {/* 8. Lead Generation - Contact & Purchase */}
      <div id="contact">
        <LeadCapture />
      </div>

      {/* 9. Footer */}
      <footer className="py-20 border-t border-white/5 text-center bg-black">
        <div className="mb-8 flex justify-center items-center gap-2">
           <div className="w-6 h-6 bg-brand-gold/20 rounded flex items-center justify-center font-bold text-brand-gold text-xs">I</div>
           <span className="font-bold text-white tracking-widest uppercase text-xs">Innovate India Renal Care</span>
        </div>
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">
          © 2026 Innovate India Dialysis Solutions. Precision Engineering for Life.
        </p>
      </footer>

      {/* 10. AI Concierge - Floating Chat */}
      <LiveChat />
    </main>
  );
}