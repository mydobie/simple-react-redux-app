/* NOTE:

There are two ways to automatically direct a user to a given route:
1. Use History Hook (only works on function based components)
2. Use redirect component (less ideal)
*/

import React, { ReactElement, useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'; // Needed for method 1
// import { Redirect } from 'react-router'; // Needed for method 2
import { Link } from 'react-router-dom';

import ROUTES from '../AppRouteNames';

const RedirectPage = (): ReactElement => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) {
      // For method 1
      return history.push(ROUTES.HOME);
      return;
    }
    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <Row>
        <Col>
          <h1>Redirect</h1>
          <p>
            You will automatically be directed to the home page in {count}{' '}
            seconds!
          </p>
          {/* Redirect component only used in method 2 */}
          {/* {count <= 0 ? <Redirect to={ROUTES.HOME} /> : null} */}
          <p>
            {/* Link to route */}
            <Link to={ROUTES.HOME}>Go to home page</Link>
          </p>
          <p>
            <Button
              onClick={() => {
                history.push(ROUTES.HOME);
              }}
              data-testid='goToHomeButton'
            >
              Go to home page
            </Button>
          </p>
        </Col>
      </Row>
    </>
  );
};

export default RedirectPage;