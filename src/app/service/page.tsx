"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Clock, AlertTriangle, CheckCircle2, ArrowRight, Settings, PhoneCall, FileText } from "lucide-react";
import Link from "next/link";

export default function ServicePage() {
  const services = [
    {
      title: "Preventive Maintenance",
      description: "Scheduled calibration, deep cleaning, and diagnostic checks to extend the lifespan of your Diacare fleet.",
      icon: <Clock size={24} />,
    },
    {
      title: "Breakdown Repair",
      description: "Rapid-response emergency engineering support. We troubleshoot and resolve critical machine failures on-site.",
      icon: <AlertTriangle size={24} />,
    },
    {
      title: "Genuine OEM Parts",
      description: "Immediate access to our local inventory of authorized Diacare spare parts, ensuring compliance and safety.",
      icon: <Settings size={24} />,
    },
    {
      title: "AMC / CMC Contracts",
      description: "Comprehensive coverage plans that lock in priority support, predictable costs, and zero operational downtime.",
      icon: <ShieldCheck size={24} />,
    },
  ];

  const workflowSteps = [
    { id: "01", title: "Log Ticket", desc: "Submit an urgent request via the portal or 24/7 hotline.", icon: <PhoneCall size={20} /> },
    { id: "02", title: "Engineer Dispatched", desc: "A certified Diacare specialist is routed to your facility.", icon: <Wrench size={20} /> },
    { id: "03", title: "On-Site Resolution", desc: "Immediate diagnosis and repair using authorized OEM parts.", icon: <Settings size={20} /> },
    { id: "04", title: "Compliance Report", desc: "Receive a digital audit trail and NABH-ready documentation.", icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#010810] text-white selection:bg-[#3B82F6] selection:text-white pb-32 pt-24">
      
      {/* SERVICE HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-6 mb-24 relative flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#3B82F6]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#3B82F6]/30 bg-[#3B82F6]/10 mb-6 mx-auto">
            <ShieldCheck size={12} className="text-[#3B82F6]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3B82F6]">
              Care Network Infrastructure
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Absolute Reliability. <br /> Zero Downtime.
          </h1>
          
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Protect your clinical reputation. Innovate India provides rapid breakdown resolution, OEM parts replacement, and predictive AMC contracts for dialysis centers across Gujarat.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2">
              <PhoneCall size={16} /> Emergency Repair
            </button>
            <Link href="#amc-plans">
              <button className="bg-[#3B82F6] hover:bg-blue-500 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                View AMC Plans
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm group cursor-default relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-[#3B82F6]/50 group-hover:text-[#3B82F6] transition-colors text-gray-400">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HDG-STYLE WORKFLOW (Timeline) */}
      <section className="border-y border-white/5 bg-white/[0.01] py-24 mb-32">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Service Execution Workflow</h2>
            <p className="text-gray-400 max-w-xl mx-auto">How we restore your operational capacity within hours, not days.</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-12 left-10 right-10 h-px bg-white/10" />
            
            {workflowSteps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center flex-1 mb-12 lg:mb-0 px-4">
                <div className="w-24 h-24 rounded-2xl bg-[#010810] border border-white/10 flex items-center justify-center mb-6 relative group hover:border-[#3B82F6]/50 transition-colors shadow-xl">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#3B82F6] text-white text-xs font-bold flex items-center justify-center border-4 border-[#010810]">
                    {step.id}
                  </div>
                  <div className="text-gray-400 group-hover:text-[#3B82F6] transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH-CONVERSION AMC PLANS */}
      <section id="amc-plans" className="max-w-[1280px] mx-auto px-6 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">Annual Maintenance Contracts</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Protect your investment with certified Diacare maintenance protocols.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1: Standard AMC */}
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-12 relative flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Standard AMC</h3>
            <p className="text-sm text-gray-400 mb-8">Essential preventative care and priority routing.</p>
            <ul className="space-y-4 mb-10 flex-1">
              {["2 Scheduled Preventative Visits/Year", "Priority Telephone Support", "Standard Breakdown Response Time", "10% Discount on OEM Spares"].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all">
                Request Proposal
              </button>
            </Link>
          </div>

          {/* Plan 2: Comprehensive CMC (Highlighted) */}
          <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/30 rounded-[2rem] p-8 lg:p-12 relative flex flex-col overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#3B82F6] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
              Recommended
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Comprehensive CMC</h3>
            <p className="text-sm text-[#3B82F6] mb-8 font-medium">Complete peace of mind. Zero hidden repair costs.</p>
            <ul className="space-y-4 mb-10 flex-1">
              {["4 Scheduled Preventative Visits/Year", "All Major Spare Parts Included", "Guaranteed 24-Hour Engineer Dispatch", "Emergency Equipment Replacements", "NABH Audit Documentation Support"].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-sm text-white">{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <button className="w-full bg-[#3B82F6] hover:bg-blue-500 text-white px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                Secure Full Coverage
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}