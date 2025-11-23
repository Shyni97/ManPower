import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as workerService from '../services/workerService';

/**
 * @route   PUT /api/workers/profile
 * @desc    Update worker profile
 * @access  Private (Worker)
 */
export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const profileData = req.body;

    const user = await workerService.updateWorkerProfile(userId.toString(), profileData);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/workers/profile/:id
 * @desc    Get worker profile by ID
 * @access  Public
 */
export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Worker ID is required',
      });
      return;
    }

    const worker = await workerService.getWorkerProfile(id);

    res.status(200).json({
      success: true,
      data: worker,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get profile';
    res.status(404).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/workers/search
 * @desc    Search workers by skills and filters
 * @access  Public
 */
export const searchWorkers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { skills, availability, minRating, location, maxRate, page, limit } = req.query;

    const filters = {
      skills: skills ? (typeof skills === 'string' ? skills.split(',') : skills) as string[] : undefined,
      availability: availability as string | undefined,
      minRating: minRating ? parseFloat(minRating as string) : undefined,
      location: location as string | undefined,
      maxRate: maxRate ? parseFloat(maxRate as string) : undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await workerService.searchWorkers(filters);

    res.status(200).json({
      success: true,
      data: result.workers,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to search workers';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/workers/availability
 * @desc    Update worker availability status
 * @access  Private (Worker)
 */
export const updateAvailability = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { availability } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!availability || !['available', 'busy', 'unavailable'].includes(availability)) {
      res.status(400).json({
        success: false,
        message: 'Invalid availability status',
      });
      return;
    }

    const user = await workerService.updateAvailability(userId.toString(), availability);

    res.status(200).json({
      success: true,
      message: 'Availability updated successfully',
      data: user,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update availability';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
