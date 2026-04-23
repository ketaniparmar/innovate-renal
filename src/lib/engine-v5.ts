// --- FINANCIAL CONSTANTS ---
const CONFIG = {
  DISCOUNT_RATE: 0.12,         // 12% Hurdle Rate
  TAX_RATE: 0.25,              // 25% Corporate Tax
  DEPRECIATION_RATE: 0.15,     // 15% WDV for medical equipment
  PMJAY_LAG_DAYS: 60,          // 2-month reimbursement lag
  PVT_LAG_DAYS: 7,             // Private cash is instant-ish
  CONTINGENCY: 1.10,           // 10% Capex Buffer
};

export function calculateV5Enterprise(data: any) {
  const { machines, sessionsPerDay, state, pmjay, pvt, tpa, downtime, mode } = data;

  // 1. Normalized Payor Mix
  const totalMix = Math.max(pmjay + pvt + tpa, 1);
  const pMix = { pmjay: pmjay/totalMix, pvt: pvt/totalMix, tpa: tpa/totalMix };
  const WAR = (pMix.pmjay * 1300) + (pMix.pvt * 2500) + (pMix.tpa * 2000);

  // 2. CAPEX Structuring (Tiered)
  const equipCapex = machines * 800000;
  const infraCapex = 2500000 + (machines * 200000); // Fixed base + scaling civil
  const workingCapitalBuffer = (equipCapex + infraCapex) * 0.05; // 5% cash reserve
  const totalCapex = (equipCapex + infraCapex + workingCapitalBuffer) * CONFIG.CONTINGENCY;

  // 3. 60-Month Cash Flow Projection
  let cumulativeNPV = 0;
  let annualFCF: number[] = [];
  let currentSessions = machines * sessionsPerDay * 26;
  
  // Model Year 1 - 5
  for (let year = 1; year <= 5; year++) {
    // Occupancy Ramp: Y1 (70%), Y2 (90%), Y3+ (95% of target)
    const ramp = year === 1 ? 0.7 : year === 2 ? 0.9 : 0.95;
    const yearlyVolume = currentSessions * 12 * ramp * (1 - downtime/100);
    
    const revenue = yearlyVolume * WAR;
    
    // OPEX (Consumables + Fixed Escalated at 5%/yr)
    const inflation = Math.pow(1.05, year - 1);
    const unitConsumable = (mode === "single" ? 455 : 330) * inflation;
    const fixedOpex = (500000 + (machines * 15000)) * 12 * inflation;
    const totalOpex = (yearlyVolume * unitConsumable) + fixedOpex;
    
    const ebitda = revenue - totalOpex;
    const depreciation = (totalCapex * CONFIG.DEPRECIATION_RATE) / Math.pow(1.15, year-1);
    const ebit = ebitda - depreciation;
    const tax = ebit > 0 ? ebit * CONFIG.TAX_RATE : 0;
    
    // Free Cash Flow (FCF)
    const fcf = ebitda - tax; // Simple FCF: EBITDA - Tax
    annualFCF.push(fcf);
    
    // Discounting (NPV)
    cumulativeNPV += fcf / Math.pow(1 + CONFIG.DISCOUNT_RATE, year);
  }

  const finalNPV = cumulativeNPV - totalCapex;
  
  return {
    totalCapex,
    annualFCF,
    finalNPV,
    irr: calculateIRR([-totalCapex, ...annualFCF]),
    dscr: annualFCF[0] / (totalCapex / 5), // Simplified: Y1 FCF vs 5-year straight debt
    paybackMonths: (totalCapex / (annualFCF[0] / 12)).toFixed(1)
  };
}

// IRR Helper (Newton-Raphson approximation)
function calculateIRR(cashflows: number[]) {
  let res = 0.1;
  for (let i = 0; i < 20; i++) {
    let npv = 0;
    let dNPV = 0;
    for (let j = 0; j < cashflows.length; j++) {
      npv += cashflows[j] / Math.pow(1 + res, j);
      dNPV -= j * cashflows[j] / Math.pow(1 + res, j + 1);
    }
    res -= npv / dNPV;
  }
  return res * 100;
}