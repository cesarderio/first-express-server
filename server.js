'use strict';
// ***** REQUIRES **********
const express = require('express');
require('dotenv').config();
// let data = require('./data/weather.json');
const cors = require('cors');
const getForecast = require('./modules/weather.js');
const getMovies = require('./modules/movies');

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

let getWeather = async (request, response) =>{
  const { lat, lon } = request.query;
  try {
    let forecastResponse = await getForecast(lat,lon);
    response.send(forecastResponse);
  } catch (error) {
    console.error(error);
    response.status(500).send(error.message);
  }
};
app.get('/weather', getWeather);

let findMovies = async (request, response) => {
  const cityMovie = request.query.citymovie;
  // console.log(cityMovie, 'city movie is cityMovie');
  try {
    let getMoviesResponse = await getMovies(cityMovie);
    console.log('get movie call', getMoviesResponse);
    response.send(getMoviesResponse);
  } catch (error) {
    console.error(error);
    response.status(500).send(error.message);
  }
};
app.get('/movies', findMovies);

// catch all and should live at the bottom
app.get('*', (request, response)=>{
  response.status(404).send('This route does not exist');
});

// ***** ERROR HANDLING **********
app.use((error, request, response, next)=>{
  response.status(500).send(error.message);
});

// ***** SERVER START **********
app.listen(PORT, () => {
  console.log(`We are up and running on port ${PORT}`);
});
