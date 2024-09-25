import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';

const app = express();

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: Date.now() + '-' + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read' // or private depending on your needs
  };

  try {
    const data = await s3.upload(params).promise();
    res.status(200).json({ fileUrl: data.Location });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = 443;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
