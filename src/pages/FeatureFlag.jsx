import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

// import { FRUITS, VEGGIES } from '../feature-flags.config';

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
    // const { features } = this.props;
    return (
      <Container>
        <Row>
          <Col>REMOVE ME</Col>
        </Row>
      </Container>
    );
  }
}

// NOTE: The values from SELECTORS will be part of the pros:
const mapStateToProps = (/* state  , props */) => ({});
// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (/* dispatch */) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFlags);
