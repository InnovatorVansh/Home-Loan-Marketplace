import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Loan Application Form Component
 * 
 * Explainable Concept:
 * - Multi-step form: 4 steps with navigation
 * - State lifting: all form data stored in parent state
 * - Conditional rendering: display content based on current step
 * - Form validation: simple required field checks
 * - Conditional fields: show company name only if salaried
 * - POST request: submit data to /api/applications
 */
function LoanApplicationForm({ onSubmit }) {
  const navigate = useNavigate();

  // State for current step
  const [currentStep, setCurrentStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',

    // Step 2: Employment & Income
    employmentType: 'salaried',
    companyName: '',
    designation: '',
    monthlyIncome: '',
    years: '',

    // Step 3: Property Details
    propertyLocation: '',
    propertyValue: '',
    propertyType: 'residential',
    loanAmount: '',
    tenure: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    } else if (currentStep === 2) {
      if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';
      if (formData.employmentType === 'salaried' && !formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
      if (!formData.years) newErrors.years = 'Years of experience is required';
    } else if (currentStep === 3) {
      if (!formData.propertyLocation.trim()) newErrors.propertyLocation = 'Property location is required';
      if (!formData.propertyValue) newErrors.propertyValue = 'Property value is required';
      if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
      if (!formData.tenure) newErrors.tenure = 'Tenure is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateStep()) {
      setSubmitting(true);
      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalDetails: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              dateOfBirth: formData.dateOfBirth
            },
            employmentDetails: {
              employmentType: formData.employmentType,
              companyName: formData.companyName,
              designation: formData.designation,
              monthlyIncome: formData.monthlyIncome,
              yearsOfExperience: formData.years
            },
            propertyDetails: {
              location: formData.propertyLocation,
              value: formData.propertyValue,
              type: formData.propertyType,
              loanAmount: formData.loanAmount,
              tenure: formData.tenure
            }
          })
        });

        const result = await response.json();

        if (result.success) {
          onSubmit(result.data);
        } else {
          setErrors({ submit: result.error || 'Failed to submit application' });
        }
      } catch (error) {
        setErrors({ submit: 'Error submitting application: ' + error.message });
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">📋 Loan Application</h1>
        </div>

        {/* Steps Indicator */}
        <div className="steps">
          {[1, 2, 3, 4].map(step => (
            <div
              key={step}
              className={`step ${step === currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`}
            >
              {step < currentStep && <div className="step-line"></div>}
              <div className="step-number">{step < currentStep ? '✓' : step}</div>
              <div className="step-label">
                {step === 1 && 'Personal'}
                {step === 2 && 'Employment'}
                {step === 3 && 'Property'}
                {step === 4 && 'Review'}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Personal Details</h3>

            <div className="grid grid-2">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <div className="error-message">{errors.firstName}</div>}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
            </div>
          </div>
        )}

        {/* Step 2: Employment & Income */}
        {currentStep === 2 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Employment & Income</h3>

            <div className="form-group">
              <label>Employment Type *</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleInputChange}
              >
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business Owner</option>
              </select>
              {errors.employmentType && <div className="error-message">{errors.employmentType}</div>}
            </div>

            {/* Conditional Field: Show company name only if salaried */}
            {formData.employmentType === 'salaried' && (
              <div className="form-group">
                <label>Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className={errors.companyName ? 'error' : ''}
                />
                {errors.companyName && <div className="error-message">{errors.companyName}</div>}
              </div>
            )}

            <div className="grid grid-2">
              <div className="form-group">
                <label>Designation/Position *</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                  className={errors.designation ? 'error' : ''}
                />
                {errors.designation && <div className="error-message">{errors.designation}</div>}
              </div>

              <div className="form-group">
                <label>Monthly Income (₹) *</label>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  placeholder="Enter monthly income"
                  className={errors.monthlyIncome ? 'error' : ''}
                />
                {errors.monthlyIncome && <div className="error-message">{errors.monthlyIncome}</div>}
              </div>
            </div>

            <div className="form-group">
              <label>Years of Experience *</label>
              <input
                type="number"
                name="years"
                value={formData.years}
                onChange={handleInputChange}
                placeholder="Enter years of experience"
                className={errors.years ? 'error' : ''}
              />
              {errors.years && <div className="error-message">{errors.years}</div>}
            </div>
          </div>
        )}

        {/* Step 3: Property Details */}
        {currentStep === 3 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Property Details</h3>

            <div className="form-group">
              <label>Property Location *</label>
              <input
                type="text"
                name="propertyLocation"
                value={formData.propertyLocation}
                onChange={handleInputChange}
                placeholder="Enter property location"
                className={errors.propertyLocation ? 'error' : ''}
              />
              {errors.propertyLocation && <div className="error-message">{errors.propertyLocation}</div>}
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label>Property Value (₹) *</label>
                <input
                  type="number"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleInputChange}
                  placeholder="Enter property value"
                  className={errors.propertyValue ? 'error' : ''}
                />
                {errors.propertyValue && <div className="error-message">{errors.propertyValue}</div>}
              </div>

              <div className="form-group">
                <label>Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="plot">Plot</option>
                </select>
              </div>
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label>Loan Amount Required (₹) *</label>
                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  placeholder="Enter loan amount"
                  className={errors.loanAmount ? 'error' : ''}
                />
                {errors.loanAmount && <div className="error-message">{errors.loanAmount}</div>}
              </div>

              <div className="form-group">
                <label>Tenure (years) *</label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  placeholder="Enter tenure"
                  className={errors.tenure ? 'error' : ''}
                />
                {errors.tenure && <div className="error-message">{errors.tenure}</div>}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem' }}>Review Your Application</h3>

            <div className="grid grid-2">
              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Personal Details</h4>
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>DOB:</strong> {formData.dateOfBirth}</p>
              </div>

              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Employment Details</h4>
                <p><strong>Type:</strong> {formData.employmentType}</p>
                {formData.companyName && <p><strong>Company:</strong> {formData.companyName}</p>}
                <p><strong>Designation:</strong> {formData.designation}</p>
                <p><strong>Monthly Income:</strong> ₹{parseInt(formData.monthlyIncome).toLocaleString()}</p>
              </div>

              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Property Details</h4>
                <p><strong>Location:</strong> {formData.propertyLocation}</p>
                <p><strong>Value:</strong> ₹{parseInt(formData.propertyValue).toLocaleString()}</p>
                <p><strong>Type:</strong> {formData.propertyType}</p>
              </div>

              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Loan Details</h4>
                <p><strong>Loan Amount:</strong> ₹{parseInt(formData.loanAmount).toLocaleString()}</p>
                <p><strong>Tenure:</strong> {formData.tenure} years</p>
              </div>
            </div>

            {errors.submit && (
              <div className="warning-message" style={{ marginTop: '1rem' }}>
                {errors.submit}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="btn-secondary"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            style={{ opacity: currentStep === 1 ? '0.5' : '1' }}
          >
            ← Previous
          </button>

          {currentStep < 4 ? (
            <button className="btn-primary" onClick={handleNext}>
              Next →
            </button>
          ) : (
            <button
              className="btn-success"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoanApplicationForm;
