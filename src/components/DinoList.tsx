import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

// *** Import selectors ***
import { useGetSelectedDinos } from '../redux/selectors/dinos';

interface Props {
  textColor?: string;
}

// EXAMPLE: Using styled-components with props
const Li = styled.li<Props>`
  font-size: 20px;
  color: ${(props) => props.textColor || '#7b027b'};
  font-family: serif;
  border-bottom: 1px solid #ccc;
`;

// *** Main component ***
const DinoList = (): ReactElement => {
  // *** Selectors ***
  const selectedDinos = useGetSelectedDinos();

  // *** Return ***
  return (
    <div>
      <Row>
        <Col>
          <h2>Your selected Dinos:</h2>
          <ul data-testid='dinoSelectedList' style={{ margin: '30px' }}>
            {/* EXAMPLE: Using map to display items from an array */}
            {selectedDinos.map((dino, index) => (
              // Only the first item will have a custom text color
              <Li key={dino.id} textColor={index === 0 ? '#e167e4' : undefined}>
                {dino.text}
              </Li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default DinoList;
