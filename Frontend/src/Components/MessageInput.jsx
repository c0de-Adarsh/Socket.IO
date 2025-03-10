import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useSocket } from '../Context/SocketContext';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { setTyping } = useSocket();
  
  // Handle typing indicator with debounce
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      if (isTyping) {
        setTyping(false);
        setIsTyping(false);
      }
    }, 3000);

    return () => clearTimeout(typingTimeout);
  }, [isTyping, setTyping]);

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      setTyping(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setTyping(false);
      setIsTyping(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border-t border-gray-200 p-4"
    >
      <div className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-r-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;