const express = require('express');
const router = express.Router();
const Post = require('../models/posts');

router.post('/', async (req, res) => { 
    console.log('Received filter request:', req.body);

  try {
    const { selectedCountry, sortBy, rating, category } = req.body;

    let query = Post.find();

    // Country Filter
    if (selectedCountry) {
      query = query.where('location.description').regex(new RegExp(selectedCountry, 'i'));
    }

    // Rating Filter
    if (rating && rating.length === 2) {
      query = query.where('rating').gte(rating[0]).lte(rating[1]);
    }

    // Category Filter
    if (category && category.length > 0) {
      const categoryRegex = category.map(cat => new RegExp(cat, 'i'));
      query = query.or([
        { category: { $in: categoryRegex } },
        { title: { $in: categoryRegex } },
        { body: { $in: categoryRegex } }
      ]);
    }

    let filteredPosts;

    // Sort by Filter
    switch (sortBy) {
      case 'Hot':
        filteredPosts = await query.exec();
        const currentTime = new Date();
        filteredPosts.sort((a, b) => {
          const scoreA = a.upvotes / (Math.max(1, (currentTime - a.createdAt) / 1000));
          const scoreB = b.upvotes / (Math.max(1, (currentTime - b.createdAt) / 1000));
          return scoreB - scoreA;
        });
        break;
      case 'New':
        filteredPosts = await query.sort({ createdAt: -1 }).exec();
        break;
      case 'Oldest':
        filteredPosts = await query.sort({ createdAt: 1 }).exec();
        break;
      case 'Controversial':
        filteredPosts = await query.exec();
        filteredPosts.sort((a, b) => {
          const A = Math.abs(a.upvotes - a.downvotes);
          const B = Math.abs(b.upvotes - b.downvotes);
          return B - A;
        });
        break;
      case 'Top All Time':
        filteredPosts = await query.sort({ upvotes: -1, downvotes: 1 }).exec();
        break;
      default:
        filteredPosts = await query.sort({ createdAt: -1 }).exec(); 
    }

    console.log('Filtered posts:', filteredPosts);


    // Check if no posts were found
    if (filteredPosts.length === 0) {
      const defaultPosts = await Post.find().sort({ createdAt: -1 }).exec();
      res.json({ message: "No posts found.", posts: defaultPosts });
    } else {
      res.json({ posts: filteredPosts });
    }

  } catch (error) {
    console.error('Error applying filters:', error);
    // Fallback to default sorting on error
    try {
      const defaultPosts = await Post.find().sort({ createdAt: -1 }).exec();
      res.json({ message: "Error occurred.", posts: defaultPosts });
    } catch (fallbackError) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;