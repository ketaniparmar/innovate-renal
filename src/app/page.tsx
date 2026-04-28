import React from "react";
import Link from "next/link";
import { 
  ArrowRight, ShieldCheck, Activity, LineChart, Settings, 
  Droplets, Zap, CheckCircle2, AlertTriangle, UserCheck, Briefcase 
} from "lucide-react";

export const metadata = {
  title: "Innovate India | Dialysis Infrastructure & Investment Advisory",
  description: "We help doctors and investors understand the real cost, setup requirements, and earning potential of dialysis centers in simple, clear terms.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 selection:bg-[#C6A85A] selection:text-[#0A0F1C] overflow-x-hidden">
      
      {/* 🟦 SECTION 1: HERO (Decision Hook) */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center animate-in fade-in duration-1000">
        <div className="absolute top-0 w-full h-[500px] bg-gradient-to-b from-[#00A8A8]/5 to-transparent pointer-events-none -z-10" />
        
        <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-6">
          Healthcare Infrastructure Intelligence
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[1.1] max-w-5xl">
          Build a Reliable, Profitable Dialysis Center <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#D4B970]">Without the Guesswork.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl leading-relaxed mb-10">
          We help doctors and investors understand the real cost, setup requirements, and earning potential of dialysis centers in simple, clear terms.
        </p>
        
        <Link href="/os" className="group relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-[#C6A85A] blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
          <button className="relative bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all flex items-center gap-3">
            Start Project Evaluation <ArrowRight size={18} />
          </button>
        </Link>
      </section>

      {/* 🟦 SECTION 2: TRUST STATEMENT */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <p className="text-sm font-bold text-gray-500 tracking-wide">
            Trusted by healthcare leaders to turn clinical vision into stable, income-generating reality.
          </p>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="flex items-center gap-6 opacity-70">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00A8A8]"><ShieldCheck size={16}/> NABH Ready</span>
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00A8A8]"><LineChart size={16}/> CFO Verified</span>
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 3: CORE DECISION BLOCK */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Before You Invest, You Need Clear Answers.</h2>
          <p className="text-gray-400 font-medium">We map out the three critical variables of your project before you deploy any capital.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Activity size={32} className="text-[#00A8A8]" />, title: "1. The Right Size", desc: "How many dialysis machines actually make sense for your location, city tier, and operational budget?" },
            { icon: <Settings size={32} className="text-[#C6A85A]" />, title: "2. The Real Cost", desc: "What is the complete, honest cost of setting up a safe dialysis center without hidden contractor leaks?" },
            { icon: <LineChart size={32} className="text-[#00A8A8]" />, title: "3. Payback Time", desc: "How long before your center's monthly profit pays back your initial investment completely?" }
          ].map((card, i) => (
            <div key={i} className="bg-[#0D1525] border border-white/5 p-10 rounded-[2.5rem] hover:bg-white/[0.02] transition-colors">
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-xl font-black text-white mb-3">{card.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🟦 SECTION 4: THE DIALYSIS SETUP JOURNEY */}
      <section className="py-24 px-6 bg-[#0D1525] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center">How a Dialysis Center Becomes Operational</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Planning", desc: "We understand your location, footprint, and financial goals to structure the ideal scale." },
              { step: "02", title: "Setup Design", desc: "We architect the machines, double-pass RO water systems, and infrastructure." },
              { step: "03", title: "Safety Structuring", desc: "We lock in supply chains and maintenance to ensure zero-risk operations." },
              { step: "04", title: "Operations", desc: "You focus on treating patients. We ensure the business runs with stability." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <p className="text-[64px] font-black text-white/5 absolute -top-8 -left-4 pointer-events-none">{item.step}</p>
                <div className="relative z-10">
                  <h3 className="text-xl font-black text-white mb-3 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#C6A85A]" /> {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 5: FINANCIAL CLARITY */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Understanding Your Investment in Simple Terms</h2>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto">We do not use confusing accounting jargon. Here is exactly how the money flows in a dialysis project.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-[#0A0F1C] border border-white/10 p-8 rounded-[2rem] shadow-xl">
            <h3 className="text-sm font-black uppercase text-gray-500 tracking-widest mb-6 border-b border-white/5 pb-4">1. The Setup Cost</h3>
            <p className="text-sm text-gray-400 mb-6 font-medium">Everything needed to open your doors safely and legally:</p>
            <ul className="space-y-4">
              {["Dialysis Machines & Beds", "Medical RO Water Plant", "Infection-Control Interiors", "Electrical & UPS Backups"].map((li, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={16} className="text-[#00A8A8]"/> {li}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0A0F1C] border border-white/10 p-8 rounded-[2rem] shadow-xl">
            <h3 className="text-sm font-black uppercase text-gray-500 tracking-widest mb-6 border-b border-white/5 pb-4">2. Monthly Running Cost</h3>
            <p className="text-sm text-gray-400 mb-6 font-medium">What it takes to keep the clinic operating every month:</p>
            <ul className="space-y-4">
              {["Clinical Staff Salaries", "Medical Consumables", "Electricity & Water", "Machine Upkeep & AMC"].map((li, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white font-medium"><CheckCircle2 size={16} className="text-[#C6A85A]"/> {li}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#0D1525] to-[#121D33] border border-[#00A8A8]/30 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5"><LineChart size={100} /></div>
            <h3 className="text-sm font-black uppercase text-[#00A8A8] tracking-widest mb-6 border-b border-white/5 pb-4">3. Income & Profit</h3>
            <p className="text-sm text-gray-300 mb-6 font-medium">What comes in vs what remains after all expenses are paid.</p>
            <div className="bg-[#0A0F1C]/50 p-5 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Profit is the true "take-home" money. Once your monthly profits equal your initial Setup Cost, you have reached <span className="text-white font-bold">Capital Payback</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 6: RISK CLARITY */}
      <section className="py-24 px-6 bg-[#A6192E]/5 border-y border-[#A6192E]/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="bg-[#A6192E]/10 p-6 rounded-3xl shrink-0">
            <AlertTriangle size={48} className="text-[#A6192E]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Why Some Dialysis Centers Fail</h2>
            <p className="text-gray-300 leading-relaxed font-medium mb-4">
              Most failures are not due to a lack of patients. They happen because machines break down, water systems fail, or maintenance is ignored. 
            </p>
            <p className="text-[#A6192E] font-bold text-sm uppercase tracking-widest">
              Our approach: We design your center so operations remain stable and uninterrupted.
            </p>
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 7: USER SEGMENTATION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#0D1525] p-12 rounded-[3rem] border border-white/5 flex flex-col items-center text-center">
            <UserCheck size={40} className="text-[#00A8A8] mb-6" />
            <h3 className="text-2xl font-black text-white mb-4">For Doctors</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Focus entirely on treating patients and clinical excellence. We handle the setup clarity, cost planning, and ensure your operational structure is flawless.
            </p>
          </div>
          <div className="bg-[#0D1525] p-12 rounded-[3rem] border border-white/5 flex flex-col items-center text-center">
            <Briefcase size={40} className="text-[#C6A85A] mb-6" />
            <h3 className="text-2xl font-black text-white mb-4">For Investors</h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              Make confident decisions with full visibility. We provide the roadmap to predictable, recurring healthcare revenue with controlled risk.
            </p>
          </div>
        </div>
      </section>

      {/* 🟦 SECTION 8: FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to understand your project clearly?</h2>
          <p className="text-lg text-gray-400 font-medium mb-10">
            In just a few minutes, you can see what your dialysis center will realistically cost, earn, and return.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/os">
              <button className="w-full sm:w-auto bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-[#D4B970] transition-all flex items-center justify-center gap-3 shadow-xl">
                Start Project Evaluation <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/capex">
              <button className="w-full sm:w-auto bg-[#0D1525] border border-white/10 text-white px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-3">
                Calculate CAPEX <LineChart size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}