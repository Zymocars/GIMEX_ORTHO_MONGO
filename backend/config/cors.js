// config/cors.js

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  credentials: true,  // Allows cookies with cross-origin requests
};

module.exports = cors(corsOptions);  // Export the configured CORS middleware

