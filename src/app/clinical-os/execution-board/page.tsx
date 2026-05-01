"use client";

import React, { useState, useEffect } from "react";
import { 
  Printer, AlertTriangle, Activity, CheckCircle2, 
  Clock, ShieldCheck, User, Droplets, IndianRupee
} from "lucide-react";

// --- 1. SYSTEM CONFIGURATION (Would come from DB/Prisma in production) ---
const CONFIG = {
  centerName: "Innovate India Renal Care",
  totalMachines: 20,
  shiftsPerDay: 2,
  shiftTimings: [
    { label: "Morning Shift", start: "06:00", end: "10:00" },
    { label: "Afternoon Shift", start: "11:00", end: "15:00" }
  ],
  isolationMachines: [19, 20], // M-19 and M-20 are Isolation
  sessionRate: 1800
};

// --- 2. MOCK LIVE STATE ---
const INITIAL_SESSIONS = [
  { id: 1, machine: "M-01", shift: "Morning Shift", patient: "Ramesh Patel", uhid: "PT-8812", infection: "None", status: "In Progress", preBp: "130/80", postBp: "", weight: 62.5, uf: 0 },
  { id: 2, machine: "M-19", shift: "Morning Shift", patient: "Vikram Singh", uhid: "PT-1102", infection: "HCV+", status: "Ready", preBp: "140/90", postBp: "", weight: 68.8, uf: 0 },
  { id: 3, machine: "M-02", shift: "Afternoon Shift", patient: "Suresh Shah", uhid: "PT-9021", infection: "None", status: "Completed", preBp: "120/80", postBp: "110/75", weight: 71.0, uf: 2500 },
];

