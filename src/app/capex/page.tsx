import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ShieldCheck, UserCheck, Landmark, Server, ChevronDown } from "lucide-react";
import { Suspense } from "react";

// Dynamic Import for Partial Hydration
const CapexCalculator = dynamic(
  () => import("@/components/capex/CapexCalculator"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Dialysis Center Cost Calculator India | CAPEX & ROI Tool (2026)",
  description: "CFO-verified capital expenditure calculator for dialysis centers in India. Estimate ROI, machine costs, loan feasibility, and payback periods.",
  keywords: ["dialysis center cost calculator india", "dialysis machine price", "hospital capex planning", "dialysis center loan india", "medical equipment roi"],
};

export default function CapexPage() {
  const jsonLd = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the cost of setting up a dialysis center in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The setup cost for a dialysis center in India typically ranges from ₹1.5 Crore to ₹5 Crore, depending heavily on the fleet scale (usually 10 to 25 machines), the grade of the medical equipment, and the structural requirements for NABH compliance."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to recover the investment (ROI) for a dialysis clinic?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Using a risk-adjusted model that accounts for a 65% Year-1 patient ramp-up and a 12% operational inefficiency floor, a well-managed 15-machine dialysis center generally sees a capital payback period of 22 to 26 months."
          }
        },
        {
          "@type": "Question",
          "name": "What are the infrastructure requirements for a dialysis center?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Key requirements include medical-grade double-pass RO water plants (especially in high-TDS regions), specialized civil zoning to prevent cross-infection, and medical-grade UPS backups to protect machine motherboards."
          }
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 px-6 selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 🚀 TIER 1 FIX: SSR Visibility for Crawlers (Invisible to Users) */}
      <div className="sr-only">
        <h2>Dialysis Center Cost Estimate Reference</h2>
        <p>A standard 15-machine dialysis center setup in India typically requires a CAPEX of ₹3.2 Crore to ₹4.5 Crore. The stabilized payback period ranges from 22 to 26 months depending on the operational margin and NABH compliance infrastructure.</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16 animate-in fade-in duration-700">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            Dialysis Infrastructure <br/>
            <span className="text-[#C6A85A]">Capital Underwriting</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            Doctor, we do not model equipment as an expense. We model it as a <span className="text-white">structured medical asset</span> with a calculated yield, financing feasibility, and risk-adjusted payback period.
          </p>

          {/* 🚀 TIER 2 FIX: Real E-E-A-T Identity Signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-500 mb-8">
            <UserCheck size={16} className="text-[#00A8A8]" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Engineered by Ketan Parmar | Founder & Lead Infrastructure Consultant
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest border-l border-gray-700 pl-4">
              40+ Turnkey Projects Executed
            </span>
          </div>
        </header>

        {/* 🚀 TIER 1 FIX: Suspense Fallback for Dynamic Import */}
        <Suspense fallback={<div className="h-[600px] bg-[#0D1525] rounded-[3rem] border border-white/5 animate-pulse flex items-center justify-center text-gray-500 text-sm font-black uppercase tracking-widest">Loading Sovereign Engine...</div>}>
          <CapexCalculator />
        </Suspense>

        <section className="mt-32 grid md:grid-cols-12 gap-12 border-t border-white/5 pt-20">
          <div className="md:col-span-8 space-y-16">
            
            <article id="setup-costs">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Dialysis Center Cost in India (2026 Breakdown)</h2>
              <p className="text-gray-400 leading-relaxed font-medium mb-8">
                Capital expenditure for a modern dialysis unit is no longer just about machine procurement. 
                With shifting <strong>NABH compliance</strong> standards, hospital owners must account for the entire clinical ecosystem.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-3">Machine Cost Breakdown</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Depending on the grade (Standard vs. Premium), individual hemodialysis machines range from ₹6 Lakhs to ₹8.5 Lakhs. However, fleet procurement unlocks economies of scale.
                  </p>
                </div>
                <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <h3 className="text-lg font-bold text-white mb-3">RO Plant & Infrastructure</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Medical-grade RO plants, central gas pipelines, and specialized civil zoning form the non-linear portion of your CAPEX, requiring heavier initial investment that scales efficiently.
                  </p>
                </div>
              </div>
            </article>

            {/* 🚀 TIER 2 FIX: Financing / Loan Intent */}
            <article id="financing-loans">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Medical Equipment Financing & Bank Loans</h2>
              <p className="text-gray-400 leading-relaxed font-medium mb-6">
                Securing a loan for a dialysis center requires a Detailed Project Report (DPR) that banks can underwrite. PSU and private banks look closely at your Debt Service Coverage Ratio (DSCR). By locking in your CAPEX and operational inefficiency buffers using our calculator above, you can generate an investor-grade financial model that accelerates loan approvals.
              </p>
            </article>

            <article id="roi-payback">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">ROI & Payback Period for Dialysis Clinics</h2>
              <p className="text-gray-400 leading-relaxed font-medium mb-6">
                Our model utilizes a strict <strong>12% operational inefficiency floor</strong>. While standard spreadsheet models might suggest a highly optimistic 18-month payback, those models fail to account for reality.
              </p>
              <ul className="space-y-3 text-sm text-gray-400 mb-6 pl-4 border-l-2 border-[#00A8A8]">
                <li>• Staff attrition and technician downtime.</li>
                <li>• Patient acquisition and the typical 6–8 month ramp-up curve.</li>
                <li>• Consumable supply chain volatility.</li>
              </ul>
              <p className="text-gray-400 leading-relaxed font-medium">
                By factoring in these variables, a robust, risk-adjusted payback period typically settles between 22 and 26 months.
              </p>
            </article>
            
            {/* SEO FAQ Section */}
            <article id="faq" className="pt-8">
              <h2 className="text-3xl font-black text-white mb-8 tracking-tight">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <details className="group bg-[#0D1525] border border-white/5 rounded-2xl p-6 open:bg-white/[0.02] transition-all cursor-pointer">
                  <summary className="flex justify-between items-center font-bold text-white text-lg marker:content-none">
                    What is the cost of setting up a dialysis center in India?
                    <ChevronDown size={20} className="text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                    The setup cost typically ranges from ₹1.5 Crore to ₹5 Crore, depending heavily on the fleet scale (usually 10 to 25 machines), the grade of the medical equipment, and the structural requirements for NABH compliance.
                  </p>
                </details>
                <details className="group bg-[#0D1525] border border-white/5 rounded-2xl p-6 open:bg-white/[0.02] transition-all cursor-pointer">
                  <summary className="flex justify-between items-center font-bold text-white text-lg marker:content-none">
                    What are the mandatory NABH requirements for a dialysis unit?
                    <ChevronDown size={20} className="text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                    Key requirements include minimum space per bed, isolated washing areas, double-pass RO water systems (especially in high-TDS zones), and strictly defined zoning to prevent cross-infection among patients.
                  </p>
                </details>
              </div>
            </article>
          </div>

          <div className="md:col-span-4 space-y-8 sticky top-8 h-fit">
            <div className="bg-[#0D1525] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5"><Server size={100} /></div>
              <h3 className="text-xl font-black text-white mb-6 relative z-10">Compliance Checklist</h3>
              <ul className="space-y-4 relative z-10">
                <li className="flex gap-3 text-sm text-gray-400">
                  <ShieldCheck size={18} className="text-[#00A8A8] shrink-0" aria-label="NABH compliant infrastructure" />
                  <span><strong>NABH Ready:</strong> Layouts engineered for immediate accreditation readiness.</span>
                </li>
                <li className="flex gap-3 text-sm text-gray-400">
                  <Landmark size={18} className="text-[#00A8A8] shrink-0" aria-label="Bank funding ready" />
                  <span><strong>Bank Funding:</strong> Models structured for Indian PSU & private bank DPR formats.</span>
                </li>
              </ul>
            </div>

            <Link href="/risk-control" className="block p-8 bg-[#C6A85A]/10 border border-[#C6A85A]/20 rounded-[2.5rem] group hover:bg-[#C6A85A]/20 transition-all">
              <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-widest mb-2">Advance Funnel</p>
              <h4 className="text-xl font-black text-white group-hover:underline decoration-[#C6A85A]">
                Check Risk & Profit Stability →
              </h4>
            </Link>

            <Link href="/success-stories" className="block p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] group hover:bg-white/[0.05] transition-all">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">Proof of Execution</p>
              <h4 className="text-xl font-black text-white group-hover:underline decoration-white">
                View Turnkey Case Studies →
              </h4>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}