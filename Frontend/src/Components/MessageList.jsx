import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessageList = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (dateString) => {
    try {
      if (!dateString) return ""; 
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ""; 
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };


  if (!Array.isArray(messages)) {
    console.error("Expected messages to be an array, got:", messages);
    return <div>No messages to display</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages
        .filter(message => {
        
          if (!message) return false;
          
          
          if (message.sender && message.sender._id === 'system' && 
              (!message.createdAt || isNaN(new Date(message.createdAt).getTime()))) {
            return false;
          }
          
          return true;
        })
        .map((message) => {
         
          const sender = message.sender || { 
            _id: 'system', 
            username: message.user || 'System' 
          };
          
          const isCurrentUser = user && sender._id === user._id;
          const messageContent = message.content || message.text || "";
          
        
          if (!messageContent.trim()) return null;
          
          return (
            <div
              key={message._id || `msg_${Date.now()}_${Math.random()}`}
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
                    {sender.username}
                  </div>
                )}
                <p className="break-words">{messageContent}</p>
                <div
                  className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-indigo-200' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.createdAt)}
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