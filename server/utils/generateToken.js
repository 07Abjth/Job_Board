// import jwt from "jsonwebtoken";

// const generateToken = (user, role) => {
//   try {
//     const token = jwt.sign(
//       { id: user._id, role }, // ✅ Convert `id` to a string
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return token;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default generateToken;


// import jwt from "jsonwebtoken";

// const generateToken = (user) => {
//   try {
//     console.log("🔹 Signing with JWT_SECRET:", process.env.JWT_SECRET);
    
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET, 
//       { algorithm: "HS256", expiresIn: "7d" } // Explicitly use HS256
//     );

//     console.log("✅ Token generated:", token);
//     return token;
//   } catch (error) {
//     console.error("❌ Error generating token:", error);
//   }
// };

// export default generateToken;


import jwt from "jsonwebtoken";

const generateToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: "7d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents access from JavaScript (XSS protection)
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    sameSite: "Strict", // Prevents CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  });

  return token;
};

export default generateToken;
