"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calculator, FileText, BookOpen, ArrowRight, Download, Zap, Microscope } from "lucide-react";
import Link from "next/link";

const resources = [
  {
    title: "Dialysis Cost Calculator",
    desc: "The most accurate CAPEX/OPEX estimator for Indian dialysis centers.",
    href: "/resources/dialysis-cost-calculator-india",
    icon: <Calculator className="text-[#3B82F6]" />,
    tag: "Tool",
    color: "border-[#3B82F6]/20"
  },
  {
    title: "DPR Sample Report",
    desc: "Download a bank-ready Detailed Project Report for a 10-bed unit.",
    href: "/resources/dialysis-project-report-sample",
    icon: <FileText className="text-[#D4AF37]" />,
    tag: "Download",
    color: "border-[#D4AF37]/20"
  },
  {
    title: "Center Setup Guide",
    desc: "A step-by-step blueprint on NABH requirements and infrastructure.",
    href: "/resources/how-to-start-dialysis-center-india",
    icon: <BookOpen className="text-white" />,
    tag: "Guide",
    color: "border-white/10"
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#010810] pt-32 pb-20 px-6">
      <div className="max-w-[1280px] mx-auto text-center mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6"
        >
          <Microscope size={14} className="text-[#D4AF37]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Knowledge Hub</span>
        </motion.div>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6">
          Infrastructure <span className="text-gradient-gold">Intelligence.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Free tools, expert guides, and technical blueprints designed for hospital administrators and investors.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources.map((item, i) => (
          <Link key={i} href={item.href}>
            <motion.div 
              whileHover={{ y: -10 }}
              className={`glass p-10 rounded-[2.5rem] border ${item.color} h-full flex flex-col group cursor-pointer`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{item.tag}</span>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-10 flex-grow">{item.desc}</p>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                Access Now <ArrowRight size={16} />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </main>
  );
}