// config/db.js
// Handles MongoDB Atlas connection with reliable DNS resolver, graceful failover, and reconnection logic

const dns = require("dns");
const mongoose = require("mongoose");

// Ensure reliable DNS resolution for mongodb+srv connections across all network environments
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (dnsErr) {
  // Use default system DNS if setServers is not permitted
}

let isConnecting = false;

/**
 * Connect to MongoDB Atlas with graceful error handling and without process crashing.
 */
const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.warn("⚠️  [MongoDB] Neither MONGODB_URI nor MONGO_URI is set in environment. Running in stateless mode.");
    return false;
  }

  if (mongoose.connection.readyState === 1 || isConnecting) {
    return true;
  }

  try {
    isConnecting = true;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅  [MongoDB] Connected successfully to Atlas host: ${conn.connection.host}`);
    console.log(`🗄️   [MongoDB] Database: ${conn.connection.name}`);
    isConnecting = false;

    // Handle connection events
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  [MongoDB] Disconnected. Running with fallback handling...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("✅  [MongoDB] Reconnected.");
    });

    mongoose.connection.on("error", (err) => {
      console.error(`❌  [MongoDB] Runtime error: ${err.message}`);
    });

    return true;
  } catch (error) {
    isConnecting = false;
    console.warn(`⚠️  [MongoDB] Connection failed (${error.message}). App will operate gracefully in stateless fallback mode.`);
    return false;
  }
};

/**
 * Check whether MongoDB connection is currently active and ready.
 * @returns {boolean}
 */
const isDbConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = {
  connectDB,
  isDbConnected,
};
