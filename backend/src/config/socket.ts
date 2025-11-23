import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import * as chatService from '../services/chatService';
import User from '../models/User';

/**
 * Socket.IO Configuration
 * Handles real-time chat functionality
 */

interface JwtPayload {
  userId: string;
}

export const initializeSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return next(new Error('Server configuration error'));
      }

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    const user = socket.data.user;
    console.log(`User connected: ${user.name} (${user._id})`);

    // Join user's personal room for private messages
    socket.join(user._id.toString());

    // Join conversation room
    socket.on('chat:join', (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User ${user.name} joined conversation ${conversationId}`);
    });

    // Leave conversation room
    socket.on('chat:leave', (conversationId: string) => {
      socket.leave(conversationId);
      console.log(`User ${user.name} left conversation ${conversationId}`);
    });

    // Send message
    socket.on('chat:sendMessage', async (data: { conversationId: string; content: string }) => {
      try {
        const { conversationId, content } = data;

        // Save message to database
        const message = await chatService.sendMessage(conversationId, user._id.toString(), content);

        // Emit message to conversation room
        io.to(conversationId).emit('chat:newMessage', message);

        // Emit notification to recipient
        const conversation = await chatService.createOrGetConversation([user._id.toString()], undefined);
        if (conversation) {
          const recipient = conversation.participants.find(
            (p: any) => p._id.toString() !== user._id.toString()
          );

          if (recipient) {
            io.to(recipient._id.toString()).emit('chat:notification', {
              conversationId,
              message,
            });
          }
        }
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('chat:error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('chat:typing', (data: { conversationId: string; isTyping: boolean }) => {
      socket.to(data.conversationId).emit('chat:userTyping', {
        userId: user._id,
        userName: user.name,
        isTyping: data.isTyping,
      });
    });

    // Mark messages as read
    socket.on('chat:markAsRead', async (conversationId: string) => {
      try {
        await chatService.markMessagesAsRead(conversationId, user._id.toString());

        // Notify other participants
        socket.to(conversationId).emit('chat:messagesRead', {
          conversationId,
          userId: user._id,
        });
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    });

    // Disconnect handler
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${user.name} (${user._id})`);
    });
  });

  return io;
};
