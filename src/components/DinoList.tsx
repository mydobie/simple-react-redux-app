import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { getSelectedDinosSelector } from '../redux/selectors/dinos';

// EXAMPLE: Using styled-components
const Li = styled.li`
  font-size: 20px;
  color: #7b027b;
  font-family: serif;
  border-bottom: 1px solid #ccc;
`;

const DinoList = (): ReactElement => {
  const selectedDinos = useSelector(getSelectedDinosSelector);
  return (
    <div>
      <Row>
        <Col>
          <h2>Your selected Dinos:</h2>
          <ul data-testid='dinoSelectedList' style={{ margin: '30px' }}>
            {/* EXAMPLE: Using map to display items from an array */}
            {selectedDinos.map((dino) => (
              <Li key={dino.id}>{dino.text}</Li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default DinoList;
