"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our global data
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
  // Based on your image: 15,000 base + 1,000/machine + 10/session
  baseFee: number;
  machineFeeRate: number;
  sessionFeeRate: number;
}

const InfraContext = createContext<InfraContextType | undefined>(undefined);

export function InfraProvider({ children }: { children: ReactNode }) {
  const [machines, setMachines] = useState(15);
  const [sessionsPerDay, setSessionsPerDay] = useState(2.5);
  const [mode, setMode] = useState<"reuse" | "single">("single");
  const [pmjay, setPmjay] = useState(60);
  const [pvt, setPvt] = useState(40);

  // Constants from your pricing UI (image_185048.jpg)
  const baseFee = 15000;
  const machineFeeRate = 1000;
  const sessionFeeRate = 10;

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