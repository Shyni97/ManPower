# ManPower Frontend - Job Marketplace

A modern, responsive frontend application built with Next.js 14, TypeScript, and Tailwind CSS following MVC-style architecture.

## 🚀 Features

- **Next.js 14 App Router** - Modern React framework with server components
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests
- **Context API** - Global state management for authentication
- **Mobile-First Design** - Responsive UI for all devices
- **MVC Architecture** - Clean separation of concerns

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Home page
│   │   ├── login/page.tsx           # Login page
│   │   └── ...                      # More pages to be created
│   ├── components/
│   │   ├── NavBar.tsx               ✅ Global navigation
│   │   ├── Footer.tsx               ✅ Global footer
│   │   ├── JobCard.tsx              ✅ Job display card
│   │   ├── ChatBox.tsx              ✅ Chat interface
│   │   └── InputField.tsx           ✅ Reusable input component
│   ├── controllers/
│   │   ├── authController.ts        ✅ Auth API calls
│   │   └── jobController.ts         ✅ Job API calls
│   ├── services/
│   │   └── api.ts                   ✅ Axios configuration
│   ├── models/
│   │   ├── user.ts                  ✅ User interfaces
│   │   └── job.ts                   ✅ Job interfaces
│   ├── context/
│   │   └── AuthContext.tsx          ✅ Authentication context
│   ├── hooks/
│   │   └── useAuth.ts               ✅ Auth hook
│   └── utils/
│       └── validators.ts            ✅ Validation utilities
├── .env.local                       ✅ Environment variables
├── tailwind.config.ts               ✅ Tailwind configuration
├── next.config.ts                   ✅ Next.js configuration
└── package.json                     ✅ Dependencies
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.18 | React framework |
| React | 18.3.1 | UI library |
| TypeScript | 5.7.2 | Type safety |
| Tailwind CSS | 3.4.16 | Styling |
| Axios | 1.7.9 | HTTP client |
| clsx | 2.1.1 | Conditional classNames |

## 🚦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

The `.env.local` file is already configured:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Make sure your backend is running on port 5000** before starting the frontend.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📡 API Integration

The frontend connects to the backend API running at `http://localhost:5000/api`.

### Authentication Endpoints
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /users/profile` - Get user profile

### Job Endpoints
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create job (business only)
- `PUT /jobs/:id` - Update job (owner only)
- `DELETE /jobs/:id` - Delete job (owner only)

## 🔐 Authentication Flow

1. User logs in via `/login` page
2. Backend returns user data and sets httpOnly cookie
3. Frontend stores user in AuthContext
4. useAuth hook provides user state throughout app
5. Protected routes check authentication status

## ✅ Completed Components

### Core Components
- **NavBar** - Responsive navigation with mobile menu
- **Footer** - Footer with links and copyright
- **JobCard** - Job listing card with urgency badges
- **ChatBox** - Chat interface component
- **InputField** - Reusable form input with validation

### MVC Architecture
- **Models** - TypeScript interfaces for User and Job
- **Controllers** - API interaction functions
- **Services** - Axios instance with interceptors
- **Context** - AuthContext for global state
- **Hooks** - useAuth hook for authentication

## 📱 Mobile-First Design

All components are designed mobile-first with responsive breakpoints:

- **Mobile**: Single column, stacked navigation
- **Tablet**: Two columns where appropriate
- **Desktop**: Full multi-column layouts

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization

### Update Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Add New Components

Create in `src/components/`:

```tsx
'use client';

import React from 'react';

interface MyComponentProps {
  // Props here
}

const MyComponent: React.FC<MyComponentProps> = (props) => {
  return (
    // JSX here
  );
};

export default MyComponent;
```

## 🐛 Troubleshooting

### API Connection Issues

1. Ensure backend is running on port 5000
2. Check `.env.local` has correct API URL
3. Verify CORS is enabled in backend

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`

## 📄 Architecture Notes

### MVC Pattern in Next.js

- **Models**: TypeScript interfaces in `src/models/`
- **Views**: React components in `src/app/` and `src/components/`
- **Controllers**: API interaction functions in `src/controllers/`

### State Management

- **Global State**: Context API for authentication
- **Local State**: React useState for component state

## 🎉 Next Steps

1. ✅ Project structure created
2. ✅ Dependencies installed
3. ✅ Components ready
4. 🔄 Start development server
5. 🔄 Test authentication flow
6. 🔄 Create additional pages as needed

---

**For backend documentation, see:** `../backend/README.md`
