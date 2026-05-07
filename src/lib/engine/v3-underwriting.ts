import crypto from "crypto";

// ==========================================
// CONFIGURATION LAYER (V3.2 Enterprise)
// ==========================================
const CONFIG = {
  MACHINES: { standard: 650000, premium: 850000 },
  CIVIL_COST: { tier1: 3500, tier2: 2800, tier3: 2200 },
  MEP_PER_MACHINE: { standard: 150000, premium: 250000 },
  RO: { base: 800000, distributionPerMachine: 25000, redundancyFactor: 1.35 },
  STAFF_COST: { technician: 22000, nurse: 32000, doctor: 150000, admin: 30000 },
  FIXED_COSTS: {
    rentPerSqft: { tier1: 120, tier2: 75, tier3: 45 },
    electricityPerMachine: 12000,
    maintenancePerMachine: 4500
  },
  PRICING: { pmjay: 1500, privateAvg: 2200 },
  CONTINGENCY: 0.10, // 10% CFO Safety Buffer
  WORKING_CAPITAL_MONTHS: 6 // 6-month survival window
};

const SINGLE_USE_STATES = ["Gujarat", "Delhi NCR", "Tamil Nadu", "Karnataka"];

// ==========================================
// CORE UNDERWRITING ENGINE
// ==========================================
export function calculateDialysisProject(input: {
  machines: number;
  state: string;
  cityTier: "tier1" | "tier2" | "tier3";
  isNABH: boolean;
  sessionsPerDay: number;
  payorMix: { pmjay: number; private: number };
}) {
  const { machines, state, cityTier, isNABH, sessionsPerDay, payorMix } = input;
  const projectId = `PRJ-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

  // 1. AREA & INFRASTRUCTURE
  const areaPerMachine = isNABH ? 100 : 80;
  const totalArea = machines * areaPerMachine;

  // 2. CAPEX CALCULATION
  const machineCost = machines * CONFIG.MACHINES.standard;
  const roTotal = (CONFIG.RO.base + (machines * CONFIG.RO.distributionPerMachine)) * (isNABH ? CONFIG.RO.redundancyFactor : 1);
  const civil = totalArea * CONFIG.CIVIL_COST[cityTier] * (isNABH ? 1.25 : 1);
  const mep = machines * (isNABH ? CONFIG.MEP_PER_MACHINE.premium : CONFIG.MEP_PER_MACHINE.standard);
  const medEquip = machines * 60000 + 500000;

  const subTotal = machineCost + roTotal + civil + mep + medEquip;
  const contingency = subTotal * CONFIG.CONTINGENCY;
  const totalCapex = subTotal + contingency;

  // 3. OPEX ENGINE (Regulatory Aware)
  const isSingleUse = SINGLE_USE_STATES.includes(state);
  const consumableCost = isSingleUse ? 1250 : 850; // Forced compliance for single-use states
  const monthlySessions = Math.floor(machines * sessionsPerDay * 26);
  const variableCostTotal = monthlySessions * consumableCost;

  // Staffing Model (1 Tech per 3 machines)
  const technicians = Math.ceil(machines / 3);
  const staffCost = (technicians * CONFIG.STAFF_COST.technician) + CONFIG.STAFF_COST.doctor + CONFIG.STAFF_COST.admin;
  const rent = totalArea * CONFIG.FIXED_COSTS.rentPerSqft[cityTier];
  const fixedCostTotal = staffCost + rent + (machines * (CONFIG.FIXED_COSTS.electricityPerMachine + CONFIG.FIXED_COSTS.maintenancePerMachine));

  const totalMonthlyOpex = variableCostTotal + fixedCostTotal;

  // 4. REVENUE & EBITDA
  const blendedRate = (payorMix.pmjay * CONFIG.PRICING.pmjay + payorMix.private * CONFIG.PRICING.privateAvg) / 100;
  const monthlyRevenue = monthlySessions * blendedRate;
  const ebitda = monthlyRevenue - totalMonthlyOpex;

  // 5. KPIs & LIQUIDITY
  const paybackMonths = Math.ceil(totalCapex / Math.max(ebitda, 1));
  const workingCapital = totalMonthlyOpex * CONFIG.WORKING_CAPITAL_MONTHS;

  return {
    projectId,
    compliance: isSingleUse ? "SINGLE_USE_MANDATORY" : "REUSE_ALLOWED",
    capex: { total: totalCapex, contingency, breakdown: { machines: machineCost, ro: roTotal, civil, mep } },
    opex: { monthly: totalMonthlyOpex, fixed: fixedCostTotal, variable: variableCostTotal, tcps: totalMonthlyOpex / monthlySessions },
    revenue: { monthly: monthlyRevenue, blendedRate },
    kpis: { ebitda, paybackMonths, workingCapitalRequired: workingCapital, margin: (ebitda / monthlyRevenue) * 100 }
  };
}