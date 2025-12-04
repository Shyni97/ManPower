import mongoose from 'mongoose';
import dns from 'dns';

// Set DNS to use Google's public DNS servers to avoid DNS resolution issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

/**
 * Connect to MongoDB database
 * Establishes connection using Mongoose and MongoDB Atlas
 */
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
