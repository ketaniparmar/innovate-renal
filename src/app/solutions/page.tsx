"use client";

import { motion } from "framer-motion";
import { Building2, Cpu, HardHat, Activity, FileSpreadsheet, LineChart, ArrowRight, CheckCircle2, Calculator } from "lucide-react";
import Link from "next/link";

export default function SolutionsPage() {
  const processSteps = [
    { num: "01", title: "Layout & Zoning", desc: "Architectural planning, plumbing, and electrical load distribution for RO and Dialysis units.", icon: Building2 },
    { num: "02", title: "Equipment Matrix", desc: "Procuring optimal Diacare machines, RO plants, and clinical furniture based on budget.", icon: Cpu },
    { num: "03", title: "Installation", desc: "Certified engineers execute the setup with strict adherence to global OEM standards.", icon: HardHat },
    { num: "04", title: "Go-Live & Training", desc: "Clinical staff training, dry-runs, and official handover for immediate patient intake.", icon: Activity }
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden max-w-[1280px] mx-auto px-6 lg:px-8 pb-24">
      
      {/* 1. SOLUTIONS HERO */}
      <section className="pt-24 pb-20 border-b border-white/5 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-400/30 bg-gray-400/10 w-fit relative z-10">
            <Building2 size={14} className="text-gray-300" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">
              Turnkey Infrastructure
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight relative z-10">
            Architecting the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
              Renal Care Facilities.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl relative z-10">
            From initial blueprints to the first patient, we build fully functional dialysis centers tailored to your clinical requirements, spatial constraints, and investment goals.
          </p>

          <Link href="/contact" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all text-sm uppercase tracking-wider relative z-10">
            Request Setup Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 2. THE 4-STEP PROCESS */}
      <section className="py-24">
        <div className="text-center mb-16">
          <h2 className="text-sm text-gray-400 font-bold tracking-[0.2em] uppercase mb-4">Execution Framework</h2>
          <p className="text-3xl md:text-4xl font-bold text-white">End-to-End Center Setup</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle connecting line behind cards */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
          
          {processSteps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl border-white/5 relative bg-[#010810] group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-4 -right-4 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none">
                {step.num}
              </div>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <step.icon size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. DETAILED PROJECT REPORTS (DPR) */}
      <section className="py-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 w-fit">
              <FileSpreadsheet size={14} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                Financial Intelligence
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Detailed Project <br/> Reports (DPR).
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Securing funding or board approval requires precision. We provide structured, bank-ready DPRs for hospitals and investors, covering technical, financial, and operational feasibility.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "CAPEX & OPEX Cost Estimations",
                "ROI & Breakeven Analysis",
                "Equipment vs. Revenue Modeling",
                "NABH Infrastructure Compliance Checks"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={18} className="text-[#D4AF37]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Abstract DPR Document Visual */}
          <div className="relative h-[500px] w-full rounded-[2rem] glass border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent p-8">
             <div className="w-full h-full border border-white/10 rounded-xl bg-[#010810]/50 backdrop-blur-sm p-6 flex flex-col gap-4 shadow-2xl relative">
                {/* Mock UI Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                   <div className="w-32 h-4 bg-white/20 rounded-full" />
                   <div className="w-16 h-4 bg-[#D4AF37]/40 rounded-full" />
                </div>
                {/* Mock Chart Area */}
                <div className="flex-1 flex items-end gap-2 pt-10 pb-4">
                   {[40, 70, 45, 90, 65, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-[#D4AF37]/80 to-[#F1E5AC] rounded-t-sm opacity-80" style={{ height: `${h}%` }} />
                   ))}
                </div>
                {/* Mock Data Rows */}
                <div className="space-y-3">
                   <div className="w-full h-8 bg-white/5 rounded flex items-center px-4 justify-between"><div className="w-20 h-2 bg-white/20 rounded"/><div className="w-12 h-2 bg-white/40 rounded"/></div>
                   <div className="w-full h-8 bg-white/5 rounded flex items-center px-4 justify-between"><div className="w-24 h-2 bg-white/20 rounded"/><div className="w-16 h-2 bg-[#D4AF37]/60 rounded"/></div>
                </div>

                {/* Floating overlay to transition to AI Tools */}
                <div className="absolute -right-6 -bottom-6 glass p-6 rounded-2xl border-[#D4AF37]/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <Calculator size={20} className="text-black" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">AI Generated</p>
                      <p className="text-white font-bold">Accuracy: 98.4%</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. CTA: BRIDGE TO AI TOOLS */}
      <section className="py-20 mt-12 border-t border-white/5">
        <div className="glass p-12 rounded-[2rem] border-white/10 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent z-0" />
           <div className="relative z-10 max-w-2xl mx-auto">
             <LineChart size={40} className="text-white mx-auto mb-6 opacity-80" />
             <h3 className="text-3xl font-bold text-white mb-4">Calculate Your Setup Costs Instantly</h3>
             <p className="text-gray-400 mb-8 leading-relaxed">Skip the guesswork. Use our proprietary AI planning tools to generate a baseline Detailed Project Report (DPR) and equipment cost estimate in under 60 seconds.</p>
             <Link href="/tools" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all text-sm uppercase tracking-wider">
               Launch AI Dashboard <ArrowRight size={16} />
             </Link>
           </div>
        </div>
      </section>

    </main>
  );
}