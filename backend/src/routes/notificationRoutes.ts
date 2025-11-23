import express from 'express';
import * as notificationController from '../controllers/notificationController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Notification Routes
 */

// Send notification (Admin)
router.post('/send', protect, restrictTo('admin'), notificationController.sendNotification);

// Get user notifications
router.get('/user/:id', protect, notificationController.getUserNotifications);

// Get unread count
router.get('/unread-count', protect, notificationController.getUnreadCount);

// Mark notification as read
router.put('/:id/read', protect, notificationController.markAsRead);

// Mark all as read
router.put('/read-all', protect, notificationController.markAllAsRead);

// Delete notification
router.delete('/:id', protect, notificationController.deleteNotification);

export default router;
