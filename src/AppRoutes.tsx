// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { FeatureFlagsReduxUI } from './feature-flags.config';
import { isProd } from './js/whichEnv';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Dino from './pages/Dino';
import Version from './pages/Version';
import Color from './pages/ColorPage';
import RedirectPage from './pages/RedirectPage';
import University from './pages/UniversityPages';
import Flowers from './pages/FlowerPage';
import Tulips from './components/Flowers/Tulips';
import Daisies from './components/Flowers/Daisies';
import AnimalPage from './pages/AnimalPage';
import FourOhFour from './pages/FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />

      {/* EXAMPLE: Route with a redirect*/}
      <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />

      <Route path={ROUTES.DINO} element={<Dino />} />

      {/* EXAMPLE: Nested routes */}
      <Route path={ROUTES.FLOWERS} element={<Flowers />}>
        <Route index element={<Tulips />} />
        <Route path={ROUTES.FLOWER_TABS.TULIPS} element={<Tulips />} />
        <Route path={ROUTES.FLOWER_TABS.DAISIES} element={<Daisies />} />
      </Route>

      {/* EXAMPLE: Route with values in url */}
      <Route path={ROUTES.COLOR} element={<Color />}>
        <Route
          path={`:${ROUTES.COLOR_PARAMS.COLOR_NAME}`}
          element={<Color />}
        />
      </Route>

      <Route path={ROUTES.REDIRECT} element={<RedirectPage />} />

      {/* EXAMPLE: Route to a component without props */}
      <Route path={ROUTES.UNIVERSITIES} element={<University />} />

      {/* EXAMPLE: Route optional parameters */}
      {/* Simulates:  /animal/:animaltype?/name/:animalname? */}
      <Route path={ROUTES.ANIMAL} element={<AnimalPage />}>
        <Route
          path={`:${ROUTES.ANIMAL_PARAMS.ANIMAL_TYPE}`}
          element={<AnimalPage />}
        >
          <Route
            path={`${ROUTES.ANIMAL_PARAMS.ANIMAL_NAME}`}
            element={<AnimalPage />}
          >
            <Route
              path={`:${ROUTES.ANIMAL_PARAMS.ANIMAL_NAME}`}
              element={<AnimalPage />}
            />
          </Route>
        </Route>
      </Route>

      <Route path={ROUTES.VERSION} element={<Version />} />

      {/* EXAMPLE: Use which env methods to determine what is displayed */}
      {!isProd() ? (
        // EXAMPLE: Feature flag UI
        <Route path={ROUTES.FEATURE_FLAGS} element={<FeatureFlagsReduxUI />} />
      ) : null}

      {/* EXAMPLE: Route to 404 page
              NOTE: this needs to be the last in the switch */}
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
