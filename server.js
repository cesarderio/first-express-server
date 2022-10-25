'use strict';

console.log('Yasss! Our first server!');

// ***** REQUIRES **********
const express = require('express');
require('dotenv').config();

console.log('heeyeye');

// once express is in we need to use it - per express docs
// app === server
const app = express();


// define my port
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then I know there is something wrong with my .env file or I didn't bring in dotenv library

// ***** ENDPOINTS **********

// Base endpoint

app.get('/', (request, response)=>{
  console.log('This is showing up in my terminal');
  response.status(200).send('Welcome to my server');
});


// ***** ERROR HANDLING **********



// ***** SERVER START **********
app.listen(PORT, ()=>console.log(`We are up and running on port ${PORT}`));
