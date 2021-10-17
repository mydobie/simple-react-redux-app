// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FeatureFlagsReduxUI } from 'feature-flags';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <Home />
      </Route>

      <Route path={ROUTES.VERSION}>
        <Version />
      </Route>

      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS}>
          <FeatureFlagsReduxUI />
        </Route>
      ) : null}

      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </>
);

export default AppRoutes;
