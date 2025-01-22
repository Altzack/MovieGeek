import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const LandingPage = ({ fetchFunction, title, type }) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset page when `fetchFunction` or `type` changes
    setPage(1);
  }, [fetchFunction, type]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction(page);
        setItems(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, page]);

  const handlePrevious = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <Header>{title}</Header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Grid>
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/details/${type}/${item.id}`} // Link to details page
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card>
                  <Poster
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                  <Title>{item.title || item.name}</Title>
                </Card>
              </Link>
            ))}
          </Grid>
          <Pagination>
            <Button onClick={handlePrevious} disabled={page === 1}>
              Previous
            </Button>
            <span>
              Page {page} of {totalPages}
            </span>
            <Button onClick={handleNext} disabled={page === totalPages}>
              Next
            </Button>
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
