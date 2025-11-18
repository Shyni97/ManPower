import jwt from 'jsonwebtoken';
import { Response } from 'express';

/**
 * Generate JWT token and set it in httpOnly cookie
 * @param res - Express response object
 * @param userId - User ID to encode in the token
 * @returns The generated JWT token
 */
export const generateToken = (res: Response, userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Generate JWT token with user ID as payload
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '30d', // Token expires in 30 days
  });

  // Set token in httpOnly cookie for security
  res.cookie('jwt', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });

  return token;
};

/**
 * Clear the JWT token cookie (for logout)
 * @param res - Express response object
 */
export const clearToken = (res: Response): void => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Set expiry to past date to clear cookie
  });
};
