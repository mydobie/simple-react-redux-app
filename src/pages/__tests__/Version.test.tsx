/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Version from '../../pages/Version';

const mockStore = configureStore([]);

let mock: MockAdapter;
const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {}, // Prevents networking error from logging to console.
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Version tests', () => {
  let store: MockStoreEnhanced<unknown, unknown>;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock.onGet('/versions.json').reply(200, {
      bootstrap: '5.1.3',
      hello: 'world',
      featureFlags: 'mydobie/featureFlags#npmbuild2.3.0',
    });
    store = mockStore({
      FeatureFlags: { features: [], persist: false },
    });
  });
  test('Is accessible', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Version />
        </Provider>
      </QueryClientProvider>
    );
    await waitFor(() =>
      expect(screen.queryByText('Is loading')).not.toBeInTheDocument()
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData.toString());
    const { version, name } = packageJson;

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Version />
        </Provider>
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText('5.1.3')).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.queryByText('Is loading')).not.toBeInTheDocument()
    );
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(version)).toBeInTheDocument();
    expect(screen.getByText('foo')).toBeInTheDocument();
  });
});
