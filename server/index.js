import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/dbConfig.js";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { initializeSocket } from "./config/socket.config.js";
import bodyParser from "body-parser"; // Needed for Stripe webhook

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

// 🔥 STRIPE WEBHOOK (must come before express.json)
app.post(
  "/api/v1/payment/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const { webhookHandler } = await import(
        "./controllers/payment/webhookController.js"
      );
      webhookHandler(req, res);
    } catch (err) {
      console.error("❌ Error in Stripe webhook handler:", err);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Other middlewares
app.use(express.json());
app.use(cookieParser());

// Set CORS headers for credentials manually (if needed for cookies)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  next();
});

// Connect to DB
dbConnect();

// Routes
app.use("/api", apiRouter);

// Health check
app.get("/", (req, res) => res.send("API is running..."));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: corsOptions.origin,
    credentials: true
  }
});

initializeSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
