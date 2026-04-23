export const CAPEX_BENCHMARKS = {
  // AREA RULES (SQ FT)
  AREA_PER_STATION: 100,      // Station + Circulation
  RO_ROOM_BASE: 250,
  SUPPORT_BUFFER: 0.15,       // 15% for nursing, storage, utility

  // CIVIL RATES (₹ / SQ FT)
  CIVIL_RATES: {
    standalone: 2200,
    nephrology_hosp: 3200,
    multispeciality: 4500,
  },

  // ENGINEERING LOADS
  KW_PER_MACHINE: 3.5,
  LPH_PER_MACHINE: 45,        // Litres per hour (Single-pass avg)
  HVAC_SQFT_PER_TON: 165,
};

export function calculateSovereignCapex(data: any) {
  const { machines, facilityType, state, tdsLevel, sessionsPerDay } = data;

  // 1. SPACE ENGINEERING
  const dialysisArea = machines * CAPEX_BENCHMARKS.AREA_PER_STATION;
  const roArea = machines > 10 ? 400 : 250;
  const totalBuiltUpArea = (dialysisArea + roArea) * (1 + CAPEX_BENCHMARKS.SUPPORT_BUFFER);

  // 2. CIVIL BLOCK
  const civilRate = CAPEX_BENCHMARKS.CIVIL_RATES[facilityType as keyof typeof CAPEX_BENCHMARKS.CIVIL_RATES] || 2500;
  const geoMultiplier = state === "Gujarat" ? 0.95 : 1.25; // Surat vs Metro
  const civilCost = totalBuiltUpArea * civilRate * geoMultiplier;

  // 3. MEDICAL EQUIPMENT BLOCK
  const machineUnitCost = 850000;
  const equipmentCost = machines * machineUnitCost;

  // 4. WATER SYSTEM (TDS DRIVEN)
  const roCapacityReq = machines * CAPEX_BENCHMARKS.LPH_PER_MACHINE;
  // Cost scales with TDS and capacity
  const waterSystemBase = roCapacityReq * 1200; 
  const tdsMultiplier = tdsLevel > 1500 ? 1.8 : tdsLevel > 500 ? 1.3 : 1.0;
  const waterSystemCost = waterSystemBase * tdsMultiplier;

  // 5. ELECTRICAL & HVAC LOAD
  const connectedLoadKW = machines * CAPEX_BENCHMARKS.KW_PER_MACHINE;
  const upsCost = connectedLoadKW * 18000; // ₹18k per KW for medical UPS
  
  const hvacTonnage = totalBuiltUpArea / CAPEX_BENCHMARKS.HVAC_SQFT_PER_TON;
  const hvacCost = hvacTonnage * 45000; // ₹45k per ton (Medical Grade)

  // 6. TOTAL CAPEX ASSEMBLY
  const subtotal = civilCost + equipmentCost + waterSystemCost + upsCost + hvacCost;
  const itAndCompliance = subtotal * 0.04; // 4% for HIS/Compliance
  const workingCapital = (subtotal * 0.08); // 3-month float

  const totalCapex = subtotal + itAndCompliance + workingCapital;

  return {
    totalArea: totalBuiltUpArea,
    civilCost,
    equipmentCost,
    waterSystemCost,
    electricalCost: upsCost,
    hvacCost,
    itAndCompliance,
    workingCapital,
    totalCapex,
    breakdown: [
      { label: "Infrastructure", value: civilCost },
      { label: "Medical Tech", value: equipmentCost + waterSystemCost },
      { label: "Engineering (Elec/HVAC)", value: upsCost + hvacCost },
      { label: "Sustenance Buffer", value: workingCapital },
    ]
  };
}