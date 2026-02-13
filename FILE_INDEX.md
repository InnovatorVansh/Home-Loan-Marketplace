# 📚 Project Documentation Index

## Files Overview

This document provides a quick reference to understand every file in the project and why it exists.

---

## 📂 Backend Files

### [backend/package.json](./backend/package.json)
**Purpose:** Node.js project metadata and dependencies
- Defines npm scripts: `start` and `dev`
- Lists dependencies: `express`, `cors`
- Entry point: `server.js`

**Interview angle:** "This file tells npm how to run the backend and what packages are needed."

---

### [backend/server.js](./backend/server.js)
**Purpose:** Express server entry point
- Creates Express app
- Enables CORS middleware (allows cross-origin requests from frontend)
- Mounts API routes from `/routes/api.js`
- Listens on port 5000
- Includes basic error handling middleware

**Interview angle:** "This sets up the HTTP server that the React app will call."

```javascript
// Key line:
const app = express();
app.use(cors());  // Allow frontend on localhost:3000 to call this backend
app.listen(PORT); // Server runs here
```

---

### [backend/routes/api.js](./backend/routes/api.js)
**Purpose:** RESTful API endpoints
- **GET /api/lenders** → Returns mock lender data
- **POST /api/applications** → Saves new loan applications
- **GET /api/applications** → Returns all applications
- **GET /api/applications/:id** → Returns specific application

**Interview angle:** "This defines all the HTTP endpoints the frontend can call."

---

### [backend/data/lenders.json](./backend/data/lenders.json)
**Purpose:** Mock data file with 5 banks
- Contains: id, name, interestRate, processingFee, approvalTime
- Used by GET /api/lenders endpoint
- Easy to update with new lenders

**Interview angle:** "In production, this would come from a database. Here, it's static JSON for simplicity."

---

### [backend/data/applications.js](./backend/data/applications.js)
**Purpose:** In-memory storage for loan applications
- Functions: `save()`, `getAll()`, `getById()`
- Stores applications in a JavaScript array
- Adds timestamp and status to each application

**Interview angle:** "This module handles CRUD operations for applications. In production, I'd replace this with a database."

---

## 📂 Frontend Files

### [frontend/package.json](./frontend/package.json)
**Purpose:** React project configuration
- Defines npm scripts: `start`, `build`, `test`
- Lists dependencies: `react`, `react-dom`, `react-router-dom`, `react-scripts`
- **Proxy:** Points to backend at `http://localhost:5000`

**Interview angle:** "The proxy setting is important—it tells the React dev server to forward API calls to the backend."

---

### [frontend/public/index.html](./frontend/public/index.html)
**Purpose:** HTML entry point for the React app
- Single `<div id="root"></div>` where React renders
- Includes meta tags for responsiveness
- Basic inline style reset

**Interview angle:** "This is the static HTML. React injects dynamic content here."

---

### [frontend/src/index.js](./frontend/src/index.js)
**Purpose:** React DOM initialization
- Imports React and ReactDOM
- Renders the App component into the root div
- Uses createRoot API (React 18+)

**Interview angle:** "This connects the React app to the HTML. It's the first JavaScript file that runs."

---

### [frontend/src/App.js](./frontend/src/App.js)
**Purpose:** Main React application with routing
- Sets up Router with all page routes
- Manages global state (applicationData)
- Includes navigation header
- Entry point for all pages

**Interview angle:** "This is the architecture of the whole app. Every page is routed here."

**Key Concepts:**
```javascript
<BrowserRouter>  // Client-side routing
  <Routes>       // Define all routes
    <Route path="/" element={<LandingPage />} />
    <Route path="/calculator" element={<EMICalculator />} />
    // ...
  </Routes>
</BrowserRouter>
```

---

### [frontend/src/App.css](./frontend/src/App.css)
**Purpose:** Global CSS styling for entire app
- Header and navigation styles
- Card, button, and form component styles
- Responsive grid layouts
- Media queries for mobile (< 768px)
- Animations (fadeIn, slideDown)

**Interview angle:** "I organized CSS by component. No Tailwind or Bootstrap—pure CSS to show I understand fundamentals."

**Key Sections:**
- Header: Sticky purple gradient navbar
- Cards: White boxes with shadow effects
- Forms: Input styling with validation states
- Grid: Responsive layouts for mobile/desktop
- Status badges: Color-coded (Pending/Approved/Rejected)
- Animations: Smooth transitions

---

### [frontend/src/utils/emiCalculator.js](./frontend/src/utils/emiCalculator.js)
**Purpose:** Business logic utilities (pure functions)
- **calculateEMI():** Implements EMI formula
  - Inputs: loanAmount, annualRate, tenureYears
  - Output: {emi, totalInterest, totalPayment}
