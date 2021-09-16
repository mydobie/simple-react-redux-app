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

      <ul data-testid='dinoSelectList'>
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
            <>
              {dinoList}
              <DinoList />
            </>
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

export default SampleDinoPage;
