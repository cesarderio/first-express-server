'use strict';
let cache = require('./cache.js');
const axios = require('axios');

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.datetime;
    this.lat = dayObj.lat;
    this.lon = dayObj.lon;
    this.description =
      'Low of ' +
      dayObj.low_temp +
      ', High of ' +
      dayObj.high_temp +
      ' with ' +
      dayObj.weather.description.toLowerCase();
  }
}

let getForecast = (lat,lon) => {
  console.log('made it into getForecast');
  const key = 'weather:'+ lat + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
  console.log(url);
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Weather found', key);
  } else {
    console.log('Weather not found');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(weatherResponse => parseWeather(weatherResponse.data));
  }
  return cache[key].data;
};

let parseWeather = (weatherResponse) =>{
  try {
    const weatherArray = weatherResponse.data.map(weather => {
      return new Forecast(weather);
    });
    return Promise.resolve(weatherArray);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = getForecast;
