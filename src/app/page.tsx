"use client";

import HeroSplit from "@/components/sections/HeroSplit";
import ProductInventory from "@/components/sections/ProductInventory";
import ServiceEcosystem from "@/components/sections/ServiceEcosystem"; // New Import

export default function Home() {
  return (
    <main className="relative bg-brand-dark">
      {/* Navigation */}
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
          <a href="#inventory" className="hover:text-brand-gold transition-colors">Products</a>
          <a href="#service" className="hover:text-brand-blue transition-colors">Service</a>
          <a href="#ai-tools" className="hover:text-white transition-colors">AI Tools</a>
          <a href="#consulting" className="hover:text-white transition-colors">Consulting</a>
        </div>

        <button className="glass px-5 py-2 rounded-full text-sm border-white/10 hover:bg-white/5 transition-all text-white">
          Client Login
        </button>
      </nav>

      <HeroSplit />

      <div className="w-full py-12 border-y border-white/5 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-30 hover:opacity-100 transition-opacity duration-700">
          <span className="text-xl font-bold italic tracking-tighter">SIEMENS</span>
          <span className="text-xl font-bold italic tracking-tighter">FRESENIUS</span>
          <span className="text-xl font-bold italic tracking-tighter">BAXTER</span>
          <span className="text-xl font-bold italic tracking-tighter">B. BRAUN</span>
          <span className="text-xl font-bold italic tracking-tighter">NIPRO</span>
        </div>
      </div>

      {/* Sales Flow */}
      <div id="inventory">
        <ProductInventory />
      </div>

      {/* Service Flow */}
      <ServiceEcosystem /> 

      {/* Placeholder for AI Tools & Infrastructure */}
      <div id="ai-tools" className="h-[50vh]" />
    </main>
  );
}