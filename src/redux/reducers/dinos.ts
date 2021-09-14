/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
/*
Reducers update the redux store.

NOTE: This should be a separate reducer file for each subset of data to be saved in the redux store.
The number of subsets will vary greatly per project

*/
import axios, { AxiosRequestConfig } from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { dinoAPI, ajaxFinally } from '../../js/axios.config';

export type DinoType = { id: string; text: string; selected: boolean };

export type DinoState = {
  data: DinoType[];
  loading: boolean;
  error: string | null;
};
// Record the expected initial state structure
// exported ONLY for testing purposes - it should not be used in the actual application
export const initialState: DinoState = {
  data: [],
  loading: false,
  error: null,
};

/* ************** Thunks *************** */
export const loadDinos = createAsyncThunk(
  'dinos/loadDinos',
  async (_, { rejectWithValue }) => {
    try {
      const axiosConfig: AxiosRequestConfig = {
        url: dinoAPI.url(),
        method: dinoAPI.method(),
      };

      const response = await axios(axiosConfig);
      await ajaxFinally();
      return response.data[0].map((dino: string, index: number) => ({
        id: index,
        text: dino,
        selected: false,
      }));
    } catch (err) {
      // @ts-ignore
      return rejectWithValue(err.response.data);
    }
  }
);

/* *************** Slice ***************** */
export const DinosSlice = createSlice({
  name: 'dinos',
  initialState,
  reducers: {
    addDino: (state, action: PayloadAction<DinoType>) => {
      // not used, but keeping as an example
      const newDinos = [...state.data];
      newDinos.push(action.payload);
      state.data = newDinos;
    },
    deleteDino: (state, action: PayloadAction<string>) => {
      // not used, but keeping as an example
      const id = action.payload;
      const currentDinos = [...state.data];
      const newDinos = currentDinos.filter((dino) => dino.id !== id);
      state.data = newDinos;
    },
    toggleDinoLoadingIcon: (state) => {
      state.loading = !state.loading;
    },
    setDinoError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setDinoSelection: (
      state,
      action: PayloadAction<{ id: string; selected: boolean }>
    ) => {
      const { id, selected } = action.payload;
      const newDinos = [...state.data].map((dino) =>
        dino.id === id ? { ...dino, selected } : dino
      );
      state.data = newDinos;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDinos.fulfilled, (state, { payload }) => {
      payload.forEach((dino: DinoType, index: number) => {
        const id = `${index}`;
        if (!state.data.some((d) => d.id === id)) {
          state.data.push(dino);
        }
      });
      state.error = null;
      state.loading = false;
    });

    builder.addCase(loadDinos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loadDinos.rejected, (state) => {
      state.loading = false;
      state.error = 'There was an error loading the dinosaurs.';
    });
  },
});

export const {
  addDino,
  deleteDino,
  toggleDinoLoadingIcon,
  setDinoError,
  setDinoSelection,
} = DinosSlice.actions;

export default DinosSlice.reducer;
