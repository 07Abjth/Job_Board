import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChatStore } from '../../store/useChatStore';

const FloatingChatBox = ({ receiverId, currentUserId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isMessagesLoading } = useChatStore();

  const handleSendMessage = (msg) => {
    if (msg.trim()) {
      sendMessage({
        jobId: receiverId,
        fromUserId: currentUserId,
        toUserId: 2, // You can adjust this logic later
        message: msg,
        isEmployer: false,
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 bg-white dark:bg-base-200 shadow-lg rounded-xl overflow-hidden flex flex-col h-96 border border-base-content">
          {/* Header */}
          <div className="bg-base-300 p-3 flex justify-between items-center">
            <h3 className="font-semibold text-base-content">Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-base-content hover:text-error">×</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2">
            {isMessagesLoading ? (
              <p className="text-center text-sm text-base-content/60">Loading...</p>
            ) : (
              <MessageList messages={messages} />
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-base-300">
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary rounded-full shadow-lg"
        >
          💬Chat with the Employer ?
        </button>
      )}
    </div>
  );
};

export default FloatingChatBox;
