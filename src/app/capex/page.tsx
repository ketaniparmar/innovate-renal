import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ShieldCheck, UserCheck, Landmark, Server } from "lucide-react";

// Dynamic Import for Partial Hydration: Keeps the initial HTML pure for Google crawlers
const CapexCalculator = dynamic(
  () => import("@/components/capex/CapexCalculator"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Dialysis Center Setup Cost & CAPEX India | 2026 ROI Model",
  description: "CFO-verified capital expenditure model for dialysis centers in India. Calculate ROI, NABH infrastructure requirements, and payback periods.",
  keywords: ["dialysis center cost india", "hospital capex planning", "medical equipment roi", "innovate india renal care"],
};

export default function CapexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Dialysis CAPEX Calculator India",
    "description": "Professional hospital capital expenditure and ROI planning tool for renal infrastructure.",
    "areaServed": "IN",
    "serviceType": "Healthcare Investment Advisory",
    "provider": {
      "@type": "Organization",
      "name": "Innovate India",
      "location": "Surat, Gujarat, India"
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 px-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      {/* Google Entity Alignment (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        
        {/* --- SEO HEADER --- */}
        <header className="text-center mb-16 animate-in fade-in duration-700">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            Dialysis Infrastructure <br/>
            <span className="text-[#C6A85A]">Capital Underwriting</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            Doctor, we do not model equipment as an expense. We model it as a <span className="text-white">structured medical asset</span> with a calculated yield and risk-adjusted payback period.
          </p>

          {/* E-E-A-T Signals: Author Attribution */}
          <div className="flex items-center justify-center gap-3 text-gray-500 mb-8">
            <UserCheck size={16} className="text-[#00A8A8]" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Reviewed by Hospital Project Consultants | 40+ Turnkey Projects Executed
            </span>
          </div>
        </header>

        {/* --- THE INTERACTIVE ENGINE --- */}
        <CapexCalculator />

        {/* --- SEMANTIC SEO & ADVISORY CONTENT --- */}
        <section className="mt-32 grid md:grid-cols-2 gap-16 border-t border-white/5 pt-20">
          <div className="space-y-12">
            <div id="setup-costs">
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Dialysis Center Setup Cost in India (2026)</h2>
              <p className="text-gray-400 leading-relaxed font-medium">
                Capital expenditure for a modern dialysis unit is no longer just about machine procurement. 
                With shifting <strong>NABH compliance</strong> standards, infrastructure must account for 
                medical-grade RO plants, central gas pipelines, and infection-controlled zoning.
              </p>
            </div>

            <div id="roi-payback">
              <h2 className="text-3xl font-black text-white mb-4 tracking-tight">ROI & Payback Period for Dialysis Clinics</h2>
              <p className="text-gray-400 leading-relaxed font-medium">
                Our model utilizes a strict 12% operational inefficiency floor. While a standard 
                <strong>Dialysis ROI framework</strong> might suggest an 18-month payback, real-world 
                staff attrition and patient ramp-up volatility typically extend this to 22–26 months.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#0D1525] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Server size={100} /></div>
              <h3 className="text-xl font-black text-white mb-6 relative z-10">Infrastructure Requirements</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-3 text-sm text-gray-400">
                  <ShieldCheck size={18} className="text-[#00A8A8] shrink-0" />
                  <span><strong>NABH Compliance:</strong> Minimum space requirements and workflow separation to prevent cross-infection.</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-400">
                  <Landmark size={18} className="text-[#00A8A8] shrink-0" />
                  <span><strong>Bank Funding:</strong> Financial model is structured explicitly for Indian PSU and private bank DPR formats.</span>
                </li>
              </ul>
            </div>
            
            {/* Semantic Internal Linking */}
            <Link href="/risk-control" className="block p-8 bg-[#C6A85A]/10 border border-[#C6A85A]/20 rounded-[2.5rem] group hover:bg-[#C6A85A]/20 transition-all">
              <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-widest mb-2">Next Step</p>
              <h4 className="text-xl font-black text-white group-hover:underline decoration-[#C6A85A]">
                Dialysis Project Risk Analysis Framework →
              </h4>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}