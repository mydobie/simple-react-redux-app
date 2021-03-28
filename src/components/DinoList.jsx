import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { getSelectedDinosSelector } from '../redux/selectors/dinos';

const DinoList = ({ selectedDinos }) => (
  <div>
    <Row>
      <Col>
        <h2>Your selected Dinos:</h2>
        <ul>
          {/* EXAMPLE: Using map to display items from an array */}
          {selectedDinos.map((dino) => (
            <li key={dino.id}>{dino.text}</li>
          ))}
        </ul>
      </Col>
    </Row>
  </div>
);

DinoList.propTypes = {
  selectedDinos: PropTypes.arrayOf(PropTypes.object),
};
DinoList.defaultProps = {
  selectedDinos: [],
};

// EXAMPLE: Pull values from redux state via a selector
const mapStateToProps = (state) => ({
  selectedDinos: getSelectedDinosSelector(state),
});

const mapDispatchToProps = (/* dispatch */) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DinoList);
