"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ChevronRight, AlertTriangle, 
  Activity, Server, ShieldAlert, BarChart3, TrendingUp,
  Landmark, Clock, ArrowRight, ShieldCheck, Phone
} from "lucide-react";

// --- ⚙️ V2.0 UNDERWRITING CONSTANTS ---
const SESSIONS_PER_DAY = 2.5;
const WORKING_DAYS = 26;

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
  colorHex: string; // e.g., "198,168,90" for rgba injection
  accentTailwind: string; // e.g., "bg-[#C6A85A]"
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

export default function GuidedAdvisoryOS() {
  const [step, setStep] = useState(0);
  const [viewMode, setViewMode] = useState<"doctor" | "investor">("investor");
  const [isExistingCenter, setIsExistingCenter] = useState(false);

  // --- STATE ---
  const [machines, setMachines] = useState(15);
  const [occupancy, setOccupancy] = useState(75);
  const [cityTier, setCityTier] = useState<"A" | "B" | "C">("B");
  const [pmjay, setPmjay] = useState(40);
  const [cghs, setCghs] = useState(20);
  const [cash, setCash] = useState(30);
  const [insurance, setInsurance] = useState(10);
  const [withAMC, setWithAMC] = useState(true);
  const [withDiacare, setWithDiacare] = useState(true);

  // --- 🧠 V2.0 ENGINE ---
  const financials = useMemo(() => {
    const totalMix = pmjay + cghs + cash + insurance || 1;
    const mix = { pmjay: pmjay / totalMix, cghs: cghs / totalMix, cash: cash / totalMix, insurance: insurance / totalMix };

    const MARKET_TRUTH = {
      pmjay: { rate: 1100, realization: 0.88, delay: 90 },
      cghs: { rate: 1250, realization: 0.90, delay: 60 },
      cash: { rate: 2200, realization: 0.98, delay: 0 },
      insurance: { rate: 1900, realization: 0.85, delay: 45 }
    };

    const baseRate = (mix.pmjay * (MARKET_TRUTH.pmjay.rate * MARKET_TRUTH.pmjay.realization)) + 
                     (mix.cghs * (MARKET_TRUTH.cghs.rate * MARKET_TRUTH.cghs.realization)) + 
                     (mix.cash * (MARKET_TRUTH.cash.rate * MARKET_TRUTH.cash.realization)) + 
                     (mix.insurance * (MARKET_TRUTH.insurance.rate * MARKET_TRUTH.insurance.realization));

    const weightedDelayDays = (mix.pmjay * MARKET_TRUTH.pmjay.delay) + (mix.cghs * MARKET_TRUTH.cghs.delay) + 
                              (mix.cash * MARKET_TRUTH.cash.delay) + (mix.insurance * MARKET_TRUTH.insurance.delay);

    const cityMultiplier = cityTier === 'A' ? 1.15 : cityTier === 'B' ? 1.00 : 0.85;
    const rentPerSqFt = cityTier === 'A' ? 120 : cityTier === 'B' ? 65 : 35;
    const realizedRate = baseRate * cityMultiplier;

    const monthlySessions = machines * SESSIONS_PER_DAY * (occupancy / 100) * WORKING_DAYS;
    const grossRevenue = monthlySessions * realizedRate;

    const staffCost = Math.max(machines / 10, 0.8) * 125000; 
    const rentCost = machines * 125 * rentPerSqFt; 
    const consumableRate = withDiacare ? 400 : 550; 
    const variableCost = monthlySessions * (consumableRate + 135); 
    const maintenanceCost = withAMC ? (machines * 3500) : 0; 
    
    const totalOpex = staffCost + rentCost + variableCost + maintenanceCost;
    const dailyRevPerMachine = SESSIONS_PER_DAY * realizedRate;
    const downtimeLoss = !withAMC ? (dailyRevPerMachine * 3 * machines) : 0; 
    const monthlyEBITDA = grossRevenue - totalOpex - downtimeLoss;
    const ebitdaMargin = (monthlyEBITDA / grossRevenue) * 100;
    const totalCapex = machines * 1000000; 
    const paybackMonths = monthlyEBITDA > 0 ? totalCapex / monthlyEBITDA : 999;
    const workingCapitalBuffer = totalOpex * (weightedDelayDays / 30); 

    let finalScore = 0;
    if (ebitdaMargin >= 25) finalScore += 40; else if (ebitdaMargin >= 18) finalScore += 25; else finalScore += 10;
    if (paybackMonths <= 24) finalScore += 35; else if (paybackMonths <= 36) finalScore += 20; else finalScore += 5;
    if (weightedDelayDays <= 30) finalScore += 25; else if (weightedDelayDays <= 60) finalScore += 15; else finalScore += 5;

    let grade = "D"; let gradeColor = "text-[#A6192E]"; let gradeRgb = "166,25,46";
    if (finalScore >= 85) { grade = "A"; gradeColor = "text-[#00A8A8]"; gradeRgb = "0,168,168"; }
    else if (finalScore >= 65) { grade = "B"; gradeColor = "text-[#C6A85A]"; gradeRgb = "198,168,90"; }
    else if (finalScore >= 45) { grade = "C"; gradeColor = "text-[#FFA500]"; gradeRgb = "255,165,0"; }

    return {
      realizedRate, monthlySessions, grossRevenue, 
      totalOpex, downtimeLoss, monthlyEBITDA, ebitdaMargin, 
      totalCapex, paybackMonths, workingCapitalBuffer, weightedDelayDays,
      grade, gradeColor, gradeRgb,
      savingsDiacare: monthlySessions * (550 - 400) 
    };
  }, [machines, occupancy, cityTier, pmjay, cghs, cash, insurance, withAMC, withDiacare]);

  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(val));
  const formatLakhs = (val: number) => `₹${(val / 100000).toFixed(2)}L`;

  const handleWhatsApp = () => {
    const text = `Underwriting Request (${viewMode.toUpperCase()} VIEW) - ${isExistingCenter ? 'EXISTING CENTER' : 'NEW SETUP'}:
• Scale: ${machines} Machines (Tier ${cityTier})
• Asset Grade: ${financials.grade}
• Cash Flow (EBITDA): ₹${formatINR(financials.monthlyEBITDA)}/mo
Need detailed DPR & Execution strategy.`;
    window.open(`https://wa.me/919879576332?text=${encodeURIComponent(text)}`, "_blank");
  };

  const recordSimulation = async () => {
    try {
      await fetch("/api/advisory/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          viewMode, cityTier, machines, occupancy,
          pmjay, cghs, cash, insurance, withAMC, withDiacare, isExistingCenter, financials 
        })
      });
    } catch (error) { console.log("Silent capture failed, proceeding."); }
  };

  return (
    <main className="relative min-h-screen bg-[#0A0F1C] text-slate-200 font-sans selection:bg-[#C6A85A] selection:text-[#0A0F1C] overflow-hidden">
      
      {/* 🌌 Ambient Background (Apple Depth) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-[#C6A85A]/5 blur-[150px] top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-[#00A8A8]/5 blur-[150px] bottom-[-100px] right-[-100px]" />
      </div>
      
      {/* 🌐 GLOBAL NAVBAR WITH LOGO */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Innovate India" className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(198,168,90,0.2)]" />
            <div className="flex flex-col justify-center border-l border-white/10 pl-3">
              <span className="font-black text-white tracking-[0.2em] text-sm leading-none mb-1">INNOVATE INDIA</span>
              <span className="text-[8px] text-[#00A8A8] font-bold tracking-widest uppercase">Healthcare Advisory</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <Link href="/machines" className="hover:text-[#C6A85A] transition-colors">CAPEX Setup</Link>
            <Link href="/maintenance" className="hover:text-[#C6A85A] transition-colors">Risk Control</Link>
            <Link href="/consumables" className="hover:text-[#C6A85A] transition-colors">Supply Chain</Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* DOCTOR VS INVESTOR TOGGLE */}
          {step > 0 && (
            <div className="flex bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-1 mb-10 w-fit shadow-lg mx-auto md:mx-0">
              <button 
                onClick={() => setViewMode("doctor")}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === "doctor" ? "bg-[#00A8A8] text-white shadow-[0_0_20px_rgba(0,168,168,0.3)]" : "text-gray-500 hover:text-gray-300"}`}
              >
                👨‍⚕️ Clinical Priority
              </button>
              <button 
                onClick={() => setViewMode("investor")}
                className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === "investor" ? "bg-[#C6A85A] text-[#0A0F1C] shadow-[0_0_20px_rgba(198,168,90,0.3)]" : "text-gray-500 hover:text-gray-300"}`}
              >
                💼 Financial Underwriting
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* --- STEP 0: THE HYBRID HERO GATEWAY --- */}
            {step === 0 && (
              <motion.div 
                key="step0"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="text-center py-10"
              >
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#C6A85A] font-bold mb-6">
                  Healthcare Infrastructure Intelligence
                </p>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
                  Build Dialysis Centers <br />
                  <span className="text-white/60">With Financial Certainty.</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
                  A clinical underwriting system that converts infrastructure into predictable cash flow.
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={() => { setIsExistingCenter(false); setStep(1); }} 
                    className="group relative p-10 rounded-[2.5rem] cursor-pointer bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#C6A85A]/40 transition-colors text-left"
                  >
                    <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_80px_rgba(198,168,90,0.15)] pointer-events-none" />
                    <Server className="text-[#C6A85A] mb-6" size={32} />
                    <h3 className="text-2xl font-black text-white mb-3">Plan New Center</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">CAPEX modeling, infrastructure design, and payback forecasting.</p>
                    <span className="text-[#C6A85A] text-sm font-bold tracking-widest flex items-center gap-2">ENTER SYSTEM <ArrowRight size={14}/></span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    onClick={() => { setIsExistingCenter(true); setStep(1); }} 
                    className="group relative p-10 rounded-[2.5rem] cursor-pointer bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00A8A8]/40 transition-colors text-left"
                  >
                    <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_80px_rgba(0,168,168,0.15)] pointer-events-none" />
                    <Activity className="text-[#00A8A8] mb-6" size={32} />
                    <h3 className="text-2xl font-black text-white mb-3">Optimize Running Center</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">Identify leakage, improve EBITDA, and stabilize operations.</p>
                    <span className="text-[#00A8A8] text-sm font-bold tracking-widest flex items-center gap-2">ANALYZE SYSTEM <ArrowRight size={14}/></span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* --- STEP 1: SCALE & ECONOMICS --- */}
            {step === 1 && (
              <ConsultationCard key="step1" step={1} title={isExistingCenter ? "Current Operations & Scale" : "Scale & Location Economics"} onNext={() => setStep(2)} onPrev={() => setStep(0)}>
                <div className="space-y-8 mb-8">
                  <Slider label={isExistingCenter ? "Active Machine Count" : "Planned Machine Scale"} value={machines} max={50} onChange={setMachines} color="accent-[#00A8A8]" />
                  <Slider label={isExistingCenter ? "Current Clinical Occupancy" : "Target Clinical Occupancy"} value={occupancy} max={100} suffix="%" onChange={setOccupancy} color="accent-[#00A8A8]" />
                </div>
                <div className="mb-10">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Location Infrastructure Tier (Impacts Rent & Wages)</p>
                  <div className="grid grid-cols-3 gap-3">
                    {(['A', 'B', 'C'] as const).map(tier => (
                      <button key={tier} onClick={() => setCityTier(tier)} className={`py-4 rounded-[1.5rem] font-black text-sm transition-all ${cityTier === tier ? 'bg-[#C6A85A] text-[#0A0F1C] shadow-[0_0_20px_rgba(198,168,90,0.3)]' : 'bg-white/[0.03] text-gray-500 border border-white/5 hover:border-white/20'}`}>
                        Tier {tier}
                      </button>
                    ))}
                  </div>
                </div>
              </ConsultationCard>
            )}

            {/* --- STEP 2: PAYOR MIX --- */}
            {step === 2 && (
              <ConsultationCard key="step2" step={2} title="Define Your Revenue Pipeline" onNext={() => setStep(3)} onPrev={() => setStep(1)}>
                <div className="mb-8 p-5 bg-[#A6192E]/5 border border-[#A6192E]/20 rounded-2xl">
                  <p className="text-sm text-gray-300 font-medium">
                    <strong className="text-white">Underwriting Rule:</strong> Our engine applies real-world realization haircuts. A ₹1,100 PMJAY claim is underwritten at 88% realization to protect cash-flow accuracy.
                  </p>
                </div>
                <div className="space-y-6">
                  <Slider label="Ayushman Bharat (PMJAY) %" value={pmjay} max={100} onChange={setPmjay} color="accent-[#00A8A8]" />
                  <Slider label="Government (CGHS/ESIC) %" value={cghs} max={100} onChange={setCghs} color="accent-[#00A8A8]" />
                  <Slider label="Private Cash Paying %" value={cash} max={100} onChange={setCash} color="accent-[#C6A85A]" />
                  <Slider label="Insurance / TPA %" value={insurance} max={100} onChange={setInsurance} color="accent-[#C6A85A]" />
                </div>
              </ConsultationCard>
            )}

            {/* --- STEP 3: OPERATIONAL CONTROL --- */}
            {step === 3 && (
              <ConsultationCard 
                key="step3"
                step={3} 
                title={isExistingCenter ? "Identify Hidden Leakage" : "Risk Mitigation & Supply Protocol"} 
                onNext={() => { recordSimulation(); setStep(4); }} 
                onPrev={() => setStep(2)}
              >
                <div className="space-y-6">
                  <DecisionBox 
                    title={isExistingCenter ? "Switch to Diacare ₹400/Session Supply Rail?" : "Include Diacare ₹400/Session Supply Rail?"}
                    active={withDiacare} onClick={() => setWithDiacare(!withDiacare)} colorHex="198,168,90" accentTailwind="bg-[#C6A85A]"
                    impactText={withDiacare ? `Secured PMJAY-compliant pricing. Margin protected.` : `Using fragmented market supply. Bleeding ~₹${formatINR(financials.savingsDiacare)} monthly.`}
                  />
                  <DecisionBox 
                    title={isExistingCenter ? "Upgrade to Zero-Downtime AMC Cover?" : "Include Zero-Downtime AMC Cover?"}
                    active={withAMC} onClick={() => setWithAMC(!withAMC)} colorHex="0,168,168" accentTailwind="bg-[#00A8A8]"
                    impactText={withAMC ? `Downtime risk transferred to vendor. Uptime protected.` : `Exposed to breakdown loss. 3 days of downtime will cost ₹${formatINR(financials.downtimeLoss || (SESSIONS_PER_DAY * financials.realizedRate * 3 * machines))}.`}
                  />
                </div>
              </ConsultationCard>
            )}

            {/* --- STEP 4: THE CFO SUMMARY --- */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="pb-20">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div>
                    <h2 className="text-4xl font-black text-white mb-2">{isExistingCenter ? "Center Optimization Audit" : "Project Underwriting"}</h2>
                    <p className="text-gray-400 font-medium">Bank-grade evaluation based on Tier {cityTier} economics.</p>
                  </div>
                  <div className="px-8 py-4 rounded-[2rem] bg-white/[0.03] backdrop-blur-xl border border-white/10 text-center shadow-lg relative group">
                    <div className={`absolute inset-0 rounded-[2rem] opacity-50 shadow-[0_0_40px_rgba(${financials.gradeRgb},0.3)] pointer-events-none`} />
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 relative z-10">Asset Health Grade</p>
                    <p className={`text-5xl font-black ${financials.gradeColor} relative z-10`}>{financials.grade}</p>
                  </div>
                </div>
                
                {/* DYNAMIC METRICS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {isExistingCenter ? (
                    <>
                      <GlassCard label="Identifiable Leakage" value={`₹${formatINR(financials.downtimeLoss + financials.savingsDiacare)}`} subText="Lost to downtime & expensive consumables." icon={<TrendingUp size={14} className="text-[#A6192E]"/>} />
                      <GlassCard label="Realized Rate / Session" value={`₹${Math.round(financials.realizedRate)}`} />
                      <GlassCard label="Monthly OPEX Load" value={formatLakhs(financials.totalOpex)} />
                    </>
                  ) : viewMode === "investor" ? (
                    <>
                      <GlassCard label="Core EBITDA Margin" value={`${financials.ebitdaMargin.toFixed(1)}%`} icon={<TrendingUp size={14} className="text-[#C6A85A]"/>} />
                      <GlassCard label="Capital Payback" value={`${financials.paybackMonths.toFixed(1)} Mos`} icon={<Clock size={14} className="text-[#00A8A8]"/>} />
                      <GlassCard label="Required Working Capital" value={formatLakhs(financials.workingCapitalBuffer)} subText={`Buffer for ${Math.round(financials.weightedDelayDays)} day claims delay.`} icon={<Landmark size={14}/>} />
                    </>
                  ) : (
                    <>
                      <GlassCard label="Monthly Sessions" value={Math.round(financials.monthlySessions).toString()} />
                      <GlassCard label="Realized Rate / Session" value={`₹${Math.round(financials.realizedRate)}`} />
                      <GlassCard label="Downtime Leakage Risk" value={financials.downtimeLoss > 0 ? formatLakhs(financials.downtimeLoss) : "₹0"} />
                    </>
                  )}
                </div>

                {/* THE HIGHLIGHT BLOCK */}
                <div className="relative group p-8 md:p-12 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/10 mb-10 flex flex-col md:flex-row justify-between items-center gap-6 overflow-hidden">
                  <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_80px_rgba(198,168,90,0.15)] pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-[10px] text-[#C6A85A] font-black uppercase tracking-widest mb-2">{isExistingCenter ? "Optimized Cash Flow" : "Monthly Cash Flow (EBITDA)"}</p>
                    <p className="text-5xl font-black text-[#C6A85A]">₹ {formatINR(financials.monthlyEBITDA)}</p>
                    <p className="text-sm font-bold text-gray-400 mt-2">OPEX Load: {formatLakhs(financials.totalOpex)} / mo</p>
                  </div>
                  <div className="w-full md:w-auto relative z-10">
                    <motion.button 
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={handleWhatsApp} 
                      className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-5 rounded-xl font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(198,168,90,0.3)] flex justify-center items-center gap-2"
                    >
                      {isExistingCenter ? "Request Optimization Plan" : "Request DPR Execution"} <ArrowRight size={16}/>
                    </motion.button>
                  </div>
                </div>

                {/* CROSS SELL EXECUTION GATES */}
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Phase 2: Procurement & Setup</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <CrossSellCard href="/machines" icon={<Server className="text-[#00A8A8] mb-4" size={24} />} title="Hardware Setup" desc="Deploy Diacare Units" colorRgb="0,168,168" />
                  <CrossSellCard href="/consumables" icon={<Activity className="text-[#C6A85A] mb-4" size={24} />} title="Supply Protocol" desc="Lock ₹400/Session Rail" colorRgb="198,168,90" />
                  <CrossSellCard href="/financing" icon={<Landmark className="text-[#A6192E] mb-4" size={24} />} title="Liquidity Security" desc="Secure Working Capital" colorRgb="166,25,46" />
                </div>
                
                <div className="mt-12 text-center">
                  <button onClick={() => setStep(0)} className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Restart Simulation</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}

