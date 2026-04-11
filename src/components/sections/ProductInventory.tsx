"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowUpRight, Cpu, Microscope, ShieldCheck } from "lucide-react";

export default function ProductInventory() {
  return (
    <section className="py-24 px-6 bg-brand-dark relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h3 className="text-brand-gold font-mono tracking-widest text-sm uppercase">
              Precision Inventory
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold">
              The Gold Standard of <br />
              <span className="text-gray-500">Clinical Equipment.</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-400 pb-1">
            Browse our curated selection of high-performance dialysis systems, 
            engineered for maximum patient safety and clinical efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <GlassCard className="group cursor-pointer overflow-hidden border-white/5 hover:border-brand-gold/50">
                {/* Product Image Wrapper */}
                <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-brand-gold border border-brand-gold/30 uppercase tracking-tighter">
                    {product.tag}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-brand-gold mb-1 font-medium tracking-wide uppercase">{product.category}</p>
                      <h4 className="text-xl font-bold tracking-tight group-hover:text-brand-gold transition-colors">
                        {product.name}
                      </h4>
                    </div>
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-gold/20 transition-colors">
                      <ArrowUpRight size={18} className="text-white group-hover:text-brand-gold transition-transform" />
                    </div>
                  </div>

                  {/* Micro Specs List */}
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {product.specs.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <hr className="border-white/5 my-4" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-tight uppercase">{product.price}</span>
                    <button className="text-xs font-bold text-brand-gold border-b border-brand-gold/0 hover:border-brand-gold transition-all">
                      VIEW FULL SPECS
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}