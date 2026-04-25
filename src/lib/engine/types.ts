// src/lib/engine/types.ts

// ============================================================================
// V7 SOVEREIGN ENGINE TYPES (Legacy / Existing API Routes)
// ============================================================================
// This prevents the specific Vercel crash in: src/app/api/v8/projects/underwrite/route.ts
export interface SovereignInputs {
  machines: number;
  sessionsPerDay: number;
  downtime: number;
  pmjay: number;
  pvt: number;
  tpa: number;
  mode: string | "reuse" | "single";
}


// ============================================================================
// V8 SOVEREIGN OS TYPES (New OOP DialysisDecisionEngine)
// ============================================================================
// The strict input blueprint for the State Compliance Engine
export interface OSInputs {
  machines: number;
  sessions: number;
  downtimePct: number;
  state: 'Gujarat' | 'Tamil Nadu' | 'Karnataka' | 'Telangana' | 'Other';
  payorMix: { 
    pmjay: number; 
    private: number; 
    tpa: number; 
  };
  isReuse: boolean;
  isOptimized: boolean;
}

// The exact output blueprint expected by the CFO Dashboard and PDF Generator
export interface OSEngineOutput {
  monthlyRevenue: number;         // Previously 'nrr'
  totalOpex: number;
  ebitda: number;                 // Previously 'profit'
  totalCapex: number;
  breakevenMonths: number;
  downtimeLoss: number;
  underutilizationLoss: number;
  activeSessions: number;
}