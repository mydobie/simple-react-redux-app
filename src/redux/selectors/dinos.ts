/*
Selectors pull data from the redux store so individual components
don't need to know the store structure
*/

import { RootState } from '../store';
import { DinoType } from '../reducers/dinos';

// EXAMPLE: Selector (pulling information out of the redux store)
export const getDinosSelector = (state: RootState): DinoType[] =>
  state.dinos.data;

export const getSelectedDinosSelector = (state: RootState): DinoType[] =>
  state.dinos.data.filter((dino: DinoType) => dino.selected === true);

export const isDinosLoadingSelector = (state: RootState): boolean =>
  state.dinos.loading;

export const getDinoErrorSelector = (state: RootState): string | null =>
  state.dinos.error;