export default function ExecutionBoard() {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [currentDate] = useState(new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }));
  
  // Real-time Metrics
  const completedCount = sessions.filter(s => s.status === "Completed").length;
  const activeCount = sessions.filter(s => s.status === "In Progress" || s.status === "Ready").length;
  const totalSlots = CONFIG.totalMachines * CONFIG.shiftsPerDay;
  const utilization = Math.round(((completedCount + activeCount) / totalSlots) * 100);
  const realizedRevenue = completedCount * CONFIG.sessionRate;

  const handlePrint = () => {
    window.print();
  };

  const updateStatus = (id: number, newStatus: string) => {
    setSessions(sessions.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 font-sans print:bg-white print:text-black">
      
      {/* ========================================== */}
      {/* LIVE MODE: COMMAND CENTER HEADER (Hidden on Print) */}
      {/* ========================================== */}
      <div className="p-6 md:p-10 border-b border-white/10 print:hidden sticky top-0 bg-[#0A0F1C]/95 backdrop-blur-md z-40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6A85A]/10 border border-[#C6A85A]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-3">
              <Activity size={14}/> Live Execution Layer
            </div>
            <h1 className="text-3xl font-black text-white">{CONFIG.centerName}</h1>
            <p className="text-sm text-gray-400 font-medium mt-1">Daily Flowsheet & Revenue Engine • {currentDate}</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Real-time Metrics */}
            <div className="flex gap-4 mr-4">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Utilization</p>
                <p className="text-lg font-black text-[#00A8A8]">{utilization}%</p>
              </div>
              <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl px-4 py-2 text-center">
                <p className="text-[10px] text-[#25D366]/70 font-black uppercase tracking-widest">Captured Yield</p>
                <p className="text-lg font-black text-[#25D366] flex items-center justify-center gap-1">
                  <IndianRupee size={16}/> {realizedRevenue.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <button 
              onClick={handlePrint}
              className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(198,168,90,0.2)]"
            >
              <Printer size={16} /> Print Flowsheet
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* PRINT MODE: HEADER (Hidden on Screen) */}
      {/* ========================================== */}
      <div className="hidden print:block mb-8 border-b-2 border-black pb-4 pt-8">
        <h1 className="text-2xl font-black uppercase tracking-widest text-black text-center">{CONFIG.centerName}</h1>
        <h2 className="text-lg font-bold text-center mt-1">Clinical Dialysis Flowsheet</h2>
        <div className="flex justify-between mt-6 text-sm font-bold">
          <p>Date: {currentDate}</p>
          <p>Machines: {CONFIG.totalMachines} ({CONFIG.isolationMachines.length} Isolation)</p>
          <p>Generated By: Sovereign OS</p>
        </div>
      </div>

      {/* ========================================== */}
      {/* HYBRID GRID: THE EXECUTION TABLE */}
      {/* ========================================== */}
      <div className="p-6 md:p-10 print:p-0">
        <div className="max-w-[1400px] mx-auto space-y-12 print:space-y-8">
          
          {CONFIG.shiftTimings.map((shift, idx) => (
            <div key={idx} className="print:break-inside-avoid">
              
              <div className="flex items-center gap-3 mb-6 print:mb-4 border-b border-white/5 print:border-black pb-3">
                <Clock size={20} className="text-[#C6A85A] print:text-black" />
                <h3 className="text-xl font-black text-white print:text-black">{shift.label} <span className="text-sm font-medium text-gray-500 ml-2">({shift.start} - {shift.end})</span></h3>
              </div>

              <div className="bg-[#0D1525] border border-white/10 rounded-2xl overflow-hidden print:border-black print:bg-white print:rounded-none">
                <table className="w-full text-left">
                  <thead className="bg-black/40 print:bg-gray-100 border-b border-white/10 print:border-black">
                    <tr>
                      <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-black">Machine</th>
                      <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-black">Patient Details</th>
                      <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-black">Status</th>
                      <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-black text-center">Pre-Vitals</th>
                      <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-black text-center">Post-Vitals</th>
                      <th className="p-4 text-[10px] font-black text-gray-500 uppercase tracking-widest print:text-black text-center">UF (ml)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 print:divide-black/30">
                    
                    {sessions.filter(s => s.shift === shift.label).map((session, sIdx) => {
                      const isIsolation = CONFIG.isolationMachines.includes(parseInt(session.machine.split('-')[1]));
                      
                      return (
                        <tr key={sIdx} className={`hover:bg-white/[0.02] transition-colors print:hover:bg-transparent ${session.status === 'Completed' ? 'bg-[#25D366]/5 print:bg-transparent' : ''}`}>
                          
                          {/* MACHINE */}
                          <td className="p-4 align-middle">
                            <p className="font-black text-white text-lg print:text-black">{session.machine}</p>
                            {isIsolation && (
                              <span className="inline-flex items-center gap-1 mt-1 bg-red-950/50 print:bg-transparent text-red-400 print:text-red-700 text-[9px] font-black uppercase tracking-widest rounded px-2 py-0.5 print:p-0">
                                <ShieldCheck size={10}/> Isolation
                              </span>
                            )}
                          </td>

                          {/* PATIENT */}
                          <td className="p-4 align-middle">
                            <p className="font-bold text-white print:text-black">{session.patient}</p>
                            <p className="text-xs text-gray-500 font-medium">UHID: {session.uhid}</p>
                            {session.infection !== "None" && (
                              <p className="text-[10px] font-black text-red-500 mt-1 uppercase tracking-widest">⚠️ {session.infection} POSITIVE</p>
                            )}
                          </td>

                          {/* STATUS (Dropdown in Live, Text in Print) */}
                          <td className="p-4 align-middle">
                            <div className="print:hidden">
                              <select 
                                value={session.status}
                                onChange={(e) => updateStatus(session.id, e.target.value)}
                                className={`bg-[#0A0F1C] border text-xs font-bold rounded-lg px-3 py-2 outline-none
                                  ${session.status === 'Completed' ? 'border-[#25D366] text-[#25D366]' : 
                                    session.status === 'In Progress' ? 'border-[#00A8A8] text-[#00A8A8]' : 
                                    'border-white/20 text-white'}`}
                              >
                                <option>Ready</option>
                                <option>In Progress</option>
                                <option>Completed</option>
                                <option>Complication</option>
                              </select>
                            </div>
                            <div className="hidden print:block text-sm font-bold text-black uppercase">
                              {session.status === 'Completed' ? 'Completed' : ''}
                            </div>
                          </td>

                          {/* PRE-VITALS */}
                          <td className="p-4 align-middle text-center">
                            <div className="print:hidden text-sm text-gray-300">
                              <p>BP: {session.preBp || "--"}</p>
                              <p>Wt: {session.weight}kg</p>
                            </div>
                            <div className="hidden print:block">
                              {session.status === 'Completed' ? (
                                <p className="text-sm">BP: {session.preBp} | Wt: {session.weight}</p>
                              ) : (
                                <div className="space-y-4">
                                  <div className="w-24 h-5 border-b border-black inline-block" />
                                  <div className="w-24 h-5 border-b border-black inline-block" />
                                </div>
                              )}
                            </div>
                          </td>

                          {/* POST-VITALS */}
                          <td className="p-4 align-middle text-center">
                            <div className="print:hidden">
                              {session.status === 'Completed' ? (
                                <p className="text-sm text-gray-300">{session.postBp || "--"}</p>
                              ) : (
                                <input type="text" placeholder="BP" className="w-20 bg-black/20 border border-white/10 rounded px-2 py-1 text-sm text-center outline-none focus:border-[#C6A85A]" />
                              )}
                            </div>
                            <div className="hidden print:block">
                              {session.status === 'Completed' ? (
                                <p className="text-sm">{session.postBp}</p>
                              ) : (
                                <div className="w-24 h-5 border-b border-black inline-block mt-4" />
                              )}
                            </div>
                          </td>

                          {/* UF REMOVED (Crucial for PM-JAY) */}
                          <td className="p-4 align-middle text-center">
                            <div className="print:hidden">
                              {session.status === 'Completed' ? (
                                <p className="text-sm font-black text-[#25D366]">{session.uf} ml</p>
                              ) : (
                                <input type="number" placeholder="UF" className="w-20 bg-black/20 border border-white/10 rounded px-2 py-1 text-sm text-center outline-none focus:border-[#C6A85A]" />
                              )}
                            </div>
                            <div className="hidden print:block">
                              {session.status === 'Completed' ? (
                                <p className="text-sm font-bold">{session.uf} ml</p>
                              ) : (
                                <div className="w-24 h-5 border-b border-black inline-block mt-4" />
                              )}
                            </div>
                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ========================================== */}
      {/* PRINT MODE: SIGNATURE FOOTER (Hidden on Screen) */}
      {/* ========================================== */}
      <div className="hidden print:flex justify-between items-end mt-16 pt-8 border-t-2 border-black px-10">
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase">System Verification</p>
          <p className="text-xs font-black">Sovereign OS v9.0 Auto-Audit</p>
        </div>
        <div className="text-center">
          <div className="w-48 border-b border-black mb-2" />
          <p className="text-xs font-bold text-black uppercase tracking-widest">Duty Technician</p>
        </div>
        <div className="text-center">
          <div className="w-48 border-b border-black mb-2" />
          <p className="text-xs font-bold text-black uppercase tracking-widest">Charge Nurse</p>
        </div>
      </div>

    </main>
  );
}