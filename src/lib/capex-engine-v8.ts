// src/lib/engine/capex-engine-v8.ts

export interface CapexInputs {
  machines: number;
  cityTier: 'Tier_1' | 'Tier_2' | 'Tier_3';
  buildGrade: 'Standard' | 'Premium' | 'NABH';
  tdsLevel: number;
}

export interface CapexOutput {
  civil: number;
  equipment: number;
  roPlant: number;
  mep: number;
  totalCapex: number;
  contingency: number;
}

export function calculateV8Capex(data: CapexInputs): CapexOutput {
  const { machines, cityTier, buildGrade, tdsLevel } = data;

  // 1. CIVIL & INTERIOR (Per sq ft math based on NABH compliance)
  // Each machine requires ~120 sq ft including circulation and nursing stations
  const totalArea = machines * 120 * 1.25; 
  
  let baseRate = 1800; // Tier 2 Standard
  if (cityTier === 'Tier_1') baseRate += 400;
  if (cityTier === 'Tier_3') baseRate -= 200;
  if (buildGrade === 'Premium') baseRate += 500;
  if (buildGrade === 'NABH') baseRate += 900;

  const civil = totalArea * baseRate;

  // 2. MEDICAL EQUIPMENT (Dialysis Machines + Beds + Monitors)
  const machineUnitCost = 750000; // Standard import rate
  const equipment = machines * (machineUnitCost + 85000); // Including cardiac monitors/furniture

  // 3. RO WATER PLANT (Hard water scaling factor for Gujarat/Maharashtra)
  // Base RO cost for 10-15 machines is ~4.5L
  let roBase = 450000;
  if (machines > 15) roBase = 750000;
  
  // High TDS penalty (TDS > 1000 requires double-pass RO)
  const roPlant = tdsLevel > 1000 ? roBase * 1.65 : roBase;

  // 4. MEP (Mechanical, Electrical, Plumbing - Oxygen/Power/HVAC)
  const mep = civil * 0.22;

  // 5. TOTALS
  const subtotal = civil + equipment + roPlant + mep;
  const contingency = subtotal * 0.05; // 5% buffer for material price fluctuation
  const totalCapex = subtotal + contingency;

  return {
    civil: Math.round(civil),
    equipment: Math.round(equipment),
    roPlant: Math.round(roPlant),
    mep: Math.round(mep),
    contingency: Math.round(contingency),
    totalCapex: Math.round(totalCapex)
  };
}