- **checkAffordability():** Checks if EMI > 50% monthly income
- **formatCurrency():** Formats numbers as Indian rupees
- **formatPercentage():** Formats percentage values

**Interview angle:** "Pure functions are reusable and testable. Used by EMICalculator, LenderComparison, and Dashboard."

**The EMI Formula:**
```javascript
EMI = [P × R × (1 + R)^N] / [(1 + R)^N - 1]
```

---

### [frontend/src/components/LandingPage.js](./frontend/src/components/LandingPage.js)
**Purpose:** Home page of the application
- Hero section with gradient background
- CTA button ("Calculate EMI") that navigates to calculator
- 3 feature highlights with icons

**Features:**
- No state (simple functional component)
- Uses useNavigate hook to navigate programmatically
- Responsive gradient hero layout

**Interview angle:** "A simple but professional landing page. Shows I can create clean fintech-style UI."

---

### [frontend/src/components/EMICalculator.js](./frontend/src/components/EMICalculator.js)
**Purpose:** EMI calculation tool with real-time updates
- Inputs: Loan Amount, Interest Rate, Tenure, Monthly Income
- Sliders for easy adjustment
- Real-time calculation display
- Affordability warning if EMI > 50% income

**Key State:**
```javascript
const [loanAmount, setLoanAmount] = useState(50000000);
const [interestRate, setInterestRate] = useState(7.0);
const [tenure, setTenure] = useState(20);
const [monthlyIncome, setMonthlyIncome] = useState(500000);
```

**Interview angle:** "Demonstrates controlled components and real-time calculations using React state."

---

### [frontend/src/components/LenderComparison.js](./frontend/src/components/LenderComparison.js)
**Purpose:** Compare loan offers from different banks
- Fetches /api/lenders on component mount (useEffect)
- Calculates EMI for each lender
- Sort by interest rate or EMI
- Highlights best offer (lowest EMI) in green

**Key Concepts:**
- API fetching with useEffect and fetch
- Loading and error states
- .map() to render list of lenders
- Dynamic sorting by dropdown selection

**Interview angle:** "Shows API integration, data fetching, list rendering, and conditional highlighting."

---

### [frontend/src/components/LoanApplicationForm.js](./frontend/src/components/LoanApplicationForm.js)
**Purpose:** Multi-step loan application form
- 4 steps: Personal Details → Employment → Property → Review
- Step validation before progression
- Conditional field rendering (company name only if salaried)
- Store all data in React state
- POST to /api/applications on submission

**Key Concepts:**
```javascript
const [currentStep, setCurrentStep] = useState(1);
const [formData, setFormData] = useState({...60+ fields});
const [errors, setErrors] = useState({});
```

- Controlled inputs
- Form validation
- Error display
- Step progress indicator
- Data persistence across steps

**Interview angle:** "This demonstrates advanced form handling, conditional rendering, validation, and API integration."

---

### [frontend/src/components/SuccessPage.js](./frontend/src/components/SuccessPage.js)
**Purpose:** Confirmation page after application submission
- Shows application reference ID
- Displays applicant details
- Shows status (Pending)
- Lists next steps timeline
- Confirmation email notice

**Interview angle:** "User feedback is important. This confirms successful submission and provides guidance."

---

### [frontend/src/components/Dashboard.js](./frontend/src/components/Dashboard.js)
**Purpose:** Application status and loan summary dashboard
- Fetches all applications from /api/applications
- Displays application status and reference
- Shows loan summary: Monthly EMI, Total Interest, Total Payment
- EMI breakdown table (first 12 months showing principal vs. interest)
- Full application details review

**Key Concepts:**
- API fetching with useEffect
- Conditional rendering based on data availability
- EMI breakdown calculation
- Table rendering
- Loading and error states

**Interview angle:** "Shows data fetching, conditional UI, and data visualization in tables."

---

## 📄 Documentation Files

### [README.md](./README.md)
**Purpose:** Complete project documentation
- Project overview and structure
- Installation and running instructions
- Features detailed explanation
- API endpoint documentation
- Interview concepts explained
- Mock data reference
- Common interview questions

**Length:** ~450 lines
**Use:** Read before interviews to understand the entire system

---

### [QUICK_START.md](./QUICK_START.md)
**Purpose:** Quick setup and testing guide
- Step-by-step terminal commands
- Test scenarios for each feature
- Troubleshooting common issues
- Expected output reference
- Key files to understand

**Length:** ~200 lines
**Use:** Follow this for first-time setup

---

