import React, { ReactElement } from 'react';

import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import DinoListItem from '../components/DinoListItem';
import DinoList from '../components/DinoList';

import {
  useGetDinos,
  useGetDinoErrors,
  useIsDinoLoading,
} from '../redux/selectors/dinos';

import Errors from '../components/Alert';
import Loading from '../components/Loading';
import { DinoType, loadDinos, setDinoSelection } from '../redux/reducers/dinos';

const SampleDinoPage = (): ReactElement => {
  // EXAMPLE: Calling a selector
  const dinos: DinoType[] = useGetDinos();
  const error: string | null = useGetDinoErrors();
  const loading: boolean = useIsDinoLoading();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (dinos.length === 0) {
      // EXAMPLE: Calling a thunk
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
              // EXAMPLE: Calling a reducer
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
          {/* EXAMPLE: Using conditional display logic (aka show if) */}
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
    </>
  );
};

export default SampleDinoPage;
