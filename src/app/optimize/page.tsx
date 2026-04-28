import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Banknote, FileSearch, Settings, Activity, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Optimize Your Dialysis Center | Innovate India Advisory",
  description: "Reduce cost leakage, improve monthly profit stability, and prevent operational disruption in real market conditions.",
};

export default function OptimizationOverviewPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto animate-in fade-in duration-1000">
        
        {/* HERO SECTION */}
        <header className="text-center mb-16">
          <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-6">
            Operational Optimization System
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-[1.1]">
            Reduce Leakage. Improve Profit. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#D4B970]">Prevent Disruption.</span>
          </h1>
          <p className="text-lg text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
            You already run a dialysis center. The real question is not how to build—it is: <strong>"How do I reduce cost leakage, improve monthly profit stability, and prevent operational disruption in real market conditions?"</strong>
          </p>
          <Link href="/optimize/audit">
            <button className="bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all inline-flex items-center gap-3 shadow-xl">
              Analyze My Running Center <ArrowRight size={18} />
            </button>
          </Link>
        </header>

        {/* IMPORTANT ASSUMPTION FRAMEWORK */}
        <section className="bg-[#00A8A8]/5 border border-[#00A8A8]/20 p-8 rounded-[2.5rem] mb-20">
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-3">
            <ShieldCheck className="text-[#00A8A8]" /> Indian Market Benchmarks Applied
          </h2>
          <p className="text-sm text-gray-300 font-medium leading-relaxed mb-6">
            Most centers lose financial efficiency gradually. This system evaluates your center using actual market operating benchmarks. We separate <strong>Single-use compliant models</strong> (preferred in modern NABH/PM-JAY setups) from <strong>Controlled reuse models</strong> (legacy, highly restricted).
          </p>
        </section>

        {/* REAL MONTHLY COST STRUCTURE */}
        <h2 className="text-3xl font-black text-white mb-10 text-center">Real Monthly Cost Structure</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
            <h3 className="text-lg font-black text-white mb-4 text-[#C6A85A]">💉 Consumables (Most Critical Variable)</h3>
            <div className="space-y-4 text-sm text-gray-400 font-medium">
              <div className="bg-[#0A0F1C] p-4 rounded-xl border border-white/5">
                <p className="text-white font-bold mb-1">Single-Use Model (PMJAY-aligned)</p>
                <p>Bundle: Dialyser + Tubing + AVF + Protectors</p>
                <p className="text-[#00A8A8] font-black mt-2">👉 Benchmark: ~₹400 / session</p>
              </div>
              <div className="bg-[#0A0F1C] p-4 rounded-xl border border-white/5">
                <p className="text-white font-bold mb-1">Reuse Model (Legacy/Restricted)</p>
                <p>Higher processing, validation & risk overhead.</p>
                <p className="text-[#A6192E] font-black mt-2">👉 Benchmark: ~₹600+ / session</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
            <h3 className="text-lg font-black text-white mb-4 text-[#C6A85A]">🔧 Maintenance (AMC vs CMC)</h3>
            <div className="space-y-4 text-sm text-gray-400 font-medium">
              <div className="bg-[#0A0F1C] p-4 rounded-xl border border-white/5">
                <p className="text-white font-bold mb-1">AMC (Annual Maintenance)</p>
                <p>Basic servicing & preventive maintenance.</p>
                <p className="text-[#00A8A8] font-black mt-2">👉 ₹20,000 – ₹25,000 / machine / yr</p>
              </div>
              <div className="bg-[#0A0F1C] p-4 rounded-xl border border-white/5">
                <p className="text-white font-bold mb-1">CMC (Comprehensive)</p>
                <p>Full breakdown + parts + higher uptime.</p>
                <p className="text-[#C6A85A] font-black mt-2">👉 ₹42,000 – ₹45,000 / machine / yr</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
            <h3 className="text-lg font-black text-white mb-4 text-[#C6A85A]">🧾 Insurance (EEI)</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Equipment protection covers damage risk and partial financial loss events. It is typically ~1% of capital cost annually.
            </p>
            <p className="text-[#00A8A8] font-black mt-4 text-sm">👉 ₹7,000 – ₹8,000 / machine / yr</p>
          </div>

          <div className="bg-[#0D1525] border border-white/5 p-8 rounded-3xl">
            <h3 className="text-lg font-black text-white mb-4 text-[#C6A85A]">🏥 Staff & Facility Load</h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Staff costs are usually stable but often inefficiently allocated during low patient hours. Facility running costs include rent, compliance overhead, and electricity/RO water consumption.
            </p>
          </div>

        </div>

        {/* COST LEAKAGE ANALYSIS */}
        <section className="bg-[#A6192E]/5 border border-[#A6192E]/20 p-10 rounded-[3rem] mb-20">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <AlertTriangle className="text-[#A6192E]" /> Real-World Failure Points (Cost Leakage)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-bold mb-2">🔴 Consumable Inefficiency</h4>
              <p className="text-sm text-gray-400 font-medium">Procurement above market rate, mismatch between single-use vs reuse planning. Even ₹20–₹40 leakage per session destroys scale.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">🔴 Machine Downtime</h4>
              <p className="text-sm text-gray-400 font-medium">Missed sessions due to breakdown or weak AMC dependency. Every missed session = direct revenue loss.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">🔴 Insurance & Claim Delay</h4>
              <p className="text-sm text-gray-400 font-medium">Delayed submission cycles and documentation backlogs create cash flow instability even in profitable centers.</p>
            </div>
          </div>
        </section>

        {/* OUTCOME MESSAGE */}
        <section className="text-center">
          <h2 className="text-3xl font-black text-white mb-6">Profit Stability View</h2>
          <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto mb-10">
            After optimization, centers experience reduced consumable overspend, improved machine uptime, and faster reimbursement cycles. <strong>The outcome is more predictable monthly profit without increasing patient load.</strong>
          </p>
          <Link href="/optimize/audit">
            <button className="bg-white text-[#0A0F1C] px-12 py-6 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-gray-200 transition-all shadow-xl">
              Analyze My Running Center
            </button>
          </Link>
        </section>

      </div>
    </main>
  );
}