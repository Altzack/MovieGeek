import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMovieDetails, fetchTvDetails } from '../../Api';

const Container = styled.div`
  padding: 20px;
  background-color: #1b1d1e;
  color: #e8e6e3;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: #aaaaaa;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Overview = styled.p`
  font-size: 1rem;
  color: #cccccc;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const ListItem = styled.li`
  background-color: #2c2f30;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 8px 10px;
  }
`;

const DetailRow = styled.div`
  margin: 10px 0;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const DetailsPage = () => {
  const { type, id } = useParams(); // Extract type (movie or tv) and id from URL
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data =
          type === 'movie'
            ? await fetchMovieDetails(id)
            : await fetchTvDetails(id);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [type, id]);

  if (!details) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      {/* Header Section */}
      <Header>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title || details.name}
        />
        <Info>
          <Title>{details.title || details.name}</Title>
          <Tagline>{details.tagline}</Tagline>
          <Overview>{details.overview}</Overview>
        </Info>
      </Header>

      {/* General Information */}
      <Section>
        <SectionTitle>General Information</SectionTitle>
        <DetailRow>
          <strong>Release Date:</strong>{' '}
          {details.release_date || details.first_air_date}
        </DetailRow>
        <DetailRow>
          <strong>Status:</strong> {details.status}
        </DetailRow>
        <DetailRow>
          <strong>Original Language:</strong> {details.original_language}
        </DetailRow>
        {type === 'movie' && details.runtime && (
          <DetailRow>
            <strong>Runtime:</strong> {details.runtime} minutes
          </DetailRow>
        )}
        {type === 'movie' && details.budget !== undefined && (
          <DetailRow>
            <strong>Budget:</strong> ${details.budget.toLocaleString()}
          </DetailRow>
        )}
        {type === 'movie' && details.revenue !== undefined && (
          <DetailRow>
            <strong>Revenue:</strong> ${details.revenue.toLocaleString()}
          </DetailRow>
        )}
      </Section>

      {/* Genres */}
      <Section>
        <SectionTitle>Genres</SectionTitle>
        <List>
          {details.genres.map((genre) => (
            <ListItem key={genre.id}>{genre.name}</ListItem>
          ))}
        </List>
      </Section>

      {/* Belongs to Collection (Movies Only) */}
      {type === 'movie' && details.belongs_to_collection && (
        <Section>
          <SectionTitle>Collection</SectionTitle>
          <ListItem>
            <img
              src={`https://image.tmdb.org/t/p/w500${details.belongs_to_collection.poster_path}`}
              alt={details.belongs_to_collection.name}
              style={{ width: '100px', marginRight: '10px' }}
            />
            <strong>{details.belongs_to_collection.name}</strong>
          </ListItem>
        </Section>
      )}

      {/* Production Companies */}
      <Section>
        <SectionTitle>Production Companies</SectionTitle>
        <List>
          {details.production_companies.map((company) => (
            <ListItem key={company.id}>
              {company.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                  alt={company.name}
                  style={{ width: '50px', marginRight: '10px' }}
                />
              )}
              {company.name} ({company.origin_country})
            </ListItem>
          ))}
        </List>
      </Section>

      {/* Spoken Languages */}
      <Section>
        <SectionTitle>Spoken Languages</SectionTitle>
        <List>
          {details.spoken_languages.map((language) => (
            <ListItem key={language.iso_639_1}>
              {language.english_name}
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
};

export default DetailsPage;
