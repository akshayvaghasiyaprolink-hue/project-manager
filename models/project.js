const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'title is required'],
    }
}, {
  timestamps: true
});

// Custom error handling for unique fields
projectSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`${field} must be unique`));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Project', projectSchema);