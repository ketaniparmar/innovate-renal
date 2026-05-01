"use client";

import React, { useState } from "react";
import { 
  Users, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ShieldCheck, 
  Activity,
  CheckCircle2,
  CalendarDays,
  CalendarRange
} from "lucide-react";

export default function WorkforceOrchestration() {
  const [view, setView] = useState<"Daily" | "Weekly" | "Monthly">("Daily");

  // Mock Technician Data
  const technicians = [
    { id: "T-01", name: "Rajesh Kumar", role: "Senior Tech", qualifiedIsolation: true, currentLoad: 4, maxLoad: 4, zone: "Stable" },
    { id: "T-02", name: "Priya Patel", role: "Dialysis Tech", qualifiedIsolation: true, currentLoad: 2, maxLoad: 3, zone: "HCV+ Isolation" },
    { id: "T-03", name: "Amit Singh", role: "Junior Tech", qualifiedIsolation: false, currentLoad: 3, maxLoad: 4, zone: "Stable" },
    { id: "T-04", name: "Neha Desai", role: "Dialysis Tech", qualifiedIsolation: true, currentLoad: 0, maxLoad: 4, zone: "Standby" },
  ];

  return (
    <main className="min-h-screen bg-[#05080F] text-slate-200 p-6 md:p-10 font-sans">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-3">
            <Users size={14}/> Workforce Orchestration
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">Technician Capacity Grid</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Manage clinical load limits and infection isolation routing.</p>
        </div>

        {/* TIME VIEW TOGGLES */}
        <div className="flex bg-[#0A0F1C] border border-white/10 rounded-xl p-1 shrink-0">
          <button onClick={() => setView("Daily")} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === "Daily" ? "bg-white/10 text-white shadow-md" : "text-gray-500 hover:text-white"}`}>
            <Clock size={14}/> Daily
          </button>
          <button onClick={() => setView("Weekly")} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === "Weekly" ? "bg-white/10 text-white shadow-md" : "text-gray-500 hover:text-white"}`}>
            <CalendarDays size={14}/> Weekly
          </button>
          <button onClick={() => setView("Monthly")} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${view === "Monthly" ? "bg-white/10 text-white shadow-md" : "text-gray-500 hover:text-white"}`}>
            <CalendarRange size={14}/> Monthly
          </button>
        </div>
      </header>

      {/* DYNAMIC CONTENT AREA */}
      {view === "Daily" && (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <MetricCard title="Active Shift" value="Morning (06:00 - 10:00)" icon={<Clock className="text-[#C6A85A]"/>} />
            <MetricCard title="Techs on Floor" value="3 Active, 1 Standby" icon={<Users className="text-[#00A8A8]"/>} />
            <MetricCard title="System Load" value="81% Capacity" icon={<Activity className="text-[#25D366]"/>} />
            <MetricCard title="Isolation Compliance" value="Locked & Verified" icon={<ShieldCheck className="text-[#00A8A8]"/>} border="border-[#00A8A8]/30 bg-[#00A8A8]/5" />
          </div>

          <h3 className="text-lg font-black text-white mb-4">Shift 1 Assignment Roster</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technicians.map((tech) => (
              <div key={tech.id} className={`p-6 rounded-[2rem] border transition-all ${tech.currentLoad >= tech.maxLoad ? 'border-red-900/50 bg-red-950/10' : 'border-white/10 bg-[#0A0F1C]'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-base font-bold text-white">{tech.name}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-1">{tech.id} • {tech.role}</p>
                  </div>
                  {tech.qualifiedIsolation && <ShieldCheck size={16} className="text-[#00A8A8]" />}
                </div>

                {/* Load Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-gray-400">Patient Load</span>
                    <span className={tech.currentLoad >= tech.maxLoad ? "text-red-400" : "text-[#25D366]"}>
                      {tech.currentLoad} / {tech.maxLoad}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                    {Array.from({ length: tech.maxLoad }).map((_, i) => (
                      <div key={i} className={`h-full flex-1 rounded-full ${i < tech.currentLoad ? (tech.currentLoad >= tech.maxLoad ? 'bg-red-500' : 'bg-[#25D366]') : 'bg-white/10'}`} />
                    ))}
                  </div>
                </div>

                <div className={`mt-auto px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${
                  tech.zone.includes("Isolation") ? 'bg-red-950/40 text-red-400 border border-red-900/50' : 
                  tech.zone === "Standby" ? 'bg-white/5 text-gray-500 border border-white/10' : 
                  'bg-[#00A8A8]/10 text-[#00A8A8] border border-[#00A8A8]/20'
                }`}>
                  {tech.zone.includes("Isolation") && <AlertTriangle size={12}/>}
                  Zone: {tech.zone}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "Weekly" && (
        <div className="animate-in fade-in zoom-in duration-300 bg-[#0A0F1C] border border-white/10 rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white">Weekly Shift Distribution</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"/> Burnout Risk Warning Active
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-black">Technician</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <th key={day} className="p-4 border-b border-white/10 text-[10px] uppercase tracking-widest text-gray-500 font-black text-center">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-white/5 text-sm font-bold text-white">Rajesh Kumar</td>
                  <td className="p-4 border-b border-white/5 text-center"><ShiftBadge shift="M" /></td>
                  <td className="p-4 border-b border-white/5 text-center"><ShiftBadge shift="M" /></td>
                  <td className="p-4 border-b border-white/5 text-center"><ShiftBadge shift="E" alert /></td>
                  <td className="p-4 border-b border-white/5 text-center"><ShiftBadge shift="M" /></td>
                  <td className="p-4 border-b border-white/5 text-center"><ShiftBadge shift="OFF" /></td>
                  <td className="p-4 border-b border-white/5 text-center"><ShiftBadge shift="M" /></td>
                </tr>
                {/* Add more mock rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === "Monthly" && (
        <div className="animate-in fade-in zoom-in duration-300 flex flex-col items-center justify-center py-20">
          <CalendarRange size={64} className="text-[#C6A85A] mb-6 opacity-50" />
          <h3 className="text-2xl font-black text-white mb-2">Monthly Capacity Forecasting</h3>
          <p className="text-gray-500 text-sm max-w-lg text-center leading-relaxed">
            Predictive analytics module running. By mapping technician leave schedules against historical patient volumes, the Sovereign OS ensures you never overbook your hardware capacity.
          </p>
        </div>
      )}

    </main>
  );
}

// --- UTILS ---
function MetricCard({ title, value, icon, border = "border-white/10 bg-[#0A0F1C]" }: any) {
  return (
    <div className={`p-6 rounded-2xl border ${border} flex items-start gap-4`}>
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{title}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function ShiftBadge({ shift, alert }: { shift: string, alert?: boolean }) {
  if (shift === "OFF") return <span className="px-2 py-1 rounded bg-white/5 text-gray-600 text-[9px] font-black">OFF</span>;
  return (
    <span className={`px-2 py-1 rounded text-[9px] font-black ${alert ? 'bg-red-950/50 text-red-400 border border-red-900/50' : 'bg-[#00A8A8]/10 text-[#00A8A8] border border-[#00A8A8]/20'}`}>
      {shift} {alert && "!"}
    </span>
  );
}