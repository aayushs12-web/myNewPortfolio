/**
 * ChatSession Model
 * Represents an active or archived conversation session between a visitor and Aayush AI.
 */

const mongoose = require("mongoose");

const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: [true, "sessionId is required"],
      unique: true,
      index: true,
      trim: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      default: "portfolio",
      trim: true,
    },
    messageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
chatSessionSchema.index({ sessionId: 1, lastActiveAt: -1 });

module.exports = mongoose.model("ChatSession", chatSessionSchema);
