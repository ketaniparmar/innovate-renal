export interface WorkingCapitalInput {
  monthlyOpex: number;
  monthlyRevenue: number;
  delayDays: number;
  interestRate?: number; // Default to 12% standard unsecured/working capital rate
}

export function calculateWorkingCapital(input: WorkingCapitalInput) {
  const { monthlyOpex, monthlyRevenue, delayDays, interestRate = 0.12 } = input;

  // 1. The Survival Buffer (How much cash burns while waiting for claims)
  const delayMonths = delayDays / 30;
  const minimumCashBuffer = monthlyOpex * delayMonths;

  // 2. The Receivables Trap (How much money is stuck in the system at any given time)
  const lockedReceivables = monthlyRevenue * delayMonths;

  // 3. Financing Cost (If they take a Working Capital Loan to cover the buffer)
  const annualInterest = minimumCashBuffer * interestRate;
  const monthlyInterestBurden = annualInterest / 12;

  return {
    minimumCashBuffer: Math.round(minimumCashBuffer),
    lockedReceivables: Math.round(lockedReceivables),
    monthlyInterestBurden: Math.round(monthlyInterestBurden),
    recommendedLoanAmount: Math.round(minimumCashBuffer * 1.2), // 20% safety net
  };
}