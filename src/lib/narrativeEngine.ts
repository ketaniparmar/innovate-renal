// src/lib/narrative-engine.ts

interface NarrativeInputs {
  ebitda: number;
  downtimeLoss: number;
  utilLoss: number;
  payorMix?: { pmjay: number; pvt: number; tpa: number };
}

/**
 * GENERATE EXECUTIVE SUMMARY
 * Standardized for Sovereign OS v8.0
 * Focus: CFO-grade diagnostic language
 */
export function generateExecutiveSummary({
  ebitda,
  downtimeLoss,
  utilLoss,
  payorMix
}: NarrativeInputs) {
  
  const totalLeakage = (downtimeLoss || 0) + (utilLoss || 0);
  const monthlyProfit = (ebitda || 0) / 12;

  // 1. Determine Verdict
  let verdict = "⚠️ CONDITIONALLY VIABLE";
  if (monthlyProfit > 300000) verdict = "✅ FINANCIALLY STRONG";
  if (monthlyProfit <= 0) verdict = "❌ NOT VIABLE";

  // 2. Build Sales-Optimized Narrative
  const totalLeakageFormatted = new Intl.NumberFormat('en-IN').format(Math.round(totalLeakage));
  
  let narrative = `Based on your current configuration, the project identifies a hidden leakage of ₹${totalLeakageFormatted}/month. `;

  if ((payorMix?.pmjay || 0) > 60) {
    narrative += "High PMJAY dependency creates significant margin pressure. ";
  }

  if (utilLoss > downtimeLoss) {
    narrative += "Primary friction is caused by underutilization of evening shifts. ";
  } else {
    narrative += "Primary friction is technical, driven by projected RO and machine downtime. ";
  }

  narrative += "While the project appears viable on paper, operational inefficiencies could reduce net profitability by up to 22% if not corrected before deployment.";

  return {
    verdict,
    totalLeakage,
    narrative,
    monthlyProfit
  };
}