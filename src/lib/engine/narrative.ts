// Strong typing (align with your engine)
interface NarrativeInput {
  ebitda: number;
  downtimeLoss: number;
  utilLoss: number;
  payorMix?: {
    private: number;
  };
}

export function generateExecutiveSummary(data: NarrativeInput) {
  // -------------------------------
  // 1. VERDICT ENGINE
  // -------------------------------
  let verdictTitle = "NOT VIABLE";
  let verdictColor = "#e11d48"; // Rose
  let verdictText =
    "Current configuration will result in negative cashflow. Immediate architectural correction required before capital deployment.";

  if (data.ebitda > 300000) {
    verdictTitle = "FINANCIALLY STRONG";
    verdictColor = "#0d9488"; // Teal
    verdictText =
      "Project demonstrates strong profitability. However, operational inefficiencies are suppressing full revenue potential.";
  } else if (data.ebitda > 0) {
    verdictTitle = "CONDITIONALLY VIABLE";
    verdictColor = "#d97706"; // Amber
    verdictText =
      "Project is marginally profitable but highly sensitive to downtime and utilization gaps. Optimization is mandatory for sustainability.";
  }

  // -------------------------------
  // 2. LEAKAGE ENGINE (SAFE MATH)
  // -------------------------------
  const totalLeakage = data.downtimeLoss + data.utilLoss;

  const denominator = totalLeakage + Math.max(data.ebitda, 1); // prevents divide by zero
  const leakagePct = (totalLeakage / denominator) * 100;

  const leakageNarrative = `You are actively losing ₹${new Intl.NumberFormat(
    "en-IN"
  ).format(totalLeakage)} per month due to operational inefficiencies. This represents a ${leakagePct.toFixed(
    1
  )}% suppression of your actual profit potential.`;

  // -------------------------------
  // 3. ROOT CAUSE ENGINE
  // -------------------------------
  const triggers: string[] = [];

  if (data.utilLoss > data.downtimeLoss) {
    triggers.push("underutilized evening and night shift capacity");
  }

  if (data.downtimeLoss > 100000) {
    triggers.push("unmanaged machine downtime");
  }

  if (data.payorMix?.private !== undefined && data.payorMix.private < 40) {
    triggers.push("suboptimal low-margin payor mix");
  }

  if (triggers.length === 0) {
    triggers.push("minor operational inefficiencies across scheduling and uptime");
  }

  const strategicInsight = `Your project is currently losing ₹${new Intl.NumberFormat(
    "en-IN"
  ).format(totalLeakage)} per month primarily due to ${triggers.join(", ")}.`;

  // -------------------------------
  // FINAL OUTPUT
  // -------------------------------
  return {
    verdictTitle,
    verdictColor,
    verdictText,
    totalLeakage,
    leakagePct,
    leakageNarrative,
    strategicInsight,
  };
}