/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
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
  cleanup,
} from '@testing-library/react';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { resetDinoStore } from '../../redux/reducers/dinos';
import { dinoAPI } from '../../js/axios.config';

import mockDinos from '../fixtures/dinoipsum';
import DinoPage from '../../pages/Dino';

const mock: MockAdapter = new MockAdapter(axios);

const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {}, // Prevents networking error from logging to console.
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('Sample Dino Page component tests', () => {
  beforeEach(() => {
    mock.reset();
    process.env.REACT_APP_USE_MOCKS = 'false';
    store.dispatch(resetDinoStore());
  });
  afterEach(cleanup);

  test('Component is accessible after loading dinos', async () => {
    mock.onGet(dinoAPI.url()).replyOnce(200, mockDinos);
    const { container } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DinoPage />
        </QueryClientProvider>
      </Provider>
    );
    await waitFor(() =>
      expect(screen.queryByTestId('Loading')).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getAllByTestId('dinoListItem')).not.toHaveLength(0)
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  test('Error is shown if there is an error getting dinos', async () => {
    mock.onGet(dinoAPI.url()).replyOnce(500, 'This is an error');
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DinoPage />
        </QueryClientProvider>
      </Provider>
    );

    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('Expected number of dinos are shown and error is not shown', async () => {
    mock.onGet(dinoAPI.url()).reply(200, mockDinos);
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DinoPage />
        </QueryClientProvider>
      </Provider>
    );
    // await waitFor(() =>
    //   expect(screen.queryByTestId('Loading')).not.toBeInTheDocument()
    // );
    // await waitFor(() => screen.queryByTestId('dinoSelectList'));
    await waitFor(() =>
      expect(screen.getAllByTestId('dinoListItem')).not.toHaveLength(0)
    );
    const dinos = screen.getAllByTestId('dinoListItem');
    expect(dinos).toHaveLength(mockDinos[0].length);

    dinos.forEach((dino: HTMLElement, index: number) => {
      expect(dino.textContent).toEqual(mockDinos[0][index]);
    });

    expect(screen.queryByTestId('Loading')).not.toBeInTheDocument();
  });

  test('When clicking on a dino, it toggles in the selected dino list', async () => {
    mock.onGet(dinoAPI.url()).reply(200, mockDinos);
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <DinoPage />
        </QueryClientProvider>
      </Provider>
    );

    // await waitFor(() =>
    //   expect(screen.queryByTestId('Loading')).not.toBeInTheDocument()
    // );
    // screen.debug();

    // expect dino to be in the checkbox list
    // await waitFor(() =>
    //   expect(
    //     within(screen.getByTestId('dinoSelectList')).getByText(mockDinos[0][0])
    //   ).toBeInTheDocument()
    // );

    await waitFor(() =>
      expect(screen.getAllByTestId('dinoListItem')).not.toHaveLength(0)
    );

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
