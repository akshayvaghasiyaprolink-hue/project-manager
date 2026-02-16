const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'project is required'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
    },
    done:{
      type: Boolean,
      default: false
    }
}, {
  timestamps: true
});

// Custom error handling for unique fields
taskSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    next(new Error(`${field} must be unique`));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Task', taskSchema);