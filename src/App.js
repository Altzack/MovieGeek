import './App.css';
import styled from 'styled-components/macro';
import React from 'react';
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
  return (
    <AppContext.Provider>
      <>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <AppWrapper>
              <Switch>
                <Route exact path="/">
                  <LandingPage />
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
