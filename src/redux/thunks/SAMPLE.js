// eslint-disable-next-line import/prefer-default-export
/*
Thunks are like actions (that are then passed to the reducer), but allow
you to call another action.  Thunks are also called "side actions"
They are most commonly used for asynchronous actions like ajax calls

***** Naming *****
All thunk names are camel case starting with a lower case letter.
All thunk names should end with "Thunk" to avoid confusion when applied

If the thunk makes an ajax call to get information, the name should start with "load".
If the thunk makes an ajax call to update information (aka post or patch), the name should start with "update"
If the thunk makes an ajax call to create information (aka post or put), the name should start with "create".

If the same thunk is used to create or update information, then the name should start with "update"

If the thunk makes an ajax call to delete information (aka delete), the name should start with "delete"

For example: "loadUserDataThunk" or "createUserThunk" or "deleteUserThunk"

*/

// import axios from 'axios';

// import {  } from '../actions/MYACTIONFILE';
// import { ajaxFinally } from '../../js/ajax.config';

// export const myThunk = () => async (dispatch /* , getState */) => {
//   try {
//     dispatch(myAction);

//     const response = await axios({
//       method: MY_AJAX_CONFIG_METHOD,
//       url: MY_AJAX_CONFIG_URL,
//       data: {},
//     });

//     const responseData = response.data;
//     ajaxFinally(() => {
//       dispatch(myAction);
//     });
//   } catch (e) {
//     // add error catching
//   }
// };
