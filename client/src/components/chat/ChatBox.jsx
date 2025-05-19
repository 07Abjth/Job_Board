// src/components/Chat/ChatBox.jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import React from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const socket = io("http://localhost:5000/api/v1"); // Change URL if needed

export const ChatBox = ({ jobId, userId, isEmployer, toUserId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Join room
    socket.emit("join_room", { jobId, userId, isEmployer });
    console.log("🚪 Joined chat room", { jobId, userId, isEmployer });

    // Listen for messages
    socket.on("chat_message", (msg) => {
      console.log("📥 Message received:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, [jobId, userId, isEmployer]);

  const sendMessage = (text) => {
    if (text.trim()) {
      const payload = {
        jobId,
        fromUserId: userId,
        toUserId,
        message: text,
        isEmployer,
      };

      console.log("📤 Sending message:", payload);
      socket.emit("chat_message", payload);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-lg bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-center">Live Chat</h2>
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
};
