import User, { IUser, UserRole } from '../models/User';

/**
 * User Service
 * Business logic layer for user operations
 */

/**
 * Create a new user
 * @param name - User's full name
 * @param email - User's email address
 * @param password - User's password (will be hashed)
 * @param role - User's role (worker, business, admin)
 * @returns The created user document
 */
export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: UserRole = UserRole.WORKER
): Promise<IUser> => {
  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists with this email');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return user;
};

/**
 * Find user by email and validate password
 * @param email - User's email address
 * @param password - Password to validate
 * @returns The user document if credentials are valid
 */
export const authenticateUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  // Find user by email (include password field)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if password matches
  const isPasswordMatch = await user.matchPassword(password);

  if (!isPasswordMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

/**
 * Get user by ID
 * @param userId - User's ID
 * @returns The user document
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  const user = await User.findById(userId).select('-password');
  return user;
};

/**
 * Get all users (Admin only)
 * @returns Array of all user documents
 */
export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({}).select('-password');
  return users;
};

/**
 * Update user profile
 * @param userId - User's ID
 * @param updateData - Data to update
 * @returns The updated user document
 */
export const updateUser = async (
  userId: string,
  updateData: Partial<Pick<IUser, 'name' | 'email'>>
): Promise<IUser | null> => {
  // Don't allow password or role updates through this service
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');

  return user;
};

/**
 * Delete user
 * @param userId - User's ID
 * @returns True if deleted successfully
 */
export const deleteUser = async (userId: string): Promise<boolean> => {
  const result = await User.findByIdAndDelete(userId);
  return result !== null;
};
