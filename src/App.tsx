// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const Router =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

// START FEATURE FLAGS
import { loadFeatureFlagsRedux } from 'feature-flags';
import { featureFlagArray } from './feature-flags.config';
// END FEATURE FLAGS

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
    <Card bg='light' style={{ marginTop: '20px' }}>
      {/* Footer content goes here */}
    </Card>
  </footer>
);

const App = (): ReactElement => {
  // START FEATURE FLAGS
  useDispatch()(
    loadFeatureFlagsRedux({
      features: featureFlagArray,
      overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
      persist:
        process.env.REACT_APP_USE_LOCAL_STORAGE === 'true' &&
        process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true',
    })
  );
  // END FEATURE FLAGS

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
