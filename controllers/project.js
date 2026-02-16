const Project = require('../models/project');
const tryGuard = require('../utils/tryGuard');
const paginate = require('../utils/paginate');

// Get all projects with pagination, search, and filters
exports.getAllProjects = tryGuard(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    sortBy = 'createdAt',
    sortOrder = 'desc',
    ...filters
  } = req.query;

  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
  
  const result = await paginate({
    model: Project,
    page: parseInt(page),
    limit: parseInt(limit),
    searchFields: ['title'],
    searchTerm: search,
    filters,
    sort,
    populate: null
  });

  res.status(200).json({
    success: true,
    message: 'Projects retrieved successfully',
    ...result
  });
});

// Get single project
exports.getProject = tryGuard(async (req, res) => {
  let query = Project.findById(req.params.id);
  
  const project = await query;
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: project
  });
});

// Create project
exports.createProject = tryGuard(async (req, res) => {
  const project = await Project.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Project created successfully',
    data: project
  });
});

// Update project
exports.updateProject = tryGuard(async (req, res) => {
  let query = Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  
  
  const project = await query;
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Project updated successfully',
    data: project
  });
});

// Delete project
exports.deleteProject = tryGuard(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  
  if (!project) {
    return res.status(404).json({
      success: false,
      message: 'Project not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Project deleted successfully'
  });
});