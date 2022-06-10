/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/react-in-jsx-scope */

import { axe } from 'jest-axe';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';
import ROUTES from '../../AppRouteNames';
import AppRoutes from '../../AppRoutes';

const mockStore = configureStore([]);

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Animal page tests', () => {
  const store: MockStoreEnhanced<unknown, unknown> = mockStore({});
  test('Correct content is shown for /animal route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL}`]}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.getByLabelText('Animal Type:')).toBeInTheDocument();
    expect(screen.queryByTestId('displayAnimalType')).not.toBeInTheDocument();
  });

  test('Route /animal/animaltype route is called after selecting a type', () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL}`]}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'Dog' },
      });

      expect(mockedUsedNavigate).toHaveBeenCalledWith('Dog');
    });
  });

  test('Correct content is shown for /animal/animaltype route', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL}/Dog`]}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.queryByLabelText('Animal Type:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Animal Name:')).toBeInTheDocument();
    expect(screen.getByTestId('displayAnimalType')).toBeInTheDocument();
    expect(screen.getByText('Type: Dog')).toBeInTheDocument();
  });

  test('Route /animal/dog/animalname route is called after typing a name', () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL}/Dog`]}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Fido' },
      });
    });
    act(() => {
      fireEvent.click(screen.getByRole('button'));

      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        `Dog/${ROUTES.ANIMAL_PARAMS.ANIMAL_NAME}/Fido`
      );
    });
  });

  test('Route is not changed after typing an empty name', () => {
    render(
      <MemoryRouter initialEntries={[`/${ROUTES.ANIMAL}/Dog`]}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MemoryRouter>
    );

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '' },
      });
    });
    act(() => {
      fireEvent.click(screen.getByRole('button'));

      expect(mockedUsedNavigate).toHaveBeenCalledTimes(0);
    });
  });

  test('Correct content is shown for /animal/dog/animalname route', async () => {
    const { container } = render(
      <MemoryRouter
        initialEntries={[
          `/${ROUTES.ANIMAL}/Dog/${ROUTES.ANIMAL_PARAMS.ANIMAL_NAME}/Fido`,
        ]}
      >
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(screen.queryByLabelText('Animal Type:')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Animal Name:')).not.toBeInTheDocument();
    expect(screen.getByText('Type: Dog')).toBeInTheDocument();
    expect(screen.getByText('Name: Fido')).toBeInTheDocument();
  });
});
