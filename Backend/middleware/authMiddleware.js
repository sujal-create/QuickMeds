import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  let token;

  try {
    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Find user
      req.user = await User.findById(decoded.id).select(
        "-password"
      );

      // User not found
      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      return next();
    }

    return res.status(401).json({
      message: "Not authorized, no token",
    });
  } catch (error) {
    console.error("Auth middleware error:", error);

    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (
    req.user &&
    (req.user.isAdmin === true ||
      req.user.role === "admin")
  ) {
    return next();
  }

  return res.status(401).json({
    message: "Not authorized as an admin",
  });
};

export { protect, admin };