import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './app';
import connectDB from './config/db';
import { initializeSocket } from './config/socket';

/**
 * Load environment variables from .env file
 * Must be done before accessing process.env
 */
dotenv.config();

/**
 * Server Configuration
 */

const PORT = process.env.PORT || 5000;

/**
 * Start Server
 * Connect to database, initialize Socket.IO, and start listening on specified port
 */
const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create HTTP server
    const httpServer = createServer(app);

    // Initialize Socket.IO
    initializeSocket(httpServer);
    console.log('✅ Socket.IO initialized');

    // Start server
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
      console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
      console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔌 Socket.IO ready for connections`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  console.error(err.stack);
  // Close server & exit process
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err.message);
  console.error(err.stack);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();
