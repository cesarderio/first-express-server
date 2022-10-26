'use strict';

// ***** REQUIRES **********
const { response } = require('express');
const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
// const cors = require('cors');
// const axios = require('axios');
// const getForecast = require('');

console.log('hello hello');

// once express is in we need to use it - per express docs
// app === server
const app = express();

// middleware to share resources across the internet
// app.use(cors);

// define my port
const PORT = process.env.PORT || 3002;
// 3002 - if my server is up on 3002, then I know there is something wrong with my .env file or I didn't bring in dotenv library

// ***** ENDPOINTS **********
// Base endpoint
app.get('/', (request, response)=>{
  console.log('This is showing up in my terminal');
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response)=>{
  console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server`);
});

app.get('/weather', (request, response, next)=>{
  try{
    //let lat =
    // let lon =
    //let searchquerylocation =
    // const { lat, lon, response } = request.query
    console.log('hello test');

    let city = request.query.city;
    // let petData = data.find(pet => pet.species === species);
    let dataToFind = data.find(weather => weather.city === city);

    let dataToSend = new CityForecast(dataToFind);

    // let mapToFind = dataToSend.data.map(data => ({ date: data.datetime, description: `Low of ${data.low_temp}, High of ${data.high_temp} and ${data.weather.description}`
    // }));

    response.status(200).send(dataToSend);
  } catch(error){
    next(error);
  }
});

class CityForecast {
  constructor(cityObj){
    this.name = cityObj.city_name;
    this.lat = cityObj.lat;
    this.lon = cityObj.lon;
    this.low_temp = cityObj.data.low_temp;
  }
}


// catch all and should live at the bottom
app.get('*', (request, response)=>{
  response.status(404).send('This route does not exist');
});

// ***** ERROR HANDLING **********
//errors
//handle any error
app.use((error, request, next)=>{
  response.status(500).send(error.message);
});

// ***** SERVER START **********
app.listen(PORT, () => {
  console.log(`We are up and running on port ${PORT}`);
});
