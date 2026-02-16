const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/project.js');

// GET /api/projects - Get all projects
router.get('/', getAllProjects);

// GET /api/projects/:id - Get single Project
router.get('/:id', getProject);

// POST /api/projects - Create new project
router.post('/', createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete Project
router.delete('/:id', deleteProject);

module.exports = router;