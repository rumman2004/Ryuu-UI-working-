// backend/controllers/tagController.js

const asyncHandler = require("express-async-handler");
const Tag          = require("../models/Tag");

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find().sort("name");
  res.json({ success: true, count: tags.length, data: tags });
});

// @desc    Create tag
// @route   POST /api/tags
// @access  Private (Admin)
const createTag = asyncHandler(async (req, res) => {
  const { name, color } = req.body;
  const tag = await Tag.create({ name, color });
  res.status(201).json({ success: true, data: tag });
});

// @desc    Update tag
// @route   PUT /api/tags/:id
// @access  Private (Admin)
const updateTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
    new:           true,
    runValidators: true,
  });

  if (!tag) {
    res.status(404);
    throw new Error("Tag not found");
  }

  res.json({ success: true, data: tag });
});

// @desc    Delete tag
// @route   DELETE /api/tags/:id
// @access  Private (Admin)
const deleteTag = asyncHandler(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag) {
    res.status(404);
    throw new Error("Tag not found");
  }
  await tag.deleteOne();
  res.json({ success: true, message: "Tag deleted" });
});

module.exports = { getTags, createTag, updateTag, deleteTag };