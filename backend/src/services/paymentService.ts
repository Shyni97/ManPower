import { Payment, Withdrawal } from '../models/Payment';
import User from '../models/User';
import Job from '../models/Job';
import Stripe from 'stripe';

// Initialize Stripe only if API key is provided
let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-11-17.clover',
  });
} else {
  console.warn('⚠️  STRIPE_SECRET_KEY not found. Payment features will be disabled.');
}

/**
 * Payment Service
 * Handles business logic for payments and withdrawals
 */

/**
 * Create payment intent
 */
export const createPaymentIntent = async (
  jobId: string,
  workerId: string,
  businessId: string,
  amount: number
) => {
  // Verify job and parties
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  const worker = await User.findById(workerId);
  const business = await User.findById(businessId);

  if (!worker || !business) {
    throw new Error('Worker or business not found');
  }

  // Check if Stripe is configured
  if (!stripe) {
    throw new Error('Payment system is not configured. Please add STRIPE_SECRET_KEY to environment variables.');
  }

  // Create payment intent with Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'usd',
    metadata: {
      jobId,
      workerId,
      businessId,
    },
  });

  // Create payment record
  const payment = await Payment.create({
    jobId,
    workerId,
    businessId,
    amount,
    platformCommissionRate: 10, // 10% commission
    currency: 'USD',
    paymentMethod: 'stripe',
    status: 'pending',
    stripePaymentIntentId: paymentIntent.id,
    description: `Payment for job: ${job.title}`,
  });

  return {
    payment,
    clientSecret: paymentIntent.client_secret,
  };
};

/**
 * Confirm payment
 */
export const confirmPayment = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new Error('Payment not found');
  }

  if (payment.status === 'completed') {
    throw new Error('Payment already completed');
  }

  // Update payment status
  payment.status = 'completed';
  payment.paidAt = new Date();
  await payment.save();

  // Update worker wallet
  const worker = await User.findById(payment.workerId);
  if (worker) {
    if (!worker.wallet) {
      worker.wallet = {
        balance: 0,
        pendingBalance: 0,
        totalEarnings: 0,
        totalWithdrawals: 0,
      };
    }

    worker.wallet.balance += payment.workerAmount;
    worker.wallet.totalEarnings += payment.workerAmount;
    await worker.save();
  }

  return payment;
};

/**
 * Get payment history
 */
export const getPaymentHistory = async (
  userId: string,
  userRole: string,
  filters: { status?: string; page?: number; limit?: number }
) => {
  const { status, page = 1, limit = 10 } = filters;

  const query: any = {};
  
  if (userRole === 'worker') {
    query.workerId = userId;
  } else if (userRole === 'business') {
    query.businessId = userId;
  } else {
    throw new Error('Invalid user role for payment history');
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const payments = await Payment.find(query)
    .populate('jobId', 'title')
    .populate('workerId', 'name email')
    .populate('businessId', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Payment.countDocuments(query);

  return {
    payments,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Request withdrawal
 */
export const requestWithdrawal = async (
  workerId: string,
  amount: number,
  method: 'bank_transfer' | 'paypal' | 'stripe',
  details: {
    bankDetails?: any;
    paypalEmail?: string;
    stripeAccountId?: string;
  }
) => {
  const worker = await User.findById(workerId);

  if (!worker || worker.role !== 'worker') {
    throw new Error('Worker not found');
  }

  if (!worker.wallet || worker.wallet.balance < amount) {
    throw new Error('Insufficient balance');
  }

  // Minimum withdrawal amount
  if (amount < 10) {
    throw new Error('Minimum withdrawal amount is $10');
  }

  // Create withdrawal request
  const withdrawal = await Withdrawal.create({
    workerId,
    amount,
    method,
    ...details,
  });

  // Deduct from available balance and add to pending
  worker.wallet.balance -= amount;
  worker.wallet.pendingBalance += amount;
  await worker.save();

  return withdrawal;
};

/**
 * Process withdrawal (Admin)
 */
export const processWithdrawal = async (
  withdrawalId: string,
  adminId: string,
  status: 'completed' | 'rejected',
  rejectionReason?: string
) => {
  const withdrawal = await Withdrawal.findById(withdrawalId);

  if (!withdrawal) {
    throw new Error('Withdrawal not found');
  }

  if (withdrawal.status !== 'pending') {
    throw new Error('Withdrawal already processed');
  }

  const worker = await User.findById(withdrawal.workerId);

  if (!worker || !worker.wallet) {
    throw new Error('Worker not found');
  }

  withdrawal.status = status;
  withdrawal.processedAt = new Date();
  withdrawal.processedBy = adminId as any;

  if (status === 'completed') {
    // Deduct from pending balance
    worker.wallet.pendingBalance -= withdrawal.amount;
    worker.wallet.totalWithdrawals += withdrawal.amount;

    // Here you would integrate with actual payment provider (Stripe, PayPal, etc.)
    withdrawal.transactionId = `TXN-${Date.now()}`;
  } else if (status === 'rejected') {
    // Return to available balance
    worker.wallet.pendingBalance -= withdrawal.amount;
    worker.wallet.balance += withdrawal.amount;
    withdrawal.rejectionReason = rejectionReason;
  }

  await withdrawal.save();
  await worker.save();

  return withdrawal;
};

/**
 * Get withdrawal history
 */
export const getWithdrawalHistory = async (
  workerId: string,
  filters: { status?: string; page?: number; limit?: number }
) => {
  const { status, page = 1, limit = 10 } = filters;

  const query: any = { workerId };
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const withdrawals = await Withdrawal.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Withdrawal.countDocuments(query);

  return {
    withdrawals,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get wallet balance
 */
export const getWalletBalance = async (workerId: string) => {
  const worker = await User.findById(workerId).select('wallet');

  if (!worker) {
    throw new Error('Worker not found');
  }

  return worker.wallet || {
    balance: 0,
    pendingBalance: 0,
    totalEarnings: 0,
    totalWithdrawals: 0,
  };
};
