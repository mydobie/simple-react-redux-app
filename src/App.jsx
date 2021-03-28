/* eslint-disable import/order */
// Contains routing and any application wide items like headers, footers and navigation

import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { UmnHeader, UmnFooter } from 'umn_web_template_components';

import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { isDev, isTest } from './js/whichEnv';

// START FEATURE FLAGS
import { loadFeatureFlags } from 'feature_flags';
import { featureFlagArray } from './feature-flags.config';
// END FEATURE FLAGS

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

import SetAxios from './components/SetAxios';

const envBanner = () => {
  if (isDev()) {
    return (
      <Alert variant='warning'>
        This is a <strong>development</strong> environment.
      </Alert>
    );
  }
  if (isTest()) {
    return (
      <Alert variant='primary'>
        This is a <strong>test</strong> environment.
      </Alert>
    );
  }
  return null;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateFeatures = this.updateFeatures.bind(this);
  }

  async componentDidMount() {
    // START FEATURE FLAGS
    // NOTE: featureFlagArray is from feature-flags.config.js file
    const { loadFeatureToRedux } = this.props;
    // EXAMPLE: Load feature flags to redux store
    loadFeatureToRedux(featureFlagArray);
    //  END FEATURE FLAGS
  }

  componentWillUnmount() {}

  // eslint-disable-next-line class-methods-use-this
  updateFeatures(features) {
    // NOTE:  You can do an ajax call to send updated feature flags here
  }

  render() {
    const basename = '';
    return (
      <div>
        {envBanner()}
        <Router basename={basename}>
          <SetAxios />
          <UmnHeader />
          <AppNavBar />
          <main>
            <AppRoutes onFeatureChange={this.updateFeatures} />
          </main>
          <UmnFooter />
        </Router>
      </div>
    );
  }
}

// ENABLE FOR FEATURE FLAGS
App.propTypes = {
  // START FEATURE FLAGS
  loadFeatureToRedux: PropTypes.func.isRequired,
  // END FEATURE FLAGS
};

const mapStateToProps = (state) => ({});

// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (dispatch) => ({
  // START FEATURE FLAGS
  loadFeatureToRedux: (features) => dispatch(loadFeatureFlags(features, true)),
  // END FEATURE FLAGS
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
