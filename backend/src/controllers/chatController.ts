import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
import * as chatService from '../services/chatService';

/**
 * @route   POST /api/chat/conversations
 * @desc    Create or get conversation
 * @access  Private
 */
export const createConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();
    const { recipientId, jobId } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!recipientId) {
      res.status(400).json({
        success: false,
        message: 'Recipient ID is required',
      });
      return;
    }

    const conversation = await chatService.createOrGetConversation([userId, recipientId], jobId);

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create conversation';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/chat/conversations
 * @desc    Get user conversations
 * @access  Private
 */
export const getConversations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    const conversations = await chatService.getUserConversations(userId);

    res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get conversations';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/chat/:conversationId
 * @desc    Get conversation messages
 * @access  Private
 */
export const getMessages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();
    const { conversationId } = req.params;
    const { page, limit } = req.query;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!conversationId) {
      res.status(400).json({
        success: false,
        message: 'Conversation ID is required',
      });
      return;
    }

    const result = await chatService.getConversationMessages(
      conversationId,
      userId,
      page ? parseInt(page as string) : undefined,
      limit ? parseInt(limit as string) : undefined
    );

    res.status(200).json({
      success: true,
      data: result.messages,
      pagination: result.pagination,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get messages';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   POST /api/chat/:conversationId/send
 * @desc    Send message
 * @access  Private
 */
export const sendMessage = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();
    const { conversationId } = req.params;
    const { content } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!conversationId) {
      res.status(400).json({
        success: false,
        message: 'Conversation ID is required',
      });
      return;
    }

    if (!content || content.trim() === '') {
      res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
      return;
    }

    const message = await chatService.sendMessage(conversationId, userId, content);

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   PUT /api/chat/:conversationId/read
 * @desc    Mark messages as read
 * @access  Private
 */
export const markAsRead = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id?.toString();
    const { conversationId } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
      return;
    }

    if (!conversationId) {
      res.status(400).json({
        success: false,
        message: 'Conversation ID is required',
      });
      return;
    }

    await chatService.markMessagesAsRead(conversationId, userId);

    res.status(200).json({
      success: true,
      message: 'Messages marked as read',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to mark messages as read';
    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

/**
 * @route   GET /api/chat/unread-count
 * @desc    Get unread message count
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

    const count = await chatService.getUnreadCount(userId);

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
