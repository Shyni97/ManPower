# 🚀 Quick Start Guide - ManPower Backend

## ✅ Setup Complete!

Your ManPower backend is now fully set up and running! Here's what has been created:

### 📂 Project Structure
```
backend/
├── src/
│   ├── config/db.ts              ✅ MongoDB connection
│   ├── models/
│   │   ├── User.ts               ✅ User model (Worker/Business/Admin)
│   │   └── Job.ts                ✅ Job model
│   ├── controllers/
│   │   ├── authController.ts     ✅ Register, Login, Logout
│   │   ├── userController.ts     ✅ User management
│   │   └── jobController.ts      ✅ Job CRUD operations
│   ├── services/
│   │   ├── userService.ts        ✅ User business logic
│   │   └── jobService.ts         ✅ Job business logic
│   ├── routes/
│   │   ├── authRoutes.ts         ✅ Auth endpoints
│   │   ├── userRoutes.ts         ✅ User endpoints
│   │   └── jobRoutes.ts          ✅ Job endpoints
│   ├── middleware/
│   │   ├── authMiddleware.ts     ✅ JWT & Role-based auth
│   │   └── errorMiddleware.ts    ✅ Global error handling
│   ├── utils/
│   │   └── generateToken.ts      ✅ JWT utilities
│   ├── app.ts                    ✅ Express app
│   └── server.ts                 ✅ Server entry point
├── .env                          ✅ Environment variables
├── .gitignore                    ✅ Git ignore rules
├── package.json                  ✅ Dependencies
├── tsconfig.json                 ✅ TypeScript config
├── postman_collection.json       ✅ API testing collection
└── README.md                     ✅ Documentation
```

## 🎯 What You Can Do Now

### 1. Test the Server (Already Running!)
Your server is currently running at: **http://localhost:5000**

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Or open in browser: http://localhost:5000/api/health

### 2. Test the API with Postman
1. Open Postman
2. Import `postman_collection.json`
3. Start testing endpoints!

### 3. Create Your First User
```bash
# Register a worker
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Worker",
    "email": "worker@example.com",
    "password": "password123",
    "role": "worker"
  }'

# Register a business
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "email": "business@acme.com",
    "password": "password123",
    "role": "business"
  }'

# Register an admin
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@manpower.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### 4. Test Authentication
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "business@acme.com",
    "password": "password123"
  }' \
  -c cookies.txt

# Get profile (using saved cookies)
curl http://localhost:5000/api/users/profile -b cookies.txt
```

### 5. Create a Job (Business User)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Senior React Developer",
    "description": "Looking for an experienced React developer",
    "skills": ["React", "TypeScript", "Node.js"],
    "location": "Remote",
    "urgency": "high"
  }'
```

### 6. Browse Jobs (Public)
```bash
# Get all jobs
curl http://localhost:5000/api/jobs

# Filter by location
curl "http://localhost:5000/api/jobs?location=Remote"

# Filter by urgency
curl "http://localhost:5000/api/jobs?urgency=high"

# Search by skills
curl -X POST http://localhost:5000/api/jobs/search \
  -H "Content-Type: application/json" \
  -d '{"skills": ["React", "TypeScript"]}'
```

## 📱 Available Commands

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔑 User Roles & Permissions

### Worker
- ✅ Can register/login
- ✅ Can view all jobs
- ✅ Can search jobs
- ✅ Can update own profile

### Business
- ✅ All Worker permissions
- ✅ Can create jobs
- ✅ Can update own jobs
- ✅ Can delete own jobs
- ✅ Can view own job postings

### Admin
- ✅ All Business permissions
- ✅ Can view all users
- ✅ Can delete any user
- ✅ Can manage any job

## 🔐 Security Features

✅ **Password Hashing** - bcryptjs with 10 rounds
✅ **JWT Authentication** - httpOnly cookies
✅ **CORS Protection** - Configured for frontend
✅ **Input Validation** - Mongoose schema validation
✅ **Role-based Access** - Middleware protection
✅ **Error Sanitization** - Safe error messages

## 📊 Database

**MongoDB Atlas** is already connected!
- Connection: ✅ Active
- Database: `manpower`
- Collections: `users`, `jobs`

## 🔄 Next Steps

1. ✅ **Backend is ready!** - All API endpoints are functional
2. 🎨 **Build your frontend** - Connect to these APIs
3. 🧪 **Test thoroughly** - Use Postman collection
4. 📝 **Add features** - Extend as needed
5. 🚀 **Deploy** - When ready for production

## 🐛 Troubleshooting

### Server won't start?
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed (Windows)
taskkill /PID <process_id> /F
```

### MongoDB connection issues?
- Check `.env` file has correct MONGO_URI
- Verify internet connection
- Check MongoDB Atlas IP whitelist

### TypeScript errors?
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 API Documentation

Full API documentation is in `README.md`

## 🎉 You're All Set!

Your ManPower backend is production-ready with:
- ✅ MVC Architecture
- ✅ TypeScript
- ✅ JWT Authentication
- ✅ MongoDB Integration
- ✅ Role-based Authorization
- ✅ Error Handling
- ✅ Input Validation
- ✅ Clean Code Structure

**Happy Coding! 🚀**

---

For detailed API documentation, see: [README.md](./README.md)
