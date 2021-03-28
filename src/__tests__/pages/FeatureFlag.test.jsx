/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FeatureFlag from '../../pages/FeatureFlag';

const mockStore = configureStore([thunk]);

describe('Version tests', () => {
  let wrapper = '';
  let store = '';

  beforeAll(() => {
    store = mockStore({ reducerFeatureFlags: { flags: [] } });
    store.dispatch = jest.fn();

    wrapper = mount(
      <Provider store={store}>
        <FeatureFlag />
      </Provider>
    );

    wrapper.update();
  });
  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
});
