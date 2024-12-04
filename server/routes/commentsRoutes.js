const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

// POST a comment to a specific post
router.post('/:postId', async (req, res) => {
  console.log("Attempting to save comment for postId:", req.params.postId);
  const { postId } = req.params;
  const { author, content } = req.body;

  const comment = new Comment({
    postId: postId,
    author: author,
    content: content,
    createdAt: new Date()
  });

  try {
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Get all comments
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId: postId });
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
