import { getIO } from "../utils/socket.config.js"; // Socket.io instance
import { Notification } from "../models/Notification"; // Notification model

export const socketEvents = (socket) => {
  console.log(`🟢 Client connected: ${socket.id}`);

  // Handle new messages and notifications
  socket.on('chat_message', async ({ jobId, fromUserId, toUserId, message, isEmployer }) => {
    const msgData = { jobId, fromUserId, message, timestamp: Date.now() };

    try {
      // Send the message to both: employer + specific user
      if (isEmployer) {
        getIO().to(`job_${jobId}_user_${toUserId}`).emit('chat_message', msgData);
        getIO().to(`job_${jobId}_employer`).emit('chat_message', msgData);

        // Create and store a notification for the user (in MongoDB)
        const notification = new Notification({
          recipient: toUserId,
          sender: fromUserId,
          message: 'You have a new message!',
          type: 'message',
          link: `/message/${jobId}`,
        });

        await notification.save(); // Store in MongoDB

        // Emit notification to user in real-time via socket
        getIO().to(`user_${toUserId}`).emit('new_notification', notification);
      } else {
        getIO().to(`job_${jobId}_employer`).emit('chat_message', msgData);
        getIO().to(`job_${jobId}_user_${fromUserId}`).emit('chat_message', msgData);

        // Create and store a notification for the employer (in MongoDB)
        const notification = new Notification({
          recipient: toUserId,
          sender: fromUserId,
          message: 'You have a new message!',
          type: 'message',
          link: `/message/${jobId}`,
        });

        await notification.save(); // Store in MongoDB

        // Emit notification to employer in real-time via socket
        getIO().to(`user_${toUserId}`).emit('new_notification', notification);
      }
    } catch (error) {
      console.error("Error while handling chat message:", error);
      // You can also emit an error event to the user or take other actions
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`🔴 Disconnected: ${socket.id}`);
  });
};
