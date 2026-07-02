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
import path from "path";
import https from "https";
import http from "http";
dotenv.config();  // Load environment variables
const __dirname = path.resolve()
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: true,
  credentials: true,
};
import cors from "cors";
app.use(cors(corsOptions));

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

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}!`);
});

// Keep-alive: ping the health endpoint every 14 minutes so Render never spins down
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || "https://mern-blog-1-o2tf.onrender.com";
const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutes

const pingHealth = () => {
  const url = `${RENDER_URL}/api/health`;
  const client = url.startsWith("https") ? https : http;
  const req = client.get(url, (res) => {
    console.log(`[keep-alive] pinged ${url} → ${res.statusCode}`);
  });
  req.on("error", (err) => {
    console.warn(`[keep-alive] ping failed: ${err.message}`);
  });
  req.end();
};

// Only run the pinger in production (Render), not locally
if (process.env.NODE_ENV === "production") {
  setInterval(pingHealth, PING_INTERVAL_MS);
  console.log(`[keep-alive] pinging ${RENDER_URL}/api/health every 14 minutes`);
}