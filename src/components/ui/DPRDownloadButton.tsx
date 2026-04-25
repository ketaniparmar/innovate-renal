"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OfficialDPRDocument } from '@/components/pdf/OfficialDPRDocument';
import { Download, Loader2, ShieldCheck } from 'lucide-react';

// ✅ UPGRADED: Strict typing for v8.0 Underwriting data
export function DPRDownloadButton({ infraData, financials, capex }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return (
    <button className="bg-[#0D1525] text-gray-600 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 cursor-not-allowed border border-white/5">
      <Loader2 size={14} className="animate-spin" /> OS Initializing...
    </button>
  );

  return (
    <div className="relative group">
      {/* Trust Signal Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#C6A85A] text-[#0A0F1C] px-3 py-1 rounded text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Audit-Ready PDF v8.0
      </div>

      <PDFDownloadLink 
        document={<OfficialDPRDocument infraData={infraData} financials={financials} capex={capex} />} 
        fileName={`Sovereign-DPR-${infraData.machines}M-${infraData.cityTier}.pdf`}
        className="bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(198,168,90,0.2)] border border-[#C6A85A]/20"
      >
        {/* @ts-ignore - React PDF internal typing */}
        {({ loading }) => (loading ? (
          <>
            <Loader2 size={14} className="animate-spin" /> 
            <span>Compiling Financial Audit...</span>
          </>
        ) : (
          <>
            <ShieldCheck size={14} /> 
            <span>Download Official DPR</span>
          </>
        ))}
      </PDFDownloadLink>
    </div>
  );
}