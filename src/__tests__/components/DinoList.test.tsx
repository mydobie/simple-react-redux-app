/* eslint-disable react/react-in-jsx-scope */

import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import DinoList from '../../components/DinoList';

const mockStore = configureStore([]);

describe('DinoList tests', () => {
  let store: MockStoreEnhanced<unknown, unknown>;

  beforeEach(() => {
    store = mockStore({
      dinos: {
        data: [
          { id: 'a', text: 'MyDino', selected: true },
          { id: 'b', text: 'MyOtherDino', selected: true },
          { id: 'c', text: 'MyThirdDino', selected: false },
        ],
      },
    });
  });

  test('Is accessible', async () => {
    const { container } = render(
      <Provider store={store}>
        <DinoList />
      </Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('Expected number of dinos are displayed', () => {
    render(
      <Provider store={store}>
        <DinoList />
      </Provider>
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dinos = store.getState().dinos.data;
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')[0]).toHaveTextContent(dinos[0].text);
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent(dinos[1].text);
  });
});
