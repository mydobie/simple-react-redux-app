// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import { HOME_ROUTE, VERSION_ROUTE, DINO_ROUTE } from './AppRouteNames';

import Home from './pages/Home';
import Dino from './pages/Dino';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Switch>
      <Route path={HOME_ROUTE} exact>
        <Home />
      </Route>

      <Route path={DINO_ROUTE}>
        <Dino />
      </Route>

      <Route path={VERSION_ROUTE}>
        <Version />
      </Route>

      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </>
);

export default AppRoutes;
