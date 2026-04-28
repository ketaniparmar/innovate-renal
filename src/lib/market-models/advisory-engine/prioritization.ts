import { calculateOperationalLeakage, FacilityInputs } from "./leakage-engine";

export function generateActionPlan(inputs: FacilityInputs) {
  const leakage = calculateOperationalLeakage(inputs);

  const actions = [
    {
      category: "Consumable Waste & Margin",
      value: leakage.consumableLeakage,
      action: inputs.consumableModel === "Reuse" 
        ? "Transition to Single-Use compliant models to instantly recover ~₹200/session margin." 
        : "Audit vendor pricing to hit the ₹400/kit standard benchmark."
    },
    {
      category: "Machine Downtime Exposure",
      value: leakage.downtimeLeakage,
      action: inputs.maintenanceContract === "CMC" 
        ? "Maintain current CMC coverage. Monitor specific machine breakdown patterns." 
        : "Upgrade to CMC contract to cap downtime at <2% and ensure revenue continuity."
    },
    {
      category: "Working Capital Drag",
      value: leakage.cashFlowLeakage,
      action: `With a ${inputs.insuranceMix}% insurance dependency, optimizing claim submission cycles is critical to recovering capital interest.`
    }
  ];

  // Sort by highest financial impact
  return actions.sort((a, b) => b.value - a.value);
}