// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import { FeatureFlagsReduxUI } from 'feature-flags';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />

      <Route path={ROUTES.VERSION} element={<Version />} />

      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS} element={<FeatureFlagsReduxUI />} />
      ) : null}

      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
