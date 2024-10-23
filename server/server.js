const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postsRoutes');
const plannerRoutes = require('./routes/plannerRoutes');
const commentsRoute = require('./routes/commentsRoutes');
const bookmarkRoutes = require('./routes/bookmarksRoutes');
// require('dotenv').config(); // Load environment variables from .env file
require('dotenv').config({ path: require('find-config')('.env') })

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/planner', plannerRoutes);
app.use('/api/comments', commentsRoute);
app.use('/api/bookmarks', bookmarkRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
}).then(() => {
  console.log('Connected to MongoDB Atlas');
  // Verify connection
  mongoose.connection.db.listCollections().toArray((err, names) => {
    if (err) {
      console.error('Error listing collections:', err);
    } else {
      console.log('Collections:', names);
    }
  });
}).catch(err => {
  console.error('Database connection error:', err);
});

// Example route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Listening to server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
