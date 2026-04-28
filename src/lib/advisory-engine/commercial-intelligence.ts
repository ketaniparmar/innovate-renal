import { MARKET_MODELS } from "../market-models/india-dialysis";
import { FacilityInputs } from "./leakage-engine";

export function generateCommercialAdvisory(inputs: FacilityInputs) {
  const monthlySessions = inputs.machines * inputs.sessionsPerDay * 26;
  
  // 1. Service Model Recommendation Logic
  let recommendedService = "";
  let serviceRisk = "";
  let isDowntimeHighRisk = inputs.maintenanceContract === "On-Call / None";

  if (inputs.sessionsPerDay >= 2.5 || inputs.machines > 20) {
    // High load / High dependency
    recommendedService = "CMC (Comprehensive Maintenance Contract)";
    serviceRisk = "High patient load detected. Machine downtime directly destroys revenue. CMC is mathematically required to cap downtime under 2%.";
  } else {
    // Startup / Lower load
    recommendedService = "AMC + Preventive Maintenance Program";
    serviceRisk = "Current utilization supports standard AMC, provided strict preventive calibration and RO health checks are enforced.";
  }

  if (isDowntimeHighRisk) {
    serviceRisk = "CRITICAL: On-call breakdown service exposes the facility to unrecoverable revenue loss and clinical disruption. Immediate upgrade required.";
  }

  // 2. Infrastructure Requirement Summary
  const roPlantTier = inputs.machines > 15 ? "High-Capacity Double Pass RO" : "Standard Medical Grade RO";
  const needsReprocessor = inputs.consumableModel === "Reuse";

  // 3. Consumable Efficiency Analysis
  const benchmarkCost = MARKET_MODELS.CONSUMABLES.SINGLE_USE_PMJAY;
  const currentCostAssumed = inputs.consumableModel === "Reuse" ? MARKET_MODELS.CONSUMABLES.REUSE_LEGACY : benchmarkCost + MARKET_MODELS.CONSUMABLES.WASTE_BENCHMARK;
  const efficiencyStatus = currentCostAssumed <= benchmarkCost ? "Optimized" : "Leakage Detected";

  return {
    infrastructure: {
      activeMachines: inputs.machines,
      waterSystem: roPlantTier,
      monthlyConsumables: monthlySessions, // Kits per month
      reprocessorRequired: needsReprocessor ? "Automated Reprocessor Unit Required" : "Not Required (Single-Use Protocol)",
    },
    serviceModel: {
      current: inputs.maintenanceContract,
      recommended: recommendedService,
      riskAnalysis: serviceRisk,
      isHighRisk: isDowntimeHighRisk
    },
    consumables: {
      benchmark: `₹${benchmarkCost}/session`,
      status: efficiencyStatus,
      procurement: inputs.consumableModel === "Reuse" 
        ? "Legacy reuse model detected. High hidden processing overhead." 
        : "Standardized single-use procurement. Audit vendor pricing to ensure ₹400 benchmark."
    }
  };
}