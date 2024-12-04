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



router.post('/:id/vote', async (req, res) => {
  const { userId, voteDiff } = req.body; // Assuming you send the user ID and the vote difference (-1, 0, 1)

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send('Post not found');

    const voteIndex = post.votes.findIndex(vote => vote.user.toString() === userId);
    if (voteIndex !== -1) {
      post.votes[voteIndex].value += voteDiff;
      // Correct possible out of range values
      post.votes[voteIndex].value = Math.max(-1, Math.min(1, post.votes[voteIndex].value));
    } else {
      // Add new voter
      post.votes.push({ user: userId, value: voteDiff });
    }

    post.upvotes = post.votes.filter(vote => vote.value === 1).length;
    post.downvotes = post.votes.filter(vote => vote.value === -1).length;

    await post.save();
    res.json({ upvotes: post.upvotes, downvotes: post.downvotes });
  } catch (error) {
    console.error('Failed to vote on post:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;