import React from 'react';
// import PropTypes from 'prop-types';
// import {  } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { } from '../redux/thunks/MY_THUNK_FILE';
// import { } from '../redux/actions/MY_ACTIONS_FILE';
// import { } from '../redux/selectors/MY_SELECTORS_FILE';

class SAMPLE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    // const {} = this.props;
    // const {} = this.state;

    return (
      <div>
        <strong>CONTENT GOES HERE</strong>
      </div>
    );
  }
}

SAMPLE.propTypes = {};
SAMPLE.defaultProps = {};

// NOTE: The values from SELECTORS will be part of the props:
const mapStateToProps = (state) => ({});

// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SAMPLE);
