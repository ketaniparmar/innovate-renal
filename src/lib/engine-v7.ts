"use client";

// --- SOVEREIGN FINANCIAL CONFIG (V7.0) ---
const V7_CONFIG = {
  WACC: 0.125,               // 12.5% Weighted Average Cost of Capital
  TAX_RATE: 0.25,             // Standard Corporate Tax
  DEPRECIATION_WDV: 0.15,     // 15% WDV for Tax Shield
  EXIT_MULTIPLE: 8.5,         // 8.5x EBITDA Exit (Market Standard for 2026)
  MAINT_CAPEX_PCT: 0.025,     // 2.5% Revenue for tech refresh
  INFLATION_RATE: 0.05,       // 5% Annual OPEX escalation
  // WORKING CAPITAL DYNAMICS
  AR_DAYS_PMJAY: 65,          // 65-day average collection for Govt schemes
  AR_DAYS_PRIVATE: 7,         // 7-day average for TPA/Cash
  INVENTORY_DAYS: 15,         // 15-day stock of consumables
};

export function calculateV7Sovereign(data: any) {
  const { machines, sessionsPerDay, state, pmjay, pvt, tpa, downtime, mode } = data;

  // 1. REVENUE & PAYOR NORMALIZATION
  const totalMix = Math.max(pmjay + pvt + tpa, 1);
  const weights = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
  const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

  // 2. TIERED CAPEX ARCHITECTURE
  const equipCapex = machines * 850000; 
  const infraCapex = 2800000 + (machines * 220000); // Inflation-adjusted civil works
  const totalCapex = (equipCapex + infraCapex) * 1.15; // 15% Contingency + Pre-ops

  // 3. 5-YEAR CASHFLOW & WORKING CAPITAL MODEL
  let cashflows: number[] = [-totalCapex];
  let yearlyEbitda: number[] = [];
  let workingCapitalBalance = 0;

  for (let year = 1; year <= 5; year++) {
    // S-CURVE RAMP-UP (Sigmoid)
    const ramp = 1 / (1 + Math.exp(-1.8 * (year - 1.2))); 
    const yearlyVolume = (machines * sessionsPerDay * 26 * 12) * ramp * (1 - downtime/100);
    const revenue = yearlyVolume * WAR;
    
    // OPEX WITH SCALE EFFICIENCY
    const inflation = Math.pow(1 + V7_CONFIG.INFLATION_RATE, year - 1);
    const unitConsumable = (mode === "single" ? 455 : 330) * inflation;
    const fixedOpex = (600000 + (machines * 18000)) * 12 * inflation;
    const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex;
    
    const ebitda = revenue - totalOpex;
    yearlyEbitda.push(ebitda);

    // TAX & DEPRECIATION SHIELD
    const depreciation = (totalCapex * V6_CONFIG.DEPRECIATION_WDV) / Math.pow(1.1, year - 1);
    const ebit = ebitda - depreciation;
    const tax = ebit > 0 ? ebit * V7_CONFIG.TAX_RATE : 0;
    
    // WORKING CAPITAL DYNAMICS (The AR/Inventory Gap)
    // Calculate blended AR based on Payor Mix
    const blendedARDays = (weights.pmjay * V7_CONFIG.AR_DAYS_PMJAY) + (weights.pvt * V7_CONFIG.AR_DAYS_PRIVATE);
    const newWCBalance = (revenue / 365) * blendedARDays + (totalOpex / 365) * V7_CONFIG.INVENTORY_DAYS;
    const deltaWC = newWCBalance - workingCapitalBalance;
    workingCapitalBalance = newWCBalance;

    // SOVEREIGN FREE CASH FLOW
    const maintCapex = revenue * V7_CONFIG.MAINT_CAPEX_PCT;
    const fcf = (ebit * (1 - V7_CONFIG.TAX_RATE)) + depreciation - maintCapex - deltaWC;
    
    cashflows.push(fcf);
  }

  // 4. TERMINAL VALUE (Exit at Year 5)
  const terminalValue = yearlyEbitda[yearlyEbitda.length - 1] * V7_CONFIG.EXIT_MULTIPLE;
  cashflows[cashflows.length - 1] += terminalValue;

  return {
    totalCapex,
    npv: calculateNPV(cashflows, V7_CONFIG.WACC),
    irr: calculateIRR(cashflows),
    exitValue: terminalValue,
    fcfTrajectory: cashflows.slice(1),
    paybackMonths: (totalCapex / (cashflows[1] / 12)).toFixed(1)
  };
}

// VALUATION HELPERS (Robust Newton-Raphson)
function calculateNPV(cfs: number[], r: number) {
  return cfs.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i), 0);
}

function calculateIRR(cfs: number[]) {
  let irr = 0.15; 
  for (let i = 0; i < 100; i++) {
    const npv = cfs.reduce((a, v, j) => a + v / Math.pow(1 + irr, j), 0);
    const dnpv = cfs.reduce((a, v, j) => a - (j * v) / Math.pow(1 + irr, j + 1), 0);
    const newIrr = irr - npv / dnpv;
    if (Math.abs(newIrr - irr) < 0.00001) return newIrr * 100;
    irr = newIrr;
  }
  return irr * 100;
}"use client";

