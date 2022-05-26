import { combineReducers } from 'redux';

// import { featureFlagsReducers } from '../../feature-flags.config';
import { featureFlagsReducers } from 'feature-flags';
import sample from './REDUCER_TEMPLATE';

// Add each reducer below in the combinedReducers
export default combineReducers({
  FeatureFlags: featureFlagsReducers,
  sample,
});
