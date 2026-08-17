// routes/projectRoutes.js
// API routes for portfolio projects

const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
} = require("../controllers/projectController");

// GET  /api/projects        — list all active projects
router.get("/", getProjects);

// GET  /api/projects/:id    — get single project
router.get("/:id", getProjectById);

// POST /api/projects        — create a new project (admin)
router.post("/", createProject);

module.exports = router;
