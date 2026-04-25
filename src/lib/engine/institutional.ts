// src/lib/engine/institutional.ts

export interface InstitutionalInputs {
  machines: number;
  sessions: number;
  downtimePct: number;
  state: string;
  payorMix: { pmjay: number; pvt: number; tpa: number };
  isReuse: boolean;
}

export class SovereignFinancialEngine {
  // Transparent Assumptions
  public readonly ASSUMPTIONS = {
    workingDays: 26,
    rates: { pmjay: 1300, pvt: 2500, tpa: 2000 },
    collectionEfficiency: { pmjay: 0.75, pvt: 1.0, tpa: 0.85 },
    workingCapitalMonths: 3,
    contingencyBuffer: 1.10,
    consumableBuffer: 1.05
  };

  // Fixed Costs
  private readonly CAPEX_RO = 2500000;
  private readonly OPEX_RO = 30000;
  private readonly RENT = 150000;

  constructor(private inputs: InstitutionalInputs) {
    this.normalizePayorMix();
  }

  private normalizePayorMix() {
    const total = this.inputs.payorMix.pmjay + this.inputs.payorMix.pvt + this.inputs.payorMix.tpa;
    if (total === 0) return;
    if (total !== 100) {
      const factor = 100 / total;
      this.inputs.payorMix.pmjay *= factor;
      this.inputs.payorMix.pvt *= factor;
      this.inputs.payorMix.tpa *= factor;
    }
  }

  private isStrictState(): boolean {
    return ['Gujarat', 'Tamil Nadu', 'Karnataka', 'Telangana'].includes(this.inputs.state);
  }

  // Scenario Runner
  public runScenarios() {
    return {
      base: this.calculateScenario(this.inputs.sessions, this.inputs.downtimePct, 0.85),
      optimized: this.calculateScenario(2.8, 3, 0.95),
      stress: this.calculateScenario(this.inputs.sessions, this.inputs.downtimePct + 5, 0.70)
    };
  }

  private calculateScenario(sessions: number, downtimePct: number, demandFill: number) {
    const m = this.inputs.machines;
    const tau = downtimePct / 100;
    const isReuse = this.isStrictState() ? false : this.inputs.isReuse;

    // --- LAYER 1: P&L REALITY (EBITDA Waterfall) ---
    const war = (this.inputs.payorMix.pmjay * 0.01 * this.ASSUMPTIONS.rates.pmjay) + 
                (this.inputs.payorMix.pvt * 0.01 * this.ASSUMPTIONS.rates.pvt) + 
                (this.inputs.payorMix.tpa * 0.01 * this.ASSUMPTIONS.rates.tpa);

    const theoreticalMaxSessions = m * 4 * this.ASSUMPTIONS.workingDays;
    const grossRevenue = theoreticalMaxSessions * war;
    
    const activeSessions = m * sessions * this.ASSUMPTIONS.workingDays * demandFill * (1 - tau);
    const nrr = activeSessions * war;

    // OPEX
    const consumableRate = isReuse ? 496 : 700;
    const consumables = (activeSessions * consumableRate) * this.ASSUMPTIONS.consumableBuffer;
    let staffCost = m <= 10 ? 250000 : m <= 20 ? 400000 : 600000;
    const fixedOpex = staffCost + this.RENT + (m * 10000) + (m * 4000) + this.OPEX_RO;
    const totalOpex = consumables + fixedOpex;
    
    const ebitda = nrr - totalOpex; // Net Operating Profit

    // --- LAYER 2: CASHFLOW REALITY ---
    const blendedCollectionEff = 
      (this.inputs.payorMix.pmjay * 0.01 * this.ASSUMPTIONS.collectionEfficiency.pmjay) +
      (this.inputs.payorMix.pvt * 0.01 * this.ASSUMPTIONS.collectionEfficiency.pvt) +
      (this.inputs.payorMix.tpa * 0.01 * this.ASSUMPTIONS.collectionEfficiency.tpa);

    const cashInflow = nrr * blendedCollectionEff;
    const netCashflow = cashInflow - totalOpex;

    // --- LAYER 3: BALANCE SHEET & CAPITAL METRICS ---
    const baseCapex = (m * 800000) + (m * 200000) + this.CAPEX_RO;
    const totalCapex = baseCapex * this.ASSUMPTIONS.contingencyBuffer;
    
    const workingCapitalReq = totalOpex * this.ASSUMPTIONS.workingCapitalMonths;
    const totalCapitalRisk = totalCapex + workingCapitalReq;

    // Efficiency
    const roi = ebitda > 0 ? (ebitda * 12) / totalCapex : 0;
    const paybackMonths = ebitda > 0 ? (totalCapex / ebitda) : Infinity;
    const revPerMachine = nrr / m;

    return {
      financials: { grossRevenue, nrr, totalOpex, ebitda, cashInflow, netCashflow },
      capital: { totalCapex, workingCapitalReq, totalCapitalRisk },
      metrics: { roi, paybackMonths, revPerMachine, activeSessions }
    };
  }

  public auditRisk() {
    const flags = [];
    const base = this.calculateScenario(this.inputs.sessions, this.inputs.downtimePct, 0.85);

    if (this.inputs.payorMix.pmjay > 60 && this.isStrictState()) {
      flags.push({ severity: 'HIGH', type: 'Margin Compression', detail: 'High PMJAY dependency in a strict single-use state.' });
    }
    if (this.inputs.downtimePct > 8) {
      flags.push({ severity: 'HIGH', type: 'Operational Instability', detail: `Downtime exceeding 8% causes ₹${((base.financials.grossRevenue * (this.inputs.downtimePct/100)) / 100000).toFixed(2)}L monthly bleed.` });
    }
    if (this.inputs.sessions < 2.2) {
      flags.push({ severity: 'MEDIUM', type: 'Demand Weakness', detail: 'Sessions below 2.2 indicate poor capacity utilization.' });
    }
    if (base.financials.netCashflow < 0) {
      flags.push({ severity: 'CRITICAL', type: 'Liquidity Risk', detail: 'Net Cashflow is negative. Business cannot sustain OPEX without external injection.' });
    }

    return flags;
  }
}