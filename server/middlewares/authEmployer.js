import jwt from "jsonwebtoken";

const authEmployer = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  console.log("🔹 Token received in authEmployer middleware:", token);

  if (!token) {
    return res.status(403).json({ success: false, message: "Token missing" });
  }

  console.log("🔹 JWT_SECRET being used:", process.env.JWT_SECRET); // Debugging

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("❌ Token verification error:", err.message);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    console.log("✅ Token decoded:", decoded);

    if (decoded.role !== "employer" && decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Employers only." });
    }

    req.user = decoded;
    next();
  });
};

export default authEmployer;
