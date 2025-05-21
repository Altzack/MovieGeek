import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchPopularMovies, fetchPopularTv } from '../../Api';

// Styled Components
const Container = styled.div`
  padding: 20px;
  background-color: #1b1d1e;
  color: #e8e6e3;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.5rem;
  color: #aaaaaa;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(Link)`
  padding: 12px 24px;
  font-size: 1.2rem;
  color: #fff;
  background-color: #e50914;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b20710;
  }
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NewsCard = styled.div`
  background-color: #2c2f30;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: #fff;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NewsCardTitle = styled.h3`
  margin-bottom: 10px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const ItemCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ItemPoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const HomePage = () => {
  const [topRatedContent, setTopRatedContent] = useState([]);
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Breaking: New Season of Arcane Announced!',
      summary:
        'Netflix has just announced the release of Arcane Season 2, set to debut later this year...',
      link: '/news/arcane-season-2',
    },
    {
      id: 2,
      title: 'Top 10 Must-Watch Movies of 2024',
      summary:
        'Discover the hottest movies of the year that you simply can’t miss...',
      link: '/news/top-movies-2024',
    },
  ]);

  useEffect(() => {
    const fetchTopRated = async () => {
      const movies = await fetchPopularMovies();
      const tvShows = await fetchPopularTv();
      setTopRatedContent([
        ...movies.results.slice(0, 4),
        ...tvShows.results.slice(0, 4),
      ]);
    };

    fetchTopRated();
  }, []);

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>Welcome to MovieGeek</HeroTitle>
        <HeroTagline>Discover the latest Movies and TV Shows</HeroTagline>
        <CTAButton to="/movies">Explore Now</CTAButton>
      </HeroSection>

      {/* Top-Rated Section */}
      <Section>
        <SectionTitle>Top-Rated Movies & TV Shows</SectionTitle>
        <ItemsGrid>
          {topRatedContent.map((item) => {
            const mediaType = item.media_type || (item.title ? 'movie' : 'tv'); // Determine type
            return (
              <ItemCard key={item.id} to={`/details/${mediaType}/${item.id}`}>
                <ItemPoster
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <ItemTitle>{item.title || item.name}</ItemTitle>
              </ItemCard>
            );
          })}
        </ItemsGrid>
      </Section>
    </Container>
  );
};

export default HomePage;
