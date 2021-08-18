// NOTE This is a sample page and should either be
// modified or removed from a real project

import React, { ReactElement } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Loading from '../components/Loading';

const Home = (): ReactElement => (
  <Container>
    <Row>
      <Col>
        <Card bg='secondary' text='white'>
          <Card.Body>
            <h1>Sample Application </h1>
            <p>This is the home page for an application</p>
          </Card.Body>
        </Card>
        <Loading>We are loading data</Loading>
      </Col>
    </Row>
  </Container>
);

export default Home;
