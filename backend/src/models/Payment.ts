import mongoose, { Document, Schema } from 'mongoose';

/**
 * Payment Document Interface
 */
export interface IPayment extends Document {
  jobId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  businessId: mongoose.Types.ObjectId;
  amount: number;
  platformCommission: number;
  platformCommissionRate: number;
  workerAmount: number;
  currency: string;
  paymentMethod: 'stripe' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  stripePaymentIntentId?: string;
  paypalOrderId?: string;
  description?: string;
  paidAt?: Date;
  refundedAt?: Date;
  refundReason?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Withdrawal Document Interface
 */
export interface IWithdrawal extends Document {
  workerId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  method: 'bank_transfer' | 'paypal' | 'stripe';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    routingNumber?: string;
    swiftCode?: string;
  };
  paypalEmail?: string;
  stripeAccountId?: string;
  transactionId?: string;
  processedAt?: Date;
  processedBy?: mongoose.Types.ObjectId;
  rejectionReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Payment Schema
 */
const paymentSchema = new Schema<IPayment>(
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
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    platformCommission: {
      type: Number,
      required: true,
      min: 0,
    },
    platformCommissionRate: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 10, // 10% platform commission
    },
    workerAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'bank_transfer'],
      required: [true, 'Payment method is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: String,
    stripePaymentIntentId: String,
    paypalOrderId: String,
    description: String,
    paidAt: Date,
    refundedAt: Date,
    refundReason: String,
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

/**
 * Withdrawal Schema
 */
const withdrawalSchema = new Schema<IWithdrawal>(
  {
    workerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Worker ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Withdrawal amount is required'],
      min: [1, 'Minimum withdrawal amount is 1'],
    },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
    },
    method: {
      type: String,
      enum: ['bank_transfer', 'paypal', 'stripe'],
      required: [true, 'Withdrawal method is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'rejected'],
      default: 'pending',
    },
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      routingNumber: String,
      swiftCode: String,
    },
    paypalEmail: String,
    stripeAccountId: String,
    transactionId: String,
    processedAt: Date,
    processedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectionReason: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
paymentSchema.index({ workerId: 1, status: 1 });
paymentSchema.index({ businessId: 1, status: 1 });
paymentSchema.index({ jobId: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });

withdrawalSchema.index({ workerId: 1, status: 1 });
withdrawalSchema.index({ status: 1, createdAt: -1 });

/**
 * Pre-save middleware to calculate platform commission and worker amount
 */
paymentSchema.pre('save', function (next) {
  if (this.isModified('amount') || this.isModified('platformCommissionRate')) {
    this.platformCommission = (this.amount * this.platformCommissionRate) / 100;
    this.workerAmount = this.amount - this.platformCommission;
  }
  next();
});

/**
 * Models
 */
export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
export const Withdrawal = mongoose.model<IWithdrawal>('Withdrawal', withdrawalSchema);
