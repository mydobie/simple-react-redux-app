import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { DINO_LOADING, DINO_ADD, DINO_ERROR } from '../../../redux/actionTypes';

import { DINO_ERROR_TEXT } from '../../../redux/actions/dinos';
import {
  loadDinosThunk,
  loadDinoRandomThunk,
} from '../../../redux/thunks/dinos';

const mock = new MockAdapter(axios);

describe('Dino Thunk tests', () => {
  const mockedDispatch = jest.fn();
  const getState = () => ({ dinos: { data: [] } });

  beforeEach(() => {
    mock.onAny().reply(200, [['Cedarosaurus', 'Erlicosaurus']]);
  });
  afterEach(() => {
    mockedDispatch.mockClear();
    mock.reset();
  });

  test('loadDinos gets dinos and dispatches correct actions', async () => {
    await loadDinosThunk()(mockedDispatch, getState);

    expect(mockedDispatch).toHaveBeenCalledTimes(5);
    expect(mockedDispatch.mock.calls[0][0]).toEqual({ type: DINO_LOADING });
    expect(mockedDispatch.mock.calls[1][0]).toEqual({
      type: DINO_ERROR,
      payload: null,
    });
    expect(mockedDispatch.mock.calls[2][0]).toEqual({
      type: DINO_ADD,
      payload: { id: '0', text: 'Cedarosaurus', selected: false },
    });
    expect(mockedDispatch.mock.calls[3][0]).toEqual({
      type: DINO_ADD,
      payload: { id: '1', text: 'Erlicosaurus', selected: false },
    });
    expect(mockedDispatch.mock.calls[4][0]).toEqual({ type: DINO_LOADING });
  });

  test('loadDinos does not add dino if the store already the dino', async () => {
    const getLoadedState = () => ({
      dinos: {
        data: [
          { id: '0', text: 'Cedarosaurus', selected: false },
          { id: '1', text: 'Erlicosaurus', selected: false },
        ],
      },
    });
    await loadDinosThunk()(mockedDispatch, getLoadedState);
    expect(mockedDispatch).toHaveBeenCalledTimes(3);
    expect(mockedDispatch.mock.calls[0][0]).toEqual({ type: DINO_LOADING });
    expect(mockedDispatch.mock.calls[1][0]).toEqual({
      type: DINO_ERROR,
      payload: null,
    });
    expect(mockedDispatch.mock.calls[2][0]).toEqual({ type: DINO_LOADING });
  });

  test('loadDinos dispatches on error', async () => {
    mock.reset();
    mock.onAny().networkError();

    await loadDinosThunk()(mockedDispatch, getState);

    expect(mockedDispatch).toHaveBeenCalledTimes(4);
    expect(mockedDispatch.mock.calls[0][0]).toEqual({ type: DINO_LOADING });
    expect(mockedDispatch.mock.calls[1][0]).toEqual({
      type: DINO_ERROR,
      payload: null,
    });
    expect(mockedDispatch.mock.calls[2][0]).toEqual({
      type: DINO_ERROR,
      payload: DINO_ERROR_TEXT,
    });

    expect(mockedDispatch.mock.calls[3][0]).toEqual({ type: DINO_LOADING });
  });

  test('loadDinoRandomThunk gets dinos and dispatches correct actions', async () => {
    const dino = await loadDinoRandomThunk()(mockedDispatch, getState);

    expect(mockedDispatch).toHaveBeenCalledTimes(3);
    expect(mockedDispatch.mock.calls[0][0]).toEqual({ type: DINO_LOADING });
    expect(mockedDispatch.mock.calls[1][0]).toEqual({
      type: DINO_ERROR,
      payload: null,
    });
    expect(mockedDispatch.mock.calls[2][0]).toEqual({ type: DINO_LOADING });
    expect(dino).toEqual('Cedarosaurus');
  });

  test('loadDinoRandomThunk dispatches on error', async () => {
    mock.reset();
    mock.onAny().networkError();

    const dino = await loadDinoRandomThunk()(mockedDispatch, getState);

    expect(mockedDispatch).toHaveBeenCalledTimes(4);
    expect(mockedDispatch.mock.calls[0][0]).toEqual({ type: DINO_LOADING });
    expect(mockedDispatch.mock.calls[1][0]).toEqual({
      type: DINO_ERROR,
      payload: null,
    });
    expect(mockedDispatch.mock.calls[2][0]).toEqual({
      type: DINO_ERROR,
      payload: DINO_ERROR_TEXT,
    });
    expect(mockedDispatch.mock.calls[3][0]).toEqual({ type: DINO_LOADING });
    expect(dino).toEqual(null);
  });
});
