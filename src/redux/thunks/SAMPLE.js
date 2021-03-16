// eslint-disable-next-line import/prefer-default-export
/*
Thunks are like actions (that are then passed to the reducer), but allow
you to call another action.  Thunks are also called "side actions"
They are most commonly used for asynchronous actions like ajax calls
*/

// import axios from 'axios';

// import {  } from '../actions/MYACTIONFILE';
// import { ajaxFinally } from '../../js/ajax.config';

// export const MYTHUNKACTION = () => async (dispatch /* , getState */) => {
//   try {
//     dispatch(MY_ACTION);

//     const response = await axios({
//       method: MY_AJAX_CONFIG_METHOD,
//       url: MY_AJAX_CONFIG_URL,
//       data: {},
//     });

//     const responseData = response.data;
//     ajaxFinally(() => {
//       dispatch(MY_ACTION);
//     });
//   } catch (e) {
//     // add error catching
//   }
// };
