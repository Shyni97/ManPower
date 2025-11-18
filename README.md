# 🚀 ManPower - Job Marketplace Platform

A modern, full-stack MERN application connecting skilled workers with businesses for freelance and contract opportunities. This project is actively under development, and many features are still being implemented or improved.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with httpOnly cookies
- 👥 **Role-Based Access Control** - Worker, Business, and Admin roles
- 💼 **Job Management** - Create, update, delete, and search job listings
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🎨 **Modern UI** - Clean and intuitive user interface
- 🔍 **Advanced Search** - Filter jobs by skills, location, and urgency
- 💬 **Chat System** - Real-time communication (planned)
- 📊 **Dashboard** - Role-specific dashboards for users
- 🛡️ **Type Safety** - Full TypeScript implementation
- 📡 **RESTful API** - Clean and documented API endpoints

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.21.2
- **Language**: TypeScript 5.9.3
- **Database**: MongoDB with Mongoose 8.9.3
- **Authentication**: JWT 9.0.2
- **Password Hashing**: bcryptjs 2.4.3
- **Middleware**: CORS, cookie-parser

### Frontend
- **Framework**: Next.js 14.2.18 (App Router)
- **Language**: TypeScript 5.7.2
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.16
- **HTTP Client**: Axios 1.7.9
- **State Management**: React Context API

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│              Next.js + React + TypeScript                   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Pages   │  │Components│  │Controllers│  │ Services │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │             │              │              │         │
│       └─────────────┴──────────────┴──────────────┘         │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────┼───────────────────────────────────┐
│                          │                                   │
│       ┌──────────────────▼─────────────────┐                │
│       │        Express Router              │                │
│       └──────────────────┬─────────────────┘                │
│                          │                                   │
│  ┌──────────┐  ┌────────▼────┐  ┌──────────┐  ┌──────────┐│
│  │  Routes  │─▶│Controllers  │─▶│ Services │─▶│  Models  ││
│  └──────────┘  └─────────────┘  └──────────┘  └────┬─────┘│
│                                                      │       │
│                    Backend - Node.js + Express      │       │
└─────────────────────────────────────────────────────┼───────┘
                                                      │
                                           ┌──────────▼─────────┐
                                           │   MongoDB Atlas    │
                                           └────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)
- Git
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Shyni97/ManPower.git
cd ManPower
```

2. **Setup Backend**
```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Create .env.local file from example
cp .env.local.example .env.local
# Edit .env.local if needed (default should work)
```

4. **Start Development Servers**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

5. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## 📁 Project Structure

```
ManPower/
├── backend/                  # Backend application
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── models/          # Mongoose models
│   │   ├── services/        # Business logic
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── .env.example         # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # Frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── controllers/     # API interaction layer
│   │   ├── services/        # HTTP client setup
│   │   ├── models/          # TypeScript interfaces
│   │   ├── context/         # React Context providers
│   │   ├── hooks/           # Custom React hooks
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   ├── .env.local.example   # Environment variables template
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── .gitignore
├── PROJECT_SUMMARY.md        # Detailed project overview
├── QUICK_REFERENCE.md        # Quick commands reference
└── README.md                 # This file
```

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get current user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Job Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | Get all jobs | No |
| GET | `/api/jobs/:id` | Get job by ID | No |
| POST | `/api/jobs` | Create new job | Business |
| PUT | `/api/jobs/:id` | Update job | Owner |
| DELETE | `/api/jobs/:id` | Delete job | Owner |
| GET | `/api/jobs/business/my-jobs` | Get my jobs | Business |
| POST | `/api/jobs/search` | Search jobs | No |

For detailed API documentation and Postman collection, see `backend/postman_collection.json`.

## 🔐 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**⚠️ Important**: Never commit `.env` files to version control. Use `.env.example` as templates.

## 📦 Available Scripts

### Backend

```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm start          # Run production server
```

### Frontend

```bash
npm run dev        # Start Next.js development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Lint code
```

## 🚢 Deployment

### Backend Deployment

**Recommended Platforms:**
- Railway
- Render
- Heroku
- DigitalOcean

See `backend/DEPLOYMENT.md` for detailed deployment instructions.

### Frontend Deployment

**Recommended Platforms:**
- Vercel (Recommended for Next.js)
- Netlify
- Railway

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables
4. Deploy!

## 🎯 User Roles

| Role | Capabilities |
|------|-------------|
| **Worker** | Browse jobs, apply to positions, manage profile |
| **Business** | Post job listings, manage jobs, view applicants |
| **Admin** | Full system access, user management, moderation |

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens stored in httpOnly cookies
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Role-based authorization
- ✅ Protected API routes
- ✅ Environment variable protection

## 🧪 Testing

```bash
# Backend tests (to be implemented)
cd backend
npm test

# Frontend tests (to be implemented)
cd frontend
npm test
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [API Quick Reference](./QUICK_REFERENCE.md)
- [Project Summary](./PROJECT_SUMMARY.md)
- [Backend Quick Start](./backend/QUICKSTART.md)
- [Deployment Guide](./backend/DEPLOYMENT.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Frontend has some npm security vulnerabilities (dev dependencies only)
- Real-time chat feature is planned but not yet implemented
- Image upload functionality is planned

## 📝 Roadmap

- [ ] Real-time chat implementation
- [ ] Image upload for profiles and jobs
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Job application tracking
- [ ] Rating and review system
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] Unit and E2E tests
- [ ] CI/CD pipeline

## 👨‍💻 Author

**Shyni97**
- GitHub: [@Shyni97](https://github.com/Shyni97)

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the flexible database solution
- Tailwind CSS for the utility-first CSS framework
- Express.js community for the robust backend framework
- All contributors and supporters

---

**Built with ❤️ for connecting workers and businesses**

For questions or support, please open an issue on GitHub.

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: November 2025
