// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import { HOME_ROUTE, VERSION_ROUTE, DINO_ROUTE } from './AppRouteNames';

const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={HOME_ROUTE}>
          Home
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={DINO_ROUTE}>
          Dino (sample Redux page)
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={VERSION_ROUTE}
        >
          Version
        </NavLink>
      </Nav.Item>
    </Nav>
  </nav>
);

export default AppNavBar;
