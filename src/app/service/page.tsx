"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wrench,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Settings,
  PhoneCall,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function ServicePage() {
  const services = [
    {
      title: "Preventive Maintenance",
      description:
        "Scheduled inspections, calibration, and deep cleaning to extend machine lifespan and prevent unexpected failures.",
      icon: <Clock size={24} />,
    },
    {
      title: "Emergency Breakdown Repair",
      description:
        "Rapid-response engineering support with on-site diagnosis and resolution for critical dialysis equipment failures.",
      icon: <AlertTriangle size={24} />,
    },
    {
      title: "OEM Spare Parts",
      description:
        "Access to genuine Diacare components ensuring compliance, safety, and long-term reliability.",
      icon: <Settings size={24} />,
    },
    {
      title: "AMC / CMC Contracts",
      description:
        "Structured maintenance plans designed to eliminate downtime and control operational costs.",
      icon: <ShieldCheck size={24} />,
    },
  ];

  const workflowSteps = [
    {
      id: "01",
      title: "Log Ticket",
      desc: "Raise a request via WhatsApp or hotline.",
      icon: <PhoneCall size={20} />,
    },
    {
      id: "02",
      title: "Engineer Assigned",
      desc: "Nearest certified engineer is dispatched.",
      icon: <Wrench size={20} />,
    },
    {
      id: "03",
      title: "On-Site Resolution",
      desc: "Immediate diagnosis and repair.",
      icon: <Settings size={20} />,
    },
    {
      id: "04",
      title: "Compliance Report",
      desc: "Receive NABH-ready service documentation.",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#010810] text-white pt-24 pb-32">

      {/* 🔥 HERO */}
      <section className="max-w-[1280px] mx-auto px-6 mb-20 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6">
            Zero Downtime <br />
            <span className="text-[#3B82F6]">Service Infrastructure</span>
          </h1>

          <p className="text-gray-400 mb-4">
            Certified dialysis equipment service, AMC contracts, and emergency repair support across Gujarat.
          </p>

          {/* 🔴 RISK TRIGGER */}
          <p className="text-red-400 mb-8 text-sm">
            Every hour of machine downtime = revenue loss + patient risk.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-3 rounded-full flex items-center gap-2">
              <PhoneCall size={16} /> Emergency Repair
            </button>

            <Link href="#amc">
              <button className="bg-[#3B82F6] px-6 py-3 rounded-full">
                View AMC Plans
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 📊 TRUST STRIP */}
      <section className="max-w-[1280px] mx-auto px-6 mb-24 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-bold text-[#3B82F6]">4 Hrs</h3>
          <p className="text-xs text-gray-500">Response Time</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#3B82F6]">99.9%</h3>
          <p className="text-xs text-gray-500">Uptime Target</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#3B82F6]">24/7</h3>
          <p className="text-xs text-gray-500">Support Coverage</p>
        </div>
      </section>

      {/* 🧩 SERVICES */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="border border-white/5 p-6 rounded-xl bg-white/[0.02]"
          >
            <div className="text-[#3B82F6] mb-4">{s.icon}</div>
            <h3 className="font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-gray-400">{s.description}</p>
          </motion.div>
        ))}
      </section>

      {/* ⚙️ WORKFLOW */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <h2 className="text-3xl font-bold text-center mb-12">
          Service Workflow
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {workflowSteps.map((step) => (
            <div key={step.id}>
              <div className="mb-4 text-[#3B82F6]">{step.icon}</div>
              <h3 className="font-bold">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💰 AMC PLANS */}
      <section id="amc" className="max-w-[1000px] mx-auto px-6">

        <h2 className="text-4xl text-center font-bold mb-12">
          AMC Plans
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* BASIC */}
          <div className="border border-white/10 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Standard AMC</h3>

            <p className="text-gray-400 mb-4 text-sm">
              Basic maintenance with priority support.
            </p>

            <p className="text-sm text-gray-500 mb-6">
              Starting from ₹X/month per machine
            </p>

            <ul className="text-sm mb-6 space-y-2">
              <li>✔ 2 Preventive Visits</li>
              <li>✔ Phone Support</li>
              <li>✔ Spare Discount</li>
            </ul>

            <Link href="/contact">
              <button className="w-full border border-white/20 py-3 rounded-full">
                Request Plan
              </button>
            </Link>
          </div>

          {/* PREMIUM */}
          <div className="border border-[#3B82F6] p-8 rounded-xl bg-[#3B82F6]/5">
            <h3 className="text-xl font-bold mb-4">Comprehensive CMC</h3>

            <p className="text-blue-400 mb-4 text-sm">
              Full coverage with zero repair cost risk.
            </p>

            <p className="text-sm text-gray-400 mb-6">
              All-inclusive maintenance + spare parts
            </p>

            <ul className="text-sm mb-6 space-y-2">
              <li>✔ 4 Preventive Visits</li>
              <li>✔ Spare Parts Included</li>
              <li>✔ 24Hr Response</li>
              <li>✔ Emergency Backup</li>
            </ul>

            <Link href="/contact">
              <button className="w-full bg-[#3B82F6] py-3 rounded-full">
                Get Full Coverage
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="mt-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Protect Your Dialysis Operations Today
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact">
            <button className="bg-[#3B82F6] px-6 py-3 rounded-full">
              Request AMC Proposal
            </button>
          </Link>

          <Link href="/sales">
            <button className="border border-white/20 px-6 py-3 rounded-full">
              Explore Equipment
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}