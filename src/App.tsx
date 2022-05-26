// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const Router =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

// // START FEATURE FLAGS
import { loadFeatureFlagsRedux } from './feature-flags.config';
// // END FEATURE FLAGS

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import SetAxios from './components/SetAxios';

import './scss/index.scss';

const Header = (): ReactElement => (
  <header>
    <Card bg='dark' text='white'>
      <Card.Body>
        <Card.Title>Sample redux application</Card.Title>
      </Card.Body>
    </Card>
  </header>
);

const Footer = (): ReactElement => (
  <footer>
    <Card bg='light' style={{ marginTop: '20px' }}></Card>
  </footer>
);

const App = (): ReactElement => {
  // EXAMPLE: Load feature flags to redux store
  const dispatch = useDispatch();
  if (loadFeatureFlagsRedux()) {
    dispatch(loadFeatureFlagsRedux());
  }

  const basename = '';
  return (
    <>
      <Router basename={basename}>
        <SetAxios />
        <Header />
        <AppNavBar />
        <Container>
          <main>
            <AppRoutes />
          </main>
        </Container>
        <Footer />
      </Router>
    </>
  );
};

export default App;
