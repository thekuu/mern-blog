<<<<<<< HEAD
/*import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import cookieParser from "cookie-parser"
import multer from "multer"

const app = express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })

const upload = multer({storage})
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
  })

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(3000, ()=>{
    console.log("Connected!")
})*/
import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import connectDB from "./db.js";  // Import MongoDB connection
import dotenv from "dotenv";
import path from "path"
dotenv.config();  // Load environment variables
const __dirname = path.resolve()
=======
import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';

>>>>>>> 17af6966e1bbeccc62e8a62361ce4de17fe27963
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
<<<<<<< HEAD

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})
// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
=======
>>>>>>> 17af6966e1bbeccc62e8a62361ce4de17fe27963
