// backend/server.js

const express  = require("express");
const cors     = require("cors");
const dotenv   = require("dotenv");
const helmet   = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan   = require("morgan");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Security & Logging Middleware ─────────────────────────────────────────────
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // Common log format for production
  app.use(morgan("common"));
}

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again later",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use("/api", apiLimiter);

// Data sanitization against NoSQL query injection
// Note: express-mongo-sanitize is incompatible with Express 5's req.query getter
// Mongoose's schema casting natively protects against most object-injection attacks.

// ─── Core Middleware ───────────────────────────────────────────────────────────
// Universal CORS allowing any frontend domain to connect.
// We return 'true' for the origin to reflect the exact requester domain,
// which acts like a wildcard '*' but also allows cookies/credentials to pass.
app.use(cors({
  origin: function (origin, callback) {
    return callback(null, true); // Always allow
  },
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth",       require("./routes/authRoutes"));
console.log("✅ Mounted /api/auth routes");
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/tags",       require("./routes/tagRoutes"));
app.use("/api/components", require("./routes/componentRoutes"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "UI Library API is running ✅" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the UI Library API");
});

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});