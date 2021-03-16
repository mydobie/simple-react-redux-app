/* eslint-disable import/prefer-default-export */
/*
Actions ensure that the data going to the reducers are in the proper format
Each must return an object that has two keys: type and payload

Type: is a global variable that is set in the actionTypes file

Payload: Data to be sent to the reducer that will eventually go to the redux store
The payload can be a single value, array, or object

NOTE: This should be a separate action file for each subset of data to be save.
The number of subsets will vary greatly per project

*/

import {} from '../actionTypes';

// export const myAction = () => ({
//   type: MY_TYPE_FROM_ACTION_TYPES,
//   payload: '', // data to be sent to the reducer
// });
