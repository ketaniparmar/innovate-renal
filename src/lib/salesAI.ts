export function generateSalesScript(project: any) {
  const { machines, state, pmjay_percent, monthly_leakage, downtime_loss } = project;

  const context = `This is a ${machines}-machine project in ${state}.`;
  const painPoint = pmjay_percent > 70 
    ? "high PMJAY dependency and single-use margin pressure" 
    : "underutilization of high-value private beds";

  return {
    opening_hook: `I was reviewing your ${machines}-machine simulation for ${state}. You've got a solid foundation, but the engine flagged ₹${(monthly_leakage/100000).toFixed(1)}L in monthly leakage—primarily driven by downtime.`,
    the_solution: `In a ${pmjay_percent}% PMJAY environment, your margin lives or dies by RO uptime. Our OS specializes in reducing that specific ₹${(downtime_loss/100000).toFixed(1)}L monthly hit.`,
    closing_ask: `I have the full Audit-Ready DPR ready for you. Would you like to walk through the 'Optimization Scenario' to see how we pull that break-even point in by 8 months?`
  };
}