### [ARCHITECTURE.md](./ARCHITECTURE.md)
**Purpose:** Design decisions and architectural explanations
- Why React over Vue/Svelte
- Why React Router over Next.js
- Why useState over Redux
- Why vanilla CSS
- API design decisions
- Form architecture
- Pure function approach
- Security considerations

**Length:** ~600 lines
**Use:** Read before interviews to explain WHY each decision

---

### [INTERVIEW_Q&A.md](./INTERVIEW_Q&A.md)
**Purpose:** Real interview scenarios and dialogues
- 8 realistic interview scenarios
- Full question and answer dialogue
- Code snippets explaining decisions
- Follow-up questions and responses
- Closing script when interviewer asks "Questions for me?"

**Length:** ~500 lines
**Use:** Practice answering using these as templates

---

## 🗂️ File Structure Summary

```
Home Loan/
├── backend/
│   ├── server.js              # HTTP server
│   ├── package.json           # Dependencies
│   ├── routes/
│   │   └── api.js             # REST endpoints
│   └── data/
│       ├── lenders.json       # Mock lender data
│       └── applications.js    # In-memory storage
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML entry
│   ├── src/
│   │   ├── App.js             # Main app + routing
│   │   ├── App.css            # Global styles
│   │   ├── index.js           # React DOM init
│   │   ├── components/        # Page components
│   │   └── utils/             # Business logic
│   └── package.json           # Dependencies
│
├── README.md                  # Full documentation
├── QUICK_START.md             # Setup guide
├── ARCHITECTURE.md            # Design decisions
├── INTERVIEW_Q&A.md           # Practice Q&A
└── FILE_INDEX.md              # This file
```

---

## ✅ Reading Order for Interview Prep

1. **First:** QUICK_START.md
   - Set up locally and run the app
   - See it working

2. **Second:** README.md
   - Understand all features
   - Learn what each page does

3. **Third:** frontend/src/utils/emiCalculator.js
   - Understand the core formula
   - Can explain in detail

4. **Fourth:** ARCHITECTURE.md
   - Understand design decisions
   - Know why React over Vue, useState over Redux, etc.

5. **Fifth:** INTERVIEW_Q&A.md
   - Practice explaining to interviewers
   - Prepare for follow-up questions

6. **Finally:** Review specific component files
   - Explain component architecture
   - Discuss state management approach

---

## 🎯 Key Files for Each Question

| Interview Question | Read This File |
|---|---|
| "Walk me through your project" | README.md Features section |
| "How does form validation work?" | INTERVIEW_Q&A.md Scenario 2 |
| "Explain EMI calculation" | INTERVIEW_Q&A.md Scenario 3 |
| "How do you fetch data?" | INTERVIEW_Q&A.md Scenario 4 |
| "Why these design choices?" | ARCHITECTURE.md |
| "Why no Redux?" | ARCHITECTURE.md section 5 |
| "Why vanilla CSS?" | ARCHITECTURE.md section 8 |
| "What would you do in production?" | INTERVIEW_Q&A.md Scenario 6 |

---

## 🧪 Files to Show Interviewers

**Show on Screen During Interview:**

1. **LoanApplicationForm.js**
   - Multi-step form complexity
   - Validation logic
   - Conditional rendering

2. **emiCalculator.js**
   - Core business logic
   - Pure function approach
   - Formula implementation

3. **LenderComparison.js**
   - API fetching
   - List rendering
   - Sorting and filtering

4. **App.js**
   - Routing architecture
   - Application-level state
   - Component composition

---

## 🔗 How Files Connect

```
App.js (routes all pages)
│
├─→ LandingPage.js (static)
│
├─→ EMICalculator.js
│   └─→ uses emiCalculator.js
│
├─→ LenderComparison.js
│   ├─→ fetches /api/lenders
│   └─→ uses emiCalculator.js
│
├─→ LoanApplicationForm.js
│   ├─→ manages form state
│   ├─→ validates inputs
│   └─→ POSTs /api/applications
│
├─→ SuccessPage.js
│   └─→ receives applicationData from App
│
└─→ Dashboard.js
    ├─→ fetches /api/applications
    ├─→ uses emiCalculator.js
    └─→ displays applicationData
```

---

## 💡 Interview Talking Points

**Use These Files To Explain:**

- **Component Architecture:** App.js → show routing, state lifting
- **State Management:** EMICalculator.js → show useState usage
- **API Integration:** LenderComparison.js → show useEffect + fetch
- **Form Handling:** LoanApplicationForm.js → show validation, conditional rendering
- **Business Logic:** emiCalculator.js → show pure functions
- **Styling:** App.css → show responsive design, CSS organization

---

**Last Updated:** 2026-02-12

This is a complete, interview-ready home loan marketplace. You can explain every file. Good luck! 🚀
