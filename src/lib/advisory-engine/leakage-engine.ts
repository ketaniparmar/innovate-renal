import { MARKET_MODELS } from "../market-models/india-dialysis";

export interface FacilityInputs {
  machines: number;
  sessionsPerDay: number;
  avgRevenue: number;
  insuranceMix: number; // Percentage
  consumableModel: "Single-Use" | "Reuse";
  maintenanceContract: "CMC" | "AMC" | "On-Call / None";
  occupancyRate: number; // Percentage
}

export function calculateOperationalLeakage(inputs: FacilityInputs) {
  const daysPerMonth = 26;
  const currentMonthlySessions = inputs.machines * inputs.sessionsPerDay * daysPerMonth;
  const monthlyRevenue = currentMonthlySessions * inputs.avgRevenue;

  // 1. Consumable Leakage Calculation
  const consumableLeakage = inputs.consumableModel === "Reuse" 
    ? currentMonthlySessions * MARKET_MODELS.CONSUMABLES.REUSE_OVERHEAD
    : currentMonthlySessions * MARKET_MODELS.CONSUMABLES.WASTE_BENCHMARK;

  // 2. Downtime Leakage Calculation
  const downtimeRate = MARKET_MODELS.MAINTENANCE.DOWNTIME_RATES[
    inputs.maintenanceContract === "CMC" ? "CMC" : 
    inputs.maintenanceContract === "AMC" ? "AMC" : "ON_CALL"
  ];
  const downtimeLeakage = monthlyRevenue * downtimeRate;

  // 3. Cash Flow / Working Capital Leakage
  const insuranceRevenue = monthlyRevenue * (inputs.insuranceMix / 100);
  const delayMonths = MARKET_MODELS.REVENUE.INSURANCE_DELAY_DAYS / 30;
  const cashFlowLeakage = insuranceRevenue * (delayMonths * MARKET_MODELS.REVENUE.COST_OF_CAPITAL_MONTHLY);

  // 4. Occupancy Inefficiency
  const optimalOccupancy = 85;
  const occupancyLeakage = inputs.occupancyRate < optimalOccupancy 
    ? (monthlyRevenue * 0.15) * ((optimalOccupancy - inputs.occupancyRate) / 100)
    : 0;

  const totalMonthlyLeakage = consumableLeakage + downtimeLeakage + cashFlowLeakage + occupancyLeakage;

  return {
    monthlyRevenue,
    consumableLeakage,
    downtimeLeakage,
    cashFlowLeakage,
    occupancyLeakage,
    totalMonthlyLeakage,
    optimizedLeakage: totalMonthlyLeakage * 0.15, // Unavoidable baseline friction
    netImprovement: totalMonthlyLeakage - (totalMonthlyLeakage * 0.15),
  };
}