import { combineReducers } from 'redux';

import { featureFlagsReducers } from 'feature-flags';
import dinos from './dinos';
import sample from './REDUCER_TEMPLATE';

// Add each reducer below in the combinedReducers
export default combineReducers({
  dinos,
  FeatureFlags: featureFlagsReducers,
  sample,
});
