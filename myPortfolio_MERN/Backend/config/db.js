// config/db.js
// Handles MongoDB connection with proper error handling and reconnection logic

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern Mongoose 8.x does not need these flags,
      // but they are listed here for clarity / older compatibility
    });

    console.log(`✅  MongoDB Connected: ${conn.connection.host}`);

    // Handle disconnection events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected. Attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅  MongoDB reconnected.");
    });

  } catch (error) {
    console.error(`❌  MongoDB connection error: ${error.message}`);
    // Exit process on connection failure — let process manager restart
    process.exit(1);
  }
};

module.exports = connectDB;
