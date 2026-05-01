"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  Activity, 
  AlertOctagon, 
  CheckCircle2, 
  Cpu, 
  Play,
  RotateCcw,
  ShieldAlert,
  Server,
  IndianRupee,
  Lock
} from "lucide-react";

// --- TYPES & MOCK DATA ---
type InfectionType = "None" | "HCV+" | "HBsAg+";

interface Patient {
  id: string;
  name: string;
  infection: InfectionType;
  scheduled: boolean;
}

interface Machine {
  id: string;
  isIsolated: boolean;
}

const INITIAL_MACHINES: Machine[] = Array.from({ length: 20 }, (_, i) => ({
  id: `M-${(i + 1).toString().padStart(2, "0")}`,
  isIsolated: i >= 17, // Last 3 machines are isolated
}));

const INITIAL_PATIENTS: Patient[] = [
  ...Array.from({ length: 45 }, (_, i) => ({ id: `P-${(i + 1).toString().padStart(2, "0")}`, name: `Patient ${i + 1}`, infection: "None" as InfectionType, scheduled: false })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `HCV-0${i + 1}`, name: `HCV Patient ${i + 1}`, infection: "HCV+" as InfectionType, scheduled: false })),
  ...Array.from({ length: 3 }, (_, i) => ({ id: `HBS-0${i + 1}`, name: `HBsAg Patient ${i + 1}`, infection: "HBsAg+" as InfectionType, scheduled: false })),
];

