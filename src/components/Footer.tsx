import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, MapPin, Phone, Mail, User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0F1C] relative overflow-hidden mt-20">
      <div className="max-w-[1280px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND & HQ ARCHITECTURE */}
        <div className="md:col-span-1">
          <Link href="/" className="inline-block mb-8 transition-transform hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Innovate India - Smart Healthcare Solutions" 
              width={220} 
              height={70} 
              className="object-contain"
            />
          </Link>

          {/* Real HQ Data from Business Card */}
          <div className="space-y-5 text-sm font-medium">
            <div className="flex items-start gap-3 text-gray-400">
              <User size={16} className="text-[#C6A85A] mt-1 shrink-0" />
              <div>
                <p className="text-white font-bold mb-0.5">Ketankumar Parmar</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Hospital Project Consultant</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-gray-400">
              <MapPin size={16} className="text-[#C6A85A] mt-1 shrink-0" />
              <p className="leading-relaxed">135, Soham Arcade, Nr. Baghban Circle, Green City Road, Pal, Surat 394510</p>
            </div>
            
            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={16} className="text-[#C6A85A] shrink-0" />
              <a href="tel:+919879576332" className="hover:text-[#C6A85A] transition-colors">+91 98795 76332</a>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={16} className="text-[#C6A85A] shrink-0" />
              <a href="mailto:director@innovate-india.com" className="hover:text-[#C6A85A] transition-colors">director@innovate-india.com</a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3 text-gray-500">
            <ShieldCheck size={18} className="text-[#00A8A8] shrink-0" />
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
              Official DiaCare Partner <br/> South Gujarat Region
            </p>
          </div>
        </div>

        {/* STRATEGIC TOOLS */}
        <div className="flex flex-col gap-3 text-sm md:pl-4">
          <span className="text-gray-600 font-black uppercase tracking-widest text-[10px] mb-4">
            Planning Hub
          </span>
          <Link href="/turnkey" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">Turnkey Infrastructure</Link>
          <Link href="/execution-partner/diacare" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">Execution Stack</Link>
          <Link href="/supply" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">Recurring Revenue Engine</Link>
          
          {/* NEW: Clinical OS Link Injection */}
          <Link href="/clinical-os" className="text-[#00A8A8] hover:text-white font-bold transition-colors">Clinical OS (Software)</Link>
          
          <Link href="/calculator" className="text-gray-400 hover:text-[#C6A85A] font-bold transition-colors">ROI Underwriting Engine</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white font-bold transition-colors mt-4">Contact Advisory Board</Link>
        </div>

        {/* COMPLIANCE STANDARDS */}
        <div className="flex flex-col gap-3 text-sm">
          <span className="text-gray-600 font-black uppercase tracking-widest text-[10px] mb-4">
            Frameworks
          </span>
          <span className="text-gray-500 font-bold">NABH Compliance Systems</span>
          <span className="text-gray-500 font-bold">PM-JAY v2.0 Guidelines</span>
          <span className="text-gray-500 font-bold">AAMI Water Standards</span>
          <span className="text-gray-500 font-bold">Capital Risk Hedging</span>
        </div>

        {/* CONVERSION ENGINE CTA */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl group hover:border-[#C6A85A]/20 transition-all">
          <div>
            <h3 className="text-lg font-black mb-3 text-white">
              Operationalize Assets
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed font-medium">
              Convert clinical uncertainty into predictable monthly yield through the Sovereign Clinical OS.
            </p>
          </div>

          <Link href="/calculator">
            <button className="w-full bg-[#C6A85A] text-[#0A0F1C] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#D4B970] transition-all shadow-[0_10px_20px_rgba(198,168,90,0.15)] group-hover:scale-[1.02]">
              Start Underwriting <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="border-t border-white/5 py-10 text-center px-6">
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.4em]">
          © {new Date().getFullYear()} Innovate India — Healthcare Infrastructure Intelligence
        </p>
      </div>
    </footer>
  );
}