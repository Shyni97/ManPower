import express from 'express';
import * as ratingController from '../controllers/ratingController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Rating Routes
 */

// Create rating (Business)
router.post('/', protect, restrictTo('business'), ratingController.createRating);

// Get worker ratings
router.get('/worker/:id', ratingController.getWorkerRatings);

// Get job rating
router.get('/job/:jobId', ratingController.getJobRating);

// Add response to rating (Worker)
router.post('/:id/response', protect, restrictTo('worker'), ratingController.addResponse);

export default router;
