import React, { useState, useEffect } from 'react';
import { calculateEMI, formatCurrency } from '../utils/emiCalculator';

/**
 * Dashboard Component
 * 
 * Explainable Concept:
 * - Displays application status and loan summary
 * - Fetches applications from API
 * - Shows EMI breakdown in a table
 * - Conditional rendering based on data availability
 * - Reusable components for loan summary cards
 */
function Dashboard({ applicationData }) {
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/applications');
        const result = await response.json();

        if (result.success) {
          setAllApplications(result.data);
        } else {
          setError('Failed to fetch applications');
        }
      } catch (err) {
        setError('Error connecting to server: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Use the most recent application or passed applicationData
  const application = applicationData || (allApplications.length > 0 ? allApplications[allApplications.length - 1] : null);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ textAlign: 'center', padding: '2rem' }}>No applications found. Please submit an application first.</p>
        </div>
      </div>
    );
  }

  // Extract data
  const { personalDetails = {}, propertyDetails = {}, employmentDetails = {} } = application;
  const loanAmount = parseInt(propertyDetails.loanAmount || 0);
  const interestRate = 7; // Mock rate
  const tenure = parseInt(propertyDetails.tenure || 20);
  const emiData = calculateEMI(loanAmount, interestRate, tenure);

  // Generate EMI breakdown for display
  const generateEMITable = () => {
    const months = 12;
    const startMonth = new Date();
    let remainingPrincipal = loanAmount;
    const rows = [];

    for (let i = 1; i <= months; i++) {
      const interestPayment = Math.round(remainingPrincipal * (interestRate / 12 / 100));
      const principalPayment = emiData.emi - interestPayment;
      remainingPrincipal -= principalPayment;

      rows.push({
        month: i,
        emi: emiData.emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, remainingPrincipal)
      });
    }
    return rows;
  };

  const emiRows = generateEMITable();

  return (
    <div className="container">
      {/* Application Header */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="card-title">📊 Your Loan Dashboard</h1>
            <div className="status-badge status-pending">
              {application.status}
            </div>
          </div>
        </div>

        {/* Application Summary */}
        <div className="dashboard-grid">
          <div className="summary-card">
            <div className="summary-label">Applicant Name</div>
            <div className="summary-value">
              {personalDetails.firstName} {personalDetails.lastName}
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Application ID</div>
            <div className="summary-value">
              APP-{application.id?.toString().padStart(5, '0')}
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Loan Amount</div>
            <div className="summary-value">
              {formatCurrency(loanAmount)}
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-label">Estimated Approval</div>
            <div className="summary-value">
              {application.approvalEstimate}
            </div>
          </div>
        </div>
      </div>

      {/* Loan Summary Cards */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '2rem' }}>💰 Loan Summary</h2>

        <div className="grid grid-3">
          <div className="summary-card">
            <div className="summary-label">Monthly EMI</div>
            <div className="summary-value" style={{ color: '#2ecc71' }}>
              {formatCurrency(emiData.emi)}
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              For {tenure} years @ {interestRate}%
            </p>
          </div>

          <div className="summary-card">
            <div className="summary-label">Total Interest</div>
            <div className="summary-value" style={{ color: '#e74c3c' }}>
              {formatCurrency(emiData.totalInterest)}
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              Over {tenure} years
            </p>
          </div>

          <div className="summary-card">
            <div className="summary-label">Total Payment</div>
            <div className="summary-value" style={{ color: '#667eea' }}>
              {formatCurrency(emiData.totalPayment)}
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
              Principal + Interest
            </p>
          </div>
        </div>
      </div>

      {/* EMI Breakdown */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>📈 EMI Breakdown (First 12 Months)</h2>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI Amount</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Remaining Balance</th>
              </tr>
            </thead>
            <tbody>
              {emiRows.map(row => (
                <tr key={row.month}>
                  <td>Month {row.month}</td>
                  <td>{formatCurrency(row.emi)}</td>
                  <td>{formatCurrency(row.principal)}</td>
                  <td>{formatCurrency(row.interest)}</td>
                  <td>{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>📋 Application Details</h2>

        <div className="grid grid-2">
          <div>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Personal Information</h4>
            <div style={{ fontSize: '0.95rem' }}>
              <p><strong>Name:</strong> {personalDetails.firstName} {personalDetails.lastName}</p>
              <p><strong>Email:</strong> {personalDetails.email}</p>
              <p><strong>Phone:</strong> {personalDetails.phone}</p>
              <p><strong>Date of Birth:</strong> {personalDetails.dateOfBirth}</p>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Employment Information</h4>
            <div style={{ fontSize: '0.95rem' }}>
              <p><strong>Type:</strong> {employmentDetails.employmentType}</p>
              {employmentDetails.companyName && <p><strong>Company:</strong> {employmentDetails.companyName}</p>}
              <p><strong>Designation:</strong> {employmentDetails.designation}</p>
              <p><strong>Monthly Income:</strong> {formatCurrency(employmentDetails.monthlyIncome)}</p>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Property Information</h4>
            <div style={{ fontSize: '0.95rem' }}>
              <p><strong>Location:</strong> {propertyDetails.location}</p>
              <p><strong>Type:</strong> {propertyDetails.type}</p>
              <p><strong>Value:</strong> {formatCurrency(propertyDetails.value)}</p>
            </div>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Loan Information</h4>
            <div style={{ fontSize: '0.95rem' }}>
              <p><strong>Loan Amount:</strong> {formatCurrency(propertyDetails.loanAmount)}</p>
              <p><strong>Tenure:</strong> {propertyDetails.tenure} years</p>
              <p><strong>Interest Rate:</strong> {interestRate}% (Estimated)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="btn-primary" style={{ marginRight: '1rem' }}>
          Download Application
        </button>
        <button className="btn-secondary">
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
