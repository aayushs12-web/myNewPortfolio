// models/Contact.js
// Schema for storing contact form submissions from the portfolio

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Please enter a valid email address",
      ],
    },
    service: {
      type: String,
      required: [true, "Service selection is required"],
      enum: {
        values: ["Web Development", "UI/UX Design", "Others"],
        message: "Service must be Web Development, UI/UX Design, or Others",
      },
    },
    budget: {
      type: String,
      trim: true,
      default: "",
    },
    idea: {
      type: String,
      required: [true, "Project idea is required"],
      trim: true,
      maxlength: [2000, "Idea cannot exceed 2000 characters"],
    },
    // Track where the message was sent from (EmailJS / backend)
    emailSent: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Index for faster queries by email and creation date
contactSchema.index({ email: 1, createdAt: -1 });

module.exports = mongoose.model("Contact", contactSchema);
