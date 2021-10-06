/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { axe } from 'jest-axe';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { resetDinoStore } from '../../redux/reducers/dinos';
import { dinoAPI } from '../../js/axios.config';

import mockDinos from '../../__test_fixtures__/dinoipsum';
import DinoPage from '../../pages/Dino';

let mock: MockAdapter;

describe('Sample Dino Page component tests', () => {
  beforeEach(() => {
    process.env.REACT_APP_USE_MOCKS = 'false';
    mock = new MockAdapter(axios);
    store.dispatch(resetDinoStore());
  });

  test('Component is accessible when loading dinos', async () => {
    process.env.REACT_APP_USE_MOCKS = 'true';
    mock.onGet(dinoAPI.url()).reply(200, mockDinos);
    const { container } = render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );
    const results = await axe(container);
    expect(screen.queryByTestId('Loading')).toBeInTheDocument();

    expect(results).toHaveNoViolations();
  });

  test('Component is accessible after loading dinos', async () => {
    mock.onGet(dinoAPI.url()).replyOnce(200, mockDinos);
    const { container } = render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );

    const results = await axe(container);
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
    expect(results).toHaveNoViolations();
  });

  test('Error is shown if there is an error getting dinos', async () => {
    mock.reset();
    mock.onGet(dinoAPI.url()).networkErrorOnce();
    render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );

    await waitFor(() => screen.getByRole('alert'));
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('Expected number of dinos are shown and error is not shown', async () => {
    mock.onGet(dinoAPI.url()).replyOnce(200, mockDinos);
    render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );
    await waitFor(() => screen.queryByTestId('dinoSelectList'));
    const dinos = screen.getAllByTestId('dinoListItem');
    expect(dinos).toHaveLength(mockDinos[0].length);

    dinos.forEach((dino: HTMLElement, index: number) => {
      expect(dino.textContent).toEqual(mockDinos[0][index]);
    });

    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('When clicking on a dino, it toggles in the selected dino list', async () => {
    mock.onGet(dinoAPI.url()).replyOnce(200, mockDinos);
    render(
      <Provider store={store}>
        <DinoPage />
      </Provider>
    );
    await waitFor(() => screen.queryByTestId('dinoSelectList'));

    // expect dino to be in the checkbox list
    expect(
      within(screen.getByTestId('dinoSelectList')).getByText(mockDinos[0][0])
    ).toBeInTheDocument();

    // expect 'selected' dinos to be an empty list
    expect(
      within(screen.getByTestId('dinoSelectedList')).queryAllByRole('listitem')
    ).toHaveLength(0);

    // click checkbox to check
    fireEvent.click(
      within(screen.getByTestId('dinoSelectList')).getByText(mockDinos[0][0])
    );

    // expect dino to be in the "selected dinos" list
    expect(
      within(screen.getByTestId('dinoSelectedList')).getByText(mockDinos[0][0])
    ).toBeInTheDocument();

    // click checkbox to uncheck
    fireEvent.click(
      within(screen.getByTestId('dinoSelectList')).getByText(mockDinos[0][0])
    );

    // expect dino to not be in the "selected dinos" list
    expect(
      // @ts-ignore
      within(screen.queryByTestId('dinoSelectedList')).queryByText(
        mockDinos[0][0]
      )
    ).not.toBeInTheDocument();
  });

  // test('When get random dino button is pressed', () => {});
});
