# 🚀 QUICK START GUIDE - ManPower Hiring System

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies ✅ (Already Done!)

Both backend and frontend dependencies are already installed.

---

### Step 2: Setup Backend Environment

1. **Create `.env` file in `/backend` folder**:

```bash
cd backend
```

Create a file named `.env` with this content:

```env
# MongoDB - Use one of these options:
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/manpower

# Option 2: MongoDB Atlas (Free Cloud Database)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/manpower

# JWT Secret (change this to something random)
JWT_SECRET=your_super_secret_jwt_key_12345

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
CLIENT_URL=http://localhost:3000

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe (Get test keys from stripe.com)
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

---

### Step 3: Start MongoDB

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is installed and running
mongod
```

**Option B: MongoDB Atlas (Recommended for beginners)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Get connection string
5. Add to `.env` file

---

### Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running in development mode on port 5000
📡 API endpoint: http://localhost:5000/api
💚 Health check: http://localhost:5000/api/health
🔌 Socket.IO ready for connections
```

---

### Step 5: Test Backend

Open a browser or use curl:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "message": "ManPower API is running",
  "timestamp": "2024-..."
}
```

---

### Step 6: Start Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will start at: `http://localhost:3000`

---

## 🎯 Test the System

### 1. Register a User

**POST** `http://localhost:5000/api/auth/register`

```json
{
  "name": "John Worker",
  "email": "john@example.com",
  "password": "password123",
  "role": "worker"
}
```

### 2. Login

**POST** `http://localhost:5000/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Create a Job (as business user)

**POST** `http://localhost:5000/api/jobs`
(Requires authentication)

```json
{
  "title": "Plumber Needed",
  "description": "Need experienced plumber",
  "skills": ["plumbing", "repair"],
  "location": "New York",
  "jobType": "full-time",
  "numberOfWorkers": 2,
  "urgency": "high"
}
```

---

## 📱 Use Postman or Thunder Client

Import the Postman collection:
`/backend/postman_collection.json`

This includes all API endpoints ready to test.

---

## 🔐 Admin Account Setup

Create an admin user manually in MongoDB or register and update role:

```javascript
// In MongoDB compass or shell:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 🛠️ Common Issues & Solutions

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check MONGODB_URI in .env
- Try MongoDB Atlas if local doesn't work

### "JWT_SECRET not defined"
- Make sure .env file exists in backend folder
- Check JWT_SECRET is set

### "Port 5000 already in use"
- Change PORT in .env to 5001 or another port
- Or stop the process using port 5000

### Frontend can't connect to backend
- Make sure both servers are running
- Check CLIENT_URL in backend .env
- Check API base URL in frontend

---

## 📚 What's Available

### ✅ Backend Features (All Working!)
- User Authentication (Worker/Business/Admin)
- Job Posting & Management
- Worker Profiles
- Job Applications
- Real-time Chat (Socket.IO)
- Payment System (Stripe)
- Rating & Reviews
- ID Verification
- Admin Dashboard
- Notifications
- Reports & Analytics

### 📊 Total APIs: 58+ endpoints

---

## 🎨 Frontend Pages to Create

The backend is ready! Now you can build frontend pages for:

1. **Auth Pages**
   - Login
   - Register
   - Profile

2. **Worker Pages**
   - Dashboard
   - Job Search
   - My Applications
   - Chat
   - Earnings

3. **Business Pages**
   - Dashboard
   - Post Job
   - Applications
   - Chat
   - Payments

4. **Admin Pages**
   - Dashboard
   - User Management
   - Job Management
   - Verification Approvals
   - Payments & Withdrawals

---

## 📖 Documentation

- **API Docs**: `/backend/API_DOCUMENTATION.md`
- **Implementation Summary**: `/IMPLEMENTATION_COMPLETE.md`
- **Project Info**: `/PROJECT_SUMMARY.md` and `/QUICK_REFERENCE.md`

---

## 💡 Next Steps

1. ✅ Backend is ready
2. Create frontend pages
3. Connect frontend to APIs
4. Add Socket.IO client for chat
5. Add Stripe client for payments
6. Test end-to-end workflow

---

## 🤝 Need Help?

- Check console logs for errors
- Review API documentation
- Check code comments in controllers
- Test APIs with Postman first
- Ensure all environment variables are set

---

## 🎉 You're All Set!

Your ManPower hiring system backend is running and ready to use!

Start building the frontend or test the APIs with Postman.

Happy coding! 🚀
