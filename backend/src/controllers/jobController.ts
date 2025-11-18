import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import * as jobService from '../services/jobService';

/**
 * Job Controller
 * Handles job-related requests (create, read, update, delete)
 */

/**
 * @route   POST /api/jobs
 * @desc    Create a new job posting
 * @access  Private/Business
 */
export const createJob = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const { title, description, skills, location, urgency } = req.body;

    // Validate required fields
    if (!title || !description || !skills || !location) {
      res.status(400).json({
        success: false,
        message: 'Please provide title, description, skills, and location',
      });
      return;
    }

    // Create job through service layer
    const job = await jobService.createJob(req.user._id.toString(), {
      title,
      description,
      skills: Array.isArray(skills) ? skills : [skills],
      location,
      urgency: urgency || 'medium',
    });

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create job';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs with optional filters
 * @access  Public
 */
export const getAllJobs = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { location, urgency, skills } = req.query;

    const jobs = await jobService.getAllJobs({
      location: location as string | undefined,
      urgency: urgency as string | undefined,
      skills: skills as string | undefined,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch jobs';
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/jobs/:id
 * @desc    Get job by ID
 * @access  Public
 */
export const getJobById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const job = await jobService.getJobById(req.params.id);

    if (!job) {
      res.status(404).json({
        success: false,
        message: 'Job not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch job';
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/jobs/business/my-jobs
 * @desc    Get jobs created by the logged-in business
 * @access  Private/Business
 */
export const getMyJobs = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const jobs = await jobService.getJobsByBusiness(req.user._id.toString());

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch jobs';
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job posting
 * @access  Private/Business (Owner only)
 */
export const updateJob = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const { title, description, skills, location, urgency } = req.body;

    const updatedJob = await jobService.updateJob(
      req.params.id,
      req.user._id.toString(),
      {
        title,
        description,
        skills: skills ? (Array.isArray(skills) ? skills : [skills]) : undefined,
        location,
        urgency,
      }
    );

    if (!updatedJob) {
      res.status(404).json({
        success: false,
        message: 'Job not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update job';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job posting
 * @access  Private/Business (Owner only)
 */
export const deleteJob = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const deleted = await jobService.deleteJob(
      req.params.id,
      req.user._id.toString()
    );

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Job not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete job';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/jobs/search
 * @desc    Search jobs by skills
 * @access  Public
 */
export const searchJobsBySkills = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Please provide an array of skills to search',
      });
      return;
    }

    const jobs = await jobService.searchJobsBySkills(skills);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to search jobs';
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};
