// src/store/useChatStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";  

export const useChatStore = create((set) => ({
  // State Variables
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Action: Fetch Users
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Action: Fetch Messages for a Specific User
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Action: Set Selected User for Chat
  setSelectedUser: (user) => set({ selectedUser: user }),

  // Action: Add New Message
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),

  // Action: Clear Messages
  clearMessages: () => set({ messages: [] }),
}));
