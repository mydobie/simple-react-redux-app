// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// START FEATURE FLAGS
import { loadFeatureFlagsRedux, isFeatureActive } from 'feature-flags';
import { featureFlagArray } from './feature-flags.config';
// END FEATURE FLAGS

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import SetAxios from './components/SetAxios';

import './scss/index.scss';

// eslint-disable-next-line arrow-body-style
const Footer = (): ReactElement => {
  // EXAMPLE: Show/Hide based on feature flag
  const isColors = useSelector((state) => isFeatureActive('COLORS', state));
  return (
    <>
      <p>
        {isColors ? (
          <>
            <strong>Colors:</strong> Red, Orange, Yellow, Green, Blue, Violet
          </>
        ) : (
          ' '
        )}
      </p>
    </>
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
