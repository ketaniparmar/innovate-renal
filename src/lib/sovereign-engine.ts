// --- SOVEREIGN FINANCIAL CONFIG (V7.0) ---
export const V7_CONFIG = {
  WACC: 0.125,               // 12.5% Hurdle Rate
  TAX_RATE: 0.25,             
  DEPRECIATION_WDV: 0.15,     
  EXIT_MULTIPLE: 8.5,         // 8.5x EBITDA Exit Valuation
  MAINT_CAPEX_PCT: 0.025,     
  INFLATION_RATE: 0.05,       
  AR_DAYS_PMJAY: 65,          // Government Reimbursement Lag
  AR_DAYS_PRIVATE: 7,         
  INVENTORY_DAYS: 15,         
};

// ✅ FIX: Explicit Return Interface so Vercel knows these fields exist
export interface SovereignEngineOutput {
  totalCapex: number;
  npv: number;
  irr: number;
  exitValue: number;
  fcfTrajectory: number[];
  paybackMonths: number;      // Changed to number for easier math
  monthlyRevenue: number;     // Added for DPR
  ebitda: number;             // Added for DPR
  downtimeLoss: number;       // Added for DPR
  underutilizationLoss: number; // Added for DPR
}

// --- THE CALCULATION ENGINE ---
// ✅ FIX: Enforcing the Return Type
export function calculateV7Sovereign(data: any): SovereignEngineOutput {
  const { machines, sessionsPerDay, downtime, pmjay, pvt, tpa, mode } = data;

  const totalMix = Math.max(pmjay + pvt + tpa, 1);
  const weights = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
  const WAR = (weights.pmjay * 1300) + (weights.pvt * 2600) + (weights.tpa * 2100);

  const equipCapex = machines * 850000; 
  const infraCapex = 2800000 + (machines * 220000); 
  const totalCapex = (equipCapex + infraCapex) * 1.15; 

  let cashflows: number[] = [-totalCapex];
  let yearlyEbitda: number[] = [];
  let workingCapitalBalance = 0;

  for (let year = 1; year <= 5; year++) {
    // Sigmoid Ramp-up (S-Curve)
    const ramp = 1 / (1 + Math.exp(-1.8 * (year - 1.2))); 
    const yearlyVolume = (machines * sessionsPerDay * 26 * 12) * ramp * (1 - downtime/100);
    const revenue = yearlyVolume * WAR;
    
    const inflation = Math.pow(1 + V7_CONFIG.INFLATION_RATE, year - 1);
    const unitConsumable = (mode === "single" ? 455 : 330) * inflation;
    const fixedOpex = (600000 + (machines * 18000)) * 12 * inflation;
    const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex;
    
    const ebitda = revenue - totalOpex;
    yearlyEbitda.push(ebitda);

    const depreciation = (totalCapex * V7_CONFIG.DEPRECIATION_WDV) / Math.pow(1.1, year - 1);
    const ebit = ebitda - depreciation;
    
    // Blended Working Capital Lag
    const blendedARDays = (weights.pmjay * V7_CONFIG.AR_DAYS_PMJAY) + (weights.pvt * V7_CONFIG.AR_DAYS_PRIVATE);
    const newWCBalance = (revenue / 365) * blendedARDays + (totalOpex / 365) * V7_CONFIG.INVENTORY_DAYS;
    const deltaWC = newWCBalance - workingCapitalBalance;
    workingCapitalBalance = newWCBalance;

    const maintCapex = revenue * V7_CONFIG.MAINT_CAPEX_PCT;
    const fcf = (ebit * (1 - V7_CONFIG.TAX_RATE)) + depreciation - maintCapex - deltaWC;
    
    cashflows.push(fcf);
  }

  const exitValue = yearlyEbitda[yearlyEbitda.length - 1] * V7_CONFIG.EXIT_MULTIPLE;
  cashflows[cashflows.length - 1] += exitValue;

  // --- NEW OPERATIONAL SNAPSHOT FOR UI & DPR ---
  // Calculating theoretical 100% capacity monthly metrics
  const grossMonthlyVolume = machines * sessionsPerDay * 26;
  const monthlyRevenue = grossMonthlyVolume * WAR;
  const downtimeLoss = monthlyRevenue * (downtime / 100);
  const underutilizationLoss = monthlyRevenue * 0.15; // Standard 15% shift management friction

  // Using Year 2 EBITDA (stabilized post-ramp up) as the representative Monthly EBITDA
  const representativeMonthlyEbitda = yearlyEbitda[1] ? (yearlyEbitda[1] / 12) : 0;
  const paybackMonthsRaw = parseFloat((totalCapex / (cashflows[1] / 12)).toFixed(1));

  return {
    totalCapex,
    npv: calculateNPV(cashflows, V7_CONFIG.WACC),
    irr: calculateIRR(cashflows),
    exitValue,
    fcfTrajectory: cashflows.slice(1, 6),
    paybackMonths: isNaN(paybackMonthsRaw) || paybackMonthsRaw < 0 ? 0 : paybackMonthsRaw,
    // ✅ Binding the new metrics
    monthlyRevenue,
    ebitda: representativeMonthlyEbitda,
    downtimeLoss,
    underutilizationLoss
  };
}

// Math Helpers
export function calculateNPV(cfs: number[], r: number) {
  return cfs.reduce((acc, val, i) => acc + val / Math.pow(1 + r, i), 0);
}

export function calculateIRR(cfs: number[]) {
  let irr = 0.15; 
  for (let i = 0; i < 50; i++) {
    const npv = cfs.reduce((a, v, j) => a + v / Math.pow(1 + irr, j), 0);
    const dnpv = cfs.reduce((a, v, j) => a - (j * v) / Math.pow(1 + irr, j + 1), 0);
    const newIrr = irr - npv / dnpv;
    if (Math.abs(newIrr - irr) < 0.00001) return newIrr * 100;
    irr = newIrr;
  }
  return irr * 100;
}

export function generateSensitivityMatrix(baseData: any) {
  const volVars = [-0.10, -0.05, 0, 0.05, 0.10];
  const costVars = [0.10, 0.05, 0, -0.05, -0.10];
  return volVars.map(v => costVars.map(c => {
    const res = calculateV7Sovereign({...baseData, sessionsPerDay: baseData.sessionsPerDay * (1+v)});
    return { irr: res.irr, npv: res.npv, v, c };
  }));
}