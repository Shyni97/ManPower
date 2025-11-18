import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
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
app.get('/api/health', (req, res) => {
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

/**
 * Error Handling Middleware
 * Must be defined after all routes
 */

// 404 Not Found Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
