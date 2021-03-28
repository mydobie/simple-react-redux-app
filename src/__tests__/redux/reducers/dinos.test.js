import dinos from '../../../redux/reducers/dinos';
import {
  DINO_ADD,
  DINO_REMOVE,
  DINO_LOADING,
  DINO_SELECT,
  DINO_ERROR,
} from '../../../redux/actionTypes';

describe('Dino Reducers tests', () => {
  test('A new dino is added when DINO_ADD is received', () => {
    const newDino = { id: 2, text: 'myDino', selected: false };
    const action = {
      type: DINO_ADD,
      payload: newDino,
    };
    const originalState = { loading: false, data: [], error: null };
    const expectedState = {
      loading: false,
      data: [{ id: 2, text: 'myDino', selected: false }],
      error: null,
    };
    expect(dinos(originalState, action)).toEqual(expectedState);
  });

  test('A dino is removed when DINO_REMOVE is received', () => {
    const action = {
      type: DINO_REMOVE,
      payload: 2,
    };
    const originalState = {
      loading: false,
      data: [
        { id: 2, text: 'myDino', selected: true },
        { id: 3, text: 'myOtherDino', selected: true },
      ],
      error: null,
    };
    const expectedState = {
      loading: false,
      data: [{ id: 3, text: 'myOtherDino', selected: true }],
      error: null,
    };
    expect(dinos(originalState, action)).toEqual(expectedState);
  });

  test('Loading is toggled from false to true when DINO_LOADING is received', () => {
    const action = {
      type: DINO_LOADING,
    };
    const originalState = {
      loading: false,
      data: [],
      selected: [],
      error: null,
    };
    const expectedState = {
      loading: true,
      data: [],
      selected: [],
      error: null,
    };
    expect(dinos(originalState, action)).toEqual(expectedState);
  });

  test('Error is set when DINO_ERROR is received', () => {
    const action = {
      type: DINO_ERROR,
      payload: 'I am a new error',
    };
    const originalState = {
      loading: false,
      data: [],
      selected: [],
      error: null,
    };
    const expectedState = {
      loading: false,
      data: [],
      selected: [],
      error: 'I am a new error',
    };
    expect(dinos(originalState, action)).toEqual(expectedState);
  });

  test('Loading is toggled from true to false when DINO_LOADING is received', () => {
    const action = {
      type: DINO_LOADING,
    };
    const originalState = {
      loading: true,
      data: [],
      selected: [],
      error: null,
    };
    const expectedState = {
      loading: false,
      data: [],
      selected: [],
      error: null,
    };
    expect(dinos(originalState, action)).toEqual(expectedState);
  });

  test('Initial state is used when state is undefined', () => {
    const newDino = { id: 2, text: 'myDino', selected: true };
    const action = {
      type: DINO_ADD,
      payload: newDino,
    };
    const expectedState = {
      loading: false,
      data: [{ id: 2, text: 'myDino', selected: true }],
      error: null,
    };
    expect(dinos(undefined, action)).toEqual(expectedState);
  });

  test('State is returned for an unknown action type', () => {
    const action = {
      type: 'I_AM_AN_UNKNOWN_ACTION_TYPE',
    };
    const originalState = {
      loading: false,
      data: [],
      error: null,
    };

    expect(dinos(originalState, action)).toEqual(originalState);
  });

  test('Dino is selected when DINO_SELECT is received', () => {
    const action = {
      type: DINO_SELECT,
      payload: { id: 2, selected: true },
    };
    const originalState = {
      loading: false,
      data: [
        { id: 2, text: 'myDino', selected: false },
        { id: 3, text: 'myOtherDino', selected: false },
      ],
      error: null,
    };
    const expectedState = {
      loading: false,
      data: [
        { id: 2, text: 'myDino', selected: true },
        { id: 3, text: 'myOtherDino', selected: false },
      ],
      error: null,
    };
    expect(dinos(originalState, action)).toEqual(expectedState);
  });

  test('Nothing is changed when no id is found', () => {
    const action = {
      type: DINO_SELECT,
      payload: { id: 2222, selected: true },
    };
    const originalState = {
      loading: false,
      data: [
        { id: 2, text: 'myDino', selected: false },
        { id: 3, text: 'myOtherDino', selected: false },
      ],
      error: null,
    };

    expect(dinos(originalState, action)).toEqual(originalState);
  });
});
