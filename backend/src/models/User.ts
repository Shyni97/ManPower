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
 * User Document Interface
 * Extends mongoose Document with custom user properties
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
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
