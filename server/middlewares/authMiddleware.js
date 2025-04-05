import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Get token from cookies
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    console.log("🔹 Token received from cookie:", token);
    console.log("🔹 JWT_SECRET used for verification:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    
    console.log("✅ Decoded payload:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
