import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Success Page Component
 * 
 * Explainable Concept:
 * - Displayed after successful form submission
 * - Shows application confirmation with details
 * - Provides navigation to dashboard and home
 */
function SuccessPage({ applicationData }) {
  const navigate = useNavigate();

  // If no application data, show message
  if (!applicationData) {
    return (
      <div className="container">
        <div className="success-container">
          <div className="success-icon">📋</div>
          <h2 className="success-title">No Application Found</h2>
          <p className="success-message">Please submit an application first.</p>
          <button
            className="btn-primary"
            onClick={() => navigate('/apply')}
          >
            Go to Application Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Application Submitted Successfully!</h2>
        <p className="success-message">
          Thank you for applying. We'll review your application and contact you soon.
        </p>

        {/* Application Details */}
        <div className="success-details">
          <h3 style={{ marginBottom: '1.5rem', textAlign: 'left', color: '#667eea' }}>
            Application Reference
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                Application ID
              </p>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#333' }}>
                APP-{applicationData.id?.toString().padStart(5, '0') || 'XXXX'}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                Status
              </p>
              <div className="status-badge status-pending">
                Pending Review
              </div>
            </div>

            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                Applicant Name
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                {applicationData.personalDetails?.firstName} {applicationData.personalDetails?.lastName}
              </p>
            </div>

            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                Loan Amount Requested
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333' }}>
                ₹{parseInt(applicationData.propertyDetails?.loanAmount).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #ddd' }}>
            <h4 style={{ marginBottom: '1rem', color: '#333' }}>📋 What Happens Next?</h4>
            <ul style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.8' }}>
              <li>✓ We'll verify your application details (1-2 days)</li>
              <li>✓ Our team will contact you for any additional documents</li>
              <li>✓ Property appraisal will be conducted (3-5 days)</li>
              <li>✓ Final approval and disbursement (5-7 business days)</li>
            </ul>
          </div>

          {/* Confirmation Email */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#f0fff4',
            borderRadius: '6px',
            borderLeft: '4px solid #2ecc71'
          }}>
            <p style={{ fontSize: '0.9rem', color: '#155724' }}>
              ✓ A confirmation email has been sent to <strong>{applicationData.personalDetails?.email}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            className="btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            View Dashboard
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
