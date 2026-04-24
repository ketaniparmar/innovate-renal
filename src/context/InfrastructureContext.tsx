"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface InfraContextType {
  machines: number;
  setMachines: (val: number) => void;
  sessionsPerDay: number;
  setSessionsPerDay: (val: number) => void;
  mode: "reuse" | "single";
  setMode: (val: "reuse" | "single") => void;
  pmjay: number;
  setPmjay: (val: number) => void;
  pvt: number;
  setPvt: (val: number) => void;
  // Institutional Constants
  baseFee: number;
  machineFeeRate: number;
  sessionFeeRate: number;
}

const InfraContext = createContext<InfraContextType | undefined>(undefined);

export function InfraProvider({ children }: { children: ReactNode }) {
  // 1. INITIAL STATE (Fallback defaults)
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [mode, setMode] = useState<"reuse" | "single">("single");
  const [pmjay, setPmjay] = useState(60);
  const [pvt, setPvt] = useState(25);

  const baseFee = 15000;
  const machineFeeRate = 1000;
  const sessionFeeRate = 10;

  // 2. HYDRATION: Load data from LocalStorage on Mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("sovereign_os_dna");
      if (savedState) {
        const dna = JSON.parse(savedState);
        if (dna.machines) setMachines(dna.machines);
        if (dna.sessionsPerDay) setSessionsPerDay(dna.sessionsPerDay);
        if (dna.mode) setMode(dna.mode);
        if (dna.pmjay) setPmjay(dna.pmjay);
        if (dna.pvt) setPvt(dna.pvt);
        console.log("🧬 Project DNA Hydrated from Storage");
      }
    } catch (e) {
      console.warn("Failed to hydrate Infrastructure DNA", e);
    }
  }, []);

  // 3. PERSISTENCE: Save to LocalStorage whenever values change
  useEffect(() => {
    const dnaToSave = {
      machines,
      sessionsPerDay,
      mode,
      pmjay,
      pvt
    };
    localStorage.setItem("sovereign_os_dna", JSON.stringify(dnaToSave));
  }, [machines, sessionsPerDay, mode, pmjay, pvt]);

  return (
    <InfraContext.Provider value={{
      machines, setMachines,
      sessionsPerDay, setSessionsPerDay,
      mode, setMode,
      pmjay, setPmjay,
      pvt, setPvt,
      baseFee, machineFeeRate, sessionFeeRate
    }}>
      {children}
    </InfraContext.Provider>
  );
}

export function useInfra() {
  const context = useContext(InfraContext);
  if (!context) throw new Error("useInfra must be used within an InfraProvider");
  return context;
}