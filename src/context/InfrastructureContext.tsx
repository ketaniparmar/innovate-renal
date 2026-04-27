"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";

// --- 1. TYPE DEFINITIONS (V9 Sovereign Standard) ---
interface InfraContextType {
  // ----------------------------------------------------
  // CORE V8 CAPACITY (Backward Compatible)
  // ----------------------------------------------------
  machines: number;
  setMachines: (val: number) => void;
  sessionsPerDay: number;
  setSessionsPerDay: (val: number) => void;
  downtime: number;
  setDowntime: (val: number) => void;
  mode: "reuse" | "single";
  setMode: (val: "reuse" | "single") => void;
  
  // Payor Mix Portfolio
  pmjay: number;
  setPmjay: (val: number) => void;
  pvt: number;
  setPvt: (val: number) => void;
  tpa: number;
  setTpa: (val: number) => void;

  // CAPEX Parameters
  cityTier: "Tier_1" | "Tier_2" | "Tier_3";
  setCityTier: (val: "Tier_1" | "Tier_2" | "Tier_3") => void;
  tdsLevel: number;
  setTdsLevel: (val: number) => void;
  buildGrade: "Standard" | "Premium" | "NABH";
  setBuildGrade: (val: "Standard" | "Premium" | "NABH") => void;

  // Legacy Constants
  baseFee: number;
  machineFeeRate: number;
  sessionFeeRate: number;
  amcCostPerMachine: number; // Aliased to dynamic pricing for backward compatibility

  // ----------------------------------------------------
  // STRATEGIC V9 TOGGLES
  // ----------------------------------------------------
  withAMC: boolean;
  setWithAMC: (val: boolean) => void;
  withInsurance: boolean;
  setWithInsurance: (val: boolean) => void;
  withDiacare: boolean;
  setWithDiacare: (val: boolean) => void;

  // ----------------------------------------------------
  // V9 DERIVED FINANCIAL INTELLIGENCE (Memoized)
  // ----------------------------------------------------
  dynamicAMCPerMachine: number;
  monthlyAMC: number;
  insuranceRate: number;
  isDiacareActive: boolean;
  diacareSavingsFactor: number;
  totalSessionsPerMonth: number;
  uptime: number;
  utilizationFactor: number;

  // V9 Computation Helpers
  calculateAMCBreakeven: (monthlyRevenue: number) => number;
  calculateMonthlyInsurance: (totalCapex: number) => number;
}

const InfraContext = createContext<InfraContextType | undefined>(undefined);

// --- DYNAMIC PRICING ENGINE ---
function getDynamicAMCRate(machines: number): number {
  if (machines <= 6) return 25000;
  if (machines <= 12) return 22000;
  if (machines <= 20) return 20500;
  return 19500;
}

