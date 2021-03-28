/* eslint-disable react/react-in-jsx-scope */

import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { axe } from 'jest-axe';
import DinoList from '../../components/DinoList';

const mockStore = configureStore([]);

describe('DinoList tests', () => {
  let wrapper = '';
  let store = '';
  beforeEach(() => {
    store = mockStore({
      dinos: {
        data: [
          { id: 'a', text: 'MyDino', selected: true },
          { id: 'b', text: 'MyOtherDino', selected: true },
        ],
      },
    });
    wrapper = mount(
      <Provider store={store}>
        <DinoList />
      </Provider>
    );
  });

  test('Is accessible', async () => {
    const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE mail is required to prevent landmark error
    expect(results).toHaveNoViolations();
  });
  test('Expected number of dinos are displayed', () => {
    expect(wrapper.find('ul').first().find('li')).toHaveLength(2);
  });
});
