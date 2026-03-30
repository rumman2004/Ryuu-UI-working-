// backend/controllers/componentController.js

const asyncHandler  = require("express-async-handler");
const Component     = require("../models/Component");
const APIFeatures   = require("../utils/apiFeatures");
const cloudinary    = require("../config/cloudinary");

// @desc    Get all published components (with search, filter, pagination)
// @route   GET /api/components
// @access  Public
const getComponents = asyncHandler(async (req, res) => {
  const features = new APIFeatures(
    Component.find().populate("category", "name slug icon").populate("tags", "name slug color"),
    req.query
  )
    .search()
    .filterByCategory()
    .filterByTags()
    .filterByPublished()
    .sort()
    .paginate(12);

  const components  = await features.query;
  const totalCount  = await Component.countDocuments({ isPublished: true });

  res.json({
    success:     true,
    count:       components.length,
    total:       totalCount,
    currentPage: features.currentPage,
    totalPages:  Math.ceil(totalCount / 12),
    data:        components,
  });
});

// @desc    Get single component by slug
// @route   GET /api/components/:slug
// @access  Public
const getComponentBySlug = asyncHandler(async (req, res) => {
  const component = await Component.findOne({ slug: req.params.slug })
    .populate("category", "name slug icon")
    .populate("tags",     "name slug color");

  if (!component || !component.isPublished) {
    res.status(404);
    throw new Error("Component not found");
  }

  // Increment view count silently
  await Component.findByIdAndUpdate(component._id, { $inc: { viewCount: 1 } });

  res.json({ success: true, data: component });
});

// @desc    Get all components for admin (includes drafts)
// @route   GET /api/components/admin/all
// @access  Private (Admin)
const getAdminComponents = asyncHandler(async (req, res) => {
  const features = new APIFeatures(
    Component.find().populate("category", "name slug").populate("tags", "name color"),
    { ...req.query, all: true }
  )
    .search()
    .filterByCategory()
    .sort()
    .paginate(20);

  const components = await features.query;
  const total      = await Component.countDocuments();

  res.json({
    success:    true,
    count:      components.length,
    total,
    totalPages: Math.ceil(total / 20),
    data:       components,
  });
});

// @desc    Get single component by ID (for admin editing)
// @route   GET /api/components/admin/:id
// @access  Private (Admin)
const getComponentById = asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id)
    .populate("category", "name slug")
    .populate("tags", "name color");

  if (!component) {
    res.status(404);
    throw new Error("Component not found");
  }

  res.json({ success: true, data: component });
});

// @desc    Create component
// @route   POST /api/components
// @access  Private (Admin)
const createComponent = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    tags,
    codeVariants,
    code,
    isFeatured,
    isPublished,
  } = req.body;

  let normalizedVariants = typeof codeVariants === "string"
    ? JSON.parse(codeVariants)
    : codeVariants;

  if (!Array.isArray(normalizedVariants) || normalizedVariants.length === 0) {
    normalizedVariants = [];
    if (code?.react) {
      normalizedVariants.push({ language: "react", code: code.react, cssCode: code.css || "", jsCode: "" });
    }
    if (code?.html) {
      normalizedVariants.push({ language: "html", code: code.html, cssCode: code.css || "", jsCode: code.js || "" });
    }
  }

  const componentData = {
    name,
    description,
    category,
    tags:         tags             || [],
    codeVariants: normalizedVariants,
    isFeatured:   isFeatured       || false,
    isPublished:  isPublished      || false,
  };

  // If image was uploaded via Cloudinary middleware
  if (req.file) {
    componentData.previewImage         = req.file.path;
    componentData.previewImagePublicId = req.file.filename;
  }

  const component = await Component.create(componentData);

  await component.populate([
    { path: "category", select: "name slug" },
    { path: "tags",     select: "name color" },
  ]);

  res.status(201).json({ success: true, data: component });
});

// @desc    Update component
// @route   PUT /api/components/:id
// @access  Private (Admin)
const updateComponent = asyncHandler(async (req, res) => {
  let component = await Component.findById(req.params.id);

  if (!component) {
    res.status(404);
    throw new Error("Component not found");
  }

  // If a new image was uploaded, delete the old one from Cloudinary
  if (req.file && component.previewImagePublicId) {
    await cloudinary.uploader.destroy(component.previewImagePublicId);
  }

  const updateData = { ...req.body };

  if (req.file) {
    updateData.previewImage         = req.file.path;
    updateData.previewImagePublicId = req.file.filename;
  }

  if (typeof updateData.codeVariants === "string") {
    updateData.codeVariants = JSON.parse(updateData.codeVariants);
  }

  if ((!Array.isArray(updateData.codeVariants) || updateData.codeVariants.length === 0) && updateData.code) {
    updateData.codeVariants = [];
    if (updateData.code.react) {
      updateData.codeVariants.push({ language: "react", code: updateData.code.react, cssCode: updateData.code.css || "", jsCode: "" });
    }
    if (updateData.code.html) {
      updateData.codeVariants.push({ language: "html", code: updateData.code.html, cssCode: updateData.code.css || "", jsCode: updateData.code.js || "" });
    }
  }

  component = await Component.findByIdAndUpdate(req.params.id, updateData, {
    new:           true,
    runValidators: true,
  }).populate([
    { path: "category", select: "name slug" },
    { path: "tags",     select: "name color" },
  ]);

  res.json({ success: true, data: component });
});

// @desc    Delete component
// @route   DELETE /api/components/:id
// @access  Private (Admin)
const deleteComponent = asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id);

  if (!component) {
    res.status(404);
    throw new Error("Component not found");
  }

  // Delete preview image from Cloudinary if exists
  if (component.previewImagePublicId) {
    await cloudinary.uploader.destroy(component.previewImagePublicId);
  }

  await component.deleteOne();
  res.json({ success: true, message: "Component deleted successfully" });
});

// @desc    Toggle published status
// @route   PATCH /api/components/:id/publish
// @access  Private (Admin)
const togglePublish = asyncHandler(async (req, res) => {
  const component = await Component.findById(req.params.id);

  if (!component) {
    res.status(404);
    throw new Error("Component not found");
  }

  component.isPublished = !component.isPublished;
  await component.save();

  res.json({
    success: true,
    message: `Component ${component.isPublished ? "published" : "unpublished"}`,
    data:    { isPublished: component.isPublished },
  });
});

// @desc    Increment copy count
// @route   PATCH /api/components/:id/copy
// @access  Public
const incrementCopyCount = asyncHandler(async (req, res) => {
  await Component.findByIdAndUpdate(req.params.id, { $inc: { copyCount: 1 } });
  res.json({ success: true });
});

module.exports = {
  getComponents,
  getComponentBySlug,
  getAdminComponents,
  getComponentById,
  createComponent,
  updateComponent,
  deleteComponent,
  togglePublish,
  incrementCopyCount,
};