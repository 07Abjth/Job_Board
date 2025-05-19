// src/components/chat/ChatWindow.jsx
import React, { useEffect } from 'react';
import { useChatStore } from '../../store/useChatStore';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { axiosInstance } from '../../config/axiosInstance';

const ChatWindow = ({ receiverId, currentUserId, isEmployer }) => {
  const {
    messages,
    getMessages,
    addMessage,
    setSelectedUser,
    clearMessages,
  } = useChatStore();

  useEffect(() => {
    setSelectedUser({ id: receiverId });
    getMessages(receiverId);

    return () => clearMessages(); // Clean up
  }, [receiverId]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    try {
      const res = await axiosInstance.post(`/messages/send/${receiverId}`, {
        jobId: receiverId, // Job ID used as receiverId here
        fromUserId: currentUserId,
        toUserId: isEmployer ? 2 : 1, // Replace with actual dynamic ID
        message: text,
        isEmployer,
      });
      addMessage(res.data);
    } catch (error) {
      console.error('Send message failed:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-base-content mb-4">Chat with Employer/Job Seeker</h3>
      <MessageList messages={messages} currentUser={currentUserId} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
