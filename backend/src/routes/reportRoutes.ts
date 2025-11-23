import express from 'express';
import * as reportController from '../controllers/reportController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Report Routes
 */

// Worker reports
router.get('/worker/:id', protect, reportController.getWorkerReport);
router.get('/worker/:id/earnings', protect, reportController.getEarningsBreakdown);

// Business reports
router.get('/business/:id', protect, reportController.getBusinessReport);
router.get('/business/:id/hiring', protect, reportController.getHiringStats);

export default router;
