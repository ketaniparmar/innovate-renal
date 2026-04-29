import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0D1525] border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          
          {/* BRAND COL */}
          <div className="md:col-span-5">
            <Image 
              src="/logo.png" 
              alt="Innovate India" 
              width={200} 
              height={65} 
              className="object-contain mb-6"
            />
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              We engineer profitable renal care systems. From NABH-compliant infrastructure design to high-efficiency clinical supply chains.
            </p>
          </div>

          {/* STRATEGY COL */}
          <div className="md:col-span-4">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Execution Systems</h4>
            <ul className="space-y-4">
              <li><FooterLink href="/turnkey" label="Turnkey Infrastructure" /></li>
              <li><FooterLink href="/execution-partner/diacare" label="Diacare Equipment Stack" /></li>
              <li><FooterLink href="/supply" label="Recurring Revenue Engine" /></li>
              <li><FooterLink href="/calculator" label="Dialysis ROI Calculator" /></li>
            </ul>
          </div>

          {/* CONTACT COL */}
          <div className="md:col-span-3">
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Corporate Office</h4>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Surat, Gujarat, India<br/>
              (Serving South Gujarat & Maharashtra)
            </p>
            <a 
              href="https://wa.me/91XXXXXXXXXX" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-bold text-[#00A8A8] uppercase tracking-widest hover:text-[#C6A85A] transition-colors"
            >
              Contact Advisory Team →
            </a>
          </div>

        </div>

        <div className="h-px w-full bg-white/5 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} Innovate India. All Rights Reserved.
          </p>
          <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            Dialysis Business Architecture
          </p>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
      {label}
    </Link>
  );
}