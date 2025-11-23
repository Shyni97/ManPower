import mongoose, { Document, Schema } from 'mongoose';

/**
 * Message Interface
 */
export interface IMessage {
  senderId: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
  isRead: boolean;
  readAt?: Date;
}

/**
 * Conversation Document Interface
 */
export interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  jobId?: mongoose.Types.ObjectId;
  lastMessage?: {
    content: string;
    senderId: mongoose.Types.ObjectId;
    timestamp: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Message Document Interface
 */
export interface IMessageDoc extends Document {
  conversationId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  content: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Conversation Schema
 */
const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    },
    lastMessage: {
      content: String,
      senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      timestamp: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ jobId: 1 });

/**
 * Message Schema
 */
const messageSchema = new Schema<IMessageDoc>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: [true, 'Conversation ID is required'],
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Sender ID is required'],
    },
    content: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ senderId: 1 });

/**
 * Models
 */
export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);
export const Message = mongoose.model<IMessageDoc>('Message', messageSchema);
