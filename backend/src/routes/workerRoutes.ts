import express from 'express';
import * as workerController from '../controllers/workerController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Worker Profile Routes
 */

// Update worker profile
router.put('/profile', protect, restrictTo('worker'), workerController.updateProfile);

// Get worker profile by ID
router.get('/profile/:id', workerController.getProfile);

// Search workers
router.get('/search', workerController.searchWorkers);

// Update availability
router.put('/availability', protect, restrictTo('worker'), workerController.updateAvailability);

export default router;
