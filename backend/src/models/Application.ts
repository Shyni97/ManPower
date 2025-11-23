import mongoose, { Document, Schema } from 'mongoose';

/**
 * Application Document Interface
 */
export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'withdrawn';
  coverLetter?: string;
  proposedRate?: number;
  availability?: string;
  portfolio?: string[];
  experience?: string;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Application Schema
 */
const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
    },
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Worker ID is required'],
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Business ID is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
    coverLetter: {
      type: String,
      maxlength: [1000, 'Cover letter cannot exceed 1000 characters'],
    },
    proposedRate: {
      type: Number,
      min: 0,
    },
    availability: {
      type: String,
    },
    portfolio: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      maxlength: [2000, 'Experience cannot exceed 2000 characters'],
    },
    reviewedAt: {
      type: Date,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
applicationSchema.index({ workerId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ workerId: 1, status: 1 });
applicationSchema.index({ businessId: 1, status: 1 });

/**
 * Application Model
 */
const Application = mongoose.model<IApplication>('Application', applicationSchema);

export default Application;
