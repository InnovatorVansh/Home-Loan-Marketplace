// In-memory data store for applications
let applications = [];
let applicationIdCounter = 1;

const applicationsStore = {
  // Save a new application
  save: (applicationData) => {
    const newApplication = {
      id: applicationIdCounter++,
      ...applicationData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      approvalEstimate: '5-7 business days'
    };
    applications.push(newApplication);
    return newApplication;
  },

  // Get all applications
  getAll: () => {
    return applications;
  },

  // Get application by ID
  getById: (id) => {
    return applications.find(app => app.id === parseInt(id));
  }
};

module.exports = applicationsStore;
