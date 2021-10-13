/*
Selectors pull data from the redux store so individual components
don't need to know the store structure

These selectors are actually custom hooks and must start with "use"
*/

import { RootState } from '../store';
import { DinoType } from '../reducers/dinos';
import { useSelector } from 'react-redux';

export const useIsDinoLoading = (): boolean =>
  useSelector((state: RootState) => state.dinos.loading);

// EXAMPLE: Selector (pulling information out of the redux store)
export const useGetDinos = (): DinoType[] =>
  useSelector((state: RootState) => state.dinos.data);

export const useGetDinoErrors = (): string | null =>
  useSelector((state: RootState) => state.dinos.error);

export const useGetSelectedDinos = (): DinoType[] =>
  useSelector((state: RootState) =>
    state.dinos.data.filter((dino: DinoType) => dino.selected === true)
  );
