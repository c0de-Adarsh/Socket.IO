import React from 'react';

const TypingIndicator = ({ username }) => {
  if (!username) return null;

  console.log('username',username)
  return (
    <div className="text-sm text-gray-500 italic px-4 py-1">
      {username} is typing...
      <span className="dots">
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </span>
      <style jsx>{`
        .dots {
          display: inline-block;
        }
        .dot {
          animation: wave 1.3s linear infinite;
          display: inline-block;
        }
        .dot:nth-child(2) {
          animation-delay: -1.1s;
        }
        .dot:nth-child(3) {
          animation-delay: -0.9s;
        }
        @keyframes wave {
          0%, 60%, 100% {
            transform: initial;
          }
          30% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default TypingIndicator;