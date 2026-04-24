"use client";

import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OfficialDPRDocument } from '@/components/pdf/OfficialDPRDocument';
import { Download, Loader2 } from 'lucide-react';

export function DPRDownloadButton({ infraData, financials, capex }: any) {
  const [isClient, setIsClient] = useState(false);

  // This ensures the button only renders in the browser, preventing SSR hydration crashes
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return (
    <button className="bg-white/10 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 cursor-not-allowed">
      <Loader2 size={14} className="animate-spin" /> Engine Init...
    </button>
  );

  return (
    <PDFDownloadLink 
      document={<OfficialDPRDocument infraData={infraData} financials={financials} capex={capex} />} 
      fileName={`Innovate-IndAI-DPR-${infraData.machines}M.pdf`}
      className="bg-white hover:bg-[#D4AF37] hover:text-black text-[#010810] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
    >
      {/* @ts-ignore - React PDF typing quirk */}
      {({ loading }) => (loading ? (
        <><Loader2 size={14} className="animate-spin" /> Compiling PDF...</>
      ) : (
        <><Download size={14} /> Download Official DPR</>
      ))}
    </PDFDownloadLink>
  );
}