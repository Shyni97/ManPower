import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as reportService from '../services/reportService';

/**
 * @route   GET /api/reports/worker/:id
 * @desc    Get worker report
 * @access  Private (Worker)
 */
export const getWorkerReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Worker ID is required',
      });
      return;
    }

    const dateRange =
      startDate && endDate
        ? {
            start: new Date(startDate as string),
            end: new Date(endDate as string),
          }
        : undefined;

    const report = await reportService.getWorkerReport(id, dateRange);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get worker report';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/reports/business/:id
 * @desc    Get business report
 * @access  Private (Business)
 */
export const getBusinessReport = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Business ID is required',
      });
      return;
    }

    const dateRange =
      startDate && endDate
        ? {
            start: new Date(startDate as string),
            end: new Date(endDate as string),
          }
        : undefined;

    const report = await reportService.getBusinessReport(id, dateRange);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get business report';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/reports/worker/:id/earnings
 * @desc    Get worker earnings breakdown
 * @access  Private (Worker)
 */
export const getEarningsBreakdown = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { period = 'month' } = req.query;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Worker ID is required',
      });
      return;
    }

    if (!['week', 'month', 'year'].includes(period as string)) {
      res.status(400).json({
        success: false,
        message: 'Invalid period. Must be week, month, or year',
      });
      return;
    }

    const report = await reportService.getEarningsBreakdown(id, period as 'week' | 'month' | 'year');

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get earnings breakdown';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/reports/business/:id/hiring
 * @desc    Get business hiring statistics
 * @access  Private (Business)
 */
export const getHiringStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { period = 'month' } = req.query;

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Business ID is required',
      });
      return;
    }

    if (!['week', 'month', 'year'].includes(period as string)) {
      res.status(400).json({
        success: false,
        message: 'Invalid period. Must be week, month, or year',
      });
      return;
    }

    const report = await reportService.getHiringStats(id, period as 'week' | 'month' | 'year');

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get hiring stats';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
