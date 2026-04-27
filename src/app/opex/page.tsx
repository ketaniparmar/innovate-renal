"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, Users, Zap, Wrench, ShieldCheck, ChevronRight } from "lucide-react";

export default function OperationalClarity() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 px-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <div className="max-w-5xl mx-auto">
        
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Doctor, let’s understand your <br/><span className="text-[#A6192E]">monthly operating cost.</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium">
            Controlling these variables is the exact difference between high monthly profit and silent capital loss.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <OpexBlock 
            icon={<Stethoscope className="text-[#00A8A8]" size={24} />}
            title="1. Clinical Consumables"
            desc="Dialyzers, tubing, and fluids. This is your highest variable cost per patient. Optimizing this supply chain yields the fastest margin increase."
          />
          <OpexBlock 
            icon={<Users className="text-[#C6A85A]" size={24} />}
            title="2. Staff Salaries"
            desc="Nephrologists, technicians, nurses, and support staff. Required to maintain patient safety and NABH compliance ratios."
          />
          <OpexBlock 
            icon={<Zap className="text-yellow-500" size={24} />}
            title="3. Electricity & RO Load"
            desc="The high-voltage draw of machines running 2-3 shifts daily, plus the continuous operation of the RO water filtration plant."
          />
          <OpexBlock 
            icon={<Wrench className="text-[#00A8A8]" size={24} />}
            title="4. Maintenance (AMC)"
            desc="Keeps machines running consistently. Skimping here guarantees catastrophic downtime leakage that far exceeds the cost of the contract."
          />
          <OpexBlock 
            icon={<ShieldCheck className="text-[#C6A85A]" size={24} />}
            title="5. Asset Insurance"
            desc="Protects against major financial loss from board failures, electrical surges, or environmental damage."
          />
        </div>

        <div className="bg-[#0D1525] border border-white/5 rounded-[2rem] p-10 text-center shadow-2xl">
          <h3 className="text-2xl font-black text-white mb-4">Calculate your exact OPEX burn rate.</h3>
          <p className="text-gray-400 mb-8">Run your parameters through the financial assessment to see your net margin.</p>
          <Link href="/os">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-[#D4B970] inline-flex items-center gap-3 shadow-[0_10px_20px_rgba(198,168,90,0.15)]">
              Evaluate Your Project <ChevronRight size={16} />
            </button>
          </Link>
        </div>

      </div>
    </main>
  );
}

function OpexBlock({ icon, title, desc }: any) {
  return (
    <div className="bg-white/[0.02] p-8 border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all flex gap-6 items-start">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-[#0A0F1C] border border-white/10 flex items-center justify-center shadow-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-black text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}