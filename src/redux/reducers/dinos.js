/*
Reducers take the object from the actions and update the redux store.

Main part of the reducer is a large switch statement based on the type.

The reducer should always return the new redux store state.

NOTE: This should be a separate reducer file for each subset of data to be saved in the redux store.
The number of subsets will vary greatly per project

*/

import {
  DINO_ADD,
  DINO_REMOVE,
  DINO_LOADING,
  DINO_SELECT,
  DINO_ERROR,
} from '../actionTypes';

// Record the expected initial state structure
const initialState = { data: [], loading: false, error: null };

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // EXAMPLE: Reducer case
    case DINO_ADD: {
      const { id, text, selected } = action.payload;
      const newDino = {
        id,
        text,
        selected,
      };
      const newDinos = [...state.data];
      newDinos.push(newDino);

      return { ...state, data: newDinos };
    }

    case DINO_REMOVE: {
      const id = action.payload;
      const selectedDinos = [...state.data];
      const newSelectedDinos = selectedDinos.filter((dino) => dino.id !== id);
      return { ...state, data: newSelectedDinos };
    }

    case DINO_LOADING: {
      return { ...state, loading: !state.loading };
    }

    case DINO_ERROR: {
      const errorMsg = action.payload;
      return { ...state, error: errorMsg };
    }

    case DINO_SELECT: {
      const { id, selected } = action.payload;
      const dinos = [...state.data];
      const index = dinos.findIndex((dino) => dino.id === id);
      if (index !== -1) {
        dinos[index].selected = selected;
      }
      return { ...state, data: dinos };
    }

    default:
      return state;
  }
};

export default Reducer;
