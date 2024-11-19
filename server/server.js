const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: require('find-config')('.env') });

const postRoutes = require('./routes/postsRoutes');
const plannerRoutes = require('./routes/plannerRoutes');
const commentsRoute = require('./routes/commentsRoutes');
const bookmarkRoutes = require('./routes/bookmarksRoutes');
const apiRoutes = require('./routes/apiRoutes');
const createImageRoutes = require('./routes/imageRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/comments', commentsRoute);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api', apiRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.set('debug', true);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Database connection error:', err);
});

// Use imageRoutes
app.use('/images', createImageRoutes());

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
