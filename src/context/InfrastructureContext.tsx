"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- 1. TYPE DEFINITIONS ---
interface InfraContextType {
  downtime: number;
  // Core Clinical Capacity
  machines: number;
  setMachines: (val: number) => void;
  sessionsPerDay: number;
  setSessionsPerDay: (val: number) => void;
  mode: "reuse" | "single";
  setMode: (val: "reuse" | "single") => void;
  
  // Payor Mix Portfolio
  pmjay: number;
  setPmjay: (val: number) => void;
  pvt: number;
  setPvt: (val: number) => void;

  // --- NEW: v8.0 Parametric CAPEX Variables ---
  cityTier: "Tier_1" | "Tier_2" | "Tier_3";
  setCityTier: (val: "Tier_1" | "Tier_2" | "Tier_3") => void;
  tdsLevel: number;
  setTdsLevel: (val: number) => void;
  buildGrade: "Standard" | "Premium" | "NABH";
  setBuildGrade: (val: "Standard" | "Premium" | "NABH") => void;

  // Institutional SaaS Constants (For Pricing/AMC calculations)
  baseFee: number;
  machineFeeRate: number;
  sessionFeeRate: number;
}

const InfraContext = createContext<InfraContextType | undefined>(undefined);

export function InfraProvider({ children }: { children: ReactNode }) {
  // --- 2. INITIAL STATE (Defaults calibrated for Surat/Gujarat) ---
  
  // Core Base
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [mode, setMode] = useState<"reuse" | "single">("single");
  
  // Payor Base
  const [pmjay, setPmjay] = useState(60);
  const [pvt, setPvt] = useState(25);

  // CAPEX Base
  const [cityTier, setCityTier] = useState<"Tier_1" | "Tier_2" | "Tier_3">("Tier_2");
  const [tdsLevel, setTdsLevel] = useState(800);
  const [buildGrade, setBuildGrade] = useState<"Standard" | "Premium" | "NABH">("Premium");

  // Constants
  const baseFee = 15000;
  const machineFeeRate = 1000;
  const sessionFeeRate = 10;

  // --- 3. HYDRATION: Securely load Project DNA from browser memory ---
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("sovereign_os_dna");
      if (savedState) {
        const dna = JSON.parse(savedState);
        
        // Restore Core
        if (dna.machines) setMachines(dna.machines);
        if (dna.sessionsPerDay) setSessionsPerDay(dna.sessionsPerDay);
        if (dna.mode) setMode(dna.mode);
        if (dna.pmjay) setPmjay(dna.pmjay);
        if (dna.pvt) setPvt(dna.pvt);
        
        // Restore CAPEX Engineering parameters
        if (dna.cityTier) setCityTier(dna.cityTier);
        if (dna.tdsLevel) setTdsLevel(dna.tdsLevel);
        if (dna.buildGrade) setBuildGrade(dna.buildGrade);

        console.log("🧬 Project DNA Hydrated Successfully (v8.0)");
      }
    } catch (e) {
      console.warn("Sovereign OS: Failed to hydrate Infrastructure DNA. Reverting to defaults.", e);
    }
  }, []);

  // --- 4. PERSISTENCE: Save state dynamically on every change ---
  useEffect(() => {
    const dnaToSave = {
      machines,
      sessionsPerDay,
      mode,
      pmjay,
      pvt,
      cityTier,
      tdsLevel,
      buildGrade
    };
    localStorage.setItem("sovereign_os_dna", JSON.stringify(dnaToSave));
  }, [machines, sessionsPerDay, mode, pmjay, pvt, cityTier, tdsLevel, buildGrade]);

  return (
    <InfraContext.Provider value={{
      // State
      machines, setMachines,
      sessionsPerDay, setSessionsPerDay,
      mode, setMode,
      pmjay, setPmjay,
      pvt, setPvt,
      cityTier, setCityTier,
      tdsLevel, setTdsLevel,
      buildGrade, setBuildGrade,
      
      // Constants
      baseFee, machineFeeRate, sessionFeeRate
    }}>
      {children}
    </InfraContext.Provider>
  );
}

// --- 5. SECURE HOOK EXPORT ---
export function useInfra() {
  const context = useContext(InfraContext);
  if (!context) {
    throw new Error("useInfra must be used within an InfraProvider wrapper. Check layout.tsx.");
  }
  return context;
}