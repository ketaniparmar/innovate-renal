/**
 * CLINICAL FINANCIAL MARKET MODELS (INDIA)
 * Proprietary benchmarks for dialysis infrastructure setup and operations.
 * Derived from actual PMJAY guidelines, standard AMC/CMC contracts, and vendor pricing.
 */

export const MARKET_MODELS = {
  REVENUE: {
    AVG_SESSION_RATE: 1850,              // Standard blended rate (PMJAY + Private)
    INSURANCE_DELAY_DAYS: 75,            // Average reimbursement delay for Govt/TPA
    COST_OF_CAPITAL_MONTHLY: 0.015,      // 1.5% working capital drag per month
  },
  
  CONSUMABLES: {
    SINGLE_USE_PMJAY: 400,               // Standard PMJAY-aligned single-use bundle benchmark
    REUSE_LEGACY: 600,                   // Equivalent operational cost for reuse models
    WASTE_BENCHMARK: 40,                 // Standard unoptimized single-use waste/leakage
    REUSE_OVERHEAD: 200,                 // Hidden processing/validation overhead for reuse
  },
  
  MAINTENANCE: {
    CMC_YEARLY: 45000,                   // Comprehensive Maintenance Contract 
    AMC_YEARLY: 25000,                   // Annual Maintenance Contract 
    ON_CALL_YEARLY: 10000,               // Emergency / On-call servicing estimate
    DOWNTIME_RATES: {
      CMC: 0.02,                         // 2% downtime (High Uptime Guarantee)
      AMC: 0.05,                         // 5% downtime (Standard Risk)
      ON_CALL: 0.12,                     // 12% downtime (High Revenue Risk)
    }
  },
  
  INSURANCE: {
    EEI_RATE: 0.01,                      // Electronic Equipment Insurance (1% of CAPEX)
    AVG_MACHINE_CAPEX: 1100000,          // Standard clinical grade hemodialysis unit cost
  },

  OPERATIONS: {
    BASELINE_FRICTION_PCT: 0.15,         // 15% unavoidable operational/administrative leakage
    OPTIMAL_OCCUPANCY_PCT: 85,           // 85% is considered max safe continuous clinical occupancy
  }
} as const;

// Type export for strict usage across your TypeScript engine
export type MarketModelsType = typeof MARKET_MODELS;