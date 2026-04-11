"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  ClipboardList, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_TRACKING = {
  id: "SRV-99281",
  status: "In Progress",
  machine: "Innovate NX-2000 (S/N: 44921)",
  steps: [
    { label: "Ticket Raised", time: "09:00 AM", completed: true },
    { label: "Engineer Dispatched", time: "10:30 AM", completed: true },
    { label: "On-site Diagnostics", time: "01:15 PM", completed: true },
    { label: "Parts Replacement", time: "Pending", completed: false },
    { label: "Final Calibration", time: "Pending", completed: false },
  ]
};

export default function ServicePortal() {
  const [activeTab, setActiveTab] = useState<"tickets" | "tracking" | "fleet">("tickets");

  return (
    <section id="portal" className="py-24 px-6 bg-[#030303]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 italic tracking-tight">Enterprise <span className="text-brand-blue">Support Hub</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto">Manage your entire dialysis floor infrastructure from one unified dashboard.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass p-1 rounded-full flex gap-2 border-white/5">
            {["tickets", "tracking", "fleet"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-8 py-2 rounded-full text-sm font-bold transition-all uppercase tracking-widest",
                  activeTab === tab ? "bg-brand-blue text-white shadow-lg" : "text-gray-500 hover:text-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === "tickets" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GlassCard className="border-white/5 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        <ClipboardList className="text-brand-blue" /> Raise Service Ticket
                      </h3>
                      <span className="text-[10px] text-gray-500 font-mono">EST. RESPONSE: 45 MINS</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Machine Model</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-brand-blue outline-none transition-all">
                          <option>NX-2000 Pro</option>
                          <option>Elite V3</option>
                          <option>Other / Infrastructure</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase">Urgency Level</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-red-500 outline-none transition-all">
                          <option>Routine Maintenance</option>
                          <option className="text-red-500">Critical Failure (Stopped)</option>
                          <option>Minor Error / Warning</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Issue Description</label>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm h-32 outline-none focus:border-brand-blue transition-all"
                        placeholder="Describe the error code or mechanical behavior..."
                      />
                    </div>

                    <button className="w-full py-4 bg-brand-blue rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2">
                      Initialize Support Protocol <Plus size={18} />
                    </button>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === "tracking" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <GlassCard className="border-brand-blue/20">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <p className="text-xs font-mono text-brand-blue">{MOCK_TRACKING.id}</p>
                        <h3 className="text-2xl font-bold">{MOCK_TRACKING.machine}</h3>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-[10px] font-bold uppercase">
                        {MOCK_TRACKING.status}
                      </div>
                    </div>

                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-z-10 before:h-full before:w-0.5 before:bg-white/5">
                      {MOCK_TRACKING.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-6">
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-[#030303]",
                            step.completed ? "bg-brand-blue text-white" : "bg-white/5 text-gray-700"
                          )}>
                            {step.completed ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                          </div>
                          <div className="flex flex-col">
                            <span className={cn("font-bold", step.completed ? "text-white" : "text-gray-600")}>
                              {step.label}
                            </span>
                            <span className="text-xs text-gray-500">{step.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {activeTab === "fleet" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                   <GlassCard className="p-0 border-white/5 overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-500 uppercase text-[10px] font-bold tracking-tighter">
                          <tr>
                            <th className="px-6 py-4">Asset Name</th>
                            <th className="px-6 py-4">AMC Status</th>
                            <th className="px-6 py-4">Health</th>
                            <th className="px-6 py-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {[
                            { name: "Unit 01 (ICU)", amc: "Active", health: 98, color: "text-green-500" },
                            { name: "Unit 02 (General)", amc: "Active", health: 82, color: "text-yellow-500" },
                            { name: "Unit 03 (VIP)", amc: "Expiring", health: 94, color: "text-red-500" },
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors group">
                              <td className="px-6 py-4 font-bold">{item.name}</td>
                              <td className="px-6 py-4 text-gray-400">{item.amc}</td>
                              <td className={cn("px-6 py-4 font-mono", item.color)}>{item.health}%</td>
                              <td className="px-6 py-4 text-right">
                                <button className="text-brand-blue text-xs font-bold opacity-0 group-hover:opacity-100 transition-all">DETAILS</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar: Quick Stats */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard className="bg-brand-blue/10 border-brand-blue/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-brand-blue rounded-xl">
                  <AlertCircle className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold">Urgent Notice</h4>
                  <p className="text-xs text-gray-400">Unit 03 filtration sensor needs calibration.</p>
                </div>
              </div>
            </GlassCard>

            <div className="space-y-4">
               <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Engineer</h5>
               <div className="glass p-4 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10" />
                  <div>
                    <p className="font-bold text-sm">Rajesh Kumar</p>
                    <p className="text-[10px] text-brand-blue font-bold">CERTIFIED SPECIALIST</p>
                  </div>
                  <button className="ml-auto p-2 glass rounded-lg hover:bg-brand-blue/20">
                    <MapPin size={16} className="text-brand-blue" />
                  </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}