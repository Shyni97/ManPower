import express from 'express';
import * as paymentController from '../controllers/paymentController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Payment Routes
 */

// Create payment intent (Business)
router.post('/create', protect, restrictTo('business'), paymentController.createPayment);

// Confirm payment
router.post('/:id/confirm', protect, paymentController.confirmPayment);

// Get payment history
router.get('/history', protect, paymentController.getPaymentHistory);

// Request withdrawal (Worker)
router.post('/withdraw', protect, restrictTo('worker'), paymentController.requestWithdrawal);

// Get withdrawal history (Worker)
router.get('/withdrawals', protect, restrictTo('worker'), paymentController.getWithdrawals);

// Get wallet balance (Worker)
router.get('/wallet', protect, restrictTo('worker'), paymentController.getWallet);

export default router;
