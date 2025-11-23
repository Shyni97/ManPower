import User from '../models/User';
import Job from '../models/Job';
import Application from '../models/Application';
import { Payment } from '../models/Payment';

/**
 * Reporting Service
 * Handles business logic for generating reports
 */

/**
 * Get worker report
 */
export const getWorkerReport = async (workerId: string, dateRange?: { start: Date; end: Date }) => {
  const worker = await User.findById(workerId);

  if (!worker || worker.role !== 'worker') {
    throw new Error('Worker not found');
  }

  const query: any = { workerId };

  if (dateRange) {
    query.createdAt = {
      $gte: dateRange.start,
      $lte: dateRange.end,
    };
  }

  // Get applications
  const [applications, payments, acceptedApplications, rejectedApplications] = await Promise.all([
    Application.find(query).populate('jobId', 'title'),
    Payment.find({ workerId, status: 'completed' }).populate('jobId', 'title'),
    Application.countDocuments({ ...query, status: 'accepted' }),
    Application.countDocuments({ ...query, status: 'rejected' }),
  ]);

  const totalApplications = applications.length;
  const totalEarnings = payments.reduce((sum, payment) => sum + payment.workerAmount, 0);
  const completedJobs = payments.length;

  return {
    worker: {
      id: worker._id,
      name: worker.name,
      email: worker.email,
      rating: worker.rating,
      verification: worker.verification,
    },
    summary: {
      totalApplications,
      acceptedApplications,
      rejectedApplications,
      completedJobs,
      totalEarnings,
      averageEarningPerJob: completedJobs > 0 ? totalEarnings / completedJobs : 0,
    },
    applications,
    payments,
  };
};

/**
 * Get business report
 */
export const getBusinessReport = async (businessId: string, dateRange?: { start: Date; end: Date }) => {
  const business = await User.findById(businessId);

  if (!business || business.role !== 'business') {
    throw new Error('Business not found');
  }

  const query: any = { businessId };

  if (dateRange) {
    query.createdAt = {
      $gte: dateRange.start,
      $lte: dateRange.end,
    };
  }

  // Get jobs and applications
  const [jobs, applications, payments] = await Promise.all([
    Job.find(query),
    Application.find(query).populate('workerId', 'name email rating'),
    Payment.find({ businessId, status: 'completed' }).populate('workerId', 'name'),
  ]);

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === 'open').length;
  const completedJobs = jobs.filter((job) => job.status === 'completed').length;
  const totalApplications = applications.length;
  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return {
    business: {
      id: business._id,
      name: business.name,
      email: business.email,
      businessProfile: business.businessProfile,
    },
    summary: {
      totalJobs,
      activeJobs,
      completedJobs,
      totalApplications,
      totalSpent,
      averageSpentPerJob: completedJobs > 0 ? totalSpent / completedJobs : 0,
    },
    jobs,
    applications,
    payments,
  };
};

/**
 * Get earnings breakdown for worker
 */
export const getEarningsBreakdown = async (
  workerId: string,
  period: 'week' | 'month' | 'year'
) => {
  const worker = await User.findById(workerId);

  if (!worker || worker.role !== 'worker') {
    throw new Error('Worker not found');
  }

  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'year':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
  }

  const payments = await Payment.find({
    workerId,
    status: 'completed',
    paidAt: { $gte: startDate, $lte: now },
  })
    .populate('jobId', 'title')
    .sort({ paidAt: 1 });

  const totalEarnings = payments.reduce((sum, payment) => sum + payment.workerAmount, 0);
  const totalCommission = payments.reduce((sum, payment) => sum + payment.platformCommission, 0);

  // Group by date
  const earningsByDate = payments.reduce((acc: any, payment) => {
    const date = payment.paidAt?.toISOString().split('T')[0];
    if (date) {
      if (!acc[date]) {
        acc[date] = {
          date,
          earnings: 0,
          commission: 0,
          jobCount: 0,
        };
      }
      acc[date].earnings += payment.workerAmount;
      acc[date].commission += payment.platformCommission;
      acc[date].jobCount += 1;
    }
    return acc;
  }, {});

  return {
    period,
    summary: {
      totalEarnings,
      totalCommission,
      jobCount: payments.length,
      averageEarningPerJob: payments.length > 0 ? totalEarnings / payments.length : 0,
    },
    earningsByDate: Object.values(earningsByDate),
    payments,
  };
};

/**
 * Get hiring statistics for business
 */
export const getHiringStats = async (businessId: string, period: 'week' | 'month' | 'year') => {
  const business = await User.findById(businessId);

  if (!business || business.role !== 'business') {
    throw new Error('Business not found');
  }

  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'year':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
  }

  const [jobs, applications, payments] = await Promise.all([
    Job.find({
      businessId,
      createdAt: { $gte: startDate, $lte: now },
    }),
    Application.find({
      businessId,
      createdAt: { $gte: startDate, $lte: now },
    }),
    Payment.find({
      businessId,
      status: 'completed',
      paidAt: { $gte: startDate, $lte: now },
    }),
  ]);

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const averageApplicationsPerJob = jobs.length > 0 ? applications.length / jobs.length : 0;

  return {
    period,
    summary: {
      jobsPosted: jobs.length,
      totalApplications: applications.length,
      hiredWorkers: payments.length,
      totalSpent,
      averageApplicationsPerJob,
      averageSpentPerWorker: payments.length > 0 ? totalSpent / payments.length : 0,
    },
    jobs,
    applications: applications.slice(0, 10), // Limit to recent 10
    payments,
  };
};
