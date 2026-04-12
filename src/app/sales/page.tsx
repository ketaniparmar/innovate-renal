"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Droplets,
  Box,
  Shield,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function SalesPage() {
  const categories = [
    {
      title: "Dialysis Machines",
      description:
        "High-performance systems engineered for precision, safety, and long-term clinical reliability.",
      icon: <Activity size={24} />,
      tags: ["Real-time Monitoring", "Ultrafiltration", "Patient Safety"],
    },
    {
      title: "RO Water Systems",
      description:
        "Advanced multi-stage purification systems delivering ultrapure water for dialysis compliance.",
      icon: <Droplets size={24} />,
      tags: ["Bacterial Control", "Medical Grade", "Scalable Capacity"],
    },
    {
      title: "Consumables",
      description:
        "Reliable supply of dialyzers, bloodlines, and accessories ensuring uninterrupted operations.",
      icon: <Box size={24} />,
      tags: ["OEM Quality", "High Flux", "Consistent Supply"],
    },
    {
      title: "Disinfectants",
      description:
        "Specialized dialysis-grade chemicals ensuring strict microbial control and equipment safety.",
      icon: <Shield size={24} />,
      tags: ["Compliance Ready", "Machine Safe", "Effective Cleaning"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#010810] text-white pt-24 pb-32">

      {/* 🔥 HERO */}
      <section className="max-w-[1280px] mx-auto px-6 mb-20 relative">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#D4AF37]/30 bg-[#D4AF37]/10 mb-6 rounded-full">
            <Zap size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Authorized Distributor
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6">
            Build Scalable <br />
            <span className="text-[#D4AF37]">Dialysis Infrastructure</span>
          </h1>

          <p className="text-lg text-white font-medium mb-4">
            Official Diacare distributor for Gujarat region.
          </p>

          <p className="text-gray-400 text-sm mb-6 max-w-2xl">
            Get access to globally trusted dialysis machines, RO systems, and
            consumables — delivered with local expertise, installation, and
            long-term service support.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            Optimize capital investment and reduce setup costs with structured procurement planning.
          </p>

          <Link href="/contact">
            <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2">
              Request Quote <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </section>

      {/* 📊 TRUST METRICS */}
      <section className="max-w-[1280px] mx-auto px-6 mb-24 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-bold text-[#D4AF37]">100+</h3>
          <p className="text-xs text-gray-500">Machines Installed</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#D4AF37]">50+</h3>
          <p className="text-xs text-gray-500">Hospitals Served</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#D4AF37]">10+</h3>
          <p className="text-xs text-gray-500">Years Experience</p>
        </div>
      </section>

      {/* ⭐ FEATURED PRODUCT */}
      <section className="max-w-[1280px] mx-auto px-6 mb-32">
        <div className="border border-white/10 rounded-3xl p-10 bg-white/[0.02]">

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Diacare Hemodialysis System
          </h2>

          <p className="text-gray-400 mb-8 max-w-2xl">
            Designed for high-efficiency dialysis centers with intelligent monitoring,
            safety protocols, and consistent clinical output.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Real-time Monitoring",
              "Advanced Ultrafiltration",
              "Energy Efficient",
              "Automated Safety Systems",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span className="text-sm text-gray-300">{f}</span>
              </div>
            ))}
          </div>

          <button className="text-[#D4AF37] flex items-center gap-2 text-sm font-bold">
            Download Specs <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* 🧩 PRODUCT CATEGORIES */}
      <section className="max-w-[1280px] mx-auto px-6">

        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Complete Dialysis Ecosystem
          </h2>
          <p className="text-gray-400 max-w-xl">
            Everything required to build and operate a modern renal care center.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="border border-white/5 p-8 rounded-2xl bg-white/[0.02]"
            >
              <div className="mb-6 text-[#D4AF37]">{cat.icon}</div>

              <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>

              <p className="text-gray-400 text-sm mb-6">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {cat.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/5 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-[#D4AF37] font-bold text-sm flex items-center gap-2">
                Request Details <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="mt-32 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Build Your Dialysis Center?
        </h2>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact">
            <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-full font-bold">
              Get Custom Quote
            </button>
          </Link>

          <Link href="/service">
            <button className="border border-white/20 px-6 py-3 rounded-full">
              Explore AMC Services
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}