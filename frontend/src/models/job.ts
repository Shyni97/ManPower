/**
 * Job Model - TypeScript Interfaces
 * Defines the structure of job data in the ManPower application
 */

/**
 * Job urgency levels
 */
export enum JobUrgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Business Information (populated from User)
 */
export interface BusinessInfo {
  _id: string;
  name: string;
  email: string;
}

/**
 * Job Interface
 * Represents a job posting in the system
 */
export interface Job {
  _id: string;
  businessId: string | BusinessInfo;
  title: string;
  description: string;
  skills: string[];
  location: string;
  urgency: JobUrgency;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create Job Request Data
 */
export interface CreateJobData {
  title: string;
  description: string;
  skills: string[];
  location: string;
  urgency: JobUrgency;
}

/**
 * Update Job Request Data
 */
export interface UpdateJobData {
  title?: string;
  description?: string;
  skills?: string[];
  location?: string;
  urgency?: JobUrgency;
}

/**
 * Job Response Data
 */
export interface JobResponse {
  success: boolean;
  message?: string;
  data?: Job;
  count?: number;
}

/**
 * Jobs List Response
 */
export interface JobsResponse {
  success: boolean;
  count: number;
  data: Job[];
}

/**
 * Job Filter Query Parameters
 */
export interface JobFilters {
  location?: string;
  urgency?: JobUrgency;
  skills?: string;
}
