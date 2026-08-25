import express from "express";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================================
// LOGIN
// POST /api/users/login
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    // Check password
    if (
      user &&
      (await user.matchPassword(password))
    ) {
      return res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name:
          user.name ||
          `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        phone: user.phone,
        mobile: user.mobile,
        address: user.address,
        isAdmin: user.isAdmin,
        role: user.role,

        // JWT
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// REGISTER
// POST /api/users
// =====================================================

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      phone,
      mobile,
      address,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check existing user
    const userExists = await User.findOne({
      email: email.toLowerCase(),
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const finalFirstName =
      firstName ||
      name?.split(" ")[0] ||
      "";

    const finalLastName =
      lastName ||
      name?.split(" ").slice(1).join(" ") ||
      "";

    const finalPhone =
      phone ||
      mobile ||
      "";

    // Create user
    const user = await User.create({
      firstName: finalFirstName,
      lastName: finalLastName,

      name:
        name ||
        `${finalFirstName} ${finalLastName}`.trim(),

      email: email.toLowerCase(),

      password,

      phone: finalPhone,
      mobile: finalPhone,

      address: address || "",

      isAdmin: false,
      role: "user",
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid user data",
      });
    }

    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      phone: user.phone,
      mobile: user.mobile,
      address: user.address,
      isAdmin: user.isAdmin,
      role: user.role,

      // JWT
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// GET CURRENT USER
// GET /api/users/me
// PRIVATE
// =====================================================

router.get("/me", protect, async (req, res) => {
  try {
    return res.status(200).json({
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      name:
        req.user.name ||
        `${req.user.firstName} ${req.user.lastName}`.trim(),
      email: req.user.email,
      phone: req.user.phone,
      mobile: req.user.mobile,
      address: req.user.address,
      isAdmin: req.user.isAdmin,
      role: req.user.role,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// ADMIN LOGIN
// POST /api/users/admin/login
// =====================================================

router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      email: username.toLowerCase(),
      isAdmin: true,
    });

    if (
      user &&
      (await user.matchPassword(password))
    ) {
      return res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.role,

        token: generateToken(user._id),
      });
    }

    return res.status(401).json({
      message: "Invalid admin credentials",
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;