const Note = require('../models/note');
const tryGuard = require('../utils/tryGuard');`           `
const paginate = require('../utils/paginate');

// Get all notes with pagination, search, and filters
exports.getAllNotes = tryGuard(async (req, res) => {
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
    model: Note,
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
    message: 'Notes retrieved successfully',
    ...result
  });
});

// Get single note
exports.getNote = tryGuard(async (req, res) => {
  let query = Note.findById(req.params.id);

  const note = await query;
  
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: note
  });
});

// Create note
exports.createNote = tryGuard(async (req, res) => {
  const note = await Note.create(req.body);
  
  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: note
  });
});

// Update note
exports.updateNote = tryGuard(async (req, res) => {
  let query = Note.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  
  const note = await query;
  
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    data: note
  });
});

// Delete note
exports.deleteNote = tryGuard(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  
  if (!note) {
    return res.status(404).json({
      success: false,
      message: 'Note not found'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Note deleted successfully'
  });
});