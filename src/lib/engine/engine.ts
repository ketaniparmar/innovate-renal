// src/lib/engine/engine.ts
import { OSInputs, OSEngineOutput } from './types';

export class DialysisDecisionEngine {
  private readonly DAYS = 26;
  private readonly RO_CAPEX = 2500000;
  private readonly RO_OPEX = 30000;
  private readonly RENT = 150000;
  
  // ✅ FIX: Internal state copy to prevent React UI mutation bugs
  private params: OSInputs;

  constructor(inputs: OSInputs) {
    // Deep clone to ensure we don't accidentally mutate the frontend state
    this.params = JSON.parse(JSON.stringify(inputs));
    this.normalizePayorMix();
    this.enforceStatePolicy();
  }

  private normalizePayorMix() {
    const { pmjay, private: pvt, tpa } = this.params.payorMix;
    const total = pmjay + pvt + tpa;
    
    // ✅ FIX: Prevent Divide-by-Zero NaN crash if all inputs are 0
    if (total === 0) {
      this.params.payorMix = { pmjay: 40, private: 40, tpa: 20 }; // Safe fallback
    } else if (total !== 100) {
      const factor = 100 / total;
      this.params.payorMix.pmjay = pmjay * factor;
      this.params.payorMix.private = pvt * factor;
      this.params.payorMix.tpa = tpa * factor;
    }
  }

  private enforceStatePolicy() {
    const strictStates = ['Gujarat', 'Tamil Nadu', 'Karnataka', 'Telangana'];
    if (strictStates.includes(this.params.state)) {
      this.params.isReuse = false; // Override toggle: Single-use is mandatory
    }
  }

  public calculate(): OSEngineOutput {
    // If Optimized, push towards 2.8, else use actual. 
    // Ensure it doesn't downgrade if actual is already > 2.8
    const baselineSessions = this.params.sessions;
    const s = this.params.isOptimized ? Math.max(2.8, baselineSessions) : baselineSessions;
    
    const tau = this.params.isOptimized ? 0.03 : (this.params.downtimePct / 100);
    const delta = this.params.isOptimized ? 0.95 : 0.85;
    const m = this.params.machines;

    const war = (this.params.payorMix.pmjay * 0.01 * 1300) + 
                (this.params.payorMix.private * 0.01 * 2500) + 
                (this.params.payorMix.tpa * 0.01 * 2000);

    const activeSessions = m * s * this.DAYS * delta * (1 - tau);
    const monthlyRevenue = activeSessions * war; // ✅ Renamed from nrr

    // Cost Engine
    const consumableRate = this.params.isReuse ? 496 : 700;
    const consumables = (activeSessions * consumableRate) * 1.05; // 5% buffer
    
    let staffCost = 250000;
    if (m > 10 && m <= 20) staffCost = 400000;
    if (m > 20) staffCost = 600000;

    const fixedOpex = staffCost + this.RENT + (m * 10000) + (m * 4000) + this.RO_OPEX;
    const totalOpex = consumables + fixedOpex;
    const ebitda = monthlyRevenue - totalOpex; // ✅ Renamed from profit

    // CAPEX & Breakeven
    const baseCapex = (m * 800000) + (m * 200000) + this.RO_CAPEX;
    const totalCapex = baseCapex * 1.10; // 10% contingency
    const breakevenMonths = ebitda > 0 ? parseFloat((totalCapex / ebitda).toFixed(1)) : 0; // ✅ Safe zero

    // Leakage Engine
    const downtimeLoss = (m * baselineSessions * this.DAYS * delta * tau) * war;
    
    // ✅ FIX: Safe Underutilization Math (Target is 4. Cannot be negative)
    const missedSessionsPerDay = Math.max(0, 4 - baselineSessions);
    const underutilizationLoss = (missedSessionsPerDay * m * this.DAYS * delta) * war;

    return { 
      monthlyRevenue, 
      totalOpex, 
      ebitda, 
      totalCapex, 
      breakevenMonths, 
      downtimeLoss, 
      underutilizationLoss, 
      activeSessions 
    };
  }
}