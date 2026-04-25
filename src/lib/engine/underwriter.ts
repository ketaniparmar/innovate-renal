import { SOVEREIGN_CONSTANTS as C } from './constants';

// ✅ 1. EXPLICIT INTERFACE (To prevent Vercel "Type Error" crashes)
export interface SovereignUnderwriterInputs {
  name?: string;
  location?: string;
  machines: number;
  beds: number;
  cityTier: 1 | 2 | 3;
  tdsLevel: number;
  mode: "reuse" | "single";
  pmjayPct: number;
  pvtPct: number;
}

export class SovereignUnderwriter {
  // ✅ 2. INTERNAL STATE (Protects React UI from mutations)
  private params: SovereignUnderwriterInputs;

  constructor(inputs: SovereignUnderwriterInputs) {
    // Deep clone to ensure immutability from the frontend
    this.params = JSON.parse(JSON.stringify(inputs));
    this.normalizePayorMix();
  }

  // ✅ 3. SAFETY MECHANISM: Ensure percentages never exceed 100%
  private normalizePayorMix() {
    const total = this.params.pmjayPct + this.params.pvtPct;
    if (total > 100) {
      const factor = 100 / total;
      this.params.pmjayPct *= factor;
      this.params.pvtPct *= factor;
    }
  }

  public evaluate() {
    const { machines, beds, cityTier, tdsLevel, mode, pmjayPct, pvtPct, name, location } = this.params;

    // 1. CAPEX CALCULATION
    const totalArea = ((machines * 120) + (beds * 200)) * 1.35; // 35% circulation space
    const civilRate = cityTier === 1 ? C.CIVIL_RATE_TIER_1 : cityTier === 2 ? C.CIVIL_RATE_TIER_2 : C.CIVIL_RATE_TIER_3;
    
    const civil = totalArea * civilRate;
    const equipment = (machines * C.MACHINE_COST) + (beds * C.BED_COST);
    
    // Hard water penalty for RO plant
    const roMultiplier = tdsLevel > 1000 ? 1.6 : 1.0;
    const ro = C.RO_PLANT_BASE * Math.max(1, Math.ceil(machines / 10)) * roMultiplier;
    
    const mep = (civil + equipment) * 0.18;
    const baseCapex = civil + equipment + ro + mep;
    const totalCapex = baseCapex * 1.05; // 5% Contingency

    // 2. OPEX & REVENUE CALCULATION
    const tpaPct = Math.max(0, 100 - pmjayPct - pvtPct); // Auto-calculate remainder
    const annualSessions = machines * 2.5 * C.WORKING_DAYS * C.UPTIME_YIELD;
    
    const war = (pmjayPct / 100 * 1300) + (pvtPct / 100 * 2600) + (tpaPct / 100 * 2100);
    const revenue = annualSessions * war;
    
    const consumableCost = mode === 'single' ? C.CONSUMABLE_SINGLE_USE : C.CONSUMABLE_REUSE;
    const opex = (annualSessions * consumableCost) + (machines * 18000 * 12) + (totalCapex * 0.02) + 1800000;
    const ebitda = revenue - opex;

    // 3. FINANCE METRICS (With NaN / Divide-by-Zero protections)
    // Assuming Debt Service is roughly 25% of CAPEX for proxy purposes
    const annualDebtServiceProxy = totalCapex * 0.25;
    const dscr = annualDebtServiceProxy > 0 ? (ebitda / annualDebtServiceProxy) : 0;
    
    const irr = totalCapex > 0 ? ((ebitda / totalCapex) * 100 * 0.85) : 0; 

    // 4. CREDIT RATING ENGINE
    let rating = 'HIGH RISK';
    if (dscr >= 2.0) rating = 'AAA';
    else if (dscr >= 1.5) rating = 'AA';
    else if (dscr >= 1.2) rating = 'A';
    else if (dscr > 0) rating = 'BBB';

    // 5. THE STANDARDIZED RETURN PAYLOAD
    return {
      identity: { 
        name: name || 'Project Alpha', 
        location: location || 'TBD' 
      },
      capexBreakdown: {
        civil: Math.round(civil),
        equipment: Math.round(equipment),
        ro: Math.round(ro),
        mep: Math.round(mep),
        contingency: Math.round(totalCapex - baseCapex),
        totalCapex: Math.round(totalCapex)
      },
      ebitda: Math.round(ebitda),
      irr: Number(irr.toFixed(2)),
      dscr: Number(dscr.toFixed(2)),
      rating
    };
  }
}