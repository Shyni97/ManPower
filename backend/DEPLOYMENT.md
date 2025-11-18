# 🚀 Deployment Guide - ManPower Backend

This guide will help you deploy your ManPower backend to production.

## 📋 Pre-Deployment Checklist

- [ ] Update `.env` with production values
- [ ] Change `JWT_SECRET` to a strong random key
- [ ] Set `NODE_ENV=production`
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Set up CORS for production frontend URL
- [ ] Test all endpoints locally
- [ ] Build the project (`npm run build`)
- [ ] Review security settings

## 🔐 Security Best Practices

### 1. Environment Variables
```bash
# Generate a strong JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Update `.env`:
```env
NODE_ENV=production
JWT_SECRET=<generated-secret-here>
CLIENT_URL=https://your-frontend-domain.com
MONGO_URI=<your-production-mongodb-uri>
```

### 2. MongoDB Atlas Setup
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. For production: Add your server's IP or use 0.0.0.0/0 (less secure)
4. Database Access → Ensure strong password

### 3. CORS Configuration
Update `src/app.ts` if needed:
```typescript
cors({
  origin: [
    'https://your-frontend-domain.com',
    'https://www.your-frontend-domain.com'
  ],
  credentials: true,
})
```

## 🌐 Deployment Options

### Option 1: Heroku

#### Step 1: Install Heroku CLI
```bash
# Windows (using Chocolatey)
choco install heroku-cli

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login to Heroku
```bash
heroku login
```

#### Step 3: Create Heroku App
```bash
cd backend
heroku create manpower-backend
```

#### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set CLIENT_URL=https://your-frontend.com
```

#### Step 5: Add Procfile
Create `Procfile` in backend root:
```
web: npm start
```

#### Step 6: Update package.json
Add to `scripts`:
```json
{
  "heroku-postbuild": "npm run build"
}
```

#### Step 7: Deploy
```bash
git init
git add .
git commit -m "Initial deployment"
heroku git:remote -a manpower-backend
git push heroku main
```

#### Step 8: Open App
```bash
heroku open
```

---

### Option 2: Railway

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login
```bash
railway login
```

#### Step 3: Initialize Project
```bash
cd backend
railway init
```

#### Step 4: Add Environment Variables
```bash
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_secret_key
railway variables set MONGO_URI=your_mongodb_uri
railway variables set CLIENT_URL=https://your-frontend.com
```

#### Step 5: Deploy
```bash
railway up
```

---

### Option 3: Render

#### Step 1: Create Account
Go to https://render.com and sign up

#### Step 2: New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: manpower-backend
   - Environment: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

#### Step 3: Add Environment Variables
In Render dashboard:
- NODE_ENV=production
- JWT_SECRET=your_secret_key
- MONGO_URI=your_mongodb_uri
- CLIENT_URL=https://your-frontend.com

#### Step 4: Deploy
Click "Create Web Service"

---

### Option 4: DigitalOcean App Platform

#### Step 1: Create Account
Go to https://www.digitalocean.com

#### Step 2: Create App
1. Click "Create" → "Apps"
2. Connect GitHub repository
3. Select branch: main
4. Detect resource type: Node.js

#### Step 3: Configure
- Name: manpower-backend
- Build Command: `npm install && npm run build`
- Run Command: `npm start`

#### Step 4: Environment Variables
Add in app settings:
- NODE_ENV=production
- JWT_SECRET=your_secret_key
- MONGO_URI=your_mongodb_uri
- CLIENT_URL=https://your-frontend.com

---

### Option 5: AWS (EC2)

#### Step 1: Launch EC2 Instance
1. Go to AWS EC2 Console
2. Launch Instance (Ubuntu 22.04 LTS)
3. Configure security group (allow ports 22, 80, 443, 5000)

#### Step 2: Connect to Instance
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

#### Step 4: Clone Repository
```bash
git clone <your-repo-url>
cd backend
```

#### Step 5: Install Dependencies
```bash
npm install
```

#### Step 6: Create .env File
```bash
nano .env
# Add your production environment variables
```

#### Step 7: Build Project
```bash
npm run build
```

#### Step 8: Start with PM2
```bash
pm2 start dist/server.js --name manpower-backend
pm2 save
pm2 startup
```

#### Step 9: Configure Nginx (Optional)
```bash
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo systemctl restart nginx
```

---

### Option 6: Vercel

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Create vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

#### Step 4: Deploy
```bash
npm run build
vercel --prod
```

#### Step 5: Set Environment Variables
```bash
vercel env add NODE_ENV
vercel env add JWT_SECRET
vercel env add MONGO_URI
vercel env add CLIENT_URL
```

---

## 🔍 Post-Deployment Checks

### 1. Health Check
```bash
curl https://your-backend-url.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "ManPower API is running",
  "timestamp": "2025-11-18T..."
}
```

### 2. Test Authentication
```bash
# Register a user
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"worker"}'

# Login
curl -X POST https://your-backend-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 3. Check Logs
```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# PM2 (AWS)
pm2 logs manpower-backend

# Render/Vercel
# Check dashboard
```

---

## 📊 Monitoring

### 1. Set Up Error Tracking

#### Sentry Integration
```bash
npm install @sentry/node
```

Update `src/server.ts`:
```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Performance Monitoring

#### New Relic
```bash
npm install newrelic
```

Create `newrelic.js`:
```javascript
exports.config = {
  app_name: ['ManPower Backend'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: { level: 'info' }
};
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "manpower-backend"
        heroku_email: "your-email@example.com"
```

---

## 🛡️ Security Headers

Add helmet for security headers:
```bash
npm install helmet
```

Update `src/app.ts`:
```typescript
import helmet from 'helmet';

app.use(helmet());
```

---

## 📈 Performance Optimization

### 1. Enable Compression
```bash
npm install compression
```

```typescript
import compression from 'compression';
app.use(compression());
```

### 2. Rate Limiting
```bash
npm install express-rate-limit
```

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api', limiter);
```

---

## 🔧 Database Optimization

### 1. MongoDB Atlas
- Enable auto-scaling
- Set up backups
- Monitor performance
- Create indexes for frequently queried fields

### 2. Connection Pooling
Already configured in `db.ts`

---

## 📝 Environment Variables Summary

```env
# Required
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_64_char_secret

# Optional
CLIENT_URL=https://your-frontend.com
SENTRY_DSN=https://...
NEW_RELIC_LICENSE_KEY=...
```

---

## 🆘 Troubleshooting

### Issue: MongoDB Connection Failed
- Check MONGO_URI format
- Verify IP whitelist in Atlas
- Check network connectivity

### Issue: JWT Errors
- Ensure JWT_SECRET is set
- Check token expiration settings
- Verify cookie configuration

### Issue: CORS Errors
- Update CLIENT_URL
- Check CORS configuration
- Verify credentials setting

---

## 📚 Additional Resources

- [Heroku Node.js Deployment](https://devcenter.heroku.com/articles/deploying-nodejs)
- [MongoDB Atlas Best Practices](https://docs.atlas.mongodb.com/best-practices/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

## ✅ Deployment Complete!

Your ManPower backend is now deployed and production-ready!

**Remember to:**
- Monitor logs regularly
- Set up alerts for errors
- Keep dependencies updated
- Back up your database
- Document any changes

**Happy Deploying! 🚀**
