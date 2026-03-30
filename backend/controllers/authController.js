// backend/controllers/authController.js

const asyncHandler  = require("express-async-handler");
const Admin         = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// @desc    Register first admin (run once, then disable or protect)
// @route   POST /api/auth/register
// @access  Public (lock this down after first use)
const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Protect registration by only allowing it if no admins exist
  const adminCount = await Admin.countDocuments();
  if (adminCount > 0) {
    res.status(403);
    throw new Error("Registration is completely disabled. Create additional admins manually or contact the superadmin.");
  }

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin with this email already exists");
  }

  const admin = await Admin.create({ username, email, password, role });

  res.status(201).json({
    success: true,
    data: {
      _id:      admin._id,
      username: admin.username,
      email:    admin.email,
      role:     admin.role,
      token:    generateToken(admin._id),
    },
  });
});

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Must use .select("+password") because we set select: false on the model
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    success: true,
    data: {
      _id:      admin._id,
      username: admin.username,
      email:    admin.email,
      role:     admin.role,
      token:    generateToken(admin._id),
    },
  });
});

// @desc    Get current logged-in admin
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data:    req.admin,
  });
});

module.exports = { registerAdmin, loginAdmin, getMe };