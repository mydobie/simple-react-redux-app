/* eslint-disable no-console */

import React, { ReactElement } from 'react';

import { Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import DinoListItem from '../components/DinoListItem';
import DinoList from '../components/DinoList';
import { RootState } from '../redux/store';

import {
  getDinosSelector,
  getDinoErrorSelector,
  isDinosLoadingSelector,
} from '../redux/selectors/dinos';

import Errors from '../components/Alert';
import Loading from '../components/Loading';
import { DinoType, loadDinos, setDinoSelection } from '../redux/reducers/dinos';

const SampleDinoPage = (): ReactElement => {
  const dinos: DinoType[] = useSelector((state: RootState) =>
    getDinosSelector(state)
  );
  const error: string | null = useSelector((state: RootState) =>
    getDinoErrorSelector(state)
  );

  const loading: boolean = useSelector((state: RootState) =>
    isDinosLoadingSelector(state)
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (dinos.length === 0) {
      dispatch(loadDinos());
    }
  }, [dinos, dispatch]);

  const dinoList = (
    <div>
      <h2>Please select dinosaurs:(stored in Redux)</h2>

      <ul>
        {dinos.map((dino) => (
          <DinoListItem
            testid='dinoListItem'
            key={dino.id}
            dinoName={dino.text}
            dinoId={dino.id}
            checked={dino.selected}
            changeCheckBox={(dinoId, checked) =>
              dispatch(setDinoSelection({ id: dinoId, selected: checked }))
            }
          />
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <Row>
        <Col>
          <h1>Dino Sample Page</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {!loading && error ? <Errors>{error}</Errors> : null}
          {loading ? <Loading /> : null}
          {!loading && !error ? (
            <div id='dinoLists'>
              {dinoList}
              <DinoList />
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <hr />
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
          </p> */}
        </Col>
      </Row>
    </>
  );
};

// SampleDinoPage.defaultProps = {
//   dinos: [],
//   loading: false,
//   onDinoSelect: () => {},
//   error: null,
// };

// // NOTE: The values from selectors will be part of the pros:
// const mapStateToProps = (state) => ({
//   // EXAMPLE: Calling a selector to get values from redux state
//   dinos: getDinosSelector(state),
//   loading: isDinosLoadingSelector(state),
//   error: getDinoErrorSelector(state),
// });

// // NOTE: Functions passed from Thunks and Actions passed to the props
// const mapDispatchToProps = (dispatch) => ({
//   // EXAMPLE: Calling a thunk (aka aside action with a ajax call)
//   startLoadingDinos: () => dispatch(loadDinosThunk()),
//   getRandomDino: async () => dispatch(loadDinoRandomThunk()),
//   // EXAMPLE: Calling an action
//   onDinoSelect: (dinoId, selected) =>
//     dispatch(setDinoSelectedAction(dinoId, selected)),
// });

export default SampleDinoPage;
