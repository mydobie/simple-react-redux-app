/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import thunk from 'redux-thunk';

import SAMPLE_REDUX from '../pages/SAMPLE_REDUX';
import {} from '../redux/actions/SAMPLE';

const mockStore = configureStore([thunk]);

describe('Sample Dino Page component tests', () => {
  let wrapper = '';
  let store = '';

  beforeEach(() => {
    store = mockStore({}); // enter starting store
    store.dispatch = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <SAMPLE_REDUX />
      </Provider>
    );
  });
  afterEach(() => {
    store.dispatch.mockClear();
  });

  test('Component is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  test('Action is called on component load', () => {
    // expect(store.dispatch).toHaveBeenCalledTimes(1);
    // expect(store.dispatch).toHaveBeenLastCalledWith(MY_ACTION());
  });
});
