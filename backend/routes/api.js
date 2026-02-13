const express = require('express');
const router = express.Router();
const lenders = require('../data/lenders.json');
const applicationsStore = require('../data/applications');

/**
 * GET /api/lenders
 * Returns all available lenders with their details
 */
router.get('/lenders', (req, res) => {
  res.json({
    success: true,
    data: lenders
  });
});

/**
 * POST /api/applications
 * Saves a new loan application
 * Body: { personalDetails, employmentDetails, propertyDetails, loanAmount, etc }
 */
router.post('/applications', (req, res) => {
  try {
    const { personalDetails, employmentDetails, propertyDetails, selectedLender } = req.body;

    // Basic validation
    if (!personalDetails || !employmentDetails || !propertyDetails) {
      return res.status(400).json({
        success: false,
        error: 'Missing required application details'
      });
    }

    const newApplication = applicationsStore.save({
      personalDetails,
      employmentDetails,
      propertyDetails,
      selectedLender
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: newApplication
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/applications
 * Returns all submitted applications
 */
router.get('/applications', (req, res) => {
  const allApplications = applicationsStore.getAll();
  res.json({
    success: true,
    data: allApplications
  });
});

/**
 * GET /api/applications/:id
 * Returns a specific application by ID
 */
router.get('/applications/:id', (req, res) => {
  const application = applicationsStore.getById(req.params.id);

  if (!application) {
    return res.status(404).json({
      success: false,
      error: 'Application not found'
    });
  }

  res.json({
    success: true,
    data: application
  });
});

module.exports = router;
