/**
 * User Model - TypeScript Interfaces
 * Defines the structure of user data in the ManPower application
 */

/**
 * User role enumeration
 */
export enum UserRole {
  WORKER = 'worker',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

/**
 * User Interface
 * Represents a user in the system
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Register Request Data
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

/**
 * Login Request Data
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Auth Response Data
 */
export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
}

/**
 * Update User Data
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
}
