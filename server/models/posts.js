const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postType: {type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  images: [{ type: String }], 
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  businessWebsite: { type: String },
  fromDate: { type: Date},
  toDate: { type: Date},
  rating: { type: Number },
  location: {
    description: { type: String, required: true },  
    place_id: { type: String, required: true }      
  }
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;

