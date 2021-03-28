import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import Loading from '../components/Loading';
import DinoListItem from '../components/DinoListItem';
import DinoList from '../components/DinoList';
import { loadDinosThunk, loadDinoRandomThunk } from '../redux/thunks/dinos';
import { setDinoSelectedAction } from '../redux/actions/dinos';
import {
  getDinosSelector,
  isDinosLoadingSelector,
  getDinoErrorSelector,
} from '../redux/selectors/dinos';

import Errors from '../components/Alert';

class SampleDinoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { randomDino: null };
    this.dinoList = this.dinoList.bind(this);
    this.handleSelectDinoToggle = this.handleSelectDinoToggle.bind(this);
    this.handleGetRandomDino = this.handleGetRandomDino.bind(this);
  }

  componentDidMount() {
    const { startLoadingDinos, dinos } = this.props;
    // Only load dinos if the array in the store is empty
    if (dinos.length === 0) {
      startLoadingDinos();
    }
  }

  handleSelectDinoToggle(dinoId, checked) {
    const { onDinoSelect } = this.props;
    return onDinoSelect(dinoId, checked);
  }

  async handleGetRandomDino() {
    const { getRandomDino } = this.props;

    // EXAMPLE: Using a value returned from a thunk
    const randomDino = await getRandomDino();
    this.setState({ randomDino });
  }

  dinoList() {
    const { dinos } = this.props;
    return (
      <div>
        <h2>Please select dinosaurs:(stored in Redux)</h2>

        <ul>
          {dinos.map((dino) => (
            <DinoListItem
              key={dino.id}
              dinoName={dino.text}
              dinoId={dino.id}
              checked={dino.selected}
              changeCheckBox={this.handleSelectDinoToggle}
            />
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { loading, error } = this.props;
    const { randomDino } = this.state;
    return (
      // EXAMPLE: Calling a loading a screen
      <LoadingOverlay active={loading} spinner={<Loading color='light' />}>
        <Container>
          <Row>
            <Col>
              <h1>Dino Sample Page</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              {error !== null && <Errors>{error}</Errors>}

              {loading === false && error === null ? (
                <div id='dinoLists'>
                  {this.dinoList()}
                  <DinoList />
                </div>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
              <h2>Get a random dino (stored in component state)</h2>
              <p>
                {randomDino !== null ? (
                  `Your Dino is a ${randomDino}`
                ) : (
                  <Button
                    id='getRandomDinoButton'
                    onClick={this.handleGetRandomDino}
                  >
                    Get your random dino
                  </Button>
                )}
              </p>
            </Col>
          </Row>
        </Container>
      </LoadingOverlay>
    );
  }
}

SampleDinoPage.propTypes = {
  startLoadingDinos: PropTypes.func.isRequired, // from thunks (see below)
  getRandomDino: PropTypes.func.isRequired,
  dinos: PropTypes.arrayOf(PropTypes.object), // from selector (see below)
  loading: PropTypes.bool, // from selector (see below)
  onDinoSelect: PropTypes.func, // from actions (see below)
  error: PropTypes.string, // from selector (see below)
};
SampleDinoPage.defaultProps = {
  dinos: [],
  loading: false,
  onDinoSelect: () => {},
  error: null,
};

// NOTE: The values from selectors will be part of the pros:
const mapStateToProps = (state) => ({
  // EXAMPLE: Calling a selector to get values from redux state
  dinos: getDinosSelector(state),
  loading: isDinosLoadingSelector(state),
  error: getDinoErrorSelector(state),
});

// NOTE: Functions passed from Thunks and Actions passed to the props
const mapDispatchToProps = (dispatch) => ({
  // EXAMPLE: Calling a thunk (aka aside action with a ajax call)
  startLoadingDinos: () => dispatch(loadDinosThunk()),
  getRandomDino: async () => dispatch(loadDinoRandomThunk()),
  // EXAMPLE: Calling an action
  onDinoSelect: (dinoId, selected) =>
    dispatch(setDinoSelectedAction(dinoId, selected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SampleDinoPage);