export function InfraProvider({ children }: { children: ReactNode }) {
  // --- 2. BASE STATE INITIALIZATION ---
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setRawSessionsPerDay] = useState(2.8);
  const [downtime, setRawDowntime] = useState(5);
  const [mode, setMode] = useState<"reuse" | "single">("single");
  
  const [pmjay, setRawPmjay] = useState(40);
  const [pvt, setRawPvt] = useState(40);
  const [tpa, setRawTpa] = useState(20);

  const [cityTier, setCityTier] = useState<"Tier_1" | "Tier_2" | "Tier_3">("Tier_2");
  const [tdsLevel, setTdsLevel] = useState(850);
  const [buildGrade, setBuildGrade] = useState<"Standard" | "Premium" | "NABH">("Premium");

  // V9 Strategic Toggles
  const [withAMC, setWithAMC] = useState(false);
  const [withInsurance, setWithInsurance] = useState(false);
  const [withDiacare, setWithDiacare] = useState(true); // Default to OEM Advantage

  // Legacy Service Constants
  const baseFee = 15000;
  const machineFeeRate = 1000;
  const sessionFeeRate = 10;

  // --- 3. STATE VALIDATION & NORMALIZATION ---
  const setSessionsPerDay = (val: number) => setRawSessionsPerDay(Math.min(val, 3));
  const setDowntime = (val: number) => setRawDowntime(Math.min(val, 20));

  // Payor Mix Normalization (Ensures pmjay + pvt + tpa = 100)
  const setPmjay = (val: number) => {
    const p = Math.max(0, Math.min(val, 100));
    setRawPmjay(p);
    setRawTpa(Math.max(0, 100 - p - pvt));
  };

  const setPvt = (val: number) => {
    const pv = Math.max(0, Math.min(val, 100));
    setRawPvt(pv);
    setRawTpa(Math.max(0, 100 - pmjay - pv));
  };

  const setTpa = (val: number) => {
    const t = Math.max(0, Math.min(val, 100));
    setRawTpa(t);
    // TPA is derivative; setting it actively pushes back onto Pvt/PMJAY logic if needed
    // For safety, we balance it against private mix.
    setRawPvt(Math.max(0, 100 - pmjay - t));
  };

  // --- 4. DERIVED FINANCIAL ENGINE (Memoized for Performance) ---
  const kpis = useMemo(() => {
    // Service & Insurance Architecture
    const dynamicAMCPerMachine = getDynamicAMCRate(machines);
    const monthlyAMC = (dynamicAMCPerMachine * machines) / 12;
    const insuranceRate = 0.01; // 1% CAPEX annually

    // Supply Chain Architecture
    const isDiacareActive = withDiacare;
    const diacareSavingsFactor = withDiacare ? 0.18 : 0; // 18% OPEX reduction

    // Operational KPI Architecture
    const totalSessionsPerMonth = machines * sessionsPerDay * 30;
    const uptime = 100 - downtime;
    const utilizationFactor = sessionsPerDay / 3.0; // Normalized to 3-shift ideal

    // Intelligence Helpers
    const calculateAMCBreakeven = (monthlyRevenue: number): number => {
      if (totalSessionsPerMonth === 0) return 0;
      const avgRevenuePerSession = monthlyRevenue / totalSessionsPerMonth;
      if (avgRevenuePerSession === 0) return 0;
      // Returns the raw number of sessions needed to pay for the AMC
      return monthlyAMC / avgRevenuePerSession; 
    };

    const calculateMonthlyInsurance = (totalCapex: number): number => {
      return (totalCapex * insuranceRate) / 12;
    };

    return {
      dynamicAMCPerMachine,
      monthlyAMC,
      insuranceRate,
      isDiacareActive,
      diacareSavingsFactor,
      totalSessionsPerMonth,
      uptime,
      utilizationFactor,
      calculateAMCBreakeven,
      calculateMonthlyInsurance
    };
  }, [machines, sessionsPerDay, downtime, withDiacare]);

  // --- 5. V9 PROJECT DNA HYDRATION & VERSIONING ---
  useEffect(() => {
    try {
      // Prioritize V9 DNA
      const v9State = localStorage.getItem("sovereign_os_v9_dna");
      let dna = null;

      if (v9State) {
        const parsed = JSON.parse(v9State);
        dna = parsed.data; // Unpack V9 wrapper
      } else {
        // Safe Fallback to V8 Legacy DNA
        const v8State = localStorage.getItem("sovereign_os_v8_dna");
        if (v8State) dna = JSON.parse(v8State);
      }

      if (dna) {
        // Hydrate Core
        if (dna.machines !== undefined) setMachines(dna.machines);
        if (dna.sessionsPerDay !== undefined) setRawSessionsPerDay(dna.sessionsPerDay);
        if (dna.downtime !== undefined) setRawDowntime(dna.downtime);
        if (dna.mode !== undefined) setMode(dna.mode);
        
        // Hydrate Mix
        if (dna.pmjay !== undefined) setRawPmjay(dna.pmjay);
        if (dna.pvt !== undefined) setRawPvt(dna.pvt);
        if (dna.tpa !== undefined) setRawTpa(dna.tpa);
        
        // Hydrate CAPEX Params
        if (dna.cityTier !== undefined) setCityTier(dna.cityTier);
        if (dna.tdsLevel !== undefined) setTdsLevel(dna.tdsLevel);
        if (dna.buildGrade !== undefined) setBuildGrade(dna.buildGrade);

        // Hydrate V9 Toggles
        if (dna.withAMC !== undefined) setWithAMC(dna.withAMC);
        if (dna.withInsurance !== undefined) setWithInsurance(dna.withInsurance);
        if (dna.withDiacare !== undefined) setWithDiacare(dna.withDiacare);

        console.log("🧬 SOVEREIGN OS: Project DNA (v9.0) hydrated successfully.");
      }
    } catch (e) {
      console.warn("⚠️ DNA HYDRATION FAILURE: Operating on v9 defaults.", e);
    }
  }, []);

  // --- 6. CONTINUOUS STATE PERSISTENCE ---
  useEffect(() => {
    const payload = {
      version: "v9",
      timestamp: Date.now(),
      data: {
        machines, sessionsPerDay, downtime, mode, 
        pmjay, pvt, tpa, cityTier, tdsLevel, buildGrade,
        withAMC, withInsurance, withDiacare
      }
    };
    localStorage.setItem("sovereign_os_v9_dna", JSON.stringify(payload));
  }, [
    machines, sessionsPerDay, downtime, mode, pmjay, pvt, tpa, 
    cityTier, tdsLevel, buildGrade, withAMC, withInsurance, withDiacare
  ]);

  return (
    <InfraContext.Provider value={{
      // Core V8 Setters
      machines, setMachines,
      sessionsPerDay, setSessionsPerDay,
      downtime, setDowntime,
      mode, setMode,
      pmjay, setPmjay,
      pvt, setPvt,
      tpa, setTpa,
      cityTier, setCityTier,
      tdsLevel, setTdsLevel,
      buildGrade, setBuildGrade,

      // Constants
      baseFee,
      machineFeeRate,
      sessionFeeRate,
      amcCostPerMachine: kpis.dynamicAMCPerMachine, // Backend compatible aliasing

      // V9 Strategic Toggles
      withAMC, setWithAMC,
      withInsurance, setWithInsurance,
      withDiacare, setWithDiacare,

      // V9 Financial Intelligence
      ...kpis
    }}>
      {children}
    </InfraContext.Provider>
  );
}

// --- 7. SECURE HOOK EXPORT ---
export function useInfra() {
  const context = useContext(InfraContext);
  if (!context) {
    throw new Error("CRITICAL V9 ERROR: useInfra must be used within InfraProvider. Check layout.tsx.");
  }
  return context;
}