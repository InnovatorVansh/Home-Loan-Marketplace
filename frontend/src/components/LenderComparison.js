import React, { useState, useEffect } from 'react';
import { calculateEMI, formatCurrency } from '../utils/emiCalculator';

/**
 * Lender Comparison Component
 * 
 * Explainable Concept:
 * - useEffect fetches lenders from API on component mount
 * - State management: lenders, loading, error states
 * - Mapping lists: .map() to render lender cards
 * - Dynamic sorting: sort lenders by interest rate
 * - Highlighting best offer: lowest EMI gets highlighted
 */
function LenderComparison() {
  // State management
  const [lenders, setLenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loanAmount] = useState(50000000);
  const [tenure] = useState(20);
  const [sortBy, setSortBy] = useState('interest');

  // Fetch lenders from API on component mount
  useEffect(() => {
    const fetchLenders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/lenders');
        const result = await response.json();

        if (result.success) {
          setLenders(result.data);
        } else {
          setError('Failed to fetch lenders');
        }
      } catch (err) {
        setError('Error connecting to server: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLenders();
  }, []);

  // Calculate EMI for each lender
  const lendersWithEMI = lenders.map(lender => {
    const emiData = calculateEMI(loanAmount, lender.interestRate, tenure);
    return {
      ...lender,
      emi: emiData?.emi || 0,
      totalInterest: emiData?.totalInterest || 0
    };
  });

  // Sort lenders based on selected criteria
  const sortedLenders = [...lendersWithEMI].sort((a, b) => {
    if (sortBy === 'interest') {
      return a.interestRate - b.interestRate;
    } else if (sortBy === 'emi') {
      return a.emi - b.emi;
    }
    return 0;
  });

  // Find the best lender (always lowest EMI, independent of selected sort)
  const bestLender = lendersWithEMI.reduce((best, current) => {
    if (!best) return current;
    return current.emi < best.emi ? current : best;
  }, null);
  const bestLenderId = bestLender ? bestLender.id : null;

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading lenders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <div className="card">
          <div style={{ color: 'red', padding: '2rem' }}>
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="card-title">🏦 Compare Lenders</h1>
            <div>
              <label style={{ marginRight: '1rem' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #ddd'
                }}
              >
                <option value="interest">Interest Rate</option>
                <option value="emi">Monthly EMI</option>
              </select>
            </div>
          </div>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
            Loan Amount: <strong>{formatCurrency(loanAmount)}</strong> | Tenure: <strong>{tenure} years</strong>
          </p>
        </div>

        {/* Lender Cards Grid */}
        <div className="grid grid-3">
          {sortedLenders.map(lender => (
            <div
              key={lender.id}
              className={`lender-card ${lender.id === bestLenderId ? 'highlighted' : ''}`}
            >
              {lender.id === bestLenderId && (
                <div
                  style={{
                    background: '#2ecc71',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                >
                  ⭐ Best Offer
                </div>
              )}

              {/* Bank Header */}
              <div className="lender-header">
                <div className="lender-logo">
                  <img
                    src={lender.logoUrl}
                    alt={lender.name}
                    style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <div className="lender-name">{lender.name}</div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="lender-details">
                <div className="detail-row">
                  <span className="detail-label">Interest Rate</span>
                  <span className="detail-value">{lender.interestRate}%</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Processing Fee</span>
                  <span className="detail-value">{lender.processingFee}%</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Approval Time</span>
                  <span className="detail-value">{lender.approvalTime}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Monthly EMI</span>
                  <span className="detail-value">{formatCurrency(lender.emi)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Interest</span>
                  <span className="detail-value">{formatCurrency(lender.totalInterest)}</span>
                </div>
              </div>

              {/* Apply Button */}
              <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LenderComparison;
