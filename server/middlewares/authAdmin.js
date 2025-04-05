import authUser from "./authUser.js";

const authAdmin = (req, res, next) => {
  authUser(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
    next();
  });
};

export default authAdmin;
