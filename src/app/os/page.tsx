'use client';

import React, { useState, useMemo } from 'react';
import { load } from '@cashfreepayments/cashfree-js';

const STRICT_STATES = ['Gujarat', 'Tamil Nadu', 'Karnataka', 'Telangana'];

export default function DialysisDecisionOS() {
  // --- 1. CORE SYSTEM STATE ---
  const [machines, setMachines] = useState(15);
  const [downtime, setDowntime] = useState(5);
  const [stateName, setStateName] = useState('Gujarat');
  
  const [pmjay, setPmjay] = useState(40);
  const [privateMix, setPrivateMix] = useState(40);
  const [tpa, setTpa] = useState(20);

  const [shifts, setShifts] = useState({ morning: 100, afternoon: 90, evening: 40, night: 0 });
  const [isReuse, setIsReuse] = useState(false);

  // --- 2. CONVERSION STATE ---
  const [showModal, setShowModal] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // --- 3. MATHEMATICAL & OPERATIONAL ENGINE ---
  const isStrictState = STRICT_STATES.includes(stateName);
  const appliedReuse = isStrictState ? false : isReuse;

  const output = useMemo(() => {
    // A. Revenue Engine
    const war = (pmjay * 0.01 * 1300) + (privateMix * 0.01 * 2500) + (tpa * 0.01 * 2000);
    const dailySessionsPerMachine = (shifts.morning + shifts.afternoon + shifts.evening + shifts.night) / 100;
    const activeSessionsPerDay = machines * dailySessionsPerMachine;
    
    const monthlyRevenue = activeSessionsPerDay * 26 * (1 - downtime / 100) * war;

    // B. Cost Engine
    const consumableRate = appliedReuse ? 496 : 700;
    const totalConsumables = (activeSessionsPerDay * 26 * (1 - downtime / 100) * consumableRate) * 1.05;
    
    let staffCost = 250000;
    if (machines > 10 && machines <= 20) staffCost = 400000;
    if (machines > 20) staffCost = 600000;
    
    const fixedOpex = staffCost + 150000 + (machines * 10000) + (machines * 4000) + 30000;
    const totalOpex = totalConsumables + fixedOpex;
    
    // C. Profit & Leakage
    const ebitda = monthlyRevenue - totalOpex;
    const downtimeLoss = activeSessionsPerDay * 26 * (downtime / 100) * war;
    
    const idealSessionsPerDay = machines * 2.8;
    const underutilizationLoss = activeSessionsPerDay < idealSessionsPerDay 
      ? (idealSessionsPerDay - activeSessionsPerDay) * 26 * war 
      : 0;

    // D. Constraint Diagnosis Engine
    let constraint = "Balanced System";
    let recommendation = "Optimize scheduling to push utilization to 2.8+";
    
    if (shifts.morning >= 90 && shifts.afternoon > 80 && shifts.evening < 50) {
      constraint = "Demand Skew: Patients avoid evening shifts";
      recommendation = "Introduce ₹300 evening slot discount to capture post-work demographic.";
    } else if (shifts.morning < 60 && shifts.afternoon < 60 && shifts.evening < 60) {
      constraint = "Demand Deficit: Critical volume shortage";
      recommendation = "Execute aggressive nephrologist referral network expansion immediately.";
    } else if (shifts.morning >= 60 && shifts.afternoon >= 60 && shifts.evening >= 60 && activeSessionsPerDay < idealSessionsPerDay) {
      constraint = "Doctor Constraint: Capacity bottleneck";
      recommendation = "Increase doctor shift coverage to unlock stranded capacity.";
    }

    return { 
      ebitda, monthlyRevenue, totalOpex, downtimeLoss, underutilizationLoss, 
      constraint, recommendation, activeSessionsPerDay, dailySessionsPerMachine 
    };
  }, [machines, downtime, pmjay, privateMix, tpa, shifts, appliedReuse]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // --- 4. CASHFREE PAYMENT TRIGGER ---
  const handlePayment = async () => {
    if (!leadName || leadPhone.length < 10) {
      alert("Please enter a valid Name and 10-digit WhatsApp Number.");
      return;
    }

    setIsProcessing(true);
    try {
      const cashfree = await load({ mode: "production" }); // Switch to "sandbox" for testing

      // Call the checkout API route you created earlier
      const response = await fetch('/api/checkout/cashfree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          machines,
          sessions: output.dailySessionsPerMachine,
          downtime,
          state: stateName,
          pmjay,
          privateMix,
          tpa,
          isReuse: appliedReuse
        })
      });

      const data = await response.json();
      if (!data.payment_session_id) throw new Error("Failed to secure connection.");

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        returnUrl: `${window.location.origin}/success`, // Ensure you have a /success page
      });

    } catch (error) {
      console.error(error);
      alert("Payment initialization failed. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-4 md:p-8 font-sans">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-end border-b border-[#222] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dialysis Operations OS</h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest mt-1">CFO & COO Financial Intelligence</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-teal-900/20 transition-all uppercase tracking-wider text-sm"
        >
          Generate Audit-Ready DPR
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: INPUTS */}
        <div className="lg:col-span-4 space-y-8 bg-[#111] p-6 rounded-2xl border border-[#222]">
          
          {/* Infrastructure */}
          <div className="space-y-5">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Infrastructure</h2>
            <Slider label="Machines" value={machines} set={setMachines} min={5} max={50} />
            <Slider label="Downtime Loss Factor" value={downtime} set={setDowntime} min={0} max={15} unit="%" />
            <div>
              <label className="text-sm text-slate-400 block mb-2">State Jurisdiction</label>
              <select value={stateName} onChange={(e) => setStateName(e.target.value)} className="w-full p-3 bg-[#0A0A0A] border border-[#333] rounded-lg text-white outline-none">
                {['Gujarat', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Maharashtra', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Shift Operations */}
          <div className="space-y-5 pt-6 border-t border-[#222]">
            <div className="flex justify-between items-end">
               <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Shift Demand</h2>
               <span className="text-[10px] text-teal-500 uppercase">{output.dailySessionsPerMachine.toFixed(2)} Sessions/Day</span>
            </div>
            <Slider label="Morning (6am-10am)" value={shifts.morning} set={(v) => setShifts({...shifts, morning: v})} max={100} unit="%" />
            <Slider label="Afternoon (10am-2pm)" value={shifts.afternoon} set={(v) => setShifts({...shifts, afternoon: v})} max={100} unit="%" />
            <Slider label="Evening (2pm-6pm)" value={shifts.evening} set={(v) => setShifts({...shifts, evening: v})} max={100} unit="%" />
            <Slider label="Night (6pm-10pm)" value={shifts.night} set={(v) => setShifts({...shifts, night: v})} max={100} unit="%" />
          </div>

          {/* Payor Mix */}
          <div className="space-y-5 pt-6 border-t border-[#222]">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Payor Mix</h2>
            <Slider label="PMJAY" value={pmjay} set={setPmjay} max={100} unit="%" />
            <Slider label="Private" value={privateMix} set={setPrivateMix} max={100} unit="%" />
            <Slider label="TPA" value={tpa} set={setTpa} max={100} unit="%" />
          </div>
        </div>

        {/* RIGHT PANEL: INTELLIGENCE OUTPUTS */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Hero Financials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-3 p-8 rounded-2xl border bg-teal-950/10 border-teal-900/30 flex flex-col items-center justify-center">
              <div className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-2">Projected Monthly EBITDA</div>
              <div className={`text-6xl font-bold tabular-nums tracking-tighter ${output.ebitda > 0 ? "text-teal-400" : "text-rose-500"}`}>
                {formatINR(output.ebitda)}
              </div>
            </div>
            <MetricCard label="Gross Revenue" value={formatINR(output.monthlyRevenue)} />
            <MetricCard label="Total OPEX" value={formatINR(output.totalOpex)} />
            <MetricCard label="Per Machine Yield" value={formatINR(output.monthlyRevenue / machines)} />
          </div>

          {/* Leakage Diagnosis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-rose-900/30 bg-rose-950/10">
              <div className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Downtime Leakage</div>
              <div className="text-2xl font-bold tabular-nums text-rose-400 mb-2">-{formatINR(output.downtimeLoss)} / mo</div>
              <p className="text-xs text-rose-500/80">Capital lost strictly due to unhedged machine failure rates.</p>
            </div>
            <div className="p-6 rounded-xl border border-orange-900/30 bg-orange-950/10">
              <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">Underutilization Leakage</div>
              <div className="text-2xl font-bold tabular-nums text-orange-400 mb-2">-{formatINR(output.underutilizationLoss)} / mo</div>
              <p className="text-xs text-orange-500/80">Capital lost due to shift demand gaps and scheduling inefficiency.</p>
            </div>
          </div>

          {/* Operational Action Engine */}
          <div className="p-6 rounded-xl border border-[#333] bg-[#0A0A0A]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">System Diagnosis</div>
                <div className="text-lg font-bold text-white">{output.constraint}</div>
              </div>
              <div className="h-px md:h-12 w-full md:w-px bg-[#333]"></div>
              <div className="flex-1">
                <div className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">Prescribed Action</div>
                <div className="text-sm text-slate-300 leading-relaxed">{output.recommendation}</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* LEAD CAPTURE & CHECKOUT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#111] border border-[#333] p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Audit Before You Invest</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              You are currently bleeding <strong className="text-rose-400">{formatINR(output.downtimeLoss + output.underutilizationLoss)}/month</strong> in hidden losses. Generate the CFO-grade DPR to see the exact blueprint to fix it before deploying ₹1-3 Cr.
            </p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">Full Name</label>
                <input type="text" placeholder="Dr. Sharma / Apex Healthcare" value={leadName} onChange={e => setLeadName(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] p-3 rounded-lg text-white outline-none focus:border-teal-500 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">WhatsApp Number</label>
                <input type="tel" placeholder="9876543210" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] p-3 rounded-lg text-white outline-none focus:border-teal-500 transition-colors" />
                <p className="text-[10px] text-slate-500 mt-2">The 15-page PDF report will be delivered instantly to this number.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handlePayment} 
                disabled={isProcessing} 
                className="w-full py-4 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-500 transition-all disabled:opacity-50 text-lg flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Securing Connection...' : 'Generate My DPR (₹9,999)'}
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-3 text-slate-500 hover:text-white text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- UTILITY COMPONENTS ---

function Slider({ label, value, set, min = 0, max, step = 1, unit = "" }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2 text-slate-400">
        <span>{label}</span>
        <span className="tabular-nums font-mono text-teal-500">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="w-full accent-teal-600 h-1.5 bg-[#222] rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function MetricCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-5 rounded-xl border border-[#222] bg-[#111]">
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</div>
      <div className="text-2xl font-bold tabular-nums text-white">{value}</div>
    </div>
  );
}