/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { mount } from 'enzyme';
// import thunk from 'redux-thunk';
import mockDinos from '../__fixtures__/dinoipsum';
import DinoPage from '../../pages/Dino';
// import DinoListItem from '../../components/DinoListItem';
// import { setDinoSelectedAction } from '../../redux/actions/dinos';
// import { loadDinosThunk, loadDinoRandomThunk } from '../../redux/thunks/dinos';

// const mockStore = configureStore([thunk]);

describe('Sample Dino Page component tests', () => {
  // let wrapper = '';
  // let store = '';
  // beforeEach(() => {
  //   store = mockStore({
  //     dinos: {
  //       data: [
  //         { text: 'Cedarosaurus', id: '1', selected: false },
  //         { text: 'Erlicosaurus', id: '2', selected: false },
  //         { text: 'Majungasaurus', id: '3', selected: true },
  //       ],
  //       loading: false,
  //       error: null,
  //     },
  //   });
  //   store.dispatch = jest.fn();
  //   wrapper = mount(
  //     <Provider store={store}>
  //       <DinoPage />
  //     </Provider>
  //   );
  // });
  // afterEach(() => {
  //   store.dispatch.mockClear();
  // });
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
  // test('Component is accessible after displaying dino list', async () => {
  //   const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
  //   expect(results).toHaveNoViolations();
  // });
  // test('Component is accessible when displaying an error', async () => {
  //   store = mockStore({
  //     dinos: { data: [], loading: false, error: 'I am an error' },
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
  // test('loadDinos is called on component load', () => {
  //   store = mockStore({
  //     dinos: {
  //       data: [],
  //       loading: false,
  //       error: null,
  //     },
  //   });
  //   store.dispatch = jest.fn();
  //   wrapper = mount(
  //     <Provider store={store}>
  //       <DinoPage />
  //     </Provider>
  //   );
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch.mock.calls[0][0].toString()).toEqual(
  //     loadDinosThunk().toString()
  //   );
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
  // test('Expected number of dinos are shown and error is not shown', () => {
  //   expect(wrapper.find(DinoListItem)).toHaveLength(3);
  //   expect(wrapper.find('Errors')).toHaveLength(0);
  // });
  // test('Select toggle calls  add Dino', () => {
  //   expect(store.dispatch).toHaveBeenCalledTimes(0);
  //   wrapper
  //     .find('SampleDinoPage')
  //     .first()
  //     .instance()
  //     .handleSelectDinoToggle('1', true);
  //   expect(store.dispatch).toHaveBeenCalledTimes(1);
  //   expect(store.dispatch).toHaveBeenLastCalledWith(
  //     setDinoSelectedAction('1', true)
  //   );
  // });
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
