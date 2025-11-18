/**
 * ChatBox Component
 * Simple chat interface component (placeholder for future implementation)
 */

'use client';

import React, { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface ChatBoxProps {
  chatId: string;
  recipientName: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ chatId, recipientName }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: recipientName,
      content: 'Hello! I saw your job posting and I\'m interested.',
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Great! Let\'s discuss the details.',
      timestamp: new Date(Date.now() - 1800000),
      isOwn: true,
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: message,
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md border border-gray-200">
      {/* Chat Header */}
      <div className="bg-primary-600 text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold">{recipientName}</h3>
        <p className="text-xs text-primary-100">Chat ID: {chatId}</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] sm:max-w-md px-4 py-3 rounded-lg ${
                msg.isOwn
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm font-medium mb-1">{msg.sender}</p>
              <p className="text-sm">{msg.content}</p>
              <p
                className={`text-xs mt-2 ${
                  msg.isOwn ? 'text-primary-100' : 'text-gray-500'
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
        <div className="flex items-end space-x-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={2}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed h-[72px]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
