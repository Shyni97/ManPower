import express from 'express';
import * as chatController from '../controllers/chatController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * Chat Routes
 */

// Create or get conversation
router.post('/conversations', protect, chatController.createConversation);

// Get user conversations
router.get('/conversations', protect, chatController.getConversations);

// Get conversation messages
router.get('/:conversationId', protect, chatController.getMessages);

// Send message
router.post('/:conversationId/send', protect, chatController.sendMessage);

// Mark messages as read
router.put('/:conversationId/read', protect, chatController.markAsRead);

// Get unread count
router.get('/unread-count', protect, chatController.getUnreadCount);

export default router;
