/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* This tells the application to load into the html object with an id of "root"
NOTE: There normally isn't a reason to change this file
*/

import React, { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { persistStore } from 'redux-persist';
import { FeatureFlagProvider } from 'feature-flags';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store } from './redux/store';
import './scss/index.scss';

const useRedux = process.env.REACT_APP_USE_REDUX === 'true';
const persist = process.env.REACT_APP_USE_LOCAL_STORAGE === 'true';

let RenderApp: ReactElement;

if (!useRedux) {
  RenderApp = <App />;
} else {
  RenderApp = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  if (persist) {
    const persistor = persistStore(store);

    RenderApp = (
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <FeatureFlagProvider
      persist={process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true'}
    >
      {RenderApp}
    </FeatureFlagProvider>
  </React.StrictMode>
);
