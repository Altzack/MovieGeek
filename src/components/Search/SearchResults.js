import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { searchMulti } from '../../Api';

const Container = styled.div`
  padding: 20px;
  background-color: #1b1d1e;
  color: #e8e6e3;
  min-height: 100vh;
`;

const Header = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #2c2f30;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 16px;
  color: #fff;
  margin: 10px 0;
`;

const Placeholder = styled.div`
  font-size: 18px;
  color: #ccc;
`;

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        setLoading(true);
        const data = await searchMulti(query);
        // Filter out "people" and results with null `poster_path` or `title`
        const filteredResults = (data.results || []).filter(
          (item) =>
            item.media_type !== 'person' &&
            (item.poster_path || item.profile_path) &&
            (item.title || item.name)
        );
        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const renderResults = () => {
    if (loading) {
      return <Placeholder>Loading...</Placeholder>;
    }

    if (results.length > 0) {
      return (
        <Grid>
          {results.map((item) => (
            <Link
              key={item.id}
              to={`/details/${item.media_type}/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card>
                <Poster
                  src={`https://image.tmdb.org/t/p/w500${
                    item.poster_path || item.profile_path
                  }`}
                  alt={item.title || item.name}
                />
                <Title>{item.title || item.name}</Title>
              </Card>
            </Link>
          ))}
        </Grid>
      );
    }

    return <Placeholder>No results found.</Placeholder>;
  };

  return (
    <Container>
      <Header>Search Results for "{query}"</Header>
      {renderResults()}
    </Container>
  );
};

export default SearchResults;
