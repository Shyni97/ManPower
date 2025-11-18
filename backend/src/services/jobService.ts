import Job, { IJob } from '../models/Job';
import mongoose from 'mongoose';

/**
 * Job Service
 * Business logic layer for job operations
 */

/**
 * Create a new job posting
 * @param businessId - ID of the business creating the job
 * @param jobData - Job details
 * @returns The created job document
 */
export const createJob = async (
  businessId: string,
  jobData: {
    title: string;
    description: string;
    skills: string[];
    location: string;
    urgency: 'low' | 'medium' | 'high';
  }
): Promise<IJob> => {
  const job = await Job.create({
    businessId,
    ...jobData,
  });

  return job;
};

/**
 * Get all jobs with optional filters
 * @param filters - Optional filters (location, urgency, skills)
 * @returns Array of job documents
 */
export const getAllJobs = async (filters?: {
  location?: string;
  urgency?: string;
  skills?: string;
}): Promise<IJob[]> => {
  const query: Record<string, unknown> = {};

  if (filters?.location) {
    query.location = { $regex: filters.location, $options: 'i' };
  }

  if (filters?.urgency) {
    query.urgency = filters.urgency;
  }

  if (filters?.skills) {
    query.skills = { $in: filters.skills.split(',').map((s) => s.trim()) };
  }

  const jobs = await Job.find(query)
    .populate('businessId', 'name email')
    .sort({ createdAt: -1 });

  return jobs;
};

/**
 * Get job by ID
 * @param jobId - Job's ID
 * @returns The job document
 */
export const getJobById = async (jobId: string): Promise<IJob | null> => {
  const job = await Job.findById(jobId).populate('businessId', 'name email');
  return job;
};

/**
 * Get jobs created by a specific business
 * @param businessId - Business user's ID
 * @returns Array of job documents
 */
export const getJobsByBusiness = async (
  businessId: string
): Promise<IJob[]> => {
  const jobs = await Job.find({ businessId }).sort({ createdAt: -1 });
  return jobs;
};

/**
 * Update a job posting
 * @param jobId - Job's ID
 * @param businessId - ID of the business (for authorization)
 * @param updateData - Data to update
 * @returns The updated job document
 */
export const updateJob = async (
  jobId: string,
  businessId: string,
  updateData: Partial<
    Pick<IJob, 'title' | 'description' | 'skills' | 'location' | 'urgency'>
  >
): Promise<IJob | null> => {
  // Find job and verify ownership
  const job = await Job.findOne({
    _id: jobId,
    businessId: new mongoose.Types.ObjectId(businessId),
  });

  if (!job) {
    throw new Error('Job not found or you are not authorized to update it');
  }

  // Update job
  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate('businessId', 'name email');

  return updatedJob;
};

/**
 * Delete a job posting
 * @param jobId - Job's ID
 * @param businessId - ID of the business (for authorization)
 * @returns True if deleted successfully
 */
export const deleteJob = async (
  jobId: string,
  businessId: string
): Promise<boolean> => {
  // Find job and verify ownership
  const job = await Job.findOne({
    _id: jobId,
    businessId: new mongoose.Types.ObjectId(businessId),
  });

  if (!job) {
    throw new Error('Job not found or you are not authorized to delete it');
  }

  const result = await Job.findByIdAndDelete(jobId);
  return result !== null;
};

/**
 * Search jobs by skills
 * @param skills - Array of skills to search for
 * @returns Array of matching job documents
 */
export const searchJobsBySkills = async (skills: string[]): Promise<IJob[]> => {
  const jobs = await Job.find({
    skills: { $in: skills },
  })
    .populate('businessId', 'name email')
    .sort({ createdAt: -1 });

  return jobs;
};
