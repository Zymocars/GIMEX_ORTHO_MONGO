// config/cors.js

const cors = require('cors');

const corsOptions = {
  origin: 'https://gimex-ortho-mongo-frontend.vercel.app',  // Replace with your frontend URL
  credentials: true,  // Allows cookies with cross-origin requests
};

module.exports = cors(corsOptions);  // Export the configured CORS middleware

