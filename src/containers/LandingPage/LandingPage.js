// LandingPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sentiment from 'sentiment';
import { Button } from 'antd';
import { fetchNews } from '../../Api';

const NewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
`;

const NewsItem = styled.div`
  background-color: #282c34;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin: 20px;
  padding: 20px;
  width: 300px;
`;

const NewsImage = styled.img`
  border-radius: 5px;
  height: auto;
  max-width: 100%;
  object-fit: cover;
`;

const NewsTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const NewsDescription = styled.p`
  font-size: 0.9rem;
`;

const NewsAuthor = styled.p`
  font-weight: bold;
  margin-top: 1rem;
`;

const NewsSource = styled.p`
  font-size: 0.8rem;
  margin-top: 1rem;
`;

const LandingPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [isPositive, setIsPositive] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNews();
      if (data) {
        setNewsData(data.articles);
      }
    };

    fetchData();
  }, []);

  const removeHTMLTags = (text) => {
    return text.replace(/<[^>]*>/g, '');
  };

  const filterPositiveNews = (articles) => {
    const sentiment = new Sentiment();
    return articles.filter((article) => {
      const titleScore = sentiment.analyze(article.title).score;
      const descriptionScore = sentiment.analyze(article.description).score;
      const totalScore = titleScore + descriptionScore;

      return totalScore > 0;
    });
  };

  const filterNegativeNews = (articles) => {
    const sentiment = new Sentiment();
    return articles.filter((article) => {
      const titleScore = sentiment.analyze(article.title).score;
      const descriptionScore = sentiment.analyze(article.description).score;
      const totalScore = titleScore + descriptionScore;

      return totalScore < 0;
    });
  };

  const handleButtonClick = () => {
    setIsPositive(!isPositive);
  };
  const filteredNewsData = isPositive
    ? filterNegativeNews(newsData)
    : filterPositiveNews(newsData);

  // Render the fetched news data here
  return (
    <>
      <div>
        <Button onClick={handleButtonClick}>
          {isPositive ? 'Switch to Positive News' : 'Switch to Negative News'}
        </Button>
      </div>
      <NewsContainer>
        {filteredNewsData.map((newsItem) => (
          <NewsItem key={newsItem.url}>
            {newsItem.urlToImage && (
              <NewsImage src={newsItem.urlToImage} alt={newsItem.title} />
            )}
            <NewsTitle>{newsItem.title}</NewsTitle>
            <NewsDescription>
              {removeHTMLTags(newsItem.description)}
            </NewsDescription>
            <NewsAuthor>{newsItem.author}</NewsAuthor>
            <NewsSource>
              Source: <a href={newsItem.url}>{newsItem.source.name}</a>
            </NewsSource>
          </NewsItem>
        ))}
      </NewsContainer>
    </>
  );
};

export default LandingPage;
