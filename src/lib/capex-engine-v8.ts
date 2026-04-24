export interface CapexParams {
  machines: number;
  cityTier: "Tier_1" | "Tier_2" | "Tier_3";
  tdsLevel: number;
  buildGrade: "Standard" | "Premium" | "NABH";
}

const BENCHMARKS = {
  SQFT_PER_MACHINE: 120, // Includes circulation & nursing station
  BASE_MACHINE_COST: 850000,
  BASE_RO_COST: 450000,
  CIVIL_RATES: {
    Tier_1: 3500, // Mumbai, Delhi, Bengaluru
    Tier_2: 2500, // Surat, Vadodara, Nashik
    Tier_3: 1800, // Rural/Towns
  },
  GRADE_MULTIPLIER: {
    Standard: 1.0,
    Premium: 1.3,
    NABH: 1.6, // Heavy infection control, isolation rooms
  }
};

export function calculateV8Capex(params: CapexParams) {
  const { machines, cityTier, tdsLevel, buildGrade } = params;

  // 1. SPACE & CIVIL ENGINEERING
  const totalSqFt = machines * BENCHMARKS.SQFT_PER_MACHINE * 1.2; // 20% utility buffer
  const civilRate = BENCHMARKS.CIVIL_RATES[cityTier] * BENCHMARKS.GRADE_MULTIPLIER[buildGrade];
  const civilCost = totalSqFt * civilRate;

  // 2. BIOMEDICAL EQUIPMENT
  const equipmentCost = machines * BENCHMARKS.BASE_MACHINE_COST;

  // 3. WATER TREATMENT (TDS Logic)
  // If TDS is high (>1000), require Double-Pass RO & heavy softening
  const roScaleFactor = Math.ceil(machines / 10); // 1 plant per 10 machines
  const tdsMultiplier = tdsLevel > 1000 ? 1.6 : 1.0; 
  const waterSystemCost = BENCHMARKS.BASE_RO_COST * roScaleFactor * tdsMultiplier;

  // 4. MEP (Mechanical, Electrical, Plumbing + HVAC)
  // HVAC and Electrical scales with Civil footprint and machine heat load
  const mepCost = civilCost * 0.45;

  // 5. REGULATORY & CONTINGENCY
  const subtotal = civilCost + equipmentCost + waterSystemCost + mepCost;
  const contingency = subtotal * 0.10;

  const totalCapex = subtotal + contingency;

  return {
    metrics: {
      totalSqFt,
      civilRate,
      requiresDoublePassRO: tdsLevel > 1000,
    },
    costs: {
      equipment: equipmentCost,
      civil: civilCost,
      water: waterSystemCost,
      mep: mepCost,
      contingency: contingency,
      total: totalCapex,
    },
    breakdown: [
      { id: "equip", label: "Medical Fleet", value: equipmentCost, pct: (equipmentCost/totalCapex)*100 },
      { id: "civil", label: "Civil & Interiors", value: civilCost, pct: (civilCost/totalCapex)*100 },
      { id: "mep", label: "MEP & HVAC", value: mepCost, pct: (mepCost/totalCapex)*100 },
      { id: "water", label: "Water Treatment", value: waterSystemCost, pct: (waterSystemCost/totalCapex)*100 },
      { id: "buffer", label: "Contingency", value: contingency, pct: (contingency/totalCapex)*100 },
    ]
  };
}