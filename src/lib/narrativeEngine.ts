// Define the expected structure of the project data payload
export interface ProjectFinancialData {
  hospitalName?: string;
  machines: number;
  state: string;
  total_capex: number;
  break_even_months: number;
  monthly_leakage: number;
  pmjay_percent: number;
  dialysis_mode: "single_use" | "reuse";
  sessions_per_day: number;
  net_profit_monthly: number;
}

// Utility for clean INR formatting in text
const formatINR = (value: number) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} Lakhs`;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};

export function generateExecutiveSummary(project: ProjectFinancialData): string {
  // 1. CORE THESIS (Asset & Capital)
  const entity = project.hospitalName ? project.hospitalName : "the proposed facility";
  const thesis = `This Detailed Project Report (DPR) establishes the financial feasibility and operational blueprint for a ${project.machines}-bed turnkey hemodialysis infrastructure deployment at ${entity} in ${project.state}. Requiring an estimated capital expenditure (CAPEX) of ${formatINR(project.total_capex)}, the asset is modeled to achieve complete break-even within ${project.break_even_months.toFixed(1)} months, generating a net effective monthly yield of ${formatINR(project.net_profit_monthly)} at maturity. `;

  // 2. COMPLIANCE & PAYOR STRATEGY (Operational Reality)
  let complianceNarrative = "";
  if (project.dialysis_mode === "single_use") {
    complianceNarrative = `Operating under mandated single-use clinical protocols, the facility is shielded from cross-infection liabilities and aligned with strict NABH-compliant workflows. `;
  } else {
    complianceNarrative = `Utilizing a managed dialyzer reuse protocol, the facility optimizes gross margins per session, requiring stringent water treatment (RO) oversight to maintain clinical safety. `;
  }

  let payorNarrative = "";
  if (project.pmjay_percent > 65) {
    payorNarrative = `With a heavily weighted Ayushman Bharat (PMJAY) payor mix (${project.pmjay_percent}%), the financial model relies on high-throughput volume efficiency to counter compressed per-session margins. `;
  } else if (project.pmjay_percent < 30) {
    payorNarrative = `Driven by a strong private and TPA payor mix, the asset benefits from premium realization rates, allowing for robust EBITDA margins even at baseline utilization. `;
  } else {
    payorNarrative = `A balanced payor matrix ensures revenue stability, hedging government scheme volumes against premium private cash flows. `;
  }

  // 3. RISK & LEAKAGE ENGINE (The "Hook" for Innovate IndAI AMC/OS)
  let riskNarrative = "";
  if (project.monthly_leakage > 200000 || project.sessions_per_day < 2.2) {
    riskNarrative = `Critical Financial Vulnerability: Algorithmic stress-testing identifies an active operational leakage of ${formatINR(project.monthly_leakage)} per month. This uncaptured revenue—driven by asset underutilization and projected system downtime—mandates immediate structural intervention. Deploying predictive AMC protocols and continuous operational telemetry is required to recapture this lost yield and protect the investment baseline.`;
  } else {
    riskNarrative = `Operational Outlook: The current configuration indicates a highly stabilized infrastructure footprint. Negligible operational leakage (${formatINR(project.monthly_leakage)}/mo) suggests strong capacity utilization. The primary mandate moving forward is maintaining zero-downtime RO plant performance to defend existing cash flows.`;
  }

  // 4. ASSEMBLE THE FINAL NARRATIVE
  return `${thesis}${complianceNarrative}${payorNarrative}${riskNarrative}`;
}