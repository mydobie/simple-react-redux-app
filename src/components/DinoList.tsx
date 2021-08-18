import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getSelectedDinosSelector } from '../redux/selectors/dinos';
// import { DinoType } from '../redux/reducers/dinos';

const DinoList = (): ReactElement => {
  const selectedDinos = useSelector(getSelectedDinosSelector);
  return (
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
};

export default DinoList;
