/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router'; // see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import App from '../App';

const mockStore = configureStore([]);

describe('App (router) tests', () => {
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
  test('Is accessible', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.getByTestId('homePageContainer')).toBeInTheDocument();
  });

  test('Version component is shown for /version route', () => {
    render(
      <MemoryRouter initialEntries={['/version']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('homePageContainer')).not.toBeInTheDocument();
    expect(screen.getByTestId('versionPageContainer')).toBeInTheDocument();
  });

  test('404 is shown for /cannnotFindPage', () => {
    render(
      <MemoryRouter initialEntries={['/cannnotFindPage']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(screen.queryByTestId('homePageContainer')).not.toBeInTheDocument();
    expect(screen.getByTestId('404PageContainer')).toBeInTheDocument();
  });
});
