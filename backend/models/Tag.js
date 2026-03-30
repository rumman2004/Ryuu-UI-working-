// backend/models/Tag.js

const mongoose = require("mongoose");
const slugify  = require("slugify");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Tag name is required"],
      unique:   true,
      trim:     true,
    },
    slug: {
      type:   String,
      unique: true,
      sparse: true,
    },
    color: {
      type:    String,
      default: "#6366f1",
    },
  },
  { timestamps: true }
);

// ✅ Fix — do NOT use next(), just return normally
tagSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

module.exports = mongoose.model("Tag", tagSchema);