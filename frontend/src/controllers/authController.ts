/**
 * Auth Controller
 * Handles authentication-related logic and API calls
 */

import { post } from '../services/api';
import {
  User,
  RegisterData,
  LoginData,
  AuthResponse,
} from '../models/user';

/**
 * Register a new user
 * @param data - Registration data (name, email, password, role)
 * @returns Promise with auth response
 */
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>('/auth/register', data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

/**
 * Login user
 * @param data - Login credentials (email, password)
 * @returns Promise with auth response and user data
 */
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await post<AuthResponse>('/auth/login', data);
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

/**
 * Logout user
 * @returns Promise with success message
 */
export const logoutUser = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await post<{ success: boolean; message: string }>('/auth/logout');
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

/**
 * Get current user profile
 * @returns Promise with user data
 */
export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await post<{ success: boolean; data: User }>('/users/profile');
    if (response.data) {
      return response.data;
    }
    throw new Error('Failed to fetch user profile');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

/**
 * Update user profile
 * @param data - Update data (name, email)
 * @returns Promise with updated user data
 */
export const updateUserProfile = async (data: {
  name?: string;
  email?: string;
}): Promise<User> => {
  try {
    const response = await post<{ success: boolean; data: User }>(
      '/users/profile',
      data
    );
    if (response.data) {
      return response.data;
    }
    throw new Error('Failed to update profile');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};
