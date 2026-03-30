// backend/server.js

const express  = require("express");
const cors     = require("cors");
const dotenv   = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Core Middleware ───────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "http://localhost:5173",  // Frontend (Vite)
    "http://localhost:5174",  // Admin (Vite)
  ],
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

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});