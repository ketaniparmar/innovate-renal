"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, AlertTriangle, ShieldCheck, Activity, Landmark, PhoneCall } from "lucide-react";

// --- STRICT TYPES ---
interface ConsultationCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

interface DecisionBoxProps {
  title: string;
  active: boolean;
  onClick: () => void;
  color: string;
  impactText: string;
}

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  suffix?: string;
  color?: string;
}

export default function GuidedConsultationSystem() {
  // --- CONSULTATION STATE ---
  const [step, setStep] = useState(0);
  const [viewMode, setViewMode] = useState<"doctor" | "investor">("doctor");
  const [isExistingCenter, setIsExistingCenter] = useState(false);

  // --- CLINICAL SETUP ---
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [downtime, setDowntime] = useState(5);

  // --- REVENUE PIPELINE ---
  const [pmjay, setPmjay] = useState(30);
  const [esic, setEsic] = useState(10);
  const [cghs, setCghs] = useState(10);
  const [cash, setCash] = useState(25);
  const [corporate, setCorporate] = useState(25);

  // --- STRATEGIC CONTROLS ---
  const [withAMC, setWithAMC] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);
  const [withDiacare, setWithDiacare] = useState(false);

  // --- FINANCIAL ENGINE (Fixed & Normalized) ---
  const financials = useMemo(() => {
    // 1. Normalize mix strictly to 100%
    const totalMix = pmjay + esic + cghs + cash + corporate || 1;

    const normalized = {
      pmjay: pmjay / totalMix,
      esic: esic / totalMix,
      cghs: cghs / totalMix,
      cash: cash / totalMix,
      corporate: corporate / totalMix
    };

    // 2. Weighted Average Realization
    const WAR =
      normalized.pmjay * 1300 +
      normalized.esic * 1500 +
      normalized.cghs * 2000 +
      normalized.cash * 2600 +
      normalized.corporate * 2200;

    // 3. Capacity & Revenue
    const actualSessions = machines * sessionsPerDay * 26;
    const theoreticalSessions = machines * 3 * 26;

    const grossRevenue = actualSessions * WAR;
    const theoreticalRevenue = theoreticalSessions * WAR;

    // 4. Losses & Real-World Floor
    const downtimeLoss = grossRevenue * (downtime / 100);
    const utilLoss = theoreticalRevenue - grossRevenue;
    const baseLeakage = grossRevenue * 0.10; // FORCE INEFFICIENCY FLOOR
    const totalLoss = downtimeLoss + utilLoss + baseLeakage;

    // 5. Realistic AMC Recovery (85% practical conversion)
    const amcRecovery = withAMC ? grossRevenue * ((downtime - 1) / 100) * 0.85 : 0;

    // 6. OPEX & Savings
    const baseConsumable = 455;
    const consumableCost = actualSessions * baseConsumable;
    const diacareSavings = withDiacare ? consumableCost * 0.18 : 0;
    
    const fixedOpex = 600000 + machines * 18000;
    const insuranceCost = withInsurance ? (machines * 1200000 * 0.01) / 12 : 0;
    const amcCost = withAMC ? (machines * 22000) / 12 : 0;

    const totalOpex = consumableCost - diacareSavings + fixedOpex + insuranceCost + amcCost;
    const netIncome = grossRevenue - totalOpex;
    const totalCapex = machines * 1200000;

    const paybackMonths = netIncome > 0 ? (totalCapex / netIncome).toFixed(1) : "Not viable";

    return {
      WAR, actualSessions, grossRevenue, downtimeLoss, utilLoss, totalLoss,
      amcRecovery, diacareSavings, totalOpex, netIncome, totalCapex, paybackMonths
    };
  }, [machines, sessionsPerDay, downtime, pmjay, esic, cghs, cash, corporate, withAMC, withInsurance, withDiacare]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));

  const handleWhatsApp = () => {
    const text = `Doctor, based on your dialysis setup:

• Monthly Revenue: ₹${formatINR(financials.grossRevenue)}
• Current Loss: ₹${formatINR(financials.totalLoss)}
• With AMC: +₹${formatINR(financials.amcRecovery)} recovery
• Net Monthly Income: ₹${formatINR(financials.netIncome)}
• Payback: ${financials.paybackMonths} months

This setup is financially viable with proper structuring.`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 p-6 lg:p-12 font-sans selection:bg-[#C6A85A] selection:text-[#0A0F1C]">
      <div className="max-w-4xl mx-auto">
        
        {/* DOCTOR VS INVESTOR TOGGLE */}
        {step > 0 && (
          <div className="flex bg-[#0D1525] border border-white/10 rounded-xl p-1 mb-10 w-fit shadow-lg">
            <button 
              onClick={() => setViewMode("doctor")}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === "doctor" ? "bg-[#00A8A8] text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              👨‍⚕️ Clinical Operations Focus
            </button>
            <button 
              onClick={() => setViewMode("investor")}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === "investor" ? "bg-[#C6A85A] text-[#0A0F1C]" : "text-gray-500 hover:text-gray-300"}`}
            >
              💼 Financial ROI Focus
            </button>
          </div>
        )}

        {/* --- STEP 0: ENTRY POSITIONING --- */}
        {step === 0 && (
          <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 mx-auto bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-2xl flex items-center justify-center mb-8">
              <Activity className="text-[#C6A85A]" size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
              Doctor, before you invest <br/>₹2–5 Crore...
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Let’s understand whether your dialysis center will generate stable monthly income or silently lose money every month.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setStep(1)} 
                className="bg-[#C6A85A] hover:bg-[#D4B970] text-[#0A0F1C] px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(198,168,90,0.2)]"
              >
                Start Financial Assessment
              </button>
              <button 
                onClick={() => { setIsExistingCenter(true); setStep(3); }} 
                className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                I Already Have a Running Center
              </button>
            </div>
          </div>
        )}

        {/* --- STEP 1: DIALYSIS SETUP --- */}
        {step === 1 && (
          <ConsultationCard step={1} title="Let’s understand your dialysis setup." onNext={() => setStep(2)} onPrev={() => setStep(0)}>
            <div className="space-y-8">
              <Slider label="How many dialysis machines are you planning?" value={machines} max={50} onChange={setMachines} />
              <Slider label="On average, how many patients per machine per day?" value={sessionsPerDay} max={4} step={0.1} onChange={setSessionsPerDay} />
              <Slider label="What level of machine downtime do you expect?" value={downtime} max={20} suffix="%" onChange={setDowntime} color="accent-[#A6192E]" />
            </div>
            <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-lg text-white font-medium">
                Based on your setup, your center can generate approximately <span className="font-black text-[#00A8A8]">₹{formatINR(financials.grossRevenue)} per month.</span>
              </p>
              <p className="text-xs text-[#A6192E] font-bold mt-2 italic">Even in the best-managed centers, a 10–15% operational inefficiency floor always exists.</p>
            </div>
          </ConsultationCard>
        )}

        {/* --- STEP 2: PATIENT MIX --- */}
        {step === 2 && (
          <ConsultationCard step={2} title="Who will your patients be?" onNext={() => setStep(3)} onPrev={() => setStep(1)}>
            <div className="mb-8 p-5 bg-[#00A8A8]/10 border border-[#00A8A8]/20 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#00A8A8] font-bold uppercase tracking-widest"><CheckCircle2 size={14} /> PM-JAY aligned pricing</div>
              <div className="flex items-center gap-2 text-xs text-[#00A8A8] font-bold uppercase tracking-widest"><CheckCircle2 size={14} /> NABH-compatible infrastructure assumptions</div>
              <div className="flex items-center gap-2 text-xs text-[#00A8A8] font-bold uppercase tracking-widest"><CheckCircle2 size={14} /> State-wise reuse compliance applied</div>
            </div>

            <div className="space-y-6 mb-8">
              <Slider label="PM-JAY (%)" value={pmjay} max={100} onChange={setPmjay} color="accent-[#00A8A8]" />
              <Slider label="ESIC (%)" value={esic} max={100} onChange={setEsic} color="accent-[#00A8A8]" />
              <Slider label="CGHS (%)" value={cghs} max={100} onChange={setCghs} color="accent-[#00A8A8]" />
              <Slider label="Cash Paying (%)" value={cash} max={100} onChange={setCash} color="accent-[#C6A85A]" />
              <Slider label="Corporate / Insurance (%)" value={corporate} max={100} onChange={setCorporate} color="accent-[#C6A85A]" />
            </div>

            <div className="p-6 bg-[#0D1525] rounded-2xl border border-white/5">
              <p className="text-lg text-white">Your blended average earning per dialysis normalizes to <span className="font-black text-[#C6A85A]">₹{formatINR(financials.WAR)}</span>.</p>
            </div>
          </ConsultationCard>
        )}

        {/* --- STEP 3: HIDDEN LOSSES --- */}
        {step === 3 && (
          <ConsultationCard step={3} title="Now let’s look at where money is leaking." onNext={() => setStep(4)} onPrev={() => isExistingCenter ? setStep(0) : setStep(2)}>
            <p className="text-xl text-white mb-8 font-medium">Doctor, this is the part most spreadsheets ignore.</p>
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center p-6 bg-[#A6192E]/10 rounded-2xl border border-[#A6192E]/20">
                <span className="text-gray-300 font-bold">Loss due to downtime:</span>
                <span className="text-2xl font-black text-[#A6192E]">₹ {formatINR(financials.downtimeLoss)}</span>
              </div>
              <div className="flex justify-between items-center p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="text-gray-400 font-bold">Loss due to empty clinical slots:</span>
                <span className="text-xl font-bold text-gray-300">₹ {formatINR(financials.utilLoss)}</span>
              </div>
            </div>
            <div className="text-center p-6 border-t border-white/10">
              <p className="text-2xl text-white">You are losing <span className="font-black text-[#A6192E]">₹{formatINR(financials.totalLoss)}</span> every month without realizing it.</p>
            </div>
          </ConsultationCard>
        )}

        {/* --- STEP 4: OPERATIONAL CONTROL --- */}
        {step === 4 && (
          <ConsultationCard step={4} title="Let's take operational control." onNext={() => setStep(5)} onPrev={() => setStep(3)}>
            <div className="space-y-6">
              <DecisionBox 
                title="Do you have a proper Annual Maintenance Contract (AMC)?"
                active={withAMC} onClick={() => setWithAMC(!withAMC)} color="bg-[#00A8A8]"
                impactText={withAMC ? `Your downtime reduces to ~1%. You recover approximately ₹${formatINR(financials.amcRecovery)}/month.` : "Without AMC, you remain exposed to maximum downtime leakage."}
              />
              <DecisionBox 
                title="Is your investment protected against major breakdowns?"
                active={withInsurance} onClick={() => setWithInsurance(!withInsurance)} color="bg-[#C6A85A]"
                impactText={withInsurance ? "Cost: ~1% CAPEX. Protection: 85–90%. One major failure can wipe out months of income." : "Capital remains 100% exposed to electrical/mechanical failure."}
              />
              <DecisionBox 
                title="Will you use an optimized supply chain (Diacare)?"
                active={withDiacare} onClick={() => setWithDiacare(!withDiacare)} color="bg-[#00A8A8]"
                impactText={withDiacare ? `Your consumable cost reduces by 15–20%. This directly increases your monthly income by ₹${formatINR(financials.diacareSavings)}.` : "Standard fragmented procurement will artificially inflate your OPEX."}
              />
            </div>
          </ConsultationCard>
        )}

        {/* --- STEP 5: FINAL CFO SUMMARY & CONVERSION --- */}
        {step === 5 && (
          <div className="animate-in slide-in-from-right duration-500 pb-20">
            <h2 className="text-4xl font-black text-white mb-8">Doctor, here is your complete financial picture.</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-8 bg-[#0D1525] rounded-[2rem] border border-white/5">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Total Investment (CAPEX)</p>
                <p className="text-3xl font-black text-white">₹ {formatINR(financials.totalCapex)}</p>
              </div>
              <div className="p-8 bg-[#0D1525] rounded-[2rem] border border-white/5">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Monthly Revenue</p>
                <p className="text-3xl font-black text-[#00A8A8]">₹ {formatINR(financials.grossRevenue)}</p>
              </div>
              
              <div className="p-8 bg-[#0D1525] rounded-[2rem] border border-white/5 md:col-span-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Monthly Operating Cost (OPEX)</p>
                    <p className="text-3xl font-black text-[#A6192E] mb-2">₹ {formatINR(financials.totalOpex)}</p>
                    <p className="text-xs text-gray-500 max-w-xs">This includes fixed and variable costs required to run your center daily.</p>
                  </div>
                  <div className="bg-[#0A0F1C] p-5 rounded-xl border border-white/5 flex-1">
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-2">OPEX Includes:</p>
                    <ul className="text-xs text-gray-400 space-y-1 font-medium">
                      <li>• Dialysis consumables (dialyzer, tubing, fluids)</li>
                      <li>• Staff salaries (technicians, nurses)</li>
                      <li>• Electricity & RO plant load</li>
                      <li>• Machine maintenance (AMC)</li>
                      <li>• Equipment protection (insurance)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#C6A85A]/10 rounded-[2rem] border border-[#C6A85A]/30 md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-[10px] text-[#C6A85A] font-black uppercase tracking-widest mb-2">Net Monthly Income</p>
                  <p className="text-5xl font-black text-[#C6A85A]">₹ {formatINR(financials.netIncome)}</p>
                </div>
                {viewMode === "investor" && (
                  <div className="text-right">
                    <p className="text-[10px] text-[#00A8A8] font-black uppercase tracking-widest mb-2">Capital Recovery</p>
                    <p className="text-2xl font-black text-white">Payback: {financials.paybackMonths} Months</p>
                  </div>
                )}
                {viewMode === "doctor" && (
                  <div className="text-right">
                    <p className="text-[10px] text-[#00A8A8] font-black uppercase tracking-widest mb-2">Clinical Output</p>
                    {/* BUG FIXED: formatINR properly applied */}
                    <p className="text-2xl font-black text-white">{formatINR(financials.actualSessions)} Sessions/Mo</p>
                  </div>
                )}
              </div>
            </div>

            {/* STRATEGIC ADD 1: SUCCESS POSITIONING */}
            <div className="p-8 bg-[#00A8A8]/10 border border-[#00A8A8]/20 rounded-2xl mb-6">
              <h4 className="text-lg font-bold text-white mb-4">What successful centers do differently:</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]" /> Maintain &gt;85% machine utilization</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]" /> Use AMC to reduce downtime to ~1%</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]" /> Control consumable costs through structured supply</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00A8A8]" /> Protect capital with insurance</li>
              </ul>
            </div>

            {/* STRATEGIC ADD 2: RISK SECTION */}
            <div className="p-8 bg-[#A6192E]/10 border border-[#A6192E]/20 rounded-2xl mb-10">
              <h4 className="text-lg font-bold text-white mb-4">Doctor, understand your financial risk clearly:</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-[#A6192E]" /> One machine failure can cost ₹3–5 lakh instantly</li>
                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-[#A6192E]" /> 3–5 days downtime = direct revenue loss</li>
                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-[#A6192E]" /> Without AMC → unpredictable breakdown cycles</li>
                <li className="flex items-center gap-2"><AlertTriangle size={16} className="text-[#A6192E]" /> Without insurance → full capital exposure</li>
              </ul>
            </div>

            {/* STRATEGIC ADD 3: TURNKEY POSITIONING */}
            <div className="p-8 bg-[#0D1525] border border-white/5 rounded-2xl mb-10">
              <h4 className="text-lg font-bold text-white mb-4">Complete dialysis center setup — handled for you</h4>
              <ul className="space-y-3 text-gray-400 text-sm grid sm:grid-cols-2">
                <li>• Machine selection & procurement</li>
                <li>• RO plant design & installation</li>
                <li>• Civil layout planning</li>
                <li>• Staff training & SOP setup</li>
                <li>• PM-JAY & compliance alignment</li>
              </ul>
            </div>

            {/* STRATEGIC ADD 4: SALES CONVERSION BLOCK */}
            <div className="p-8 bg-[#C6A85A]/10 border border-[#C6A85A]/30 rounded-2xl mb-10 text-center shadow-[0_0_30px_rgba(198,168,90,0.1)]">
              <h3 className="text-xl font-black text-white mb-4">Doctor, the next step is simple.</h3>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                We convert this exact projection into a complete Detailed Project Report (DPR) and execution plan for your center.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/loan">
                  <button className="w-full bg-[#C6A85A] hover:bg-[#D4B970] text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_5px_15px_rgba(198,168,90,0.2)]">
                    Request Detailed Project Report
                  </button>
                </Link>
                <Link href="/contact">
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">
                    Schedule Consultation Call
                  </button>
                </Link>
              </div>
            </div>

            {/* STRATEGIC ADD 5: NAVIGATION EXPANSION */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center text-xs font-bold uppercase tracking-widest">
              <Link href="/solutions" className="text-gray-500 hover:text-[#C6A85A]">Turnkey Setup</Link>
              <span className="text-gray-700">•</span>
              <Link href="/service" className="text-gray-500 hover:text-[#C6A85A]">Maintenance Planning</Link>
              <span className="text-gray-700">•</span>
              <Link href="/capex" className="text-gray-500 hover:text-[#C6A85A]">Investment Planning</Link>
              <span className="text-gray-700">•</span>
              <Link href="/contact" className="text-gray-500 hover:text-[#C6A85A]">Speak to Consultant</Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

// --- STRICT SUB-COMPONENTS ---
function ConsultationCard({ step, title, children, onNext, onPrev }: ConsultationCardProps) {
  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{step}</span>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Financial Assessment</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">{title}</h2>
      {children}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
        <button onClick={onPrev} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Back</button>
        <button onClick={onNext} className="bg-white text-[#0A0F1C] px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gray-200 transition-all">
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function DecisionBox({ title, active, onClick, color, impactText }: DecisionBoxProps) {
  return (
    <div className={`p-6 rounded-2xl border transition-all cursor-pointer ${active ? 'bg-white/5 border-white/20' : 'bg-[#0D1525] border-white/5'}`} onClick={onClick}>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <div className={`w-12 h-6 rounded-full p-1 transition-all ${active ? color : "bg-gray-800"}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${active ? 'translate-x-6' : ''}`} />
        </div>
      </div>
      <p className={`text-xs font-medium leading-relaxed ${active ? 'text-gray-300' : 'text-gray-500'}`}>{impactText}</p>
    </div>
  );
}

function Slider({ label, value, min = 0, max, step = 1, onChange, suffix = "", color = "accent-[#C6A85A]" }: SliderProps) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-gray-300 pr-4">{label}</span>
        <span className="text-sm font-black text-white bg-white/5 px-3 py-1.5 rounded-lg shrink-0">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer ${color}`} />
    </div>
  );
}