/**
 * Validators Utility
 * Functions for validating user input
 */

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns True if valid (min 6 characters), false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate required field
 * @param value - Field value to validate
 * @returns True if not empty, false otherwise
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate name (no special characters except space, hyphen, apostrophe)
 * @param name - Name to validate
 * @returns True if valid, false otherwise
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name) && name.trim().length > 0;
};

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns True if valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate array has items
 * @param arr - Array to validate
 * @returns True if has items, false otherwise
 */
export const hasItems = (arr: any[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Format error message
 * @param error - Error object
 * @returns Formatted error message
 */
export const formatErrorMessage = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
