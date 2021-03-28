/* eslint-disable import/prefer-default-export */
/*
Thunks are like actions (that are then passed to the reducer), but allow
you to call another action.  Thunks are also called "side actions"

They are most commonly used for asynchronous actions like ajax calls

*/

import axios from 'axios';
import {
  toggleDinoLoadingIconAction,
  addDinoAction,
  setDinoErrorAction,
} from '../actions/dinos';
import { dinoAPI, ajaxFinally } from '../../js/axios.config';
import { getDinoSelector } from '../selectors/dinos';

// EXAMPLE: Side action (aka thunk)
export const loadDinosThunk = () => async (dispatch, getState) => {
  dispatch(toggleDinoLoadingIconAction());
  dispatch(setDinoErrorAction());

  try {
    const response = await axios({
      method: dinoAPI.method(),
      url: dinoAPI.url(),
    });

    response.data[0].forEach((dino, index) => {
      // Check to see if dino is already loaded first before adding
      const id = index.toString();
      if (getDinoSelector(getState(), id) === undefined) {
        dispatch(addDinoAction(dino, id));
      }
    });
    ajaxFinally(() => {
      dispatch(toggleDinoLoadingIconAction());
    });
  } catch (e) {
    dispatch(setDinoErrorAction(e));
    dispatch(toggleDinoLoadingIconAction());
  }
};

// EXAMPLE: Thunk that returns a value
export const loadDinoRandomThunk = () => async (dispatch, getState) => {
  dispatch(toggleDinoLoadingIconAction());
  dispatch(setDinoErrorAction());
  let returnDino = null;

  try {
    const response = await axios({
      method: dinoAPI.method(),
      url: dinoAPI.url(),
    });

    // eslint-disable-next-line prefer-destructuring
    returnDino = response.data[0][0];
  } catch (e) {
    dispatch(setDinoErrorAction(e));
  }
  return ajaxFinally(() => {
    dispatch(toggleDinoLoadingIconAction());
    return returnDino;
  });
};
