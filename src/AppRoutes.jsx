// Contains routing for entire application

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// START FEATURE FLAGS
import { FeatureFlagsReduxUI } from 'feature_flags';
import { isProd } from './js/whichEnv';
// END FEATURE FLAGS

import Home from './pages/Home';
import Version from './pages/Version';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (props) => {
  // START FEATURE FLAGS
  const { onFeatureChange } = props;
  // END FEATURE FLAGS

  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/version'>
          <Version />
        </Route>
        {/* // START FEATURE FLAGS */}
        {/* Only show feature flags UI for non production */}
        {!isProd() ? (
          <Route path='/featureflags'>
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
