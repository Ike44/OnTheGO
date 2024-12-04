const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmarks');

// Create a new bookmark
router.post('/', async (req, res) => {
  const bookmark = new Bookmark(req.body);
  try {
    const savedBookmark = await bookmark.save();
    res.json(savedBookmark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookmarks
router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find().populate('postId');
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a bookmark
router.delete('/:id', async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    await bookmark.remove();
    res.json({ message: 'Bookmark removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
