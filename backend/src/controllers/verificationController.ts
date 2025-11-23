import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as verificationService from '../services/verificationService';

/**
 * @route   POST /api/verification/submit
 * @desc    Submit verification documents
 * @access  Private (Worker)
 */
export const submitVerification = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id?.toString();
    const { documentType, documentNumber, idDocument, selfie, additionalDocs, expiryDate } = req.body;

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!documentType || !documentNumber || !idDocument || !selfie) {
      res.status(400).json({
        success: false,
        message: 'Document type, number, ID document, and selfie are required',
      });
      return;
    }

    const verification = await verificationService.submitVerification(workerId, {
      documentType,
      documentNumber,
      idDocument,
      selfie,
      additionalDocs,
      expiryDate,
    });

    res.status(201).json({
      success: true,
      message: 'Verification submitted successfully',
      data: verification,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit verification';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/verification/pending
 * @desc    Get pending verifications
 * @access  Private (Admin)
 */
export const getPendingVerifications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { page, limit } = req.query;

    const filters = {
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await verificationService.getPendingVerifications(filters);

    res.status(200).json({
      success: true,
      data: result.verifications,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get verifications';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/verification/approve/:id
 * @desc    Approve or reject verification
 * @access  Private (Admin)
 */
export const reviewVerification = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const adminId = req.user?._id?.toString();
    const { id } = req.params;
    const { decision, notes } = req.body;

    if (!adminId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Verification ID is required',
      });
      return;
    }

    if (!decision || !['approved', 'rejected'].includes(decision)) {
      res.status(400).json({
        success: false,
        message: 'Invalid decision',
      });
      return;
    }

    const verification = await verificationService.reviewVerification(id, adminId, decision, notes);

    res.status(200).json({
      success: true,
      message: `Verification ${decision} successfully`,
      data: verification,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to review verification';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/verification/:workerId
 * @desc    Get worker verification status
 * @access  Private
 */
export const getVerification = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { workerId } = req.params;

    if (!workerId) {
      res.status(400).json({
        success: false,
        message: 'Worker ID is required',
      });
      return;
    }

    const verification = await verificationService.getWorkerVerification(workerId);

    if (!verification) {
      res.status(404).json({
        success: false,
        message: 'Verification not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: verification,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get verification';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/verification
 * @desc    Get all verifications (Admin)
 * @access  Private (Admin)
 */
export const getAllVerifications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await verificationService.getAllVerifications(filters);

    res.status(200).json({
      success: true,
      data: result.verifications,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get verifications';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
