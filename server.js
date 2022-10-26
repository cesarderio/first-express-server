'use strict';

// ***** REQUIRES **********
const { response } = require('express');
const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
// const cors = require('cors');
// const axios = require('axios');
// const getForecast = require('');



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
  // console.log('This is showing up in my terminal');
  response.status(200).send('Welcome to my server');
});

app.get('/hello', (request, response)=>{
  // console.log(request.query);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.status(200).send(`Hello ${firstName} ${lastName}! Welcome to my server`);
});

app.get('/weather', (request, response, next)=>{
  try{
    let lat = request.query.lat;
    let lon = request.query.long;
 
    //let searchquerylocation = request.query.searchquery

    // console.log('hello test');

    let city = request.query.city;
    // let petData = data.find(pet => pet.species === species);
    let dataToFind = weatherData.find(weatherDay => {
      console.log(weatherDay.city_name, ' === ', city);
      return weatherDay.city_name === city;});
    console.log('test',dataToFind);

    let dataToSend = new CityForecast(dataToFind);

    // let mapToFind = dataToSend.data.map(data => ({ date: weatherData.datetime, description: `Low of ${weathData.low_temp}, High of ${data.high_temp} and ${data.weather.description}`
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
    // this.weather = cityObj[0].weather.description;
    console.log(cityObj.data[0].weather);
    // this.low_temp = weatherData.data.low_temp;
  }
}
console.log('line 12', weatherData[0].data[0].weather.description);

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
