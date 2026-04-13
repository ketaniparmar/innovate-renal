"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wrench,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Settings,
  PhoneCall,
  FileText,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ServicePage() {
  const services = [
    {
      title: "Preventive Maintenance",
      description: "Scheduled inspections, calibration, and deep cleaning to extend machine lifespan and prevent unexpected clinical failures.",
      icon: <Clock size={32} />,
    },
    {
      title: "Emergency Breakdown Repair",
      description: "Rapid-response HDG-level engineering support with on-site diagnosis and resolution for critical dialysis equipment.",
      icon: <AlertTriangle size={32} />,
    },
    {
      title: "OEM Spare Parts Inventory",
      description: "Immediate access to genuine Diacare components in Gujarat, ensuring NABH compliance and long-term safety.",
      icon: <Settings size={32} />,
    },
    {
      title: "AMC / CMC Contracts",
      description: "Structured annual maintenance plans designed to eliminate operational downtime and strictly control hospital OPEX.",
      icon: <ShieldCheck size={32} />,
    },
  ];

  const workflowSteps = [
    { id: "01", title: "Log Urgent Ticket", desc: "Raise a request via WhatsApp or our 24/7 hotline.", icon: <PhoneCall size={24} /> },
    { id: "02", title: "Engineer Dispatched", desc: "The nearest certified technician is routed immediately.", icon: <Wrench size={24} /> },
    { id: "03", title: "On-Site Resolution", desc: "Diagnosis and repair using authorized OEM parts.", icon: <Settings size={24} /> },
    { id: "04", title: "Compliance Audit", desc: "Receive automated, NABH-ready service documentation.", icon: <FileText size={24} /> },
  ];

  return (
    <main className="min-h-screen bg-[#010810] text-white pt-32 pb-32 overflow-hidden">

      {/* 🔥 HERO: SEO-Optimized Header */}
      <header className="max-w-[1280px] mx-auto px-6 mb-24 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#3B82F6]/30 bg-[#3B82F6]/10 mb-6 rounded-full backdrop-blur-md">
            <ShieldCheck size={14} className="text-[#3B82F6]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6]">
              Care Network Infrastructure
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-tight">
            Dialysis Machine <br />
            <span className="text-[#3B82F6]">Zero Downtime AMC.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-6 font-medium">
            Certified maintenance, breakdown repair, and compliance support across Gujarat.
          </p>

          {/* 🔴 RISK TRIGGER */}
          <div className="bg-red-500/10 border border-red-500/20 inline-block px-6 py-3 rounded-2xl mb-10">
            <p className="text-red-400 text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <AlertTriangle size={16} /> Every hour of downtime = Revenue loss & Patient risk
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <button className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all">
                <PhoneCall size={18} /> Emergency Repair
              </button>
            </Link>
            <Link href="#amc">
              <button className="bg-[#3B82F6] hover:bg-blue-500 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                View AMC Plans
              </button>
            </Link>
          </div>
        </motion.div>
      </header>

      {/* 📊 TRUST STRIP */}
      <section className="border-y border-white/5 bg-white/[0.02] mb-32">
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <div className="pt-4 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#3B82F6] mb-2">{"< 4 Hrs"}</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Breakdown Response</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#3B82F6] mb-2">99.9%</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Uptime Guarantee</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-4xl font-extrabold text-[#3B82F6] mb-2">24/7</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Engineering Support</p>
          </div>
        </div>
      </section>

      {/* 🧩 SERVICES */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tighter mb-4">Comprehensive Care Offerings</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <GlassCard key={i} accentColor="blue" className="h-full">
              <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center mb-6 text-[#3B82F6]">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{s.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ⚙️ WORKFLOW */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-center mb-16">
            Rapid Execution Workflow
          </h2>
          
          <div className="flex flex-col lg:flex-row justify-between relative z-10">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-10 left-20 right-20 h-px bg-white/10" />
            
            {workflowSteps.map((step) => (
              <div key={step.id} className="relative flex-1 text-center mb-12 lg:mb-0 px-4">
                <div className="w-20 h-20 mx-auto bg-[#010810] border border-[#3B82F6]/30 rounded-full flex items-center justify-center text-[#3B82F6] mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative">
                  <div className="absolute -top-2 -right-2 bg-[#3B82F6] text-white text-[10px] font-bold px-2 py-1 rounded-full border-[3px] border-[#010810]">
                    {step.id}
                  </div>
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 max-w-[200px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💰 AMC PLANS (SaaS Pricing Style) */}
      <section id="amc" className="max-w-[1000px] mx-auto px-6 scroll-mt-32">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-center mb-6">
          Annual Maintenance Contracts
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Secure your operational revenue. Choose a maintenance tier that aligns with your facility's volume and risk tolerance.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* BASIC TIER */}
          <GlassCard accentColor="white" hover={false} className="opacity-90">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Base Coverage</span>
            <h3 className="text-3xl font-extrabold mb-4">Standard AMC</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed border-b border-white/10 pb-8">
              Essential preventative maintenance to keep your machines calibrated and compliant.
            </p>
            <ul className="text-sm mb-10 space-y-4">
              {[
                "2 Scheduled Preventive Visits/Yr",
                "Priority Telephone Support",
                "Standard Breakdown Routing",
                "10% Discount on OEM Spares"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={16} className="text-gray-500" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <button className="w-full border border-white/20 hover:bg-white/5 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
                Request Proposal
              </button>
            </Link>
          </GlassCard>

          {/* PREMIUM TIER (Highlighted) */}
          <GlassCard accentColor="blue" hover={false} className="border-[#3B82F6]/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative scale-100 md:scale-105 z-10">
            <div className="absolute top-0 inset-x-0 h-1 bg-[#3B82F6]" />
            
            {/* FIX: Flexbox container to prevent text overlap */}
            <div className="flex justify-between items-start gap-4 mb-4 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6] mt-2">
                Zero Risk Coverage
              </span>
              <div className="bg-[#3B82F6]/20 text-[#3B82F6] text-[8px] md:text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest text-right shrink-0">
                Highly Recommended
              </div>
            </div>
            
            <h3 className="text-3xl font-extrabold mb-4 text-white">Comprehensive CMC</h3>
            <p className="text-blue-200/70 mb-8 text-sm leading-relaxed border-b border-white/10 pb-8">
              Absolute peace of mind. All repairs, travel, and major spare parts are fully covered.
            </p>
            <ul className="text-sm mb-10 space-y-4">
              {[
                "4 Scheduled Preventive Visits/Yr",
                "All Major Spare Parts Included",
                "Guaranteed 24-Hr On-Site Dispatch",
                "Emergency Machine Replacements",
                "Complete NABH Audit Support"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white font-medium">
                  <CheckCircle2 size={18} className="text-[#3B82F6] shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <button className="w-full bg-[#3B82F6] hover:bg-blue-500 py-4 rounded-xl text-[#010810] text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
                Secure Full Coverage
              </button>
            </Link>
          </GlassCard>

        </div>
      </section>

    </main>
  );
}