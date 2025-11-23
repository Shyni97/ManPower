import Notification from '../models/Notification';
import nodemailer from 'nodemailer';

/**
 * Notification Service
 * Handles business logic for notifications and emails
 */

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Create notification
 */
export const createNotification = async (
  userId: string,
  notificationData: {
    type: 'job_post' | 'application' | 'payment' | 'chat' | 'rating' | 'verification' | 'system';
    title: string;
    message: string;
    relatedId?: string;
    relatedModel?: string;
    actionUrl?: string;
    priority?: 'low' | 'medium' | 'high';
  }
) => {
  const notification = await Notification.create({
    userId,
    ...notificationData,
  });

  return notification;
};

/**
 * Get user notifications
 */
export const getUserNotifications = async (
  userId: string,
  filters: {
    isRead?: boolean;
    type?: string;
    page?: number;
    limit?: number;
  }
) => {
  const { isRead, type, page = 1, limit = 20 } = filters;

  const query: any = { userId };

  if (typeof isRead !== 'undefined') {
    query.isRead = isRead;
  }

  if (type) {
    query.type = type;
  }

  const skip = (page - 1) * limit;

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments(query);
  const unreadCount = await Notification.countDocuments({ userId, isRead: false });

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    unreadCount,
  };
};

/**
 * Mark notification as read
 */
export const markAsRead = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw new Error('Notification not found');
  }

  notification.isRead = true;
  notification.readAt = new Date();
  await notification.save();

  return notification;
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = async (userId: string) => {
  await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true, readAt: new Date() }
  );
};

/**
 * Delete notification
 */
export const deleteNotification = async (notificationId: string, userId: string) => {
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw new Error('Notification not found');
  }

  return notification;
};

/**
 * Send email notification
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"ManPower Platform" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send notification with email
 */
export const sendNotificationWithEmail = async (
  userId: string,
  email: string,
  notificationData: {
    type: 'job_post' | 'application' | 'payment' | 'chat' | 'rating' | 'verification' | 'system';
    title: string;
    message: string;
    relatedId?: string;
    relatedModel?: string;
    actionUrl?: string;
    priority?: 'low' | 'medium' | 'high';
  }
) => {
  // Create in-app notification
  const notification = await createNotification(userId, notificationData);

  // Send email
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">${notificationData.title}</h2>
      <p style="color: #666; line-height: 1.6;">${notificationData.message}</p>
      ${
        notificationData.actionUrl
          ? `<a href="${notificationData.actionUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Details</a>`
          : ''
      }
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      <p style="color: #999; font-size: 12px;">This is an automated message from ManPower Platform. Please do not reply to this email.</p>
    </div>
  `;

  try {
    await sendEmail(email, notificationData.title, emailHtml);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }

  return notification;
};

/**
 * Get unread count
 */
export const getUnreadCount = async (userId: string) => {
  const count = await Notification.countDocuments({ userId, isRead: false });
  return count;
};
