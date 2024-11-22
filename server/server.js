const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: require('find-config')('.env') });

const postRoutes = require('./routes/postsRoutes');
const plannerRoutes = require('./routes/plannerRoutes');
const commentsRoute = require('./routes/commentsRoutes');
const bookmarkRoutes = require('./routes/bookmarksRoutes');
const apiRoutes = require('./routes/apiRoutes');
const imageRoutes = require('./routes/imageRoutes');
const awsRoutes = require('./routes/awsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/comments', commentsRoute);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api', apiRoutes);
app.use('/images', imageRoutes);
app.use('/api', awsRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.set('debug', true);

mongoose.connect(mongoURI, {
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Listening to server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
