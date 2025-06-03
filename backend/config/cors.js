// config/cors.js

const cors = require('cors');

const corsOptions = {
  origin: [
    'https://gimexortho.com', 
    'https://www.gimexortho.com',
    
  ],
  credentials: true,  // Allows cookies with cross-origin requests
};

module.exports = cors(corsOptions);  // Export the configured CORS middleware

