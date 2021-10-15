// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// START FEATURE FLAGS
import { loadFeatureFlagsRedux, isFeatureActive } from 'feature-flags';
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

// eslint-disable-next-line arrow-body-style
const Footer = (): ReactElement => {
  // EXAMPLE: Show/Hide based on feature flag
  const isColors = useSelector((state) => isFeatureActive('COLORS', state));
  return (
    <footer>
      <Card bg='light' style={{ marginTop: '20px' }}>
        {isColors ? (
          <>
            <Card.Body>
              <strong>Colors:</strong> Red, Orange, Yellow, Green, Blue, Violet
            </Card.Body>
          </>
        ) : null}
      </Card>
    </footer>
  );
};

const App = (): ReactElement => {
  // EXAMPLE: Load feature flags to redux store
  useDispatch()(
    loadFeatureFlagsRedux({
      features: featureFlagArray,
      overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
      persist:
        process.env.REACT_APP_USE_LOCAL_STORAGE === 'true' &&
        process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true',
    })
  );

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
