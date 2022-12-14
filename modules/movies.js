'use strict';
let cache = require('./cache.js');
const axios = require('axios');
class Movie {
  constructor(cityObj) {
    this.title = cityObj.title;
    this.overview = cityObj.overview;
    this.vote_average = cityObj.vote_average;
    this.vote_count = cityObj.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${cityObj.poster_path}`;
    this.popularity = cityObj.popularity;
    this.release_date = cityObj.release_date;
    this.timestamp = Date.now();
  }
}

function getMovies(cityMovie) {
  console.log('made it into getMovies');
  const key = 'movies:' + cityMovie;
  // console.log('query', request);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityMovie}&language=en-US`;

  if (cache[key] && Date.now() - cache[key].timestamp < 3600) {
    console.log('Movie found');
  } else {
    console.log('Movie not found');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(url)
      .then((movieResponse) => parseMovie(movieResponse.data));
  }
  console.log('CASH', cache[key].data);
  return cache[key].data;
}

function parseMovie(movieResponse) {
  try {
    const movieArray = movieResponse.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieArray);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = getMovies;
