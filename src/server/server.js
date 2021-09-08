/**
 * 
 * Environment variables
 */
require('dotenv').config();

/**
 * 
 * Server configuration
 */
const express = require('express');
const app = express();

/**
 * 
 * Request body in json format
 */
app.use(express.json());

/**
 * 
 * 
 * 
 * 
 * Cors
 */
const cors=require("cors");

const corsOptions ={
    origin: '*', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to my server application! 😊"
    });
});

/**
 * 
 * 
 * 
 * 
 * Routes
 */
const userRouter = require('../api/user/user.router');
app.use('/users', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is runnig on: http://localhost:${process.env.PORT}.`);
});