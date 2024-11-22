const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true }, // URL of the image in S3
  key: { type: String, required: true }, // Key of the image in S3
  contentType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);