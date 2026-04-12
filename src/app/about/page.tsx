"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Heart, ShieldCheck, Zap, ArrowLeft } from "lucide-react"; // Removed unused icons, added ArrowLeft
import Link from "next/link"; // Required for navigation

export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6">
        {/* Navigation Link back to Home */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-gold transition-colors font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-8 leading-tight text-white"
          >
            Pioneering <span className="text-gradient-gold">Renal Care</span> <br />
            Across India.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 leading-relaxed"
          >
            Founded by Ketan Parmar, Innovate India is more than an equipment distributor. 
            We are a hospital project consultancy and service powerhouse dedicated to 
            eliminating downtime in critical care environments.
          </motion.p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { title: "Rapid Response", desc: "4-hour service response in major Gujarat hubs.", icon: <Zap className="text-brand-gold" /> },
            { title: "OEM Standards", desc: "Every component meets global safety benchmarks.", icon: <ShieldCheck className="text-brand-gold" /> },
            { title: "Patient First", desc: "Precision engineering focused on clinical outcomes.", icon: <Heart className="text-brand-gold" /> }
          ].map((pillar, i) => (
            <motion.div 
              key={pillar.title} // Used pillar.title instead of index 'i' for better React performance
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full border-white/5">
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl">{pillar.icon}</div>
                <h4 className="font-bold text-lg mb-2 text-white">{pillar.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-12 border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
        >
            <div>
                <p className="text-brand-gold text-4xl font-bold mb-2">15+</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Years Experience</p>
            </div>
            <div>
                <p className="text-brand-gold text-4xl font-bold mb-2">500+</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Machines Managed</p>
            </div>
            <div>
                <p className="text-brand-gold text-4xl font-bold mb-2">24/7</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Support Ops</p>
            </div>
            <div>
                <p className="text-brand-gold text-4xl font-bold mb-2">12+</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Gujarat Cities</p>
            </div>
        </motion.div>
      </div>
    </main>
  );
}