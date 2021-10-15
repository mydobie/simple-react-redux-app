// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import ROUTES from './AppRouteNames';

// EXAMPLE: Navigation bar
const AppNavBar = (): ReactElement => (
  <nav>
    <Nav>
      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={ROUTES.HOME}>
          Home
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink activeClassName='active' className='nav-link' to={ROUTES.DINO}>
          Dino (sample Redux page)
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={ROUTES.COLOR()}
        >
          Color Page (Simple form)
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={ROUTES.UNIVERSITIES}
        >
          MN Universities
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={ROUTES.REDIRECT}
        >
          Redirect
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={ROUTES.FEATURE_FLAGS}
        >
          Feature flags
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={ROUTES.VERSION}
        >
          Version
        </NavLink>
      </Nav.Item>
    </Nav>
  </nav>
);

export default AppNavBar;
