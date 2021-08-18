/*
Simple component to display a loading icon
*/

import React, { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = ({
  size = '60px',
  color = 'secondary',
  children = 'Loading',
}: {
  size?: string;
  color?: string;
  children?: ReactElement | string;
}): ReactElement => (
  <div style={{ display: 'inline-block' }}>
    <Spinner
      style={size === 'sm' ? undefined : { width: size, height: size }}
      variant={color}
      animation='border'
      role='status'
      size={size === 'sm' ? size : undefined}
    >
      <span className='sr-only visually-hidden'>{children}</span>
    </Spinner>
  </div>
);

export default Loading;
