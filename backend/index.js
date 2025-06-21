const functions = require("firebase-functions/v2");
const express = require("express");
const cors = require("cors");
// const corsOptions  = require("./config/cors"); // Import CORS options
const admin = require("firebase-admin");
const connectDb = require("./config/db");
const routes = require("./routes/route.js");
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Initialize Firebase Admin
admin.initializeApp();

const app = express();

// Middleware
const allowedOrigins = ['https://gimexortho.com', 'http://localhost:5173','https://gimex-ortho-mongo.web.app'];
//app.use(cors());
app.use(cors({
  origin: (origin, callback) => {
    console.log('Origin received:', origin); // Useful for debugging logs
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); 

/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
}); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB when the function is invoked
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', routes);
app.use('/api/dashboard', dashboardRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// 404 handler
app.use((req, res) => {
  console.log(`404- Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

// Export the API
exports.orthoAPI = functions.https.onRequest(app);
