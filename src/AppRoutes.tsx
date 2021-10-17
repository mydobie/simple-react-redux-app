// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FeatureFlagsReduxUI } from 'feature-flags';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Dino from './pages/Dino';
import Version from './pages/Version';
import Color from './pages/ColorPage';
import RedirectPage from './pages/RedirectPage';
import University from './pages/UniversityPages';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <Home />
      </Route>

      {/* EXAMPLE: Route with a redirect */}
      <Route path='/home' exact>
        <Redirect to={ROUTES.HOME} />
      </Route>

      <Route path={ROUTES.DINO}>
        <Dino />
      </Route>

      <Route
        path={ROUTES.COLOR('colorName')}
        render={(colorprops) => (
          <Color startingColor={colorprops.match.params.colorName || ''} />
        )}
      />

      <Route path={ROUTES.REDIRECT}>
        <RedirectPage />
      </Route>

      {/* EXAMPLE: Route to a component without props */}
      <Route path={ROUTES.UNIVERSITIES}>
        <University />
      </Route>

      <Route path={ROUTES.VERSION}>
        <Version />
      </Route>

      {/* EXAMPLE: Use which env methods to determine what is displayed */}
      {!isProd() ? (
        <Route path={ROUTES.FEATURE_FLAGS}>
          {/* EXAMPLE: Feature flag UI */}
          <FeatureFlagsReduxUI />
        </Route>
      ) : null}

      {/* EXAMPLE: Route to 404 page
              NOTE: this needs to be the last in the switch */}
      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </>
);

export default AppRoutes;
