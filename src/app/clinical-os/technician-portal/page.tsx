"use client";

import React, { useState } from "react";
import { 
  Printer, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  AlertTriangle, 
  Activity,
  Droplets,
  ClipboardList
} from "lucide-react";

// --- MOCK CLINICAL DATA ---
const DAILY_SCHEDULE = [
  { 
    shift: "Morning (06:00 - 10:00)",
    patients: [
      { time: "06:00 AM", machine: "M-02", name: "Ramesh Patel", uhid: "PT-8812", access: "Left AVF", weight: "62.5 kg", dialyzer: "High-Flux", infection: "None" },
      { time: "06:15 AM", machine: "M-03", name: "Suresh Shah", uhid: "PT-9021", access: "Right Jugular Catheter", weight: "71.0 kg", dialyzer: "Low-Flux", infection: "None" },
      { time: "06:30 AM", machine: "M-04", name: "Meena Desai", uhid: "PT-4410", access: "Right AVF", weight: "54.2 kg", dialyzer: "High-Flux", infection: "None" },
    ]
  },
  { 
    shift: "Afternoon (11:00 - 15:00)",
    patients: [
      { time: "11:00 AM", machine: "M-19", name: "Vikram Singh", uhid: "PT-1102", access: "Left AVF", weight: "68.8 kg", dialyzer: "High-Flux", infection: "HCV+" },
      { time: "11:15 AM", machine: "M-20", name: "Anita Kumar", uhid: "PT-3391", access: "Femoral Catheter", weight: "59.0 kg", dialyzer: "High-Flux", infection: "HCV+" },
    ]
  }
];

export default function TechnicianPortal() {
  const [currentDate] = useState(new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }));

  const handlePrint = () => {
    window.print();
  };

  return (
    // The 'print:bg-white print:text-black' classes ensure the dark mode strips away when printing
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 font-sans p-6 md:p-10 print:bg-white print:text-black print:p-0">
      
      {/* --- NON-PRINTABLE TOP NAV --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/10 pb-6 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <ClipboardList className="text-[#00A8A8]" /> Technician Floor Plan
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Daily Roster & Clinical Flowsheet</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="bg-[#0D1525] border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
            <User size={16} className="text-[#C6A85A]" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Duty Tech</p>
              <p className="text-sm font-bold text-white">Rajesh Kumar (T-01)</p>
            </div>
          </div>
          
          {/* THE PRINT BUTTON */}
          <button 
            onClick={handlePrint}
            className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all flex items-center gap-2 shadow-[0_10px_20px_rgba(198,168,90,0.15)]"
          >
            <Printer size={16} /> Print Flowsheet
          </button>
        </div>
      </div>

      {/* --- PRINTABLE DOCUMENT AREA --- */}
      <div className="max-w-5xl mx-auto bg-[#0D1525] border border-white/10 rounded-2xl p-8 print:bg-white print:border-none print:shadow-none print:p-0 print:block">
        
        {/* Print Header (Only visible nicely on print, or styled for screen) */}
        <div className="flex justify-between items-end border-b border-white/10 print:border-black/20 pb-6 mb-6">
          <div>
            <h2 className="text-2xl font-black text-white print:text-black">Clinical Shift Flowsheet</h2>
            <p className="text-sm text-gray-400 print:text-gray-600 mt-1 flex items-center gap-2">
              <CalendarIcon size={14} /> {currentDate}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 print:text-gray-500 font-bold">Technician</p>
            <p className="text-lg font-bold text-white print:text-black">Rajesh Kumar</p>
            <p className="text-[10px] uppercase tracking-widest text-[#00A8A8] print:text-black font-bold mt-1">Isolation Qualified</p>
          </div>
        </div>

        {/* Schedule Tables */}
        {DAILY_SCHEDULE.map((shift, sIdx) => (
          <div key={sIdx} className="mb-10 print:mb-8 print:break-inside-avoid">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-[#C6A85A] print:text-black" />
              <h3 className="text-lg font-black text-white print:text-black">{shift.shift}</h3>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 print:border-black/30">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0A0F1C] print:bg-gray-100 border-b border-white/10 print:border-black/30">
                  <tr>
                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-500 print:text-black">Time / Bed</th>
                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-500 print:text-black">Patient Details</th>
                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-500 print:text-black">Clinical Targets</th>
                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-500 print:text-black text-center w-24">Pre-Vitals</th>
                    <th className="p-4 font-black uppercase tracking-widest text-[10px] text-gray-500 print:text-black text-center w-24">Post-Vitals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-black/20">
                  {shift.patients.map((patient, pIdx) => (
                    <tr key={pIdx} className="hover:bg-white/[0.02] print:hover:bg-transparent">
                      
                      {/* Time & Machine */}
                      <td className="p-4 align-top">
                        <p className="font-bold text-white print:text-black">{patient.time}</p>
                        <p className={`text-xs font-black mt-1 ${patient.infection !== 'None' ? 'text-red-400 print:text-red-600' : 'text-[#00A8A8] print:text-black'}`}>
                          {patient.machine}
                        </p>
                      </td>

                      {/* Patient Details */}
                      <td className="p-4 align-top">
                        <p className="font-bold text-white print:text-black text-base">{patient.name}</p>
                        <p className="text-xs text-gray-500 print:text-gray-600 font-medium">UHID: {patient.uhid}</p>
                        {patient.infection !== "None" && (
                          <div className="inline-flex items-center gap-1 mt-2 bg-red-950/50 print:bg-red-100 text-red-400 print:text-red-700 border border-red-900/50 print:border-red-300 px-2 py-0.5 rounded text-[10px] font-black tracking-widest">
                            <AlertTriangle size={10} /> {patient.infection} ISOLATION
                          </div>
                        )}
                      </td>

                      {/* Clinical Targets */}
                      <td className="p-4 align-top">
                        <div className="space-y-1.5">
                          <p className="text-xs text-gray-300 print:text-black flex items-center gap-2">
                            <Activity size={12} className="text-gray-500" /> {patient.access}
                          </p>
                          <p className="text-xs text-gray-300 print:text-black flex items-center gap-2">
                            <Droplets size={12} className="text-[#00A8A8] print:text-black" /> Dry Wt: {patient.weight}
                          </p>
                          <p className="text-xs text-gray-300 print:text-black flex items-center gap-2">
                            <Printer size={12} className="text-gray-500" /> {patient.dialyzer}
                          </p>
                        </div>
                      </td>

                      {/* Manual Entry Boxes for Print */}
                      <td className="p-4 align-top">
                        <div className="w-full h-12 border border-white/20 print:border-black/40 rounded bg-black/20 print:bg-white" />
                      </td>
                      <td className="p-4 align-top">
                        <div className="w-full h-12 border border-white/20 print:border-black/40 rounded bg-black/20 print:bg-white" />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Print Sign-off Footer */}
        <div className="hidden print:flex justify-between items-end mt-16 pt-8 border-t-2 border-black">
          <div>
            <p className="text-xs text-gray-500 font-bold">Generated by Sovereign OS v9.0</p>
          </div>
          <div className="text-center">
            <div className="w-48 border-b border-black mb-2" />
            <p className="text-xs font-bold text-black uppercase tracking-widest">Technician Signature</p>
          </div>
          <div className="text-center">
            <div className="w-48 border-b border-black mb-2" />
            <p className="text-xs font-bold text-black uppercase tracking-widest">Charge Nurse Signature</p>
          </div>
        </div>

      </div>

      {/* Global Print Styles to enforce layout */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
          @page { margin: 10mm; size: auto; }
        }
      `}} />
    </main>
  );
}