// backend/models/Component.js

const mongoose = require("mongoose");
const slugify  = require("slugify");

// Sub-schema for each code variant (React or HTML)
const codeVariantSchema = new mongoose.Schema({
  language: {
    type:     String,
    enum:     ["react", "html"],
    required: true,
  },
  code: {
    type:     String,
    required: [true, "Code is required"],
  },
  cssCode: {
    type:    String,
    default: "",
  },
  jsCode: {
    type:    String,
    default: "", // Only used for HTML variant
  },
});

const componentSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, "Component name is required"],
      trim:     true,
    },
    slug: {
      type:   String,
      unique: true,
    },
    description: {
      type:    String,
      default: "",
    },
    category: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "Category",
      required: [true, "Category is required"],
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Tag",
      },
    ],

    // Stores both React + HTML versions inside the same document
    codeVariants: {
      type:     [codeVariantSchema],
      validate: {
        validator: function (variants) {
          return variants.length > 0;
        },
        message: "At least one code variant is required",
      },
    },

    previewImage:          { type: String, default: "" },
    previewImagePublicId:  { type: String, default: "" }, // For Cloudinary deletion

    isFeatured:  { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false }, // Draft system

    viewCount: { type: Number, default: 0 },
    copyCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate unique slug from name
componentSchema.pre("save", async function () {
  if (!this.isModified("name")) return;

  let baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug     = baseSlug;
  let count    = 1;

  while (await mongoose.model("Component").findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Component", componentSchema);