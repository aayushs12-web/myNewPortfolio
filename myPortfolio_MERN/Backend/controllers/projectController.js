// controllers/projectController.js
// CRUD operations for portfolio projects

const Project = require("../models/Project");

/**
 * @desc    Get all active projects
 * @route   GET /api/projects
 * @access  Public
 */
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "active" })
      .sort({ featured: -1, order: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching projects.",
    });
  }
};

/**
 * @desc    Get a single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching project.",
    });
  }
};

/**
 * @desc    Create a new project (admin)
 * @route   POST /api/projects
 * @access  Private
 */
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating project.",
    });
  }
};

module.exports = { getProjects, getProjectById, createProject };
