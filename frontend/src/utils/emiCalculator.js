/**
 * EMI Calculator Utility
 * 
 * EMI Formula: E = [P × R × (1 + R)^N] / [(1 + R)^N - 1]
 * where:
 *   E = EMI (Equated Monthly Installment)
 *   P = Principal Loan Amount
 *   R = Monthly Interest Rate (annual rate / 12 / 100)
 *   N = Number of months (tenure in years × 12)
 * 
 * Explainable Concept:
 * - This is a pure function with no side effects
 * - Easy to test and understand
 * - Returns all calculation details for display
 */

export function calculateEMI(loanAmount, annualRate, tenureYears) {
  // Validate inputs
  if (!loanAmount || !annualRate || !tenureYears) {
    return null;
  }

  // Convert inputs to numbers
  const principal = parseFloat(loanAmount);
  const annualInterestRate = parseFloat(annualRate);
  const noOfMonths = parseInt(tenureYears) * 12;

  // Calculate monthly interest rate
  const monthlyRate = annualInterestRate / 12 / 100;

  // Handle edge case where interest rate is 0
  let emi;
  if (monthlyRate === 0) {
    emi = principal / noOfMonths;
  } else {
    // Apply EMI formula
    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, noOfMonths);
    const denominator = Math.pow(1 + monthlyRate, noOfMonths) - 1;
    emi = numerator / denominator;
  }

  // Calculate total amount and total interest
  const totalPayment = emi * noOfMonths;
  const totalInterest = totalPayment - principal;

  // Return rounded values
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    monthlyRate: monthlyRate
  };
}

/**
 * Format currency for display
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value) {
  return `${parseFloat(value).toFixed(2)}%`;
}

/**
 * Check if EMI exceeds 50% of monthly income
 * This is a common lending guideline
 */
export function checkAffordability(emi, monthlyIncome) {
  if (!emi || !monthlyIncome) return null;

  const emiAmount = parseFloat(emi);
  const income = parseFloat(monthlyIncome);
  const ratio = (emiAmount / income) * 100;

  return {
    ratio: ratio.toFixed(2),
    isAffordable: ratio <= 50,
    message: ratio > 50 
      ? `EMI (${formatCurrency(emiAmount)}) exceeds 50% of monthly income (${formatCurrency(income)})` 
      : `EMI is ${ratio.toFixed(2)}% of your monthly income`
  };
}
