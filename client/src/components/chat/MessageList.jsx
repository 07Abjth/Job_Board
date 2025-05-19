import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // or any icon library

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="h-64 overflow-y-auto border p-2 mb-2 rounded bg-gray-50 dark:bg-gray-800 dark:text-white">
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        messages.map((msg, index) => {
          const isCurrentUser = msg.sender === currentUser;
          return (
            <div
              key={index}
              className={`flex items-center mb-2 text-sm ${
                isCurrentUser ? 'justify-end text-right' : 'justify-start'
              }`}
            >
              {!isCurrentUser && (
                <FaUserCircle className="mr-2 text-xl text-blue-500" />
              )}
              <div
                className={`p-2 rounded ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {msg.text}
              </div>
              {isCurrentUser && (
                <FaUserCircle className="ml-2 text-xl text-green-400" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
