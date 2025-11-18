# ManPower Backend - Job Marketplace API

A production-ready backend API built with Node.js, Express, TypeScript, and MongoDB using the MVC architecture pattern.

## 🚀 Features

- **MVC Architecture** - Clean separation of concerns with Models, Views (API responses), and Controllers
- **TypeScript** - Full type safety and modern JavaScript features
- **JWT Authentication** - Secure authentication with httpOnly cookies
- **Role-Based Authorization** - Support for Worker, Business, and Admin roles
- **MongoDB & Mongoose** - NoSQL database with elegant ODM
- **Password Hashing** - Secure password storage with bcryptjs
- **Error Handling** - Centralized error handling middleware
- **CORS Support** - Cross-origin resource sharing enabled
- **Input Validation** - Mongoose schema validation

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts                 # Database connection
│   ├── controllers/
│   │   ├── authController.ts     # Authentication logic
│   │   ├── userController.ts     # User management
│   │   └── jobController.ts      # Job management
│   ├── models/
│   │   ├── User.ts              # User schema & model
│   │   └── Job.ts               # Job schema & model
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth endpoints
│   │   ├── userRoutes.ts        # User endpoints
│   │   └── jobRoutes.ts         # Job endpoints
│   ├── middleware/
│   │   ├── authMiddleware.ts    # JWT verification & authorization
│   │   └── errorMiddleware.ts   # Global error handler
│   ├── services/
│   │   ├── userService.ts       # User business logic
│   │   └── jobService.ts        # Job business logic
│   ├── utils/
│   │   └── generateToken.ts     # JWT token utilities
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Parse HTTP cookies
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🚦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

The MongoDB connection is already configured in `.env`. You can modify it if needed.

### 3. Run in Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 4. Build for Production

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login user | Public |
| POST | `/logout` | Logout user | Private |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/profile` | Get current user profile | Private |
| PUT | `/profile` | Update user profile | Private |
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get user by ID | Admin |
| DELETE | `/:id` | Delete user | Admin |

### Job Routes (`/api/jobs`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create job posting | Business/Admin |
| GET | `/` | Get all jobs (with filters) | Public |
| GET | `/:id` | Get job by ID | Public |
| GET | `/business/my-jobs` | Get my job postings | Business/Admin |
| PUT | `/:id` | Update job posting | Business/Admin (Owner) |
| DELETE | `/:id` | Delete job posting | Business/Admin (Owner) |
| POST | `/search` | Search jobs by skills | Public |

## 📝 API Usage Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "worker"  // "worker", "business", or "admin"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Job (Business User)

```bash
POST /api/jobs
Content-Type: application/json
Cookie: jwt=<token>

{
  "title": "Web Developer Needed",
  "description": "Looking for an experienced web developer",
  "skills": ["JavaScript", "React", "Node.js"],
  "location": "New York, NY",
  "urgency": "high"  // "low", "medium", or "high"
}
```

### Get All Jobs with Filters

```bash
GET /api/jobs?location=New York&urgency=high&skills=JavaScript,React
```

### Search Jobs by Skills

```bash
POST /api/jobs/search
Content-Type: application/json

{
  "skills": ["JavaScript", "React", "TypeScript"]
}
```

## 🔐 User Roles

- **Worker** - Can browse and search jobs
- **Business** - Can create, update, and delete their own job postings
- **Admin** - Full access to all resources

## 🔒 Security Features

- **JWT Authentication** - Tokens stored in httpOnly cookies
- **Password Hashing** - Passwords hashed with bcryptjs (10 rounds)
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Mongoose schema validation
- **Error Handling** - Sanitized error messages in production

## 🧪 Testing the API

You can test the API using:
- **Postman** - Import the endpoints
- **cURL** - Command-line testing
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (not implemented yet)

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | development |
| `PORT` | Server port | 5000 |
| `MONGO_URI` | MongoDB connection string | (provided) |
| `JWT_SECRET` | Secret key for JWT | (required) |
| `CLIENT_URL` | Frontend URL for CORS | http://localhost:3000 |

## 🐛 Error Handling

The API uses a centralized error handling system:

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (authentication required)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

Error Response Format:
```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Error stack (development only)"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC

## 👨‍💻 Author

ManPower Development Team

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- TypeScript documentation
- JWT.io

---

**Happy Coding! 🚀**
