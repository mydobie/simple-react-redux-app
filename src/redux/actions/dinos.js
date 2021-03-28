/*
Actions ensure that the data going to the reducers are in the proper format
Each must return an object that has two keys: type and payload

Type: is a global variable that is set in the actionTypes file

Payload: Data to be sent to the reducer that will eventually go to the redux store
The payload can be a single value, array, or object

NOTE: This should be a separate action file for each subset of data to be save.
The number of subsets will vary greatly per project

*/

import {
  DINO_ADD,
  DINO_REMOVE,
  DINO_LOADING,
  DINO_ERROR,
  DINO_SELECT,
} from '../actionTypes';

// NOTE: this is a helper function and should not be dispatched
const formatDino = (dinoName, dinoId, selected = false) => ({
  id: dinoId,
  text: dinoName,
  selected,
});

// EXAMPLE: Action function
export const addDinoAction = (dinoName, dinoId, selected) => ({
  type: DINO_ADD,
  payload: formatDino(dinoName, dinoId, selected),
});

// Currently not used: remove a dino from state array
export const deleteDinoAction = (id) => ({
  type: DINO_REMOVE,
  payload: id,
});

export const toggleDinoLoadingIconAction = () => ({ type: DINO_LOADING });

export const DINO_ERROR_TEXT = 'There was an error loading the dinosaurs.';

export const setDinoErrorAction = (error = '') => ({
  type: DINO_ERROR,
  payload: error === '' ? null : DINO_ERROR_TEXT,
});

export const setDinoSelectedAction = (id, selected) => ({
  type: DINO_SELECT,
  payload: { id, selected },
});
// ///////////////////////////////////////////
