import User from '../models/User';
import { IWorkerProfile } from '../models/User';

/**
 * Worker Profile Service
 * Handles business logic for worker profiles
 */

/**
 * Update worker profile
 */
export const updateWorkerProfile = async (
  userId: string,
  profileData: Partial<IWorkerProfile>
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== 'worker') {
    throw new Error('Only workers can update worker profile');
  }

  // Update worker profile
  if (!user.workerProfile) {
    user.workerProfile = {
      skills: [],
      experience: '',
      availability: 'available',
    };
  }
  
  user.workerProfile = {
    ...user.workerProfile,
    ...profileData,
  } as any;

  await user.save();

  return user;
};

/**
 * Get worker profile
 */
export const getWorkerProfile = async (workerId: string) => {
  const worker = await User.findById(workerId).select('-password');

  if (!worker) {
    throw new Error('Worker not found');
  }

  if (worker.role !== 'worker') {
    throw new Error('User is not a worker');
  }

  return worker;
};

/**
 * Search workers by skills
 */
export const searchWorkers = async (filters: {
  skills?: string[];
  availability?: string;
  minRating?: number;
  location?: string;
  maxRate?: number;
  page?: number;
  limit?: number;
}) => {
  const { skills, availability, minRating, location, maxRate, page = 1, limit = 10 } = filters;

  const query: any = { role: 'worker' };

  if (skills && skills.length > 0) {
    query['workerProfile.skills'] = { $in: skills };
  }

  if (availability) {
    query['workerProfile.availability'] = availability;
  }

  if (minRating) {
    query['rating.average'] = { $gte: minRating };
  }

  if (location) {
    query['workerProfile.address'] = { $regex: location, $options: 'i' };
  }

  if (maxRate) {
    query['workerProfile.hourlyRate'] = { $lte: maxRate };
  }

  const skip = (page - 1) * limit;

  const workers = await User.find(query)
    .select('-password')
    .sort({ 'rating.average': -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  return {
    workers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Update worker availability
 */
export const updateAvailability = async (
  userId: string,
  availability: 'available' | 'busy' | 'unavailable'
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== 'worker') {
    throw new Error('Only workers can update availability');
  }

  if (!user.workerProfile) {
    user.workerProfile = {
      skills: [],
      experience: '',
      availability: 'available',
    };
  }

  user.workerProfile.availability = availability;
  await user.save();

  return user;
};
