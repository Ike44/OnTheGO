const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

// Create a new post - POST
router.post('/', async (req, res) => {
  console.log("Received post data:", req.body);
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all posts - GET
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log('Fetched posts:', posts); // Add logging
    if (posts.length === 0) {
      console.log('No posts found');
    }
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err); // Add logging
    res.status(500).json({ message: err.message });
  }
});

// Remove a post - DELETE
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;