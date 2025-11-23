import User from '../models/User';
import Job from '../models/Job';
import { Payment, Withdrawal } from '../models/Payment';
import Application from '../models/Application';
import Rating from '../models/Rating';
import Verification from '../models/Verification';

/**
 * Admin Service
 * Handles business logic for admin operations
 */

/**
 * Get all users with filters
 */
export const getAllUsers = async (filters: {
  role?: string;
  verified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { role, verified, search, page = 1, limit = 20 } = filters;

  const query: any = {};

  if (role) {
    query.role = role;
  }

  if (typeof verified !== 'undefined') {
    query['verification.isVerified'] = verified;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get all jobs with filters
 */
export const getAllJobs = async (filters: {
  status?: string;
  urgency?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { status, urgency, search, page = 1, limit = 20 } = filters;

  const query: any = {};

  if (status) {
    query.status = status;
  }

  if (urgency) {
    query.urgency = urgency;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const jobs = await Job.find(query)
    .populate('businessId', 'name email businessProfile')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Job.countDocuments(query);

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get all payments with filters
 */
export const getAllPayments = async (filters: {
  status?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}) => {
  const { status, startDate, endDate, page = 1, limit = 20 } = filters;

  const query: any = {};

  if (status) {
    query.status = status;
  }

  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = startDate;
    }
    if (endDate) {
      query.createdAt.$lte = endDate;
    }
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

  // Calculate total amounts
  const stats = await Payment.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' },
        totalCommission: { $sum: '$platformCommission' },
        totalWorkerAmount: { $sum: '$workerAmount' },
      },
    },
  ]);

  return {
    payments,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    stats: stats[0] || {
      totalAmount: 0,
      totalCommission: 0,
      totalWorkerAmount: 0,
    },
  };
};

/**
 * Get all withdrawals
 */
export const getAllWithdrawals = async (filters: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const { status, page = 1, limit = 20 } = filters;

  const query: any = {};

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const withdrawals = await Withdrawal.find(query)
    .populate('workerId', 'name email')
    .populate('processedBy', 'name email')
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
 * Delete user (Admin only)
 */
export const deleteUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role === 'admin') {
    throw new Error('Cannot delete admin user');
  }

  await User.findByIdAndDelete(userId);

  return { message: 'User deleted successfully' };
};

/**
 * Update user role
 */
export const updateUserRole = async (userId: string, role: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.role = role as any;
  await user.save();

  return user;
};

/**
 * Get system statistics
 */
export const getSystemStats = async () => {
  const [
    totalUsers,
    totalWorkers,
    totalBusinesses,
    totalJobs,
    activeJobs,
    totalApplications,
    totalPayments,
    completedPayments,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'worker' }),
    User.countDocuments({ role: 'business' }),
    Job.countDocuments(),
    Job.countDocuments({ status: 'open' }),
    Application.countDocuments(),
    Payment.countDocuments(),
    Payment.countDocuments({ status: 'completed' }),
  ]);

  const paymentStats = await Payment.aggregate([
    { $match: { status: 'completed' } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$platformCommission' },
        totalTransactionAmount: { $sum: '$amount' },
      },
    },
  ]);

  const recentUsers = await User.find()
    .select('-password')
    .sort({ createdAt: -1 })
    .limit(5);

  const recentJobs = await Job.find()
    .populate('businessId', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    stats: {
      totalUsers,
      totalWorkers,
      totalBusinesses,
      totalJobs,
      activeJobs,
      totalApplications,
      totalPayments,
      completedPayments,
      platformRevenue: paymentStats[0]?.totalRevenue || 0,
      totalTransactionVolume: paymentStats[0]?.totalTransactionAmount || 0,
    },
    recentActivity: {
      recentUsers,
      recentJobs,
    },
  };
};

/**
 * Get system logs (placeholder)
 */
export const getSystemLogs = async (filters: {
  type?: string;
  page?: number;
  limit?: number;
}) => {
  // This would typically integrate with a logging system
  // For now, we'll return placeholder data
  return {
    logs: [],
    pagination: {
      page: filters.page || 1,
      limit: filters.limit || 20,
      total: 0,
      pages: 0,
    },
  };
};
