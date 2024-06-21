import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTQ1ODY1MmE4MDlkYmRjMWJhNzM2NGFhNWU0ZDRjNyIsInN1YiI6IjY2NzUyZjI4NzE5NTBiNzg0NDhmNDlhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CqwaS-1bNgov80pO8vIycaZbUDt-Eo4dKuAvaTtUpis',
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/week`, options);
  return response.data;
};

export const getMovieByQuery = async searchQuery => {
  const response = await axios.get(
    `search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data;
};
