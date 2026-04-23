export const CAPEX_BENCHMARKS = {
  MACHINE_UNIT_COST: 850000,      // Lepu/High-end Hemodialysis unit
  RO_PLANT_BASE: 450000,          // Medical Grade RO Plant
  CIVIL_PER_MACHINE: 180000,      // Medical plumbing, electrical, bed, furniture
  BASE_INFRA_FIXED: 2500000,      // Interior, Reception, CSSD, Nursing Station
  WORKING_CAPITAL_MONTHS: 3,      // 3-month cash runway
};

export function calculateDetailedCapex(machines: number) {
  const equipmentTotal = machines * CAPEX_BENCHMARKS.MACHINE_UNIT_COST;
  const roPlantTotal = machines > 12 ? CAPEX_BENCHMARKS.RO_PLANT_BASE * 1.5 : CAPEX_BENCHMARKS.RO_PLANT_BASE;
  const civilTotal = (machines * CAPEX_BENCHMARKS.CIVIL_PER_MACHINE) + CAPEX_BENCHMARKS.BASE_INFRA_FIXED;
  
  const subTotal = equipmentTotal + roPlantTotal + civilTotal;
  const contingency = subTotal * 0.10; // 10% buffer
  const total = subTotal + contingency;

  return {
    equipment: equipmentTotal,
    roPlant: roPlantTotal,
    civil: civilTotal,
    contingency: contingency,
    total: total,
    breakdown: [
      { item: "Hemodialysis Fleet", cost: equipmentTotal, pct: (equipmentTotal / total) * 100 },
      { item: "Medical Grade RO Plant", cost: roPlantTotal, pct: (roPlantTotal / total) * 100 },
      { item: "Civil & Infrastructure", cost: civilTotal, pct: (civilTotal / total) * 100 },
      { item: "Regulatory & Contingency", cost: contingency, pct: (contingency / total) * 100 },
    ]
  };
}