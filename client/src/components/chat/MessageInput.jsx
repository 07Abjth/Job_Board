 import { useState } from 'react';
import React from 'react';



const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-l focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
