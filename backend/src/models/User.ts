import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User role enumeration
 * Defines the three types of users in the ManPower system
 */
export enum UserRole {
  WORKER = 'worker',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

/**
 * Worker Profile Interface
 */
export interface IWorkerProfile {
  skills: string[];
  experience: string;
  availability: 'available' | 'busy' | 'unavailable';
  phoneNumber?: string;
  address?: string;
  portfolio?: string;
  bio?: string;
  hourlyRate?: number;
}

/**
 * Business Profile Interface
 */
export interface IBusinessProfile {
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
}

/**
 * Verification Status Interface
 */
export interface IVerification {
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'not_submitted';
  documents?: {
    idDocument?: string;
    selfie?: string;
  };
  verifiedAt?: Date;
  verifiedBy?: mongoose.Types.ObjectId;
}

/**
 * Wallet Interface
 */
export interface IWallet {
  balance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalWithdrawals: number;
}

/**
 * User Document Interface
 * Extends mongoose Document with custom user properties
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileImage?: string;
  
  // Worker-specific fields
  workerProfile?: IWorkerProfile;
  
  // Business-specific fields
  businessProfile?: IBusinessProfile;
  
  // Verification
  verification: IVerification;
  
  // Wallet (for workers)
  wallet?: IWallet;
  
  // Rating
  rating: {
    average: number;
    count: number;
  };
  
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

/**
 * User Schema
 * Defines the structure of user documents in MongoDB
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default in queries
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.WORKER,
      required: [true, 'Please specify a user role'],
    },
    profileImage: {
      type: String,
    },
    workerProfile: {
      skills: {
        type: [String],
        default: [],
      },
      experience: {
        type: String,
        default: '',
      },
      availability: {
        type: String,
        enum: ['available', 'busy', 'unavailable'],
        default: 'available',
      },
      phoneNumber: String,
      address: String,
      portfolio: String,
      bio: String,
      hourlyRate: {
        type: Number,
        min: 0,
      },
    },
    businessProfile: {
      companyName: String,
      companySize: String,
      industry: String,
      website: String,
      phoneNumber: String,
      address: String,
      description: String,
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'not_submitted'],
        default: 'not_submitted',
      },
      documents: {
        idDocument: String,
        selfie: String,
      },
      verifiedAt: Date,
      verifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    wallet: {
      balance: {
        type: Number,
        default: 0,
        min: 0,
      },
      pendingBalance: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
        min: 0,
      },
      totalWithdrawals: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * Pre-save middleware to hash password before saving to database
 * Only hashes if password is modified or new
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

/**
 * Method to compare entered password with hashed password in database
 * @param enteredPassword - Plain text password to compare
 * @returns Promise<boolean> - True if passwords match, false otherwise
 */
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * User Model
 * Export the compiled model for use in controllers and services
 */
const User = mongoose.model<IUser>('User', userSchema);

export default User;
