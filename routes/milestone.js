const express = require('express');
const router = express.Router();
const {
  getAllMileStones,
  getMileStone,
  createMileStone,
  updateMileStone,
  deleteMileStone
} = require('../controllers/milestone.js');

// GET /api/mileStones - Get all mileStones
router.get('/', getAllMileStones);

// GET /api/mileStones/:id - Get single MileStone
router.get('/:id', getMileStone);

// POST /api/mileStones - Create new mileStone
router.post('/', createMileStone);

// PUT /api/mileStones/:id - Update mileStone
router.put('/:id', updateMileStone);

// DELETE /api/mileStones/:id - Delete MileStone
router.delete('/:id', deleteMileStone);

module.exports = router;