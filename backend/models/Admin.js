// backend/models/Admin.js

const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type:     String,
      required: [true, "Username is required"],
      unique:   true,
      trim:     true,
    },
    email: {
      type:     String,
      required: [true, "Email is required"],
      unique:   true,
      lowercase: true,
    },
    password: {
      type:     String,
      required: [true, "Password is required"],
      minlength: 6,
      select:   false, // Never return password in queries by default
    },
    role: {
      type:    String,
      enum:    ["superadmin", "editor"],
      default: "editor",
    },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare entered password with hashed password
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", adminSchema);