/**
 * API Service - Axios Configuration
 * Centralized API client for making HTTP requests to the backend
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * API Response Interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

/**
 * API Error Response Interface
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  stack?: string;
}

/**
 * Create Axios instance with default configuration
 */
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Send cookies with requests
});

/**
 * Request Interceptor
 * Add authorization token or modify request before sending
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth token here if using headers instead of cookies
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle responses and errors globally
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          if (typeof window !== 'undefined') {
            // Only redirect if we're in the browser
            window.location.href = '/login';
          }
          break;
        case 403:
          // Forbidden - insufficient permissions
          console.error('Access forbidden:', data.message);
          break;
        case 404:
          // Not found
          console.error('Resource not found:', data.message);
          break;
        case 500:
          // Server error
          console.error('Server error:', data.message);
          break;
        default:
          console.error('API Error:', data.message);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server. Please check your connection.');
    } else {
      // Error in request configuration
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * API Helper Functions
 */

/**
 * GET request
 */
export const get = async <T = any>(url: string, params?: any): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

/**
 * POST request
 */
export const post = async <T = any>(url: string, data?: any): Promise<T> => {
  const response = await api.post<T>(url, data);
  return response.data;
};

/**
 * PUT request
 */
export const put = async <T = any>(url: string, data?: any): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

/**
 * DELETE request
 */
export const del = async <T = any>(url: string): Promise<T> => {
  const response = await api.delete<T>(url);
  return response.data;
};

/**
 * Export the configured Axios instance
 */
export default api;
