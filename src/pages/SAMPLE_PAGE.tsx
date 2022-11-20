import React, { ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/ban-types
type SamplePageProps = {};

// eslint-disable-next-line no-empty-pattern
const SamplePage = ({}: SamplePageProps): ReactElement => {
  // const dispatch = useDispatch();

  // eslint-disable-next-line arrow-body-style
  React.useEffect(() => {
    // *** items run on component mount ***

    return function cleanup() {
      // *** items run on component unmount ***
    };
  }, []);

  return (
    <Row>
      <Col>
        <h1>Sample Page</h1>
      </Col>
    </Row>
  );
};

export default SamplePage;
