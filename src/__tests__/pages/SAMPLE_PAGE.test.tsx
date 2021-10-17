/* eslint-disable  react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { axe } from 'jest-axe';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// import { sampleAPI } from '../../js/axios.config';
import { resetStore } from '../../redux/reducers/REDUCER_TEMPLATE';
import SAMPLE_PAGE from '../../pages/SAMPLE_PAGE';

const mockStore = configureStore([]);
let mock: MockAdapter;

describe('Component tests', () => {
  let store: MockStoreEnhanced<unknown, unknown>;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch(resetStore());

    process.env.REACT_APP_USE_MOCKS = 'false';
    mock = new MockAdapter(axios);
    // mock
    //   .onGet(sampleAPI.url())
    //   .reply(200, 'Data to be returned from ajax call');
  });

  afterEach(() => {
    mock.reset();
  });

  test('Is accessible', async () => {
    const { container } = render(
      <Provider store={store}>
        <SAMPLE_PAGE />
      </Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Is rendered', async () => {
    render(
      <Provider store={store}>
        <SAMPLE_PAGE />
      </Provider>
    );
    expect(screen.getByTestId('pageContent')).toBeInTheDocument();
  });
});
