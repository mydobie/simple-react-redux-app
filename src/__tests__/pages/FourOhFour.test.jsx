/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FourOhFour from '../../pages/FourOhFour';

const mockStore = configureStore([thunk]);

describe('404 tests', () => {
  let wrapper = '';
  let store = '';

  beforeAll(() => {
    store = mockStore({});
    store.dispatch = jest.fn();

    wrapper = mount(
      <Provider store={store}>
        <FourOhFour />
      </Provider>
    );
    wrapper.update();
  });
  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });

  /*
  // Commenting  test out.  Whenever possible, check specific items instead of a snapshot test
  it('Snapshot test on initial load', () => {
    expect(wrapper).toMatchSnapshot();
  });
  */
});
