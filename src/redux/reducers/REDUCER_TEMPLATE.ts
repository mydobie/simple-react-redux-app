/* eslint-disable @typescript-eslint/no-empty-function */
/*

Reducers update the redux store.

NOTE: This should be a separate reducer file for each subset of data to be saved in the redux store.
The number of subsets will vary greatly per project

*/
// import axios, { AxiosRequestConfig } from 'axios';
import {
  createSlice,
  createAsyncThunk /*, PayloadAction */,
} from '@reduxjs/toolkit';
// import { ajaxFinally } from '../../js/axios.config';

// *** Data types ***
// export type SampleItemType = string;

// *** Type of the store ***
// eslint-disable-next-line @typescript-eslint/ban-types
export type SampleStateType = {};

// *** Initial state  ***
// exported ONLY for testing purposes
export const initialState: SampleStateType = {};

/* ************** Thunks *************** */
// Enter side actions like ajax calls here

export const sampleAjaxCall = createAsyncThunk(
  'mySampleReducer/loadingContent', // unique name - not used in the application
  async (_, { rejectWithValue }) => {
    try {
      // const axiosConfig: AxiosRequestConfig = {
      //   url: sampleAPI.url(),
      //   method: sampleAPI.method(),
      // };
      // const response = await axios(axiosConfig);
      // await ajaxFinally();
      // return response.data; // this is the payload in the  extra reducers below
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

/* *************** Slice ***************** */
export const SampleSlice = createSlice({
  name: 'sampleSlice', // unique name - not used in the application
  initialState,
  reducers: {
    // Add new reducer to be called in the application
    // addNewItem: (state: SampleStateType, action: PayloadAction<SampleItemType>) => {
    //   const item = action.payload;
    //   const newData = [...state.data];
    //   newData.push(item);
    //   state.data = newData;
    // },

    // NOTE this resets the state to the initial state
    // normally this isn't used in application, but can be helpful during testing
    resetStore: () => initialState,
  },

  extraReducers: (builder) => {
    // Register each thunk's state (fulfilled, pending, or rejected)
    // Ajax call successfully returns a value
    builder.addCase(
      sampleAjaxCall.fulfilled,
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      (state: SampleStateType, { payload }) => {}
    );

    // Ajax call has started, but response has not been received
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    builder.addCase(sampleAjaxCall.pending, (state: SampleStateType) => {});

    // Ajax call returned an error
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    builder.addCase(sampleAjaxCall.rejected, (state: SampleStateType) => {});
  },
});

// Reducers that can be called in the application
export const { /* addNewItem, */ resetStore } = SampleSlice.actions;

// To be imported in the index reducer file
export default SampleSlice.reducer;
