import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Extract token from HTTP-only cookies

    if (!token) {
      return res.status(403).json({ success: false, message: "Unauthorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user; // ✅ Store full user object in `req.user`
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
