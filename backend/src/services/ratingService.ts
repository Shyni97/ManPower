import Rating from '../models/Rating';
import User from '../models/User';
import Job from '../models/Job';

/**
 * Rating Service
 * Handles business logic for ratings and reviews
 */

/**
 * Create rating
 */
export const createRating = async (
  jobId: string,
  workerId: string,
  businessId: string,
  ratingData: {
    rating: number;
    review?: string;
    categories?: {
      quality?: number;
      communication?: number;
      punctuality?: number;
      professionalism?: number;
    };
    isAnonymous?: boolean;
  }
) => {
  // Check if rating already exists
  const existingRating = await Rating.findOne({ jobId });
  if (existingRating) {
    throw new Error('Rating already exists for this job');
  }

  // Verify job, worker, and business
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }

  const worker = await User.findById(workerId);
  if (!worker) {
    throw new Error('Worker not found');
  }

  // Create rating
  const rating = await Rating.create({
    jobId,
    workerId,
    businessId,
    ...ratingData,
  });

  // Update worker's rating
  await updateWorkerRating(workerId);

  return rating.populate(['jobId', 'businessId']);
};

/**
 * Update worker's average rating
 */
const updateWorkerRating = async (workerId: string) => {
  const ratings = await Rating.find({ workerId });

  if (ratings.length === 0) {
    return;
  }

  const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const average = total / ratings.length;

  await User.findByIdAndUpdate(workerId, {
    'rating.average': parseFloat(average.toFixed(2)),
    'rating.count': ratings.length,
  });
};

/**
 * Get worker ratings
 */
export const getWorkerRatings = async (
  workerId: string,
  filters: { page?: number; limit?: number }
) => {
  const { page = 1, limit = 10 } = filters;

  const skip = (page - 1) * limit;

  const ratings = await Rating.find({ workerId })
    .populate('jobId', 'title')
    .populate('businessId', 'name businessProfile')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Rating.countDocuments({ workerId });

  return {
    ratings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Add response to rating
 */
export const addRatingResponse = async (
  ratingId: string,
  workerId: string,
  responseContent: string
) => {
  const rating = await Rating.findById(ratingId);

  if (!rating) {
    throw new Error('Rating not found');
  }

  if (rating.workerId.toString() !== workerId) {
    throw new Error('Unauthorized to respond to this rating');
  }

  if (rating.response) {
    throw new Error('Response already exists');
  }

  rating.response = {
    content: responseContent,
    respondedAt: new Date(),
  };

  await rating.save();

  return rating;
};

/**
 * Get rating by job ID
 */
export const getRatingByJobId = async (jobId: string) => {
  const rating = await Rating.findOne({ jobId })
    .populate('jobId', 'title')
    .populate('workerId', 'name workerProfile')
    .populate('businessId', 'name businessProfile');

  return rating;
};
