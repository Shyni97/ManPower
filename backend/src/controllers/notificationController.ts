import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as notificationService from '../services/notificationService';

/**
 * @route   POST /api/notifications/send
 * @desc    Send notification (Admin)
 * @access  Private (Admin)
 */
export const sendNotification = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { userId, type, title, message, relatedId, relatedModel, actionUrl, priority } = req.body;

    if (!userId || !type || !title || !message) {
      res.status(400).json({
        success: false,
        message: 'User ID, type, title, and message are required',
      });
      return;
    }

    const notification = await notificationService.createNotification(userId, {
      type,
      title,
      message,
      relatedId,
      relatedModel,
      actionUrl,
      priority,
    });

    res.status(201).json({
      success: true,
      message: 'Notification sent successfully',
      data: notification,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send notification';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/notifications/user/:id
 * @desc    Get user notifications
 * @access  Private
 */
export const getUserNotifications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const { isRead, type, page, limit } = req.query;

    const filters = {
      isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
      type: type as string | undefined,
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
    };

    const result = await notificationService.getUserNotifications(userId, filters);

    res.status(200).json({
      success: true,
      data: result.notifications,
      pagination: result.pagination,
      unreadCount: result.unreadCount,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get notifications';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
export const markAsRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Notification ID is required',
      });
      return;
    }

    const notification = await notificationService.markAsRead(id, userId);

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to mark as read';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Private
 */
export const markAllAsRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    await notificationService.markAllAsRead(userId);

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to mark all as read';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete notification
 * @access  Private
 */
export const deleteNotification = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id.toString();
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!id) {
      res.status(400).json({
        success: false,
        message: 'Notification ID is required',
      });
      return;
    }

    await notificationService.deleteNotification(id, userId);

    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete notification';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/notifications/unread-count
 * @desc    Get unread notification count
 * @access  Private
 */
export const getUnreadCount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const count = await notificationService.getUnreadCount(userId);

    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get unread count';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
