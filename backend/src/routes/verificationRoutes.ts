import express from 'express';
import * as verificationController from '../controllers/verificationController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Verification Routes
 */

// Submit verification (Worker)
router.post('/submit', protect, restrictTo('worker'), verificationController.submitVerification);

// Get pending verifications (Admin)
router.get('/pending', protect, restrictTo('admin'), verificationController.getPendingVerifications);

// Get all verifications (Admin)
router.get('/', protect, restrictTo('admin'), verificationController.getAllVerifications);

// Review verification - approve/reject (Admin)
router.put('/approve/:id', protect, restrictTo('admin'), verificationController.reviewVerification);

// Get worker verification
router.get('/:workerId', protect, verificationController.getVerification);

export default router;
