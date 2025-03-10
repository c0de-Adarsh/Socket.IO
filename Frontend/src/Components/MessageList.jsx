import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessageList = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create a unique ID for each message to prevent duplicates
  const getMessageId = (message, index) => {
    if (message._id) return message._id;
    if (message.populatedMessage?._id) return message.populatedMessage._id;
    return `message-${index}`;
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return '';
    }
  };

  // Track processed message IDs to avoid duplicates
  const processedIds = new Set();

  if (!messages || !Array.isArray(messages)) {
    console.error("Invalid messages array:", messages);
    return <p className="text-red-500 p-4">Error loading messages...</p>;
  }

  // Filter out duplicate messages based on ID
  const uniqueMessages = messages.filter((message, index) => {
    const messageId = getMessageId(message, index);
    if (processedIds.has(messageId)) return false;
    processedIds.add(messageId);
    return true;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {uniqueMessages.map((message, index) => {
        // Handle system messages
        if (message.user === 'system') {
          return (
            <div key={`system-${index}`} className="flex justify-center">
              <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm italic">
                {message.text}
              </div>
            </div>
          );
        }

        // Determine if the message is from the current user
        let isCurrentUser = false;
        let messageContent = '';
        let senderUsername = 'Unknown User';
        let timestamp = '';

        // Handle populatedMessage format
        if (message.populatedMessage && message.success) {
          const actualMessage = message.populatedMessage;
          isCurrentUser = user && actualMessage.sender && actualMessage.sender._id === user._id;
          messageContent = actualMessage.content || actualMessage.text || '';
          senderUsername = actualMessage.sender?.username || 'Unknown User';
          timestamp = actualMessage.createdAt;
        } 
        // Handle original message format (with sender)
        else if (message.sender) {
          isCurrentUser = user && message.sender._id === user._id;
          messageContent = message.content || message.text || '';
          senderUsername = message.sender.username || 'Unknown User';
          timestamp = message.createdAt;
        }
        // Handle messages with userId format
        else if (message.userId) {
          isCurrentUser = user && message.userId === user._id;
          messageContent = message.text || '';
          senderUsername = message.user || 'Unknown User';
          timestamp = message.createdAt;
        }
        // Skip messages we can't properly format
        else {
          return null;
        }

        return (
          <div 
            key={getMessageId(message, index)} 
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                isCurrentUser 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {!isCurrentUser && (
                <div className="font-semibold text-sm text-gray-600">
                  {senderUsername}
                </div>
              )}
              <p className="break-words">{messageContent}</p>
              <div 
                className={`text-xs mt-1 ${
                  isCurrentUser ? 'text-indigo-200' : 'text-gray-500'
                }`}
              >
                {formatTime(timestamp)}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

