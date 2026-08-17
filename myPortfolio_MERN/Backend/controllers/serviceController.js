// controllers/serviceController.js
// CRUD operations for portfolio services

const Service = require("../models/Service");

/**
 * @desc    Get all active services
 * @route   GET /api/services
 * @access  Public
 */
const getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true })
      .sort({ order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching services.",
    });
  }
};

module.exports = { getServices };
