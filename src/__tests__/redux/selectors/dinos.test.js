import {
  // getDinos,
  // getDino,
  // getSelectedDinos,
  // getDinosLoading,
  // getDinoErrors,
  getDinosSelector,
  getDinoSelector,
  getSelectedDinosSelector,
  isDinosLoadingSelector,
  getDinoErrorSelector,
} from '../../../redux/selectors/dinos';

describe('Dino Selectors tests', () => {
  const data = [
    { id: '2', text: 'myDino', selected: false },
    { id: '3', text: 'myOtherDino', selected: true },
  ];

  const state = {
    dinos: {
      data,
      loading: false,
      error: 'I am an error',
    },
  };
  test('Get Dinos returns a list of dinos', () => {
    expect(getDinosSelector(state)).toEqual(state.dinos.data);
  });
  test('Get Selected Dinos returns selected dinos', () => {
    expect(getSelectedDinosSelector(state)).toEqual([
      { id: '3', text: 'myOtherDino', selected: true },
    ]);
  });

  test('Get Dinos Loading, returns loading status', () => {
    expect(isDinosLoadingSelector(state)).toEqual(false);
  });

  test('Get Dino returns dino', () => {
    expect(getDinoSelector(state, '2')).toEqual(data[0]);
  });

  test('Get dino returns undefined for unknown dino', () => {
    expect(getDinoSelector(state)).toEqual(undefined);
  });

  test('Get Dino Errors returns error message', () => {
    expect(getDinoErrorSelector(state)).toEqual('I am an error');
  });
});
