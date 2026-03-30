// backend/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Sometimes status code is still 200 even on error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    // Only show stack trace in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Handle 404 routes
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = { errorHandler, notFound };