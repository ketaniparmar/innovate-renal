import { GlassCard } from "@/components/ui/GlassCard";
import { Heart, ShieldCheck, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="pt-32 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold mb-8">Pioneering <span className="text-brand-gold">Dialysis Excellence</span> in India.</h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Innovate India was founded to bridge the gap between world-class medical technology 
            and local healthcare accessibility. We don't just sell machines; we build 
            life-sustaining infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <GlassCard>
            <Zap className="text-brand-gold mb-4" />
            <h4 className="font-bold text-lg">Rapid Response</h4>
            <p className="text-sm text-gray-500">Industry-leading uptime with 4-hour service response in major Gujarat hubs.</p>
          </GlassCard>
          <GlassCard>
            <ShieldCheck className="text-brand-gold mb-4" />
            <h4 className="font-bold text-lg">OEM Standards</h4>
            <p className="text-sm text-gray-500">Every component and dialyzer reprocessing unit meets global safety benchmarks.</p>
          </GlassCard>
          <GlassCard>
            <Heart className="text-brand-gold mb-4" />
            <h4 className="font-bold text-lg">Patient First</h4>
            <p className="text-sm text-gray-500">Our equipment is calibrated for maximum comfort and clinical precision.</p>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}