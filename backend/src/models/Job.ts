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
  location: string;
  urgency: 'low' | 'medium' | 'high';
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
    location: {
      type: String,
      required: [true, 'Please provide a job location'],
      trim: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      required: [true, 'Please specify job urgency'],
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
