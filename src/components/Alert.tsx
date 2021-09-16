/* eslint-disable react/no-array-index-key */
// EXAMPLE: Alert component
/* 
This component takes errors, warnings, or success messages
*/

import React, { ReactElement } from 'react';
import { Alert } from 'react-bootstrap';

export type ErrorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

const Errors = ({
  errorArray = [],
  children = null,
  title = '',
  type = 'danger',
  displayAsHTML = false,
}: {
  errorArray?: string[];
  children?: ReactElement | string | null;
  title?: string;
  type?: ErrorType;
  displayAsHTML?: boolean;
}): ReactElement => {
  const buildFromArray = errorArray.map((error, index) =>
    displayAsHTML === true ? (
      // eslint-disable-next-line react/no-danger
      <li key={index} dangerouslySetInnerHTML={{ __html: error }} />
    ) : (
      <li key={index}>{error}</li>
    )
  );

  return (
    <Alert variant={type} data-testid='alertError'>
      {title !== '' ? <h2 className='alertTitle'>{title}</h2> : null}
      {children}
      {buildFromArray.length > 0 ? <ul>{buildFromArray}</ul> : null}
    </Alert>
  );
};

export default Errors;
