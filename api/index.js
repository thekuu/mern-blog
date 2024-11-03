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
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
connectDB();  // Call the function to connect to MongoDB

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');  // Ensure this path is correct for your client-side app
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

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