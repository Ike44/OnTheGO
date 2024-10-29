const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true }
});

const Api = mongoose.model('apis', apiSchema);
module.exports = Api;