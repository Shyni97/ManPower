import { Conversation, Message, IConversation, IMessageDoc } from '../models/Chat';
import mongoose from 'mongoose';

/**
 * Chat Service
 * Handles business logic for chat/messaging
 */

/**
 * Create or get conversation
 */
export const createOrGetConversation = async (
  participantIds: string[],
  jobId?: string
) => {
  if (participantIds.length !== 2) {
    throw new Error('Conversation must have exactly 2 participants');
  }

  // Check if conversation already exists
  const existingConversation = await Conversation.findOne({
    participants: { $all: participantIds },
  }).populate('participants', 'name email profileImage role');

  if (existingConversation) {
    return existingConversation;
  }

  // Create new conversation
  const conversation = await Conversation.create({
    participants: participantIds,
    jobId: jobId ? new mongoose.Types.ObjectId(jobId) : undefined,
  });

  return conversation.populate('participants', 'name email profileImage role');
};

/**
 * Get user conversations
 */
export const getUserConversations = async (userId: string) => {
  const conversations = await Conversation.find({
    participants: userId,
  })
    .populate('participants', 'name email profileImage role')
    .populate('jobId', 'title')
    .sort({ updatedAt: -1 });

  return conversations;
};

/**
 * Send message
 */
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string
) => {
  // Verify sender is part of conversation
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const senderIdObj = new mongoose.Types.ObjectId(senderId);
  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === senderId
  );

  if (!isParticipant) {
    throw new Error('You are not part of this conversation');
  }

  // Create message
  const message = await Message.create({
    conversationId,
    senderId,
    content,
  });

  // Update conversation last message
  conversation.lastMessage = {
    content,
    senderId: senderIdObj,
    timestamp: new Date(),
  };
  await conversation.save();

  return message.populate('senderId', 'name email profileImage');
};

/**
 * Get conversation messages
 */
export const getConversationMessages = async (
  conversationId: string,
  userId: string,
  page: number = 1,
  limit: number = 50
) => {
  // Verify user is part of conversation
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === userId
  );

  if (!isParticipant) {
    throw new Error('You are not part of this conversation');
  }

  const skip = (page - 1) * limit;

  const messages = await Message.find({ conversationId })
    .populate('senderId', 'name email profileImage')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Message.countDocuments({ conversationId });

  return {
    messages: messages.reverse(), // Reverse to show oldest first
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

/**
 * Mark messages as read
 */
export const markMessagesAsRead = async (conversationId: string, userId: string) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === userId
  );

  if (!isParticipant) {
    throw new Error('You are not part of this conversation');
  }

  // Mark all unread messages not sent by user as read
  await Message.updateMany(
    {
      conversationId,
      senderId: { $ne: userId },
      isRead: false,
    },
    {
      isRead: true,
      readAt: new Date(),
    }
  );
};

/**
 * Get unread message count
 */
export const getUnreadCount = async (userId: string) => {
  const conversations = await Conversation.find({
    participants: userId,
  });

  const conversationIds = conversations.map((c) => c._id);

  const count = await Message.countDocuments({
    conversationId: { $in: conversationIds },
    senderId: { $ne: userId },
    isRead: false,
  });

  return count;
};
