// routes/contactRoutes.js
// API routes for contact form submissions

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { submitContact, getContacts } = require("../controllers/contactController");

// Validation rules for contact form
const contactValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email"),

  body("service")
    .trim()
    .notEmpty().withMessage("Service selection is required")
    .isIn(["Web Development", "UI/UX Design", "Others"])
    .withMessage("Invalid service selection"),

  body("idea")
    .trim()
    .notEmpty().withMessage("Project idea is required")
    .isLength({ max: 2000 }).withMessage("Idea cannot exceed 2000 characters"),

  body("budget")
    .optional()
    .isNumeric().withMessage("Budget must be a number"),
];

// POST /api/contact — submit form
router.post("/", contactValidation, submitContact);

// GET /api/contact — fetch all messages (add auth middleware here later)
router.get("/", getContacts);

module.exports = router;
