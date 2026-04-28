import { MARKET_MODELS } from "../market-models/india-dialysis";

export interface NewCenterInputs {
  machines: number;
  cityTier: "Tier 1 (Metro)" | "Tier 2 (Urban)" | "Tier 3 (Semi-Urban)";
  buildGrade: "Standard Commercial" | "Premium NABH Compliant";
  expectedSessionsPerDay: number;
}

export function calculateTurnkeyCapex(inputs: NewCenterInputs) {
  // 1. Core Equipment Cost (Machines)
  const machineUnitCost = MARKET_MODELS.INSURANCE.AVG_MACHINE_CAPEX;
  const totalMachineCost = inputs.machines * machineUnitCost;

  // 2. RO Water Plant Sizing
  // High capacity double-pass RO required for >10 machines or Premium NABH
  const requiresDoublePass = inputs.machines >= 10 || inputs.buildGrade === "Premium NABH Compliant";
  const roPlantCost = requiresDoublePass ? 1450000 : 850000;

  // 3. Civil & Interior Cost (Scales by City Tier and Build Grade)
  let costPerBed = 0;
  if (inputs.cityTier === "Tier 1 (Metro)") costPerBed = 450000;
  else if (inputs.cityTier === "Tier 2 (Urban)") costPerBed = 300000;
  else costPerBed = 220000;

  if (inputs.buildGrade === "Premium NABH Compliant") {
    costPerBed *= 1.35; // 35% premium for strict infection control zoning and materials
  }
  const totalCivilCost = inputs.machines * costPerBed;

  // 4. MEP (Electrical, HVAC, Plumbing)
  // HVAC load is massive for dialysis. Electrical backup (UPS/DG) is mandatory.
  const mepCostPerBed = inputs.buildGrade === "Premium NABH Compliant" ? 250000 : 150000;
  const totalMepCost = inputs.machines * mepCostPerBed;

  // 5. Total Capital Setup
  const totalSetupCost = totalMachineCost + roPlantCost + totalCivilCost + totalMepCost;

  // 6. Payback Timeline Estimate (Conservative Scenario)
  const monthlySessions = inputs.machines * inputs.expectedSessionsPerDay * 26;
  const conservativeRevenue = monthlySessions * MARKET_MODELS.REVENUE.AVG_SESSION_RATE;
  const assumedProfitMargin = 0.25; // 25% take-home after heavy OPEX
  const monthlyProfit = conservativeRevenue * assumedProfitMargin;
  
  const paybackMonths = Math.ceil(totalSetupCost / monthlyProfit);

  return {
    totalSetupCost,
    breakdown: {
      machines: totalMachineCost,
      roPlant: roPlantCost,
      civil: totalCivilCost,
      mep: totalMepCost
    },
    paybackMonths,
    projectedMonthlyRevenue: conservativeRevenue,
    safetyBuffer: totalSetupCost * 0.15 // Recommend 15% working capital buffer
  };
}