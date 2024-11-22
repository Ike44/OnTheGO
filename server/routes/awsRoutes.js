const express = require('express');
const router = express.Router();
const Aws = require('../models/aws');

// Endpoint to store AWS information
router.post('/aws', async (req, res) => {
  const awsInfo = new Aws(req.body);
  try {
    const savedAwsInfo = await awsInfo.save();
    res.json(savedAwsInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to retrieve AWS information
router.get('/aws', async (req, res) => {
  try {
    const awsInfo = await Aws.findOne();
    if (!awsInfo) {
      return res.status(404).json({ message: 'AWS information not found' });
    }
    res.json(awsInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;