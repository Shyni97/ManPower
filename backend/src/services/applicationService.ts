import Application, { IApplication } from '../models/Application';
import Job from '../models/Job';
import User from '../models/User';
import mongoose from 'mongoose';

/**
 * Application Service
 * Handles business logic for job applications
 */

/**
 * Create a new application
 */
export const createApplication = async (
  workerId: string,
  jobId: string,
  applicationData: {
    coverLetter?: string;
    proposedRate?: number;
    availability?: string;
    portfolio?: string[];
    experience?: string;
  }
) => {
  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.status !== 'open') {
    throw new Error('This job is no longer accepting applications');
  }

  // Check if worker exists
  const worker = await User.findById(workerId);
  if (!worker || worker.role !== 'worker') {
    throw new Error('Worker not found');
  }

  // Check if application already exists
  const existingApplication = await Application.findOne({
    workerId,
    jobId,
  });

  if (existingApplication) {
    throw new Error('You have already applied for this job');
  }

  // Create application
  const application = await Application.create({
    jobId,
    workerId,
    businessId: job.businessId,
    ...applicationData,
  });

  // Increment applications count on job
  await Job.findByIdAndUpdate(jobId, {
    $inc: { applicationsCount: 1 },
  });

  return application.populate(['jobId', 'workerId', 'businessId']);
};

/**
 * Get applications for a worker
 */
export const getWorkerApplications = async (
  workerId: string,
  filters: {
    status?: string;
    page?: number;
    limit?: number;
  }
) => {
  const { status, page = 1, limit = 10 } = filters;

  const query: any = { workerId };
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const applications = await Application.find(query)
    .populate('jobId')
    .populate('businessId', 'name email businessProfile')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Application.countDocuments(query);

  return {
    applications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get applications for a job
 */
export const getJobApplications = async (
  jobId: string,
  businessId: string,
  filters: {
    status?: string;
    page?: number;
    limit?: number;
  }
) => {
  // Verify job belongs to business
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  if (job.businessId.toString() !== businessId) {
    throw new Error('Unauthorized to view these applications');
  }

  const { status, page = 1, limit = 10 } = filters;

  const query: any = { jobId };
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const applications = await Application.find(query)
    .populate('workerId', 'name email workerProfile rating verification')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Application.countDocuments(query);

  return {
    applications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Update application status
 */
export const updateApplicationStatus = async (
  applicationId: string,
  businessId: string,
  status: 'reviewed' | 'accepted' | 'rejected',
  rejectionReason?: string
) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error('Application not found');
  }

  if (application.businessId.toString() !== businessId) {
    throw new Error('Unauthorized to update this application');
  }

  application.status = status;
  application.reviewedAt = new Date();
  application.reviewedBy = new mongoose.Types.ObjectId(businessId);

  if (status === 'rejected' && rejectionReason) {
    application.rejectionReason = rejectionReason;
  }

  await application.save();

  return application.populate(['jobId', 'workerId', 'businessId']);
};

/**
 * Withdraw application
 */
export const withdrawApplication = async (applicationId: string, workerId: string) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error('Application not found');
  }

  if (application.workerId.toString() !== workerId) {
    throw new Error('Unauthorized to withdraw this application');
  }

  if (application.status !== 'pending' && application.status !== 'reviewed') {
    throw new Error('Cannot withdraw application with current status');
  }

  application.status = 'withdrawn';
  await application.save();

  // Decrement applications count on job
  await Job.findByIdAndUpdate(application.jobId, {
    $inc: { applicationsCount: -1 },
  });

  return application;
};

/**
 * Get application by ID
 */
export const getApplicationById = async (applicationId: string) => {
  const application = await Application.findById(applicationId)
    .populate('jobId')
    .populate('workerId', 'name email workerProfile rating verification')
    .populate('businessId', 'name email businessProfile');

  if (!application) {
    throw new Error('Application not found');
  }

  return application;
};
