const express = require('express');
const router = express.Router();
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/note.js');

// GET /api/notes - Get all notes
router.get('/', getAllNotes);

// GET /api/notes/:id - Get single Note
router.get('/:id', getNote);

// POST /api/notes - Create new note
router.post('/', createNote);

// PUT /api/notes/:id - Update note
router.put('/:id', updateNote);

// DELETE /api/notes/:id - Delete Note
router.delete('/:id', deleteNote);

module.exports = router;