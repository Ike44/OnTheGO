const express = require('express');
const { upload, uploadToS3 } = require('../utils/multerConfig');
const Image = require('../models/image');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');

const router = express.Router();

// Function to fetch AWS credentials from the database
const fetchAwsCredentials = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/aws');
    const awsInfo = response.data;
    return awsInfo;
  } catch (error) {
    console.error('Error fetching AWS credentials:', error);
    throw new Error('Error fetching AWS credentials');
  }
};

// Upload endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = await uploadToS3(req.file);
    console.log('Data:', data);
    const { location, key } = { location: data.location, key: data.key };
    console.log('Location:', location);
    console.log('Key:', key);

    const image = new Image({
      name: req.file.originalname,
      url: location,
      key: key,
      contentType: req.file.mimetype
    });

    const savedImage = await image.save();
    res.json({ message: 'Image uploaded successfully', imageId: savedImage._id });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get image metadata endpoint
router.get('/:id', async (req, res) => {
  try {
    const awsInfo = await fetchAwsCredentials();
    const s3 = new S3Client({
      region: awsInfo.region,
      credentials: {
        accessKeyId: awsInfo.accessKeyId,
        secretAccessKey: awsInfo.secretAccessKey,
      },
    });

    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const command = new GetObjectCommand({
      Bucket: awsInfo.bucketName,
      Key: image.key,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour

    res.json({ ...image.toObject(), url });
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;