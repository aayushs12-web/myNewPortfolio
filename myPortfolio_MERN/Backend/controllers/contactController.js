// controllers/contactController.js
// Handles contact form submissions — saves to MongoDB alongside EmailJS

const Contact = require("../models/Contact");
const { validationResult } = require("express-validator");

/**
 * @desc    Save a new contact message to the database
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res) => {
  // 1. Check for validation errors from middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  const { name, email, service, budget, idea } = req.body;

  try {
    // 2. Create and save the contact entry
    const contact = await Contact.create({
      name,
      email,
      service,
      budget: budget || "",
      idea,
      emailSent: true, // Assume EmailJS handled the email on the frontend
      ipAddress: req.ip || "",
    });

    return res.status(201).json({
      success: true,
      message: "Message received! We will be in touch soon.",
      data: { id: contact._id },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

/**
 * @desc    Get all contact messages (admin use)
 * @route   GET /api/contact
 * @access  Private (add auth middleware when needed)
 */
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean(); // lean() returns plain JS objects — faster for reads

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching messages.",
    });
  }
};

module.exports = { submitContact, getContacts };
