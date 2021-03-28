// Contains routing for entire application

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// START FEATURE FLAGS
import { FeatureFlagsReduxUI } from 'feature_flags';
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

import {
  HOME_ROUTE,
  VERSION_ROUTE,
  FEATURE_FLAGS_ROUTE,
  DINO_ROUTE,
  SAMPLE_FEATURES_ROUTE,
} from './AppRouteNames';

import Home from './pages/Home';
import Dino from './pages/Dino';
import FeatureFlag from './pages/FeatureFlag';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (props) => {
  // START FEATURE FLAGS
  const { onFeatureChange } = props;
  // END FEATURE FLAGS

  return (
    <div>
      <Switch>
        <Route path={HOME_ROUTE} exact>
          <Home />
        </Route>

        <Route path={DINO_ROUTE}>
          <Dino />
        </Route>

        <Route path={SAMPLE_FEATURES_ROUTE}>
          {/* EXAMPLE: Feature flag UI */}
          <FeatureFlag />
        </Route>

        <Route path={VERSION_ROUTE}>
          <Version />
        </Route>

        {/* // START FEATURE FLAGS */}
        {/* Only show feature flags UI for non production */}
        {!isProd() ? (
          <Route path={FEATURE_FLAGS_ROUTE}>
            <FeatureFlagsReduxUI onFeatureChange={onFeatureChange} />
          </Route>
        ) : null}
        {/* // END FEATURE FLAGS */}

        <Route path='/'>
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  );
};

// START FEATURE FLAGS
AppRoutes.propTypes = {
  onFeatureChange: PropTypes.func,
};
AppRoutes.defaultProps = {
  onFeatureChange: () => {},
};
// END FEATURE FLAGS
export default AppRoutes;
