/* eslint-disable import/prefer-default-export */
/*
Actions ensure that the data going to the reducers are in the proper format
Each must return an object that has two keys: type and payload

Type: is a global variable that is set in the actionTypes file

Payload: Data to be sent to the reducer that will eventually go to the redux store
The payload can be a single value, array, or object

NOTE: This should be a separate action file for each subset of data to be save.
The number of subsets will vary greatly per project


***** Naming *****
All action names are camel case starting with a lower case letter.
All action names should end with "Action" to avoid confusion when applied

If the result of the action is to flip or toggle the value in the store, then the action should start with "toggle".

If the result of the action is to save information to the store, then the action should start with "set"

If the result is to add a new item into an array of items in the store, then the action should start with "add"

If the result of the action is to delete or clear information from the store, then the action should start with "delete"

For example: "toggleErrorAction" or "setUserDataAction" or "deleteUserDataAction"

*/

import {} from '../actionTypes';

// export const myAction = () => ({
//   type: MY_TYPE_FROM_ACTION_TYPES,
//   payload: '', // data to be sent to the reducer
// });
