import express from 'express';
import * as applicationController from '../controllers/applicationController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Application Routes
 */

// Create application
router.post('/', protect, restrictTo('worker'), applicationController.createApplication);

// Get applications (worker or business based on query params)
router.get('/', protect, async (req, res) => {
  if (req.query.workerId) {
    return applicationController.getWorkerApplications(req, res);
  } else if (req.query.jobId) {
    return applicationController.getJobApplications(req, res);
  } else {
    return res.status(400).json({
      success: false,
      message: 'Either workerId or jobId is required',
    });
  }
});

// Get single application
router.get('/:id', protect, applicationController.getApplication);

// Update application status (Business)
router.put('/:id/status', protect, restrictTo('business'), applicationController.updateApplicationStatus);

// Withdraw application (Worker)
router.put('/:id/withdraw', protect, restrictTo('worker'), applicationController.withdrawApplication);

export default router;
