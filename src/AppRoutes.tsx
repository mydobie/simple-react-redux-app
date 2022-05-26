// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { FeatureFlagsReduxUI } from './feature-flags.config';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />

      {/* EXAMPLE: Route with a redirect*/}
      <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />

      <Route path={ROUTES.VERSION} element={<Version />} />

      {/* EXAMPLE: Use which env methods to determine what is displayed */}
      {!isProd() ? (
        // EXAMPLE: Feature flag UI
        <Route path={ROUTES.FEATURE_FLAGS} element={<FeatureFlagsReduxUI />} />
      ) : null}

      {/* EXAMPLE: Route to 404 page
              NOTE: this needs to be the last in the switch */}
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
