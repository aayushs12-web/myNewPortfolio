// routes/serviceRoutes.js
// API routes for portfolio services

const express = require("express");
const router = express.Router();
const { getServices } = require("../controllers/serviceController");

// GET /api/services — list all active services
router.get("/", getServices);

module.exports = router;
