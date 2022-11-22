import React, { ReactElement } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import DinoListItem from '../components/DinoListItem';
import DinoList from '../components/DinoList';
import { AppDispatch } from '../redux/store';
import {
  useGetDinos,
  useGetDinoErrors,
  useIsDinoLoading,
} from '../redux/selectors/dinos';

import Loading from '../components/Loading';
import { DinoType, loadDinos, setDinoSelection } from '../redux/reducers/dinos';

// *** Main component ***
const SampleDinoPage = (): ReactElement => {
  // EXAMPLE: Calling a selector
  const dinos: DinoType[] = useGetDinos();
  const error: string | null = useGetDinoErrors();
  const loading: boolean = useIsDinoLoading();

  const dispatch = useDispatch<AppDispatch>();

  useQuery({
    queryKey: [],
    queryFn: () => dispatch(loadDinos()),
    // cacheTime: 60 * 1000,
    // staleTime: 30 * 1000,
  });

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
          {!loading && error ? (
            <Alert variant='danger' role='alert'>
              {error}
            </Alert>
          ) : null}
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
