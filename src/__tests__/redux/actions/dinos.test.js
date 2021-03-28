import {
  // addDino,
  // removeDino,
  // loadingDinosIcon,
  // dinosError,
  // dinoSelect,
  addDinoAction,
  deleteDinoAction,
  toggleDinoLoadingIconAction,
  setDinoErrorAction,
  setDinoSelectedAction,
  DINO_ERROR_TEXT,
} from '../../../redux/actions/dinos';

import {
  DINO_ADD,
  DINO_REMOVE,
  DINO_LOADING,
  DINO_ERROR,
  DINO_SELECT,
} from '../../../redux/actionTypes';

describe('Dino action tests', () => {
  test('Add dino - default selected', () => {
    const action = addDinoAction('myDino', 'dinoId');

    expect(action).toEqual({
      type: DINO_ADD,
      payload: { id: 'dinoId', text: 'myDino', selected: false },
    });
  });

  test('Add dino - set selected', () => {
    const action = addDinoAction('myDino', 'dinoId', true);

    expect(action).toEqual({
      type: DINO_ADD,
      payload: { id: 'dinoId', text: 'myDino', selected: true },
    });
  });

  test('Remove Dino', () => {
    expect(deleteDinoAction('myId')).toEqual({
      type: DINO_REMOVE,
      payload: 'myId',
    });
  });

  test('Loading Icon', () => {
    expect(toggleDinoLoadingIconAction()).toEqual({ type: DINO_LOADING });
  });

  test('Error loading dinos - no error', () => {
    expect(setDinoErrorAction()).toEqual({
      type: DINO_ERROR,
      payload: null,
    });
  });

  test('Error loading dinos -  error', () => {
    expect(setDinoErrorAction('Houston we have a problem')).toEqual({
      type: DINO_ERROR,
      payload: DINO_ERROR_TEXT,
    });
  });

  test('Dino Select', () => {
    expect(setDinoSelectedAction('myId', true)).toEqual({
      type: DINO_SELECT,
      payload: { id: 'myId', selected: true },
    });
  });
});
