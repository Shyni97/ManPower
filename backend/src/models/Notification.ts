import mongoose, { Document, Schema } from 'mongoose';

/**
 * Notification Document Interface
 */
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'job_post' | 'application' | 'payment' | 'chat' | 'rating' | 'verification' | 'system';
  title: string;
  message: string;
  relatedId?: mongoose.Types.ObjectId; // ID of related job, application, etc.
  relatedModel?: string; // Model name (Job, Application, etc.)
  isRead: boolean;
  readAt?: Date;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Notification Schema
 */
const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    type: {
      type: String,
      enum: ['job_post', 'application', 'payment', 'chat', 'rating', 'verification', 'system'],
      required: [true, 'Notification type is required'],
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    relatedId: {
      type: Schema.Types.ObjectId,
    },
    relatedModel: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    actionUrl: {
      type: String,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });

/**
 * Notification Model
 */
const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;
