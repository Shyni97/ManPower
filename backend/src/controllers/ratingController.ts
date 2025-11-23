import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as ratingService from '../services/ratingService';

/**
 * @route   POST /api/ratings
 * @desc    Create rating for a worker
 * @access  Private (Business)
 */
export const createRating = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const businessId = req.user?._id?.toString();
    const { jobId, workerId, rating, review, categories, isAnonymous } = req.body;

    if (!businessId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!jobId || !workerId || !rating) {
      res.status(400).json({
        success: false,
        message: 'Job ID, worker ID, and rating are required',
      });
      return;
    }

    const ratingDoc = await ratingService.createRating(jobId, workerId, businessId, {
      rating,
      review,
      categories,
      isAnonymous,
    });

    res.status(201).json({
      success: true,
      message: 'Rating created successfully',
      data: ratingDoc,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create rating';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/ratings/worker/:id
 * @desc    Get ratings for a worker
 * @access  Public
 */
export const getWorkerRatings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Worker ID is required',
      });
      return;
    }

    const filters = {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await ratingService.getWorkerRatings(id, filters);

    res.status(200).json({
      success: true,
      data: result.ratings,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get ratings';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/ratings/:id/response
 * @desc    Add response to rating
 * @access  Private (Worker)
 */
export const addResponse = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id?.toString();
    const { id } = req.params;
    const { response } = req.body;

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Rating ID is required',
      });
      return;
    }

    if (!response) {
      res.status(400).json({
        success: false,
        message: 'Response is required',
      });
      return;
    }

    const rating = await ratingService.addRatingResponse(id, workerId, response);

    res.status(200).json({
      success: true,
      message: 'Response added successfully',
      data: rating,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to add response';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/ratings/job/:jobId
 * @desc    Get rating for a specific job
 * @access  Public
 */
export const getJobRating = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      res.status(400).json({
        success: false,
        message: 'Job ID is required',
      });
      return;
    }

    const rating = await ratingService.getRatingByJobId(jobId);

    if (!rating) {
      res.status(404).json({
        success: false,
        message: 'Rating not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: rating,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get rating';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
