/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen, act } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Version from '../../pages/Version';

const mockStore = configureStore([]);
let mock: MockAdapter;

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
    await act(async () => {
      const { container } = render(
        <Provider store={store}>
          <Version />
        </Provider>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData.toString());
    const { version, name } = packageJson;

    await act(async () => {
      render(
        <Provider store={store}>
          <Version />
        </Provider>
      );
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(version)).toBeInTheDocument();
      expect(screen.getByText('foo')).toBeInTheDocument();
    });
  });
});