// --- SOVEREIGN FINANCIAL CONFIG (V7.0) ---
const V7_CONFIG = {
  WACC: 0.125,               // 12.5% Weighted Average Cost of Capital
  TAX_RATE: 0.25,             // Standard Corporate Tax
  DEPRECIATION_WDV: 0.15,     // 15% WDV for Tax Shield
  EXIT_MULTIPLE: 8.5,         // 8.5x EBITDA Exit (Market Standard for 2026)
  MAINT_CAPEX_PCT: 0.025,     // 2.5% Revenue for tech refresh
  INFLATION_RATE: 0.05,       // 5% Annual OPEX escalation
  // WORKING CAPITAL DYNAMICS
  AR_DAYS_PMJAY: 65,          // 65-day average collection for Govt schemes
  AR_DAYS_PRIVATE: 7,         // 7-day average for TPA/Cash
  INVENTORY_DAYS: 15,         // 15-day stock of consumables
};

export function calculateV7Sovereign(data: any) {
  const { machines, sessionsPerDay, state, pmjay, pvt, tpa, downtime, mode } = data;

  // 1. REVENUE & PAYOR NORMALIZATION
  const totalMix = Math.max(pmjay + pvt + tpa, 1);
  const weights = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
  const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

  // 2. TIERED CAPEX ARCHITECTURE
  const equipCapex = machines * 850000; 
  const infraCapex = 2800000 + (machines * 220000); // Inflation-adjusted civil works
  const totalCapex = (equipCapex + infraCapex) * 1.15; // 15% Contingency + Pre-ops

  // 3. 5-YEAR CASHFLOW & WORKING CAPITAL MODEL
  let cashflows: number[] = [-totalCapex];
  let yearlyEbitda: number[] = [];
  let workingCapitalBalance = 0;

  for (let year = 1; year <= 5; year++) {
    // S-CURVE RAMP-UP (Sigmoid)
    const ramp = 1 / (1 + Math.exp(-1.8 * (year - 1.2))); 
    const yearlyVolume = (machines * sessionsPerDay * 26 * 12) * ramp * (1 - downtime/100);
    const revenue = yearlyVolume * WAR;
    
    // OPEX WITH SCALE EFFICIENCY
    const inflation = Math.pow(1 + V7_CONFIG.INFLATION_RATE, year - 1);
    const unitConsumable = (mode === "single" ? 455 : 330) * inflation;
    const fixedOpex = (600000 + (machines * 18000)) * 12 * inflation;
    const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex;
    
    const ebitda = revenue - totalOpex;
    yearlyEbitda.push(ebitda);

    // TAX & DEPRECIATION SHIELD
    const depreciation = (totalCapex * V6_CONFIG.DEPRECIATION_WDV) / Math.pow(1.1, year - 1);
    const ebit = ebitda - depreciation;
    const tax = ebit > 0 ? ebit * V7_CONFIG.TAX_RATE : 0;
    
    // WORKING CAPITAL DYNAMICS (The AR/Inventory Gap)
    // Calculate blended AR based on Payor Mix
    const blendedARDays = (weights.pmjay * V7_CONFIG.AR_DAYS_PMJAY) + (weights.pvt * V7_CONFIG.AR_DAYS_PRIVATE);
    const newWCBalance = (revenue / 365) * blendedARDays + (totalOpex / 365) * V7_CONFIG.INVENTORY_DAYS;
    const deltaWC = newWCBalance - workingCapitalBalance;
    workingCapitalBalance = newWCBalance;

    // SOVEREIGN FREE CASH FLOW
    const maintCapex = revenue * V7_CONFIG.MAINT_CAPEX_PCT;
    const fcf = (ebit * (1 - V7_CONFIG.TAX_RATE)) + depreciation - maintCapex - deltaWC;
    
    cashflows.push(fcf);
  }

  // 4. TERMINAL VALUE (Exit at Year 5)
  const terminalValue = yearlyEbitda[yearlyEbitda.length - 1] * V7_CONFIG.EXIT_MULTIPLE;
  cashflows[cashflows.length - 1] += terminalValue;

  return {
    totalCapex,
    npv: calculateNPV(cashflows, V7_CONFIG.WACC),
    irr: calculateIRR(cashflows),
    exitValue: terminalValue,
    fcfTrajectory: cashflows.slice(1),
    paybackMonths: (totalCapex / (cashflows[1] / 12)).toFixed(1)
  };
}

// VALUATION HELPERS (Robust Newton-Raphson)
function calculateNPV(cfs: number[], r: number) {
  return cfs.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i), 0);
}

function calculateIRR(cfs: number[]) {
  let irr = 0.15; 
  for (let i = 0; i < 100; i++) {
    const npv = cfs.reduce((a, v, j) => a + v / Math.pow(1 + irr, j), 0);
    const dnpv = cfs.reduce((a, v, j) => a - (j * v) / Math.pow(1 + irr, j + 1), 0);
    const newIrr = irr - npv / dnpv;
    if (Math.abs(newIrr - irr) < 0.00001) return newIrr * 100;
    irr = newIrr;
  }
  return irr * 100;
}