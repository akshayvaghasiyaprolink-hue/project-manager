const MileStone = require('../models/milestone');
const tryGuard = require('../utils/tryGuard');`           `
const paginate = require('../utils/paginate');

// Get all mileStones with pagination, search, and filters
exports.getAllMileStones = tryGuard(async (req, res) => {
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
    model: MileStone,
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
    message: 'MileStones retrieved successfully',
    ...result
  });
});

// Get single mileStone
exports.getMileStone = tryGuard(async (req, res) => {
  let query = MileStone.findById(req.params.id);

  const mileStone = await query;
  
  if (!mileStone) {
    return res.status(404).json({
      success: false,
      message: 'MileStone not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: mileStone
  });
});

// Create mileStone
exports.createMileStone = tryGuard(async (req, res) => {
  const mileStone = await MileStone.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'MileStone created successfully',
    data: mileStone
  });
});

// Update mileStone
exports.updateMileStone = tryGuard(async (req, res) => {
  let query = MileStone.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  const mileStone = await query;
  
  if (!mileStone) {
    return res.status(404).json({
      success: false,
      message: 'MileStone not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'MileStone updated successfully',
    data: mileStone
  });
});

// Delete mileStone
exports.deleteMileStone = tryGuard(async (req, res) => {
  const mileStone = await MileStone.findByIdAndDelete(req.params.id);
  
  if (!mileStone) {
    return res.status(404).json({
      success: false,
      message: 'MileStone not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'MileStone deleted successfully'
  });
});