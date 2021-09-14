// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container } from 'react-bootstrap';

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

// import './scss/index.scss';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/scss/bootstrap.scss';

const App = (): ReactElement => {
  const basename = '';
  return (
    <>
      <Router basename={basename}>
        <AppNavBar />
        <Container>
          <main>
            <AppRoutes />
          </main>
        </Container>
      </Router>
    </>
  );
};

export default App;
