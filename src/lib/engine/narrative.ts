// src/lib/engine/narrative.ts

export function generateDPRNarrative(data: any) {
  // 1. The Verdict
  let verdictTitle = "NOT VIABLE";
  let verdictColor = "#e11d48"; // Rose-600
  let verdictText = "Current configuration will result in negative cashflow. Immediate architectural pivot required before capital deployment.";
  
  if (data.ebitda > 300000) {
    verdictTitle = "FINANCIALLY STRONG";
    verdictColor = "#0d9488"; // Teal-600
    verdictText = "Project shows strong baseline profitability, but operational leakage is leaving significant enterprise value on the table.";
  } else if (data.ebitda > 0) {
    verdictTitle = "CONDITIONALLY VIABLE";
    verdictColor = "#d97706"; // Amber-600
    verdictText = "Project yields marginal profit. Highly sensitive to downtime and shift demand gaps. Optimization is mandatory to ensure survival.";
  }

  // 2. The Leakage Hook
  const totalLeakage = data.downtimeLoss + data.underutilizationLoss;
  const leakagePercentage = ((totalLeakage / (data.ebitda + totalLeakage)) * 100).toFixed(1);
  const leakageNarrative = `You are actively bleeding ₹${new Intl.NumberFormat('en-IN').format(totalLeakage)} every single month. This represents a ${leakagePercentage}% compression on your true profit potential.`;

  // 3. The Consulting Trigger
  let strategicInsight = `Your project is losing ₹${new Intl.NumberFormat('en-IN').format(totalLeakage)}/month primarily due to `;
  const triggers = [];
  
  if (data.underutilizationLoss > data.downtimeLoss) triggers.push("underutilized evening/night shifts");
  if (data.downtimeLoss > 100000) triggers.push("unhedged machine downtime");
  if (data.privateMix < 40) triggers.push("a suboptimal, low-margin payor mix");
  
  strategicInsight += triggers.join(", ") + ".";

  return { verdictTitle, verdictColor, verdictText, totalLeakage, leakageNarrative, strategicInsight };
}