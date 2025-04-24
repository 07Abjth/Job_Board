import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {dbConnect}  from "./config/dbConfig.js";
import apiRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
 

// Load environment variables
dotenv.config();

 

// Initialize express app
const app = express(); 

// ✅ Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); //  Enables cookie parsing

  

//  CORS Configuration
// Update your CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://talent-hiring-client.vercel.app"],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  // Add these options for better cookie handling
  exposedHeaders: ["set-cookie"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Add this before your routes to ensure cookies work cross-domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  next();
});

// ✅ Connect to MongoDB
dbConnect();

// ✅ API Versioning
app.use("/api", apiRouter);

// ✅ Sample Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Define PORT
const PORT = process.env.PORT || 5000;

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
