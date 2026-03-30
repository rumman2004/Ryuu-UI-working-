// backend/routes/componentRoutes.js

const express = require("express");
const router  = express.Router();
const {
  getComponents,
  getComponentBySlug,
  getAdminComponents,
  getComponentById,
  createComponent,
  updateComponent,
  deleteComponent,
  togglePublish,
  incrementCopyCount,
} = require("../controllers/componentController");
const { protect }  = require("../middleware/authMiddleware");
const upload       = require("../middleware/uploadMiddleware");

// Public routes
router.get("/",                getComponents);
router.get("/admin/all",       protect, getAdminComponents);
router.get("/admin/:id",       protect, getComponentById);
router.get("/:slug",           getComponentBySlug);
router.patch("/:id/copy",      incrementCopyCount);

// Admin protected routes
router.post("/",               protect, upload.single("previewImage"), createComponent);
router.put("/:id",             protect, upload.single("previewImage"), updateComponent);
router.delete("/:id",          protect, deleteComponent);
router.patch("/:id/publish",   protect, togglePublish);

module.exports = router;