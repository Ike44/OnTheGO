const mongoose = require('mongoose');

const awsSchema = new mongoose.Schema({
  accessKeyId: { type: String, required: true },
  secretAccessKey: { type: String, required: true },
  region: { type: String, required: true },
  bucketName: { type: String, required: true }
});

// const Aws => mongoose.model('Aws', awsSchema);
module.exports = Aws = mongoose.model('Aws', awsSchema);