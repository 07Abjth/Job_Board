import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {dbConnect}  from "./config/dbConfig.js";
import v1Router from "./routes/v1/index.js"; 
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
 

// Load environment variables
dotenv.config();

 

// Initialize express app
const app = express(); 

//  CORS Configuration
// Place this at the very top of your Express app, before any other middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://talent-hiring-client.vercel.app",
    "https://talent-hiring-client-h3ktqfy6a-abhijith-bss-projects.vercel.app"
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true,
  maxAge: 86400 // Cache preflight requests for 24 hours
};

app.use(cors(corsOptions));


// ✅ Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); //  Enables cookie parsing

  


// Make sure no route is registered before this middleware



// // Add this before your routes to ensure cookies work cross-domain
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   next();
// });

// ✅ Connect to MongoDB
dbConnect();

// ✅ API Versioning
app.use('/api', apiRouter);
// app.use("/api/v1", v1Router); // Mount v1 router

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
