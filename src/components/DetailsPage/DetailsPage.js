import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchMovieDetails, fetchTvDetails } from '../../Api';

const Container = styled.div`
  background-color: #1b1d1e;
  color: #e8e6e3;
  min-height: 100vh;
`;

const HeroBanner = styled.div`
  width: 100%;
  height: 400px;
  background: url(${(props) => props.image}) no-repeat center center / cover;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 20px;
  border-bottom: 3px solid #e50914;
`;

const HeroOverlay = styled.div`
  background: linear-gradient(
    to top,
    rgba(27, 29, 30, 1),
    rgba(27, 29, 30, 0.5)
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const HeroContent = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: #e8e6e3;
`;

const MainContent = styled.div`
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DetailGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: center; /* Center-align items on mobile */
  }
`;

const DetailCard = styled.div`
  background-color: #2c2f30;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  text-align: center;
  color: #fff;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%; /* Ensure full width on mobile for better alignment */
    max-width: none;
  }
`;

const Overview = styled.p`
  font-size: 1.2rem;
  color: #cccccc;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Poster = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  color: #ffd700;

  & span {
    font-size: 0.9rem;
    color: #ccc;
  }
`;

const DetailsPage = () => {
  const { type, id } = useParams();
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
      {/* Hero Section */}
      <HeroBanner
        image={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
      >
        <HeroOverlay />
        <HeroContent>
          <Title>{details.title || details.name}</Title>
          <Tagline>{details.tagline}</Tagline>
        </HeroContent>
      </HeroBanner>

      {/* Main Content */}
      <MainContent>
        {/* Overview Section */}
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <Overview>{details.overview}</Overview>
          <Ratings>
            ⭐ {details.vote_average}/10
            <span>({details.vote_count.toLocaleString()} votes)</span>
          </Ratings>
        </Section>

        {/* General Information */}
        <Section>
          <SectionTitle>General Information</SectionTitle>
          <DetailGrid>
            <DetailCard>
              <strong>Release Date:</strong>
              <p>{details.release_date || details.first_air_date}</p>
            </DetailCard>
            <DetailCard>
              <strong>Status:</strong>
              <p>{details.status}</p>
            </DetailCard>
            <DetailCard>
              <strong>Language:</strong>
              <p>{details.original_language.toUpperCase()}</p>
            </DetailCard>
            {type === 'movie' && details.runtime && (
              <DetailCard>
                <strong>Runtime:</strong>
                <p>{details.runtime} minutes</p>
              </DetailCard>
            )}
            {type === 'movie' && details.budget && (
              <DetailCard>
                <strong>Budget:</strong>
                <p>${details.budget.toLocaleString()}</p>
              </DetailCard>
            )}
            {type === 'movie' && details.revenue && (
              <DetailCard>
                <strong>Revenue:</strong>
                <p>${details.revenue.toLocaleString()}</p>
              </DetailCard>
            )}
          </DetailGrid>
        </Section>

        {/* Genres */}
        <Section>
          <SectionTitle>Genres</SectionTitle>
          <DetailGrid>
            {details.genres.map((genre) => (
              <DetailCard key={genre.id}>{genre.name}</DetailCard>
            ))}
          </DetailGrid>
        </Section>

        {type === 'movie' && details.belongs_to_collection && (
          <Section>
            <SectionTitle>Collection</SectionTitle>
            <DetailCard>
              <img
                src={`https://image.tmdb.org/t/p/w500${details.belongs_to_collection.poster_path}`}
                alt={details.belongs_to_collection.name}
                style={{
                  width: '100px',
                  borderRadius: '10px',
                  marginBottom: '10px',
                }}
              />
              <p>
                <strong>{details.belongs_to_collection.name}</strong>
              </p>
            </DetailCard>
          </Section>
        )}

        {type === 'tv' && details.networks.length > 0 && (
          <Section>
            <SectionTitle>Networks</SectionTitle>
            <DetailGrid>
              {details.networks.map((network) => (
                <DetailCard key={network.id}>
                  {network.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                      alt={network.name}
                      style={{ width: '80px', marginBottom: '10px' }}
                    />
                  )}
                  <p>{network.name}</p>
                </DetailCard>
              ))}
            </DetailGrid>
          </Section>
        )}

        {type === 'tv' && details.created_by.length > 0 && (
          <Section>
            <SectionTitle>Created By</SectionTitle>
            <DetailGrid>
              {details.created_by.map((creator) => (
                <DetailCard key={creator.id}>
                  <p>
                    <strong>{creator.name}</strong>
                  </p>
                  {creator.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${creator.profile_path}`}
                      alt={creator.name}
                      style={{
                        width: '80px',
                        borderRadius: '10px',
                        margin: '10px 0',
                      }}
                    />
                  )}
                </DetailCard>
              ))}
            </DetailGrid>
          </Section>
        )}

        {/* Production Companies */}
        <Section>
          <SectionTitle>Production Companies</SectionTitle>
          <DetailGrid>
            {details.production_companies.map((company) => (
              <DetailCard key={company.id}>
                {company.logo_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    style={{ width: '80px', marginBottom: '10px' }}
                  />
                )}
                <p>{company.name}</p>
                <p>({company.origin_country})</p>
              </DetailCard>
            ))}
          </DetailGrid>
        </Section>
      </MainContent>
    </Container>
  );
};

export default DetailsPage;