// --- HYBRID UI SUB-COMPONENTS ---
function ConsultationCard({ step, title, children, onNext, onPrev }: ConsultationCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="bg-white/[0.03] backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="w-8 h-8 rounded-full bg-[#C6A85A]/20 text-[#C6A85A] flex items-center justify-center text-sm font-black border border-[#C6A85A]/30">{step}</span>
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Underwriting Setup</span>
      </div>
      <h2 className="text-3xl font-black text-white mb-10 leading-tight">{title}</h2>
      {children}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
        <button onClick={onPrev} className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-widest">Back</button>
        <button onClick={onNext} className="bg-white text-[#0A0F1C] px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gray-200 transition-all">
          Continue <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function DecisionBox({ title, active, onClick, colorHex, accentTailwind, impactText }: DecisionBoxProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`group relative p-6 rounded-2xl border transition-all cursor-pointer bg-white/[0.02] backdrop-blur-md ${active ? 'border-white/30' : 'border-white/10 hover:border-white/20'}`} 
      onClick={onClick}
    >
      {active && <div className={`absolute inset-0 rounded-2xl opacity-100 shadow-[0_0_30px_rgba(${colorHex},0.15)] pointer-events-none`} />}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <div className={`w-12 h-6 rounded-full p-1 transition-all ${active ? accentTailwind : "bg-white/10"}`}>
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${active ? 'translate-x-6' : ''}`} />
        </div>
      </div>
      <p className={`text-xs font-medium leading-relaxed relative z-10 ${active ? 'text-gray-300' : 'text-gray-500'}`}>{impactText}</p>
    </motion.div>
  );
}

function Slider({ label, value, min = 0, max, step = 1, onChange, suffix = "", color = "accent-[#C6A85A]" }: SliderProps) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-gray-300 pr-4">{label}</span>
        <span className="text-sm font-black text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className={`w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer ${color}`} />
    </div>
  );
}

function GlassCard({ label, value, subText, icon }: { label: string, value: string, subText?: string, icon?: React.ReactNode }) {
  return (
    <div className="p-8 bg-white/[0.02] backdrop-blur-md rounded-[2rem] border border-white/10">
      <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">{icon} {label}</p>
      <p className="text-3xl font-black text-white">{value}</p>
      {subText && <p className="text-[10px] text-gray-400 mt-1 italic">{subText}</p>}
    </div>
  );
}

function CrossSellCard({ href, icon, title, desc, colorRgb }: { href: string, icon: React.ReactNode, title: string, desc: string, colorRgb: string }) {
  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.03 }} className="group relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-white/30 transition-all text-left overflow-hidden">
        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 shadow-[0_0_50px_rgba(${colorRgb},0.15)] pointer-events-none`} />
        <div className="relative z-10">
          {icon}
          <h4 className="text-white font-bold mb-1">{title}</h4>
          <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{desc}</p>
        </div>
      </motion.div>
    </Link>
  );
}