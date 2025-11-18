/**
 * Global Type Definitions for ManPower Backend
 * Contains shared types and interfaces used across the application
 */

import { Request } from 'express';
import { IUser } from './models/User';

/**
 * Extended Express Request with authenticated user
 */
export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

/**
 * Standard API Response Format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  stack?: string;
}

/**
 * Error Response Format
 */
export interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
}

/**
 * Pagination Query Parameters
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
}

/**
 * Job Filter Query Parameters
 */
export interface JobFilterQuery {
  location?: string;
  urgency?: 'low' | 'medium' | 'high';
  skills?: string;
}

/**
 * User Registration Data
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'worker' | 'business' | 'admin';
}

/**
 * User Login Data
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Job Creation Data
 */
export interface JobCreationData {
  title: string;
  description: string;
  skills: string[];
  location: string;
  urgency: 'low' | 'medium' | 'high';
}

/**
 * User Update Data
 */
export interface UserUpdateData {
  name?: string;
  email?: string;
}

/**
 * Job Update Data
 */
export interface JobUpdateData {
  title?: string;
  description?: string;
  skills?: string[];
  location?: string;
  urgency?: 'low' | 'medium' | 'high';
}

/**
 * JWT Payload
 */
export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

/**
 * Environment Variables
 */
export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;
  MONGO_URI: string;
  JWT_SECRET: string;
  CLIENT_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvironmentVariables {}
  }
}

export {};
