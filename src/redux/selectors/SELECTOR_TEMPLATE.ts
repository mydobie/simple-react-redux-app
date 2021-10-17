/*
Selectors pull data from the redux store so individual components
don't need to know the store structure

These selectors are actually custom hooks and must start with "use"
*/

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { SampleStateType } from '../reducers/REDUCER_TEMPLATE';

export const useGetState = (): SampleStateType =>
  useSelector((state: RootState) => state);
