/**
 * ChatMessage Model
 * Stores individual user and assistant messages for a session.
 * Excludes system instructions, API keys, or backend secrets.
 */

const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: [true, "sessionId is required"],
      index: true,
      trim: true,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: {
        values: ["user", "assistant"],
        message: "role must be either 'user' or 'assistant'",
      },
    },
    content: {
      type: String,
      required: [true, "content is required"],
      maxlength: [4000, "content cannot exceed 4000 characters"],
      trim: true,
    },
    intent: {
      type: String,
      default: "general",
      trim: true,
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

// Compound index for fast chronological conversation retrieval
chatMessageSchema.index({ sessionId: 1, createdAt: 1 });

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
