"use server";

// 🔒 SECURE CONSTANTS (Never sent to the browser)
const MARKET_RATES = {
  machine: 750000,
  roBase: 1500000, // Scales with capacity
  civilPerSqFt: { tier1: 2800, tier2: 2000, tier3: 1600 },
  areaPerMachine: 100, // sq ft
  consumables: { reuse: 750, singleUse: 1350 },
  fixedCostPerSession: 650, // Staff + Admin + Utilities
};

export async function generateFinancialModel(input: {
  machines: number;
  tier: "tier1" | "tier2" | "tier3";
  isSingleUse: boolean;
  blendedRevenuePerSession: number;
  occupancyRate: number; // e.g., 0.75 for 75%
}) {
  // 1. CAPEX CALCULATION
  const area = input.machines * MARKET_RATES.areaPerMachine;
  const civilCost = area * MARKET_RATES.civilPerSqFt[input.tier];
  const machineCost = input.machines * MARKET_RATES.machine;
  const roCost = input.machines > 15 ? 2500000 : MARKET_RATES.roBase;
  const mepAndEquip = input.machines * 200000; // Simplified MEP + Clinical buffer

  const totalCapex = machineCost + roCost + civilCost + mepAndEquip;

  // 2. OPEX & REVENUE CALCULATION (Monthly)
  // Assuming 2 shifts, 26 days a month
  const maxSessions = input.machines * 2 * 26;
  const actualSessions = Math.floor(maxSessions * input.occupancyRate);

  const consumableCost = input.isSingleUse 
    ? MARKET_RATES.consumables.singleUse 
    : MARKET_RATES.consumables.reuse;
  
  const totalCostPerSession = consumableCost + MARKET_RATES.fixedCostPerSession;

  const monthlyRevenue = actualSessions * input.blendedRevenuePerSession;
  const monthlyOpex = actualSessions * totalCostPerSession;
  const monthlyEbitda = monthlyRevenue - monthlyOpex;

  // 3. ROI & PAYBACK
  // Payback = Total Capex / Annualized EBITDA
  const paybackMonths = totalCapex / monthlyEbitda;

  return {
    capex: { total: totalCapex, breakdown: { machines: machineCost, civil: civilCost, ro: roCost } },
    opex: { monthlyEbitda, margin: (monthlyEbitda / monthlyRevenue) * 100 },
    roi: { paybackMonths },
  };
}