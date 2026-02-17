const Task = require('../models/task');
const tryGuard = require('../utils/tryGuard');
const paginate = require('../utils/paginate');

// Get all tasks with pagination, search, and filters
exports.getAllTasks = tryGuard(async (req, res) => {
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
    model: Task,
    page: parseInt(page),
    limit: parseInt(limit),
    searchFields: ['title'],
    searchTerm: search,
    filters,
    sort,
    populate: ['project']
  });

  res.status(200).json({
    success: true,
    message: 'Tasks retrieved successfully',
    ...result
  });
});

// Get single task
exports.getTask = tryGuard(async (req, res) => {
  let query = Task.findById(req.params.id);

  const task = await query;
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: task
  });
});

// Create task
exports.createTask = tryGuard(async (req, res) => {
  const task = await Task.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task
  });
});

// Update task
exports.updateTask = tryGuard(async (req, res) => {
  let query = Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  const task = await query;
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task
  });
});

// Delete task
exports.deleteTask = tryGuard(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
});