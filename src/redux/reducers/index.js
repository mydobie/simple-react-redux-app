import { combineReducers } from 'redux';

// START FEATURE FLAGS
import { reducerFeatureFlags } from 'feature_flags';
// END FEATURE FLAGS

// Import each reducer and then add it to the object param of combineReducers.

// ENABLE FOR FEATURE FLAGS
export default combineReducers({
  // START FEATURE FLAGS
  reducerFeatureFlags,
  // END FEATURE FLAGS
});
