import mongoose, { Document, Schema } from 'mongoose';

/**
 * Verification Document Interface
 */
export interface IVerificationDoc extends Document {
  workerId: mongoose.Types.ObjectId;
  documentType: 'nic' | 'passport' | 'driver_license';
  documentNumber: string;
  documents: {
    idDocument: string; // URL or path to ID document
    selfie: string; // URL or path to selfie
    additionalDocs?: string[];
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  rejectionReason?: string;
  notes?: string;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Verification Schema
 */
const verificationSchema = new Schema<IVerificationDoc>(
  {
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Worker ID is required'],
      unique: true,
    },
    documentType: {
      type: String,
      enum: ['nic', 'passport', 'driver_license'],
      required: [true, 'Document type is required'],
    },
    documentNumber: {
      type: String,
      required: [true, 'Document number is required'],
      trim: true,
    },
    documents: {
      idDocument: {
        type: String,
        required: [true, 'ID document is required'],
      },
      selfie: {
        type: String,
        required: [true, 'Selfie is required'],
      },
      additionalDocs: {
        type: [String],
        default: [],
      },
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
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
    notes: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
verificationSchema.index({ status: 1, submittedAt: -1 });
verificationSchema.index({ workerId: 1 });

/**
 * Verification Model
 */
const Verification = mongoose.model<IVerificationDoc>('Verification', verificationSchema);

export default Verification;
