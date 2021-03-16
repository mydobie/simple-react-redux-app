/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Home from '../../pages/Home';

const mockStore = configureStore([thunk]);

describe('Home component tests', () => {
  let wrapper = '';
  let store = '';

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

    wrapper = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  test('Home component is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
});
