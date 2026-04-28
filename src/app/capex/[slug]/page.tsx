// src/app/capex/[slug]/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ShieldCheck, Landmark, Server, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";

const CapexCalculator = dynamic(
  () => import("@/components/capex/CapexCalculator"),
  { ssr: false }
);

// 1. PROGRAMMATIC SEO: Generate Static Pages at Build Time
export async function generateStaticParams() {
  const scales = [5, 10, 15, 20, 25, 30, 40, 50];
  return scales.map((scale) => ({
    slug: `${scale}-machine-dialysis-setup`,
  }));
}

// 2. DYNAMIC METADATA: Google sees a highly specific page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const match = params.slug.match(/^(\d+)-machine/);
  if (!match) return {};
  
  const machines = match[1];
  
  return {
    title: `${machines}-Machine Dialysis Center Setup Cost & ROI India | 2026`,
    description: `Complete CFO-grade financial breakdown, CAPEX, and payback period for a ${machines}-machine hemodialysis center in India.`,
    keywords: [`${machines} machine dialysis cost`, `dialysis center setup cost india`, `roi for ${machines} bed dialysis`],
  };
}

export default function ProgrammaticCapexPage({ params }: { params: { slug: string } }) {
  // Extract the machine count from the URL slug
  const match = params.slug.match(/^(\d+)-machine/);
  if (!match) notFound(); // 404 if the URL doesn't match the pattern
  
  const machinesCount = parseInt(match[1], 10);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": `${machinesCount}-Machine Dialysis CAPEX Calculator`,
    "description": `Capital expenditure and ROI planning for a ${machinesCount}-machine renal facility.`,
    "areaServed": "IN",
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] pt-32 pb-24 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16 animate-in fade-in duration-700">
          <p className="text-[10px] font-black uppercase text-[#C6A85A] tracking-[0.2em] mb-4">
            Custom Scale Financial Underwriting
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight">
            {machinesCount}-Machine Dialysis <br/>
            <span className="text-[#C6A85A]">Setup Cost & ROI</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            A {machinesCount}-machine setup represents a specific clinical and financial tier. Below is the precise capital deployment, operational leakage, and ROI projection for this exact scale.
          </p>
        </header>

        {/* We pass the URL parameter directly into the calculator to auto-set the slider! */}
        <CapexCalculator initialMachines={machinesCount} />

        <section className="mt-32 border-t border-white/5 pt-20">
            <h2 className="text-3xl font-black text-white mb-6">Why {machinesCount} Machines?</h2>
            <p className="text-gray-400 leading-relaxed font-medium mb-8">
              Operating a {machinesCount}-machine facility changes the fundamental economics of your RO water plant capacity and clinical staff-to-patient ratio. The model above automatically accounts for the economies of scale specific to a {machinesCount}-unit infrastructure footprint.
            </p>
            {/* Semantic Internal Linking back to the main hub */}
            <Link href="/capex" className="text-[#00A8A8] text-sm font-bold uppercase tracking-widest hover:underline">
              ← View General CAPEX Hub
            </Link>
        </section>
      </div>
    </main>
  );
}