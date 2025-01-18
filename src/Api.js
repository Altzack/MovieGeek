import config from './config';

export const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${config.API_MOVIE_ENDPOINT}popular?language=en-US&page=1&region=AE&api_key=${config.API_KEY}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const fetchPopularTv = async () => {
  try {
    const response = await fetch(
      `${config.API_TV_ENDPOINT}top_rated?language=en-US&page=1&api_key=${config.API_KEY}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};
