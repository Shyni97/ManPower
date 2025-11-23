import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as applicationService from '../services/applicationService';

/**
 * @route   POST /api/applications
 * @desc    Create a new job application
 * @access  Private (Worker)
 */
export const createApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id;

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { jobId, coverLetter, proposedRate, availability, portfolio, experience } = req.body;

    if (!jobId) {
      res.status(400).json({
        success: false,
        message: 'Job ID is required',
      });
      return;
    }

    const application = await applicationService.createApplication(workerId.toString(), jobId, {
      coverLetter,
      proposedRate,
      availability,
      portfolio,
      experience,
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create application';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/applications?workerId=...
 * @desc    Get applications for a worker
 * @access  Private (Worker)
 */
export const getWorkerApplications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id;

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { status, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await applicationService.getWorkerApplications(workerId.toString(), filters);

    res.status(200).json({
      success: true,
      data: result.applications,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get applications';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/applications?jobId=...
 * @desc    Get applications for a job
 * @access  Private (Business)
 */
export const getJobApplications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const businessId = req.user?._id;
    const { jobId } = req.query;

    if (!businessId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!jobId) {
      res.status(400).json({
        success: false,
        message: 'Job ID is required',
      });
      return;
    }

    const { status, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await applicationService.getJobApplications(
      jobId as string,
      businessId.toString(),
      filters
    );

    res.status(200).json({
      success: true,
      data: result.applications,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get applications';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/applications/:id/status
 * @desc    Update application status (accept/reject)
 * @access  Private (Business)
 */
export const updateApplicationStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const businessId = req.user?._id;
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!businessId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Application ID is required',
      });
      return;
    }

    if (!status || !['reviewed', 'accepted', 'rejected'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
      return;
    }

    const application = await applicationService.updateApplicationStatus(
      id,
      businessId.toString(),
      status,
      rejectionReason
    );

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update application status';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/applications/:id/withdraw
 * @desc    Withdraw application
 * @access  Private (Worker)
 */
export const withdrawApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const workerId = req.user?._id;
    const { id } = req.params;

    if (!workerId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Application ID is required',
      });
      return;
    }

    const application = await applicationService.withdrawApplication(id, workerId.toString());

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully',
      data: application,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to withdraw application';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/applications/:id
 * @desc    Get application by ID
 * @access  Private
 */
export const getApplication = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Application ID is required',
      });
      return;
    }

    const application = await applicationService.getApplicationById(id);

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get application';
    res.status(404).json({
      success: false,
      message: errorMessage,
    });
  }
};
