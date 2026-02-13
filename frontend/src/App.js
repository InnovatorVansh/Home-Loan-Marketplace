import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from './components/LandingPage';
import EMICalculator from './components/EMICalculator';
import LenderComparison from './components/LenderComparison';
import LoanApplicationForm from './components/LoanApplicationForm';
import Dashboard from './components/Dashboard';
import SuccessPage from './components/SuccessPage';

/**
 * Main App Component
 * 
 * Explainable Concept:
 * - Uses React Router for client-side routing
 * - BrowserRouter wraps all routes
 * - Routes component defines all page routes
 * - State lifting: applicationData is held here and passed to child components
 */
function App() {
  const [applicationData, setApplicationData] = useState(null);
  const navigate = useNavigate();

  const handleApplicationSubmit = (data) => {
    setApplicationData(data);
    navigate('/success');
  };

  return (
    <div className="App">
      {/* Navigation Header */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">🏦 HomeLoan</Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/lenders">Lenders</Link>
            <Link to="/apply">Apply</Link>
            <Link to="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/calculator" element={<EMICalculator />} />
        <Route path="/lenders" element={<LenderComparison />} />
        <Route path="/apply" element={<LoanApplicationForm onSubmit={handleApplicationSubmit} />} />
        <Route path="/dashboard" element={<Dashboard applicationData={applicationData} />} />
        <Route path="/success" element={<SuccessPage applicationData={applicationData} />} />
      </Routes>
    </div>
  );
}

/**
 * Wrapper to provide Router context
 * This wrapper is necessary for useNavigate hook to work
 */
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
