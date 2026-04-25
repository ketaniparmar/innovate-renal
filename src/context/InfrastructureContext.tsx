"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- 1. TYPE DEFINITIONS (V8 Sovereign Standard) ---
interface InfraContextType {
  machines: number;
  setMachines: (val: number) => void;
  sessionsPerDay: number;
  setSessionsPerDay: (val: number) => void;
  downtime: number;
  setDowntime: (val: number) => void;
  mode: "reuse" | "single";
  setMode: (val: "reuse" | "single") => void;
  pmjay: number;
  setPmjay: (val: number) => void;
  pvt: number;
  setPvt: (val: number) => void;
  tpa: number;
  setTpa: (val: number) => void;
  cityTier: "Tier_1" | "Tier_2" | "Tier_3";
  setCityTier: (val: "Tier_1" | "Tier_2" | "Tier_3") => void;
  tdsLevel: number;
  setTdsLevel: (val: number) => void;
  buildGrade: "Standard" | "Premium" | "NABH";
  setBuildGrade: (val: "Standard" | "Premium" | "NABH") => void;
}

const InfraContext = createContext<InfraContextType | undefined>(undefined);

export function InfraProvider({ children }: { children: ReactNode }) {
  // --- 2. INITIAL STATE (Calibrated for Jalgaon / Diacare Hub Profile) ---
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.8);
  const [downtime, setDowntime] = useState(5);
  const [mode, setMode] = useState<"reuse" | "single">("single");
  
  const [pmjay, setPmjay] = useState(40);
  const [pvt, setPvt] = useState(40);
  const [tpa, setTpa] = useState(20);

  const [cityTier, setCityTier] = useState<"Tier_1" | "Tier_2" | "Tier_3">("Tier_2");
  const [tdsLevel, setTdsLevel] = useState(850);
  const [buildGrade, setBuildGrade] = useState<"Standard" | "Premium" | "NABH">("Premium");

  // --- 3. PROJECT DNA HYDRATION ---
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("sovereign_os_v8_dna");
      if (savedState) {
        const dna = JSON.parse(savedState);
        if (dna.machines) setMachines(dna.machines);
        if (dna.sessionsPerDay) setSessionsPerDay(dna.sessionsPerDay);
        if (dna.downtime !== undefined) setDowntime(dna.downtime);
        if (dna.mode) setMode(dna.mode);
        if (dna.pmjay !== undefined) setPmjay(dna.pmjay);
        if (dna.pvt !== undefined) setPvt(dna.pvt);
        if (dna.tpa !== undefined) setTpa(dna.tpa);
        if (dna.cityTier) setCityTier(dna.cityTier);
        if (dna.tdsLevel !== undefined) setTdsLevel(dna.tdsLevel);
        if (dna.buildGrade) setBuildGrade(dna.buildGrade);

        console.log("🧬 SOVEREIGN OS: Project DNA sequence loaded successfully.");
      }
    } catch (e) {
      console.warn("⚠️ DNA HYDRATION FAILURE: Operating on default parameters.", e);
    }
  }, []);

  // --- 4. PERSISTENCE LAYER ---
  useEffect(() => {
    const dnaToSave = { machines, sessionsPerDay, downtime, mode, pmjay, pvt, tpa, cityTier, tdsLevel, buildGrade };
    localStorage.setItem("sovereign_os_v8_dna", JSON.stringify(dnaToSave));
  }, [machines, sessionsPerDay, downtime, mode, pmjay, pvt, tpa, cityTier, tdsLevel, buildGrade]);

  return (
    <InfraContext.Provider value={{
      machines, setMachines,
      sessionsPerDay, setSessionsPerDay,
      downtime, setDowntime,
      mode, setMode,
      pmjay, setPmjay,
      pvt, setPvt,
      tpa, setTpa,
      cityTier, setCityTier,
      tdsLevel, setTdsLevel,
      buildGrade, setBuildGrade
    }}>
      {children}
    </InfraContext.Provider>
  );
}

export function useInfra() {
  const context = useContext(InfraContext);
  if (!context) throw new Error("CRITICAL: useInfra called outside of Provider.");
  return context;
}