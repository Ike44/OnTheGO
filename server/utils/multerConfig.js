const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const path = require('path');
const axios = require('axios');

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

// Configure AWS SDK
let s3;

const configureS3 = async () => {
  const awsInfo = await fetchAwsCredentials();
  s3 = new S3Client({
    region: awsInfo.region,
    credentials: {
      accessKeyId: awsInfo.accessKeyId,
      secretAccessKey: awsInfo.secretAccessKey,
    },
  });
  return awsInfo.bucketName; // Return the bucket name
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 30000000 }, // 30MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: Images Only!"));
  }
});

const uploadToS3 = async (file) => {
  const bucketName = await configureS3(); // Ensure S3 is configured with the latest credentials and get the bucket name

  const key = `${Date.now()}_${file.originalname}`;
  const uploadParams = {
    Bucket: bucketName, // Use the fetched bucket name
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  const parallelUploads3 = new Upload({
    client: s3,
    params: uploadParams,
  });

  try {
    const data = await parallelUploads3.done();
    return { location: data.Location, key: data.Key };
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw new Error('Error uploading to S3');
  }
};

module.exports = { upload, uploadToS3 };