import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Landing Page Component - Dynamic Version
 * 
 * Explainable Concept:
 * - Uses useState for counter animations
 * - Uses useEffect for animations on component mount
 * - Interactive elements with hover states
 * - Animated statistics that count up
 * - Multiple CTA buttons for better engagement
 * - Process steps and testimonials sections
 */
function LandingPage() {
  const navigate = useNavigate();
  const [usersCount, setUsersCount] = useState(0);
  const [loansCount, setLoansCount] = useState(0);
  const [savingsCount, setSavingsCount] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Animate counters on mount
  useEffect(() => {
    let usersInterval;
    let loansInterval;
    let savingsInterval;

    // Count up to users
    usersInterval = setInterval(() => {
      setUsersCount(prev => (prev < 50000 ? prev + 1000 : 50000));
    }, 30);

    // Count up to loans approved
    loansInterval = setInterval(() => {
      setLoansCount(prev => (prev < 12500 ? prev + 250 : 12500));
    }, 40);

    // Count up to savings
    savingsInterval = setInterval(() => {
      setSavingsCount(prev => (prev < 500 ? prev + 10 : 500));
    }, 50);

    return () => {
      clearInterval(usersInterval);
      clearInterval(loansInterval);
      clearInterval(savingsInterval);
    };
  }, []);

  // Auto-rotate steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep(prev => (prev < 3 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(stepInterval);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: '5-7 business days', color: '#FFD700' },
    { icon: '💰', title: 'Best Rates', desc: 'From 6.5% onwards', color: '#2ecc71' },
    { icon: '✅', title: 'Transparent', desc: 'Zero hidden charges', color: '#3498db' },
    { icon: '📱', title: 'Online Only', desc: '100% digital process', color: '#9b59b6' },
  ];

  const steps = [
    { num: 1, title: 'Calculate', desc: 'Know your EMI instantly' },
    { num: 2, title: 'Compare', desc: 'Find best rates easily' },
    { num: 3, title: 'Apply', desc: 'Simple 4-step form' },
    { num: 4, title: 'Approve', desc: 'Get approval in days' },
  ];

  const testimonials = [
    { name: 'Rajesh M.', city: 'Mumbai', text: 'Got approved in 5 days! Best platform to compare loans.' },
    { name: 'Priya S.', city: 'Bangalore', text: 'Saved ₹2 lakhs with better rates found here.' },
    { name: 'Amit P.', city: 'Delhi', text: 'EMI calculator is spot on. Very helpful!' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="landing-page">
        <div className="container">
          <div className="hero-content">
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
              🏠 Your Dream Home Awaits
            </h1>
            <p style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.6' }}>
              Compare home loans from India's best banks in seconds. Get transparent rates, 
              <br/>
              fast approvals, and expert guidance. All completely online! 🚀
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button 
                className="cta-button" 
                onClick={() => handleNavigate('/calculator')}
                style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
              >
                💳 Calculate EMI
              </button>
              <button 
                className="cta-button" 
                onClick={() => handleNavigate('/lenders')}
                style={{ 
                  fontSize: '1.1rem', 
                  padding: '1rem 2.5rem',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'black',
                  border: '2px solid white'
                }}
              >
                🏦 Compare Banks
              </button>
              <button 
                className="cta-button" 
                onClick={() => handleNavigate('/apply')}
                style={{ 
                  fontSize: '1.1rem', 
                  padding: '1rem 2.5rem',
                  background: '#2ecc71',
                  color: 'white'
                }}
              >
                📋 Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        background: 'white', 
        padding: '3rem 2rem',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ animation: 'slideDown 0.8s ease-out' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' }}>
                {usersCount.toLocaleString()}+
              </div>
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1rem' }}>Happy Customers</p>
            </div>
            <div style={{ animation: 'slideDown 0.9s ease-out' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2ecc71' }}>
                ₹{loansCount.toLocaleString()}Cr
              </div>
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1rem' }}>Loans Approved</p>
            </div>
            <div style={{ animation: 'slideDown 1s ease-out' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e74c3c' }}>
                ₹{savingsCount}Cr
              </div>
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1rem' }}>Saved by Users</p>
            </div>
            <div style={{ animation: 'slideDown 1.1s ease-out' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f39c12' }}>
                4.9★
              </div>
              <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '1rem' }}>Rating (2k+ reviews)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '4rem 2rem', background: '#f5f7fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.2rem', color: '#333' }}>
            Why Choose Us? ✨
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {features.map((feature, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  animation: `slideDown ${0.6 + idx * 0.1}s ease-out`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ color: feature.color, marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.2rem', color: '#333' }}>
            4 Simple Steps 🎯
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {steps.map((step, idx) => (
              <div 
                key={idx}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  animation: `slideDown ${0.6 + idx * 0.1}s ease-out`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div 
                  style={{
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{step.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ padding: '4rem 2rem', background: '#f5f7fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.2rem', color: '#333' }}>
            What Our Users Say 💬
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  borderLeft: '4px solid #667eea',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  animation: `slideDown ${0.7 + idx * 0.1}s ease-out`
                }}
              >
                <div style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: '#666', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{testimonial.text}"
                </p>
                <p style={{ fontWeight: 'bold', color: '#333' }}>
                  {testimonial.name}
                  <br/>
                  <span style={{ fontSize: '0.85rem', color: '#999' }}>{testimonial.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Ready to Get Your Dream Home? 🏡</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join thousands of happy customers who found their perfect loan
          </p>
          <button 
            className="cta-button"
            onClick={() => handleNavigate('/apply')}
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            Start Your Journey →
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
