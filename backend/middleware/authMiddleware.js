// backend/middleware/authMiddleware.js

const jwt          = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin        = require("../models/Admin");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin     = await Admin.findById(decoded.id).select("-password");

    if (!req.admin) {
      res.status(401);
      throw new Error("Admin not found");
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Only superadmin can perform destructive actions
const superAdminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === "superadmin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied: superadmin only");
  }
};

module.exports = { protect, superAdminOnly };