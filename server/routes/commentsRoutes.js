const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// Create a new comment
router.post('/', async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
