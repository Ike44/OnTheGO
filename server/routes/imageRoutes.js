const express = require('express');
const mongoose = require('mongoose');
const upload = require('../utils/multerConfig');
const Image = require('../models/image');

const createImageRoutes = (gfs) => {
  const router = express.Router();

  // Upload endpoint
  router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const image = new Image({
        name: req.file.originalname,
        data: req.file.id,
        contentType: req.file.mimetype
      });

      await image.save();
      res.json({ message: 'Image uploaded successfully', file: req.file });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get image endpoint
  router.get('/:id', async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }

      gfs.files.findOne({ _id: image.data }, (err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).json({ err: 'No file exists' });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          res.set('Content-Type', file.contentType);
          readstream.pipe(res);
        } else {
          res.status(404).json({ err: 'Not an image' });
        }
      });
    } catch (error) {
      console.error('Error retrieving image:', error);
      res.status(404).json({ error: 'Image not found' });
    }
  });

  return router;
};

module.exports = createImageRoutes;