const express = require('express');
const router = express.Router();
const Api = require('../models/api');

// Endpoint to get the Google API key
router.get('/google-api-key', async (req, res) => {
  try {
    const api = await Api.findOne({ name: 'GOOGLE_API_KEY' });
    if (!api) {
      return res.status(404).json({ message: 'API key not found' });
    }
    res.json({ key: api.key });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;