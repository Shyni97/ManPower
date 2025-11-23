import { Request, Response } from 'express';
import { UserRole } from '../models/User';
import * as userService from '../services/userService';
import { generateToken, clearToken } from '../utils/generateToken';

/**
 * Auth Controller
 * Handles authentication-related requests (register, login, logout)
 */

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
      return;
    }

    // Validate role if provided
    const validRoles = Object.values(UserRole);
    if (role && !validRoles.includes(role)) {
      res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${validRoles.join(', ')}`,
      });
      return;
    }

    // Create user through service layer
    const user = await userService.createUser(
      name,
      email,
      password,
      role || UserRole.WORKER
    );

    // Generate token and set cookie
    generateToken(res, user._id.toString());

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user & get token
 * @access  Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
      return;
    }

    // Authenticate user through service layer
    const user = await userService.authenticateUser(email, password);

    // Generate token and set cookie
    generateToken(res, user._id.toString());

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user & clear cookie
 * @access  Private
 */
export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Clear JWT cookie
    clearToken(res);

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Logout failed';
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
