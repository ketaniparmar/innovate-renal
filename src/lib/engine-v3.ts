// --- 1. REFINED FINANCIAL CONSTANTS ---
const BENCHMARKS = {
  IDEAL_SESSIONS_INDIA: 2.8, // Realistic benchmark vs theoretical 3.0
  DEMAND_FILL_RATE: 0.85,    // 85% patient retention/demand cap
  CONTINGENCY_BUFFER: 0.10,  // 10% for electrical, plumbing, civil surprises
  CONSUMABLE_VOLATILITY: 0.05 // 5% price fluctuation buffer
};

export function calculateV3Economics(data: any) {
  const { machines, sessionsPerDay, state, pmjayMix, privateMix, tpaMix, downtimePercent } = data;

  // --- 2. THE REVENUE ENGINE (Logical Fix: Downtime affects capacity) ---
  const WAR = (pmjayMix/100 * 1300) + (privateMix/100 * 2500) + (tpaMix/100 * 2000);
  
  const baseMonthlySessions = machines * sessionsPerDay * 26;
  // FIX: Downtime reduces the actual session count before revenue calculation
  const effectiveSessions = baseMonthlySessions * (1 - (downtimePercent / 100));
  const monthlyRevenue = effectiveSessions * WAR;

  // --- 3. THE COST ENGINE (Adjusted for Volatility) ---
  const baseConsumableCost = data.mode === "single" ? 700 : 496;
  const adjustedConsumableCost = baseConsumableCost * (1 + BENCHMARKS.CONSUMABLE_VOLATILITY);
  
  const fixedOpex = 180000 + 100000 + (machines * 10000) + (machines * 4000) + 30000;
  const totalOpex = fixedOpex + (effectiveSessions * adjustedConsumableCost);

  // --- 4. THE LEAKAGE ENGINE (Conceptually Upgraded) ---
  // Downtime Loss is the Delta between Base and Effective Revenue
  const downtimeLoss = (baseMonthlySessions - effectiveSessions) * WAR;
  
  // Utilization Loss relative to 2.8 benchmark
  const utilLoss = sessionsPerDay < BENCHMARKS.IDEAL_SESSIONS_INDIA
    ? machines * (BENCHMARKS.IDEAL_SESSIONS_INDIA - sessionsPerDay) * 26 * WAR
    : 0;

  // --- 5. THE PROFIT & CAPEX ENGINE (CFO-Grade) ---
  const netEffectiveProfit = (monthlyRevenue - totalOpex);
  
  const capexRaw = (machines * (800000 + 200000)) + 2500000;
  const totalCapex = capexRaw * (1 + BENCHMARKS.CONTINGENCY_BUFFER);

  // FIX: Mathematical Safety for Break-Even
  const breakEvenMonths = netEffectiveProfit > 0 
    ? (totalCapex / netEffectiveProfit).toFixed(1) 
    : null; // UI will handle null as "Not Viable"

  // --- 6. CONVERSION WEAPONS ---
  const costOfDelay = netEffectiveProfit > 0 ? netEffectiveProfit : 0;
  const saasRoiJustification = (downtimeLoss + utilLoss) * 0.15; // Assuming OS recovers 15% of leakage

  return {
    totalCapex,
    netEffectiveProfit,
    breakEvenMonths,
    downtimeLoss,
    utilLoss,
    costOfDelay,
    saasRoiJustification
  };
}