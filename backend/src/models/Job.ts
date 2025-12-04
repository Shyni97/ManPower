import mongoose, { Document, Schema } from 'mongoose';

/**
 * Job Document Interface
 * Extends mongoose Document with custom job properties
 */
export interface IJob extends Document {
  businessId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  skills: string[];
  jobType: 'full-time' | 'part-time' | 'contract' | 'temporary';
  location: string;
  numberOfWorkers: number;
  urgency: 'low' | 'medium' | 'high';
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  applicationDeadline?: Date;
  startDate?: Date;
  duration?: string;
  requirements?: string[];
  benefits?: string[];
  jobImage?: string;
  applicationsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Job Schema
 * Defines the structure of job documents in MongoDB
 */
const jobSchema = new Schema<IJob>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Business ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
      maxlength: [100, 'Job title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
      trim: true,
      maxlength: [2000, 'Job description cannot exceed 2000 characters'],
    },
    skills: {
      type: [String],
      required: [true, 'Please provide at least one skill'],
      validate: {
        validator: function (skills: string[]) {
          return skills.length > 0;
        },
        message: 'At least one skill is required',
      },
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'temporary'],
      default: 'full-time',
      required: [true, 'Please specify job type'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a job location'],
      trim: true,
    },
    numberOfWorkers: {
      type: Number,
      required: [true, 'Please specify number of workers needed'],
      min: [1, 'At least one worker is required'],
      default: 1,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      required: [true, 'Please specify job urgency'],
    },
    budget: {
      min: {
        type: Number,
        min: 0,
      },
      max: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: 'USD',
      },
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed', 'cancelled'],
      default: 'open',
    },
    applicationDeadline: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    duration: {
      type: String,
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    jobImage: {
      type: String,
    },
    applicationsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * Index for faster queries
 * Compound index on businessId and createdAt for efficient retrieval
 */
jobSchema.index({ businessId: 1, createdAt: -1 });
jobSchema.index({ urgency: 1 });
jobSchema.index({ location: 1 });

/**
 * Job Model
 * Export the compiled model for use in controllers and services
 */
const Job = mongoose.model<IJob>('Job', jobSchema);

export default Job;
