/* eslint-disable @typescript-eslint/ban-ts-comment */
/*
This file creates the redux store.
There normally isn't a need to modify this file
*/

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const usePersister = process.env.REACT_APP_USE_LOCAL_STORAGE === 'true';

const persistedReducer = usePersister
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

export const store = configureStore({
  // @ts-ignore
  reducer: persistedReducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState =
  | ReturnType<typeof rootReducer>
  | ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
