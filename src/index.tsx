/* This tells the application to load into the html object with an id of "root"
NOTE: There normally isn't a reason to change this file
*/

import React, { ReactElement } from 'react';
import { persistStore } from 'redux-persist';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store } from './redux/store';
import './scss/index.scss';

const useRedux = process.env.REACT_APP_USE_REDUX === 'true';
const persist = process.env.REACT_APP_USE_REDUX_PERSIST === 'true';

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

ReactDOM.render(RenderApp, document.getElementById('root'));
