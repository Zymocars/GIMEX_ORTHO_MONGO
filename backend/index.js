const functions = require("firebase-functions/v2");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const connectDb = require("./config/db");
const routes = require("./routes/route.js");
const authRoutes = require('./routes/authRoutes');

// Initialize Firebase Admin
admin.initializeApp();

const app = express();

// Middleware
app.use(cors({ 
  origin: true, // This allows any origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB when the function is invoked
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404- Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Not Found'
  });
});

// Export the API
exports.orthoAPI = functions.https.onRequest(app);
