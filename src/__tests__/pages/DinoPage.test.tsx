/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
// import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { store } from '../../redux/store';

import mockDinos from '../__fixtures__/dinoipsum';
import DinoPage from '../../pages/Dino';

// import DinoListItem from '../../components/DinoListItem';
// import { setDinoSelectedAction } from '../../redux/actions/dinos';
// import { loadDinosThunk, loadDinoRandomThunk } from '../../redux/thunks/dinos';

const mock = new MockAdapter(axios);

describe('Sample Dino Page component tests', () => {
  beforeEach(() => {
    mock.onAny().reply(200, mockDinos);
  });

  test('Component is accessible after loading dinos', async () => {
    const { container } = render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );
    const results = await axe(container);
    expect(
      container.querySelector('[data-testid="Loading"]')
    ).not.toBeInTheDocument();
    expect(results).toHaveNoViolations();
  });

  // test('Component is accessible while loading', async () => {
  //   store = mockStore({
  //     dinos: { data: [], loading: true, error: null },
  //   });
  //   store.dispatch = jest.fn();
  //   wrapper = mount(
  //     <Provider store={store}>
  //       <DinoPage />
  //     </Provider>
  //   );
  //   const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
  //   expect(results).toHaveNoViolations();
  // });

  // test('Error is shown when there is an error in the state', () => {
  //   store = mockStore({
  //     dinos: { data: [], loading: false, error: 'I am an error' },
  //   });
  //   store.dispatch = jest.fn();
  //   wrapper = mount(
  //     <Provider store={store}>
  //       <DinoPage />
  //     </Provider>
  //   );
  //   expect(wrapper.find('Errors')).toHaveLength(1);
  //   expect(wrapper.find('#dinoLists')).toHaveLength(0);
  // });

  test('Expected number of dinos are shown and error is not shown', () => {
    const { container } = render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );
    const dinos = container.querySelectorAll('[data-testid="dinoListItem"]');
    expect(dinos).toHaveLength(mockDinos[0].length);

    dinos.forEach((dino, index) => {
      expect(dino.textContent).toEqual(mockDinos[0][index]);
    });
  });

  // test('When get random dino button is pressed, loadDinoRandomThunk is called', () => {
  //   wrapper
  //     .find('SampleDinoPage')
  //     .find('#getRandomDinoButton')
  //     .first()
  //     .simulate('click');
  //   wrapper.update();
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
  //     loadDinoRandomThunk().toString()
  //   );
  // });
});
