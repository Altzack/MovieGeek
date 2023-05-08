// api.js

import config from './config';

export const fetchNews = async () => {
  const url =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=cd2adef1b9e94817b83d445afcfed6e0&pageSize=100';

  console.log(url);
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Response:', await response.text());
      throw new Error(`Error fetching news: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return undefined; // Add this line
  }
};
