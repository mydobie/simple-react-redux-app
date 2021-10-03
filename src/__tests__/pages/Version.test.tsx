/* eslint-disable react/react-in-jsx-scope */
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import fs from 'fs';

import Version from '../../pages/Version';

const mockStore = configureStore([]);

describe('Version tests', () => {
  let store: MockStoreEnhanced<unknown, unknown>;
  beforeEach(() => {
    store = mockStore({
      FeatureFlags: { features: [], persist: false },
    });
  });
  test('Is accessible', async () => {
    const { container } = render(
      <Provider store={store}>
        <Version />
      </Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Displays version and app name from package.json', async () => {
    const packageData = fs.readFileSync('package.json');
    const packageJson = JSON.parse(packageData.toString());
    const { version, name } = packageJson;

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
