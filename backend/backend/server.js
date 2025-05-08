const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDb = require('./config/db');
const routes = require('./routes/route.js');

// Load env vars before any other imports
dotenv.config();
if (!process.env.JWT_SECRET) {
 
  throw new Error('JWT_SECRET environment variable is not defined');
}
console.log()

// Validate required env vars
const requiredEnvVars = ['JWT_SECRET', 'PORT', 'MONGO_URI'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`Error: ${varName} is not defined in environment variables`);
        process.exit(1);
    }
});


connectDb();

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};


//Middleware
app.use(morgan('dev')); //logging middleware
app.use(express.json()); //json middleware
app.use(express.urlencoded({ extended: true })); //urlencoded middleware
app.use(cors(corsOptions)); //CORS middleware


//Routes
app.use('/api', routes); //use routes

//default route
app.get('/', (req, res) => {
    res.json({message:'API is running...'});
  });

//404 handler
app.use((req, res)=>{
    console.log(`404- Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
      success:false,
      message:'Not Found'});
});

//start the server  
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
