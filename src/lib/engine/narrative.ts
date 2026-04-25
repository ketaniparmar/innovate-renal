// src/lib/engine/narrative.ts

// Strong typing (Standardized with Sovereign Engine)
interface NarrativeInput {
  ebitda: number;
  downtimeLoss: number;
  underutilizationLoss: number; // ✅ Standardized naming
  payorMix?: {
    private: number;
  };
}

/**
 * GENERATE DPR NARRATIVE
 * Optimized for high-conversion consulting reports.
 * Error-checked for Vercel / Turbopack.
 */
export function generateDPRNarrative(data: NarrativeInput) {
  
  // -------------------------------
  // 1. VERDICT ENGINE (Monthly EBITDA check)
  // -------------------------------
  let verdictTitle = "NOT VIABLE";
  let verdictColor = "#e11d48"; // Rose/Red
  let verdictText =
    "Current configuration results in negative capital yield. Immediate architectural correction is required before any capital deployment.";

  // Assuming data.ebitda is the monthly figure from the engine
  if (data.ebitda > 300000) {
    verdictTitle = "✅ FINANCIALLY STRONG";
    verdictColor = "#0d9488"; // Teal/Emerald
    verdictText =
      "Project demonstrates robust profitability. However, operational inefficiencies are suppressing your actual revenue ceiling.";
  } else if (data.ebitda > 0) {
    verdictTitle = "⚠️ CONDITIONALLY VIABLE";
    verdictColor = "#d97706"; // Amber
    verdictText =
      "Project is marginally profitable but remains highly sensitive to downtime and utilization gaps. Optimization is mandatory for long-term sustainability.";
  }

  // -------------------------------
  // 2. LEAKAGE ENGINE (CFO-Grade Math)
  // -------------------------------
  const totalLeakage = (data.downtimeLoss || 0) + (data.underutilizationLoss || 0);

  // Leakage Pct is relative to the "Total Potential Profit" (Current Profit + Lost Profit)
  const potentialProfit = totalLeakage + Math.max(data.ebitda, 1); 
  const leakagePct = (totalLeakage / potentialProfit) * 100;

  const leakageNarrative = `Your facility is projected to bleed ₹${new Intl.NumberFormat(
    "en-IN"
  ).format(Math.round(totalLeakage))} every month in hidden losses. This represents a ${leakagePct.toFixed(
    1
  )}% suppression of your enterprise's true yield potential.`;

  // -------------------------------
  // 3. STRATEGIC INSIGHT (The "Consultancy" Hook)
  // -------------------------------
  const triggers: string[] = [];

  if (data.underutilizationLoss > data.downtimeLoss) {
    triggers.push("unoptimized evening/night shift capacity");
  } else {
    triggers.push("technical infrastructure downtime");
  }

  if (data.payorMix?.private !== undefined && data.payorMix.private < 40) {
    triggers.push("a low-margin government payor mix");
  }

  const strategicInsight = `The primary friction in your model is driven by ${triggers.join(" and ")}. Addressing these specific gaps recaptures enough yield to reduce your capital payback window by approximately 4–6 months.`;

  // -------------------------------
  // FINAL OUTPUT (Matches DPRTemplate.tsx bindings)
  // -------------------------------
  return {
    verdictTitle,
    verdictColor,
    verdictText,
    totalLeakage,
    leakagePct,
    leakageNarrative,
    strategicInsight,
    monthlyProfit: data.ebitda // Helper for logic checks
  };
}