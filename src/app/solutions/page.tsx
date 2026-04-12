"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Cpu,
  HardHat,
  Activity,
  FileSpreadsheet,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Calculator,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";

export default function SolutionsPage() {
  const processSteps = [
    {
      num: "01",
      title: "Planning & Layout",
      desc: "Space optimization, electrical load mapping, and dialysis zoning.",
      icon: Building2,
    },
    {
      num: "02",
      title: "Equipment Strategy",
      desc: "Right selection of Diacare machines and RO systems based on ROI.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Execution & Installation",
      desc: "Certified engineers deploy full infrastructure with OEM compliance.",
      icon: HardHat,
    },
    {
      num: "04",
      title: "Go-Live & Training",
      desc: "Staff training, trial runs, and full operational handover.",
      icon: Activity,
    },
  ];

  return (
    <main className="min-h-screen bg-[#010810] text-white px-6 pb-32">

      {/* 🔥 HERO */}
      <section className="max-w-[1200px] mx-auto pt-24 pb-20">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Build Profitable <br />
            <span className="text-[#D4AF37]">Dialysis Centers</span>
          </h1>

          <p className="text-gray-400 mb-6 text-lg">
            End-to-end dialysis center setup — from blueprint to first patient.
          </p>

          {/* 💰 VALUE POSITION */}
          <p className="text-sm text-gray-500 mb-10">
            Reduce setup cost by up to 20% with optimized planning and procurement strategy.
          </p>

          <Link href="/contact">
            <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2">
              Get Consultation <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* ⚙️ PROCESS */}
      <section className="max-w-[1200px] mx-auto mb-32">
        <h2 className="text-3xl font-bold text-center mb-16">
          Setup Execution Framework
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="border border-white/5 p-6 rounded-xl bg-white/[0.02]"
            >
              <div className="text-[#D4AF37] mb-4">
                <step.icon size={24} />
              </div>
              <h3 className="font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💰 DPR SECTION (HIGH VALUE) */}
      <section className="max-w-[1200px] mx-auto mb-32 grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 className="text-4xl font-bold mb-6">
            Detailed Project Reports (DPR)
          </h2>

          <p className="text-gray-400 mb-6">
            Bank-ready DPRs designed for investors, hospital owners, and financial approvals.
          </p>

          {/* 💡 PRICING ANCHOR */}
          <p className="text-sm text-[#D4AF37] mb-6">
            Typical projects: ₹25L – ₹2Cr investment planning
          </p>

          <ul className="space-y-3 mb-8">
            {[
              "CAPEX & OPEX planning",
              "ROI & breakeven analysis",
              "Machine utilization modeling",
              "Compliance-ready documentation",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 items-center">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span className="text-gray-300 text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <Link href="/contact">
            <button className="bg-white text-black px-6 py-3 rounded-full font-bold">
              Request DPR
            </button>
          </Link>
        </div>

        {/* 📊 VISUAL */}
        <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
          <LineChart size={40} className="text-[#D4AF37] mb-6" />
          <p className="text-gray-400 text-sm">
            AI-assisted projections for cost, revenue, and scalability.
          </p>
        </div>
      </section>

      {/* 🤖 AI TOOL CTA */}
      <section className="max-w-[900px] mx-auto text-center">

        <div className="border border-white/10 p-10 rounded-2xl bg-white/[0.02]">

          <Calculator size={40} className="mx-auto text-[#D4AF37] mb-6" />

          <h2 className="text-3xl font-bold mb-4">
            Generate Your DPR Instantly
          </h2>

          <p className="text-gray-400 mb-8">
            Use our AI-powered tools to estimate dialysis setup cost and ROI in minutes.
          </p>

          <Link href="/tools">
            <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold">
              Launch AI Tool
            </button>
          </Link>

        </div>
      </section>

    </main>
  );
}