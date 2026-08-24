/**
 * Lead Model
 * Stores client project requirements and lead submissions captured via the AI Chatbot LeadForm.
 */

const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      index: true,
      trim: true,
      default: "",
    },
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
      maxlength: [150, "Email cannot exceed 150 characters"],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [30, "Phone cannot exceed 30 characters"],
    },
    businessType: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Business type cannot exceed 100 characters"],
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      trim: true,
      maxlength: [100, "Project type cannot exceed 100 characters"],
    },
    requirements: {
      type: String,
      trim: true,
      default: "",
      maxlength: [3000, "Requirements cannot exceed 3000 characters"],
    },
    features: {
      type: [String],
      default: [],
    },
    existingWebsite: {
      type: String,
      trim: true,
      default: "",
      maxlength: [300, "Website URL cannot exceed 300 characters"],
    },
    references: {
      type: [String],
      default: [],
    },
    budget: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Budget cannot exceed 100 characters"],
    },
    timeline: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Timeline cannot exceed 100 characters"],
    },
    additionalRequirements: {
      type: String,
      trim: true,
      default: "",
      maxlength: [3000, "Additional requirements cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["new", "contacted", "in-progress", "completed", "closed"],
        message: "Status must be one of: new, contacted, in-progress, completed, closed",
      },
      default: "new",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
leadSchema.index({ email: 1, createdAt: -1 });
leadSchema.index({ sessionId: 1, createdAt: -1 });
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ projectType: 1, createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
