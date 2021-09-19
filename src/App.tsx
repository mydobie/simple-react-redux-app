// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container } from 'react-bootstrap';

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import SetAxios from './components/SetAxios';

import './scss/index.scss';

const App = (): ReactElement => {
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
      </Router>
    </>
  );
};

export default App;
