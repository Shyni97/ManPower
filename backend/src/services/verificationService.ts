import Verification from '../models/Verification';
import User from '../models/User';

/**
 * Verification Service
 * Handles business logic for ID verification
 */

/**
 * Submit verification documents
 */
export const submitVerification = async (
  workerId: string,
  verificationData: {
    documentType: 'nic' | 'passport' | 'driver_license';
    documentNumber: string;
    idDocument: string;
    selfie: string;
    additionalDocs?: string[];
    expiryDate?: Date;
  }
) => {
  const worker = await User.findById(workerId);

  if (!worker || worker.role !== 'worker') {
    throw new Error('Worker not found');
  }

  // Check if verification already exists
  const existingVerification = await Verification.findOne({ workerId });

  if (existingVerification) {
    if (existingVerification.status === 'pending') {
      throw new Error('Verification already pending');
    }

    // Update existing verification
    existingVerification.documentType = verificationData.documentType;
    existingVerification.documentNumber = verificationData.documentNumber;
    existingVerification.documents = {
      idDocument: verificationData.idDocument,
      selfie: verificationData.selfie,
      additionalDocs: verificationData.additionalDocs || [],
    };
    existingVerification.status = 'pending';
    existingVerification.submittedAt = new Date();
    existingVerification.expiryDate = verificationData.expiryDate;
    await existingVerification.save();

    // Update user verification status
    worker.verification.verificationStatus = 'pending';
    await worker.save();

    return existingVerification;
  }

  // Create new verification
  const verification = await Verification.create({
    workerId,
    ...verificationData,
    documents: {
      idDocument: verificationData.idDocument,
      selfie: verificationData.selfie,
      additionalDocs: verificationData.additionalDocs || [],
    },
  });

  // Update user verification status
  worker.verification.verificationStatus = 'pending';
  await worker.save();

  return verification;
};

/**
 * Get pending verifications (Admin)
 */
export const getPendingVerifications = async (filters: {
  page?: number;
  limit?: number;
}) => {
  const { page = 1, limit = 10 } = filters;

  const skip = (page - 1) * limit;

  const verifications = await Verification.find({ status: 'pending' })
    .populate('workerId', 'name email workerProfile')
    .sort({ submittedAt: 1 })
    .skip(skip)
    .limit(limit);

  const total = await Verification.countDocuments({ status: 'pending' });

  return {
    verifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Approve or reject verification (Admin)
 */
export const reviewVerification = async (
  verificationId: string,
  adminId: string,
  decision: 'approved' | 'rejected',
  notes?: string
) => {
  const verification = await Verification.findById(verificationId);

  if (!verification) {
    throw new Error('Verification not found');
  }

  if (verification.status !== 'pending') {
    throw new Error('Verification already reviewed');
  }

  verification.status = decision;
  verification.reviewedAt = new Date();
  verification.reviewedBy = adminId as any;
  if (notes) {
    verification.notes = notes;
    if (decision === 'rejected') {
      verification.rejectionReason = notes;
    }
  }

  await verification.save();

  // Update user verification
  const worker = await User.findById(verification.workerId);
  if (worker) {
    worker.verification.verificationStatus = decision;
    worker.verification.isVerified = decision === 'approved';

    if (decision === 'approved') {
      worker.verification.verifiedAt = new Date();
      worker.verification.verifiedBy = adminId as any;
      worker.verification.documents = {
        idDocument: verification.documents.idDocument,
        selfie: verification.documents.selfie,
      };
    }

    await worker.save();
  }

  return verification.populate('workerId', 'name email');
};

/**
 * Get worker verification status
 */
export const getWorkerVerification = async (workerId: string) => {
  const verification = await Verification.findOne({ workerId }).populate(
    'reviewedBy',
    'name email'
  );

  return verification;
};

/**
 * Get all verifications (Admin)
 */
export const getAllVerifications = async (filters: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const { status, page = 1, limit = 10 } = filters;

  const query: any = {};
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const verifications = await Verification.find(query)
    .populate('workerId', 'name email workerProfile')
    .populate('reviewedBy', 'name email')
    .sort({ submittedAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Verification.countDocuments(query);

  return {
    verifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};
