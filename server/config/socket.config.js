import { Server } from "socket.io";

let io;

// Initialize Socket
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // adjust as needed
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log(`🟢 New client connected: ${socket.id}`);

    // Custom events here
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg); // broadcast to all
    });

    socket.on("disconnect", () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });
};

// Get Socket.IO instance
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
