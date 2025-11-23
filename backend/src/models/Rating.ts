import mongoose, { Document, Schema } from 'mongoose';

/**
 * Rating Document Interface
 */
export interface IRating extends Document {
  jobId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  rating: number;
  review?: string;
  categories?: {
    quality: number;
    communication: number;
    punctuality: number;
    professionalism: number;
  };
  response?: {
    content: string;
    respondedAt: Date;
  };
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Rating Schema
 */
const ratingSchema = new Schema<IRating>(
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
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    review: {
      type: String,
      maxlength: [1000, 'Review cannot exceed 1000 characters'],
    },
    categories: {
      quality: {
        type: Number,
        min: 1,
        max: 5,
      },
      communication: {
        type: Number,
        min: 1,
        max: 5,
      },
      punctuality: {
        type: Number,
        min: 1,
        max: 5,
      },
      professionalism: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
    response: {
      content: String,
      respondedAt: Date,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
ratingSchema.index({ workerId: 1, createdAt: -1 });
ratingSchema.index({ businessId: 1 });
ratingSchema.index({ jobId: 1 }, { unique: true });

/**
 * Rating Model
 */
const Rating = mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
