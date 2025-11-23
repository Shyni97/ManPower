import express, { Response } from 'express';
import * as adminController from '../controllers/adminController';
import * as paymentService from '../services/paymentService';
import { protect, restrictTo, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Admin Routes
 * All routes require admin authentication
 */

// Apply admin protection to all routes
router.use(protect);
router.use(restrictTo('admin'));

// User management
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/role', adminController.updateRole);

// Job management
router.get('/jobs', adminController.getJobs);

// Payment management
router.get('/payments', adminController.getPayments);

// Withdrawal management
router.get('/withdrawals', adminController.getWithdrawals);

// Process withdrawal
router.put('/withdrawals/:id/process', async (req: AuthRequest, res) => {
  try {
    const adminId = req.user?._id?.toString();
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!adminId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Withdrawal ID is required',
      });
      return;
    }

    if (!status || !['completed', 'rejected'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
      return;
    }

    const withdrawal = await paymentService.processWithdrawal(id, adminId, status, rejectionReason);

    res.status(200).json({
      success: true,
      message: `Withdrawal ${status} successfully`,
      data: withdrawal,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process withdrawal';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
});

// System statistics
router.get('/stats', adminController.getStats);

// System logs
router.get('/logs', adminController.getLogs);

export default router;
