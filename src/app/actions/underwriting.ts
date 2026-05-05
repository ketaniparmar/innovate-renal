"use server";

// Strictly hidden from the browser
const SECURE_PRICING = {
  machineCost: 650000,
  roBase: 550000,
  roScale: 850000,
  civilPerBed: 200000,
  wholesaleStandard: 850,
  wholesaleSingleUse: 1150,
};

const SINGLE_USE_STATES = ["KARNATAKA", "TAMIL_NADU", "GUJARAT", "DELHI_NCR", "MAHARASHTRA"];

export async function calculateCapex(machines: number) {
  const roCost = machines > 10 ? SECURE_PRICING.roScale : SECURE_PRICING.roBase;
  const total = (machines * SECURE_PRICING.machineCost) + roCost + (machines * SECURE_PRICING.civilPerBed);
  
  return { totalCapex: total, roCost };
}

export async function calculateOpexSavings(machines: number, currentCost: number, state: string, payer: string, auditSafe: boolean) {
  // Policy Engine Evaluated on Server
  let isReuseAllowed = true;
  if (SINGLE_USE_STATES.includes(state)) isReuseAllowed = false;
  if (auditSafe && payer === "PM_JAY") isReuseAllowed = false;

  const applicableWholesale = isReuseAllowed ? SECURE_PRICING.wholesaleStandard : SECURE_PRICING.wholesaleSingleUse;
  
  const monthlySessions = Math.floor(machines * 2 * 26 * 0.85);
  const currentExpense = monthlySessions * currentCost;
  const optimizedExpense = monthlySessions * applicableWholesale;
  
  return {
    isReuseAllowed,
    wholesaleCost: applicableWholesale,
    monthlySavings: currentExpense - optimizedExpense,
  };
}