const express = require('express');
require('dotenv').config();
require('./config/database');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/notes', require('./routes/note'));
app.use('/api/tasks', require('./routes/task'));
app.use('/api/milestones', require('./routes/milestone'));
// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});

module.exports = app;