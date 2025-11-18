# 🚀 ManPower Quick Reference

Fast access to common commands and information for the ManPower full-stack application.

---

## 📡 Servers

| Service | URL | Port | Status |
|---------|-----|------|--------|
| Backend API | http://localhost:5000 | 5000 | ✅ Running |
| Frontend App | http://localhost:3000 | 3000 | ✅ Running |
| MongoDB | Atlas Cloud | 27017 | ✅ Connected |

---

## ⚡ Quick Commands

### Backend Commands
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# View available scripts
npm run
```

### Frontend Commands
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

---

## 🔑 Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://it23566552_db_user:GayalShyni%40%232097@manpowercluster.svpizzx.mongodb.net/
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🛣️ API Routes Quick Reference

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Users
- `GET /api/users/profile` - Get profile (auth)
- `PUT /api/users/profile` - Update profile (auth)
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job
- `POST /api/jobs` - Create job (business)
- `PUT /api/jobs/:id` - Update job (owner)
- `DELETE /api/jobs/:id` - Delete job (owner)
- `GET /api/jobs/business/my-jobs` - My jobs (business)
- `POST /api/jobs/search` - Search jobs

---

## 📄 Frontend Pages

| Path | Component | Description | Auth |
|------|-----------|-------------|------|
| `/` | page.tsx | Home page | No |
| `/login` | login/page.tsx | Login form | No |
| `/register` | register/page.tsx | Register form | No |
| `/dashboard/business` | dashboard/business/page.tsx | Business dashboard | Business |
| `/dashboard/worker` | dashboard/worker/page.tsx | Worker dashboard | Worker |
| `/jobs` | jobs/page.tsx | Browse jobs | No |
| `/jobs/create` | jobs/create/page.tsx | Create job | Business |
| `/jobs/[jobId]` | jobs/[jobId]/page.tsx | Job details | No |
| `/chat/[chatId]` | chat/[chatId]/page.tsx | Chat | Auth |

---

## 🎯 User Roles

| Role | Capabilities |
|------|-------------|
| **Worker** | Browse jobs, apply, view details, manage profile |
| **Business** | Post jobs, manage listings, view applicants |
| **Admin** | Full system access, user management |

---

## 🔧 Common Tasks

### Create New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "worker"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "title": "React Developer",
    "description": "Looking for experienced React developer",
    "skills": ["React", "TypeScript", "Node.js"],
    "location": "Remote",
    "urgency": "high"
  }'
```

---

## 📦 Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT + bcryptjs
- CORS + cookie-parser

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios

---

## 📁 Important Files

### Backend
```
backend/
├── src/server.ts          # Entry point
├── src/app.ts             # Express app
├── src/config/db.ts       # DB connection
├── src/models/            # Mongoose schemas
├── src/controllers/       # Route handlers
├── src/services/          # Business logic
├── src/routes/            # API routes
└── .env                   # Environment variables
```

### Frontend
```
frontend/
├── src/app/layout.tsx     # Root layout
├── src/app/page.tsx       # Home page
├── src/components/        # Reusable components
├── src/controllers/       # API calls
├── src/services/api.ts    # Axios setup
├── src/context/           # Global state
└── .env.local             # Environment variables
```

---

## 🐛 Troubleshooting

### Backend Won't Start
1. Check MongoDB connection string in `.env`
2. Ensure port 5000 is not in use
3. Run `npm install` to ensure dependencies are installed

### Frontend Won't Start
1. Ensure backend is running on port 5000
2. Check `.env.local` has correct API URL
3. Clear `.next` folder: `rm -rf .next`
4. Run `npm install`

### API Requests Failing
1. Check backend is running: `curl http://localhost:5000/api/health`
2. Verify CORS is enabled in backend
3. Check browser console for errors
4. Verify JWT token is being sent

### Database Connection Issues
1. Check internet connection
2. Verify MongoDB Atlas credentials
3. Check IP whitelist in MongoDB Atlas
4. Test connection string

---

## 🔒 Security Checklist

- [x] Passwords hashed with bcrypt
- [x] JWT tokens in httpOnly cookies
- [x] Environment variables for secrets
- [x] CORS configured
- [x] Input validation
- [ ] Rate limiting (to add)
- [ ] CSRF protection (to add)
- [ ] API key rotation (to add)

---

## 📊 Project Status

### ✅ Complete
- Backend API (all endpoints)
- Frontend architecture
- Authentication system
- Job management system
- Responsive components

### 🔄 In Progress
- Additional pages
- Full UI implementation

### 📝 To Do
- Real-time chat
- Image uploads
- Email notifications
- Testing
- Production deployment

---

## 📚 Documentation

- **Full Summary**: `PROJECT_SUMMARY.md`
- **Backend Docs**: `backend/README.md`
- **Frontend Docs**: `frontend/README.md`
- **Quick Start**: `backend/QUICKSTART.md`
- **Deployment**: `backend/DEPLOYMENT.md`
- **API Collection**: `backend/postman_collection.json`

---

## 🎉 Quick Start (Fresh Setup)

```bash
# 1. Clone repository
git clone <repository-url>
cd "Man Power"

# 2. Setup backend
cd backend
npm install
# Configure .env file
npm run dev

# 3. Setup frontend (in new terminal)
cd frontend
npm install
# Configure .env.local file
npm run dev

# 4. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

---

## 📞 Support

- Check browser console for frontend errors
- Check terminal for backend errors
- Review API documentation
- Test with Postman collection

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Development Ready ✅
