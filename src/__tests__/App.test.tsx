/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { act, render, screen } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router'; // see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AppRoutes from '../AppRoutes';
import App from '../App';

const mockStore = configureStore([]);
let mock: MockAdapter;

describe('App (router) tests', () => {
  let store: MockStoreEnhanced<unknown, unknown>;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('/versions.json').reply(200, {
      bootstrap: '5.1.3',
      hello: 'world',
      featureFlags: 'mydobie/featureFlags#npmbuild2.3.0',
    });
    store = mockStore({
      dinos: {
        data: [
          { id: 'a', text: 'MyDino', selected: true },
          { id: 'b', text: 'MyOtherDino', selected: true },
          { id: 'c', text: 'MyThirdDino', selected: false },
        ],
      },
      FeatureFlags: { features: [], persist: false },
    });
  });
  test('Is accessible', async () => {
    await act(async () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/']}>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </MemoryRouter>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(screen.getByTestId('homePageContainer')).toBeInTheDocument();
    });
  });

  test('404 is shown for /cannnotFindPage', () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={['/cannnotFindPage']} initialIndex={0}>
          <AppRoutes />
        </MemoryRouter>
      );
      expect(screen.queryByTestId('homePageContainer')).not.toBeInTheDocument();
      expect(screen.getByTestId('404PageContainer')).toBeInTheDocument();
    });
  });
});

describe('App renders correctly', () => {
  let store: MockStoreEnhanced<unknown, unknown>;
  beforeEach(() => {
    store = mockStore({
      dinos: {
        data: [
          { id: 'a', text: 'MyDino', selected: true },
          { id: 'b', text: 'MyOtherDino', selected: true },
          { id: 'c', text: 'MyThirdDino', selected: false },
        ],
      },
      FeatureFlags: { features: [], persist: false },
    });
  });
  test('App is accessible', async () => {
    await act(async () => {
      const { container } = render(
        <Provider store={store}>
          <App />
        </Provider>
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
});
