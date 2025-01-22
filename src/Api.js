import config from './config';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(
      `${config.API_MOVIE_ENDPOINT}popular?api_key=${config.API_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchPopularTv = async (page = 1) => {
  try {
    const response = await fetch(
      `${config.API_TV_ENDPOINT}popular?api_key=${config.API_KEY}&language=en-US&page=${page}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(
      `${config.API_MOVIE_ENDPOINT}${id}?api_key=${config.API_KEY}&language=en-US`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchTvDetails = async (id) => {
  try {
    const response = await fetch(
      `${config.API_TV_ENDPOINT}${id}?api_key=${config.API_KEY}&language=en-US`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching TV details:', error);
    throw error;
  }
};

export const searchMulti = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${config.API_SEARCH_ENDPOINT}multi?query=${encodeURIComponent(
        query
      )}&page=${page}&api_key=${config.API_KEY}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
