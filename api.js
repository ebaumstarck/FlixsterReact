import movieData from './movieData.js'
const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed'
const BAD_API_KEY = '888e22bc18f5cb106bfe4cc1f83ad8ed'
const URL_PREFIX = 'https://api.themoviedb.org/3/movie'
const NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${API_KEY}`
const BAD_NOW_PLAYING_URL = `${URL_PREFIX}/now_playing?api_key=${BAD_API_KEY}`

const isError = false
export const fetchMoviesMock = () => (
  new Promise((resolve) => {
    setTimeout(() => {
      if (isError) {
        reject({ msg: 'network error happened' })
      }
      resolve(movieData.results)
    }, 1000)
  })
)

export const fetchMovies = () => {
  return fetch(NOW_PLAYING_URL)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results);
}

export const badFetchMovies = () => {
  return fetch(BAD_NOW_PLAYING_URL)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results);
}

export const fetchMovieTrailers = (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/trailers?api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((response) => {
      const trailers = response.youtube;
      for (var i = 0; i < trailers.length; i++) {
        const trailer = trailers[i];
        if (trailer && trailer.type === 'Trailer') {
          return trailer.source;
        }
      }
      return null;
    });
}

const IMAGE_URI_PREFIX_SMALL = 'https://image.tmdb.org/t/p/w342';
const IMAGE_URI_PREFIX_BIG = 'https://image.tmdb.org/t/p/w600';
export const getPosterURI = (movie) => `${IMAGE_URI_PREFIX_SMALL}${movie.poster_path}`
export const getBackdropURI = (movie) => `${IMAGE_URI_PREFIX_BIG}${movie.backdrop_path}`
