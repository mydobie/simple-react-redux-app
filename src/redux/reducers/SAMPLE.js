/*
Reducers take the object from the actions and update the redux store.

Main part of the reducer is a large switch statement based on the type.

The reducer should always return the new redux store state.

NOTE: This should be a separate reducer file for each subset of data to be saved in the redux store.
The number of subsets will vary greatly per project

NOTE:  Be sure to include this file to `index.js` file and add to the combineReducers object.

*/

import {} from '../actionTypes';

// Record the expected initial state structure
const initialState = {};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // case MY_TYPE_FROM_ACTION_TYPES: {
    //   const myNewState = { ...state };
    //   // add new data from action.payload
    //   myNewState.foo = action.payload;
    //   return myNewState;
    // }

    default:
      return state;
  }
};

export default Reducer;
