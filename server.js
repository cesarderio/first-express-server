'use strict';

// ***** REQUIRES **********
const { response } = require('express');
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
// const axios = require('axios');
const getForecast = require('./modules/weather.js');
const getMovies = require('./modules/movies');
// const movie = require('./modules/movie');

const app = express();
// middleware to share resources across the internet
app.use(cors());

// define my port
const PORT = process.env.PORT || 3002;

// ***** ENDPOINTS **********
app.get('/', (request, response)=>{
  // console.log('This is showing up in my terminal');
  response.status(200).send('Welcome to my server');
});


let getWeather = async (req, res) =>{
  const { lat, lon } = req.query;
  try {
    let forecastResponse = await getForecast(lat,lon);
    res.send(forecastResponse);
  } catch (error) {
    console.error(error);
    response.statusMessage(500).send(error.message);
  }
};
app.get('/weather', getWeather);

let findMovies = async (req, res) => {
  const cityMovie = req.query.cityMovie;
  try {
    let getMoviesResponse = await getMovies(cityMovie);
    res.send(getMoviesResponse);
  } catch (error) {
    console.error(error);
    response.statusMessage(500).send(error.message);
  }
};
app.get('/movies', findMovies);

// app.get('/weather', (request, response, next)=>{
//   console.log(request);
//   let cityName = request.query.searchQuery;
//   // let city = request.query.city;
//   let lat = request.query.lat;
//   let lon = request.query.long;
//   try{
//     let cityData = data.find(city => city.city_name === cityName);
//     let groomedData = cityData.data.map(day => new Forecast(day));
//     response.status(200).send(groomedData);
//   } catch (error){
//     next(error);
//   }
// let dataToSend = new Forecast(groomedData);
// });
// class Forecast {
//   constructor(dayObj){
//     this.date = dayObj.datetime;
//     this.description = dayObj.weather.description;
//   }
// }
// catch all and should live at the bottom
app.get('*', (req, res)=>{
  res.status(404).send('This route does not exist');
});

// ***** ERROR HANDLING **********
app.use((error, request, response, next)=>{
  response.status(500).send(error.message);
});

// ***** SERVER START **********
app.listen(PORT, () => {
  console.log(`We are up and running on port ${PORT}`);
});
