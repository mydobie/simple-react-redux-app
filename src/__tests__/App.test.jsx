/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
import { axe } from 'jest-axe';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { MemoryRouter } from 'react-router'; // see https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
import App from '../App';

const mockStore = configureStore([]);

describe('App (router) tests', () => {
  let store = '';
  beforeEach(() => {
    store = mockStore({}); // enter starting store
    store.dispatch = jest.fn();
  });
  test('Is accessible', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/version']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const results = await axe(`${wrapper.html()}`);
    expect(results).toHaveNoViolations();
  });

  test('Version component is shown for /version route', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/version']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Version')).toHaveLength(1);
    expect(wrapper.find('Home')).toHaveLength(0);
  });
  test('Version component is shown for unknown route', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/iAmNotAValidPath']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('FourOhFour')).toHaveLength(1);
    expect(wrapper.find('Version')).toHaveLength(0);
    expect(wrapper.find('Home')).toHaveLength(0);
  });
  test('404 is shown for /cannnotFindPage', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/cannnotFindPage']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('FourOhFour')).toHaveLength(1);
    expect(wrapper.find('Version')).toHaveLength(0);
    expect(wrapper.find('Home')).toHaveLength(0);
    expect(wrapper.find('SampleDinoPage')).toHaveLength(0);
  });
});
