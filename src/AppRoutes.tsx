// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FeatureFlagsReduxUI } from 'feature-flags';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Dino from './pages/Dino';
import Version from './pages/Version';
import Color from './pages/ColorPage';
import Redirect from './pages/RedirectPage';
import University from './pages/UniversityPages';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <Home />
      </Route>

      <Route path={ROUTES.DINO}>
        <Dino />
      </Route>

      {/* EXAMPLE Route with values in url */}
      <Route
        path={ROUTES.COLOR('colorName')}
        render={(colorprops) => (
          <Color startingColor={colorprops.match.params.colorName || ''} />
        )}
      />

      <Route path={ROUTES.REDIRECT}>
        <Redirect />
      </Route>
      <Route path={ROUTES.UNIVERSITIES}>
        <University />
      </Route>

      <Route path={ROUTES.VERSION}>
        <Version />
      </Route>

      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS}>
          {/* EXAMPLE: Feature flag UI */}
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
