// types.ts
export interface OSInputs {
  machines: number;
  sessions: number;
  downtimePct: number;
  state: 'Gujarat' | 'Tamil Nadu' | 'Karnataka' | 'Telangana' | 'Other';
  payorMix: { pmjay: number; private: number; tpa: number };
  isReuse: boolean;
  isOptimized: boolean;
}

// engine.ts
export class DialysisDecisionEngine {
  private readonly DAYS = 26;
  private readonly RO_CAPEX = 2500000;
  private readonly RO_OPEX = 30000;
  private readonly RENT = 150000;

  constructor(private inputs: OSInputs) {
    this.normalizePayorMix();
    this.enforceStatePolicy();
  }

  private normalizePayorMix() {
    const total = this.inputs.payorMix.pmjay + this.inputs.payorMix.private + this.inputs.payorMix.tpa;
    if (total !== 100) {
      // Normalization logic ensures sum equals 100%
      const factor = 100 / total;
      this.inputs.payorMix.pmjay *= factor;
      this.inputs.payorMix.private *= factor;
      this.inputs.payorMix.tpa *= factor;
    }
  }

  private enforceStatePolicy() {
    const strictStates = ['Gujarat', 'Tamil Nadu', 'Karnataka', 'Telangana'];
    if (strictStates.includes(this.inputs.state)) {
      this.inputs.isReuse = false; // Override toggle
    }
  }

  public calculate() {
    const s = this.inputs.isOptimized ? 2.8 : this.inputs.sessions;
    const tau = this.inputs.isOptimized ? 0.03 : (this.inputs.downtimePct / 100);
    const delta = this.inputs.isOptimized ? 0.95 : 0.85;
    const m = this.inputs.machines;

    const war = (this.inputs.payorMix.pmjay * 0.01 * 1300) + 
                (this.inputs.payorMix.private * 0.01 * 2500) + 
                (this.inputs.payorMix.tpa * 0.01 * 2000);

    const activeSessions = m * s * this.DAYS * delta * (1 - tau);
    const nrr = activeSessions * war;

    // Cost Engine
    const consumableRate = this.inputs.isReuse ? 496 : 700;
    const consumables = (activeSessions * consumableRate) * 1.05; // 5% buffer
    
    let staffCost = 250000;
    if (m > 10 && m <= 20) staffCost = 400000;
    if (m > 20) staffCost = 600000;

    const fixedOpex = staffCost + this.RENT + (m * 10000) + (m * 4000) + this.RO_OPEX;
    const totalOpex = consumables + fixedOpex;
    const profit = nrr - totalOpex;

    // CAPEX & Breakeven
    const baseCapex = (m * 800000) + (m * 200000) + this.RO_CAPEX;
    const totalCapex = baseCapex * 1.10; // 10% contingency
    const breakevenMonths = profit > 0 ? (totalCapex / profit) : null;

    // Leakage Engine
    const downtimeLoss = (m * s * this.DAYS * delta * tau) * war;
    const underutilizationLoss = ((4 - s) * m * this.DAYS * delta) * war;

    return { nrr, totalOpex, profit, totalCapex, breakevenMonths, downtimeLoss, underutilizationLoss, activeSessions };
  }
}