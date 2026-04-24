export interface ProjectIdentity {
  name: string;
  location: string;
}

export interface ProjectParameters {
  machines: number;
  beds: number;
  cityTier: 1 | 2 | 3;
  tdsLevel: number;
  mode: 'single' | 'reuse';
  pmjayPct: number;
  pvtPct: number;
}

export type SovereignInputs = ProjectIdentity & ProjectParameters;