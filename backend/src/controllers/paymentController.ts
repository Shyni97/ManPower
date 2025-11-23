import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as paymentService from '../services/paymentService';

/**
 * @route   POST /api/payments/create
 * @desc    Create payment intent
 * @access  Private (Business)
 */
export const createPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const businessId = req.user?._id?.toString();
    const { jobId, workerId, amount } = req.body;

    if (!businessId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!jobId || !workerId || !amount) {
      res.status(400).json({
        success: false,
        message: 'Job ID, worker ID, and amount are required',
      });
      return;
    }

    const result = await paymentService.createPaymentIntent(jobId, workerId, businessId, amount);

    res.status(201).json({
      success: true,
      message: 'Payment intent created successfully',
      data: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create payment';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/payments/:id/confirm
 * @desc    Confirm payment
 * @access  Private
 */
export const confirmPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Payment ID is required',
      });
      return;
    }

    const payment = await paymentService.confirmPayment(id);

    res.status(200).json({
      success: true,
      message: 'Payment confirmed successfully',
      data: payment,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to confirm payment';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/payments/history
 * @desc    Get payment history
 * @access  Private
 */
export const getPaymentHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { status, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await paymentService.getPaymentHistory(userId, userRole, filters);

    res.status(200).json({
      success: true,
      data: result.payments,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get payment history';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/payments/withdraw
 * @desc    Request withdrawal
 * @access  Private (Worker)
 */
export const requestWithdrawal = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id?.toString();
    const { amount, method, bankDetails, paypalEmail, stripeAccountId } = req.body;

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!amount || !method) {
      res.status(400).json({
        success: false,
        message: 'Amount and method are required',
      });
      return;
    }

    const withdrawal = await paymentService.requestWithdrawal(workerId, amount, method, {
      bankDetails,
      paypalEmail,
      stripeAccountId,
    });

    res.status(201).json({
      success: true,
      message: 'Withdrawal requested successfully',
      data: withdrawal,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to request withdrawal';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/payments/withdrawals
 * @desc    Get withdrawal history
 * @access  Private (Worker)
 */
export const getWithdrawals = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id?.toString();

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { status, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await paymentService.getWithdrawalHistory(workerId, filters);

    res.status(200).json({
      success: true,
      data: result.withdrawals,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get withdrawals';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/payments/wallet
 * @desc    Get wallet balance
 * @access  Private (Worker)
 */
export const getWallet = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id?.toString();

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const wallet = await paymentService.getWalletBalance(workerId);

    res.status(200).json({
      success: true,
      data: wallet,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get wallet';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
