// backend/models/Category.js

const mongoose = require("mongoose");
const slugify  = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Category name is required"],
      unique:   true,
      trim:     true,
    },
    slug: {
      type:   String,
      unique: true,
      sparse: true,
    },
    icon: {
      type:    String,
      default: "LayoutIcon",
    },
    description: {
      type:    String,
      default: "",
    },
    order: {
      type:    Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ✅ Fix — do NOT use next(), just return normally
categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

module.exports = mongoose.model("Category", categorySchema);