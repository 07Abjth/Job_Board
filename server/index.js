import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConfig.js";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io"; // renamed to avoid confusion
import { initializeSocket } from "./config/socket.config.js";  

dotenv.config();

const app = express();

// CORS config
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://talent-hiring-client.vercel.app",
    "https://talent-hiring-client-h3ktqfy6a-abhijith-bss-projects.vercel.app"
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  maxAge: 86400
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Required for cross-origin cookies
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  next();
});

dbConnect();

app.use("/api", apiRouter);
app.get("/", (req, res) => res.send("API is running..."));

// Create raw HTTP server
const server = http.createServer(app);

// Initialize Socket.IO on top of the HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: corsOptions.origin,
    credentials: true
  }
});

// Pass io to your socket handler
initializeSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
