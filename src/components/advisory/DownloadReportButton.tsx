"use client";

import React, { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TurnkeyPDFReport } from "@/lib/report-generator/pdf-builder";

export function DownloadReportButton({ inputs, capex }: any) {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent Next.js SSR hydration mismatch with browser-based PDF generation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button className="w-full bg-[#0D1525] text-gray-600 py-5 rounded-full font-black uppercase tracking-widest text-sm flex justify-center items-center gap-3 border border-white/5 cursor-not-allowed">
        <Loader2 size={18} className="animate-spin" /> Initializing Document Engine...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<TurnkeyPDFReport inputs={inputs} capex={capex} />}
      fileName={`Dialysis_Project_Blueprint_${inputs.machines}M.pdf`}
      className="w-full flex"
    >
      {({ loading }) => (
        <button 
          disabled={loading}
          className="w-full bg-white text-[#0A0F1C] py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-gray-200 transition-all flex justify-center items-center gap-3 shadow-xl disabled:opacity-70 disabled:cursor-wait"
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Compiling PDF...</>
          ) : (
            <><Download size={18}/> Download Bank-Ready Report</>
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
}