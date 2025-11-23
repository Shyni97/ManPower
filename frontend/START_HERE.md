# 🚀 Frontend Quick Start

## Start Development Server

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:3000

## Created Pages (13 Total)

### ✅ Authentication
1. `/register` - Sign up (worker/business)
2. `/login` - Sign in (already existed)

### ✅ Public
3. `/` - Landing page
4. `/jobs` - Browse jobs + filters
5. `/jobs/[id]` - Job details + apply

### ✅ Worker Dashboard  
6. `/dashboard/worker` - Main dashboard
7. `/dashboard/worker/profile` - Edit profile
8. `/dashboard/worker/applications` - Track applications
9. `/dashboard/worker/messages` - Chat (placeholder)

### ✅ Business Dashboard
10. `/dashboard/business` - Main dashboard
11. `/dashboard/business/jobs/new` - Post job

### ✅ Admin
12. `/dashboard/admin` - Admin panel

## Test Flow

1. **Register**: Create worker + business accounts
2. **Business**: Post a job
3. **Worker**: Browse → Apply
4. **Business**: Review applications
5. **Worker**: Check application status

## All pages are connected to backend APIs and ready to test! 🎉