export default function ClinicalOSDemo() {
  const [activeShift, setActiveShift] = useState<1 | 2 | 3>(1);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [allocations, setAllocations] = useState<Record<number, Record<string, Patient | null>>>({
    1: {}, 2: {}, 3: {}
  });
  
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [alertMsg, setAlertMsg] = useState<{ text: string, type: "error" | "success" | "info" } | null>(null);

  // --- CORE ENGINE METRICS ---
  const metrics = useMemo(() => {
    let totalSlots = 20 * 3; // 20 machines * 3 shifts
    let filledSlots = 0;
    
    Object.values(allocations).forEach(shiftData => {
      Object.values(shiftData).forEach(p => { if (p) filledSlots++; });
    });

    const utilization = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;
    const revenue = filledSlots * 1800; // Base ₹1800 per session
    const opex = filledSlots * 850; // Optimized consumables OPEX
    const ebitda = revenue - opex;

    return { utilization, filledSlots, totalSlots, revenue, ebitda };
  }, [allocations]);

  // --- ACTIONS & LOGIC ---

  const triggerAlert = (text: string, type: "error" | "success" | "info") => {
    setAlertMsg({ text, type });
    setTimeout(() => setAlertMsg(null), 4000);
  };

  const handleMachineClick = (machine: Machine) => {
    if (!selectedPatient) {
      // If clicking an assigned machine, unassign it
      const existingPatient = allocations[activeShift]?.[machine.id];
      if (existingPatient) {
        const newAllocations = { ...allocations };
        delete newAllocations[activeShift][machine.id];
        setAllocations(newAllocations);
        
        setPatients(prev => prev.map(p => p.id === existingPatient.id ? { ...p, scheduled: false } : p));
        triggerAlert(`Unassigned ${existingPatient.name}`, "info");
      }
      return;
    }

    // --- CONSTRAINT ENGINE (The Moat) ---
    if (selectedPatient.infection !== "None" && !machine.isIsolated) {
      triggerAlert(`SYSTEM BLOCK: Cannot assign ${selectedPatient.infection} to General Machine ${machine.id}.`, "error");
      return;
    }
    if (selectedPatient.infection === "None" && machine.isIsolated) {
      triggerAlert(`WARNING: Machine ${machine.id} is reserved for Isolation.`, "error");
      return;
    }

    // Valid Assignment
    const newAllocations = { ...allocations };
    if (!newAllocations[activeShift]) newAllocations[activeShift] = {};
    newAllocations[activeShift][machine.id] = selectedPatient;
    
    setAllocations(newAllocations);
    setPatients(prev => prev.map(p => p.id === selectedPatient.id ? { ...p, scheduled: true } : p));
    setSelectedPatient(null);
    triggerAlert(`Assigned ${selectedPatient.name} to ${machine.id}`, "success");
  };

  // --- THE "SOLVER" ALGORITHM (Auto-Schedule) ---
  const runAutoScheduler = () => {
    const newAllocations = { 1: {}, 2: {}, 3: {} } as any;
    let currentPatients = [...INITIAL_PATIENTS.map(p => ({...p, scheduled: false}))];

    [1, 2, 3].forEach(shift => {
      INITIAL_MACHINES.forEach(machine => {
        if (machine.isIsolated) {
          // Find an infected patient first
          const infectedIdx = currentPatients.findIndex(p => !p.scheduled && p.infection !== "None");
          if (infectedIdx !== -1) {
            newAllocations[shift][machine.id] = currentPatients[infectedIdx];
            currentPatients[infectedIdx].scheduled = true;
          }
        } else {
          // Find a stable patient
          const stableIdx = currentPatients.findIndex(p => !p.scheduled && p.infection === "None");
          if (stableIdx !== -1) {
            newAllocations[shift][machine.id] = currentPatients[stableIdx];
            currentPatients[stableIdx].scheduled = true;
          }
        }
      });
    });

    setAllocations(newAllocations);
    setPatients(currentPatients);
    setSelectedPatient(null);
    triggerAlert("Algorithmic Shift Allocation Complete.", "success");
  };

  const resetEngine = () => {
    setAllocations({ 1: {}, 2: {}, 3: {} });
    setPatients(INITIAL_PATIENTS);
    setSelectedPatient(null);
    triggerAlert("System Reset.", "info");
  };

  return (
    <div className="min-h-screen bg-[#05080F] text-slate-200 font-sans flex flex-col overflow-hidden w-full">
      
      {/* --- TOP NAV: THE COMMAND HEADER --- */}
      <header className="bg-[#0A0F1C] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#00A8A8]/10 rounded-xl flex items-center justify-center text-[#00A8A8] border border-[#00A8A8]/20 shadow-[0_0_15px_rgba(0,168,168,0.2)]">
            <Server size={20} />
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-white">Sovereign OS <span className="text-[#00A8A8]">v9.0</span></h1>
            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Live Floor Orchestration</p>
          </div>
        </div>

        {/* Live Economic Ticker */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Effective Utilization</p>
            <p className={`text-xl font-black ${metrics.utilization > 80 ? 'text-[#00A8A8]' : 'text-gray-300'}`}>
              {metrics.utilization}%
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Daily Revenue</p>
            <p className="text-xl font-black text-white flex items-center justify-end gap-1">
              <IndianRupee size={16} className="text-gray-500"/>
              {metrics.revenue.toLocaleString('en-IN')}
            </p>
          </div>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <div className="text-right">
            <p className="text-[9px] font-black text-[#C6A85A] uppercase tracking-widest">Protected EBITDA</p>
            <p className="text-xl font-black text-[#C6A85A] flex items-center justify-end gap-1">
              <IndianRupee size={16} />
              {metrics.ebitda.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </header>

      {/* --- ALERT BAR --- */}
      <div className="h-12 w-full flex items-center justify-center bg-[#05080F] border-b border-white/5 relative z-40">
        {alertMsg ? (
          <div className={`px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 animate-in fade-in slide-in-from-top-2 ${
            alertMsg.type === 'error' ? 'bg-red-950/80 text-red-400 border border-red-900 shadow-[0_0_20px_rgba(239,68,68,0.2)]' :
            alertMsg.type === 'success' ? 'bg-[#00A8A8]/10 text-[#00A8A8] border border-[#00A8A8]/30 shadow-[0_0_20px_rgba(0,168,168,0.2)]' :
            'bg-white/10 text-white border border-white/20'
          }`}>
            {alertMsg.type === 'error' && <Lock size={14} />}
            {alertMsg.type === 'success' && <CheckCircle2 size={14} />}
            {alertMsg.text}
          </div>
        ) : (
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">System Ready. Awaiting Allocation.</p>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* --- LEFT SIDEBAR: PATIENT ROSTER --- */}
        <aside className="w-80 bg-[#0A0F1C] border-r border-white/10 flex flex-col overflow-hidden relative z-30 shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
            <h2 className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-white">
              <Users size={16} className="text-[#C6A85A]"/> Patient Queue
            </h2>
            <span className="text-[10px] bg-white/10 border border-white/10 px-2 py-1 rounded text-gray-300 font-black">
              {patients.filter(p => !p.scheduled).length} Wait
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {patients.filter(p => !p.scheduled).map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                  selectedPatient?.id === patient.id 
                    ? 'border-[#C6A85A] bg-[#C6A85A]/10 shadow-[0_0_15px_rgba(198,168,90,0.15)]' 
                    : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10'
                }`}
              >
                <div>
                  <p className={`text-xs font-black ${selectedPatient?.id === patient.id ? 'text-white' : 'text-gray-300'}`}>{patient.name}</p>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-0.5">ID: {patient.id}</p>
                </div>
                {patient.infection !== "None" ? (
                  <span className="bg-red-950/50 text-red-400 border border-red-900/50 px-2 py-1 rounded text-[9px] font-black tracking-widest flex items-center gap-1">
                    <AlertOctagon size={10} /> {patient.infection}
                  </span>
                ) : (
                  <span className="bg-white/5 text-gray-400 px-2 py-1 rounded text-[9px] font-black tracking-widest">
                    STABLE
                  </span>
                )}
              </button>
            ))}
            {patients.filter(p => !p.scheduled).length === 0 && (
              <div className="text-center p-6 text-[#00A8A8] text-[10px] font-black uppercase tracking-widest">
                All patients allocated.
              </div>
            )}
          </div>

          <div className="p-5 border-t border-white/10 bg-[#05080F]">
            <button 
              onClick={runAutoScheduler}
              className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(198,168,90,0.2)] mb-3"
            >
              <Cpu size={14} /> Execute Auto-Solver
            </button>
            <button 
              onClick={resetEngine}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Reset Grid
            </button>
          </div>
        </aside>

        {/* --- MAIN AREA: CAPACITY GRID --- */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tighter">Live Operations Grid</h2>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Select Patient → Click Machine to Assign</p>
            </div>
            
            {/* Shift Selector */}
            <div className="flex bg-[#0A0F1C] border border-white/10 rounded-xl p-1.5 shadow-xl">
              {[1, 2, 3].map(shift => (
                <button
                  key={shift}
                  onClick={() => setActiveShift(shift as 1|2|3)}
                  className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    activeShift === shift 
                      ? 'bg-[#00A8A8] text-[#0A0F1C] shadow-md' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  Shift 0{shift}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 mb-8 text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/[0.02] w-fit px-4 py-2 rounded-lg border border-white/5">
            <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#0A0F1C] border border-white/20"/> Idle Slot</span>
            <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#00A8A8] shadow-[0_0_10px_#00A8A8]"/> Running (Stable)</span>
            <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"/> Running (Isolated)</span>
          </div>

          {/* The Machine Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {INITIAL_MACHINES.map((machine) => {
              const assignedPatient = allocations[activeShift]?.[machine.id];
              
              return (
                <button
                  key={machine.id}
                  onClick={() => handleMachineClick(machine)}
                  className={`relative p-5 rounded-[1.5rem] border text-left flex flex-col h-36 transition-all duration-300 shadow-lg ${
                    machine.isIsolated 
                      ? 'border-red-900/30 bg-red-950/10 hover:border-red-500/50' 
                      : 'border-white/5 bg-[#0A0F1C] hover:border-[#00A8A8]/50'
                  } ${assignedPatient ? (assignedPatient.infection !== 'None' ? 'border-red-500 bg-red-950/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-[#00A8A8] bg-[#00A8A8]/10 shadow-[0_0_15px_rgba(0,168,168,0.15)]') : ''}`}
                >
                  <div className="flex items-start justify-between mb-auto w-full">
                    <div>
                      <p className={`text-lg font-black tracking-tight ${machine.isIsolated ? 'text-red-400' : 'text-white'}`}>{machine.id}</p>
                      <p className={`text-[8px] font-black uppercase tracking-widest mt-0.5 ${machine.isIsolated ? 'text-red-500' : 'text-gray-500'}`}>
                        {machine.isIsolated ? 'Isolation' : 'Standard'}
                      </p>
                    </div>
                    {machine.isIsolated && <ShieldAlert size={18} className="text-red-500/50" />}
                  </div>

                  {assignedPatient ? (
                    <div className="mt-2 animate-in fade-in zoom-in duration-300 w-full border-t border-white/10 pt-3">
                      <p className="text-xs font-black text-white truncate tracking-tight">{assignedPatient.name}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${assignedPatient.infection !== 'None' ? 'bg-red-400' : 'bg-[#00A8A8]'}`} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Active</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-gray-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 opacity-40 border-t border-white/5 pt-3">
                      <Play size={10} /> Standby
                    </div>
                  )}

                  {/* Highlight overlay when selecting a patient */}
                  {selectedPatient && !assignedPatient && (
                    <div className={`absolute inset-0 rounded-[1.5rem] border-2 transition-all opacity-0 hover:opacity-100 ${
                      (selectedPatient.infection !== 'None' && !machine.isIsolated) || (selectedPatient.infection === 'None' && machine.isIsolated)
                        ? 'border-red-500 bg-red-500/10 cursor-not-allowed backdrop-blur-sm'
                        : 'border-[#00A8A8] bg-[#00A8A8]/10 cursor-pointer backdrop-blur-sm'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

        </main>
      </div>

      {/* Basic CSS injection for strict aesthetic scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
      `}} />
    </div>
  );
}