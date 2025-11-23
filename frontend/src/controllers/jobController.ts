/**
 * Job Controller
 * Handles job-related logic and API calls
 */

import { get, post, put, del } from '../services/api';
import {
  Job,
  CreateJobData,
  UpdateJobData,
  JobResponse,
  JobsResponse,
  JobFilters,
} from '../models/job';

/**
 * Get all jobs with optional filters
 * @param filters - Optional filters (location, urgency, skills)
 * @returns Promise with array of jobs
 */
export const getAllJobs = async (filters?: JobFilters): Promise<Job[]> => {
  try {
    const response = await get<JobsResponse>('/jobs', filters);
    return response.data || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
  }
};

/**
 * Get job by ID
 * @param jobId - Job ID
 * @returns Promise with job data
 */
export const getJobById = async (jobId: string): Promise<Job> => {
  try {
    const response = await get<JobResponse>(`/jobs/${jobId}`);
    if (response.data) {
      return response.data;
    }
    throw new Error('Job not found');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch job');
  }
};

/**
 * Create a new job posting
 * @param data - Job data
 * @returns Promise with created job
 */
export const createJob = async (data: CreateJobData): Promise<Job> => {
  try {
    const response = await post<JobResponse>('/jobs', data);
    if (response.data) {
      return response.data;
    }
    throw new Error('Failed to create job');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create job');
  }
};

/**
 * Update a job posting
 * @param jobId - Job ID
 * @param data - Updated job data
 * @returns Promise with updated job
 */
export const updateJob = async (
  jobId: string,
  data: UpdateJobData
): Promise<Job> => {
  try {
    const response = await put<JobResponse>(`/jobs/${jobId}`, data);
    if (response.data) {
      return response.data;
    }
    throw new Error('Failed to update job');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update job');
  }
};

/**
 * Delete a job posting
 * @param jobId - Job ID
 * @returns Promise with success message
 */
export const deleteJob = async (
  jobId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await del<{ success: boolean; message: string }>(
      `/jobs/${jobId}`
    );
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete job');
  }
};

/**
 * Get jobs created by the logged-in business
 * @returns Promise with array of jobs
 */
export const getMyJobs = async (): Promise<Job[]> => {
  try {
    const response = await get<JobsResponse>('/jobs/business/my-jobs');
    return response.data || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch your jobs');
  }
};

/**
 * Search jobs by skills
 * @param skills - Array of skills
 * @returns Promise with array of matching jobs
 */
export const searchJobsBySkills = async (skills: string[]): Promise<Job[]> => {
  try {
    const response = await post<JobsResponse>('/jobs/search', { skills });
    return response.data || [];
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to search jobs');
  }
};

/**
 * Get worker applications
 * @returns Promise with applications data
 */
export const getWorkerApplications = async (): Promise<any> => {
  try {
    const response = await get('/applications/worker');
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch applications');
  }
};

/**
 * Get wallet balance
 * @returns Promise with wallet data
 */
export const getWalletBalance = async (): Promise<any> => {
  try {
    const response = await get('/payments/wallet');
    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch wallet balance');
  }
};

