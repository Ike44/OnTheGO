const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  images: [{ type: String }], // If multiple images, use an array
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  country: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String }, // Optional unless specified as required in form
  businessWebsite: { type: String }, // Only for business posts; make optional
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
