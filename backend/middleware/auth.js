const jwt=require('jsonwebtoken');
const User=require('../model/user.js');
const dotenv = require('dotenv');
dotenv.config();
const { defineSecret } = require("firebase-functions/params");
const jwtSecret = process.env.JWT_SECRET || defineSecret("JWT_SECRET").value();

const auth=async (req, res, next) => {
    let token;
    let decoded;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
             token=req.headers.authorization.split(' ')[1]; //Bearer token

            //verify token
            decoded=jwt.verify(token,jwtSecret); //verify token using secret key
            console.log('Decoded token:', decoded);
            req.user = {
            id: decoded.id,
            isAdmin: decoded.isAdmin
            };
            console.log('user from jwt', req.user);

        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
          }

    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
    
    next();
}

module.exports=auth; 
