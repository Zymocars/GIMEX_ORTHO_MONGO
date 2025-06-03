const functions = require("firebase-functions/v2");
const express = require("express");
const cors = require("cors");
// const corsOptions  = require("./config/cors"); // Import CORS options
const admin = require("firebase-admin");
const connectDb = require("./config/db");
const routes = require("./routes/route.js");

// Initialize Firebase Admin
admin.initializeApp();

const app = express();

// Enable CORS for all origins
// app.use(cors({origin: "*"}));
app.use(
  cors({
    origin: "*",
  })
);

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
app.use("/api", routes);

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
