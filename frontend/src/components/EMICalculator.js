import React, { useState } from 'react';
import { calculateEMI, formatCurrency, checkAffordability } from '../utils/emiCalculator';

/**
 * EMI Calculator Component
 * 
 * Explainable Concept:
 * - Controlled component: input values are stored in state
 * - Real-time calculation: useEffect would update on dependency change
 * - Simple formula implementation
 * - Displays warnings for affordability (EMI > 50% income)
 * - Clean form handling with local state
 */
function EMICalculator() {
  // State management
  const [loanAmount, setLoanAmount] = useState(50000000); // 50 lakhs
  const [interestRate, setInterestRate] = useState(7.0);
  const [tenure, setTenure] = useState(20);
  const [monthlyIncome, setMonthlyIncome] = useState(500000);

  // Calculate EMI whenever inputs change
  const calculation = calculateEMI(loanAmount, interestRate, tenure);
  const affordability = calculation ? checkAffordability(calculation.emi, monthlyIncome) : null;

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">💳 EMI Calculator</h1>
        </div>

        {/* Input Form */}
        <div className="grid grid-2">
          {/* Left Column - Inputs */}
          <div>
            {/* Loan Amount Input */}
            <div className="form-group">
              <label htmlFor="loanAmount">
                Loan Amount (₹)
                <span style={{ float: 'right', color: '#667eea', fontWeight: 'bold' }}>
                  {formatCurrency(loanAmount)}
                </span>
              </label>
              <input
                id="loanAmount"
                type="range"
                min="500000"
                max="500000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            {/* Interest Rate Input */}
            <div className="form-group">
              <label htmlFor="interestRate">
                Interest Rate (% per annum)
                <span style={{ float: 'right', color: '#667eea', fontWeight: 'bold' }}>
                  {interestRate}%
                </span>
              </label>
              <input
                id="interestRate"
                type="range"
                min="4"
                max="12"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                step="0.1"
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            {/* Tenure Input */}
            <div className="form-group">
              <label htmlFor="tenure">
                Loan Tenure
                <span style={{ float: 'right', color: '#667eea', fontWeight: 'bold' }}>
                  {tenure} years
                </span>
              </label>
              <input
                id="tenure"
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter tenure in years"
                style={{ marginTop: '0.5rem' }}
              />
            </div>

            {/* Monthly Income Input */}
            <div className="form-group">
              <label htmlFor="monthlyIncome">
                Monthly Income (₹)
                <span style={{ float: 'right', color: '#667eea', fontWeight: 'bold' }}>
                  {formatCurrency(monthlyIncome)}
                </span>
              </label>
              <input
                id="monthlyIncome"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="Enter monthly income"
              />
            </div>
          </div>

          {/* Right Column - Results */}
          {calculation && (
            <div>
              <div className="emi-result">
                <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Loan Breakdown</h2>

                <div className="result-row">
                  <span className="result-label">Monthly EMI</span>
                  <span className="result-value">{formatCurrency(calculation.emi)}</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Total Interest Payable</span>
                  <span className="result-value">{formatCurrency(calculation.totalInterest)}</span>
                </div>

                <div className="result-row">
                  <span className="result-label">Total Payment</span>
                  <span className="result-value">{formatCurrency(calculation.totalPayment)}</span>
                </div>

                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                  paddingTop: '1rem',
                  marginTop: '1rem'
                }}>
                  <div className="result-row">
                    <span className="result-label">EMI to Income Ratio</span>
                    <span className="result-value">
                      {affordability?.ratio}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Affordability Warning */}
              {affordability && !affordability.isAffordable && (
                <div className="warning-message" style={{ marginTop: '1rem' }}>
                  ⚠️ {affordability.message}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Educational Info */}
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f0f7ff',
            borderRadius: '6px',
            borderLeft: '4px solid #667eea'
          }}
        >
          <h4 style={{ marginBottom: '0.5rem', color: '#667eea' }}>ℹ️ How EMI is Calculated?</h4>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            EMI (Equated Monthly Installment) is calculated using the formula:
            <br />
            <strong>EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]</strong>
            <br />
            where P is principal, R is monthly rate, and N is number of months.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EMICalculator;
