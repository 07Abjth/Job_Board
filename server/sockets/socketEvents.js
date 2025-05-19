// /sockets/socketEvents.js

import { getIO } from "../config/socket.config.js";
import { Notification } from "../models/notificationModel.js";
import  Job  from "../models/jobModel.js";

export const socketEvents = (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  socket.on("join_room", ({ jobId, userId, isEmployer }) => {
    if (isEmployer) {
      socket.join(`job_${jobId}_employer`);
    } else {
      socket.join(`job_${jobId}_user_${userId}`);
    }
    socket.join(`user_${userId}`);
  });

  // 🔽 Here's your updated chat_message event
  socket.on("chat_message", async ({ jobId, fromUserId, message, isEmployer }) => {
    try {
      const io = getIO();
      const job = await Job.findById(jobId);
      if (!job) return console.error("Job not found");
console.log("Message received on backend:", msgData);

      const toUserId = isEmployer ? job.jobSeekerId : job.employerId;

      const msgData = {
        jobId,
        fromUserId,
        message,
        timestamp: Date.now(),
      };

      if (isEmployer) {
        io.to(`job_${jobId}_user_${toUserId}`).emit("chat_message", msgData);
        io.to(`job_${jobId}_employer`).emit("chat_message", msgData);
      } else {
        io.to(`job_${jobId}_employer`).emit("chat_message", msgData);
        io.to(`job_${jobId}_user_${fromUserId}`).emit("chat_message", msgData);
      }

      const notification = new Notification({
        recipient: toUserId,
        sender: fromUserId,
        message: "You have a new message!",
        type: "message",
        link: `/message/${jobId}`,
      });

      await notification.save();
      io.to(`user_${toUserId}`).emit("new_notification", notification);
    } catch (err) {
      console.error("❌ Error in chat_message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Disconnected: ${socket.id}`);
  });
};
