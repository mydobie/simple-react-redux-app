import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import {
  isFeatureActive,
  FeatureFlagsReduxUI,
  getFeatures,
} from 'feature_flags';
import { FRUITS, VEGGIES } from '../feature-flags.config';

class FeatureFlags extends React.Component {
  static fruitsList() {
    return (
      <div>
        <h2>Fruits</h2>
        <ul>
          <li>Apples</li>
          <li>Grapes</li>
          <li>Oranges</li>
        </ul>
      </div>
    );
  }

  static veggieList() {
    return (
      <div>
        <h2>Vegetables</h2>
        <ul>
          <li>Broccoli</li>
          <li>Carrots</li>
          <li>Spinach</li>
        </ul>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { features } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <h1>Features based on feature flags</h1>
            <p>
              {`This page as a read only view of which features are active along
              with simple sections below based on feature flag status. Please
              use the 'Feature flags' option in the main navigation to change the
              status of a feature flag.`}
            </p>
            {/* EXAMPLE: List feature flags (read only) */}
            <FeatureFlagsReduxUI readonly />
            <hr />
            {/* EXAMPLE: Show/Hide based on feature flag */}
            {isFeatureActive(FRUITS, features)
              ? FeatureFlags.fruitsList()
              : null}
            {isFeatureActive(VEGGIES, features)
              ? FeatureFlags.veggieList()
              : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

FeatureFlags.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  features: PropTypes.array,
};
FeatureFlags.defaultProps = { features: [] };

// NOTE: The values from SELECTORS will be part of the pros:
const mapStateToProps = (state /* , props */) => ({
  features: getFeatures(state),
});
// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (/* dispatch */) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFlags);
