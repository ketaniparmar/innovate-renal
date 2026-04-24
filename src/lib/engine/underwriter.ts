import { SOVEREIGN_CONSTANTS as C } from './constants';
import type { SovereignInputs } from './types'; 

export class SovereignUnderwriter {
  private inputs: SovereignInputs;

  constructor(inputs: SovereignInputs) {
    this.inputs = inputs;
  }

  public evaluate() {
    const { machines, beds, cityTier, tdsLevel, mode, pmjayPct, pvtPct } = this.inputs;

    // 1. CAPEX CALCULATION
    const totalArea = ((machines * 120) + (beds * 200)) * 1.35;
    const civilRate = cityTier === 1 ? C.CIVIL_RATE_TIER_1 : cityTier === 2 ? C.CIVIL_RATE_TIER_2 : C.CIVIL_RATE_TIER_3;
    const civil = totalArea * civilRate;
    const equipment = (machines * C.MACHINE_COST) + (beds * C.BED_COST);
    const ro = C.RO_PLANT_BASE * Math.ceil(machines / 10) * (tdsLevel > 1000 ? 1.6 : 1.0);
    const mep = (civil + equipment) * 0.18;
    const totalCapex = (civil + equipment + ro + mep) * 1.05; // 5% Contingency

    // 2. OPEX & REVENUE CALCULATION
    const annualSessions = machines * 2.5 * C.WORKING_DAYS * C.UPTIME_YIELD;
    const war = (pmjayPct / 100 * 1300) + (pvtPct / 100 * 2600) + ((100 - pmjayPct - pvtPct) / 100 * 2100);
    const revenue = annualSessions * war;
    const consumableCost = mode === 'single' ? C.CONSUMABLE_SINGLE_USE : C.CONSUMABLE_REUSE;
    const opex = (annualSessions * consumableCost) + (machines * 18000 * 12) + (totalCapex * 0.02) + 1800000;
    const ebitda = revenue - opex;

    // 3. FINANCE METRICS
    const dscr = ebitda / (totalCapex * 0.25);
    const irr = (ebitda / totalCapex) * 100 * 0.85; // Fast Proxy IRR for real-time dashboards

    // 4. THE STANDARDIZED RETURN PAYLOAD (Now includes capexBreakdown for the UI)
    return {
      identity: { 
        name: this.inputs.name, 
        location: this.inputs.location 
      },
      capexBreakdown: {
        civil: Math.round(civil),
        equipment: Math.round(equipment),
        ro: Math.round(ro),
        mep: Math.round(mep),
        contingency: Math.round(totalCapex - (civil + equipment + ro + mep)),
        totalCapex: Math.round(totalCapex)
      },
      ebitda: Math.round(ebitda),
      irr: Number(irr.toFixed(2)),
      dscr: Number(dscr.toFixed(2)),
      rating: dscr > 2 ? 'AAA' : dscr > 1.5 ? 'AA' : dscr > 1.2 ? 'A' : 'HIGH RISK'
    };
  }
}