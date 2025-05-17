const mongoose = require('mongoose');
const { defineSecret } = require("firebase-functions/params");
const dotenv = require('dotenv');
dotenv.config();

const mongoUri = process.env.MONGO_URI || defineSecret("MONGO_URI").value();
//connect to db
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;