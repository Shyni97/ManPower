import express from 'express';
import * as jobController from '../controllers/jobController';
import { protect, authorize } from '../middleware/authMiddleware';
import { UserRole } from '../models/User';

const router = express.Router();

/**
 * Job Routes
 * All routes related to job management
 */

// @route   POST /api/jobs
// @desc    Create a new job posting
// @access  Private/Business
router.post('/', protect, authorize(UserRole.BUSINESS, UserRole.ADMIN), jobController.createJob);

// @route   GET /api/jobs
// @desc    Get all jobs with optional filters
// @access  Public
router.get('/', jobController.getAllJobs);

// @route   POST /api/jobs/search
// @desc    Search jobs by skills
// @access  Public
router.post('/search', jobController.searchJobsBySkills);

// @route   GET /api/jobs/business/my-jobs
// @desc    Get jobs created by the logged-in business
// @access  Private/Business
router.get('/business/my-jobs', protect, authorize(UserRole.BUSINESS, UserRole.ADMIN), jobController.getMyJobs);

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', jobController.getJobById);

// @route   PUT /api/jobs/:id
// @desc    Update a job posting
// @access  Private/Business (Owner only)
router.put('/:id', protect, authorize(UserRole.BUSINESS, UserRole.ADMIN), jobController.updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job posting
// @access  Private/Business (Owner only)
router.delete('/:id', protect, authorize(UserRole.BUSINESS, UserRole.ADMIN), jobController.deleteJob);

export default router;
