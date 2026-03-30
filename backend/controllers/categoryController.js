// backend/controllers/categoryController.js

const asyncHandler = require("express-async-handler");
const Category     = require("../models/Category");
const Component    = require("../models/Component");

// @desc    Get all categories with component count
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort("order");

  // Attach component count to each category
  const categoriesWithCount = await Promise.all(
    categories.map(async (cat) => {
      const count = await Component.countDocuments({
        category:    cat._id,
        isPublished: true,
      });
      return { ...cat.toObject(), componentCount: count };
    })
  );

  res.json({ success: true, data: categoriesWithCount });
});

// @desc    Create category
// @route   POST /api/categories
// @access  Private (Admin)
const createCategory = asyncHandler(async (req, res) => {
  const { name, icon, description, order } = req.body;

  const category = await Category.create({ name, icon, description, order });

  res.status(201).json({ success: true, data: category });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.json({ success: true, data: category });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // Prevent deletion if components are using this category
  const componentsUsing = await Component.countDocuments({ category: req.params.id });
  if (componentsUsing > 0) {
    res.status(400);
    throw new Error(`Cannot delete — ${componentsUsing} components are using this category`);
  }

  await category.deleteOne();
  res.json({ success: true, message: "Category deleted successfully" });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };