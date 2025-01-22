import './App.css';
import styled from 'styled-components/macro';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import FourOhFour from './containers/common/FourOhFour';
import { useIsSmallScreen } from './containers/common/responsiveComponents';
import Footer from './containers/common/Footer';
import Header from './containers/common/Header';
import { AppContext } from './AppContext';
import LandingPage from './containers/LandingPage/LandingPage';
import { fetchPopularMovies, fetchPopularTv } from './Api';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchResults from './components/Search/SearchResults';
import HomePage from './components/HomePage/HomePage';
import ScrollToTop from './ScrollToTop';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: rgba(232, 230, 227, 0.85);
  background-color: rgb(27, 29, 30);
  ${({ isMobile }) => isMobile && 'overflow-x: hidden;'}
  max-width: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding-top: 64px;
  min-height: 100vh;
`;

const AppWrapper = withRouter(({ children }) => {
  const { isTabletOrMobile } = useIsSmallScreen();
  return (
    <AppContainer isMobile={isTabletOrMobile}>
      <Header />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </AppContainer>
  );
});

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetchPopularMovies();
        setPopularMovies(movies?.results || []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    const getTvShows = async () => {
      try {
        const tvShows = await fetchPopularTv();
        setPopularTvShows(tvShows?.results || []);
      } catch (error) {
        console.error('Error fetching popular TV shows:', error);
      }
    };

    getMovies();
    getTvShows();
  }, []);

  return (
    <AppContext.Provider>
      <>
        <Router>
          <ScrollToTop />
          <QueryParamProvider ReactRouterRoute={Route}>
            <AppWrapper>
              <Switch>
                <Route exact path="/movies">
                  <LandingPage
                    fetchFunction={fetchPopularMovies}
                    title="Popular Movies"
                    type="movie"
                  />
                </Route>
                <Route exact path="/tv">
                  <LandingPage
                    fetchFunction={fetchPopularTv}
                    title="Popular TV Shows"
                    type="tv"
                  />
                </Route>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/details/:type/:id">
                  <DetailsPage />
                </Route>
                <Route exact path="/search">
                  <SearchResults />
                </Route>
                <Route>
                  <FourOhFour />
                </Route>
              </Switch>
            </AppWrapper>
          </QueryParamProvider>
        </Router>
      </>
    </AppContext.Provider>
  );
};

export default App;
