## 🚀 Quick Start Guide

### Step-by-Step Setup

#### Option 1: Using PowerShell (Windows)

**Terminal 1 - Backend Setup**
```powershell
cd "d:\Vansh\PROJECTS\Home Loan\backend"
npm install
npm start
```
Expected output: `Server is running on http://localhost:5000`

**Terminal 2 - Frontend Setup**
```powershell
cd "d:\Vansh\PROJECTS\Home Loan\frontend"
npm install
npm start
```
Expected output: Browser opens at `http://localhost:3000`

### First Time Setup Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend app running on port 3000
- [ ] Can access landing page at http://localhost:3000
- [ ] Can click "Calculate EMI" and navigate to calculator
- [ ] Can see 5 lenders in /lenders page
- [ ] Can fill and submit application form
- [ ] Can see success page after submission

---

## 🧪 Quick Test Scenarios

### Test 1: EMI Calculator
1. Go to http://localhost:3000/calculator
2. Adjust sliders:
   - Loan Amount: ₹50 Lakhs
   - Interest Rate: 7%
   - Tenure: 20 years
   - Monthly Income: ₹5 Lakhs
3. Check Results:
   - Monthly EMI should show ₹37,633
   - If EMI > 50% income, warning appears

### Test 2: Lender Comparison
1. Go to http://localhost:3000/lenders
2. See 5 banks with calculated EMI
3. Click "Sort by EMI" dropdown
4. Best offer (State Bank - 6.5%) should be highlighted green

### Test 3: Application Form (Full Flow)
1. Go to http://localhost:3000/apply
2. **Step 1:** Fill personal details
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 9876543210
   - DOB: 1990-01-15
   - Click "Next"
3. **Step 2:** Fill employment details
   - Employment Type: Salaried
   - Company Name: Tech Corp (auto-appears when salaried selected)
   - Designation: Senior Developer
   - Monthly Income: 500000
   - Years: 5
   - Click "Next"
4. **Step 3:** Fill property details
   - Location: Mumbai
   - Property Value: 50000000
   - Type: Residential
   - Loan Amount: 40000000
   - Tenure: 20
   - Click "Next"
5. **Step 4:** Review and Submit
   - See all details formatted
   - Click "Submit Application"
6. **Success Page:** Should see application confirmation
7. **Dashboard:** Click "View Dashboard" to see EMI breakdown

---

## 🔧 Troubleshooting

### Issue: Backend not connecting
```
Error: localhost:5000 refused connection
```
**Solution:**
- Make sure backend terminal is running `npm start`
- Check port 5000 is not in use: `netstat -ano | findstr :5000`
- Kill process if needed: `taskkill /PID <PID> /F`

### Issue: Frontend not starting
```
Error: Port 3000 already in use
```
**Solution:**
- Kill process on port 3000: `netstat -ano | findstr :3000`
- Or change port: `set PORT=3001 && npm start`

### Issue: API calls failing
```
Error: Failed to fetch from /api/lenders
```
**Solution:**
- Frontend should proxy to backend (check proxy in frontend/package.json)
- If changed ports, update proxy URL: `"proxy": "http://localhost:5000"`

### Issue: Form not submitting
**Solution:**
- Check browser console for errors
- Verify all required fields are filled
- Backend should return success response

---

## 📊 Expected Output

### Backend Console
```
Server is running on http://localhost:5000
```

### Frontend Console
```
Compiled successfully!
You can now view home-loan-frontend in the browser.
```

### When accessing /api/lenders
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "State Bank of India", "interestRate": 6.5, ... },
    { "id": 2, "name": "HDFC Bank", "interestRate": 7.2, ... },
    ...
  ]
}
```

---

## 💡 Key Files to Understand

**For Interview Explanation:**
1. Start with [backend/data/lenders.json](../backend/data/lenders.json) - Mock data structure
2. Then [backend/routes/api.js](../backend/routes/api.js) - API endpoints
3. Then [frontend/src/utils/emiCalculator.js](../frontend/src/utils/emiCalculator.js) - Core logic
4. Then [frontend/src/components/EMICalculator.js](../frontend/src/components/EMICalculator.js) - Main component
5. Finally [frontend/src/App.js](../frontend/src/App.js) - Routing architecture

---

## 🎯 Common Interview Questions This Covers

✅ How would you structure a multi-page React app? (React Router)
✅ How do you fetch data from an API? (useEffect + fetch)
✅ How do you handle form data in React? (useState + validation)
✅ How do you build a REST API? (Express routes)
✅ How do you calculate EMI with compound interest? (Pure function)
✅ How do you highlight the best option? (Array sorting + conditional rendering)
✅ How do you validate forms? (Simple required field checks)
✅ How do you handle multi-step flows? (Step state + conditional rendering)

---

## 📱 Mobile Responsive Check

Open http://localhost:3000 and resize browser to < 768px width:
- ✅ Header stays responsive
- ✅ Grid changes from 2 columns to 1
- ✅ Buttons remain clickable
- ✅ Form inputs stack vertically

---

**Ready to explain in interviews!** 🚀
