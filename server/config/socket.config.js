import { Server } from "socket.io";
import { socketEvents } from "../sockets/socketEvents.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", socketEvents);
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};