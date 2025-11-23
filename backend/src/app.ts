import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import workerRoutes from './routes/workerRoutes';
import applicationRoutes from './routes/applicationRoutes';
import chatRoutes from './routes/chatRoutes';
import paymentRoutes from './routes/paymentRoutes';
import ratingRoutes from './routes/ratingRoutes';
import verificationRoutes from './routes/verificationRoutes';
import notificationRoutes from './routes/notificationRoutes';
import adminRoutes from './routes/adminRoutes';
import reportRoutes from './routes/reportRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';

/**
 * Express Application Setup
 * Configures middleware and routes
 */

const app: Application = express();

/**
 * Middleware
 */

// CORS - Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
  })
);

// Body Parser - Parse JSON request bodies
app.use(express.json());

// URL Encoded - Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Cookie Parser - Parse cookies from request headers
app.use(cookieParser());

/**
 * Routes
 */

// Health check route
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'ManPower API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/verification', verificationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reports', reportRoutes);

/**
 * Error Handling Middleware
 * Must be defined after all routes
 */

// 404 Not Found Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
