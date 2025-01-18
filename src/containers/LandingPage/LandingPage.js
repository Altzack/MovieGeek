import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #1b1d1e;
  color: #e8e6e3;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px;
`;

const Card = styled.div`
  background-color: #2c2f30;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Details = styled.div`
  margin-top: 10px;
`;

const Title = styled.h3`
  font-size: 16px;
  color: #ffffff;
  margin: 0;
`;

const Overview = styled.p`
  font-size: 14px;
  color: #aaaaaa;
  margin: 10px 0;
`;

const ReleaseDate = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const ToggleButton = styled.button`
  background-color: #e50914;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #b00710;
  }
`;

const StyledHeader = styled.h1`
  color: #fff;
`;

const LandingPage = ({ items, title, type }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleDescription = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <Container>
      <StyledHeader>{title}</StyledHeader>
      <Grid>
        {items.map((item) => (
          <Card key={item.id}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
            />
            <Details>
              <Title>{item.title || item.name}</Title>
              <ReleaseDate>
                {type === 'movie'
                  ? `Release Date: ${item.release_date}`
                  : `First Air Date: ${item.first_air_date}`}
              </ReleaseDate>
              <Overview>
                {expandedItem === item.id
                  ? item.overview
                  : `${item.overview.slice(0, 100)}...`}
              </Overview>
              <ToggleButton onClick={() => toggleDescription(item.id)}>
                {expandedItem === item.id ? 'Show Less' : 'Show More'}
              </ToggleButton>
            </Details>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingPage;
