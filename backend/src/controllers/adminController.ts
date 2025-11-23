import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as adminService from '../services/adminService';

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
export const getUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { role, verified, search, page, limit } = req.query;

    const filters = {
      role: role as string | undefined,
      verified: verified === 'true' ? true : verified === 'false' ? false : undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await adminService.getAllUsers(filters);

    res.status(200).json({
      success: true,
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get users';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/admin/jobs
 * @desc    Get all jobs
 * @access  Private (Admin)
 */
export const getJobs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status, urgency, search, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      urgency: urgency as string | undefined,
      search: search as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await adminService.getAllJobs(filters);

    res.status(200).json({
      success: true,
      data: result.jobs,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get jobs';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/admin/payments
 * @desc    Get all payments
 * @access  Private (Admin)
 */
export const getPayments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status, startDate, endDate, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await adminService.getAllPayments(filters);

    res.status(200).json({
      success: true,
      data: result.payments,
      pagination: result.pagination,
      stats: result.stats,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get payments';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/admin/withdrawals
 * @desc    Get all withdrawals
 * @access  Private (Admin)
 */
export const getWithdrawals = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { status, page, limit } = req.query;

    const filters = {
      status: status as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await adminService.getAllWithdrawals(filters);

    res.status(200).json({
      success: true,
      data: result.withdrawals,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get withdrawals';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Private (Admin)
 */
export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
      return;
    }

    const result = await adminService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role
 * @access  Private (Admin)
 */
export const updateRole = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'User ID is required',
      });
      return;
    }

    if (!role || !['worker', 'business', 'admin'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Valid role is required (worker, business, or admin)',
      });
      return;
    }

    const user = await adminService.updateUserRole(id, role);

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update role';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/admin/stats
 * @desc    Get system statistics
 * @access  Private (Admin)
 */
export const getStats = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const stats = await adminService.getSystemStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get stats';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/admin/logs
 * @desc    Get system logs
 * @access  Private (Admin)
 */
export const getLogs = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { type, page, limit } = req.query;

    const filters = {
      type: type as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await adminService.getSystemLogs(filters);

    res.status(200).json({
      success: true,
      data: result.logs,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get logs';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
