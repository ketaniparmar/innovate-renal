"use client";

// --- INSTITUTIONAL CONSTANTS ---
const V6_CONFIG = {
  WACC: 0.12,               // 12% Cost of Capital (Hurdle Rate)
  TAX_RATE: 0.25,           // 25% Corporate Tax
  DEPRECIATION_WDV: 0.15,   // 15% Written Down Value (Tax Shield)
  EXIT_MULTIPLE: 7,         // 7x FCF Terminal Value (Exit Strategy)
  MAINT_CAPEX_PCT: 0.03,    // 3% Revenue reinvested for tech upkeep
  RECEIVABLES_LAG_DAYS: 45, // Blended AR lag (PMJAY 60 days vs Private 7 days)
  DEBT_RATIO: 0.70,         // 70% Bank Debt
  INTEREST_RATE: 0.105,     // 10.5% ROI on Loan
};

export function calculateV6Institutional(data: any) {
  const { machines, sessionsPerDay, state, pmjay, pvt, tpa, downtime, mode } = data;

  // 1. REVENUE REALIZATION (Weighted Average Realization)
  const totalMix = Math.max(pmjay + pvt + tpa, 1);
  const pMix = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
  const WAR = (pMix.pmjay * 1300) + (pMix.pvt * 2500) + (pMix.tpa * 2000);

  // 2. TIERED CAPEX ARCHITECTURE
  const equipCapex = machines * 850000; // Updated 2026 Procurement rates
  const infraCapex = 2500000 + (machines * 200000); // Fixed base + scaling civil
  const preOperativeExp = (equipCapex + infraCapex) * 0.05; 
  const totalCapex = (equipCapex + infraCapex + preOperativeExp) * 1.10; // 10% Contingency

  // 3. 60-MONTH ASSET LIFECYCLE MODEL
  let cashflows: number[] = [-totalCapex];
  let dscrValues: number[] = [];
  const debtComponent = totalCapex * V6_CONFIG.DEBT_RATIO;
  const annualInterest = debtComponent * V6_CONFIG.INTEREST_RATE;
  const annualPrincipal = debtComponent / 5;

  for (let year = 1; year <= 5; year++) {
    // Sigmoid Ramp: Accounts for slow clinical adoption vs rapid scaling
    // Occupancy(t) = 1 / (1 + exp(-k * (t-x0)))
    const ramp = 1 / (1 + Math.exp(-1.5 * (year - 1))); 
    
    const yearlyVolume = (machines * sessionsPerDay * 26 * 12) * ramp * (1 - downtime/100);
    const revenue = yearlyVolume * WAR;
    
    // OPEX Escalation (5% Annual Inflation)
    const inflation = Math.pow(1.05, year - 1);
    const unitConsumable = (mode === "single" ? 455 : 330) * inflation;
    const fixedOpex = (500000 + (machines * 15000)) * 12 * inflation;
    const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex;
    
    const ebitda = revenue - totalOpex;

    // Depreciation & Tax Shield
    const depreciation = (totalCapex * V6_CONFIG.DEPRECIATION_WDV) / Math.pow(1.1, year - 1);
    const ebit = ebitda - depreciation;
    const tax = ebit > 0 ? ebit * V6_CONFIG.TAX_RATE : 0;
    
    // TRUE FREE CASH FLOW (FCF)
    // FCF = EBIT(1-t) + Depr - MaintCapex - ΔWC
    const maintCapex = revenue * V6_CONFIG.MAINT_CAPEX_PCT;
    const fcf = (ebit * (1 - V6_CONFIG.TAX_RATE)) + depreciation - maintCapex;
    
    // DSCR Logic (Institutional Solvency)
    const debtService = annualPrincipal + annualInterest;
    dscrValues.push(fcf / debtService);
    
    cashflows.push(fcf);
  }

  // 4. TERMINAL VALUE (The "Exit" Valuation)
  const terminalValue = cashflows[cashflows.length - 1] * V6_CONFIG.EXIT_MULTIPLE;
  cashflows[cashflows.length - 1] += terminalValue;

  return {
    totalCapex,
    npv: calculateNPV(cashflows, V6_CONFIG.WACC),
    irr: calculateIRR(cashflows),
    avgDSCR: dscrValues.reduce((a, b) => a + b) / 5,
    paybackMonths: (totalCapex / (cashflows[1] / 12)).toFixed(1),
    fcfTrajectory: cashflows.slice(1),
    exitValue: terminalValue
  };
}

// --- VALUATION HELPERS ---

function calculateNPV(cashflows: number[], rate: number) {
  return cashflows.reduce((acc, val, i) => acc + val / Math.pow(1 + rate, i), 0);
}

function calculateIRR(cashflows: number[]) {
  let irr = 0.1; // Initial guess
  const MAX_ITER = 100;
  const PRECISION = 0.00001;

  for (let i = 0; i < MAX_ITER; i++) {
    const npv = cashflows.reduce((acc, val, j) => acc + val / Math.pow(1 + irr, j), 0);
    const dNPV = cashflows.reduce((acc, val, j) => acc - (j * val) / Math.pow(1 + irr, j + 1), 0);
    
    const newIrr = irr - npv / dNPV;
    if (Math.abs(newIrr - irr) < PRECISION) return newIrr * 100;
    irr = newIrr;
  }
  return irr * 100;
}